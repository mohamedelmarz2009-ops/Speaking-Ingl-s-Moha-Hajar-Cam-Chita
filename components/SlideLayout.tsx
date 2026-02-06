import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, User, LayoutGrid, X, Maximize, Minimize } from 'lucide-react';
import { SlideData } from '../types';

interface SlideLayoutProps {
  children: React.ReactNode;
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  title?: string;
  slides: SlideData[];
  onJumpToSlide: (index: number) => void;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({
  children,
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  title,
  slides,
  onJumpToSlide
}) => {
  // Calculate progress
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable fullscreen mode: ${e.message} (${e.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-slate-50 overflow-x-hidden text-slate-800">
      
      {/* Background Decor Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[15rem] md:w-[30rem] h-[15rem] md:h-[30rem] bg-pink-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-[20%] left-[10%] w-20 h-20 md:w-32 md:h-32 bg-cyan-100 rounded-full blur-2xl opacity-40" />
      </div>

      {/* Header */}
      <header className="relative z-40 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
           <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
           <span className="font-bold text-slate-400 text-xs md:text-sm tracking-widest uppercase">1 BC A</span>
        </div>
        
        {/* Authors on the top right */}
        <h2 className="text-xs md:text-base font-bold text-slate-500 opacity-80 hidden sm:block">
            Mohamed • Hajar • Chitafolo • Cam
        </h2>
      </header>

      {/* Main Content Area - 3D Perspective Context */}
      <main className="flex-1 relative z-10 perspective-container flex items-center justify-center p-4 md:p-12 w-full max-w-[100vw] overflow-hidden">
        {children}
      </main>

      {/* GIANT FLOATING NEXT BUTTON (Fixed position to survive scrolling) */}
      {currentSlide < totalSlides - 1 && (
        <button
          onClick={onNext}
          className="fixed bottom-24 right-4 md:bottom-28 md:right-12 z-[100] 
                     bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white font-black text-sm md:text-lg tracking-wider
                     px-6 py-4 md:px-8 md:py-5 rounded-full 
                     shadow-[0_10px_30px_rgba(37,99,235,0.5)] 
                     hover:shadow-[0_10px_40px_rgba(37,99,235,0.8)] 
                     hover:scale-110 active:scale-95 
                     transition-all duration-300
                     flex items-center gap-2 md:gap-3 border-4 border-white/20
                     animate-bounce cursor-pointer"
        >
          NEXT <span className="hidden sm:inline">SLIDE</span> <ArrowRight strokeWidth={4} className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      )}

      {/* Footer / Controls */}
      <footer className="relative z-50 px-4 md:px-8 py-4 md:py-6 flex flex-col-reverse gap-4 sm:flex-row justify-between items-center bg-white/60 backdrop-blur-md border-t border-slate-200">
        
        <div className="flex items-center gap-2 md:gap-4 text-xs font-medium text-slate-500 w-full sm:w-auto justify-center sm:justify-start">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-3 py-2 md:px-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:border-blue-300 transition-all group"
          >
            <LayoutGrid size={16} className="text-slate-400 group-hover:text-blue-500" />
            <span className="font-bold text-slate-600 group-hover:text-blue-600">Map</span>
          </button>

          <button 
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3 py-2 md:px-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:border-blue-300 transition-all group"
          >
            {isFullscreen ? <Minimize size={16} className="text-slate-400 group-hover:text-blue-500"/> : <Maximize size={16} className="text-slate-400 group-hover:text-blue-500"/>}
            <span className="font-bold text-slate-600 group-hover:text-blue-600">
              {isFullscreen ? 'Exit' : 'Full'}
            </span>
          </button>
        </div>

        {/* Standard Navigation */}
        <div className="flex items-center gap-4 md:gap-6">
           <span className="text-xs md:text-sm font-mono text-slate-400">
             {currentSlide + 1} <span className="text-slate-300">/</span> {totalSlides}
           </span>
           
           <div className="flex gap-2 md:gap-3">
             <button 
               onClick={onPrev}
               disabled={currentSlide === 0}
               className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 border border-slate-100 text-slate-600 z-50"
               aria-label="Previous Slide"
             >
               <ArrowLeft size={20} className="md:w-6 md:h-6" />
             </button>
             {/* Small backup next button */}
             <button 
               onClick={onNext}
               disabled={currentSlide === totalSlides - 1}
               className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 z-50"
               aria-label="Next Slide"
             >
               <ArrowRight size={18} className="md:w-5 md:h-5" />
             </button>
           </div>
        </div>
      </footer>

      {/* Slide Overview Menu (Modal) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200 overflow-hidden">
          <div className="p-4 md:p-6 flex justify-between items-center border-b border-slate-700">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <LayoutGrid className="text-blue-500" /> Slide Map
            </h2>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {slides.map((slide, index) => (
                <button 
                  key={slide.id} 
                  onClick={() => { onJumpToSlide(index); setIsMenuOpen(false); }}
                  className={`
                    flex flex-col text-left p-4 md:p-6 rounded-xl border-2 transition-all duration-200 group
                    ${currentSlide === index 
                      ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
                      : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500'}
                  `}
                >
                  <div className="flex justify-between items-start w-full mb-2">
                    <span className={`text-xs font-mono px-2 py-1 rounded ${currentSlide === index ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                      #{index + 1}
                    </span>
                    {currentSlide === index && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                  </div>
                  <h3 className={`font-bold text-base md:text-lg mb-1 ${currentSlide === index ? 'text-blue-400' : 'text-slate-200 group-hover:text-white'}`}>
                    {slide.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 line-clamp-2">
                    {slide.question || slide.subtitle || slide.description || "Presentation Slide"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out z-50" style={{ width: `${progress}%` }} />
    </div>
  );
};