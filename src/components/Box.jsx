import "../styles/box.css";

const Box = ({ title, desc, number }) => {
  return (
    <section className="box">
      <h4 className="box__title">{title}</h4>
      <p className="box__desc">{desc}</p>
      <p className="box__number">{number}</p>
    </section>
  );
};

export default Box;
