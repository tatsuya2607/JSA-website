import { useState, useEffect } from "react";
import { fetchMembers } from "../../api/teamMembers";

function TeamSection() {

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMembers();
      setTeamMembers(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <section className="w-full py-14 md:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Meet Our Team</h2>
        <p className="mt-3 text-sm text-gray-600 md:text-base">The people behind JSA</p>

        {/* Team Member Cards */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {loading && (
            <p className="text-gray-500">Loading...</p>
          )}
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="w-full max-w-xs rounded-xl bg-white p-6 text-center shadow-md"
            >
              <img
                src={member.imageUrl}
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
