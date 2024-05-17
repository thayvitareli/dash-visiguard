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
    >
      <Link href={`/${link}`}>
        <Flex justifyItems="center" gap={2} margin="12px">
          <Icon as={icon} />
          {isOpen && <Text>{title}</Text>}
        </Flex>
      </Link>
    </Flex>
  );
}
