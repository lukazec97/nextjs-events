import Image from "next/image";
import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import Button from "../ui/Button";
import classes from "./EventItem.module.css";

const dateFormat = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

const EventItem = ({ item }) => {
  const { title, date, location, image, id } = item;
  const formatedDate = new Date(date).toLocaleDateString("en-US", dateFormat);
  const formatedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image src={`/${image}`} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formatedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
