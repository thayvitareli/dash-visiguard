import { Box, Flex, Text } from "@chakra-ui/react";
import { Colors } from "assets/config/theme";
import AsyncSelect from "react-select/async";

interface AsyncSelectProps {
  loadOptions: any;
  defaultOptions?: [];
  placeholder?: string;
  onChange: any;
  name?: string;
  label?: string;
  error?: any;
  touched?: boolean;
}

export default function SelectAsync({
  loadOptions,
  defaultOptions,
  placeholder,
  onChange,
  name,
  label,
  error,
  touched,
}: AsyncSelectProps) {
  return (
    <Flex direction={"column"} width={"100%"} justifyContent={"center"}>
      {label && (
        <Text color={Colors.second} mb={2}>
          {label}
        </Text>
      )}
      <AsyncSelect
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      <Box h={"30px"}>
        {error && touched && <Text color={"red"}>{error}</Text>}
      </Box>
    </Flex>
  );
}
