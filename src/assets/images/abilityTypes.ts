import damaged from "./battleDamaged.png";
import control from "./control.png";
import defensive from "./defensive.png";
import movement from "./movement.png";
import offensive from "./offensive.png";
import rallying from "./rallying.png";
import shooting from "./shooting.png";
import special from "./special.png";

export function getAbilityTypeImage(type: string): string {
  switch (type) {
    case "damage":
      return damaged;
    case "control":
      return control;
    case "defensive":
      return defensive;
    case "movement":
      return movement;
    case "offensive":
      return offensive;
    case "rallying":
      return rallying;
    case "shooting":
      return shooting;
    case "special":
      return special;
    default:
      return "";
  }
}
