import React from "react";
import JSONFormatter from "./components/JSONFormatter";
import JSONFormatterV2 from "./components/JSONFormatterV2";

const App = () => {
  return (
    <>
      <h1>Version 1 with expand/collapse</h1>
      <JSONFormatterV2 />
      <h1>Version 2 Without expand/collapse</h1>
      <JSONFormatter />
    </>
  );
};

export default App;
