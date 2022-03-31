import { Box, Center } from "native-base";
import React from "react";
import "./style.css";
import { Header } from "./header";
import { Footer } from "./footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box position="relative" bg="info.800">
      <Header />
      <Center minHeight={["75vh", "77.7vh"]}>{children}</Center>
      <Footer />
    </Box>
  );
};
