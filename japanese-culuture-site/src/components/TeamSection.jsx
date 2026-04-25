import { useEffect, useMemo, useState } from "react";
import { fetchMembers } from "../api/teamMembers";

function getGridClassName(memberCount) {
  if (memberCount <= 1) {
    return "mx-auto max-w-sm grid-cols-1";
  }

  if (memberCount === 2) {
    return "mx-auto max-w-3xl grid-cols-1 sm:grid-cols-2";
  }

  if (memberCount === 3) {
    return "mx-auto max-w-5xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  }

  if (memberCount === 4) {
    return "mx-auto max-w-4xl grid-cols-1 sm:grid-cols-2";
  }

  return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
}

function TeamSection() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchMembers().then((data) => {
      if (isMounted) {
        setMembers(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const gridClassName = useMemo(() => getGridClassName(members.length), [members.length]);

  return (
    <section className="w-full bg-gray-100 py-14 md:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Meet Our Team</h2>
        <p className="mt-3 text-sm text-gray-600 md:text-base">The people behind JSA</p>

        {!isLoading && members.length === 0 ? (
          <p className="mt-8 text-gray-500">Team information coming soon</p>
        ) : (
          <div className={`mt-10 grid justify-center gap-6 ${gridClassName}`}>
            {members.map((member) => (
              <article
                key={member.id}
                className="rounded-xl bg-white p-6 text-center shadow-md transition-transform duration-300 hover:scale-105"
              >
                <div className="mx-auto aspect-square w-24 overflow-hidden rounded-full">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-red-600">{member.role}</p>
                <p className="mt-3 text-sm text-gray-600">{member.message}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TeamSection;
