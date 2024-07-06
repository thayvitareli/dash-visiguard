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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PencilIcon, TrashIcon, UserMinusIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";

import { ButtonStyle, Colors, TextSize } from "assets/config/theme";

import Input from "components/Input";
import Panel from "components/Panel";
import Table from "components/Table";
import SelectData from "components/Select";

import { UserHook } from "hooks";
import { iUser } from "interfaces/hooks";
import { Mask } from "@tboerc/maskfy";
import { AuthContext } from "contexts/auth.context";
import React from "react";

const PrivilegeOptions = [
  {value: 0, label:"comum"},
  {value: 1, label:"administrador"}
]

export default function User() {
  const [data, setData] = useState<iUser.APIFindMany>();

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [search, setSearch] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [inputSearchByCPF, setInputSearchByCPF] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)


  const [selectedUser,setSelectedUser] = useState({} as iUser.User)

  const {user}= useContext(AuthContext)

  const toast = useToast();

  const cancelRef = React.useRef()

  const getData = async () => {
    const result = await UserHook.findMany();

    setData(result);
  };


  useEffect(() => {
    getData();
  }, [currentPage, search, reload]);

  //@ts-ignore
  const createUser = async (values) => {
    const result = await UserHook.create(values, toast);

    if (result) {
      setIsOpen(false);
      setReload(!reload);
    }
  };

  const deleteUser = async(id: number)=>{
    await UserHook.deleteUser(id, toast)
    setIsDeleteAlertOpen(false)
    setSelectedUser({} as iUser.User)
    setReload(!reload)
  }

  const INITIAL_VALUES = {
    name: "",
    password: "",
    privilege: "",
    CPF: "",
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
    onSubmit: createUser,
    validationSchema,
  });

  const COLUMNS = [
    {
      Header: "Nome",
      accessor: "name",
      Cell: ({ row }: { row: any }) => <Text>{row?.name}</Text>,
    },
    {
      Header: "CPF",
      accessor: "CPF",
      Cell: ({ row }: { row: any }) => <Text>{Mask.cpf.value(row?.CPF)}</Text>,
    },
    {
      Header: "Permissão",
      accessor: "privilege",
      Cell: ({ row }: { row: any }) => (
        <Text>{row?.privilege ?  'Admin' : 'Comum'}</Text>
      ),
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
       <Flex gap={5}>
         <Button onClick={() => {setUpdateFormikValues(row), setIsOpenEditModal(true)}}>
          <Icon as={PencilIcon} />
        </Button>
        <Button onClick={() => {setSelectedUser(row), setIsDeleteAlertOpen(true)}}>
          <Icon as={UserMinusIcon} />
        </Button>
       </Flex>
      ),
    },
  ];

  const updateUser = async(values: iUser.UpdateUser) => {
    console.log(values)
    const id = Number(values.id);

    if(!values.password)
      delete values['password'];

    delete values['id'];

    await UserHook.update(id, values, toast)
  }


  const setUpdateFormikValues = (user: iUser.UpdateUser) => {
    updateFormik.setFieldValue('name', user.name)
    updateFormik.setFieldValue('password','')
    updateFormik.setFieldValue('privilege',user.privilege)
    updateFormik.setFieldValue('CPF',user.CPF)
    updateFormik.setFieldValue('id',user.id)


  }

  const updateFormik= useFormik({
    //@ts-ignore
    initialValues: INITIAL_VALUES,
    onSubmit: updateUser,
  });

  return (
    <>
    {
      user?.pv ?
      <Panel>
      <Text color={Colors.primary} fontSize={TextSize.heading}>
        Área de Usuários
      </Text>

      <Flex justifyContent="space-between" alignItems={"initial"} gap={5}>
        <Input
          name={"name"}
          placeholder="Digite o nome"
          //@ts-ignore
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <Input
          name={"CPF"}
          placeholder="Digite o CPF"
          //@ts-ignore
          onChange={(e) => setInputSearchByCPF(e.target.value)}
        />
        <Button
          style={ButtonStyle}
          onClick={() => {
            if (inputSearch) setSearch(inputSearch);
            else if (inputSearchByCPF) setSearch(inputSearchByCPF);
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
        totalRows={data?.records?.length ?? 1}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={Colors.primary}>
            Cadastro de Usuário
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
                  name="CPF"
                  label="CPF"
                  //@ts-ignore
                  onChange={(e) => setFieldValue('CPF',Mask.cpf.value(e.target.value))}
                  borderColor={Colors.second}
                  value={values.CPF}
                  placeholder="Digite o número do CPF"
                  error={errors.CPF}
                  touched={touched.CPF}
                />
              </Flex>
              <Flex gap="12px">
                <SelectData
                  name="privilege"
                  options={PrivilegeOptions}
                  //@ts-ignore
                  onChange={(e) => {
                     setFieldValue("privilege", e?.value);
                  }}
                  label="Tipo de acesso"
                  borderColor={Colors.second}
                  placeholder="Selecione"
                  error={errors.privilege}
                  touched={touched.privilege}
                />
                <Input
                  name="password"
                  password
                  label="Senha"
                  onChange={(e: any) => setFieldValue("password", e.target.value)}
                  borderColor={Colors.second}
                  placeholder="Digite a senha"
                  error={errors.password}
                  touched={touched.password}
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

      <Modal isOpen={isOpenEditModal} onClose={() => setIsOpenEditModal(false)} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={Colors.primary}>
            Editar usuário
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"}>
              <Flex gap="12px">
                <Input
                  name="name"
                  label="Nome"
                  //@ts-ignore
                  onChange={(e) => updateFormik.setFieldValue('name',e.target.value)}
                  borderColor={Colors.second}
                  placeholder="Digite o nome"
                  error={updateFormik.errors.name}
                  touched={updateFormik.touched.name}
                  value={updateFormik?.values.name}
                />
                <Input
                  name="CPF"
                  label="CPF"
                  //@ts-ignore
                  onChange={() =>{}}
                  borderColor={Colors.second}
                  placeholder="Digite o número do CPF"
                  value={updateFormik?.values.CPF}
                  isDisabled
                />
              </Flex>
              <Flex gap="12px">
                <SelectData
                  name="privilege"
                  options={PrivilegeOptions}
                  //@ts-ignore
                  onChange={(e) => {
                     updateFormik.setFieldValue("privilege", e?.value);
                  }}
                  label="Tipo de acesso"
                  borderColor={Colors.second}
                  placeholder="Selecione"
                  error={updateFormik.errors.privilege}
                  touched={updateFormik.touched.privilege}
                  value={PrivilegeOptions.find(option => option.value == Number(updateFormik.values.privilege))?.value}
                />
                <Input
                  name="password"
                  password
                  label="Senha"
                  onChange={(e: any) => updateFormik.setFieldValue("password", e.target.value)}
                  borderColor={Colors.second}
                  placeholder="Digite a senha"
                  error={updateFormik.errors.password}
                  touched={updateFormik.touched.password}
                />
                
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                setIsOpenEditModal(false), updateFormik.handleReset(e);
              }}
            >
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={() => updateFormik.handleSubmit()}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        //@ts-ignore
        leastDestructiveRef={cancelRef}
        onClose={()=> setIsDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Remover usuário
            </AlertDialogHeader>

            <AlertDialogBody>
             Você tem certeza que deseja remover o usuário <b>{selectedUser?.name }</b>? <br/><br/>
             O usuário continuará a existir no banco, mas sua visualização e acesso ao sistema estarão indisponíveis. <br/><br/>
             <b>Essa ação não poderá ser desfeita.</b>         
             </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={()=> { setIsDeleteAlertOpen(false), setSelectedUser({} as iUser.User)}}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={() => deleteUser(selectedUser?.id)} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Panel>
     :
     null
    }
    </>
 
  );
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  CPF: Yup.string().required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
  privilege: Yup.number().required("Seleção obrigatória"),
});



