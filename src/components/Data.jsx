import axios from "axios";
import { useQuery } from "react-query";
import "../styles/data.css";
import Box from "./Box";

const Data = () => {
  const {
    data: covidData,
    isLoading,
    isError,
  } = useQuery("live", () => axios.get("https://coronavirusapifr.herokuapp.com/data/live/france").then((res) => res.data[0]));

  const ChangeFormateDate = (oldDate) => {
    return oldDate.toString().split("-").reverse().join("-");
  };

  const path = window.location.pathname.replace("/", "");

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>Is Error</div>;
  }

  return (
    <div className="data">
      <h2> Données du : {ChangeFormateDate(covidData.date)}</h2>
      {path === "" && <h3>Données niveau National</h3>}
      <div className="wrapper">
        <Box title="Hosp" desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h." number={covidData.incid_dchosp} />
        <Box title="incid_hosp" desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h." number={covidData.incid_dchosp} />
        <Box title="rea" desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h." number={covidData.incid_dchosp} />
        <Box title="incid_rea" desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h." number={covidData.incid_dchosp} />
        <Box
          title="incid_dchosp"
          desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h."
          number={covidData.incid_dchosp}
        />
        <Box title="dc_tot" desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h." number={covidData.incid_dchosp} />
        <Box title="Conf_j1" desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h." number={covidData.incid_dchosp} />
        <Box title="pos" desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h." number={covidData.incid_dchosp} />
        <Box title="pos_7j" desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h." number={covidData.incid_dchosp} />
        <Box title="tx_incid" desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h." number={covidData.incid_dchosp} />
        <Box title="TO" desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h." number={covidData.incid_dchosp} />
        <Box title="R" desc="Nouveaux patients décédés à l’hôpital au cours des dernières 24h." number={covidData.incid_dchosp} />
      </div>
    </div>
  );
};

export default Data;
