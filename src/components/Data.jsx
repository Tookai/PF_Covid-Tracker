import axios from "axios";
import { useQuery } from "react-query";
import "../styles/data.css";
import Box from "./Box";

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
    return <div>Is Loading</div>;
  }

  if (isError || twoE || threeE || fourE || fiveE) {
    return <div>Is Error</div>;
  }

  return (
    <div className="data">
      <h2>
        Données du : <br /> {getDateFormated(new Date(minus1))}
      </h2>
      {path === "" ? (
        <h3>
          Données niveau <br />
          National
        </h3>
      ) : (
        <h3>
          Données du département : <br />
          {region}
        </h3>
      )}
      <div className="data__wrapper">
        <Box
          title="Nouveaux Cas J-1"
          desc="Nombre de nouveaux cas confirmés (J-1 date de résultats)"
          number={numberWithSpaces(oneDay.conf_j1)}
          situation={oneDay.conf_j1 - twoDay.conf_j1 > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.conf_j1)}
        />

        <Box
          title="Décès en 24h"
          desc="Cumul des décès constatés à l'hôpital et en EMS en 24h"
          number={numberWithSpaces(oneDay.dc_tot - twoDay.dc_tot)}
          situation={oneDay.dc_tot - twoDay.dc_tot - (twoDay.dc_tot - threeDay.dc_tot) > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.dc_tot - threeDay.dc_tot)}
        />

        <Box
          title="Réanimation en 24h"
          desc="Nombre de nouveaux patients admis en réanimation au cours des dernières 24h."
          number={numberWithSpaces(oneDay.incid_rea)}
          situation={oneDay.incid_rea - twoDay.incid_rea > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.incid_rea)}
        />

        <Box
          title="Nouveaux Cas J-3"
          desc="Nombre de personnes déclarées positives (J-3 date de prélèvement)"
          number={numberWithSpaces(fourDay.pos)}
          situation={fourDay.pos - fiveDay.pos > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(fiveDay.pos)}
        />

        <Box
          title="Hospitalisations"
          desc="Nombre de patients actuellement hospitalisés pour COVID-19."
          number={numberWithSpaces(oneDay.hosp)}
          situation={oneDay.hosp - twoDay.hosp > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.hosp)}
        />

        <Box
          title="Hospit. en 24h"
          desc="Nombre de nouveaux patients hospitalisés au cours des dernières 24h."
          number={numberWithSpaces(oneDay.incid_hosp)}
          situation={oneDay.incid_hosp - twoDay.incid_hosp > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.incid_hosp)}
        />

        <Box
          title="Réanimation"
          desc="Nombre de patients actuellement en réanimation ou en soins intensifs."
          number={numberWithSpaces(oneDay.rea)}
          situation={oneDay.rea - twoDay.rea > 0 ? "Augmente" : "Diminue"}
          old={numberWithSpaces(twoDay.rea)}
        />

        <Box
          title="Décès totaux"
          desc="Cumul des décès (cumul des décès constatés à l'hôpital et en EMS)"
          number={numberWithSpaces(oneDay.dc_tot)}
          old={numberWithSpaces(twoDay.dc_tot)}
        />

        <Box
          title="Taux d'Incidence"
          desc="Taux d'incidence (activité épidémique : Le taux d'incidence correspond au nombre de personnes testées positives (RT-PCR et test antigénique) pour la première fois depuis plus de 60 jours rapporté à la taille de la population. Il est exprimé pour 100 000 habitants)"
          number={numberSmaller(fourDay.tx_incid)}
          situation={fourDay.tx_incid - fiveDay.tx_incid > 0 ? "Augmente" : "Diminue"}
          old={numberSmaller(fiveDay.tx_incid)}
        />

        <Box
          title="Taux d'Occupation"
          desc="Taux d'occupation : tension hospitalière sur la capacité en réanimation (Proportion de patients atteints de COVID-19 actuellement en réanimation, en soins intensifs, ou en unité de surveillance continue rapportée au total des lits en capacité initiale, c’est-à-dire avant d’augmenter les capacités de lits de réanimation dans un hôpital)."
          number={numberToPercent(oneDay.TO)}
          situation={oneDay.TO - twoDay.TO > 0 ? "Augmente" : "Diminue"}
          old={numberToPercent(twoDay.TO)}
        />

        <Box
          title="R"
          desc="Facteur de reproduction du virus (évolution du R0 : Le nombre de reproduction du virus : c’est le nombre moyen de personnes qu’une personne infectée peut contaminer. Si le R effectif est supérieur à 1, l’épidémie se développe ; s’il est inférieur à 1, l’épidémie régresse)"
          number={numberSmaller(fourDay.R)}
          situation={fourDay.R - fiveDay.R > 0 ? "Augmente" : "Diminue"}
          old={numberSmaller(fiveDay.R)}
        />
      </div>
    </div>
  );
};

export default Data;
