"use client";
import {
  Button,
  Flex,
  GridItem,
  Icon,
  Input,
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
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { ButtonStyle, Colors, TextSize } from "assets/config/theme";
import { VehicleTypes } from "assets/config/vehicle.type.common";
import Panel from "components/Panel";
import SelectData from "components/Select";
import Table from "components/Table";
import { useFormik } from "formik";
import { VehicleHook } from "hooks";
import { useEffect, useState } from "react";

export default function Vehicle() {
  const [data, setData] = useState([] as any);
  const [search, setSearch] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [searchByType, setSearchByType] = useState(null);

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

  console.log("buscar", searchByType);

  useEffect(() => {
    getData();
  }, [currentPage, search, searchByType]);

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
  };

  const createVehicle = () => {};

  const { values, handleChange, handleReset, handleSubmit } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: createVehicle,
  });
  console.log(data);

  return (
    <Panel>
      <Text fontSize={TextSize.heading} color={Colors.primary}>
        Área de Veículos
      </Text>
      <SimpleGrid columns={{ base: 1, md: 4 }} alignItems={"center"} gap={5}>
        <GridItem colSpan={2}>
          <Input
            name={"plate"}
            placeholder="Digite a placa"
            onChange={handleChange}
          />
        </GridItem>

        <GridItem colSpan={1}>
          <SelectData
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
        totalRows={data?.total}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Veículo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input label="plate" onChange={undefined} />
            <SelectData
              onChange={({ _: any, v: number }) => {
                setSearchByType(v);
              }}
              name="type"
              placeholder="Selecione o tipo"
              options={[]}
            />
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
