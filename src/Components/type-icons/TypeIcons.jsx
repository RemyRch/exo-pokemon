import bug from "../../assets/type-icons/bug.svg";
import dark from "../../assets/type-icons/dark.svg";
import dragon from "../../assets/type-icons/dragon.svg";
import electric from "../../assets/type-icons/electric.svg";
import fairy from "../../assets/type-icons/fairy.svg";
import fighting from "../../assets/type-icons/fighting.svg";
import fire from "../../assets/type-icons/fire.svg";
import flying from "../../assets/type-icons/flying.svg";
import ghost from "../../assets/type-icons/ghost.svg";
import grass from "../../assets/type-icons/grass.svg";
import ground from "../../assets/type-icons/ground.svg";
import ice from "../../assets/type-icons/ice.svg";
import normal from "../../assets/type-icons/normal.svg";
import poison from "../../assets/type-icons/poison.svg";
import psychic from "../../assets/type-icons/psychic.svg";
import rock from "../../assets/type-icons/rock.svg";
import steel from "../../assets/type-icons/steel.svg";
import water from "../../assets/type-icons/water.svg";

//uniqid est une librairie qui génère un ID aléatoire
import uniqid from "uniqid";

export const TypeIcons = ({ pokemon }) => {

  const getSource = (type) => {

    // if (imports[type]) return imports[type];
    // return null;

    switch (type) {
      case "bug":
        return bug;
      case "dark":
        return dark;
      case "dragon":
        return dragon;
      case "electric":
        return electric;
      case "fairy":
        return fairy;
      case "fighting":
        return fighting;
      case "fire":
        return fire;
      case "flying":
        return flying;
      case "ghost":
        return ghost;
      case "grass":
        return grass;
      case "ground":
        return ground;
      case "ice":
        return ice;
      case "normal":
        return normal;
      case "poison":
        return poison;
      case "psychic":
        return psychic;
      case "rock":
        return rock;
      case "steel":
        return steel;
      case "water":
        return water;
      default:
        return "";
    }
  }

return (
    <>
      {pokemon?.types?.map(({ type }) => (
        // <div style={{}}>
          <img
          style={{height:"1em", width:"auto", margin:"0 0 -0.2em 0"}}
          src={getSource(type.name)}
          alt={type.name}
          key={uniqid()}
          />
        // </div>
      ))}
    </>
  );
};
