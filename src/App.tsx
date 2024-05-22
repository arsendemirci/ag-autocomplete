import React from "react";
import styles from "./App.module.scss";
import Autocomplete from "./components/Autocomplete/Autocomplete";

function App() {
  return (
    <div className={styles.App}>
      <Autocomplete></Autocomplete>
    </div>
  );
}

export default App;
