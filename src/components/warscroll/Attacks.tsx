import { useMemo, type FC } from "react";
import type { Weapon } from "../../db/aosDB.types";
import { ParseMarkdown } from "../parseMarkdown/ParseMarkdown";

export interface AttacksProps {
  weapons: Weapon[];
}

export const Attacks: FC<AttacksProps> = ({ weapons }) => {
  const rangedAttacks = useMemo(
    () => weapons.filter((w) => w.range !== null),
    [weapons],
  );

  const meleeAttacks = useMemo(
    () => weapons.filter((w) => w.range === null),
    [weapons],
  );

  return (
    <table className="ws-attacks">
      <tbody>
        {rangedAttacks.length > 0 && (
          <>
            <tr>
              <th>RANGED WEAPONS</th>
              <th className="mid">Rng</th>
              <th className="mid">Atk</th>
              <th className="mid">Hit</th>
              <th className="mid">Wnd</th>
              <th className="mid">Rnd</th>
              <th className="mid">Dmg</th>
              <th>Ability</th>
            </tr>
            {rangedAttacks.map((w) => (
              <tr className="ws-attacks-weapon" key={w.id}>
                <td>{w.name}</td>
                <td>{w.range}</td>
                <td>{w.attack}</td>
                <td>{w.hit}</td>
                <td>{w.wound}</td>
                <td>{w.rend}</td>
                <td>{w.damage}</td>
                <td>
                  {w.abilities.map((a, i) => (
                    <span key={"r" + i}>
                      {i > 0 && <>, </>}
                      <ParseMarkdown markdown={a} />
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </>
        )}
        {meleeAttacks.length > 0 && (
          <>
            <tr>
              <th>MELEE WEAPONS</th>
              <th className="mid"></th>
              <th className="mid">Atk</th>
              <th className="mid">Hit</th>
              <th className="mid">Wnd</th>
              <th className="mid">Rnd</th>
              <th className="mid">Dmg</th>
              <th>Ability</th>
            </tr>
            {weapons
              .filter((w) => w.range === null)
              .map((w) => (
                <tr className="ws-attacks-weapon" key={w.id}>
                  <td colSpan={2}>{w.name}</td>
                  <td>{w.attack}</td>
                  <td>{w.hit}</td>
                  <td>{w.wound}</td>
                  <td>{w.rend}</td>
                  <td>{w.damage}</td>
                  <td>
                    {w.abilities.map((a, i) => (
                      <span key={"m" + i}>
                        {i > 0 && <>, </>}
                        <ParseMarkdown markdown={a} />
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
          </>
        )}
      </tbody>
    </table>
  );
};
