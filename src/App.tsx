import React from "react";
import "./index.css";
import { Outlet } from "react-router-dom";
import Tab from "./components/Tab";
import styled from "styled-components";

const Container = styled.div`
  background-color: #000000;
  width: 100vw;
  min-height: 100vh;

  display: flex;
  align-items: center;
  padding-top: 2rem;
  box-sizing: border-box;

  color: white;
  flex-direction: column;
  gap: 2rem;

  
`;

function App() {
  return (
    <Container>
      <Tab />
      <Outlet />
    </Container>
  );
}

export default App;
