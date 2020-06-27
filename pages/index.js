import React, { useState } from "react";
import * as R from "ramda";

const getTargetValue = R.path(["target", "value"]);
const InputElement = () => {
  const [inputText, setInputText] = useState("");
  const [inputHistory, setInputHistory] = useState([]);
  const updateInputAndHistory = (s) => {
    setInputText(s);
    setInputHistory([s, ...inputHistory]);
  };
  const getTargetValueAndSetInputText = R.pipe(
    getTargetValue,
    updateInputAndHistory
  );
  return (
    <div>
      <input
        placeholder="some placeholder text"
        onChange={getTargetValueAndSetInputText}
      />
      <br />
      Input Text : {inputText}
      <h4>History</h4>
      {inputHistory.map((s, i) => (
        <div key={i}>{s}</div>
      ))}
    </div>
  );
};

export default InputElement;
