import { useState } from "react";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();

  const handleNational = () => {
    navigate(``);
    window.location.reload();
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (input !== "") {
      navigate(`/departement/${input}`);
      window.location.reload();
    } else {
      alert("Vous avez oublié de remplir le champ de recherche !");
    }
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__title">Covid Tracker</h1>
      <div className="navbar__wrap">
        <p className="navbar__open" onClick={handleOpen}>
          {open ? "Fermer" : "Ouvrir"}
        </p>
        {open && (
          <>
            <div className="navbar__left">
              <h4 onClick={handleNational}>National</h4>
            </div>
            <div className="navbar__right">
              <h4>Département</h4>
              <input
                type="text"
                className="navbar__input"
                placeholder="par ex : seine-maritime"
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="navbar__btn" onClick={handleClick}>
                OK
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
