import PropTypes from "prop-types";
import kopf from "./assets/kopf.png";
import zahl from "./assets/zahl.png";

export default function ShowWurf(props) {
  const { wurf } = props;

  const i1 = wurf.M1 === 1 ? kopf : zahl;
  const i2 = wurf.M2 === 1 ? kopf : zahl;
  const i3 = wurf.M3 === 1 ? kopf : zahl;
  if (wurf.M1 === 0) {
    return <div></div>;
  }
  return (
    <div className="coins">
      <img className="coin" src={i1} alt="Münze 1" />
      <img className="coin" src={i2} alt="Münze 2" />
      <img className="coin" src={i3} alt="Münze 3" />
    </div>
  );
}

ShowWurf.propTypes = {
  wurf: PropTypes.shape({
    M1: PropTypes.number.isRequired,
    M2: PropTypes.number.isRequired,
    M3: PropTypes.number.isRequired,
  }).isRequired,
};
