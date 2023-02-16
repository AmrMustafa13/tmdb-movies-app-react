import React from "react";
import "./MovieInfoBar.css";
import { calcTime, convertMoney } from "../../helpers";
import { BiTimeFive } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdMonetizationOn } from "react-icons/md";

const MovieInfoBar = ({ time, budget, revenue }) => {
  return (
    <div className="rmdb-movieinfobar">
      <div className="rmdb-movieinfobar-content">
        <div className="rmdb-movieinfobar-content-col">
          <BiTimeFive className="fa-time" />
          <span className="rmdb-movieinfobar-info">
            Running Time: {calcTime(time)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <MdMonetizationOn className="fa-budget" />
          <span className="rmdb-movieinfobar-info">
            Budget: {convertMoney(budget)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <FaRegMoneyBillAlt className="fa-revenue" />
          <span className="rmdb-movieinfobar-info">
            Revenue: {convertMoney(revenue)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoBar;
