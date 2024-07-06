import { Box, Flex, Text } from "@chakra-ui/react";
import { Colors } from "assets/config/theme";
import Select from "react-select";

interface SelectProps {
  options: any[];
  placeholder?: string;
  onChange: any;
  name?: string;
  label?: string;
  borderColor?: string;
  error?: any;
  touched?: boolean;
  value?: any
}

export default function SelectData({
  options,
  placeholder,
  onChange,
  name,
  label,
  borderColor,
  error,
  touched,
  value
}: SelectProps) {
  return (
    <Flex direction={"column"} width={"100%"} justifyContent={"center"}>
      {label && (
        <Text color={Colors.second} mb={2}>
          {label}
        </Text>
      )}
      <Select
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        options={options}
        value={value}
      />
      <Box h={"30px"}>
        {error && touched && <Text color={"red"}>{error}</Text>}
      </Box>
    </Flex>
  );
}
