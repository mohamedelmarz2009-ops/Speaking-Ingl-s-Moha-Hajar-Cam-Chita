import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlideLayout } from './components/SlideLayout';
import { 
  TitleSlide, 
  IntroSlide, 
  ChartSlide, 
  ProgressSlide, 
  ComparisonSlide, 
  ConclusionSlide, 
  FinalSlide 
} from './components/Slides';
import { SlideType, SlideData } from './types';

// Define Data
const slides: SlideData[] = [
  {
    id: 0,
    type: SlideType.TITLE,
    title: "Classroom Survey: Opinions, Society and Perspectives",
    subtitle: "A social analysis based on student responses"
  },
  {
    id: 1,
    type: SlideType.INTRODUCTION,
    title: "Introduction",
    description: "Project context and methodology."
  },
  {
    id: 2,
    type: SlideType.CHART_BAR,
    title: "Political Preference",
    question: "Which political party do you vote for?",
    description: "The results show a significant portion of the class chooses not to vote (12), indicating either disinterest or indecision. VOX (10) has the strongest presence among voters, followed by PSOE (6).",
    data: [
      { name: 'PSOE', value: 6, color: '#ef4444' }, // Red
      { name: 'PP', value: 0, color: '#3b82f6' },   // Blue
      { name: 'VOX', value: 10, color: '#22c55e' }, // Green
      { name: 'PODEMOS', value: 0, color: '#a855f7' }, // Purple
      { name: 'SUMAR', value: 0, color: '#ec4899' }, // Pink
      { name: 'No Vote', value: 12, color: '#94a3b8' }, // Gray
    ]
  },
  {
    id: 3,
    type: SlideType.CHART_PIE,
    title: "Perception of Immigration",
    question: "What comes to mind when you hear 'Immigrant'?",
    description: "This slide reveals unconscious biases. The majority associate 'immigrant' with Latin American (10) or Moroccan (7) origins. Only 5 students consider 'All of them', suggesting specific stereotypes persist.",
    data: [
      { name: 'Latin American', value: 10, color: '#f59e0b' },
      { name: 'Moroccan', value: 7, color: '#10b981' },
      { name: 'Dark-skinned', value: 3, color: '#3b82f6' },
      { name: 'Chinese', value: 1, color: '#f43f5e' },
      { name: 'None', value: 2, color: '#cbd5e1' },
      { name: 'All of them', value: 5, color: '#8b5cf6' },
    ]
  },
  {
    id: 4,
    type: SlideType.PROGRESS_BARS,
    title: "Privatization",
    question: "Privatization of Public Services?",
    description: "A very strong consensus against privatization (16 votes). The class values public management of essential services highly compared to the minority in favor (3).",
    data: [
      { name: 'In Favor', value: 3, color: '#ef4444' },
      { name: 'Against', value: 16, color: '#3b82f6' },
      { name: 'Neutral', value: 1, color: '#94a3b8' },
    ]
  },
  {
    id: 5,
    type: SlideType.COMPARISON,
    title: "Football Rivalry",
    question: "Messi vs Cristiano Ronaldo",
    data: [
      { name: 'Messi', value: 7, color: '#3b82f6' },
      { name: 'Cristiano Ronaldo', value: 15, color: '#8b5cf6' },
      { name: "Don't know", value: 3, color: '#cbd5e1' },
    ]
  },
  {
    id: 6,
    type: SlideType.CHART_BAR,
    title: "Pensions",
    question: "Should pensions be increased?",
    description: "This issue divides the class almost evenly. 'In favor' (9) slightly edges out 'Against' (8), with a significant 'Neutral' block (6). It shows the complexity of economic debates.",
    data: [
      { name: 'In Favor', value: 9, color: '#10b981' },
      { name: 'Against', value: 8, color: '#ef4444' },
      { name: 'Neutral', value: 6, color: '#94a3b8' },
    ]
  },
  {
    id: 7,
    type: SlideType.CHART_PIE,
    title: "Squatting",
    question: "Occupation of Bank-Owned Homes?",
    description: "The majority (11) is against the occupation of bank-owned properties, valuing property rights. However, a solid group (6) supports it, likely prioritizing housing needs.",
    data: [
      { name: 'In Favor', value: 6, color: '#10b981' },
      { name: 'Against', value: 11, color: '#ef4444' },
      { name: 'Neutral', value: 1, color: '#94a3b8' },
    ]
  },
  {
    id: 8,
    type: SlideType.CONCLUSION,
    title: "Conclusion",
    subtitle: "Summary of findings"
  },
  {
    id: 9,
    type: SlideType.FINAL,
    title: "The End",
    subtitle: "Thanks for watching"
  }
];

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const jumpToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlideIndex(index);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Use e.code for better consistency with Space key
      if (e.key === 'ArrowRight' || e.code === 'Space') {
        // Prevent default scrolling for space
        if (e.code === 'Space') e.preventDefault();
        
        // Avoid double triggering if focus is on a button
        if (document.activeElement?.tagName === 'BUTTON') return;

        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const renderSlideContent = (data: SlideData) => {
    switch (data.type) {
      case SlideType.TITLE:
        return <TitleSlide data={data} />;
      case SlideType.INTRODUCTION:
        return <IntroSlide data={data} />;
      case SlideType.CHART_BAR:
      case SlideType.CHART_PIE:
        return <ChartSlide data={data} />;
      case SlideType.PROGRESS_BARS:
        return <ProgressSlide data={data} />;
      case SlideType.COMPARISON:
        return <ComparisonSlide data={data} />;
      case SlideType.CONCLUSION:
        return <ConclusionSlide data={data} />;
      case SlideType.FINAL:
        return <FinalSlide data={data} />;
      default:
        return <div>Slide not found</div>;
    }
  };

  return (
    <SlideLayout 
      currentSlide={currentSlideIndex} 
      totalSlides={slides.length}
      onNext={nextSlide}
      onPrev={prevSlide}
      title={slides[currentSlideIndex].title}
      slides={slides}
      onJumpToSlide={jumpToSlide}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlideIndex}
          className="w-full h-full flex items-center justify-center"
        >
          {renderSlideContent(slides[currentSlideIndex])}
        </motion.div>
      </AnimatePresence>
    </SlideLayout>
  );
};

export default App;
