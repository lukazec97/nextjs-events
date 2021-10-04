import Head from "next/head";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../utils";

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <h1>The Home Page</h1>
      <EventList events={featuredEvents} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featured = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featured,
    },
    revalidate: 300,
  };
};
export default HomePage;
