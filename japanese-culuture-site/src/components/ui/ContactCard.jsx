function ContactCard({ icon, title, description, href }) {
      const Icon = icon;
      const Container = href ? "a" : "div";
      const containerProps = href
        ? {
            href,
            className:
              "group flex w-full max-w-md flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-8 transition-all duration-300 hover:border-indigo-100 hover:bg-white hover:shadow-xl",
          }
        : {
            className:
              "group flex w-full max-w-md flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-8 transition-all duration-300 hover:border-indigo-100 hover:bg-white hover:shadow-xl",
          };

      return (
        <Container {...containerProps}>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white">
                <Icon className="h-6 w-6" />
            </div>

            <h5 className="mb-2 text-center text-base font-bold text-slate-800">
                {title}
            </h5>

            <p
                className={`text-center text-sm ${
                  href
                    ? "font-medium text-indigo-600"
                    : "text-slate-500"
                }`}
            >
                {description}
            </p>
        </Container>
    );
}

export default ContactCard;
