import { useMemo, type FC } from "react";

export interface KeywordsProps {
  keywords: string[];
}

const LINE1 = [
  "HERO",
  "INFANTRY",
  "WIZARD",
  "PRIEST",
  "CAVALRY",
  "MONSTER",
  "BEAST",
  "WAR MACHINE",
  "WARD",
  "CHAMPION",
  "MUSICIAN",
  "STANDARD BEARER",
];

export const Keywords: FC<KeywordsProps> = ({ keywords }) => {
  const lines = useMemo(() => {
    let line1: string[] = [],
      line2: string[] = [];

    keywords.forEach((k) => {
      let isLine1 = false;
      LINE1.forEach((l1) => k.includes(l1) && (isLine1 = true));
      let formattedTag = k.charAt(0) + k.slice(1).toLocaleLowerCase();
      isLine1 ? line1.push(formattedTag) : line2.push(formattedTag);
    });

    return [line1, line2];
  }, [keywords]);

  return (
    <table className="ws-keywords-container">
      <tbody>
        <tr>
          <th rowSpan={2}>Keywords</th>
          <td>{lines[0].map((k, i) => (i > 0 ? ", " + k : k))}</td>
        </tr>
        <tr>
          <td>{lines[1].map((k, i) => (i > 0 ? ", " + k : k))}</td>
        </tr>
      </tbody>
    </table>
  );
};
