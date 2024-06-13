import { iSuplier } from "interfaces/hooks";
import api from "services/api";

export const findMany = async ({
  skip,
  take,
  search,
  toast,
  CNPJ,
}: {
  skip: number;
  take: number;
  search?: string;
  toast?: any;
  CNPJ?: string;
}) => {
  try {
    const response = await api.get("/suplier", {
      params: {
        skip,
        take,
        search,
        CNPJ,
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

export const create = async (data: iSuplier.CreateSuplier, toast: any) => {
  try {
    const { data: result } = await api.post("/suplier", data);

    if (result) {
      toast({
        title: "Sucesso!",
        description: "Empresa cadastrada com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }

    return result;
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
