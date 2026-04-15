function Home() {
  return (
    <section className="relative w-full h-[500px]">
      {/* 背景画像 */}
      <img
        src="https://images.unsplash.com/photo-1528164344705-47542687000d"
        alt="Japanese temple"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 黒いオーバーレイ */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* テキスト */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="bg-500 text-white text-4xl md:text-6xl font-bold px-4 py-2 rounded">
          Discover Japan
        </h1>
        <p className="text-white mt-4 text-lg md:text-xl max-w-2xl">
          Explore traditional Japanese customs, food, and seasonal events.
        </p>
      </div>
    </section>
  );
}

export default Home;