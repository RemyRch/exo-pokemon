import { useEffect, useState } from "react";
import uniqid from "uniqid";
import { colours } from "../../constants/ColorsType";


export const TypeIconCard = ({ type }) => {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    setBgColor(colours[type]);
  }, [type]);

  return (
    <div className="type-icon-card" style={{ backgroundColor: bgColor }}>
      <img
        style={{ height: "1em", width: "auto", margin: "0 0 -0.2em 0" }}
        src={`/type-icons/${type}.svg`}
        alt={type}
        key={uniqid()}
      />
    </div>
  );
};
