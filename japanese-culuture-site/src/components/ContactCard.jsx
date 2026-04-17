function ContactCard({ icon: Icon, title, description, href }) {
      const Container = href ? 'a' : 'div';
      const containerProps = href
        ? {
            href,
            className:
              'block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm mt-7 transition hover:shadow-lg hover:border-blue-200 hover:bg-blue-50',
          }
        : {
            className: 'block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm mt-7',
          };

      return (
        <Container {...containerProps}>
            <div className="flex justify-center mb-4">
                <Icon className="w-10 h-10 text-red-500" />
            </div>

            <h5 className="mb-2 text-md tracking-tight text-black text-center">
                {title}
            </h5>

            <p
                className={`font-normal p-3 text-center ${
                  href
                    ? 'text-blue-700 underline underline-offset-4 decoration-blue-300 hover:text-blue-900'
                    : 'text-gray-500'
                }`}
            >
                {description}
            </p>
        </Container>
    );
}

export default ContactCard;