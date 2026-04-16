function Home() {
  return (
    // Hero 
    <>
      <section className="relative w-full h-[650px]">
        {/* 背景画像 */}
        <img
          src="https://images.unsplash.com/photo-1528164344705-47542687000d"
          alt="Japanese temple"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 黒いオーバーレイ */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* テキスト */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-1">
          <h1 className="text-white text-4xl md:text-6xl font-bold px-4 py-2">
            Discover Japan
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl max-w-2xl">
            Explore the rich heritage, traditions, and modern culture of Japan through our student community
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-gray-100 py-20">
        <div className="text-black flex flex-col items-center justify-center">
          <h1 className="md:text-3xl font-bold">About Nihon Culture Club</h1>
          <p className="text-sm text-center md:text-base max-w-2xl mt-2">
            We are a passionate group of students dedicated to sharing and celebrating Japanese culture.
            Through events, workshops, and cultural exchanges,
            we aim to bridge cultures and create lasting connections within our university community.
          </p>
        </div>
      </section>

       {/* Japanese Culture */}
      <section id="culture" className="bg-white py-20">
        <div className="text-black flex flex-col items-center justify-center">
          <h1 className="md:text-3xl font-bold">Japanese Culture</h1>
          <p className="text-sm text-center md:text-base max-w-2xl mt-2">
            Culture 
          </p>
        </div>
      </section>

       {/* Upcoming Events */}
      <section id="events" className="bg-gray-100 py-20">
        <div className="text-black flex flex-col items-center justify-center">
          <h1 className="md:text-3xl font-bold">Upcoming Events</h1>
          <p className="text-sm text-center md:text-base max-w-2xl mt-2">
            events
          </p>
        </div>
      </section>

       {/* Get In Touch */}
      <section id="contact" className="bg-white py-20">
        <div className="text-black flex flex-col items-center justify-center">
          <h1 className="md:text-3xl font-bold">Get In Touch</h1>
          <p className="text-sm text-center md:text-base max-w-2xl mt-2">
            contacts
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;