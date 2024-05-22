import { Flex } from "@chakra-ui/react";

export default function Panel({ children, gap = 5 }: any) {
  return (
    <Flex flexDirection={"column"} gap={gap}>
      {children}
    </Flex>
  );
}
