import { FC } from "react";

import StarIcon from "../../assets/star.svg";
import classes from "./styles/Star.module.css";

const Star: FC = () => {
  return (
    <img src={StarIcon} alt="Star Icon" className={classes["star-rating"]} />
  );
};
export default Star;
