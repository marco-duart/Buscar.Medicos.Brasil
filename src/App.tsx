import Router from "./config/router";
import GlobalStyles from "./assets/styles/global-styles";
import { ApiContextProvider } from "./data/contexts/apiContext";

function App() {
  return (
    <>
      <GlobalStyles />
      <ApiContextProvider>
        <Router />
      </ApiContextProvider>
    </>
  );
}

export default App;
