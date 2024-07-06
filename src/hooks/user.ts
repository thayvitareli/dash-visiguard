import { iCollaborator, iUser } from "interfaces/hooks";
import api from "services/api";

export const findMany = async() => {
  try {

    const response = await api.get("/user");

    return response.data;
  } catch (error: any) {}
};

export const create = async (
  data: iUser.CreateUser,
  toast: any
) => {
  try {
    const response = await api.post("/user", data);

    toast({
      title: "Sucesso!",
      description: "Usuário cadastrado com sucesso",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    return response.data;
  } catch (error: any) {
    toast({
      title: "Oops!",
      description: error?.response?.data?.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
}

export const deleteUser = async (
  id: number,
 toast: any
 ) => {
   try {
     const response = await api.delete(`/user/${id}`,);
 
     toast({
       title: "Sucesso!",
       description: "Usuário removido com sucesso",
       status: "success",
       duration: 9000,
       isClosable: true,
     });
     return response.data;
   } catch (error: any) {
     toast({
       title: "Oops!",
       description: error?.response?.data?.message,
       status: "error",
       duration: 9000,
       isClosable: true,
     });
   }
}

export const update = async (
  id: number,
  data:iUser.UpdateUser,
 toast: any
 ) => {
   try {
    console.log('hook',id)
     const response = await api.patch(`/user/${id}`, data);
 
     toast({
       title: "Sucesso!",
       description: "Usuário atualizado com sucesso",
       status: "success",
       duration: 9000,
       isClosable: true,
     });
     return response.data;
   } catch (error: any) {
     toast({
       title: "Oops!",
       description: error?.response?.data?.message,
       status: "error",
       duration: 9000,
       isClosable: true,
     });
   }
}