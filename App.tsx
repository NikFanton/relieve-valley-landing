import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Heart, Sparkles, Wind, Zap, LayoutGrid, Lock, CircleAlert } from 'lucide-react';
import { Button } from './components/Button';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [panicActivated, setPanicActivated] = useState(false);
  const [section2InView, setSection2InView] = useState(false);
  const section2Ref = useRef<HTMLElement>(null);

  const handlePanicClick = () => {
    setPanicActivated(true);
    setTimeout(() => setPanicActivated(false), 3000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSection2InView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (section2Ref.current) {
      observer.observe(section2Ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-body text-brand-dark selection:bg-brand-orange selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b-4 border-brand-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 bg-brand-green rounded-full border-2 border-brand-dark flex items-center justify-center">
                 <Wind className="text-brand-dark w-6 h-6" />
              </div>
              <span className="font-cartoon text-2xl font-bold tracking-tight">Relieve Valley</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#panic-shield" className="font-bold hover:text-brand-orange transition-colors">Panic Shield</a>
              <a href="#features" className="font-bold hover:text-brand-orange transition-colors">Features</a>
              <a href="#about" className="font-bold hover:text-brand-orange transition-colors">About</a>
              <Button size="sm">Get Early Access</Button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t-2 border-gray-100 absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#panic-shield" className="block px-3 py-4 text-lg font-bold hover:bg-yellow-50 rounded-lg">Panic Shield</a>
              <a href="#features" className="block px-3 py-4 text-lg font-bold hover:bg-yellow-50 rounded-lg">Features</a>
              <a href="#about" className="block px-3 py-4 text-lg font-bold hover:bg-yellow-50 rounded-lg">About</a>
              <div className="pt-2">
                <Button className="w-full justify-center">Get Early Access</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-brand-yellow/30 pb-20 pt-12 lg:pt-24 min-h-[80vh] flex items-center">
           <div className="absolute top-20 left-[-100px] w-64 h-64 bg-brand-green/20 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
           <div className="absolute bottom-20 right-[-100px] w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{animationDelay: '1s'}}></div>
           
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="text-center max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-brand-dark shadow-cartoon-hover mb-6 transform hover:-rotate-2 transition-transform cursor-default">
                  <Heart className="text-brand-orange w-5 h-5 fill-current" />
                  <span className="font-bold text-sm">Reviewing stress since 2024</span>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-cartoon font-extrabold leading-tight mb-8 text-brand-dark">
                 Find your <span className="text-brand-green inline-block transform hover:scale-105 transition-transform cursor-pointer underline decoration-wavy decoration-4 underline-offset-4">Inner Peace</span> <br/> 
                 in the Valley.
               </h1>
               
               <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed font-body">
                 Join a community of mindful critters. Relieve Valley is the gamified mental health app that makes self-care feel like play.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                 <Button size="lg" className="w-full sm:w-auto px-12 group" onClick={() => scrollToSection('overwhelming-fear')}>
                   Start the Experience <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                 </Button>
               </div>
             </div>
           </div>
        </section>

        {/* SECTION 1: Symptoms Visualization */}
        <section id="overwhelming-fear" className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center relative overflow-hidden px-4">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
               <span className="animate-pop-in animate-jitter text-gray-400 font-cartoon text-2xl md:text-4xl" style={{animationDelay: '0.2s'}}>Shaking</span>
               <span className="animate-pop-in animate-jitter text-red-400/80 font-cartoon text-3xl md:text-5xl" style={{animationDelay: '0.6s'}}>Fast Heartbeat</span>
               <span className="animate-pop-in animate-jitter text-gray-500 font-cartoon text-2xl md:text-4xl" style={{animationDelay: '1.0s'}}>Sweating</span>
            </div>

            <h2 className="animate-pop-in animate-jitter text-brand-orange font-cartoon text-6xl md:text-9xl font-bold uppercase tracking-tighter" style={{animationDelay: '2.5s'}}>
              Overwhelming Fear
            </h2>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12">
               <span className="animate-pop-in animate-jitter text-gray-500 font-cartoon text-3xl md:text-5xl" style={{animationDelay: '1.4s'}}>Dizziness</span>
               <span className="animate-pop-in animate-jitter text-gray-400 font-cartoon text-2xl md:text-4xl" style={{animationDelay: '1.8s'}}>Discomfort</span>
               <span className="animate-pop-in animate-jitter text-orange-400/80 font-cartoon text-3xl md:text-5xl" style={{animationDelay: '2.1s'}}>Shortness of breath</span>
            </div>
          </div>
          
          <div className="mt-20 animate-bounce text-gray-500 flex flex-col items-center">
             <span className="text-sm font-bold mb-2 text-gray-400 font-cartoon">Scroll down</span>
             <ArrowRight className="rotate-90 text-gray-400" />
          </div>
        </section>

        {/* SECTION 2: Transition to Control */}
        <section 
          ref={section2Ref}
          className="min-h-[100vh] bg-[#fdfaf1] flex flex-col items-center justify-center px-4 relative overflow-hidden"
        >
           <div className={`max-w-4xl mx-auto text-center space-y-16 reveal-on-scroll ${section2InView ? 'active' : ''}`}>
              <h3 className="text-4xl md:text-6xl font-cartoon font-bold text-[#57ca85] leading-tight">
                But from now on,<br/>
                <span className="text-brand-dark">you'll manage to deal with it.</span>
              </h3>
              
              <div className="flex justify-center items-center relative">
                {/* Pulse Glow Layer */}
                <div className={`absolute w-64 h-64 bg-red-400/30 rounded-full blur-[60px] animate-glow-pulse transition-opacity duration-1000 ${section2InView ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* Visual Button */}
                <button 
                  onClick={() => scrollToSection('panic-shield')}
                  className="relative z-10 w-40 h-40 md:w-56 md:h-56 bg-[#ff7b7b] rounded-[60px] md:rounded-[80px] border-[6px] md:border-[8px] border-black shadow-[12px_12px_0_0_#000] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] hover:scale-105 transition-all flex items-center justify-center group overflow-hidden"
                >
                   {/* Glance / Reflection Overlay */}
                   <div className="absolute top-[8%] left-[10%] w-[80%] h-[35%] bg-gradient-to-b from-white/30 to-transparent rounded-[100%] pointer-events-none z-10"></div>
                   
                   {/* Relief Button Text */}
                   <span className="text-white font-cartoon font-bold text-2xl md:text-3xl text-center leading-none z-20 select-none drop-shadow-md">
                      Relief<br/>Button
                   </span>
                </button>
              </div>
              <p className={`text-emerald-600 font-cartoon text-xl font-bold animate-pulse transition-opacity duration-1000 ${section2InView ? 'opacity-100' : 'opacity-0'}`}>Press to begin the journey</p>
           </div>
        </section>

        {/* Panic Shield Section */}
        <section id="panic-shield" className="py-24 bg-brand-green/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl mix-blend-multiply"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange px-4 py-2 rounded-full border-2 border-brand-orange/20 font-bold mb-6">
                   <Zap size={20} className="fill-current" />
                   <span>Instant Relief</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-cartoon font-bold text-brand-dark mb-6 leading-tight">
                  Panic Button. <br/>
                  <span className="text-brand-orange underline decoration-wavy decoration-2">Always by your side.</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed font-body">
                  Anxiety doesn't wait for the right moment, and neither should you. Our <strong>Alert Button</strong> is designed to be just one tap away, no matter where you are on your phone.
                </p>

                <ul className="space-y-4">
                   <li className="flex items-center gap-4 bg-white p-4 rounded-xl border-2 border-brand-dark shadow-cartoon-hover transform hover:translate-x-1 transition-transform cursor-default text-brand-dark">
                      <div className="bg-brand-blue/10 p-3 rounded-lg border-2 border-brand-dark">
                        <LayoutGrid className="text-brand-blue w-6 h-6" />
                      </div>
                      <div>
                          <span className="font-cartoon font-bold text-xl block">Home Screen Widget</span>
                          <span className="text-gray-500 text-sm font-bold">Instant access from your desktop</span>
                      </div>
                   </li>
                   <li className="flex items-center gap-4 bg-white p-4 rounded-xl border-2 border-brand-dark shadow-cartoon-hover transform hover:translate-x-1 transition-transform cursor-default text-brand-dark">
                      <div className="bg-brand-orange/10 p-3 rounded-lg border-2 border-brand-dark">
                        <Lock className="text-brand-orange w-6 h-6" />
                      </div>
                      <div>
                          <span className="font-cartoon font-bold text-xl block">Lock Screen Widget</span>
                          <span className="text-gray-500 text-sm font-bold">One tap without unlocking</span>
                      </div>
                   </li>
                </ul>
              </div>

              <div className="order-1 md:order-2 flex justify-center perspective-1000">
                 <div className="bg-brand-dark rounded-[3rem] p-3 mx-auto w-[320px] shadow-cartoon transform rotate-3 hover:rotate-0 transition-transform duration-500 origin-center">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden h-[600px] border-4 border-brand-dark relative bg-gradient-to-b from-blue-50 to-white flex flex-col">
                        <div className="h-7 w-32 bg-brand-dark rounded-b-xl mx-auto absolute top-0 left-0 right-0 z-20"></div>

                        <div className="flex-1 flex flex-col items-center pt-20 px-6">
                            <div className="text-6xl font-cartoon text-brand-dark/20 mb-2">12:45</div>
                            <div className="text-lg font-bold text-brand-dark/20 mb-12">Thursday, Oct 12</div>
                            
                            <div 
                                onClick={handlePanicClick}
                                className={`w-full rounded-2xl p-4 border-2 border-brand-dark shadow-cartoon-hover mb-8 relative overflow-hidden group cursor-pointer transition-all duration-300 ${panicActivated ? 'bg-brand-green' : 'bg-white hover:bg-gray-50'}`}
                            >
                                {panicActivated ? (
                                    <div className="flex flex-col items-center justify-center py-2 animate-in fade-in zoom-in duration-300">
                                        <Wind className="w-8 h-8 text-brand-dark mb-2 animate-pulse" />
                                        <span className="font-cartoon font-bold text-lg text-brand-dark text-center">Let's calm you... 🍃</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <div className="bg-brand-orange p-3 rounded-xl border-2 border-brand-dark text-white shadow-sm group-active:scale-95 transition-transform">
                                            <CircleAlert size={24} />
                                        </div>
                                        <div className="flex-1 text-brand-dark">
                                            <div className="font-cartoon font-bold text-lg">Panic Button</div>
                                            <div className="text-xs text-gray-500 font-bold">Tap for immediate help</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="w-full space-y-3 opacity-50">
                                <div className="h-16 bg-gray-100 rounded-xl border border-gray-200"></div>
                                <div className="h-16 bg-gray-100 rounded-xl border border-gray-200"></div>
                            </div>
                        </div>

                        <div className="h-1 w-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* Features Grid - MOVED TO THE END */}
        <section id="features" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
               <h2 className="text-5xl font-cartoon font-bold mb-6">Why the Valley?</h2>
               <p className="text-xl text-gray-600 font-body">Three simple pillars to a happier you.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { 
                  title: 'Daily Quests', 
                  desc: 'Complete small, mindful tasks to earn treats for your companion.',
                  color: 'bg-brand-orange',
                  icon: '🎯'
                },
                { 
                  title: 'Mood Mirror', 
                  desc: 'Your companion reflects your emotional state, helping you build awareness.',
                  color: 'bg-brand-blue',
                  icon: '🪞'
                },
                { 
                  title: 'Zen Garden', 
                  desc: 'A safe space to meditate, breathe, and simply be with friends.',
                  color: 'bg-brand-green',
                  icon: '🎋'
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[40px] border-4 border-brand-dark shadow-cartoon hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <div className={`w-20 h-20 ${feature.color} rounded-3xl border-2 border-brand-dark flex items-center justify-center text-4xl mb-8 shadow-cartoon-hover`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-cartoon font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed font-body">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About / CTA Footer */}
        <section id="about" className="py-24 bg-brand-dark text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                <Sparkles className="w-16 h-16 text-brand-yellow mx-auto mb-8 animate-pulse" />
                <h2 className="text-5xl md:text-6xl font-cartoon font-bold mb-10">Ready to start your journey?</h2>
                <div className="bg-white/10 p-10 rounded-[50px] backdrop-blur-md max-w-2xl mx-auto border-2 border-white/20">
                    <p className="text-2xl mb-8 font-body">Sign up for early access and get a legendary <span className="text-brand-yellow font-bold">Golden Retriever</span> starter pack.</p>
                    <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-1 px-8 py-5 rounded-2xl text-brand-dark font-bold border-4 border-transparent focus:border-brand-yellow outline-none transition-colors"
                        />
                        <Button variant="primary" size="lg" className="w-full sm:w-auto px-10">
                            Join Now
                        </Button>
                    </form>
                </div>
                <div className="mt-16 text-gray-500 text-sm font-body">
                    © 2024 Relieve Valley. All rights reserved. <br/>
                    Designed for serenity and play.
                </div>
            </div>
        </section>
      </main>

    </div>
  );
}

export default App;