"use client";

import {
  Flex,
  Text,
 Button,
  useToast,
  Box,
 
} from "@chakra-ui/react";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'
import React, { useEffect, useRef, useState } from "react";

import Table from "components/Table";
import Panel from "components/Panel";

import { exportRegisterToXLSX, findMany } from "hooks/check";

import { ButtonStyle, Colors, TextSize } from "assets/config/theme";

import { iCheck } from "interfaces/hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { TrashIcon } from "@heroicons/react/24/solid";
import { ptBR } from "date-fns/locale";

import * as FileSaver from 'file-saver';
import { jsPDF } from "jspdf";

import html2canvas from 'html2canvas';

export default function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1000);
  const [datesToFilter, setDatesToFilter] = useState<iCheck.iCheckFindManyProps>(
    {
      from: dayjs(new Date,'DD-MM-YYYY').toDate(),
      to:dayjs(new Date,'DD-MM-YYYY').toDate()
    }
  );

  const [refresh, setRefresh] = useState(false);

  const pdfRef = useRef(null)

  const getChecks = async () => {
    const result = await findMany({ from: dayjs(datesToFilter?.from).toDate(), to: dayjs(datesToFilter?.to).toDate()});

    setData(result);
  };

  useEffect(() => {
    getChecks();
  }, [refresh, currentPage, datesToFilter?.from, datesToFilter?.to]);

  const onExport =async ()=>{
    const result = await exportRegisterToXLSX({from: dayjs(datesToFilter?.from).toDate(), to: dayjs(datesToFilter?.to).toDate()})
    
    if(result){
      const { name, mimetype, buffer } = result;

      const arrayBuffer = new Uint8Array(buffer.data).buffer;

      const blob = new Blob([arrayBuffer], { type: mimetype });

      FileSaver.saveAs(blob, name);
    }
  }

  const onGeneratePDF = () => {
    const fromFormated = dayjs(datesToFilter.from).subtract(3,'h').format('DD/MM/YYYY')
    const toFormated = dayjs(datesToFilter.to).subtract(3,'h').format('DD/MM/YYYY')
    const pdf = new jsPDF('p','pt','a4');
    const elementToConvert = document.getElementById('content-to-pdf')
    const margin = 10;
  
    pdf.text(`Registros de entrada e saída - de ${fromFormated} à ${toFormated}`, margin, margin + 30)

    //@ts-ignore
    html2canvas(elementToConvert).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', margin, margin+60, 570, 0, undefined, 'FAST');

        pdf.save(`Registros_de_${fromFormated}_a_${toFormated}.pdf`);
    }).catch((error) => console.log(error))
   
}

  const COLUMNS = [
    {
      Header: "Nome",
      accessor: "name",
      Cell: ({ row }: { row: any }) => <Text>{row?.name}</Text>,
    },
    {
      Header: "Documento",
      accessor: "document",
      Cell: ({ row }: { row: any }) => <Text>{row?.document}</Text>,
    },
    {
      Header: "Tipo",
      accessor: "fk",
      Cell: ({ row }: { row: any }) => {
        let type = "";
        (type = row.visitor_id ? "Visitante" : type),
          (type = row.collaborator_id ? "Colaborador" : type),
          (type = row.suplier_id ? "Prestador serviço" : type);

        return <Text>{type}</Text>;
      },
    },
    {
      Header: "Placa veículo",
      accessor: "plate",
      Cell: ({ row }: { row: any }) => <Text>{row?.plate || "-"}</Text>,
    },
    {
      Header: "Hora Entrada",
      accessor: "date_check_in",
      Cell: ({ row }: { row: any }) => (
        <Text>{dayjs(row?.date_check_in).format("DD/MM/YYYY HH:mm:ss")}</Text>
      ),
    },
    {
      Header: "Hora Saída",
      accessor: "date_check_out",
      Cell: ({ row }: { row: any }) => (
        <Text>
          {row.date_check_out
            ? dayjs(row?.date_check_out).format("DD/MM/YYYY HH:mm:ss")
            : "-"}
        </Text>
      ),
    },
   
  ];

  return (
    <Panel>
      <Text fontSize={TextSize.heading} color={Colors.primary}>Registros de entradas e saídas</Text>

      <Flex mb={5} gap={5} alignItems={"center"}>
        <DatePicker
          locale={ptBR}
          dateFormat={"dd/MM/yyyy"}
          selected={datesToFilter?.from}
          onChange={(date) => {
            console.log(date)
            if (date) setDatesToFilter({ ...datesToFilter, from: date });
          }}
          selectsStart
          startDate={datesToFilter?.from}
          endDate={datesToFilter?.to}
          placeholderText="Início"
        />
        <DatePicker
          locale={ptBR}
          dateFormat={"dd/MM/yyyy"}
          selected={datesToFilter?.to}
          onChange={(date) => {
            if (date) setDatesToFilter({ ...datesToFilter, to: date });
          }}
          selectsEnd
          startDate={datesToFilter?.from}
          endDate={datesToFilter?.to}
          minDate={datesToFilter?.from}
          placeholderText="Término"
        />
        {datesToFilter && (
          <Button
            onClick={() => setDatesToFilter({})}
            variant={"ghost"}
          >
            <Flex w={5}>
              <TrashIcon />
            </Flex>
          </Button>
        )}

           
        <Button
          style={{ ...ButtonStyle, width: 350 }}
          onClick={onExport}
        >
          Exportar XLSX
        </Button>
        <Button
          style={{ ...ButtonStyle, width: 350 }}
          onClick={onGeneratePDF}
        >
          Baixar PDF
        </Button>
      </Flex>


-      <Table
        columns={COLUMNS}
        rows={data}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRows={data?.length ?? 1}
        id={'content-to-pdf'}
        />
    
    </Panel>
  );
}
