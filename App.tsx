import React, { useState, useEffect } from 'react';
import { ViewState, Course, Lesson, Language, Translations } from './types';
import { COURSES, DASHBOARD_DOMAINS, FLASHCARDS, QUIZ_DATA, UI_TEXT } from './data';
import { TerminalSimulator } from './components/TerminalSimulator';
import { QuizComponent } from './components/QuizComponent';

// Extracted component to ensure Hooks are not called conditionally inside App
const OnboardingView: React.FC<{ onComplete: () => void; t: Translations }> = ({ onComplete, t }) => {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState(0);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => onComplete(), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30); // 3 seconds total

        return () => clearInterval(timer);
    }, [onComplete]);

    useEffect(() => {
        if (progress > 30) setStage(1);
        if (progress > 60) setStage(2);
        if (progress > 90) setStage(3);
    }, [progress]);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-black font-mono relative overflow-hidden" dir="ltr">
             <div className="absolute inset-0 crt-effect pointer-events-none"></div>
             
             <div className="w-full max-w-md p-8 relative z-10">
                 <div className="flex justify-between items-end mb-2 text-cyber-primary text-xs">
                     <span>{t.initializing}</span>
                     <span>{progress}%</span>
                 </div>
                 
                 {/* Progress Bar */}
                 <div className="h-2 w-full bg-cyber-dark border border-cyber-border rounded-full overflow-hidden mb-8">
                     <div 
                        className="h-full bg-cyber-primary shadow-[0_0_10px_#0da6f2]" 
                        style={{ width: `${progress}%` }}
                     ></div>
                 </div>

                 {/* System Log */}
                 <div className="space-y-2 text-sm">
                     <div className={`flex items-center gap-3 transition-opacity duration-300 ${stage >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                         <span className="text-green-500">[OK]</span> 
                         <span className="text-gray-300">{t.establishingConnection}...</span>
                     </div>
                     <div className={`flex items-center gap-3 transition-opacity duration-300 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                         <span className="text-green-500">[OK]</span> 
                         <span className="text-gray-300">{t.biometricScan}...</span>
                     </div>
                     <div className={`flex items-center gap-3 transition-opacity duration-300 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                         <span className="text-green-500">[OK]</span> 
                         <span className="text-gray-300">{t.systemCheck}...</span>
                     </div>
                     <div className={`flex items-center gap-3 transition-opacity duration-300 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                         <span className="text-cyber-primary font-bold blink">[>>]</span> 
                         <span className="text-white font-bold">{t.accessGranted}</span>
                     </div>
                 </div>

                 <div className="mt-12 flex justify-center">
                     <span className="material-symbols-outlined text-6xl text-cyber-border animate-spin-slow opacity-20">settings</span>
                 </div>
             </div>
        </div>
    );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('WELCOME');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lang, setLang] = useState<Language>('en');

  const t = UI_TEXT[lang];

  // -- Navigation Helpers --
  const navigateToCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('COURSE');
    // Select first lesson by default if none selected
    if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      setSelectedLesson(course.modules[0].lessons[0]);
    }
  };

  // -- Render Functions --

  const renderWelcome = () => (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-cyber-dark" dir={lang === 'he' ? 'rtl' : 'ltr'}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-primary/20 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-secondary/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="relative z-10 text-center p-8 max-w-4xl glass-panel border border-cyber-border/50 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="mb-8 relative inline-block">
                <span className="material-symbols-outlined text-8xl text-cyber-primary animate-float">security</span>
                <div className="absolute inset-0 bg-cyber-primary/20 blur-xl rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]">
                Net<span className="text-cyber-primary">Learn</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-cyber-muted mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                {lang === 'he' ? 'פלטפורמת הדרכת סייבר מתקדמת. אבטח את העתיד.' : 'Advanced Cybersecurity Training Platform. Secure the Future.'}
            </p>

            <button 
                onClick={() => setCurrentView('ONBOARDING')}
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-cyber-primary/10 hover:bg-cyber-primary text-cyber-primary hover:text-white border border-cyber-primary rounded-xl font-bold text-xl transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.2)] hover:shadow-[0_0_40px_rgba(14,165,233,0.6)] overflow-hidden"
            >
                <span className="relative z-10">{t.enterSystem}</span>
                <span className="material-symbols-outlined text-2xl relative z-10 group-hover:translate-x-1 transition-transform rtl:rotate-180">arrow_forward</span>
                <div className="absolute inset-0 bg-cyber-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
            
            <div className="mt-8 flex justify-center gap-4">
                 <button onClick={() => setLang('en')} className={`text-sm font-mono ${lang === 'en' ? 'text-white underline' : 'text-gray-500 hover:text-gray-300'}`}>English</button>
                 <span className="text-gray-600">|</span>
                 <button onClick={() => setLang('he')} className={`text-sm font-mono ${lang === 'he' ? 'text-white underline' : 'text-gray-500 hover:text-gray-300'}`}>עברית</button>
            </div>
        </div>
        
        {/* Footer info */}
        <div className="absolute bottom-6 text-xs text-gray-600 font-mono">
            V.2.4.0-SECURE • ENCRYPTED UPLINK ACTIVE
        </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <h1 className="text-3xl font-bold text-white mb-6">
        {t.welcome}
      </h1>

      {/* Hero Lesson Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl flex flex-col md:flex-row">
          <div className="relative md:w-1/3 aspect-video md:aspect-auto">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800" alt="Server" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer border border-white/20">
                      <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                  </div>
              </div>
          </div>
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400">
                      {t.inProgress}
                  </span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Security Operations</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  3.2 {lang === 'he' ? 'הגדרת כלי SIEM' : 'Configuring SIEM Tools'}
              </h2>
              
              <p className="text-slate-400 mb-6 font-light max-w-2xl">
                   {lang === 'he' 
                    ? 'המשך את הצלילה לעומק בנושא איסוף יומנים וקורלציה. סיימת את החלק על מיקום חיישנים ואתה מוכן לשיטות עבודה מומלצות להגדרה.'
                    : 'Continue your deep dive into log aggregation and correlation. You\'ve completed the section on sensor placement and are ready for configuration best practices.'}
              </p>
              
              <div className="flex items-center gap-4">
                  <div className="flex-1 max-w-md h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-3/4 rounded-full"></div>
                  </div>
                  <span className="text-sm font-bold text-white">75%</span>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors ml-auto flex items-center gap-2">
                      {t.resumeLesson} <span className="material-symbols-outlined text-sm rtl:rotate-180">arrow_forward</span>
                  </button>
              </div>
          </div>
      </div>

      {/* Exam Domains Header */}
      <div className="flex justify-between items-end pt-4">
        <h2 className="text-xl font-bold text-slate-200">
            {t.examDomains}
        </h2>
        <span className="text-sm text-slate-500">{t.overallProgress}: 32%</span>
      </div>

      {/* Domains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DASHBOARD_DOMAINS.map((domain) => {
            const getStatusColor = (color: string) => {
                switch(color) {
                    case 'green': return 'text-green-500 bg-green-500/10 border-green-500/20';
                    case 'blue': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
                    case 'orange': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
                    default: return 'text-slate-500 bg-slate-800 border-slate-700';
                }
            };

            const getProgressColor = (color: string) => {
                 switch(color) {
                    case 'green': return 'bg-green-500';
                    case 'blue': return 'bg-blue-500';
                    case 'orange': return 'bg-orange-500';
                    default: return 'bg-slate-700';
                }
            };
            
            const btnClass = domain.status === 'completed' 
                ? 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                : 'border-slate-700 text-blue-400 hover:text-blue-300 hover:border-blue-500/50';

            return (
                <div key={domain.id} className="relative bg-[#111827] border border-slate-800 rounded-xl p-6 overflow-hidden hover:border-slate-700 transition-all group">
                    {/* Watermark Number */}
                    <div className="absolute top-2 right-4 text-7xl font-bold text-slate-800/30 font-display select-none pointer-events-none group-hover:text-slate-800/50 transition-colors z-0">
                        {domain.number}
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 border ${getStatusColor(domain.color)}`}>
                            <span className="material-symbols-outlined text-2xl">{domain.icon}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-2">{domain.title[lang]}</h3>
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed flex-1">
                            {domain.description[lang]}
                        </p>
                        
                        <div className="mt-auto">
                            <div className="flex justify-between items-center mb-2 text-xs font-medium">
                                <span className={
                                    domain.color === 'green' ? 'text-green-500' : 
                                    domain.color === 'blue' ? 'text-blue-500' :
                                    domain.color === 'orange' ? 'text-orange-500' : 'text-slate-500'
                                }>
                                    {t[domain.status === 'in_progress' ? 'inProgress' : domain.status === 'not_started' ? 'notStarted' : domain.status]}
                                </span>
                                <span className="text-slate-500">{domain.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-6">
                                <div className={`h-full rounded-full ${getProgressColor(domain.color)}`} style={{ width: `${domain.progress}%` }}></div>
                            </div>
                            
                            <button className={`w-full py-2.5 rounded-lg border text-sm font-medium transition-colors ${btnClass}`}>
                                {domain.status === 'completed' ? t.reviewDomain : domain.status === 'not_started' ? t.startDomain : t.continue}
                            </button>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );

  const renderProfile = () => {
    return (
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 py-8 animate-fade-in">
            {/* Custom Styles for Charts */}
            <style>
                {`
                .gauge-circle { transition: stroke-dashoffset 1s ease-out; transform: rotate(-90deg); transform-origin: 50% 50%; }
                .radar-bg { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
                .radar-shape { clip-path: polygon(50% 10%, 90% 30%, 85% 70%, 50% 90%, 20% 65%, 15% 30%); animation: radarPulse 4s infinite alternate; }
                @keyframes radarPulse { 0% { opacity: 0.6; transform: scale(0.98); } 100% { opacity: 0.8; transform: scale(1.02); } }
                `}
            </style>
            
            {/* Profile Header Card */}
            <div className="relative rounded-2xl bg-[#0f172a] border border-slate-800 p-6 mb-8 overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-900/20 to-transparent opacity-60"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-br from-blue-500 to-cyan-400">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#020617] bg-[#020617]">
                                <img alt="User Profile" className="w-full h-full object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -left-2 bg-[#020617] rounded-full p-1.5 border border-slate-800 shadow-lg">
                            <span className="material-symbols-outlined text-yellow-400 text-xl filled">workspace_premium</span>
                        </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-start">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                            <h2 className="text-3xl font-bold text-white">{t.userProfile}</h2>
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wide">{t.proMember}</span>
                        </div>
                        <p className="text-slate-400 mb-6">Cybersecurity Analyst • Level 14 • Joined Jan 2023</p>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">edit</span>
                                {t.editProfile}
                            </button>
                            <button className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-sm font-medium rounded-lg transition-colors border border-blue-500/20 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">share</span>
                                {t.shareProfile}
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end justify-center h-full pt-2 min-w-[200px]">
                        <div className="text-start mb-2 w-full">
                            <span className="text-xs text-slate-500 uppercase tracking-wider block text-start">{t.currentRank}</span>
                            <div className="text-xl font-bold text-cyan-400 text-start">Security Architect II</div>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden self-end border border-slate-800">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[78%]"></div>
                        </div>
                        <span className="text-xs text-slate-500 mt-1 w-full text-start font-mono">7,850 / 10,000 XP</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Stats */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Exam Readiness */}
                    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-500">speed</span>
                            {t.examReadiness}
                        </h3>
                        <div className="relative w-56 h-56 mx-auto mb-4">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle className="text-slate-800" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="8"></circle>
                                <circle className="text-blue-500 gauge-circle" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeDasharray="264" strokeDashoffset="74" strokeLinecap="round" strokeWidth="8"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-white font-mono">72%</span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">{t.ready}</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-slate-400 mb-6 px-4">You are on the right track to passing the Security+ exam.</p>
                            <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                                <div>
                                    <div className="text-2xl font-bold text-white">42</div>
                                    <div className="text-xs text-slate-500 uppercase">{t.completedModules}</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">85h</div>
                                    <div className="text-xs text-slate-500 uppercase">{t.studyTime}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skills Radar */}
                    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-cyan-400">radar</span>
                            {t.skillsRadar}
                        </h3>
                        <div className="relative w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center my-4">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-full border border-slate-700 radar-bg bg-[#020617]"></div>
                                <div className="absolute w-[70%] h-[70%] border border-slate-800 radar-bg"></div>
                                <div className="absolute w-[40%] h-[40%] border border-slate-800 radar-bg"></div>
                                {/* Radar lines */}
                                <div className="absolute w-full h-[1px] bg-slate-800"></div>
                                <div className="absolute h-full w-[1px] bg-slate-800"></div>
                                <div className="absolute w-full h-[1px] bg-slate-800 rotate-60"></div>
                                <div className="absolute w-full h-[1px] bg-slate-800 -rotate-60"></div>
                            </div>
                            <div className="absolute w-full h-full bg-blue-500/20 border-2 border-blue-500 radar-shape z-10 shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
                            
                            {/* Labels */}
                            <span className="absolute top-0 text-[10px] text-slate-400 bg-[#0f172a] px-1">Network Sec</span>
                            <span className="absolute bottom-0 text-[10px] text-slate-400 bg-[#0f172a] px-1">Compliance</span>
                            <span className="absolute right-0 text-[10px] text-slate-400 bg-[#0f172a] px-1">Threats</span>
                            <span className="absolute left-0 text-[10px] text-slate-400 bg-[#0f172a] px-1">Architecture</span>
                        </div>
                        <div className="mt-8 space-y-3">
                            <div className="flex justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                                <span>{t.strongArea}</span>
                                <span className="text-blue-400 font-medium">Threat Hunting</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>{t.areaToImprove}</span>
                                <span className="text-orange-400 font-medium">Compliance</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Achievements & Activity */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Achievements */}
                    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-yellow-500">military_tech</span>
                                {t.achievements}
                            </h3>
                            <button className="text-sm text-blue-400 hover:text-cyan-400 transition-colors">{t.viewAll}</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Achievement 1 */}
                            <div className="group relative bg-[#020617] border border-slate-800 rounded-lg p-4 flex flex-col items-center hover:border-blue-500/50 transition-all hover:-translate-y-1">
                                <div className="w-16 h-16 mb-3 rounded-full bg-slate-800 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-shadow">
                                    <span className="material-symbols-outlined text-4xl text-cyan-400">policy</span>
                                </div>
                                <h4 className="text-white font-semibold text-center z-10">Protocol Pro</h4>
                                <p className="text-xs text-slate-500 text-center mt-1 z-10">Mastered TCP/IP analysis</p>
                                <span className="mt-3 px-2 py-1 text-[10px] font-bold bg-cyan-950/30 text-cyan-400 border border-cyan-900 rounded z-10 uppercase">{t.achieved}</span>
                            </div>
                             {/* Achievement 2 */}
                             <div className="group relative bg-[#020617] border border-slate-800 rounded-lg p-4 flex flex-col items-center hover:border-red-500/50 transition-all hover:-translate-y-1">
                                <div className="w-16 h-16 mb-3 rounded-full bg-slate-800 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(239,68,68,0.2)] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-shadow">
                                    <span className="material-symbols-outlined text-4xl text-red-500">bug_report</span>
                                </div>
                                <h4 className="text-white font-semibold text-center z-10">Threat Hunter I</h4>
                                <p className="text-xs text-slate-500 text-center mt-1 z-10">Identified 50 vulnerabilities</p>
                                <span className="mt-3 px-2 py-1 text-[10px] font-bold bg-red-950/30 text-red-400 border border-red-900 rounded z-10 uppercase">{t.achieved}</span>
                            </div>
                             {/* Achievement 3 */}
                             <div className="group relative bg-[#020617] border border-slate-800 rounded-lg p-4 flex flex-col items-center hover:border-green-500/50 transition-all hover:-translate-y-1">
                                <div className="w-16 h-16 mb-3 rounded-full bg-slate-800 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(34,197,94,0.2)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-shadow">
                                    <span className="material-symbols-outlined text-4xl text-green-500">medical_services</span>
                                </div>
                                <h4 className="text-white font-semibold text-center z-10">First Responder</h4>
                                <p className="text-xs text-slate-500 text-center mt-1 z-10">Completed incident response</p>
                                <span className="mt-3 px-2 py-1 text-[10px] font-bold bg-green-950/30 text-green-400 border border-green-900 rounded z-10 uppercase">{t.achieved}</span>
                            </div>
                            {/* Locked 1 */}
                            <div className="group relative bg-[#020617] border border-slate-800 rounded-lg p-4 flex flex-col items-center opacity-60">
                                <div className="w-16 h-16 mb-3 rounded-full bg-slate-800 flex items-center justify-center relative z-10 grayscale">
                                    <span className="material-symbols-outlined text-4xl text-purple-500">encrypted</span>
                                </div>
                                <h4 className="text-slate-400 font-semibold text-center z-10">Crypto Master</h4>
                                <p className="text-xs text-slate-600 text-center mt-1 z-10">Complete Cryptography module</p>
                                <span className="mt-3 px-2 py-1 text-[10px] font-bold bg-slate-800 text-slate-500 border border-slate-700 rounded z-10 uppercase">{t.locked}</span>
                            </div>
                             {/* Locked 2 */}
                             <div className="group relative bg-[#020617] border border-slate-800 rounded-lg p-4 flex flex-col items-center opacity-60">
                                <div className="w-16 h-16 mb-3 rounded-full bg-slate-800 flex items-center justify-center relative z-10 grayscale">
                                    <span className="material-symbols-outlined text-4xl text-orange-500">cloud_circle</span>
                                </div>
                                <h4 className="text-slate-400 font-semibold text-center z-10">Cloud Guardian</h4>
                                <p className="text-xs text-slate-600 text-center mt-1 z-10">Secure 3 cloud environments</p>
                                <span className="mt-3 px-2 py-1 text-[10px] font-bold bg-slate-800 text-slate-500 border border-slate-700 rounded z-10 uppercase">{t.locked}</span>
                            </div>
                             {/* Locked 3 */}
                             <div className="group relative bg-[#020617] border border-slate-800 rounded-lg p-4 flex flex-col items-center opacity-60">
                                <div className="w-16 h-16 mb-3 rounded-full bg-slate-800 flex items-center justify-center relative z-10 grayscale">
                                    <span className="material-symbols-outlined text-4xl text-pink-500">psychology</span>
                                </div>
                                <h4 className="text-slate-400 font-semibold text-center z-10">Social Engineer</h4>
                                <p className="text-xs text-slate-600 text-center mt-1 z-10">Pass Phishing simulation</p>
                                <span className="mt-3 px-2 py-1 text-[10px] font-bold bg-slate-800 text-slate-500 border border-slate-700 rounded z-10 uppercase">{t.locked}</span>
                            </div>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-white">workspace_premium</span>
                            {t.certifications}
                        </h3>
                        <div className="flex flex-col gap-4">
                            {/* Active Cert Target */}
                            <div className="p-4 rounded-lg bg-gradient-to-l from-blue-900/20 to-[#020617] border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded bg-white flex items-center justify-center shrink-0">
                                        <span className="font-bold text-slate-900 text-xs text-center leading-tight">Sec<br/>+</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">CompTIA Security+ (SY0-701)</h4>
                                        <p className="text-sm text-slate-400">Target Date: Oct 15, 2024</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                    <div className="text-start">
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{t.countdown}</p>
                                        <p className="text-xl font-bold text-white font-mono">14d 08h</p>
                                    </div>
                                    <div className="h-8 w-[1px] bg-slate-700 mx-2"></div>
                                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded transition-colors shadow-lg shadow-blue-500/20">
                                        {t.scheduleExam}
                                    </button>
                                </div>
                            </div>
                             {/* Past Cert */}
                             <div className="p-4 rounded-lg bg-[#020617] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 opacity-70 hover:opacity-100 transition-opacity">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-400">
                                        <span className="material-symbols-outlined">verified</span>
                                    </div>
                                    <div>
                                        <h4 className="text-slate-300 font-bold">CyberGuard Basics</h4>
                                        <p className="text-sm text-slate-500">{t.issued}: Jan 12, 2024 • ID: CG-8922</p>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    {t.downloadPdf}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-4">{t.recentActivity}</h3>
                        <div className="space-y-4">
                             <div className="flex gap-4 items-start border-l-2 border-slate-800 pl-4 relative">
                                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                                <div>
                                    <p className="text-sm text-white">Completed module <span className="text-blue-400">"Social Engineering Tactics"</span></p>
                                    <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start border-l-2 border-slate-800 pl-4 relative">
                                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                                <div>
                                    <p className="text-sm text-white">Earned badge <span className="text-green-400">"First Responder"</span></p>
                                    <p className="text-xs text-slate-500 mt-1">Yesterday</p>
                                </div>
                            </div>
                             <div className="flex gap-4 items-start border-l-2 border-slate-800 pl-4 relative">
                                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-slate-600"></div>
                                <div>
                                    <p className="text-sm text-white">Scored 85% in <span className="text-slate-300">"Network Security Practice Quiz"</span></p>
                                    <p className="text-xs text-slate-500 mt-1">3 days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const renderCourseView = () => {
    if (!selectedCourse) return null;

    return (
      <div className="flex h-full overflow-hidden">
        {/* Module Sidebar */}
        <div className="w-80 border-e border-cyber-border bg-cyber-card/50 backdrop-blur hidden lg:flex flex-col flex-shrink-0">
            <div className="p-6 border-b border-cyber-border">
                <button onClick={() => setCurrentView('DASHBOARD')} className="text-xs text-cyber-muted hover:text-white flex items-center gap-2 mb-4 transition-colors font-medium">
                    <span className="material-symbols-outlined text-sm rtl:rotate-180">arrow_back</span> {t.backToDashboard}
                </button>
                <h2 className="font-bold text-white leading-tight">{selectedCourse.title[lang]}</h2>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {selectedCourse.modules.map(module => (
                    <div key={module.id} className="border-b border-cyber-border/50">
                        <div className="px-6 py-4 bg-black/20 text-xs font-mono text-cyber-primary font-bold uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary"></span>
                            {module.title[lang]}
                        </div>
                        <div>
                            {module.lessons.map(lesson => (
                                <button
                                    key={lesson.id}
                                    onClick={() => setSelectedLesson(lesson)}
                                    className={`w-full text-start px-6 py-4 text-sm border-s-2 transition-all flex items-center gap-3 ${
                                        selectedLesson?.id === lesson.id 
                                        ? 'border-cyber-primary bg-cyber-primary/10 text-white' 
                                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <span className={`material-symbols-outlined text-lg ${lesson.completed ? 'text-cyber-accent' : 'text-gray-600'}`}>
                                        {lesson.completed ? 'check_circle' : 'radio_button_unchecked'}
                                    </span>
                                    <span className="flex-1 truncate font-medium">{lesson.title[lang]}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono border ${
                                        lesson.type === 'video' ? 'border-purple-500/30 text-purple-400' :
                                        lesson.type === 'lab' ? 'border-green-500/30 text-green-400' :
                                        'border-blue-500/30 text-blue-400'
                                    }`}>
                                        {lesson.type === 'video' ? 'VID' : lesson.type === 'lab' ? 'LAB' : 'TXT'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-cyber-dark p-6 lg:p-10 relative">
            {selectedLesson ? (
                <div className="max-w-5xl mx-auto pb-20">
                    <div className="flex items-center gap-3 text-sm text-cyber-muted mb-6 font-mono bg-black/20 inline-flex px-4 py-2 rounded-full border border-cyber-border">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${
                             selectedLesson.type === 'video' ? 'bg-purple-500' :
                             selectedLesson.type === 'lab' ? 'bg-green-500' :
                             'bg-blue-500'
                        }`}></span>
                        <span className="uppercase tracking-wider font-bold">
                            {selectedLesson.type}
                        </span>
                        <span className="text-gray-600">|</span>
                        <span>{selectedLesson.duration}</span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-10 leading-tight">
                        {selectedLesson.title[lang]}
                    </h1>

                    {selectedLesson.type === 'video' && (
                        <div className="aspect-video bg-black rounded-2xl border border-cyber-border flex items-center justify-center mb-10 relative group cursor-pointer overflow-hidden shadow-2xl">
                            <img 
                                src={`https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000`} 
                                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
                                alt="Video Thumbnail"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent"></div>
                            <div className="w-20 h-20 rounded-full bg-cyber-primary/90 flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(13,166,242,0.6)] backdrop-blur-sm border border-white/20">
                                <span className="material-symbols-outlined text-white text-4xl ml-1">play_arrow</span>
                            </div>
                        </div>
                    )}

                    {selectedLesson.type === 'text' && (
                        <div className="glass-panel border border-cyber-border p-8 md:p-12 rounded-2xl mb-10 shadow-xl">
                            <div className="prose prose-invert prose-lg max-w-none">
                                {selectedLesson.content ? (
                                    selectedLesson.content[lang].split('\n').map((line, i) => {
                                        if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-white mb-6 mt-8 pb-4 border-b border-cyber-border/50">{line.replace('# ', '')}</h1>
                                        if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-cyber-primary mb-4 mt-8 flex items-center gap-2"><span className="text-cyber-primary/50">#</span> {line.replace('## ', '')}</h2>
                                        if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-white mb-3 mt-6">{line.replace('### ', '')}</h3>
                                        if (line.startsWith('* ')) return <li key={i} className="text-gray-300 ms-4 mb-2 list-disc marker:text-cyber-primary">{line.replace('* ', '')}</li>
                                        if (line.trim() === '') return <br key={i} />
                                        return <p key={i} className="text-gray-300 mb-4 leading-relaxed font-light">{line}</p>
                                    })
                                ) : (
                                    <p className="text-gray-400 italic">Content loading...</p>
                                )}
                            </div>
                        </div>
                    )}

                    {selectedLesson.type === 'lab' && (
                         <div className="h-[600px] mb-10 flex flex-col">
                             <div className="bg-cyber-card border border-cyber-border p-4 rounded-t-xl flex justify-between items-center border-b-0">
                                 <h3 className="font-bold text-white flex items-center gap-2">
                                     <span className="material-symbols-outlined text-green-500">terminal</span>
                                     {t.labEnvironment}
                                 </h3>
                                 <div className="flex items-center gap-2 text-xs font-mono text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                     {t.labStatus}
                                 </div>
                             </div>
                             <div className="flex-1">
                                 <TerminalSimulator lang={lang} />
                             </div>
                         </div>
                    )}

                    <div className="flex justify-between items-center pt-8 border-t border-cyber-border/50">
                        <button className="text-cyber-muted hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined rtl:rotate-180">arrow_back</span> {t.prevLesson}
                        </button>
                        <button className="bg-gradient-to-r from-cyber-primary to-cyber-primaryDim text-white px-8 py-3 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all flex items-center gap-2">
                            {t.markComplete} <span className="material-symbols-outlined">check_circle</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-cyber-muted opacity-50">
                    <div className="w-24 h-24 rounded-full bg-cyber-border/50 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-5xl">school</span>
                    </div>
                    <p className="text-lg">Select a module to begin secure training protocol.</p>
                </div>
            )}
        </div>
      </div>
    );
  };

  const renderFlashcards = () => (
      <div className="flex flex-col items-center justify-center h-full p-6 overflow-y-auto">
          <div className="text-center mb-12">
             <h2 className="text-4xl font-display font-bold text-white mb-3 text-shadow-glow">Security+ Database</h2>
             <p className="text-cyber-muted">Accessing classified definitions...</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4 pb-20">
              {FLASHCARDS.map(card => (
                  <div key={card.id} className="group h-72 perspective-1000">
                      <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180 cursor-pointer">
                          {/* Front */}
                          <div className="absolute inset-0 bg-cyber-card border border-cyber-border p-8 rounded-2xl backface-hidden flex flex-col items-center justify-center text-center shadow-lg group-hover:border-cyber-primary/50 transition-colors">
                              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50"></div>
                              <span className="px-3 py-1 bg-cyber-primary/10 rounded-full text-xs font-mono text-cyber-primary mb-6 uppercase tracking-widest border border-cyber-primary/20">
                                  {card.category[lang]}
                              </span>
                              <h3 className="text-2xl font-bold text-white mb-2">{card.term}</h3>
                              <div className="mt-auto flex items-center gap-2 text-xs text-cyber-muted/70">
                                  <span className="material-symbols-outlined text-sm">rotate_right</span>
                                  Hover to decrypt
                              </div>
                          </div>
                          {/* Back */}
                          <div className="absolute inset-0 bg-[#0b1219] border border-cyber-primary/40 p-8 rounded-2xl backface-hidden rotate-y-180 flex items-center justify-center text-center shadow-[0_0_30px_rgba(13,166,242,0.15)]">
                              <p className="text-gray-200 leading-relaxed text-lg font-light">{card.definition[lang]}</p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  // Main Render Logic
  if (currentView === 'WELCOME') {
      return renderWelcome();
  }

  if (currentView === 'ONBOARDING') {
      return <OnboardingView onComplete={() => setCurrentView('DASHBOARD')} t={t} />;
  }

  return (
    <div 
        className="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden" 
        dir={lang === 'he' ? 'rtl' : 'ltr'}
    >
        {/* Main Sidebar */}
        <aside 
            className={`${isSidebarOpen ? 'w-72' : 'w-20'} flex-shrink-0 border-e border-slate-800 bg-[#0f172a] hidden md:flex flex-col transition-all duration-300 z-30 relative`}
        >
            <div className="h-20 flex items-center justify-center border-b border-slate-800 relative">
                {isSidebarOpen ? (
                    <div className="flex items-center gap-2 font-bold text-xl text-white cursor-pointer" onClick={() => setCurrentView('DASHBOARD')}>
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <span className="material-symbols-outlined text-white text-lg">security</span>
                        </div>
                        <span>Security+ <span className="text-blue-500">Prep</span></span>
                    </div>
                ) : (
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 cursor-pointer" onClick={() => setCurrentView('DASHBOARD')}>
                         <span className="material-symbols-outlined text-white text-xl">security</span>
                    </div>
                )}
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1">
                {[
                    { id: 'DASHBOARD', icon: 'dashboard', label: t.dashboard },
                    { id: 'COURSE', icon: 'school', label: t.courses },
                    { id: 'QUIZ', icon: 'psychology', label: t.quizzes },
                    { id: 'FLASHCARDS', icon: 'style', label: t.flashcards },
                    { id: 'TERMINAL', icon: 'terminal', label: t.terminal }
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id as ViewState)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                            currentView === item.id 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        <span className={`material-symbols-outlined ${currentView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                            {item.icon}
                        </span>
                        {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
                    </button>
                ))}
            </nav>
            
            <div className="p-3 border-t border-slate-800">
                <button 
                    onClick={() => setCurrentView('PROFILE')}
                    className={`flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800 transition-colors group ${currentView === 'PROFILE' ? 'bg-slate-800' : ''}`}
                >
                    <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 overflow-hidden shrink-0">
                         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full" />
                    </div>
                    {isSidebarOpen && (
                        <div className="text-start overflow-hidden">
                            <div className="text-sm font-bold text-white truncate">{t.userProfile}</div>
                            <div className="text-[10px] text-blue-400 font-medium uppercase tracking-wide truncate">{t.proMember}</div>
                        </div>
                    )}
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 relative z-20 bg-[#020617]">
            {/* Top Bar */}
            <header className="h-20 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
                <div className="flex items-center gap-4 flex-1">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white md:hidden">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center relative w-full max-w-xl">
                        <span className="material-symbols-outlined absolute left-3 rtl:right-3 rtl:left-auto text-slate-500 text-xl pointer-events-none">search</span>
                        <input 
                            type="text" 
                            placeholder={t.search}
                            className="bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full text-slate-200 placeholder-slate-500"
                        />
                    </div>
                </div>
                
                <div className="flex items-center gap-5">
                    {/* Language Toggle */}
                    <button 
                        onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
                        className="text-xs font-bold px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:text-white uppercase"
                    >
                        {lang === 'en' ? 'HE' : 'EN'}
                    </button>
                    
                    <button className="text-slate-400 hover:text-white relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0f172a]"></span>
                    </button>
                    
                    <div className="h-8 w-[1px] bg-slate-700 mx-1"></div>

                    <button onClick={() => setCurrentView('PROFILE')} className="flex items-center gap-3 pl-2 rtl:pr-2 rtl:pl-0 group">
                        <div className="text-right rtl:text-left hidden md:block">
                            <div className="text-sm font-bold text-white leading-none mb-1 group-hover:text-blue-400 transition-colors">{t.userProfile}</div>
                            <div className="text-[10px] text-blue-400 font-medium uppercase tracking-wide">{t.proMember}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 group-hover:border-blue-500 transition-colors overflow-hidden">
                             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full" />
                        </div>
                    </button>
                </div>
            </header>

            {/* View Container */}
            <main className="flex-1 overflow-y-auto scroll-smooth">
                {currentView === 'DASHBOARD' && renderDashboard()}
                {currentView === 'COURSE' && renderCourseView()}
                {currentView === 'PROFILE' && renderProfile()}
                {currentView === 'TERMINAL' && (
                    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-500 text-3xl">terminal</span>
                            {t.labEnvironment}
                        </h2>
                        <div className="flex-1 shadow-2xl rounded-xl overflow-hidden border border-cyber-border/50">
                            <TerminalSimulator lang={lang} />
                        </div>
                    </div>
                )}
                {currentView === 'QUIZ' && (
                    <div className="h-full overflow-y-auto">
                        <div className="p-6 md:p-10 text-center">
                             <h2 className="text-3xl font-display font-bold text-white mb-2">{t.quizzes}</h2>
                             <p className="text-cyber-muted mb-8">Test your knowledge with these CompTIA Security+ questions.</p>
                             <QuizComponent questions={QUIZ_DATA} onComplete={(score) => console.log(score)} lang={lang} t={t} />
                        </div>
                    </div>
                )}
                {currentView === 'FLASHCARDS' && renderFlashcards()}
            </main>
        </div>
    </div>
  );
};

export default App;