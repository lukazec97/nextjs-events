import React, { useRef } from "react";
import Button from "../ui/Button";
import classes from "./EventsSearch.module.css";
import { months } from "../../utils";

const EventsSearch = ({ onSearch }) => {
  const yearRef = useRef();
  const monthRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedYear = yearRef.current.value;
    const selectedMonth = monthRef.current.value;
    console.log(selectedMonth, "clicked!", selectedYear);
    onSearch(selectedYear, selectedMonth);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearRef}>
            <option value={"2021"}>2021</option>
            <option value={"2022"}>2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthRef}>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button handleClick={handleSubmit}>Find events</Button>
    </form>
  );
};

export default EventsSearch;
