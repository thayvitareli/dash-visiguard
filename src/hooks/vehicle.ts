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
    const response = await api.get("/vehicle", {
      params: {
        skip,
        take,
        search,
      },
    });

    return response.data;
  } catch (error: any) {}
};
