import { Flex, Text } from "@chakra-ui/react";
import { Colors } from "assets/config/theme";
import Select from "react-select";

interface SelectProps {
  options: any[];
  placeholder?: string;
  onChange: any;
  name?: string;
  label?: string;
  borderColor?: string;
}

export default function SelectData({
  options,
  placeholder,
  onChange,
  name,
  label,
  borderColor,
}: SelectProps) {
  return (
    <Flex direction={"column"} width={"100%"} justifyContent={"center"}>
      <Text color={Colors.second}>{label}</Text>
      <Select
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        options={options}
      />
    </Flex>
  );
}
