import { useEffect } from "react";
import "./App.css";
import { Warscroll } from "./components/warscroll/Warscroll";
import { getUnitFromArmy } from "./db/aosDB";
import { hexToCSSFilter } from "hex-to-css-filter";

const App = () => {
  const ARMY = "Helsmiths of Hashut";
  const UNIT_NAME = "Daemonsmith on Infernal Taurus";
  const unit = getUnitFromArmy(ARMY, UNIT_NAME);

  console.log(unit);

  useEffect(() => {
    const r: any = document.querySelector(":root");
    const color = "#994a15";
    r.style.setProperty("--faction-main-color", color);
    r.style.setProperty(
      "--faction-main-color-filter",
      hexToCSSFilter(color, { acceptanceLossPercentage: 1 }).filter,
    );
  }, []);

  return (
    <div className="content">
      {unit && <Warscroll army={ARMY} unit={unit} />}
    </div>
  );
};

export default App;
