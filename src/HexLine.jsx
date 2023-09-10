import PropTypes from "prop-types";
import LineM1 from "./LineM1";
import LineM2 from "./LineM2";
import LineP1 from "./LineP1";
import LineP2 from "./LineP2";

export default function HexLine(props) {
  const { value } = props;
  //console.log(value);

  switch (value) {
    case -2:
      return <LineM2 />;
    case -1:
      return <LineM1 />;
    case 1:
      return <LineP1 />;
    case 2:
      return <LineP2 />;

    default:
      return <div></div>;
  }
}

HexLine.propTypes = {
  value: PropTypes.number.isRequired,
};
