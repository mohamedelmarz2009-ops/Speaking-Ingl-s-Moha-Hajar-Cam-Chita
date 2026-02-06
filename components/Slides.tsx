import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ChartDataItem, SlideData } from '../types';
import { NeonBarChart, NeonPieChart, NeonProgressBar } from './Charts';
import { Vote, Users, Building2, Trophy, Coins, Home, MessageCircle, Heart, Star, Gift, Goal } from 'lucide-react';

/* --- Animations --- */
const containerVariants: Variants = {
  hidden: { opacity: 0, rotateY: 15, x: 50 },
  visible: { 
    opacity: 1, 
    rotateY: 0, 
    x: 0,
    transition: { 
      duration: 0.8, 
      type: "spring",
      bounce: 0.3
    } 
  },
  exit: { opacity: 0, rotateY: -15, x: -50, transition: { duration: 0.5 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

/* --- Slide Components --- */

export const TitleSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <motion.div 
      className="text-center max-w-4xl mx-auto w-full px-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <motion.div 
        className="inline-block p-3 md:p-4 mb-4 md:mb-6 rounded-2xl bg-white shadow-xl shadow-blue-500/10 border border-blue-100 transform -rotate-2"
        animate={{ rotate: [ -2, 2, -2 ] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <span className="text-xs md:text-sm font-bold tracking-widest text-blue-500 uppercase">Social Research 2024</span>
      </motion.div>
      
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 mb-4 md:mb-6 drop-shadow-sm leading-tight break-words">
        {data.title}
      </h1>
      
      <h2 className="text-lg sm:text-xl md:text-3xl text-slate-500 font-light mb-8 md:mb-12 px-4">
        {data.subtitle}
      </h2>

      <div className="flex justify-center gap-6 md:gap-8">
         <div className="flex flex-col items-center gap-2">
            <div className="p-3 md:p-4 bg-white rounded-full shadow-lg text-blue-500">
               <Users size={24} className="md:w-8 md:h-8" />
            </div>
            <span className="text-[10px] md:text-xs text-slate-400 font-bold uppercase">Society</span>
         </div>
         <div className="flex flex-col items-center gap-2">
            <div className="p-3 md:p-4 bg-white rounded-full shadow-lg text-purple-500">
               <MessageCircle size={24} className="md:w-8 md:h-8" />
            </div>
            <span className="text-[10px] md:text-xs text-slate-400 font-bold uppercase">Opinions</span>
         </div>
      </div>
    </motion.div>
  );
};

export const IntroSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <motion.div 
      className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full max-w-5xl px-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 border-l-8 border-blue-500 pl-4 md:pl-6">
          Introduction &<br/>Objectives
        </h2>
        <div className="space-y-3 md:space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
           <motion.p variants={itemVariants}>
             This project analyzes the <strong>social, political, and cultural perspectives</strong> of our classroom environment.
           </motion.p>
           <motion.p variants={itemVariants}>
             We conducted an anonymous survey consisting of <strong>6 key questions</strong> to gather honest data.
           </motion.p>
           <motion.div variants={itemVariants} className="p-4 md:p-6 bg-white rounded-xl shadow-lg border-l-4 border-purple-500 mt-4">
             <p className="italic text-slate-500 text-sm md:text-base">
               "Understanding the diversity of thought within our peer group is essential for fostering respect and critical thinking."
             </p>
           </motion.div>
        </div>
      </div>

      <div className="relative h-[300px] md:h-[400px] bg-white rounded-2xl shadow-2xl p-4 md:p-8 flex items-center justify-center border border-slate-100 perspective-1000 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50 rounded-2xl"></div>
          <div className="relative z-10 grid grid-cols-2 gap-3 md:gap-4">
             {[1,2,3,4].map((i) => (
               <motion.div 
                 key={i}
                 className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-xl shadow-md flex items-center justify-center text-slate-300"
                 whileHover={{ scale: 1.1, rotateY: 10, color: '#3b82f6' }}
               >
                 <Vote size={32} className="md:w-10 md:h-10" />
               </motion.div>
             ))}
          </div>
      </div>
    </motion.div>
  );
};

export const ChartSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <motion.div 
      className="w-full max-w-6xl h-full flex flex-col px-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="mb-4 md:mb-8">
        <h3 className="text-xs md:text-sm font-bold text-blue-500 tracking-wider uppercase mb-1 md:mb-2">Question {data.id - 2}</h3>
        <h2 className="text-2xl md:text-4xl font-bold text-slate-800 leading-tight">{data.question}</h2>
      </div>

      <div className="flex-1 grid md:grid-cols-3 gap-6 md:gap-8 min-h-0">
        {/* Chart Area */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-4 md:p-6 border border-slate-100 relative overflow-hidden flex flex-col min-h-[300px]">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
          <div className="flex-1">
            {data.type === 2 ? (
              <NeonBarChart data={data.data!} />
            ) : (
              <NeonPieChart data={data.data!} />
            )}
          </div>
        </div>

        {/* Analysis Area */}
        <div className="flex flex-col justify-center space-y-4 md:space-y-6">
          <div className="p-4 md:p-6 bg-slate-800 text-white rounded-2xl shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-white/20 transition-all"></div>
            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={20} /> Analysis
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="p-4 md:p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Vote size={16} />
                </div>
                <span className="font-bold text-slate-700 text-sm md:text-base">Total Votes</span>
             </div>
             <p className="text-3xl md:text-4xl font-mono text-slate-900">
               {data.data?.reduce((acc, curr) => acc + curr.value, 0)}
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProgressSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <motion.div 
      className="w-full max-w-4xl px-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="text-center mb-8 md:mb-12">
         <h3 className="text-xs md:text-sm font-bold text-pink-500 tracking-wider uppercase mb-1 md:mb-2">Public Services</h3>
         <h2 className="text-2xl md:text-4xl font-bold text-slate-800">{data.question}</h2>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 border border-slate-100 relative">
        {data.data?.map((item, idx) => (
          <NeonProgressBar 
            key={idx} 
            label={item.name} 
            value={item.value} 
            max={20} // approx max votes
            color={item.color!} 
          />
        ))}

        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-100 text-center">
           <p className="text-slate-600 italic text-sm md:text-base">{data.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const ComparisonSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const messi = data.data?.find(d => d.name === "Messi");
  const cr7 = data.data?.find(d => d.name === "Cristiano Ronaldo");
  const idk = data.data?.find(d => d.name.includes("Don't"));

  return (
    <motion.div 
      className="w-full max-w-6xl text-center px-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12">{data.question}</h2>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
        {/* Messi Card */}
        <motion.div 
          className="relative bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-[18rem] sm:max-w-xs md:w-80 h-80 md:h-96 flex flex-col items-center justify-between border-b-4 border-blue-500 group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
        >
           <div className="absolute top-0 left-0 w-full h-full bg-blue-50 opacity-0 group-hover:opacity-50 transition-opacity rounded-3xl"></div>
           <div className="z-10 text-5xl md:text-6xl">⚽️</div>
           <h3 className="z-10 text-xl md:text-2xl font-bold text-slate-800">Messi</h3>
           <div className="z-10 text-4xl md:text-5xl font-mono font-bold text-blue-600 drop-shadow-sm">{messi?.value}</div>
           <span className="z-10 text-[10px] md:text-xs uppercase tracking-widest text-slate-400">Votes</span>
        </motion.div>

        {/* VS Badge */}
        <div className="relative z-20">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 text-white font-black text-lg md:text-xl italic border-4 border-white animate-pulse">
            VS
          </div>
        </div>

        {/* Ronaldo Card */}
        <motion.div 
          className="relative bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-[18rem] sm:max-w-xs md:w-80 h-80 md:h-96 flex flex-col items-center justify-between border-b-4 border-purple-500 group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
        >
           <div className="absolute top-0 left-0 w-full h-full bg-purple-50 opacity-0 group-hover:opacity-50 transition-opacity rounded-3xl"></div>
           <div className="z-10 text-5xl md:text-6xl">🥅</div>
           <h3 className="z-10 text-xl md:text-2xl font-bold text-slate-800">C. Ronaldo</h3>
           <div className="z-10 text-4xl md:text-5xl font-mono font-bold text-purple-600 drop-shadow-sm">{cr7?.value}</div>
           <span className="z-10 text-[10px] md:text-xs uppercase tracking-widest text-slate-400">Votes</span>
        </motion.div>
      </div>

      <div className="mt-8 md:mt-12 text-slate-500 text-xs md:text-sm bg-white/50 inline-block px-4 md:px-6 py-2 rounded-full backdrop-blur-sm">
        Undecided: <strong>{idk?.value}</strong> students
      </div>
    </motion.div>
  );
};

export const ConclusionSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto w-full px-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-slate-800">Conclusion</h2>
      
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {[
          { icon: <Users size={32} className="text-blue-500" />, title: "Diverse Opinions", text: "Our class shows a healthy variety of political and social perspectives, reflecting the complexity of society." },
          { icon: <Heart size={32} className="text-pink-500" />, title: "Respect is Key", text: "Despite differences in football or politics, the ability to discuss these topics respectfully is our biggest strength." },
          { icon: <Building2 size={32} className="text-cyan-500" />, title: "Active Awareness", text: "Students are aware of major issues like housing and immigration, showing engagement with the real world." },
        ].map((item, i) => (
          <motion.div 
            key={i}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
            whileHover={{ y: -5 }}
            variants={itemVariants}
          >
            <div className="mb-4 bg-slate-50 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center">{item.icon}</div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate-800">{item.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* --- Penalty Kick Game Component --- */
const PenaltyGame = () => {
  const [direction, setDirection] = useState(0); // -10 to 10
  const [power, setPower] = useState(50); // 0 to 100
  const [ballState, setBallState] = useState<'idle' | 'shooting' | 'scored' | 'missed'>('idle');

  const shoot = () => {
    if (ballState !== 'idle') {
      // Reset
      setBallState('idle');
      setDirection(0);
      setPower(50);
      return;
    }

    setBallState('shooting');

    // Simple Logic:
    // Power needs to be between 40 and 90
    // Direction needs to be between -8 and 8 (Goal posts are at -10 and 10 conceptually)
    
    setTimeout(() => {
      if (power >= 40 && power <= 90 && direction >= -8 && direction <= 8) {
        setBallState('scored');
      } else {
        setBallState('missed');
      }
    }, 800);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl p-4 md:p-6 shadow-xl border border-slate-200">
      <h3 className="text-center font-bold text-slate-700 mb-4 flex items-center justify-center gap-2 text-lg">
        <Goal size={20} className="text-green-500"/> Penalty Kick Minigame
      </h3>

      {/* Game Visual Area */}
      <div className="relative h-40 md:h-48 bg-green-500 rounded-lg overflow-hidden mb-6 flex justify-center items-end border-4 border-green-600 shadow-inner">
        {/* Goal */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-40 md:w-48 h-20 md:h-24 border-t-8 border-l-8 border-r-8 border-white"></div>
        
        {/* Goalkeeper (Simple) */}
        <motion.div 
            className="absolute top-12 md:top-14 left-1/2 w-6 md:w-8 h-10 md:h-12 bg-red-500 rounded-full"
            animate={ballState === 'shooting' ? { x: (Math.random() * 100) - 50 } : { x: '-50%' }}
            transition={{ duration: 0.5 }}
        />

        {/* Ball */}
        <motion.div 
          className="w-5 h-5 md:w-6 md:h-6 bg-white rounded-full shadow-md z-10 border border-slate-300 relative"
          initial={{ bottom: 10, x: 0, scale: 1 }}
          animate={
            ballState === 'shooting' ? { bottom: 150, x: direction * 5, scale: 0.5 } : 
            ballState === 'scored' ? { bottom: 140, x: direction * 5, scale: 0.5 } :
            ballState === 'missed' ? { bottom: 180, x: direction * 15, scale: 0.4 } :
            { bottom: 10, x: 0, scale: 1 }
          }
          transition={{ duration: 0.8 }}
        />
        
        {/* Result Text */}
        {ballState === 'scored' && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/40 text-yellow-400 font-black text-3xl md:text-4xl uppercase tracking-widest z-20">
            GOOOAL!
          </motion.div>
        )}
        {ballState === 'missed' && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/40 text-red-400 font-black text-3xl md:text-4xl uppercase tracking-widest z-20">
            MISS!
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {ballState !== 'idle' ? (
          <button 
            onClick={shoot}
            className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition"
          >
            Reset Game
          </button>
        ) : (
          <>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Direction</label>
              <input 
                type="range" 
                min="-12" 
                max="12" 
                value={direction} 
                onChange={(e) => setDirection(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500 touch-none"
              />
              <div className="flex justify-between text-[10px] md:text-xs text-slate-400 mt-1">
                <span>Left</span>
                <span>Center</span>
                <span>Right</span>
              </div>
            </div>
            
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Power</label>
              <input 
                type="range" 
                min="0" 
                max="120" 
                value={power} 
                onChange={(e) => setPower(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500 touch-none"
              />
              <div className="flex justify-between text-[10px] md:text-xs text-slate-400 mt-1">
                 <span>Weak</span>
                 <span>Perfect</span>
                 <span>Too High</span>
              </div>
            </div>

            <button 
              onClick={shoot}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-lg shadow-blue-500/30 transition transform active:scale-95"
            >
              SHOOT!
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const FinalSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [surpriseOpen, setSurpriseOpen] = useState(false);

  return (
    <motion.div 
      className="text-center w-full max-w-6xl px-4 pb-20 md:pb-0"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
       <motion.div
         animate={{ 
           boxShadow: ["0 0 0 rgba(59,130,246,0)", "0 0 50px rgba(59,130,246,0.3)", "0 0 0 rgba(59,130,246,0)"]
         }}
         transition={{ duration: 3, repeat: Infinity }}
         className="inline-block rounded-full p-6 md:p-8 bg-white mb-6 md:mb-8 shadow-2xl"
       >
         <Trophy size={48} className="text-yellow-500 md:w-16 md:h-16" />
       </motion.div>

      <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-4 md:mb-6">Thank You!</h1>
      <h2 className="text-xl md:text-2xl text-slate-500 mb-8 md:mb-12">Any Questions?</h2>
      
      <div className="bg-white px-6 md:px-8 py-4 rounded-xl shadow-lg border border-slate-100 inline-block mb-8 md:mb-12 max-w-full">
        <p className="text-xs md:text-sm font-mono text-slate-400 uppercase tracking-widest mb-2">Project Authors</p>
        <div className="flex gap-2 md:gap-4 text-slate-800 font-bold flex-wrap justify-center text-sm md:text-base">
           <span>Mohamed</span>
           <span className="text-slate-300">•</span>
           <span>Hajar</span>
           <span className="text-slate-300">•</span>
           <span>Chitafolo</span>
           <span className="text-slate-300">•</span>
           <span>Cam</span>
        </div>
      </div>

      {/* Mini-Games Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center justify-items-center mt-8 border-t border-slate-200 pt-8 md:pt-12">
        
        {/* Left: Penalty Game */}
        <PenaltyGame />

        {/* Right: Surprise Button */}
        <div className="flex flex-col items-center mt-8 md:mt-0">
          {surpriseOpen ? (
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="p-6 md:p-8 bg-white rounded-full shadow-2xl border-4 border-pink-500 text-center max-w-xs"
            >
              <div className="text-3xl md:text-4xl mb-2">🤡</div>
              <p className="text-lg md:text-xl font-black text-pink-600">Whoever reads this is a fool!</p>
              <p className="text-xs md:text-sm text-slate-400 mt-2">(JAJAJAJ)</p>
            </motion.div>
          ) : (
            <motion.button 
              onClick={() => setSurpriseOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white font-bold text-base md:text-lg shadow-xl shadow-pink-500/40 flex flex-col items-center justify-center gap-2 border-4 border-white"
            >
              <Gift size={24} className="md:w-8 md:h-8" />
              <span>OPEN<br/>SURPRISE</span>
            </motion.button>
          )}
        </div>

      </div>

    </motion.div>
  );
};
