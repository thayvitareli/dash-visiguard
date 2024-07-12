import iCreateCheckIn from "interfaces/hooks/check-in.interface";
import api from "services/api";

export const findMany = async ({ from, to }: { from?: Date; to?: Date }) => {
  try {
    const response = await api.get("/check-in-out", {
      params: {
        from,
        to,
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

export const registerCheckIn = async (data: iCreateCheckIn, toast: any) => {
  try {
    const { data: response } = await api.post(`/check-in-out`, data);

    console.log("Response", response);
    if (response) {
      toast({
        title: "Sucesso!",
        description: "Entrada registrada com sucesso.",
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

export const exportRegisterToXLSX = async ({
  from,
  to,
}: {
  from?: Date;
  to?: Date;
}) => {
  try {
    const response = await api.get("/check-in-out/export", {
      params: {
        from,
        to,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
