// import dbJson from "./aosDB.json";
import type { DB, Unit } from "./aosDB.types";

let db: DB; //dbJson as any;
let indexedDB: IDBDatabase;
const localStorageName = "savedDB";

export function openDB(successCallback: () => void) {
  const request = window.indexedDB.open(localStorageName);
  request.onsuccess = (ev: any) => {
    if (ev.target) {
      indexedDB = ev.currentTarget.result;
      successCallback();
    }
  };

  request.onupgradeneeded = (event: any) => {
    // Save the IDBDatabase interface
    const db = event.target.result;

    // Create an objectStore for this database
    db.createObjectStore("data", { keyPath: "key" });
  };
}

export function loadDBFromIDB(onLoad: (dataFound: boolean) => void) {
  const transaction = indexedDB.transaction("data", "readwrite");
  const objstore = transaction.objectStore("data");
  const loadedDBRequest = objstore.get("aos");
  loadedDBRequest.onsuccess = () => {
    if (loadedDBRequest.result) {
      db = loadedDBRequest.result.value;
      onLoad(db !== undefined);
    }
  };
  loadedDBRequest.onerror = () => {
    onLoad(false);
  };
}

function saveDB() {
  if (db) {
    const transaction = indexedDB.transaction("data", "readwrite");
    const objstore = transaction.objectStore("data");
    objstore.put({ key: "aos", value: db });
  }
}

export function loadDBFromFile(data: DB): void {
  db = data;
  saveDB();
}

export function getArmyNames(): string[] {
  const keys = Object.keys(db.armies);
  const ret: string[] = [];
  keys.forEach((k) => {
    if (!db.armies[k].isArmyOfRenown) ret.push(k);
  });
  return ret;
}

export function getUnitNamesFromArmy(army: string) {
  return db.armies[army].units.map((u) => u.name);
}

function getUnitsFromArmy(army: string): Unit[] {
  return db.armies[army].units;
}

export function getUnitFromArmy(army: string, unit: string): Unit | null {
  return getUnitsFromArmy(army).find((u) => u.name === unit) || null;
}
