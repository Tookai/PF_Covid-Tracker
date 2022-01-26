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
  const minus7 = today.getTime() - 1000 * 60 * 60 * 24 * 7;
  const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  //
  //

  const getDateFormated = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  console.log(today);
  console.log(getDateFormated(new Date(minus7)));

  // Queries
  // Minus 1 Day Data
  const {
    data: oneDay,
    isLoading,
    isError,
  } = useQuery("One Day", () =>
    axios.get(`https://coronavirusapifr.herokuapp.com/data/france-by-date/${getDateFormated(new Date(minus1))}`).then((res) => res.data[0])
  );
  // Minus 2 Day Data
  const {
    data: twoDay
  } = useQuery("Two Day", () =>
    axios.get(`https://coronavirusapifr.herokuapp.com/data/france-by-date/${getDateFormated(new Date(minus2))}`).then((res) => res.data[0])
  );
  //
  //

  // Format Date
  const ChangeFormateDate = (oldDate) => {
    return oldDate.toString().split("-").reverse().join("-");
  };
  //
  //

  // Format Percentage
  const numberToPercent = (number) => {
    return (number * 100).toString().substring(0, 5) + "%";
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

  // Get Path
  const path = window.location.pathname.replace("/", "");

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>Is Error</div>;
  }

  return (
    <div className="data">
      <h2> Données du : {getDateFormated(new Date(minus1))}</h2>
      {path === "" && <h3>Données niveau National</h3>}
      <div className="data__wrapper">
        <Box
          title="Hospitalisations"
          desc="Nombre de patients actuellement hospitalisés pour COVID-19."
          number={numberWithSpaces(oneDay.hosp)}
        />

        <Box
          title="Hospitalisations en 24h"
          desc="Nombre de nouveaux patients hospitalisés au cours des dernières 24h."
          number={numberWithSpaces(oneDay.incid_hosp)}
        />

        <Box
          title="Réanimation"
          desc="Nombre de patients actuellement en réanimation ou en soins intensifs."
          number={numberWithSpaces(oneDay.rea)}
        />

        <Box
          title="Réanimation en 24h"
          desc="Nombre de nouveaux patients admis en réanimation au cours des dernières 24h."
          number={numberWithSpaces(oneDay.incid_rea)}
        />

        <Box
          title="Décès totaux"
          desc="Cumul des décès (cumul des décès constatés à l'hôpital et en EMS)"
          number={numberWithSpaces(oneDay.dc_tot)}
        />

        <Box
          title="Nouveaux Cas J-1"
          desc="Nombre de nouveaux cas confirmés (J-1 date de résultats)"
          number={numberWithSpaces(oneDay.conf_j1)}
        />

        <Box
          title="Nouveaux Cas J-3"
          desc="Nombre de personnes déclarées positives (J-3 date de prélèvement)"
          number={numberWithSpaces(oneDay.pos)}
        />

        <Box
          title="Cas en 7 jours"
          desc="Nombre de personnes déclarées positives sur une semaine (J-3 date de prélèvement)"
          number={numberWithSpaces(oneDay.pos_7J)}
        />

        <Box
          title="Taux d'Incidence"
          desc="Taux d'incidence (activité épidémique : Le taux d'incidence correspond au nombre de personnes testées positives (RT-PCR et test antigénique) pour la première fois depuis plus de 60 jours rapporté à la taille de la population. Il est exprimé pour 100 000 habitants)"
          number={numberWithSpaces(oneDay.tx_incid)}
        />

        <Box
          title="Taux d'Occupation"
          desc="Taux d'occupation : tension hospitalière sur la capacité en réanimation (Proportion de patients atteints de COVID-19 actuellement en réanimation, en soins intensifs, ou en unité de surveillance continue rapportée au total des lits en capacité initiale, c’est-à-dire avant d’augmenter les capacités de lits de réanimation dans un hôpital)."
          number={numberToPercent(oneDay.TO)}
        />

        <Box
          title="R"
          desc="Facteur de reproduction du virus (évolution du R0 : Le nombre de reproduction du virus : c’est le nombre moyen de personnes qu’une personne infectée peut contaminer. Si le R effectif est supérieur à 1, l’épidémie se développe ; s’il est inférieur à 1, l’épidémie régresse)"
          number={numberWithSpaces(oneDay.R)}
        />

        <Box
          title="Décès à l'hopital en 24h"
          desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h."
          number={numberWithSpaces(oneDay.incid_dchosp)}
        />

        <Box
          title="Décès en 24h"
          desc="Cumul des décès constatés à l'hôpital et en EMS en 24h"
          number={numberWithSpaces(oneDay.dc_tot - 250)}
        />
      </div>
    </div>
  );
};

export default Data;
