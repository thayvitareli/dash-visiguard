"use client";
import {
  Button,
  Flex,
  GridItem,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

import Input from "components/Input";
import Panel from "components/Panel";
import Table from "components/Table";
import SelectData from "components/Select";

import { VehicleHook } from "hooks";

import { VehicleTypesOptions } from "assets/config/vehicle";
import { ButtonStyle, Colors, TextSize } from "assets/config/theme";
import { VehicleTypes } from "assets/config/vehicle/vehicle.type.common";
import { iVehicle } from "interfaces/hooks";

export default function Vehicle() {
  const [data, setData] = useState<iVehicle.APIFindMany>();
  const [search, setSearch] = useState([] as any);
  const [searchByType, setSearchByType] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isOpen, setIsOpen] = useState(false);

  const [reload, setReload] = useState(false);

  const toast = useToast();

  const getData = async () => {
    const result = await VehicleHook.findMany({
      skip: currentPage * rowsPerPage,
      take: rowsPerPage,
      search,
      type: searchByType,
      toast,
    });

    setData(result);
  };

  useEffect(() => {
    getData();
  }, [currentPage, search, searchByType, reload]);

  const COLUMNS = [
    {
      Header: "Placa",
      accessor: "plate",
      Cell: ({ row }: { row: any }) => <Text>{row?.plate}</Text>,
    },
    {
      Header: "Tipo",
      accessor: "type",
      Cell: ({ row }: { row: any }) => (
        //@ts-ignore
        <Text>{VehicleTypes[Number(row?.type)]}</Text>
      ),
    },
    {
      Header: "Marca",
      accessor: "brand",
      Cell: ({ row }: { row: any }) => <Text>{row?.brand}</Text>,
    },
    {
      Header: "Modelo",
      accessor: "model",
      Cell: ({ row }: { row: any }) => <Text>{row?.model}</Text>,
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

  const INITIAL_VALUES = {
    plate: "",
    type: "",
    brand: "",
    model: "",
  };

  //@ts-ignore
  const createVehicle = async (values) => {
    console.log("submit");
    const result = await VehicleHook.create(values, toast);

    if (result) {
      setIsOpen(false);
      setReload(!reload);
    }
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
    onSubmit: createVehicle,
    validationSchema,
  });

  return (
    <Panel>
      <Text fontSize={TextSize.heading} color={Colors.primary}>
        Área de Veículos
      </Text>
      <SimpleGrid columns={{ base: 1, md: 4 }} alignItems={"initial"} gap={5}>
        <GridItem colSpan={2}>
          <Input
            name={"plate"}
            placeholder="Digite a placa"
            onChange={handleChange}
          />
        </GridItem>

        <GridItem colSpan={1}>
          <SelectData
            //@ts-ignore
            onChange={(e) => {
              setSearchByType(e?.value);
              console.log(e);
            }}
            name="searchType"
            placeholder="Selecione o tipo"
            options={[
              { value: 1, label: "automóvel" },
              { value: 2, label: "motocicleta" },
              { value: 3, label: "caminhão" },
            ]}
          />
        </GridItem>

        <GridItem display={"flex"} gap={5} flexDirection={"row"} colSpan={1}>
          <Button style={ButtonStyle} onClick={() => setSearch(values.plate)}>
            Pesquisar
          </Button>
          <Button style={ButtonStyle} onClick={() => setIsOpen(true)}>
            Cadastrar
          </Button>
        </GridItem>
      </SimpleGrid>

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
          <ModalHeader color={Colors.primary}>Cadastro de Veículo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap={"12px"}>
              <Flex gap="12px">
                <Input
                  name="plate"
                  label="Placa"
                  onChange={handleChange}
                  borderColor={Colors.second}
                  placeholder="Digite a placa"
                  error={errors.plate}
                  touched={touched.plate}
                />
                <SelectData
                  label="Tipo"
                  //@ts-ignore
                  onChange={(e) => {
                    setFieldValue("type", e.value);
                  }}
                  name="type"
                  placeholder="Selecione o tipo"
                  options={VehicleTypesOptions}
                  error={errors.type}
                  touched={touched.type}
                />
              </Flex>
              <Flex gap="12px">
                <Input
                  name="brand"
                  label="Marca"
                  onChange={handleChange}
                  borderColor={Colors.second}
                  placeholder="Digite a marca"
                  error={errors.brand}
                  touched={touched.brand}
                />
                <Input
                  name="model"
                  label="Modelo"
                  onChange={handleChange}
                  borderColor={Colors.second}
                  placeholder="Digite o modelo"
                  error={errors.model}
                  touched={touched.model}
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
  plate: Yup.string().required("Campo obrigatório"),
  brand: Yup.string().required("Campo obrigatório"),
  type: Yup.number().required("Campo obrigatório"),
  model: Yup.string().required("Campo obrigatório"),
});
