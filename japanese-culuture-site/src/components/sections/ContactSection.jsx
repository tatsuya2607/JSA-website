// components/ContactSection.jsx

import { EnvelopeIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import FadeIn from "../ui/FadeIn";


function ContactSection({ bg = "white" }) {
    const cardBg =
        bg === "gray"
            ? "bg-white border border-slate-200"
            : "bg-slate-50 border border-slate-200"
        ;

    const iconBg =
        bg === "gray"
            ? "bg-white text-slate-600 border border-slate-200"
            : "bg-slate-100 text-slate-500"
        ;



    return (
        <section className="relative overflow-hidden px-6 py-24">
            <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent  to-transparent" />

            <div className="mx-auto max-w-4xl text-center">
                <FadeIn direction="up">
                    <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">Get In Touch</h2>
                    <p className="mx-auto mb-12 max-w-2xl text-slate-600">
                        Interested in joining our community or learning more about Japanese culture? We&apos;d love to hear from you!
                    </p>
                </FadeIn>

                <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                    <FadeIn delay={200} direction="up">
                        <a
                            href="mailto:jsa@university.edu"
                            className={`group flex flex-col items-center justify-center rounded-2xl ${cardBg} p-8
                                shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                            `}
                        >
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white">
                                <EnvelopeIcon className="h-6 w-6" />
                            </div>
                            <h4 className="mb-2 font-bold text-slate-800">Email Us</h4>
                            <p className="text-sm font-medium text-indigo-600">jsa@university.edu</p>
                        </a>
                    </FadeIn>

                    {/* <div 
                                className={`group flex flex-col items-center justify-center rounded-2xl ${cardBg} p-8
                                    shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                                `}>
                                <UserGroupIcon className="h-6 w-6" />
                            </div> */}

                    <FadeIn delay={400} direction="up">
                        <div
                            className={`group flex flex-col items-center justify-center rounded-2xl
                                ${cardBg} p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                            `}
                        >
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white">
                                <UserGroupIcon className="h-6 w-6" />
                            </div>
                            <h4 className="mb-2 font-bold text-slate-800">Join Our Community</h4>
                            <p className="text-center text-sm text-slate-500">
                                Open to all students interested in Japanese culture.
                            </p>
                        </div>
                    </FadeIn>
                </div>

                {/* Social Media Links */}
                <FadeIn delay={600} direction="up">
                    <div className="flex justify-center gap-4">
                        {[
                            { icon: FaFacebookF, href: "https://www.facebook.com" },
                            { icon: FaXTwitter, href: "https://x.com" },
                            { icon: FaInstagram, href: "https://www.instagram.com" },
                        ].map(({ icon, href }) => (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"

                                className={`
                                    flex h-12 w-12 items-center justify-center rounded-full
                                    ${iconBg} transition-all duration-300 hover:-translate-y-1
                                    hover:bg-indigo-500 hover:text-white
                                `}
                            >
                                {icon({ className: "h-5 w-5" })}
                            </a>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

export default ContactSection;
