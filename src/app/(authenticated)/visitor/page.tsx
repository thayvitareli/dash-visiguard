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
  useToast,
} from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Mask } from "@tboerc/maskfy";
import { ButtonStyle, Colors, TextSize } from "assets/config/theme";
import Input from "components/Input";
import Panel from "components/Panel";
import Table from "components/Table";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { VisitorHook } from "hooks";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function Visitor() {
  const [data, setData] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [inputSearchByRegister, setInputSearchByRegister] = useState("");
  const [reload, setReload] = useState(false);

  const toast = useToast();

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
  }, [currentPage, search, reload]);

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

  //@ts-ignore
  const createVisitor = async (values) => {
    const rg = values.rg.replace(/[.-]/g, "");
    const result = await VisitorHook.create({ ...values, rg }, toast);

    if (result) {
      setIsOpen(false);
      setReload(!reload);
      resetForm();
    }
  };

  const INITIAL_VALUES = {
    name: "",
    rg: "",
    phone: "",
  };

  const {
    values,
    handleChange,
    handleReset,
    handleSubmit,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: createVisitor,
    validationSchema,
  });

  return (
    <Panel>
      <Text color={Colors.primary} fontSize={TextSize.heading}>
        Área de Visitantes
      </Text>

      <Flex justifyContent="space-between" alignItems={"initial"} gap={5}>
        <Input
          name={"name"}
          placeholder="Digite o nome"
          //@ts-ignore
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Input
          name={"rg"}
          placeholder="Digite Rg"
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
        rows={data.records}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRows={data.total}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={Colors.primary}>
            Cadastro de Visitante
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"}>
              <Flex gap={"12px"}>
                <Input
                  name="name"
                  label="Nome"
                  placeholder="Digite o  nome"
                  onChange={handleChange}
                  error={errors.name}
                  touched={touched.name}
                />
                <Input
                  name="rg"
                  label="RG"
                  placeholder="Digite o RG"
                  onChange={handleChange}
                  error={errors.rg}
                  touched={touched.rg}
                />
              </Flex>
              <Flex alignItems={"end"} gap={"12px"}>
                <Input
                  name="phone"
                  label="Telefone"
                  placeholder="Digite o telefone"
                  onChange={handleChange}
                  value={values.phone}
                  error={errors.phone}
                  touched={touched.phone}
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
  rg: Yup.string().required("Campo obrigatório"),
  phone: Yup.string().required("Campo obrigatório"),
});
