import React from "react";
import EventItem from "./EventItem";
import classes from "./EventList.module.css";

const EventList = ({ events }) => {
  return (
    <ul className={classes.list}>
      {events.map((item) => (
        <EventItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default EventList;
