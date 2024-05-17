"use client";
import { Flex, IconButton } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FiHome, FiMenu } from "react-icons/fi";
import { useSidebarContext } from "contexts/sidebar.context";
import NavItem from "./navItem";

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
      <NavItem title={"Home"} icon={FiHome} link="teste" />
    </Flex>
  );
}
