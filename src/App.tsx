import { useEffect, useState } from "react";
import "./App.css";
import { WarscrollMaker } from "./components/warscrollMaker/WarscrollMaker";
import { Loader } from "./components/loader/Loader";
import { loadDBFromIDB, openDB } from "./db/aosDB";
import { ArmyContextProvider } from "./context/ArmyContext";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    openDB(() => {
      loadDBFromIDB((loaded) => {
        setIsLoaded(loaded);
      });
    });
  }, []);

  return isLoaded ? (
    <ArmyContextProvider>
      <WarscrollMaker />
    </ArmyContextProvider>
  ) : (
    <Loader onLoad={() => setIsLoaded(true)} />
  );
};

export default App;
