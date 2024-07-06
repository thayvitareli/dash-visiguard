"use client";
import { Flex, Text } from "@chakra-ui/react";
import { GiCityCar } from "react-icons/gi";
import {   FaHandshake,  } from "react-icons/fa";
import {  FaPeopleGroup, FaRegAddressCard } from "react-icons/fa6";

import { useSidebarContext } from "contexts/sidebar.context";
import NavItem from "./navItem";
import {  ArchiveBoxIcon, ArchiveBoxXMarkIcon, BuildingOffice2Icon, ClipboardDocumentIcon, DocumentIcon, UserCircleIcon, UserGroupIcon, UserIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Colors } from "assets/config/theme";
import { useContext } from "react";
import { AuthContext } from "contexts/auth.context";

export default function SideBar() {
  const { isOpen } = useSidebarContext();
  const {user} = useContext(AuthContext);

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
        <Text alignSelf={"start"} color={Colors.second} p="5">
          MENU
        </Text>
      )}

      <NavItem title={"Home"} icon={BuildingOffice2Icon} link="home" />
      <NavItem title={"Colaboradores"} icon={FaPeopleGroup} link="collaborator" />
      <NavItem title={"Visitantes"} icon={FaRegAddressCard} link="visitor" />
      <NavItem title={"Prest. serviços"} icon={FaHandshake} link="suplier" />
      <NavItem title={"Veículos"} icon={GiCityCar} link="vehicle" />

      { user.pv ?
       ( 
       <>
       <NavItem title={"Usuários"} icon={UserPlusIcon} link="user" />
       <NavItem title={"Arquivos"} icon={ArchiveBoxIcon} link="arquive" />
       </>)

        : 
        null}

      
    </Flex>
  );
}
