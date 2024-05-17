"use client";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { ChakraProviderApp } from "providers/chakra.provider";

dayjs.extend(utc);
dayjs.extend(timezone);

const customPlugin = (option: any, dayjsClass: any) => {
  const OldFormat = dayjsClass.prototype.format;

  dayjsClass.prototype.format = function (formatStr: any) {
    return OldFormat.call(this.add(option, "hour"), formatStr);
  };
};

dayjs.extend(customPlugin, 3);

dayjs.locale("pt-br");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-bt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <ChakraProviderApp>{children}</ChakraProviderApp>
      </body>
    </html>
  );
}
