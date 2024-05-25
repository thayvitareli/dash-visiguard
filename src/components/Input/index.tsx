import {
  InputGroup,
  Input as InputChakra,
  Text,
  Icon,
  Button,
  Flex,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { Colors } from "assets/config/theme";
import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";

interface InputProps {
  placeholder?: string;
  onChange: any;
  name?: string;
  onBlur?: any;
  label?: string;
  error?: any;
  touched?: boolean;
  password?: boolean;
  value?: any;
  borderColor?: string;
}

const style = {
  borderWidth: 1,
  borderColor: "lightgray",
  borderRadius: 4,
};

export default function Input({
  onChange,
  name,
  placeholder,
  onBlur,
  label,
  error = false,
  touched = false,
  password,
  value,
  borderColor = "black",
}: InputProps) {
  const [show, setShow] = useState(false);

  return password ? (
    <Flex direction={"column"} width={"100%"}>
      <Text>{label}</Text>
      <InputGroup style={style} mt={2} alignItems={"center"}>
        <InputChakra
          type={show ? "text" : "password"}
          placeholder="Digite a senha"
          borderWidth={0}
          onChange={onChange}
          borderColor={borderColor}
        />
        <InputRightElement width="4.5rem">
          <Button
            size="sm"
            onClick={() => setShow(!show)}
            backgroundColor={"transparent"}
            _hover={"none"}
          >
            {show ? <Icon as={GoEyeClosed} /> : <Icon as={GoEye} />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error && touched && (
        <Text color={"red"} mt={2}>
          {error}
        </Text>
      )}
    </Flex>
  ) : (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      width="100%"
      bgColor={"yellow"}
    >
      <Text color={Colors.second}>{label}</Text>
      <InputChakra
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        mt={label ? 2 : 0}
        style={style}
        value={value}
        borderColor={borderColor}
      />
      <Box h={"30px"}>
        {error && touched && <Text color={"red"}>{error}</Text>}
      </Box>
    </Flex>
  );
}
