import React, { useState } from 'react';
import { QuizQuestion, Language, Translations } from '../types';

interface QuizComponentProps {
    questions: QuizQuestion[];
    onComplete: (score: number) => void;
    lang: Language;
    t: Translations;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ questions, onComplete, lang, t }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    const handleAnswer = (index: number) => {
        if (showExplanation) return;
        
        setSelectedOption(index);
        setShowExplanation(true);
        
        if (index === questions[currentIndex].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        } else {
            setCompleted(true);
            onComplete(score);
        }
    };

    if (completed) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in glass-panel rounded-2xl max-w-2xl mx-auto border-t border-cyber-primary/50 shadow-[0_0_50px_rgba(14,165,233,0.15)]">
                <div className="text-7xl mb-6 relative">
                    <div className="absolute inset-0 animate-ping opacity-20 text-cyber-primary">🏆</div>
                    🏆
                </div>
                <h2 className="text-4xl font-display font-bold text-white mb-2">{t.completed}</h2>
                <p className="text-cyber-muted mb-8 text-lg">{t.score}: {score} / {questions.length}</p>
                
                <div className="w-full max-w-md bg-cyber-dark rounded-full h-6 mb-10 overflow-hidden border border-cyber-border relative">
                    <div 
                        className="bg-gradient-to-r from-cyber-primary to-cyber-secondary h-full transition-all duration-1000 relative overflow-hidden"
                        style={{ width: `${(score / questions.length) * 100}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-[scanline_2s_linear_infinite] opacity-30"></div>
                    </div>
                </div>

                <button 
                    onClick={() => {
                        setCompleted(false);
                        setCurrentIndex(0);
                        setScore(0);
                        setSelectedOption(null);
                        setShowExplanation(false);
                    }}
                    className="px-8 py-3 bg-cyber-primary hover:bg-cyber-primaryDim text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(14,165,233,0.4)]"
                >
                    {t.retryQuiz}
                </button>
            </div>
        );
    }

    const question = questions[currentIndex];

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="flex justify-between items-center mb-8">
                <span className="px-3 py-1 rounded bg-cyber-primary/10 text-cyber-primary border border-cyber-primary/30 font-mono text-sm">
                    {t.question} {currentIndex + 1} / {questions.length}
                </span>
                <span className="px-3 py-1 rounded bg-cyber-secondary/10 text-cyber-secondary border border-cyber-secondary/30 font-mono text-sm">
                    {t.score}: {score}
                </span>
            </div>

            <div className="glass-panel border-l-4 border-l-cyber-primary rounded-xl p-8 shadow-xl mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyber-primary/20 transition-all duration-700"></div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-8 relative z-10 leading-relaxed">
                    {question.question[lang]}
                </h3>
                
                <div className="space-y-4 relative z-10">
                    {question.options.map((option, idx) => {
                        let btnClass = "w-full text-start p-5 rounded-lg border transition-all duration-300 flex items-center justify-between group relative overflow-hidden ";
                        
                        if (showExplanation) {
                            if (idx === question.correctAnswer) {
                                btnClass += "bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                            } else if (idx === selectedOption) {
                                btnClass += "bg-red-500/10 border-red-500 text-red-400";
                            } else {
                                btnClass += "bg-cyber-dark/50 border-cyber-border text-gray-500 opacity-50";
                            }
                        } else {
                            btnClass += "bg-cyber-card/50 border-cyber-border hover:border-cyber-primary hover:bg-cyber-primary/5 hover:text-white text-gray-300";
                        }

                        return (
                            <button 
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                disabled={showExplanation}
                                className={btnClass}
                            >
                                <span className="font-medium relative z-10">{option[lang]}</span>
                                {showExplanation && idx === question.correctAnswer && (
                                    <span className="material-symbols-outlined relative z-10">check_circle</span>
                                )}
                                {showExplanation && idx === selectedOption && idx !== question.correctAnswer && (
                                    <span className="material-symbols-outlined relative z-10">cancel</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {showExplanation && (
                <div className="glass-panel border-l-4 border-l-blue-500 rounded-xl p-6 mb-8 animate-[float_4s_ease-in-out_infinite]">
                    <h4 className="flex items-center gap-2 text-blue-400 font-bold mb-3">
                        <span className="material-symbols-outlined">info</span>
                        {t.explanation}
                    </h4>
                    <p className="text-blue-100/80 leading-relaxed">{question.explanation[lang]}</p>
                </div>
            )}

            <div className="flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={!showExplanation}
                    className={`px-8 py-3 rounded-lg font-bold flex items-center gap-3 transition-all ${
                        showExplanation 
                            ? 'bg-cyber-primary text-white hover:bg-cyber-primaryDim shadow-[0_0_20px_rgba(14,165,233,0.3)] transform hover:-translate-y-1' 
                            : 'bg-cyber-border text-gray-500 cursor-not-allowed opacity-50'
                    }`}
                >
                    {currentIndex === questions.length - 1 ? t.finishQuiz : t.nextQuestion}
                    <span className="material-symbols-outlined rtl:rotate-180">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};