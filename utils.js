export const eventsURL =
  "https://nextjs-course-ef7cb-default-rtdb.firebaseio.com/events.json";

export const transformData = (data) => {
  const transformedEvents = [];

  for (const key in data) {
    transformedEvents.push({
      id: key,
      title: data[key].title,
      description: data[key].description,
      location: data[key].location,
      date: data[key].date,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
    });
  }
  return transformedEvents;
};

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;

  const events = await getAllEvents();

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export const getAllEvents = async () => {
  const response = await fetch(eventsURL);
  const data = await response.json();
  const transformed = transformData(data);
  return transformed;
};

export const getFeaturedEvents = async () => {
  const data = await getAllEvents();
  console.log("data", data);
  const featured = data.filter((event) => event.isFeatured);
  return featured;
};

export const getEventById = async (id) => {
  const events = await getAllEvents();

  return events.find((event) => event.id === id);
};

export const months = [
  {
    value: 1,
    name: "January",
  },
  {
    value: 2,
    name: "February",
  },
  {
    value: 3,
    name: "March",
  },
  {
    value: 4,
    name: "April",
  },
  {
    value: 5,
    name: "May",
  },
  {
    value: 6,
    name: "June",
  },
  {
    value: 7,
    name: "July",
  },
  {
    value: 8,
    name: "August",
  },
  {
    value: 9,
    name: "September",
  },
  {
    value: 10,
    name: "October",
  },
  {
    value: 11,
    name: "November",
  },
  {
    value: 12,
    name: "December",
  },
];
