import React, { useState } from "react";
import babyNames from "./babyNames.json";

import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">babyNames</header>
//     </div>
//   );
// }

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [sexFilter, setSexFilter] = useState("all");

  const handleAddNameToFavourites = (clickedName) => {
    setFavourites([...favourites, clickedName]);
  };

  const handleRemoveNameFromFavourites = (clickedName) => {
    setFavourites(favourites.filter((fave) => fave.id !== clickedName.id));
  };

  const sortedAndFilteredBabyNames = babyNames
    .sort((a, z) => {
      const nameA = a.name;
      const nameZ = z.name;
      if (nameA > nameZ) return 1;
      else if (nameA < nameZ) return -1;
      return 0;
    })
    .filter((nameObject) => {
      const { name, id, sex } = nameObject;
      const searchTermIsInName = name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const favouriteIds = favourites.map((name) => name.id);
      const isSelectedAsFavourite = favouriteIds.includes(id);

      const sexMatchesSelectedSex = sexFilter === "all" || sexFilter === sex;

      return (
        searchTermIsInName && !isSelectedAsFavourite && sexMatchesSelectedSex
      );
    });

  return (
    <div style={{ width: "80vw", height: "80vh", margin: "auto" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <RadioButton
        name="all"
        setSexFilter={setSexFilter}
        sexFilter={sexFilter}
      />
      <RadioButton name="m" setSexFilter={setSexFilter} sexFilter={sexFilter} />
      <RadioButton name="f" setSexFilter={setSexFilter} sexFilter={sexFilter} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <NameContainer
          content={sortedAndFilteredBabyNames}
          handleClick={handleAddNameToFavourites}
        />
        <NameContainer
          content={favourites}
          handleClick={handleRemoveNameFromFavourites}
        />
      </div>
    </div>
  );
};

export default App;
