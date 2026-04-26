const teamMembers = [
  {
    name: "Tatsuya Ogawa",
    role: "President",
    message: "Let’s experience Japanese culture together!",
    image: "/images/tatsuya.jpg",
  },
  {
    name: "Mika Sato",
    role: "Vice President",
    message: "We’re here to build a welcoming home for everyone.",
    image: "/images/mika.jpg",
  },
  {
    name: "Ren Tanaka",
    role: "Secretary",
    message: "I love creating events that connect students through culture.",
    image: "/images/ren.jpg",
  },
  {
    name: "Yuna Kimura",
    role: "Treasurer",
    message: "Let’s make each semester more fun and meaningful together.",
    image: "/images/yuna.jpg",
  },
];

function TeamSection() {
  return (
    <section className="w-full bg-gray-100 py-14 md:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Meet Our Team</h2>
        <p className="mt-3 text-sm text-gray-600 md:text-base">The people behind JSA</p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="rounded-xl bg-white p-6 text-center shadow-md transition-transform duration-300 hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto h-24 w-24 rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-bold text-gray-900">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-red-600">{member.role}</p>
              <p className="mt-3 text-sm text-gray-600">{member.message}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
