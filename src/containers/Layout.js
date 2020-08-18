import React from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Container text style={{ marginTop: "7em" }}>
        {children}
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
