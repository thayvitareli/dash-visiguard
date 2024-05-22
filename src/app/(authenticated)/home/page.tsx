"use client";
import React, { useEffect, useState } from "react";
import { TextSize } from "assets/config/theme";
import { Button, Icon, Text } from "@chakra-ui/react";
import Table from "components/Table";
import { FaIcons } from "react-icons/fa";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <Text fontSize={TextSize.heading}>Bem vindo</Text>
    </>
  );
}
