import {
  MapPinIcon

} from "@heroicons/react/24/outline";

export const eventData = [
  {
    id: 1,
    title: "Hanami Picnic",
    description: "Enjoy cherry blossoms with traditional snacks in the park.",
    eventDate: "2026-04-05",   // YYYY-MM-DD
    location: "Ueno Park, Tokyo",
    category: "Seasonal",
    image: null,
    isPublished: true,
    icon: MapPinIcon
  },
  {
    id: 2,
    title: "Summer Matsuri Night",
    description: "Festival stalls, taiko performances, and fireworks.",
    eventDate: "2026-07-20",
    location: "Asakusa, Tokyo",
    category: "Festival",
    image: null,
    isPublished: true,
    icon: MapPinIcon
  },
  {
    id: 3,
    title: "Tea Ceremony Workshop",
    description: "Beginner-friendly tea ceremony experience.",
    eventDate: "2026-09-12",
    location: "Kyoto Cultural Center",
    category: "Workshop",
    image: null,
    isPublished: false,
    icon:  MapPinIcon
  }

];
