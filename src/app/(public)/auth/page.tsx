"use client";
import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import { Mask } from "@tboerc/maskfy";
import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";

import { ErrorMessages } from "assets/config";
import { AuthContext } from "contexts/auth.context";
import { AuthValuesProps } from "interfaces/pages/auth";
import Input from "components/Input";

const INITIAL_VALUES = {
  cpf: "",
  password: "",
};

export default function AuthPage() {
  const { sign } = useContext(AuthContext);

  const onSubmit = async (values: AuthValuesProps) => {
    console.log(values);
    await sign({
      cpf: values.cpf,
      password: values.password,
    });
  };

  const {
    handleBlur,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit,
  });

  return (
    <Flex w={"100vw"} justify={"center"} align={"center"}>
      <Flex w={{ base: "100%", sm: 350 }} flexDirection={"column"}>
        <Image
          mb="8"
          w="100px"
          alignSelf="center"
          src={"/public/Logo.png"}
          alt="logo"
        />

        <Stack spacing={4}>
          <Input
            placeholder="Digite o cpf"
            name="cpf"
            value={Mask.cpf.value(values.cpf)}
            label="CPF"
            onChange={(e: any) => setFieldValue("cpf", e.target.value)}
            onBlur={handleBlur}
            error={errors.cpf}
            touched={touched.cpf}
          />
          <Input
            name="password"
            label="Senha"
            onChange={(e: any) => setFieldValue("password", e.target.value)}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            password
          />
        </Stack>
        <Button
          mt={8}
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          onClick={() => handleSubmit()}
          width={"90%"}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

const validationSchema = yup.object({
  cpf: yup.string().required(ErrorMessages.required),
  password: yup.string().required().required(ErrorMessages.required),
});
