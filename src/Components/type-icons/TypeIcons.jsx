import { TypeIconCard } from "../type-icon-card/TypeIconCard";

//uniqid est une librairie qui génère un ID aléatoire
import uniqid from "uniqid";

export const TypeIcons = ({ pokemon, home }) => {
  const getTypes = () => {
    if (home) {
      return pokemon?.types;
    } else {
      return pokemon?.types;
    }
  };
  return (
    <>
      {getTypes()?.map((type) => (
        home ? (
          <TypeIconCard type={type.name} key={uniqid()} />
        ) : (
          <TypeIconCard type={type.type.name} key={uniqid()} />
        )
      ))}
    </>
  );
};
