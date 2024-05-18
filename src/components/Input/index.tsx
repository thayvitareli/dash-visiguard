import {
  InputGroup,
  Input as InputChakra,
  Text,
  Icon,
  Button,
  Flex,
  InputRightElement,
} from "@chakra-ui/react";
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
  width: "90%",
};

export default function Input({
  onChange,
  name,
  placeholder,
  onBlur,
  label,
  error,
  touched,
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
    <Flex direction={"column"} width={"100%"}>
      <Text>{label}</Text>
      <InputChakra
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        mt={2}
        style={style}
        value={value}
        borderColor={borderColor}
      />
      {error && touched && (
        <Text color={"red"} mt={2}>
          {error}
        </Text>
      )}
    </Flex>
  );
}
