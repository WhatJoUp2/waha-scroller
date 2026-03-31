import type { FC, PropsWithChildren } from "react";
import "./TornEdgeContainer.css";

export interface TornEdgeContainerProps {
  className?: string;
  horizontal?: boolean;
}

export const TornEdgeContainer: FC<
  TornEdgeContainerProps & PropsWithChildren
> = ({ children, className, horizontal = false }) => {
  return (
    <table className={"tornedge-container " + className || ""}>
      <tbody>
        {!horizontal && (
          <tr>
            <td className="tornedge1"></td>
            <td className="tornedge2"></td>
            <td className="tornedge3"></td>
          </tr>
        )}
        <tr>
          <td className="tornedge8"></td>
          <td className="tornedge-content">{children}</td>
          <td className="tornedge4"></td>
        </tr>
        {!horizontal && (
          <tr>
            <td className="tornedge7"></td>
            <td className="tornedge6"></td>
            <td className="tornedge5"></td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
