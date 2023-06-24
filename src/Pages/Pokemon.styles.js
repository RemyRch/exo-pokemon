import styled from "styled-components";
import { Link } from "react-router-dom";

export const NextPokemon = styled(Link)`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-align: center;
box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
`;

export const PreviousPokemon = styled(Link)`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-align: center;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
`;