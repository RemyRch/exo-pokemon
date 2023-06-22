import { TypeIconCard } from "../type-icon-card/TypeIconCard";

//uniqid est une librairie qui génère un ID aléatoire
import uniqid from "uniqid";

export const TypeIcons = ({ pokemon }) => {
  return (
    <>
      {pokemon?.types?.map(({ type }) => (
        <TypeIconCard type={type.name} key={uniqid()} />
      ))}
    </>
  );
};
