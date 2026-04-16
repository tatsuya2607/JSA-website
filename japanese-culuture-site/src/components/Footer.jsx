
function Footer() {
    return (
        <header className="w-full">
            <footer className="bg-gray-900 text-white py-10">
                <div className="max-w-5xl mx-auto px-4 text-center">

                    {/* ロゴ */}
                    <h2 className="text-xl font-bold mb-4">
                        Japanese Student Association
                    </h2>

                    {/* ナビ */}
                    <div className="flex justify-center gap-6 mb-4 text-sm">
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#culture">Culture</a>
                        <a href="#events">Events</a>
                        <a href="#contact">Contact</a>
                    </div>

                    {/* SNS */}
                    {/* <div className="flex justify-center gap-4 mb-4">
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                    </div> */}

                    {/* コピーライト */}
                    <p className="text-gray-400 text-sm">
                        © 2026 Nihon Culture Club. All rights reserved.
                    </p>
                </div>
            </footer>
        </header>
    );
}

export default Footer;