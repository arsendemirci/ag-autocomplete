import styles from "./App.module.scss";
import Autocomplete from "./components/Autocomplete/Autocomplete";

function App() {
  const githubLogo = require("./assets/image/github-logo.png");
  // const reactLogo = logos(`./react-logo.png}`).default;
  // const tsLogo = logos(`./ts-logo.png}`).default;
  // const sassLogo = logos(`./sass-logo.png}`).default;
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <div className={styles.HeadWrap}>
          <div className={styles.HeadLine}>
            <h1>AG Autocomplete</h1>
            <a href="https://github.com/arsendemirci/ag-autocomplete" title="Go to github repo">
              <img src={githubLogo} alt="react" />
            </a>
          </div>
          <h3>React Multiselect Autocomplete - Rick and Morty api</h3>
        </div>

        <br />
      </header>
      <div>
        <h3>Search for Characters in Rick and Morty</h3>
        <br />
        <Autocomplete></Autocomplete>
      </div>
    </div>
  );
}

export default App;
