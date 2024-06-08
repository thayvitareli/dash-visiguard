import api from "services/api";

export const findMany = async ({
  skip,
  take,
  search,
}: {
  skip?: number;
  take?: number;
  search?: string;
}) => {
  try {
    const response = await api.get("/check-in-out", {
      params: {
        skip,
        take,
        search,
      },
    });

    return response.data;
  } catch (error: any) {}
};

export const registerCheckOut = async (data: any, toast: any) => {
  try {
    const { data: response } = await api.patch(`/check-in-out`, data);

    console.log("Response", response);
    if (response) {
      toast({
        title: "Sucesso!",
        description: "Saída registrada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    return response;
  } catch (error: any) {
    console.log(error);
    toast({
      title: "Erro!",
      description:
        error?.response?.data?.message || "Tente novamente mais tarde",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};
