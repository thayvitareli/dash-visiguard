import { iVisitor } from "interfaces/hooks";
import api from "services/api";

export const findMany = async ({
  skip,
  take,
  search,
  toast,
}: {
  skip: number;
  take: number;
  search?: string;
  toast?: any;
}) => {
  try {
    const response = await api.get("/visitor", {
      params: {
        skip,
        take,
        search,
      },
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

export const create = async (data: iVisitor.CreateVisitor, toast: any) => {
  try {
    const response = await api.post("/visitor", data);

    toast({
      title: "Sucesso!",
      description: "Visitante cadastrado com sucesso",
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
