import React from "react";
import {
  Box,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Colors } from "assets/config/theme";

const Table = ({
  columns,
  rows,
  rowsPerPage,
  currentPage,
  setCurrentPage,
  totalRows,
}: {
  columns: any[];
  rows: any[];
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: any;
  totalRows: number;
}) => {
  const handleNextPage = () => {
    setCurrentPage((prevPage: any) =>
      Math.min(prevPage + 1, Math.floor(totalRows / rowsPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage: any) => Math.max(prevPage - 1, 0));
  };

  return (
    <Box>
      <ChakraTable
        backgroundColor={Colors.second}
        borderRadius={4}
        borderWidth={1}
      >
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th color="white" key={col.accessor || col.Header}>
                {col.Header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows?.map((row, rowIndex) => (
            <Tr key={rowIndex} bg={rowIndex % 2 === 0 ? "#fff" : "#8FAADC"}>
              {columns.map((col) => (
                <Td key={col.accessor || col.Header}>
                  {col.Cell ? col.Cell({ row }) : row[col.accessor]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
      <Flex
        alignItems="center"
        backgroundColor={"gray.200"}
        gap={5}
        justifyContent={"center"}
      >
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          bgColor={"gray.300"}
        >
          Anterior
        </Button>
        <Text>
          Página {currentPage + 1} de {Math.ceil(totalRows / rowsPerPage)}
        </Text>
        <Button
          onClick={handleNextPage}
          disabled={currentPage >= Math.floor(totalRows / rowsPerPage)}
          bgColor={"gray.300"}
        >
          Próxima
        </Button>
      </Flex>
    </Box>
  );
};

export default Table;
