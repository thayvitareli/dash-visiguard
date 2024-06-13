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
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

import {
  DepartamentsOptions,
  PositionsOptions,
} from "assets/config/company-departaments";
import { ButtonStyle, Colors, TextSize } from "assets/config/theme";

import Input from "components/Input";
import Panel from "components/Panel";
import Table from "components/Table";
import SelectData from "components/Select";

import { CollaboratorHook } from "hooks";
import { iCollaborator } from "interfaces/hooks";

export default function Collaborator() {
  const [data, setData] = useState<iCollaborator.APIFindMany>();

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [search, setSearch] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [inputSearchByRegister, setInputSearchByRegister] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const toast = useToast();

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
  }, [currentPage, search, reload]);

  //@ts-ignore
  const createCollaborator = async (values) => {
    const result = await CollaboratorHook.create(values, toast);

    if (result) {
      setIsOpen(false);
      setReload(!reload);
    }
  };

  const INITIAL_VALUES = {
    name: "",
    register_employee: "",
    position: "",
    departament: "",
  };

  const {
    values,
    handleChange,
    handleReset,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: createCollaborator,
    validationSchema,
  });

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
      accessor: "position",
      Cell: ({ row }: { row: any }) => <Text>{row?.position}</Text>,
    },
    {
      Header: "Setor",
      accessor: "departament",
      Cell: ({ row }: { row: any }) => <Text>{row?.departament}</Text>,
    },
    {
      Header: "Cadastrado em",
      accessor: "created_at",
      Cell: ({ row }: { row: any }) => (
        <Text>{dayjs(row?.created_at).format("DD/MM/YYYY")}</Text>
      ),
    },
    {
      Header: "Actions",
      Cell: ({ row }: { row: any }) => (
        <Button onClick={() => console.log(row)}>
          <Icon as={EllipsisVerticalIcon} />
        </Button>
      ),
    },
  ];

  console.log(values);

  return (
    <Panel>
      <Text color={Colors.primary} fontSize={TextSize.heading}>
        Área de Colaboradores
      </Text>

      <Flex justifyContent="space-between" alignItems={"initial"} gap={5}>
        <Input
          name={"name"}
          placeholder="Digite o nome"
          //@ts-ignore
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Input
          name={"register_employee"}
          placeholder="Digite o Registro"
          //@ts-ignore
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
        rows={data?.records || []}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRows={data?.total ?? 1}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={Colors.primary}>
            Cadastro de Colaborador
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"}>
              <Flex gap="12px">
                <Input
                  name="name"
                  label="Nome"
                  onChange={handleChange}
                  borderColor={Colors.second}
                  placeholder="Digite o nome"
                  error={errors.name}
                  touched={touched.name}
                />
                <Input
                  name="register_employee"
                  label="Registro"
                  onChange={handleChange}
                  borderColor={Colors.second}
                  placeholder="Digite o número de registro"
                  error={errors.register_employee}
                  touched={touched.register_employee}
                />
              </Flex>
              <Flex gap="12px">
                <SelectData
                  name="position"
                  options={PositionsOptions}
                  //@ts-ignore
                  onChange={(e) => {
                    console.log(e), setFieldValue("position", e?.value);
                  }}
                  label="cargo"
                  borderColor={Colors.second}
                  placeholder="Selecione o cargo"
                  error={errors.position}
                  touched={touched.position}
                />
                <SelectData
                  name="departament"
                  options={DepartamentsOptions}
                  //@ts-ignore
                  onChange={(e) => setFieldValue("departament", e?.value)}
                  label="setor"
                  borderColor={Colors.second}
                  placeholder="Digite o setor"
                  error={errors.departament}
                  touched={touched.departament}
                />
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                setIsOpen(false), handleReset(e);
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  register_employee: Yup.string().required("Campo obrigatório"),
  position: Yup.number().required("Seleção obrigatória"),
  departament: Yup.number().required("Seleção obrigatória"),
});
