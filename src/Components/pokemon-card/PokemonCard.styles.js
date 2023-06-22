import styled from "styled-components";
import PokemonCard from "./PokemonCard";

export const StyledPokemonCard = styled(PokemonCard)``;

export const PokemonCardContainer = styled.div`
    display: inline-block;
    font-family:'VT323', monospace;
    border-radius:2em;
    border: rgb(0, 0, 0) 3px solid;
    width: 300px;
    height: 450px;
    padding: 10px;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
    }

    main {
      margin: 20px 0;
    }

    footer {

    }
  
    .name-and-type{
      display:flex;
      background-color: red;
    }
    h3 {
      background-color: #232323;
      padding:0.2em 1em;
      border-radius:0.5em;
      text-align:center;
      display:flex;
      align-items:center;
      gap: 7.5px;
      
    }

    .types{
      display:flex;
      height: 30px;
      padding-top:0.2em;
      padding-bottom:0.2em;
      align-items:center;
      justify-content: center;
      gap: 7.5px;
      background-color: #232323;
      width:28%;
      border-radius:0.5em;
      text-align:center;
    }
  
    p {
      background-color: #232323;
      padding-left:1em;
      padding-right:1em;
      border-radius: 0.5em;
      margin:0.5em 0 0.5em 0
    }
  
  

    .imgBg {
        display:flex;
        height: 250px;
        background-color:white;
        border:solid 3px black;
        border-radius:1em;
    }
    
    .imgPkmnCards{
        margin-left:2em;
        margin-top:1.5em;
        justify-content:center;
        align-items:center;
        display:flex;
        width:80%;
        height:80%;
        
     }
     
    img {
      width: 200px;
      height: auto;
      border-radius:0.5em;
    }
  
    h3, p {
      color:white;
      text-transform:uppercase;
    }
  }`;
