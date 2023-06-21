import styled from "styled-components";
import { Navbar } from "./Navbar";

export const Nav = styled(Navbar)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  background-color: #333;
  color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .left {
    display: flex;
    gap: 20px;
  }
`;


