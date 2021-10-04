import Head from "next/head";
import { useRouter } from "next/router";
import { getAllEvents } from "../../utils";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

const AllEventsPage = ({ events }) => {
  const { push } = useRouter();

  const handleSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve" />
      </Head>
      <EventsSearch onSearch={handleSearch} />
      <EventList events={events} />;
    </>
  );
};
export const getStaticProps = async () => {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};
export default AllEventsPage;
