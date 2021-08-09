import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export const MainView = () => {
  return (
    <div className="main-view">
      <h2>Hva er Workout Tracker? </h2>
      <p>
        Workout Tracker er et verktøy for å loggføre treningen din digitalt. Den
        kan bringes med overalt og tar ingen plass. Det er også mulig å se sine
        tidligere treningsøkter.
      </p>
      <p>
        Det skal også være mulig å se sin egen progresjon på diverse øvelser,
        slik at man enkelt kan tilpasse og optimalisere trening slik at man får
        maks utbytte. LOL.
      </p>
      <br /> <br />
      <Button component={Link} to="/newWorkout" variant="outlined">
        Opprett ny treningsøkt
      </Button>
    </div>
  );
};
