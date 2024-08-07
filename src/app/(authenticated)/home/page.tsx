"use client";

import {
  Button,
  Flex,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Checkbox,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import Table from "components/Table";
import Input from "components/Input";
import Panel from "components/Panel";
import SelectAsync from "components/SelectAsync";

import { findMany } from "hooks/check";
import { CheckHook, CollaboratorHook, SuplierHook, VisitorHook } from "hooks";

import { ButtonStyle, Colors, TextSize } from "assets/config/theme";
import { TypeCheckCommon } from "assets/config/typeChecksCommon";

import iCreateCheckIn from "interfaces/hooks/check-in.interface";

export default function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1000);
  const [search, setSearch] = useState("");

  const [selectedValue, setSelectedValue] = useState(1);
  const [selectedRegister, setSelectedRegister] = useState<any>(null);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const cancelRef = React.useRef();

  const toast = useToast();

  const getChecks = async () => {
    const result = await findMany({});

    setData(result);
  };

  useEffect(() => {
    getChecks();
  }, [refresh, currentPage, search]);

  const checkRegisterType = (register: any) => {
    if (register.visitor_id) return 1;
    if (register.suplier_id) return 2;
    if (register.collaborator_id) return 3;
  };

  const handleRadioChange = (value: string) => {
    setSelectedValue(Number(value));
    setFieldValue("type", Number(value));
  };

  async function findSupliers(value: string) {
    const response = await SuplierHook.findMany({
      skip: 0,
      take: 10,
      search: value,
    });

    const options = response.records?.map((record: any) => {
      return {
        value: record.id,
        label: record.name,
      };
    });

    return options;
  }

  async function findCollaborators(value: string) {
    const response = await CollaboratorHook.findMany({
      skip: 0,
      take: 15,
      search: value,
    });

    const options = response?.records?.map((record: any) => {
      return {
        value: record.id,
        label: record.name,
      };
    });

    return options;
  }

  async function findVisitors(value: string) {
    const response = await VisitorHook.findMany({
      skip: 0,
      take: 15,
      search: value,
    });

    const options = response.record?.map((record: any) => {
      return {
        value: record.id,
        label: record.name,
      };
    });

    return options;
  }

  const registerCheckOut = async () => {
    const type = checkRegisterType(selectedRegister);
    const data = {
      id: selectedRegister?.id,
      type,
    };
    const result = await CheckHook.registerCheckOut(data, toast);

    if (result) setRefresh(!refresh);

    setIsAlertOpen(false);
  };

  const registerCheckIn = async (values: iCreateCheckIn) => {
    switch (values.type) {
      case 1:
        delete values["suplier_id"];
        delete values["collaborator_id"];
        break;
      case 2:
        delete values["visitor_id"];
        delete values["collaborator_id"];
        break;
      case 3:
        delete values["visitor_id"];
        delete values["suplier_id"];
        break;
    }

    const document = values.document.replace(/[.-]/g, "");
    await CheckHook.registerCheckIn({ ...values, document }, toast);

    setRefresh(!refresh);
    setIsModalOpen(false);
  };

  const handleFilterBySearch = () => {
   
  };

  const { values, handleChange, handleSubmit, handleReset, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        document: "",
        plate: "",
        type: 1,
        suplier_id: "",
        collaborator_id: "",
        visitor_id: "",
      },
      onSubmit: registerCheckIn,
    });

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
    {
      Header: "Registrar saida",
      Cell: ({ row }: { row: any }) => (
        <Button
          style={{ ...ButtonStyle, width: "150px" }}
          onClick={() => {
            setSelectedRegister(row);
            setIsAlertOpen(true);
          }}
        >
          Registrar saída
        </Button>
      ),
    },
  ];

  return (
    <Panel>
      <Text fontSize={TextSize.heading}>Bem vindo</Text>

      <Flex justifyContent="space-between" alignItems={"flex-start"} gap={5}>
        <Input
          name={"name"}
          placeholder="Digite o nome"
          onChange={(value: string) => setSearch(value)}
        />
        <Input
          name={"document"}
          placeholder="Digite o Documento"
          onChange={(value: string) => setSearch(value)}
        />
        <Button style={ButtonStyle} onClick={handleFilterBySearch}>
          Pesquisar
        </Button>
        <Button
          style={{ ...ButtonStyle, width: 350 }}
          onClick={() => setIsModalOpen(true)}
        >
          Registrar Entrada
        </Button>
      </Flex>

      <Stack spacing={5} direction="row">
        <Checkbox>Collaborador</Checkbox>
        <Checkbox>Prestador de Serviço</Checkbox>
        <Checkbox>Visitante</Checkbox>
      </Stack>

      <Table
        columns={COLUMNS}
        rows={data}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRows={data.length}
      />

      <AlertDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        //@ts-ignore
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Registrar Saída
            </AlertDialogHeader>

            <AlertDialogBody>Deseja confirmar a operação?</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setIsAlertOpen(false)}>Cancelar</Button>
              <Button
                colorScheme="blue"
                onClick={() => registerCheckOut()}
                ml={3}
              >
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={Colors.primary}>Registrar Entrada</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"}>
              <RadioGroup
                value={selectedValue.toString()}
                name="type"
                onChange={handleRadioChange}
              >
                <Stack spacing={5} direction="row">
                  <Radio value={TypeCheckCommon.collaborator.toString()}>
                    Collaborador
                  </Radio>
                  <Radio value={TypeCheckCommon.suplier.toString()}>
                    Prestador de Serviço
                  </Radio>
                  <Radio value={TypeCheckCommon.visitor.toString()}>
                    Visitante
                  </Radio>
                </Stack>
              </RadioGroup>
              <Flex gap="12px" mt="15px">
                {selectedValue === TypeCheckCommon.collaborator ? (
                  <SelectAsync
                    label="Selecione um colaborador"
                    name="name"
                    loadOptions={findCollaborators}
                    onChange={(option: { label: string; value: string }) =>
                      setFieldValue("collaborator_id", option.value)
                    }
                    placeholder="Busque pelo nome"
                  />
                ) : (
                  <>
                    <Input
                      name="name"
                      label="Nome"
                      onChange={handleChange}
                      borderColor={Colors.second}
                      placeholder="Digite o nome"
                    />
                    <Input
                      name="document"
                      label={"RG"}
                      onChange={handleChange}
                      borderColor={Colors.second}
                      placeholder={"Digite o RG"}
                    />
                  </>
                )}
              </Flex>
              <Input
                name="plate"
                label="Placa"
                onChange={handleChange}
                borderColor={Colors.second}
                placeholder="Digite a placa"
                value={values.plate}
              />
              {selectedValue == TypeCheckCommon.suplier ? (
                <SelectAsync
                  label="Selecione a empresa"
                  loadOptions={findSupliers}
                  onChange={(option: { label: string; value: string }) =>
                    setFieldValue("suplier_id", option.value)
                  }
                  placeholder="Busque pelo nome da empresa"
                />
              ) : null}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                setIsModalOpen(false), handleReset(e);
              }}
            >
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={() => handleSubmit()}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Panel>
  );
}
