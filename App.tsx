import React, { useState } from 'react';
import { Menu, X, ArrowRight, Heart, Sparkles, Wind, Zap, LayoutGrid, Lock, CircleAlert } from 'lucide-react';
import { Button } from './components/Button';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [panicActivated, setPanicActivated] = useState(false);

  const handlePanicClick = () => {
    setPanicActivated(true);
    // Reset after 3 seconds to let user try again
    setTimeout(() => setPanicActivated(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col font-body text-brand-dark selection:bg-brand-orange selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b-4 border-brand-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-brand-green rounded-full border-2 border-brand-dark flex items-center justify-center">
                 <Wind className="text-brand-dark w-6 h-6" />
              </div>
              <span className="font-cartoon text-2xl font-bold tracking-tight">Relieve Valley</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="font-bold hover:text-brand-orange transition-colors">Features</a>
              <a href="#panic-shield" className="font-bold hover:text-brand-orange transition-colors">Panic Shield</a>
              <a href="#about" className="font-bold hover:text-brand-orange transition-colors">About</a>
              <Button size="sm">Get Early Access</Button>
            </div>

            {/* Mobile Menu Button */}
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

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t-2 border-gray-100 absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#features" className="block px-3 py-4 text-lg font-bold hover:bg-yellow-50 rounded-lg">Features</a>
              <a href="#panic-shield" className="block px-3 py-4 text-lg font-bold hover:bg-yellow-50 rounded-lg">Panic Shield</a>
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
        <section className="relative overflow-hidden bg-brand-yellow/30 pb-20 pt-12 lg:pt-24">
           {/* Background decorative blobs */}
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
                 <Button size="lg" className="w-full sm:w-auto px-12 group">
                   Join the Waitlist <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                 </Button>
                 <span className="text-sm font-bold text-gray-400">Limited spots available!</span>
               </div>
             </div>
           </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-cartoon font-bold mb-4">Why the Valley?</h2>
               <p className="text-lg text-gray-600">Three simple pillars to a happier you.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
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
                <div key={idx} className="bg-white p-8 rounded-3xl border-4 border-brand-dark shadow-cartoon hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl border-2 border-brand-dark flex items-center justify-center text-3xl mb-6 shadow-cartoon-hover`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-cartoon font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Panic Shield Section */}
        <section id="panic-shield" className="py-20 bg-brand-green/10 overflow-hidden relative">
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
                   <li className="flex items-center gap-4 bg-white p-4 rounded-xl border-2 border-brand-dark shadow-cartoon-hover transform hover:translate-x-1 transition-transform cursor-default">
                      <div className="bg-brand-blue/10 p-3 rounded-lg border-2 border-brand-dark">
                        <LayoutGrid className="text-brand-blue w-6 h-6" />
                      </div>
                      <div>
                          <span className="font-cartoon font-bold text-xl block">Home Screen Widget</span>
                          <span className="text-gray-500 text-sm">Instant access from your desktop</span>
                      </div>
                   </li>
                   <li className="flex items-center gap-4 bg-white p-4 rounded-xl border-2 border-brand-dark shadow-cartoon-hover transform hover:translate-x-1 transition-transform cursor-default">
                      <div className="bg-brand-orange/10 p-3 rounded-lg border-2 border-brand-dark">
                        <Lock className="text-brand-orange w-6 h-6" />
                      </div>
                      <div>
                          <span className="font-cartoon font-bold text-xl block">Lock Screen Widget</span>
                          <span className="text-gray-500 text-sm">One tap without unlocking</span>
                      </div>
                   </li>
                </ul>
              </div>

              {/* Visual representation */}
              <div className="order-1 md:order-2 flex justify-center perspective-1000">
                 {/* Simple CSS Phone Mockup */}
                 <div className="bg-brand-dark rounded-[3rem] p-3 mx-auto w-[320px] shadow-cartoon transform rotate-3 hover:rotate-0 transition-transform duration-500 origin-center">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden h-[600px] border-4 border-brand-dark relative bg-gradient-to-b from-blue-50 to-white flex flex-col">
                        {/* Status Bar */}
                        <div className="h-7 w-32 bg-brand-dark rounded-b-xl mx-auto absolute top-0 left-0 right-0 z-20"></div>

                        {/* Lock Screen Content Simulation */}
                        <div className="flex-1 flex flex-col items-center pt-20 px-6">
                            <div className="text-6xl font-cartoon text-brand-dark/20 mb-2">12:45</div>
                            <div className="text-lg font-bold text-brand-dark/20 mb-12">Thursday, Oct 12</div>
                            
                            {/* The Widget - Interactive */}
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
                                        <div className="flex-1">
                                            <div className="font-cartoon font-bold text-lg text-brand-dark">Panic Button</div>
                                            <div className="text-xs text-gray-500 font-bold">Tap for immediate help</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Notification Mockups */}
                            <div className="w-full space-y-3 opacity-50">
                                <div className="h-16 bg-gray-100 rounded-xl border border-gray-200"></div>
                                <div className="h-16 bg-gray-100 rounded-xl border border-gray-200"></div>
                            </div>
                        </div>

                        {/* Bottom Hint */}
                        <div className="h-1 w-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* About / CTA Footer */}
        <section id="about" className="py-20 bg-brand-dark text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                <Sparkles className="w-12 h-12 text-brand-yellow mx-auto mb-6 animate-pulse" />
                <h2 className="text-4xl md:text-5xl font-cartoon font-bold mb-8">Ready to start your journey?</h2>
                <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md max-w-xl mx-auto border-2 border-white/20">
                    <p className="text-xl mb-6 font-body">Sign up for early access and get a legendary <span className="text-brand-yellow font-bold">Golden Retriever</span> starter pack.</p>
                    <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-1 px-6 py-4 rounded-xl text-brand-dark font-bold border-2 border-transparent focus:border-brand-yellow outline-none transition-colors text-brand-dark"
                        />
                        <Button variant="primary" size="lg" className="w-full sm:w-auto">
                            Join Now
                        </Button>
                    </form>
                </div>
                <div className="mt-12 text-gray-400 text-sm">
                    © 2024 Relieve Valley. All rights reserved. <br/>
                    Made with love and React.
                </div>
            </div>
        </section>
      </main>

    </div>
  );
}

export default App;