import food from "../assets/sushi.jpg";
import festival from "../assets/matsuri.jpg";
import art from "../assets/izumo.jpg";

export const cultureData = [
  {
    id: 1,
    tag: "Traditional Art",
    title: "Arts & Crafts",
    description: `Japanese traditional arts reflect centuries of cultural refinement. 
                  From the delicate art of origami to the meditative practice of calligraphy (shodō), 
                  these crafts embody the Japanese principles of precision, patience, and respect for materials.`,
    items: [
      "Origami - The art of paper folding",
      "Calligraphy (Shodō) - Beautiful brush writing",
      "Ikebana - Flower arrangement",
      "Pottery and Ceramics"
    ],
    image: art
  },

  {
    id: 2,
    tag: "Culinary Culture",
    title: "Food & Cuisine",
    description: `Japanese cuisine is a celebration of seasonal ingredients, visual presentation, 
                  and umami flavors. More than just sushi, Japanese food culture encompasses everything 
                  from street food to kaiseki dining, each with its own philosophy and etiquette.`,
    items: [
      "Sushi and Sashimi - Fresh seafood artistry",
      "Ramen - Soul-warming noodle soups",
      "Tea Ceremony - Ritualistic tea preparation",
      "Bento - Beautifully arranged lunch boxes"
    ],
    image: food
  },

  {
    id: 3,
    tag: "Celebrations",
    title: "Festivals & Traditions",
    description: `Japanese festivals (matsuri) are vibrant celebrations that connect communities to their heritage. 
                  From the famous cherry blossom festivals to local shrine celebrations, 
                  these events showcase Japan's deep connection to nature and spirituality.`,
    items: [
      "Hanami - Cherry blossom viewing",
      "Obon - Festival honoring ancestors",
      "Tanabata - Star festival",
      "New Year celebrations"
    ],
    image: festival
  }
];
