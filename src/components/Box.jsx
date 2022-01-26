import "../styles/box.css";

const Box = ({ title, desc, number, situation, old }) => {
  
  return (
    <section className={`${number} box`}>
      <h4 className="box__title">{title}</h4>
      <p className="box__desc">{desc}</p>
      <p className="box__number">{number}</p>
      <p className={situation}>{situation}</p>
      <p className="box__oldnumber">{old}</p>
    </section>
  );
};

export default Box;
