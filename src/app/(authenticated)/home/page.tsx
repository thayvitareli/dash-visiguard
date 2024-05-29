"use client";
import React, { useEffect, useState } from "react";
import { ButtonStyle, TextSize } from "assets/config/theme";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import Table from "components/Table";
import { FaIcons } from "react-icons/fa";
import { useFormik } from "formik";
import Input from "components/Input";
import Panel from "components/Panel";
import { findMany } from "hooks/check";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData]=useState([])

  const getChecks = async () => {
    const result = await findMany({})

    setData(result)
  }

  useEffect(() => {
    getChecks()
  },[])

  console.log(data)
  const COLUMNS = [
    {
      Header: "Nome",
      accessor: "name",
      Cell: ({ row }: { row: any }) => <Text>{row?.name}</Text>,
    },
    {
      Header: "Rg",
      accessor: "document",
      Cell: ({ row }: { row: any }) => <Text>{row?.phone}</Text>,
    },
    {
      Header: "Tipo",
      accessor: "fk",
      Cell: ({ row }: { row: any }) => <Text>{row?.type}</Text>,
    },
    {
      Header: "Placa veículo",
      accessor: "plate",
      Cell: ({ row }: { row: any }) => <Text>{row?.plate}</Text>,
    },
    {
      Header: "Hora Entrada",
      accessor: "date_check_in",
      Cell: ({ row }: { row: any }) => <Text>{row?.date_check_in}</Text>,
    },
    {
      Header: "Hora Saída",
      accessor: "date_check_out",
      Cell: ({ row }: { row: any }) => <Text>{row?.type}</Text>,
    },
    {
      Header: "Registrar saida",
      Cell: ({ row }: { row: any }) => (
        <Button onClick={() => console.log('Linha',row)}>Registrar saída</Button>
      ),
    },
  ];

  const { values, handleChange, setFielValue, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      document: "",
    },
    onSubmit(values, formikHelpers) {},
  });

  return (
    <Panel>
      <Text fontSize={TextSize.heading}>Bem vindo</Text>

      <Flex justifyContent="space-between" alignItems={"center"} gap={5}>
        <Input
          name={"name"}
          placeholder="Digite o nome"
          onChange={handleChange}
        />
        <Input
          name={"document"}
          placeholder="Digite o Rg"
          onChange={handleChange}
        />
        <Button style={ButtonStyle}>Pesquisar</Button>
        <Button style={ButtonStyle} onClick={() => setIsOpen(true)}>
          Cadastrar
        </Button>
      </Flex>

      <Table
        columns={COLUMNS}
        rows={data}
        rowsPerPage={5}
        currentPage={0}
        setCurrentPage={undefined}
        totalRows={1}
      />
    </Panel>
  );
}
