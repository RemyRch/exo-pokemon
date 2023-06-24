import uniqid from "uniqid";
import styled from "styled-components";
import { TypeIconCard } from "../type-icon-card/TypeIconCard";
import { useEffect } from "react";

export const TypeAffinityTable = ({ className, bgColor, sensibilities }) => {
  const colorPicker = (ratio) => {
    let color = "";
    switch (ratio) {
      case 4:
        color = "#FF5E4D";
        break;
      case 2:
        color = "#FFAAAA";
        break;
      case 0.25:
        color = "#3AF24B";
        break;
      case 0.5:
        color = "#AAFFAA";
        break;
      case 0:
        color = "#AAAAAA";
        break;
      default:
        color = "white";
        break;
    }
    return color;
  };

  return (
    <div className={className}>
      <h4 className="typeAffinity">Type Affinity</h4>

      <div className="affinities-container" style={{backgroundColor: bgColor}}>
        {Object.keys(sensibilities).map((key) => {
          return (
            <div className="affinity" key={key}>
              <TypeIconCard type={key} />
              <span style={{ backgroundColor: `${colorPicker(sensibilities[key])}`}} >{sensibilities[key]}</span>
            </div>
          )
        })}
      </div>

      {/* <table>
        <thead>
          <tr>
            {Object.keys(sensibilities).map((key) => {
              return (
                <th key={uniqid()}>
                  <span>
                    <TypeIconCard type={key} />
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(sensibilities).map((key) => {
              return (
                <td
                  style={{
                    backgroundColor: `${colorPicker(sensibilities[key])}`,
                  }}
                  key={uniqid()}
                >
                  <span>{sensibilities[key]}</span>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table> */}
    </div>
  );
};

export const StyledTypeAffinityTable = styled(TypeAffinityTable)`
  display: flex;
  flex-direction: column;
  align-items: center;
 
  h4 {
    color: white;
    justify-content: center;
    text-align: center;
    background-color: #232323;
    padding: 0.2em;
    border-radius: 0.7em;
    width: 30%;
    font-size: 1.5em;
  }

  .affinities-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 25px;
    background-color: white;
    margin-bottom:1em;
    border-radius: 0.5em;
    padding: 1.5em 0;

    .affinity {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 0.2em 10px;
      width: 6%;

      .type-icon-card {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border: 2px solid white;
        box-shadow: 0px 0px 5px black;
        img {
          height: 25px !important;
        }
      }
  
      span {
        background-color: red;
        border-radius: 0.5em;
        padding: 5px 12.5px;
        font-size:25px;
        line-height: 20px;
        color: black;
        // border: 1.5px solid black;

      }
    }
  }
`;
