import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { Warscroll } from "./components/warscroll/Warscroll";
import {
  getArmyNames,
  getUnitFromArmy,
  getUnitNamesFromArmy,
} from "./db/aosDB";
// import { hexToCSSFilter } from "hex-to-css-filter";
import { toPng } from "@jpinsonneau/html-to-image";
import type { Unit } from "./db/aosDB.types";
import { Controller } from "./components/controller/Controller";

const App = () => {
  // const ARMY = "Helsmiths of Hashut";
  // const UNIT_NAME = "Daemonsmith on Infernal Taurus";
  const [army, setArmy] = useState("");
  const [unitName, setUnitName] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const unit: Unit | null = useMemo(
    () =>
      army !== "" && unitName !== "" ? getUnitFromArmy(army, unitName) : null,
    [army, unitName],
  );
  const armyList = useMemo(() => getArmyNames(), []);
  const unitList = useMemo(
    () => (army !== "" ? getUnitNamesFromArmy(army).sort() : []),
    [army],
  );

  // useEffect(() => {
  //   const r: any = document.querySelector(":root");
  //   const color = "#994a15";
  //   r.style.setProperty("--faction-main-color", color);
  //   r.style.setProperty(
  //     "--faction-main-color-filter",
  //     hexToCSSFilter(color, { acceptanceLossPercentage: 1 }).filter,
  //   );
  // }, []);

  useEffect(() => {
    if (army === "" && armyList.length > 0) setArmy(armyList[0]);
  }, [army, armyList]);

  useEffect(() => {
    if (unitName === "" && unitList.length > 0) setUnitName(unitList[0]);
  }, [unitName, unitList]);

  const onDownloadImage = () => {
    if (ref.current) {
      toPng(ref.current).then((data) => {
        const link = document.createElement("a");
        link.href = data;
        link.download = unitName + ".png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // window.open(data);
      });
    }
  };

  const handleArmyChange = (value: string) => {
    setArmy(value);
    setUnitName("");
  };

  return (
    <div className="content">
      <div className="controller">
        <Controller
          army={army}
          armyList={armyList}
          onArmyChange={handleArmyChange}
          onDownloadImage={onDownloadImage}
          onUnitNameChange={(value) => setUnitName(value)}
          unitList={unitList}
          unitName={unitName}
        />
      </div>
      <div className="warscroll-container">
        {unit && <Warscroll army={army} unit={unit} ref={ref} />}
      </div>
    </div>
  );
};

export default App;
