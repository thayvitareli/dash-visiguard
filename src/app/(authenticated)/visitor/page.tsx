"use client";
import {
  Button,
  Flex,
  Icon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
} from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Mask } from "@tboerc/maskfy";
import { ButtonStyle, Colors, TextSize } from "assets/config/theme";
import Input from "components/Input";
import Panel from "components/Panel";
import Table from "components/Table";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { CollaboratorHook, VisitorHook } from "hooks";
import { useEffect, useState } from "react";

export default function Visitor() {
  const [data, setData] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [inputSearchByRegister, setInputSearchByRegister] = useState("");

  const getData = async () => {
    const result = await VisitorHook.findMany({
      skip: rowsPerPage * currentPage,
      take: rowsPerPage,
      search,
    });

    setData(result);
  };

  useEffect(() => {
    getData();
  }, [currentPage, search]);

  const COLUMNS = [
    {
      Header: "Nome",
      accessor: "name",
      Cell: ({ row }: { row: any }) => <Text>{row?.name}</Text>,
    },
    {
      Header: "RG",
      accessor: "rg",
      Cell: ({ row }: { row: any }) => <Text>{row?.rg}</Text>,
    },
    {
      Header: "Telefone",
      accessor: "phone",
      Cell: ({ row }: { row: any }) => (
        <Text>{Mask.phone.value(row?.phone)}</Text>
      ),
    },
    {
      Header: "Cadastrado em",
      accessor: "created_at",
      Cell: ({ row }: { row: any }) => (
        <Text>{dayjs(row?.created_at).format("DD/MM/YYYY")}</Text>
      ),
    },
  ];

  const createVisitor = () => {};

  const INITIAL_VALUES = {
    name: "",
    rg: "",
    phone: "",
  };

  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: createVisitor,
  });

  console.log(inputSearch);

  console.log(search);

  const onChangeSearch = () => {};

  return (
    <Panel>
      <Text color={Colors.primary} fontSize={TextSize.heading}>
        Área de Visitantes
      </Text>

      <Flex justifyContent="space-between" alignItems={"center"} gap={5}>
        <Input
          name={"name"}
          placeholder="Digite o nome"
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Input
          name={"register_employ"}
          placeholder="Digite Rg"
          onChange={(e) => setInputSearchByRegister(e.target.value)}
        />
        <Button
          style={ButtonStyle}
          onClick={() => {
            if (inputSearch) setSearch(inputSearch);
            else if (inputSearchByRegister) setSearch(inputSearchByRegister);
            else setSearch("");
          }}
        >
          Pesquisar
        </Button>
        <Button style={ButtonStyle} onClick={() => setIsOpen(true)}>
          Cadastrar
        </Button>
      </Flex>

      <Table
        columns={COLUMNS}
        rows={data.records}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRows={data.total}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input label="Nome" onChange={undefined} />
            <Input label="Registro" onChange={undefined} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button colorScheme="blue">Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Panel>
  );
}
