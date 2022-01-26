import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar__title">Covid Tracker</h1>
      <div className="navbar__wrap">
        <a>National</a>
        <a>Départemental</a>
        <a>Régional</a>
      </div>
    </nav>
  );
};

export default Navbar;
