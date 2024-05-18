// theme.js
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: "white",
        color: "black",
      },
    },
  },
});

export default customTheme;
