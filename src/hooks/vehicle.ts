import api from "services/api";

export const findMany = async ({
  skip,
  take,
  search,
  type,
  toast,
}: {
  skip: number;
  take: number;
  search?: string;
  type?: number | null;
  toast: any;
}) => {
  try {
    const response = await api.get("/vehicle", {
      params: {
        skip,
        take,
        search,
        type,
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
