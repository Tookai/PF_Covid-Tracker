import "../styles/box.css";

const Box = ({ title, desc, number }) => {
  return (
    <section className="box">
      <h4>{title}</h4>
      <p>{desc}</p>
      <p>{number}</p>
    </section>
  );
};

export default Box;
