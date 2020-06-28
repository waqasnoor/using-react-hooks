import React from "react";
import Home from "./Home";
import Speakers from "./Speakers";
import ConfigContext from "./ConfigContext";

const pageToShow = (pageName) => {
  if (pageName === "Home") return <Home />;
  if (pageName === "Speakers") return <Speakers />;
  return <div>Not Found</div>;
};
const configValue = { showSpeakerSpeakingDay: true, showSignup: true };
const App = ({ pageName }) => {
  return (
    <ConfigContext.Provider value={configValue}>
      <div>{pageToShow(pageName)}</div>
    </ConfigContext.Provider>
  );
};

export default App;
