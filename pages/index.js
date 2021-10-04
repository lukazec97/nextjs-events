import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../utils";

const HomePage = ({ featuredEvents }) => {

  return (
    <div>
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
    revalidate: 300
  };
};
export default HomePage;
