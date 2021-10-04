import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { eventsURL, getFilteredEvents, transformData } from "../../utils";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert";
import { useEffect, useState } from "react";

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((data) => transformData(data));

const FilteredEventsPage = ({ date }) => {
  const [loadedEvents, setLoadedEvents] = useState([]);

  const { query } = useRouter();
  const filterData = query?.slug;

  const { data, error } = useSWR(eventsURL, fetcher);

  useEffect(() => {
    if (data && data instanceof Array) {
      setLoadedEvents(data);
    }
  }, [data]);
  console.log(data);


  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events`} />
    </Head>
  );

  if (!loadedEvents.length) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading..</p>;
      </>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || !filteredEvents.length) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const constructedDate = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={constructedDate} />
      <EventList events={filteredEvents} />;
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2020 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }
//   const filteredEvents = await getFilteredEvents(numYear, numMonth);
//   return {
//     props: {
//       filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// };

export default FilteredEventsPage;
