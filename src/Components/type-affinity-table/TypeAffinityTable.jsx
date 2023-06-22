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

      <div className="affinities-container">
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
  // border-collapse: collapse;
  // width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 10px;

  // td {
  //   text-align: center;
  //   border-radius: 0.5em;
  // }

  // span {
  //   color: black;
  //   font-size: 25px;
  // }

  h4 {
    color: white;
    justify-content: center;
    text-align: center;
    background-color: #232323;
    padding: 0.2em;
    border-radius: 0.7em;
    width: 30%;
  }

  .affinities-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .affinity {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 0.2em 10px;

      .type-icon-card {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        
        img {
          height: 25px !important;
        }
      }
  
      span {
        background-color: red;
        border-radius: 0.5em;
        padding: 5px 12.5px;
        line-height: 20px;
        color: black;
      }
    }
  }
`;
