export const TypeIcons = (pokemon) => {
    
return (
    <>
      {pokemon.types?.map((e, key) => (
        console.log(e),
        <img
          src={`./../assets/icons/${e.type.name}.svg`}
          alt={e.type.name}
          key={key}
        />
      ))}
    </>
  );
};
