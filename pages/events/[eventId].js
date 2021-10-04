import Head from "next/head";
import { getFeaturedEvents, getEventById } from "../../utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <div className="center">
        <p>Loading..</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const data = await getFeaturedEvents();

  const pathsArr = data.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: pathsArr,
    fallback: true,
  };
};
export default EventDetailPage;
