import "../styles/globals.css";
import { AppContextProvider } from "../src/components/AppContext";
const App = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
};

export default App;
