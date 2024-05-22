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
} from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { ButtonStyle, Colors, TextSize } from "assets/config/theme";
import Input from "components/Input";
import Panel from "components/Panel";
import Table from "components/Table";
import { useFormik } from "formik";
import { CollaboratorHook } from "hooks";
import { useEffect, useState } from "react";

export default function Collaborator() {
  const [data, setData] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const getData = async () => {
    const result = await CollaboratorHook.findMany({
      skip: rowsPerPage * currentPage,
      take: rowsPerPage,
      search,
    });

    setData(result);
  };

  useEffect(() => {
    getData();
  }, [currentPage, debouncedSearch]);

  const COLUMNS = [
    {
      Header: "Nome",
      accessor: "name",
      Cell: ({ row }: { row: any }) => <Text>{row?.name}</Text>,
    },
    {
      Header: "Registro",
      accessor: "register_employ",
      Cell: ({ row }: { row: any }) => <Text>{row?.register_employ}</Text>,
    },
    {
      Header: "Cargo",
      accessor: "departament",
      Cell: ({ row }: { row: any }) => <Text>{row?.departament}</Text>,
    },
    {
      Header: "Actions",
      Cell: ({ row }: { row: any }) => (
        <Button onClick={() => console.log(row?.name)}>
          <Icon as={EllipsisVerticalIcon} />
        </Button>
      ),
    },
  ];

  const createCollaborator = () => {};

  const INITIAL_VALUES = {
    name: "",
    register_employ: "",
    position: "",
    department: "",
  };

  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: createCollaborator,
  });

  const onChangeSearch = () => {};

  return (
    <Panel>
      <Text color={Colors.primary} fontSize={TextSize.heading}>
        Área dos Colaboradores
      </Text>

      <Flex justifyContent="space-between" alignItems={"center"} gap={5}>
        <Input
          name={"name"}
          placeholder="Digite o nome"
          onChange={handleChange}
        />
        <Input
          name={"register_employ"}
          placeholder="Digite o Registro"
          onChange={handleChange}
        />
        <Button style={ButtonStyle}>Pesquisar</Button>
        <Button style={ButtonStyle} onClick={() => setIsOpen(true)}>
          Cadastrar
        </Button>
      </Flex>

      <Table
        columns={COLUMNS}
        rows={data.record}
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
