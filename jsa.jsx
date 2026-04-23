import React, { useState } from 'react';
import { Calendar, MapPin, Users, ChevronDown, MessageCircle, Heart, Globe, ArrowRight, Instagram, Mail, CheckCircle2, Ticket } from 'lucide-react';

// FAQ Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 py-5">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full justify-between items-center text-left focus:outline-none group"
      >
        <span className="font-medium text-zinc-800 group-hover:text-red-800 transition-colors text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
        <p className="text-zinc-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-[#fdfbf7] text-zinc-800 selection:bg-red-800 selection:text-white">
      
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-zinc-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="font-serif font-bold text-xl tracking-wide text-zinc-900">JSA</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-600">
            <a href="#about" className="hover:text-red-800 transition-colors">About</a>
            <a href="#activities" className="hover:text-red-800 transition-colors">Activities</a>
            <a href="#event" className="hover:text-red-800 transition-colors">Next Event</a>
            <a href="#faq" className="hover:text-red-800 transition-colors">FAQ</a>
          </nav>
          <a href="#event" className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded hover:bg-red-800 transition-colors">
            Join Us
          </a>
        </div>
      </header>

      {/* ① Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay for "Wabi-Sabi" feel */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
        >
          <div className="absolute inset-0 bg-zinc-950/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Discover Japan
          </h1>
          <p className="text-lg md:text-2xl text-zinc-200 mb-10 font-light tracking-wide max-w-2xl mx-auto drop-shadow">
            Explore the rich heritage, traditions, and modern culture of Japan through our student community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#event" className="px-8 py-4 bg-red-800 text-white font-medium rounded hover:bg-red-700 transition-all shadow-lg hover:shadow-red-900/50 flex items-center justify-center gap-2">
              次回イベントを見る <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded border border-white/30 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" /> メーリングリストに登録
            </a>
          </div>
        </div>
      </section>

      {/* ② Empathy Section */}
      <section id="about" className="py-24 px-6 bg-[#fdfbf7]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-12">こんな思い、ありませんか？</h2>
          <div className="space-y-6 text-lg md:text-xl text-zinc-600 font-serif italic">
            <p className="opacity-90">「日本に興味はある。でも、何から始めたらいいかわからない。」</p>
            <p className="opacity-90">「一人でイベントに行くのはちょっと不安。」</p>
            <p className="opacity-90">「授業だけじゃ物足りない。もっと“生の日本”に触れたい。」</p>
          </div>
        </div>
      </section>

      {/* ③ Value Section */}
      <section className="py-24 px-6 bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-800 font-medium tracking-wider text-sm uppercase">Our Value</span>
            <h2 className="font-serif text-3xl md:text-4xl text-zinc-900 mt-3 mb-4">「知る」だけじゃなく「体験できる」</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">JSAは、日本文化を教科書の中だけでなく、実際に触れて、感じて、共有できる場所を提供します。</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-8 rounded-2xl bg-[#fdfbf7] hover:shadow-xl transition-shadow duration-300 border border-zinc-100">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-800">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900">Experience</h3>
              <p className="text-zinc-600">日本の文化を<strong className="text-zinc-900 font-semibold">“やってみる”</strong>イベント</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#fdfbf7] hover:shadow-xl transition-shadow duration-300 border border-zinc-100">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-800">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900">Language</h3>
              <p className="text-zinc-600">日本語を<strong className="text-zinc-900 font-semibold">“使ってみる”</strong>会話の場</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#fdfbf7] hover:shadow-xl transition-shadow duration-300 border border-zinc-100">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-800">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900">Community</h3>
              <p className="text-zinc-600">人とつながって<strong className="text-zinc-900 font-semibold">“続けられる”</strong>コミュニティ</p>
            </div>
          </div>
        </div>
      </section>

      {/* ④ Activities Section */}
      <section id="activities" className="py-24 overflow-hidden bg-[#fdfbf7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-red-800 font-medium tracking-wider text-sm uppercase">What We Do</span>
            <h2 className="font-serif text-3xl md:text-5xl text-zinc-900 mt-3">活動内容</h2>
          </div>

          <div className="space-y-24">
            {/* Activity 1 */}
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-zinc-900/10 z-10"></div>
                  <img src="https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Culture Events" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-sm tracking-widest uppercase">Traditional</span>
                <h3 className="text-3xl font-serif text-zinc-900">Culture Events</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  書道、折り紙、浴衣体験など、日本の伝統的な芸術や作法を実際に体験するワークショップを定期的に開催しています。
                </p>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
              <div className="w-full md:w-1/2">
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-zinc-900/10 z-10"></div>
                  <img src="https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Food & Seasonal" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-sm tracking-widest uppercase">Culinary</span>
                <h3 className="text-3xl font-serif text-zinc-900">Food & Seasonal</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  みんなでおにぎりを作ったり、本格的なお抹茶を点てたり。季節ごとの行事（お花見、お月見など）に合わせて日本の食文化を楽しみます。
                </p>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-zinc-900/10 z-10"></div>
                  <img src="https://images.unsplash.com/photo-1528605105345-5344ea20e269?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Japanese Conversation Table" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-sm tracking-widest uppercase">Language</span>
                <h3 className="text-3xl font-serif text-zinc-900">Japanese Conversation Table</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  日本語初心者からネイティブスピーカーまで大歓迎。リラックスした雰囲気の中で、様々なテーマについて日本語で会話の練習をします。
                </p>
              </div>
            </div>

            {/* Activity 4 */}
            <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
              <div className="w-full md:w-1/2">
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-zinc-900/10 z-10"></div>
                  <img src="https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Travel & Study in Japan" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-sm tracking-widest uppercase">Explore</span>
                <h3 className="text-3xl font-serif text-zinc-900">Travel & Study in Japan</h3>
                <p className="text-zinc-600 text-lg leading-relaxed">
                  日本への旅行計画や留学に向けた情報交換の場。経験者からリアルなアドバイスを聞くことができます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⑤ Stats & Trust Section */}
      <section className="py-24 bg-zinc-900 text-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-800 to-transparent opacity-50"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center mb-20 border-b border-zinc-800 pb-16">
            <div>
              <div className="text-5xl font-serif font-bold text-red-500 mb-2">20+</div>
              <div className="text-zinc-400 font-medium tracking-wide">昨年度イベント開催数</div>
            </div>
            <div>
              <div className="text-5xl font-serif font-bold text-red-500 mb-2">800+</div>
              <div className="text-zinc-400 font-medium tracking-wide">のべ参加者数</div>
            </div>
            <div>
              <div className="text-5xl font-serif font-bold text-red-500 mb-2"><Globe className="w-12 h-12 mx-auto" /></div>
              <div className="text-zinc-400 font-medium tracking-wide">国籍・学年問わず参加</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-800/50 p-8 rounded-sm border border-zinc-700/50 relative">
              <div className="text-4xl text-red-800/30 absolute top-4 left-4 font-serif">"</div>
              <p className="text-lg text-zinc-300 relative z-10 italic mt-4">
                「初参加でも先輩や他のメンバーが気さくに話しかけてくれて、とても安心しました。すぐに友達ができました！」
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center font-bold">A</div>
                <div className="text-sm text-zinc-400">Freshman / Business Major</div>
              </div>
            </div>
            <div className="bg-zinc-800/50 p-8 rounded-sm border border-zinc-700/50 relative">
              <div className="text-4xl text-red-800/30 absolute top-4 left-4 font-serif">"</div>
              <p className="text-lg text-zinc-300 relative z-10 italic mt-4">
                「授業以外で生きた日本語を使う機会が増え、モチベーションが上がりました。カルチャーイベントも毎回楽しみです。」
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center font-bold">M</div>
                <div className="text-sm text-zinc-400">Junior / Japanese Minor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⑥ Next Event Section (Most Important) */}
      <section id="event" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 bg-red-800 text-white text-sm font-bold tracking-widest uppercase rounded-sm mb-4">Upcoming Event</span>
            <h2 className="font-serif text-4xl md:text-5xl text-zinc-900">メインイベントのお知らせ</h2>
          </div>

          <div className="bg-[#fdfbf7] rounded-sm overflow-hidden shadow-xl border border-red-100">
            <div className="h-48 md:h-64 bg-[url('https://images.unsplash.com/photo-1522850611732-8418f712dc26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center relative">
               <div className="absolute inset-0 bg-zinc-900/40"></div>
               <div className="absolute bottom-6 left-6 text-white">
                 <h3 className="font-serif text-4xl font-bold drop-shadow-md">Spring Matsuri 2026</h3>
                 <p className="text-lg mt-2 opacity-90">キャンパスで体験する、日本の春祭り。</p>
               </div>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-red-800 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-zinc-900">日時</h4>
                      <p className="text-zinc-600">2026年 4月 24日 (金)<br/>17:00 - 20:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-red-800 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-zinc-900">場所</h4>
                      <p className="text-zinc-600">Student Union, Grand Ballroom</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Ticket className="w-6 h-6 text-red-800 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-zinc-900">参加費</h4>
                      <p className="text-2xl font-bold text-red-800 mt-1">無料 <span className="text-sm text-zinc-500 font-normal">/ Free Entry</span></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-red-800 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-zinc-900">誰でも歓迎！</h4>
                      <p className="text-zinc-600">友達とでも、1人でもOK。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-8 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 py-4 bg-red-800 text-white font-bold rounded hover:bg-red-700 transition-colors shadow-md text-center">
                  イベントに参加登録する (RSVP)
                </button>
                <button className="px-6 py-4 bg-white text-zinc-700 font-bold rounded border border-zinc-300 hover:bg-zinc-50 transition-colors text-center">
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⑦ FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-[#fdfbf7] border-t border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-zinc-900">よくある質問 (FAQ)</h2>
            <p className="text-zinc-500 mt-4">初めての方でも安心してご参加いただけます。</p>
          </div>
          
          <div className="space-y-2">
            <FAQItem 
              question="日本語ができなくても大丈夫ですか？" 
              answer="はい、全く問題ありません！イベントは基本的に英語と日本語の両方で行われ、多くのメンバーが英語でコミュニケーションを取っています。日本の文化に興味があれば誰でも大歓迎です。" 
            />
            <FAQItem 
              question="途中参加や、一回だけの参加でもOKですか？" 
              answer="もちろんOKです。授業やアルバイトの都合に合わせて、来られる時にだけ参加するメンバーもたくさんいます。お気軽にどうぞ！" 
            />
            <FAQItem 
              question="日本人・日系人ではありませんが参加できますか？" 
              answer="大歓迎です！JSAは様々な国籍やバックグラウンドを持つ学生が集まるインターナショナルなコミュニティです。「日本が好き」という気持ちだけで十分です。" 
            />
          </div>
        </div>
      </section>

      {/* ⑧ Final CTA Section */}
      <section id="contact" className="relative py-32 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
        >
          <div className="absolute inset-0 bg-zinc-900/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">
            今週、キャンパスで<br/><span className="text-red-500">“日本に会う”。</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#event" className="w-full sm:w-auto px-8 py-4 bg-red-800 text-white font-medium rounded hover:bg-red-700 transition-all shadow-lg text-center">
              次回イベントを見る
            </a>
            <a href="#" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded border border-white/30 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" /> メーリングリスト登録
            </a>
            <a href="#" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded border border-white/30 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <Instagram className="w-4 h-4" /> Instagramをフォロー
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-800 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-zinc-950 rounded-full"></div>
            </div>
            <span className="font-serif font-bold text-lg text-white">JSA</span>
          </div>
          <div className="text-sm text-center md:text-left">
            © 2026 Japanese Student Association. Sharing Japanese culture with love and respect.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}