import HexLine from "./HexLine";
import PropTypes from "prop-types";
// import HexLine from "./HexLine";

export default function HexDisplay(props) {
  //console.log(props);
  const line1 = props.lines[0];
  const line2 = props.lines[1];
  const line3 = props.lines[2];
  const line4 = props.lines[3];
  const line5 = props.lines[4];
  const line6 = props.lines[5];
  return (
    <div className="hexagram">
      <HexLine value={line6} />
      <HexLine value={line5} />
      <HexLine value={line4} />
      <HexLine value={line3} />
      <HexLine value={line2} />
      <HexLine value={line1} />
    </div>
  );
}

HexDisplay.propTypes = {
  lines: PropTypes.array.isRequired,
};
