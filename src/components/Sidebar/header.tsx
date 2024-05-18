"use client";
import {
  Avatar,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Colors } from "assets/config/theme";

import { AuthContext } from "contexts/auth.context";
import { useSidebarContext } from "contexts/sidebar.context";
import { useContext } from "react";

export default function NavHeader() {
  const { togglePanel } = useSidebarContext();
  const { user, logout } = useContext(AuthContext);
  let isWideVersion = useBreakpointValue({ base: false, md: true });

  return (
    <Flex
      bg="panel.bg"
      alignItems="center"
      justifyContent="space-between"
      p="6"
      borderBottomWidth={2}
      borderBottomColor="gray.50"
      height="10vh"
    >
      <Flex alignItems={"center"} gap={10}>
        <HStack spacing="24px">
          <Icon
            cursor="pointer"
            as={Bars3Icon}
            onClick={togglePanel}
            color={Colors.second}
            boxSize={8}
          />
        </HStack>
        <Flex alignItems={"center"}>
          <Image src="/Logo.png" w="32px" h="32px" />

          <Text color={Colors.second}>VisiGuardSys </Text>
        </Flex>
      </Flex>

      <HStack spacing="24px">
        <Menu>
          <MenuButton
            backgroundColor="transparent"
            color="gray.40"
            fontWeight="500"
            fontSize="14px"
            _hover={{ borderColor: "primary" }}
            _active={{ borderColor: "primaryDark" }}
            _expanded={{ bg: "transparent", borderColor: "primary" }}
          >
            {isWideVersion ? (
              <HStack spacing="10px">
                <Avatar size="sm" name={user?.name} src={user?.avatar} />
                <Text>{user?.name || "-"}</Text>
                <Icon as={ChevronDownIcon} color="primary" />
              </HStack>
            ) : (
              <Avatar size="sm" name={user?.name} src={user?.avatar} />
            )}
          </MenuButton>
          <MenuList zIndex={99999} bg="white" borderColor="gray.100">
            <MenuItem
              onClick={logout}
              _focus={{ bg: "gray.50" }}
              _hover={{ bg: "gray.50" }}
            >
              <Flex alignItems={"center"}>
                <Icon
                  mr="2"
                  as={ArrowLeftOnRectangleIcon}
                  color="primary"
                  fontSize="25px"
                />
                <Text fontSize="14px">Sair</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}
