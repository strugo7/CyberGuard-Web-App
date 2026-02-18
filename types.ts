export type ViewState = 'WELCOME' | 'ONBOARDING' | 'DASHBOARD' | 'COURSE' | 'QUIZ' | 'FLASHCARDS' | 'TERMINAL' | 'SETTINGS' | 'PROFILE';
export type Language = 'en' | 'he';

export interface LocalizedString {
    en: string;
    he: string;
}

export interface Domain {
    id: string;
    number: string;
    title: LocalizedString;
    description: LocalizedString;
    status: 'completed' | 'in_progress' | 'started' | 'not_started';
    progress: number;
    icon: string;
    color: 'green' | 'blue' | 'orange' | 'gray';
}

export interface Course {
    id: string;
    title: LocalizedString;
    description: LocalizedString;
    icon: string;
    progress: number;
    color: string;
    totalModules: number;
    modules: Module[];
}

export interface Module {
    id: string;
    title: LocalizedString;
    lessons: Lesson[];
}

export interface Lesson {
    id: string;
    title: LocalizedString;
    type: 'video' | 'text' | 'lab';
    duration: string;
    completed: boolean;
    content?: LocalizedString; // Markdown content
}

export interface QuizQuestion {
    id: number;
    question: LocalizedString;
    options: LocalizedString[];
    correctAnswer: number;
    explanation: LocalizedString;
}

export interface Flashcard {
    id: number;
    term: string;
    definition: LocalizedString;
    category: LocalizedString;
}

export interface UserStats {
    streak: number;
    xp: number;
    completedLessons: number;
    quizAverage: number;
    rank: string;
}

export interface Translations {
    dashboard: string;
    courses: string;
    quizzes: string;
    flashcards: string;
    terminal: string;
    settings: string;
    welcome: string;
    welcomeSub: string;
    activeCertifications: string;
    progress: string;
    modules: string;
    startCourse: string;
    continue: string;
    completed: string;
    backToDashboard: string;
    nextLesson: string;
    prevLesson: string;
    markComplete: string;
    explanation: string;
    finishQuiz: string;
    nextQuestion: string;
    score: string;
    question: string;
    retryQuiz: string;
    labEnvironment: string;
    labStatus: string;
    search: string;
    userProfile: string;
    logout: string;
    enterSystem: string;
    initializing: string;
    systemCheck: string;
    accessGranted: string;
    establishingConnection: string;
    biometricScan: string;
    // Dashboard Specific
    resumeLesson: string;
    examDomains: string;
    overallProgress: string;
    reviewDomain: string;
    startDomain: string;
    inProgress: string;
    started: string;
    notStarted: string;
    proMember: string;
    // Profile Specific
    editProfile: string;
    shareProfile: string;
    currentRank: string;
    examReadiness: string;
    skillsRadar: string;
    achievements: string;
    certifications: string;
    recentActivity: string;
    viewAll: string;
    ready: string;
    completedModules: string;
    studyTime: string;
    strongArea: string;
    areaToImprove: string;
    achieved: string;
    locked: string;
    issued: string;
    downloadPdf: string;
    scheduleExam: string;
    countdown: string;
}