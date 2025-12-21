import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Heart, Sparkles, Wind, Zap, LayoutGrid, Lock, CircleAlert, Brain, ShieldCheck, Microscope } from 'lucide-react';
import { Button } from './components/Button';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [panicActivated, setPanicActivated] = useState(false);
  const [section1InView, setSection1InView] = useState(false);
  const [section2InView, setSection2InView] = useState(false);
  const [showNavCta, setShowNavCta] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [localDate, setLocalDate] = useState('');
  
  const heroRef = useRef<HTMLElement>(null);
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);

  const handlePanicClick = () => {
    if (panicActivated) return;
    setPanicActivated(true);
    // Automatically revert after 3 seconds
    setTimeout(() => {
      setPanicActivated(false);
    }, 3000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      setLocalTime(timeStr);
      const dateStr = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
      setLocalDate(dateStr);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Observer for Hero to hide/show Nav Button
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setShowNavCta(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    // Observer for Symptoms Section (Trigger at 30%)
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSection1InView(true);
        }
      },
      { threshold: 0.3 }
    );

    // Observer for Relief Button Section
    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSection2InView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (section1Ref.current) observer1.observe(section1Ref.current);
    if (section2Ref.current) observer2.observe(section2Ref.current);

    return () => {
      heroObserver.disconnect();
      observer1.disconnect();
      observer2.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-body text-brand-dark selection:bg-brand-orange selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b-4 border-brand-dark/10 transition-all duration-300">
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
              <a href="#science" className="font-bold hover:text-brand-orange transition-colors">Science</a>
              <div className={`transition-all duration-300 transform ${showNavCta ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-[-10px] pointer-events-none'}`}>
                <Button size="sm" onClick={() => scrollToSection('about')}>Get Early Access</Button>
              </div>
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
              <a href="#panic-shield" className="block px-3 py-4 text-lg font-bold hover:bg-yellow-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Panic Shield</a>
              <a href="#science" className="block px-3 py-4 text-lg font-bold hover:bg-yellow-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>The Science</a>
              <a href="#about" className="block px-3 py-4 text-lg font-bold hover:bg-yellow-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>About</a>
              <div className="pt-2">
                <Button className="w-full justify-center" onClick={() => { setIsMenuOpen(false); scrollToSection('about'); }}>Get Early Access</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="flex-grow pt-20">
        <section ref={heroRef} className="relative overflow-hidden bg-brand-yellow/30 pb-20 pt-12 lg:pt-24 min-h-[95vh] flex items-center">
           <div className="absolute top-20 left-[-100px] w-64 h-64 bg-brand-green/20 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
           <div className="absolute bottom-20 right-[-100px] w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{animationDelay: '1s'}}></div>
           
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="text-center max-w-4xl mx-auto">
               <h1 className="text-5xl md:text-7xl font-cartoon font-extrabold leading-tight mb-8 text-brand-dark">
                 <span className="text-[rgb(81,167,188)]">Panic & Anxiety Attack Relieve</span> <br/> 
                 <span className="text-3xl md:text-5xl text-brand-dark block mt-4">When you need it Most</span>
               </h1>
               
               <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed font-body max-w-2xl mx-auto">
                 From now on you will always be ready to handle any situation. Relieve Valley is your pocket companion for peace.
               </p>

               <div 
                 onClick={() => scrollToSection('science')}
                 className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-brand-dark shadow-cartoon-hover mb-12 transform hover:-rotate-2 hover:scale-105 transition-all cursor-pointer group"
               >
                  <Microscope className="text-brand-blue w-5 h-5 group-hover:scale-125 transition-transform" />
                  <span className="font-bold text-sm">Proven Techniques Used in Clinical Research</span>
               </div>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                 <Button size="lg" className="w-full sm:w-auto px-12 group" onClick={() => scrollToSection('about')}>
                   Get Early Access <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                 </Button>
               </div>
             </div>
           </div>
        </section>

        {/* SECTION 1: Symptoms Visualization */}
        <section 
          id="overwhelming-fear" 
          ref={section1Ref}
          className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center relative overflow-hidden px-4 md:px-8"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          <div className={`relative z-10 text-center space-y-8 max-w-4xl mx-auto transition-opacity duration-500 ${section1InView ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
               <span className={`${section1InView ? 'animate-pop-in animate-jitter' : 'opacity-0'} text-gray-400 font-cartoon text-2xl md:text-4xl`} style={{animationDelay: '0.2s'}}>Shaking</span>
               <span className={`${section1InView ? 'animate-pop-in animate-jitter' : 'opacity-0'} text-red-400/80 font-cartoon text-3xl md:text-5xl`} style={{animationDelay: '0.6s'}}>Fast Heartbeat</span>
               <span className={`${section1InView ? 'animate-pop-in animate-jitter' : 'opacity-0'} text-gray-500 font-cartoon text-2xl md:text-4xl`} style={{animationDelay: '1.0s'}}>Sweating</span>
            </div>

            <h2 className={`${section1InView ? 'animate-pop-in animate-jitter' : 'opacity-0'} text-brand-orange font-cartoon text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight md:tracking-widest px-2`} style={{animationDelay: '2.5s'}}>
              Overwhelming Fear
            </h2>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12">
               <span className={`${section1InView ? 'animate-pop-in animate-jitter' : 'opacity-0'} text-gray-500 font-cartoon text-3xl md:text-5xl`} style={{animationDelay: '1.4s'}}>Dizziness</span>
               <span className={`${section1InView ? 'animate-pop-in animate-jitter' : 'opacity-0'} text-gray-400 font-cartoon text-2xl md:text-4xl`} style={{animationDelay: '1.8s'}}>Discomfort</span>
               <span className={`${section1InView ? 'animate-pop-in animate-jitter' : 'opacity-0'} text-orange-400/80 font-cartoon text-3xl md:text-5xl`} style={{animationDelay: '2.1s'}}>Shortness of breath</span>
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
           <div className={`max-w-4xl mx-auto text-center space-y-10 md:space-y-14 reveal-on-scroll ${section2InView ? 'active' : ''}`}>
              <h3 className="text-4xl md:text-6xl font-cartoon font-bold text-[#57ca85] leading-tight">
                But from now on,<br/>
                <span className="text-brand-dark">you'll manage to deal with it.</span>
              </h3>
              
              <div className="flex justify-center items-center relative">
                {section2InView && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-[160px] h-[100px] md:w-[240px] md:h-[140px] bg-red-400/30 rounded-full blur-[30px] animate-glow-pulse"></div>
                    <div className="absolute w-[160px] h-[100px] md:w-[240px] md:h-[140px] border-4 border-red-400/50 rounded-full animate-pulse-ripple"></div>
                    <div className="absolute w-[160px] h-[100px] md:w-[240px] md:h-[140px] border-4 border-red-400/30 rounded-full animate-pulse-ripple" style={{animationDelay: '0.7s'}}></div>
                    <div className="absolute w-[160px] h-[100px] md:w-[240px] md:h-[140px] border-4 border-red-400/20 rounded-full animate-pulse-ripple" style={{animationDelay: '1.4s'}}></div>
                  </div>
                )}

                <button 
                  onClick={() => scrollToSection('panic-shield')}
                  className="relative z-10 w-36 h-20 md:w-52 md:h-28 bg-[#ff7b7b] rounded-full border-[3px] md:border-[4px] border-black shadow-[6px_8px_0_0_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] hover:scale-105 transition-all flex flex-col items-center justify-center group overflow-hidden"
                >
                   <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[65%] h-[25%] bg-white/20 rounded-full blur-[2px] pointer-events-none z-10"></div>
                   <span className="text-white font-cartoon font-semibold text-2xl md:text-3xl text-center leading-[0.9] z-20 select-none drop-shadow-md px-1">
                      Relief<br/>Button
                   </span>
                </button>
              </div>
              <p className={`text-emerald-600 font-cartoon text-lg md:text-xl font-bold animate-pulse transition-opacity duration-1000 ${section2InView ? 'opacity-100' : 'opacity-0'}`}>Press to begin the journey</p>
           </div>
        </section>

        {/* Panic Shield Section */}
        <section id="panic-shield" className="py-24 bg-brand-green/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl mix-blend-multiply"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              
              <div className="order-1">
                <h2 className="text-4xl md:text-5xl font-cartoon font-bold text-brand-orange mb-6 leading-tight">
                  Emergency Button<br/>
                  <span className="text-brand-dark">Your backup</span>
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

              <div className="order-2 flex justify-center perspective-1000">
                 <div className="bg-brand-dark rounded-[3.5rem] p-3 mx-auto w-[320px] shadow-cartoon transform rotate-3 hover:rotate-0 transition-transform duration-500 origin-center relative">
                    <div className="bg-white rounded-[2.75rem] overflow-hidden h-[600px] border-4 border-brand-dark relative bg-gradient-to-b from-blue-50 to-white flex flex-col">
                        
                        {/* Dynamic Island Style Pill */}
                        <div className="h-7 w-28 bg-brand-dark rounded-full mx-auto absolute top-3 left-0 right-0 z-40"></div>

                        {/* Fullscreen calming state within device frame */}
                        {panicActivated && (
                          <div className="absolute inset-0 z-30 bg-brand-green flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-500 text-center">
                             <Wind className="w-20 h-20 text-brand-dark mb-6 animate-pulse" />
                             
                             {/* Header Text */}
                             <h4 className="font-cartoon font-bold text-2xl text-brand-dark mb-6 leading-tight">
                               Let's calm you...
                             </h4>
                             
                             {/* Skeleton lines representing descriptive text */}
                             <div className="w-full space-y-3 max-w-[160px]">
                                <div className="h-2.5 w-full bg-brand-dark/10 rounded-full mx-auto animate-pulse"></div>
                                <div className="h-2.5 w-4/5 bg-brand-dark/10 rounded-full mx-auto animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                <div className="h-2.5 w-5/6 bg-brand-dark/10 rounded-full mx-auto animate-pulse" style={{animationDelay: '0.4s'}}></div>
                             </div>

                             {/* Placeholder for a visual button line */}
                             <div className="mt-12 h-8 w-28 bg-brand-dark/10 rounded-full border-2 border-brand-dark/5 animate-pulse" style={{animationDelay: '0.6s'}}></div>
                          </div>
                        )}

                        <div className="flex-1 flex flex-col items-center pt-20 px-6">
                            <div className="text-6xl font-cartoon text-brand-dark/20 mb-2">{localTime}</div>
                            <div className="text-lg font-bold text-brand-dark/20 mb-12">{localDate}</div>
                            
                            <div className="relative w-full mb-8">
                                <div className="absolute inset-0 bg-red-400/20 rounded-full blur-md animate-glow-pulse opacity-40"></div>
                                
                                <div 
                                    onClick={handlePanicClick}
                                    className="relative z-10 w-full rounded-full p-4 border-2 border-brand-dark shadow-cartoon-hover overflow-hidden group cursor-pointer transition-all duration-300 bg-white hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-brand-orange p-3 rounded-full border-2 border-brand-dark text-white shadow-sm group-active:scale-95 transition-transform relative overflow-hidden">
                                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[70%] h-[30%] bg-white/30 rounded-full blur-[1px]"></div>
                                            <CircleAlert size={24} />
                                        </div>
                                        <div className="flex-1 text-brand-dark">
                                            <div className="font-cartoon font-bold text-lg">Panic Button</div>
                                            <div className="text-xs text-gray-500 font-bold">Tap for immediate help</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-full space-y-3 opacity-50">
                                <div className="h-16 bg-gray-100 rounded-2xl border border-gray-200"></div>
                                <div className="h-16 bg-gray-100 rounded-2xl border border-gray-200"></div>
                            </div>
                        </div>

                        <div className="h-1 w-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* Science Section */}
        <section id="science" className="py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-brand-green/5 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20 max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-1 rounded-full border border-brand-green/30 text-xs font-bold uppercase tracking-widest mb-4">
                  Evidence Based Design
               </div>
               <h2 className="text-5xl font-cartoon font-bold mb-6 text-brand-dark">Science Behind Relieve Valley</h2>
               <p className="text-xl text-gray-600 font-body">
                 We combined friendly design with <span className="text-brand-green font-bold">scientifically proven</span> protocols to create a digital refuge that actually works.
               </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { 
                  title: 'Grounding for Panic Relief', 
                  desc: 'Utilizes the 5-4-3-2-1 Cognitive Behavioral Therapy technique to systematically rewire panic loops in real-time.',
                  fact: 'Studies show sensory grounding reduces acute anxiety by up to 60%.',
                  color: 'bg-brand-orange',
                  icon: <Brain className="w-10 h-10 text-white" />
                },
                { 
                  title: 'Nervous System Reset', 
                  desc: 'Guided resonance breathing patterns designed to stimulate the vagus nerve and activate your parasympathetic system.',
                  fact: 'Heart Rate Variability (HRV) biofeedback is clinically linked to stress resilience.',
                  color: 'bg-brand-blue',
                  icon: <ShieldCheck className="w-10 h-10 text-white" />
                },
                { 
                  title: 'Clinical UX', 
                  desc: 'Every color, sound, and animation is measured to ensure no overstimulation during high-stress states.',
                  fact: 'Based on principles of Trauma-Informed Design (TID).',
                  color: 'bg-brand-green',
                  icon: <Microscope className="w-10 h-10 text-brand-dark" />
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[40px] border-4 border-brand-dark shadow-cartoon hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col group">
                  <div className={`w-20 h-20 ${feature.color} rounded-3xl border-2 border-brand-dark flex items-center justify-center mb-8 shadow-cartoon-hover group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-cartoon font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed font-body mb-6 flex-grow">
                    {feature.desc}
                  </p>
                  <div className="mt-auto pt-6 border-t-2 border-dashed border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Clinical Insight:</span>
                    <p className="text-sm font-bold text-brand-dark/60 italic leading-snug">
                       "{feature.fact}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-24 text-center">
               <div className="inline-block bg-yellow-50 p-6 rounded-3xl border-2 border-brand-yellow max-w-2xl mx-auto shadow-sm">
                  <p className="text-sm text-gray-500 font-body">
                    All techniques are derived from peer-reviewed mental health literature including the <span className="font-bold">Journal of Anxiety Disorders</span> and <span className="font-bold">Clinical Psychology Review</span>.
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* About / CTA Footer */}
        <section id="about" className="py-24 bg-brand-dark text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                <Sparkles className="w-16 h-16 text-brand-yellow mx-auto mb-8 animate-pulse" />
                <h2 className="text-5xl md:text-6xl font-cartoon font-bold mb-10">Ready to start your journey?</h2>
                <div className="bg-white/10 p-10 rounded-[50px] backdrop-blur-md max-w-2xl mx-auto border-2 border-white/20">
                    <p className="text-2xl mb-8 font-body">Sign up for early access</p>
                    <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-1 px-8 py-5 rounded-2xl bg-white/5 text-white placeholder:text-gray-400 font-bold border-4 border-white/20 focus:border-brand-yellow outline-none transition-all"
                        />
                        <Button variant="primary" size="lg" className="w-full sm:w-auto px-10" onClick={() => scrollToSection('about')}>
                            Join Now
                        </Button>
                    </form>
                </div>
                <div className="mt-16 text-gray-500 text-sm font-body">
                    © 2025-2026 Relieve Valley. All rights reserved. <br/>
                    Designed for serenity and play.
                </div>
            </div>
        </section>
      </main>

    </div>
  );
}

export default App;