import axios from "axios";
import { useQuery } from "react-query";
import "../styles/data.css";
import Box from "./Box";
import { Watch } from "react-loader-spinner";

const Data = () => {
  // Date Minus 1 Day
  const today = new Date();
  const minus1 = today.getTime() - 1000 * 60 * 60 * 24 * 1;
  const minus2 = today.getTime() - 1000 * 60 * 60 * 24 * 2;
  const minus3 = today.getTime() - 1000 * 60 * 60 * 24 * 3;
  const minus4 = today.getTime() - 1000 * 60 * 60 * 24 * 4;
  const minus5 = today.getTime() - 1000 * 60 * 60 * 24 * 5;
  //
  //

  const getDateFormated = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  // Get Path
  const path = window.location.pathname.replace("/", "");
  const info = path === "" ? "/france-by-date" : window.location.pathname;
  const region = window.location.pathname.replace("/departement/", "");

  // Queries
  // Minus 1 Day Data
  const {
    data: oneDay,
    isLoading,
    isError,
  } = useQuery("One Day", () =>
    axios.get(`https://coronavirusapifr.herokuapp.com/data${info}/${getDateFormated(new Date(minus1))}`).then((res) => res.data[0])
  );
  // Minus 2 Day Data
  const {
    data: twoDay,
    isLoading: twoL,
    isError: twoE,
  } = useQuery("Two Day", () =>
    axios.get(`https://coronavirusapifr.herokuapp.com/data${info}/${getDateFormated(new Date(minus2))}`).then((res) => res.data[0])
  );
  // Minus 3 Day Data
  const {
    data: threeDay,
    isLoading: threeL,
    isError: threeE,
  } = useQuery("Three Day", () =>
    axios.get(`https://coronavirusapifr.herokuapp.com/data${info}/${getDateFormated(new Date(minus3))}`).then((res) => res.data[0])
  );

  // Minus 4 Day Data
  const {
    data: fourDay,
    isLoading: fourL,
    isError: fourE,
  } = useQuery("Four Day", () =>
    axios.get(`https://coronavirusapifr.herokuapp.com/data${info}/${getDateFormated(new Date(minus4))}`).then((res) => res.data[0])
  );
  // Minus 5 Day Data
  const {
    data: fiveDay,
    isLoading: fiveL,
    isError: fiveE,
  } = useQuery("Five Day", () =>
    axios.get(`https://coronavirusapifr.herokuapp.com/data${info}/${getDateFormated(new Date(minus5))}`).then((res) => res.data[0])
  );
  //
  //

  // Format Percentage
  const numberToPercent = (number) => {
    if (number == null) {
      return "x";
    } else {
      return (number * 100).toString().substring(0, 5) + "%";
    }
  };
  //
  //

  // Format to 4 digits
  const numberSmaller = (number) => {
    if (number == null) {
      return "x";
    } else {
      return number.toString().substring(0, 4);
    }
  };
  //
  //

  // Format Big Numbers
  const numberWithSpaces = (number) => {
    if (number == null) {
      return "x";
    } else {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  };
  //
  //

  if (isLoading || twoL || threeL || fourL || fiveL) {
    return (
      <div className="data__centered">
        <Watch heigth="100" width="100" color="lightgrey" ariaLabel="loading" />
      </div>
    );
  }

  if (isError || twoE || threeE || fourE || fiveE) {
    return (
      <div className="data__justify">
        <p>Oulah ! On dirait qu'il y a une erreur avec notre base de donn??es.</p>
        <p>
          Nos meilleurs ing??nieurs sont sur le coup, ainsi que ceux de la NASA, du MIT et de Harvard. Avec tout ce beau monde ??a ne devrait
          pas durer longtemps.
        </p>
        <p>R??essayez un peu plus tard et tout devrait ??tre revenu dans l'ordre !</p>
      </div>
    );
  }

  if (oneDay === "N") {
    return (
      <div className="data__justify">
        <p> Il semblerait qu'il y ait un petit soucis.</p>
        <p>
          Afin de r??aliser une recherche par d??partement, il vous faut taper le nom de ce d??partement sans les accents et en rempla??ant les
          espaces par des tirets.
        </p>
        <p>
          Par exemple les d??partements :
          <div className="data__centered">
            <br /> Seine Maritime (76)
            <br /> H??rault (34)
          </div>
          <br /> devraient ??tre ??crit de cette mani??re :
          <div className="data__centered">
            <br /> seine-maritime
            <br /> herault
          </div>
        </p>
      </div>
    );
  }

  return (
    <div className="data">
      <h2>
        Donn??es du : <br /> {getDateFormated(new Date(minus1))}
      </h2>
      {path === "" ? (
        <h3>
          Donn??es niveau <br />
          National
        </h3>
      ) : (
        <h3>
          Donn??es du d??partement : <br />
          {region}
        </h3>
      )}

      <div className="data__wrapper">
        <Box
          title="Nouveaux Cas J-1"
          desc="Nombre de nouveaux cas confirm??s (J-1 date de r??sultats)"
          number={numberWithSpaces(oneDay.conf_j1)}
          situation={oneDay.conf_j1 - twoDay.conf_j1 > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.conf_j1)}
        />

        <Box
          title="D??c??s en 24h"
          desc="Cumul des d??c??s constat??s ?? l'h??pital et en EMS en 24h"
          number={numberWithSpaces(oneDay.dc_tot - twoDay.dc_tot)}
          situation={oneDay.dc_tot - twoDay.dc_tot - (twoDay.dc_tot - threeDay.dc_tot) > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.dc_tot - threeDay.dc_tot)}
        />

        <Box
          title="R??animation en 24h"
          desc="Nombre de nouveaux patients admis en r??animation au cours des derni??res 24h."
          number={numberWithSpaces(oneDay.incid_rea)}
          situation={oneDay.incid_rea - twoDay.incid_rea > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.incid_rea)}
        />

        <Box
          title="Nouveaux Cas J-3"
          desc="Nombre de personnes d??clar??es positives (J-3 date de pr??l??vement)"
          number={numberWithSpaces(fourDay.pos)}
          situation={fourDay.pos - fiveDay.pos > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(fiveDay.pos)}
        />

        <Box
          title="Hospitalisations"
          desc="Nombre de patients actuellement hospitalis??s pour COVID-19."
          number={numberWithSpaces(oneDay.hosp)}
          situation={oneDay.hosp - twoDay.hosp > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.hosp)}
        />

        <Box
          title="Hospit. en 24h"
          desc="Nombre de nouveaux patients hospitalis??s au cours des derni??res 24h."
          number={numberWithSpaces(oneDay.incid_hosp)}
          situation={oneDay.incid_hosp - twoDay.incid_hosp > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.incid_hosp)}
        />

        <Box
          title="R??animation"
          desc="Nombre de patients actuellement en r??animation ou en soins intensifs."
          number={numberWithSpaces(oneDay.rea)}
          situation={oneDay.rea - twoDay.rea > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.rea)}
        />

        <Box
          title="D??c??s totaux"
          desc="Cumul des d??c??s (cumul des d??c??s constat??s ?? l'h??pital et en EMS)"
          number={numberWithSpaces(oneDay.dc_tot)}
          old={numberWithSpaces(twoDay.dc_tot)}
        />

        <Box
          title="Taux d'Incidence"
          desc="Taux d'incidence (activit?? ??pid??mique : Le taux d'incidence correspond au nombre de personnes test??es positives (RT-PCR et test antig??nique) pour la premi??re fois depuis plus de 60 jours rapport?? ?? la taille de la population. Il est exprim?? pour 100 000 habitants)"
          number={numberSmaller(fourDay.tx_incid)}
          situation={fourDay.tx_incid - fiveDay.tx_incid > 0 ? "Augmente" : "Diminue"}
          old={numberSmaller(fiveDay.tx_incid)}
        />

        <Box
          title="Taux d'Occupation"
          desc="Taux d'occupation : tension hospitali??re sur la capacit?? en r??animation (Proportion de patients atteints de COVID-19 actuellement en r??animation, en soins intensifs, ou en unit?? de surveillance continue rapport??e au total des lits en capacit?? initiale, c???est-??-dire avant d???augmenter les capacit??s de lits de r??animation dans un h??pital)."
          number={numberToPercent(oneDay.TO)}
          situation={oneDay.TO - twoDay.TO > 0 ? "Augmente" : "Diminue"}
          old={numberToPercent(twoDay.TO)}
        />

        <Box
          title="R"
          desc="Facteur de reproduction du virus (??volution du R0 : Le nombre de reproduction du virus : c???est le nombre moyen de personnes qu???une personne infect??e peut contaminer. Si le R effectif est sup??rieur ?? 1, l?????pid??mie se d??veloppe ; s???il est inf??rieur ?? 1, l?????pid??mie r??gresse)"
          number={numberSmaller(fourDay.R)}
          situation={fourDay.R - fiveDay.R > 0 ? "Augmente" : "Diminue"}
          old={numberSmaller(fiveDay.R)}
        />
      </div>
    </div>
  );
};

export default Data;
