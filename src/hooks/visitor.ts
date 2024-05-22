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
    console.log("hook");
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
