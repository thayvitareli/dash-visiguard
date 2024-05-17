import { Flex } from "@chakra-ui/react";
import SideBar from "components/Sidebar";
import NavHeader from "components/Sidebar/header";
import { SidebarProvider } from "contexts/sidebar.context";

import { QueryClientAndAuthProviders } from "providers/query-auth.provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientAndAuthProviders>
      <SidebarProvider>
        <NavHeader />

        <Flex>
          <SideBar />
          <Flex
            flex={1}
            h="88vh"
            flexDirection="column"
            overflowY={"scroll"}
            boxSizing="border-box"
            p={"8"}
            sx={{
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "gray.800",
                borderRadius: "24px",
              },
            }}
          >
            {children}
          </Flex>
        </Flex>
      </SidebarProvider>
    </QueryClientAndAuthProviders>
  );
}
