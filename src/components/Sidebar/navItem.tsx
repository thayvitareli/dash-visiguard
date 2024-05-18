import { Flex, Icon, Link, Text, Tooltip } from "@chakra-ui/react";
import { Colors } from "assets/config/theme";
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
      pl={isOpen ? "5" : 0}
      sx={{
        "&:hover": {
          bg: "blue.100",
        },
      }}
    >
      <Tooltip label={!isOpen ? `Ir para página: ${title}` : ""}>
        <Link href={`/${link}`} _hover={"none"}>
          <Flex
            justifyContent={"center"}
            alignItems="center"
            gap={2}
            marginTop={"5px"}
            marginStart={"5px"}
          >
            <Icon as={icon} color={Colors.second} boxSize={7} />
            {isOpen && <Text color={Colors.second}>{title}</Text>}
          </Flex>
        </Link>
      </Tooltip>
    </Flex>
  );
}
