"use client";
import { Flex, Text } from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";
import { useSidebarContext } from "contexts/sidebar.context";
import NavItem from "./navItem";
import { BuildingOffice2Icon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Icon as MyIcon } from "../../assets/svg/icons/Index";

export default function SideBar() {
  const { isOpen } = useSidebarContext();

  console.log(isOpen);
  return (
    <Flex
      pos="sticky"
      flexDir="column"
      w={isOpen ? "200px" : "80px"}
      alignItems={"center"}
      bgColor={"white"}
      gap={5}
      h="100vh"
      zIndex={999}
      borderRightWidth={2}
      borderRightColor="gray.50"
    >
      {isOpen && (
        <Text alignSelf={"start"} color="blue" p="5">
          MENU
        </Text>
      )}
      <NavItem title={"Home"} icon={BuildingOffice2Icon} link="home" />
      <NavItem
        title={"Colaboradores"}
        icon={UserGroupIcon}
        link="collaborator"
      />
      <NavItem title={"Visitantes"} icon={FiHome} link="visitor" />
      <NavItem title={"Prest. serviços"} icon={FiHome} link="suplier" />
      <NavItem title={"Veículos"} icon={MyIcon.Car} link="vehicle" />
    </Flex>
  );
}
