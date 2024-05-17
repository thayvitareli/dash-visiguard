"use client";
import Select from "react-select";

import { Flex, Heading } from "@chakra-ui/react";
import { useFormik } from "formik";

export default function Index() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      food: "",
    },
    onSubmit,
  });

  console.log(formik.values);

  return (
    <Flex mt={5} flexDir={"column"}>
      <Heading>System </Heading>
      <Select
        options={options}
        isMulti
        onChange={(value) => formik.setFieldValue("foord", value.values)}
      />
    </Flex>
  );
}
