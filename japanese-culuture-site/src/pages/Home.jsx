function Home() {
  return (
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
        <h1 className="bg-500 text-white text-4xl md:text-6xl font-bold px-4 py-2 rounded">
          Discover Japan
        </h1>
        <p className="text-white mt-4 text-lg md:text-xl max-w-2xl">
          Explore the rich heritage, traditions, and modern culture of Japan through our student community
        </p>
      </div>
    </section>
  );
}

export default Home;