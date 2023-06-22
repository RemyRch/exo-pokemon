import uniqid from "uniqid";
import styled from "styled-components";
import { TypeIconCard } from "../type-icon-card/TypeIconCard";

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
        color = "#AAFFAA";
        break;
      case 0.5:
        color = "#3AF24B";
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

      <table>
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
      </table>
    </div>
  );
};

export const StyledTypeAffinityTable = styled(TypeAffinityTable)`
  border-collapse: collapse;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  td {
    text-align: center;
    border-radius: 0.5em;
  }

  span {
    color: black;
    font-size: 25px;
  }

  h4 {
    color: white;
    justify-content: center;
    text-align: center;
    background-color: #232323;
    padding: 0.2em;
    border-radius: 0.7em;
    width: 30%;
  }
`;
