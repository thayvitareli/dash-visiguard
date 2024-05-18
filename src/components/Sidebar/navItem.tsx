import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { useSidebarContext } from "contexts/sidebar.context";

interface NavItemProps {
  title: string;
  icon: any;
  link: string;
}

export default function NavItem({ title, icon, link }: NavItemProps) {
  const { isOpen } = useSidebarContext();

  return (
    <Flex
      flexDirection="column"
      alignItems={isOpen ? "flex-start" : "center"}
      w="100%"
      sx={{
        "&:hover": {
          bg: "blue.100",
        },
      }}
    >
      <Link href={`/${link}`} _hover={"none"}>
        <Flex
          justifyContent={"center"}
          alignItems="center"
          gap={2}
          marginTop={"5px"}
          marginStart={"5px"}
        >
          <Icon as={icon} color="blue" />
          {isOpen && <Text color="blue">{title}</Text>}
        </Flex>
      </Link>
    </Flex>
  );
}
