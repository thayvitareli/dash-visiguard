import { iCollaborator } from "interfaces/hooks";
import api from "services/api";

export const findMany = async ({
  skip,
  take,
  search,
}: {
  skip: number;
  take: number;
  search?: string;
}) => {
  try {
    console.log(skip, take);
    const response = await api.get("/collaborator", {
      params: {
        skip,
        take,
        search,
      },
    });

    return response.data;
  } catch (error: any) {}
};

export const create = async (
  data: iCollaborator.CreateCollaborator,
  toast: any
) => {
  try {
    const response = await api.post("/collaborator", data);

    toast({
      title: "Sucesso!",
      description: "Colaborador criado com sucesso",
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
};
