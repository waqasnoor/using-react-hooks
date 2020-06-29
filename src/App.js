import React, { useState } from "react";
import Home from "./Home";
import Speakers from "./Speakers";
import ConfigContext from "./ConfigContext";

const pageToShow = (pageName) => {
  if (pageName === "Home") return <Home />;
  if (pageName === "Speakers") return <Speakers />;
  return <div>Not Found</div>;
};

const App = ({ pageName }) => {
  const [context, setContext] = useState({
    showSpeakerSpeakingDay: true,
    showSignup: true,
  });
  return (
    <ConfigContext.Provider value={{ context, setContext }}>
      <div>{pageToShow(pageName)}</div>
    </ConfigContext.Provider>
  );
};

export default App;
