import { useEffect, useRef, useState } from "react";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(true);
  const [dep, setDep] = useState(false);

  const inputEl = useRef(null);

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };

  console.log(inputEl)

  let navigate = useNavigate();

  const handleNational = () => {
    navigate(``);
    window.location.reload();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setDep(!dep);
    
    if (input !== "") {
      navigate(`/departement/${input}`);
      window.location.reload();
    }
    // } else {
    //   alert("Vous avez oublié de remplir le champ de recherche !");
    // }
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleDep = (e) => {
    e.preventDefault();
    setDep(!dep);
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
              <h4 onClick={handleNational} className="navbar__clickable">
                National
              </h4>
            </div>
            <form className="navbar__right">
              {!dep ? (
                <h4 className="navbar__clickable" onClick={handleDep}>
                  Département
                </h4>
              ) : (
                <>
                  <input
                    autoFocus
                    type="text"
                    className="navbar__input"
                    placeholder="seine-maritime"
                    onChange={(e) => setInput(e.target.value)}
                    ref={inputEl}
                  />
                  <button className="navbar__btn" onClick={handleClick} type="submit">
                    OK
                  </button>
                </>
              )}
            </form>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
