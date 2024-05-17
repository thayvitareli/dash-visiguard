"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "contexts/auth.context";

export const colors = {
  primary: "#0865ff",
  primaryHover: "#055ae8",

  panel: {
    bg: "#ffffff",
  },

  text: {
    primary: "#1a1a1a",
  },
};

export function ChakraProviderApp({ children }: { children: React.ReactNode }) {
  const theme = extendTheme({
    colors,
    fonts: {
      heading: "Poppins",
      body: "Poppins",
    },

    styles: {
      global: {
        body: {
          backgroundColor: "gray.100",
          color: colors.text.primary,
        },
      },
    },

    components: {
      Button: {
        variants: {
          primary: {
            bg: "primary",
            color: "white",
            fontSize: "16px",
            _hover: {
              bg: "primaryHover !important",
            },
          },
        },
      },
    },
  });

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
