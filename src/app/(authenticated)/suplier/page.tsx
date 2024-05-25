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
import { Mask } from "@tboerc/maskfy";
import { ButtonStyle, Colors, TextSize } from "assets/config/theme";
import Input from "components/Input";
import Panel from "components/Panel";
import Table from "components/Table";
import { useFormik } from "formik";
import { SuplierHook } from "hooks";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function Suplier() {
  const [data, setData] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [inputSearch, setInputSearch] = useState("");
  const [inputSearchByCNPJ, setInputSearchByCNPJ] = useState("");

  const [search, setSearch] = useState("");
  const [searchByCNPJ, setSearchByCNPJ] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const getData = async () => {
    const result = await SuplierHook.findMany({
      skip: rowsPerPage * currentPage,
      take: rowsPerPage,
      search,
      CNPJ: searchByCNPJ,
    });

    setData(result);
  };

  useEffect(() => {
    getData();
  }, [currentPage, search, searchByCNPJ]);

  const COLUMNS = [
    {
      Header: "Nome",
      accessor: "name",
      Cell: ({ row }: { row: any }) => <Text>{row?.name}</Text>,
    },
    {
      Header: "Telefone",
      accessor: "phone",
      Cell: ({ row }: { row: any }) => (
        <Text>{Mask.phone.value(row?.phone)}</Text>
      ),
    },
    {
      Header: "CNPJ",
      accessor: "cnpj",
      Cell: ({ row }: { row: any }) => (
        <Text>{Mask.cnpj.value(row?.CNPJ)}</Text>
      ),
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

  const createSuplier = () => {};

  const INITIAL_VALUES = {
    name: "",
    CNPJ: "",
    phone: "",
  };

  const { values, handleChange, handleReset, handleSubmit, errors, touched } =
    useFormik({
      initialValues: INITIAL_VALUES,
      onSubmit: createSuplier,
      validationSchema,
    });

  return (
    <Panel>
      <Text color={Colors.primary} fontSize={TextSize.heading}>
        Área de Prestadores de Serviço
      </Text>

      <Flex justifyContent="space-between" alignItems={"initial"} gap={5}>
        <Input
          name={"name"}
          placeholder="Digite o nome"
          //@ts-ignore
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Input
          name={"register_employ"}
          placeholder="Digite o CNPJ"
          //@ts-ignore
          onChange={(e) => setInputSearchByCNPJ(e.target.value)}
        />
        <Button
          style={ButtonStyle}
          onClick={() => {
            if (inputSearch) setSearch(inputSearch);
            else if (inputSearchByCNPJ) setSearchByCNPJ(inputSearchByCNPJ);
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
        rows={data?.records}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRows={data?.total}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={Colors.primary}>
            Cadastro de fornecedor
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"}>
              <Flex gap={"12px"}>
                <Input
                  name="name"
                  label="Nome"
                  placeholder="Digite o nome"
                  onChange={handleChange}
                  error={errors.name}
                  touched={touched.name}
                />
                <Input
                  name="CNPJ"
                  label="CNPJ"
                  placeholder="Digite o CNPJ"
                  onChange={handleChange}
                  error={errors.CNPJ}
                  touched={touched.CNPJ}
                />
              </Flex>
              <Flex alignItems={"end"} gap={"12px"}>
                <Input
                  name="phone"
                  label="Telefone"
                  placeholder="Digite o telefone"
                  onChange={handleChange}
                  value={Mask.phone.value(values.phone)}
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
  CNPJ: Yup.string().required("Campo obrigatório"),
  phone: Yup.number().required("Campo obrigatório"),
});
