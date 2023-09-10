import "./App.css";
import HexDisplay from "./HexDisplay";
import ShowWurf from "./ShowWurf";
import { useState } from "react";
import hexagrammData from "./Hexagrams";

function App() {
  const emptyWurf = { M1: 0, M2: 0, M3: 0, Result: 0 };

  const [wurf, setWurf] = useState(emptyWurf);
  const [enterQuestion, setEnterQuestion] = useState(true);
  const [question, setQuestion] = useState("");
  const [lines, setLines] = useState([]);
  const [lines2, setLines2] = useState([]);
  const [changingLines, setChangingLines] = useState([]);
  const [interpretation, setInterpretation] = useState({});

  function wirf() {
    const M1 = Math.random() < 0.5 ? -1 : 1;
    const M2 = Math.random() < 0.5 ? -1 : 1;
    const M3 = Math.random() < 0.5 ? -1 : 1;
    let res = M1 + M2 + M3;
    let res2 = res;
    if (res > 2) {
      res = 2;
      res2 = -1;
    }
    if (res < -2) {
      res = -2;
      res2 = 1;
    }

    const resObject = { M1, M2, M3, res, res2 };
    console.log(resObject);
    setWurf(resObject);
    let li = [...lines, res];

    setLines((prev) => [...prev, res]);
    setLines2((prev) => [...prev, res2]);

    console.log(lines);
    console.log(li);

    if (li.length > 5) {
      let pattern = "";
      let pattern2 = "";
      li.forEach((line) => {
        if (line === 2) {
          pattern += "1";
          pattern2 += "0";
        } else if (line === 1) {
          pattern += "1";
          pattern2 += "1";
        } else if (line === -1) {
          pattern += "0";
          pattern2 += "0";
        } else if (line === -2) {
          pattern += "0";
          pattern2 += "1";
        }
      });

      console.log(pattern);
      console.log(pattern2);
      const changing = [];
      for (let i = 0; i < 6; i++) {
        if (Math.abs(li[i]) > 1) {
          changing.push(i + 1);
        }
      }

      setChangingLines(changing);

      const hexagramm = hexagrammData.hexagrams.find(
        (hex) => hex.pattern === pattern
      );
      if (!hexagramm) {
        console.log("Hexagramm nicht gefunden");
        return;
      }

      const hexagramm2 = hexagrammData.hexagrams.find(
        (hex) => hex.pattern === pattern2
      );
      if (!hexagramm2) {
        console.log("Hexagramm2 nicht gefunden");
        return;
      }

      console.log(hexagramm);
      setInterpretation({ h1: hexagramm, h2: hexagramm2 });
    }
  }

  function reset() {
    setLines([]);
    setLines2([]);
    setWurf(emptyWurf);
    setInterpretation({});
    setQuestion("");
    setEnterQuestion(true);
  }
  let ree = <div></div>;
  let ree2 = <div></div>;
  console.log("*******************");
  console.log(changingLines);

  if (changingLines.length > 0 && changingLines.length < 4) {
    //ree = <p className="linestitle">Sich wandelnde Linien</p>;
    ree2 = changingLines.map((line) => {
      return (
        <div key={line}>
          <p className="linestitle">Linie {line} wandelt sich</p>
          {interpretation?.h1?.lines[line - 1].text && (
            <div>
              <p className="itext">
                {" "}
                {interpretation.h1.lines[line - 1].text}{" "}
              </p>
            </div>
          )}
          {interpretation?.h1?.lines[line - 1].celebration && (
            <div>
              <p className="linessubtitle">Celebration </p>
              <p className="itext">
                {" "}
                {interpretation.h1.lines[line - 1].celebration}{" "}
              </p>
            </div>
          )}
          {interpretation?.h1?.lines[line - 1].warning && (
            <div>
              <p className="linessubtitle">Warnung </p>
              <p className="itext">
                {" "}
                {interpretation.h1.lines[line - 1].warning}{" "}
              </p>
            </div>
          )}

          {interpretation?.h1?.lines[line - 1].meaning && (
            <div>
              <p className="linessubtitle">Bedeutung </p>
              <p className="itext">
                {" "}
                {interpretation.h1.lines[line - 1].meaning}{" "}
              </p>
            </div>
          )}

          {interpretation?.h1?.lines[line - 1].advice && (
            <div>
              <p className="linessubtitle">Ratschlag </p>
              <p className="itext">
                {" "}
                {interpretation.h1.lines[line - 1].advice}{" "}
              </p>
            </div>
          )}
        </div>
      );
    });
  }

  function handleChange(event) {
    setQuestion(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setEnterQuestion(false);
  }

  return (
    <div>
      <h1>I Ching - Orakel</h1>
      {enterQuestion && (
        <form onSubmit={handleSubmit}>
          <textarea
            className="question"
            placeholder="Stelle deine Frage"
            onChange={handleChange}
            value={question === null ? "" : question}
          />
          <br />
          <button className="wurfButton">Befrage das Orakel</button>
        </form>
      )}
      {!enterQuestion && <h2>{question}</h2>}
      {!enterQuestion && (
        <div className="hexcontainer">
          <div>
            <h3>Situation jetzt</h3>
            <HexDisplay lines={lines} />
            {interpretation.h1 && (
              <div>
                <h3>{interpretation.h1.name}</h3>
                <p className="itext">{interpretation.h1.introduction}</p>
                <p className="itext">{interpretation.h1.text.description}</p>
                <p className="itext">{interpretation.h1.text.meaning}</p>
                {ree}
                {ree2}
              </div>
            )}
          </div>
          <div>
            <h3>Wandelt sich zu</h3>
            <HexDisplay lines={lines2} />
            {interpretation.h2 && (
              <div>
                <h3>{interpretation.h2.name}</h3>
                <p className="itext">{interpretation.h2.introduction}</p>
                <p className="itext">{interpretation.h2.text.description}</p>
                <p className="itext">{interpretation.h2.text.meaning}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {lines.length < 6 && !enterQuestion && (
        <button className="wurfButton" onClick={wirf}>
          Wirf die Münzen
        </button>
      )}
      {lines.length >= 6 && (
        <button className="wurfButton" onClick={reset}>
          Reset
        </button>
      )}
      <ShowWurf wurf={wurf} />
    </div>
  );
}

export default App;
