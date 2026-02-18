import { Course, Flashcard, QuizQuestion, UserStats, Translations, Domain } from './types';

export const USER_STATS: UserStats = {
    streak: 14,
    xp: 12500,
    completedLessons: 42,
    quizAverage: 88,
    rank: 'Cyber Guardian'
};

export const UI_TEXT: Record<'en' | 'he', Translations> = {
    en: {
        dashboard: 'Dashboard',
        courses: 'Courses',
        quizzes: 'Practice',
        flashcards: 'Flashcards',
        terminal: 'Cyber Lab',
        settings: 'Settings',
        welcome: 'Welcome back, Alex',
        welcomeSub: 'Your training is essential. The digital frontier awaits your protection.',
        activeCertifications: 'Active Certifications',
        progress: 'Progress',
        modules: 'MODULES',
        startCourse: 'Start Course',
        continue: 'Continue',
        completed: 'Completed',
        backToDashboard: 'Back to Dashboard',
        nextLesson: 'Next Lesson',
        prevLesson: 'Previous',
        markComplete: 'Mark Complete',
        explanation: 'Explanation',
        finishQuiz: 'Finish Quiz',
        nextQuestion: 'Next Question',
        score: 'SCORE',
        question: 'QUESTION',
        retryQuiz: 'Retry Assessment',
        labEnvironment: 'Secure Terminal Environment',
        labStatus: 'ENCRYPTED CONNECTION ESTABLISHED',
        search: 'Search concepts, domains, or lessons...',
        userProfile: 'Alex M.',
        logout: 'Disconnect',
        enterSystem: 'INITIALIZE SYSTEM',
        initializing: 'INITIALIZING...',
        systemCheck: 'SYSTEM INTEGRITY CHECK',
        accessGranted: 'ACCESS GRANTED',
        establishingConnection: 'ESTABLISHING SECURE UPLINK',
        biometricScan: 'BIOMETRIC VERIFICATION',
        resumeLesson: 'Resume Lesson',
        examDomains: 'Exam Domains',
        overallProgress: 'Overall Progress',
        reviewDomain: 'Review Domain',
        startDomain: 'Start Domain',
        inProgress: 'In Progress',
        started: 'Started',
        notStarted: 'Not Started',
        proMember: 'Pro Member',
        editProfile: 'Edit Profile',
        shareProfile: 'Share Profile',
        currentRank: 'Current Rank',
        examReadiness: 'Exam Readiness',
        skillsRadar: 'Skills Radar',
        achievements: 'Achievements & Badges',
        certifications: 'Certifications',
        recentActivity: 'Recent Activity',
        viewAll: 'View All',
        ready: 'READY',
        completedModules: 'Modules Completed',
        studyTime: 'Study Time',
        strongArea: 'Strong Area',
        areaToImprove: 'Area to Improve',
        achieved: 'Achieved',
        locked: 'Locked',
        issued: 'Issued',
        downloadPdf: 'PDF',
        scheduleExam: 'Schedule',
        countdown: 'Countdown'
    },
    he: {
        dashboard: 'לוח בקרה',
        courses: 'קורסים',
        quizzes: 'תרגול ומבחנים',
        flashcards: 'כרטיסיות',
        terminal: 'מעבדת סייבר',
        settings: 'הגדרות',
        welcome: 'ברוך שובך, אלכס',
        welcomeSub: 'האימון שלך חיוני. החזית הדיגיטלית ממתינה להגנה שלך.',
        activeCertifications: 'הסמכות פעילות',
        progress: 'התקדמות',
        modules: 'מודולים',
        startCourse: 'התחל קורס',
        continue: 'המשך',
        completed: 'הושלם',
        backToDashboard: 'חזרה ללוח הבקרה',
        nextLesson: 'שיעור הבא',
        prevLesson: 'הקודם',
        markComplete: 'סמן כהושלם',
        explanation: 'הסבר',
        finishQuiz: 'סיים מבחן',
        nextQuestion: 'שאלה הבאה',
        score: 'ניקוד',
        question: 'שאלה',
        retryQuiz: 'נסה שוב',
        labEnvironment: 'סביבת טרמינל מאובטחת',
        labStatus: 'חיבור מוצפן נוצר בהצלחה',
        search: 'חיפוש מושגים, תחומים או שיעורים...',
        userProfile: 'אלכס מ.',
        logout: 'התנתק',
        enterSystem: 'אתחול מערכת',
        initializing: 'מאתחל...',
        systemCheck: 'בדיקת תקינות מערכת',
        accessGranted: 'גישה אושרה',
        establishingConnection: 'יוצר חיבור מאובטח',
        biometricScan: 'אימות ביומטרי',
        resumeLesson: 'המשך שיעור',
        examDomains: 'תחומי הבחינה',
        overallProgress: 'התקדמות כללית',
        reviewDomain: 'חזור על התחום',
        startDomain: 'התחל תחום',
        inProgress: 'בתהליך',
        started: 'התחיל',
        notStarted: 'לא התחיל',
        proMember: 'חבר Pro',
        editProfile: 'ערוך פרופיל',
        shareProfile: 'שתף פרופיל',
        currentRank: 'דירוג נוכחי',
        examReadiness: 'מוכנות לבחינה',
        skillsRadar: 'רדאר מיומנויות',
        achievements: 'הישגים ותגים',
        certifications: 'הסמכות',
        recentActivity: 'פעילות אחרונה',
        viewAll: 'הצג הכל',
        ready: 'מוכן',
        completedModules: 'מודולים שהושלמו',
        studyTime: 'זמן לימוד',
        strongArea: 'תחום חזק',
        areaToImprove: 'תחום לשיפור',
        achieved: 'הושג',
        locked: 'נעול',
        issued: 'הונפק',
        downloadPdf: 'PDF',
        scheduleExam: 'קבע מועד',
        countdown: 'ספירה לאחור'
    }
};

export const DASHBOARD_DOMAINS: Domain[] = [
    {
        id: 'd1',
        number: '01',
        title: { en: 'General Security Concepts', he: 'מושגי אבטחה כלליים' },
        description: { 
            en: 'Compare and contrast various types of security controls, fundamental security principles, and change management.',
            he: 'השוואה והגדרה בין סוגים שונים של בקרות אבטחה, עקרונות אבטחה בסיסיים וניהול שינויים.'
        },
        status: 'completed',
        progress: 100,
        icon: 'check_circle',
        color: 'green'
    },
    {
        id: 'd2',
        number: '02',
        title: { en: 'Threats, Vulns & Mitigations', he: 'איומים, פגיעויות וצמצום סיכונים' },
        description: { 
            en: 'Analyze potential indicators to determine the type of attack. Understand actors, vectors, and intelligence sources.',
            he: 'ניתוח אינדיקטורים פוטנציאליים כדי לקבוע את סוג ההתקפה. הבנת גורמים, וקטורים ומקורות מודיעין.'
        },
        status: 'in_progress',
        progress: 45,
        icon: 'bug_report',
        color: 'blue'
    },
    {
        id: 'd3',
        number: '03',
        title: { en: 'Security Architecture', he: 'ארכיטקטורת אבטחה' },
        description: { 
            en: 'Implement security implications of different architecture models. Secure enterprise infrastructure and data.',
            he: 'יישום השלכות האבטחה של מודלים ארכיטקטוניים שונים. אבטחת תשתיות ארגוניות ונתונים.'
        },
        status: 'started',
        progress: 12,
        icon: 'architecture',
        color: 'orange'
    },
    {
        id: 'd4',
        number: '04',
        title: { en: 'Security Operations', he: 'אופרציות אבטחה' },
        description: { 
            en: 'Apply appropriate incident response procedures. Use data sources to support an investigation.',
            he: 'יישום נהלי תגובה לאירועים מתאימים. שימוש במקורות מידע לתמיכה בחקירה.'
        },
        status: 'not_started',
        progress: 0,
        icon: 'terminal',
        color: 'gray'
    },
    {
        id: 'd5',
        number: '05',
        title: { en: 'Program Mgmt & Oversight', he: 'ניהול תוכנית ופיקוח' },
        description: { 
            en: 'Summarize elements of effective security governance. Explain risk management processes and compliance.',
            he: 'סיכום אלמנטים של ממשל אבטחה יעיל. הסבר על תהליכי ניהול סיכונים ותאימות.'
        },
        status: 'not_started',
        progress: 0,
        icon: 'gavel',
        color: 'gray'
    }
];

export const COURSES: Course[] = [
    {
        id: 'sec-plus',
        title: { en: 'CompTIA Security+ (SY0-701)', he: 'CompTIA Security+ (SY0-701)' },
        description: { 
            en: 'Master the core knowledge required for any cybersecurity role. Covers threats, attacks, vulnerabilities, and architecture.',
            he: 'שלטו בידע הליבה הנדרש לכל תפקיד בסייבר. מכסה איומים, התקפות, חולשות וארכיטקטורה.'
        },
        icon: 'security',
        progress: 34,
        color: 'text-cyber-primary',
        totalModules: 5,
        modules: [
            {
                id: 'm1',
                title: { en: '1.0 General Security Concepts', he: '1.0 מושגי אבטחה כלליים' },
                lessons: [
                    { 
                        id: 'l1-1', 
                        title: { en: 'CIA Triad & Authentication', he: 'השילוש הקדוש (CIA) ואימות' }, 
                        type: 'text', 
                        duration: '15 min', 
                        completed: true, 
                        content: {
                            en: "# The CIA Triad\n\nThe **CIA Triad** is the foundational model for information security.\n\n* **Confidentiality:** Preventing unauthorized disclosure of information.\n* **Integrity:** Assuring that data has not been modified or tampered with.\n* **Availability:** Ensuring systems and data are accessible when needed.",
                            he: "# מודל ה-CIA\n\nמודל ה-**CIA** הוא המודל היסודי לאבטחת מידע.\n\n* **Confidentiality (סודיות):** מניעת חשיפה לא מורשית של מידע.\n* **Integrity (שלמות):** הבטחה שהנתונים לא שונו או טופלו בזדון.\n* **Availability (זמינות):** הבטחת גישה למערכות ולנתונים בעת הצורך."
                        }
                    },
                    { 
                        id: 'l1-2', 
                        title: { en: 'Change Management Processes', he: 'תהליכי ניהול שינויים' }, 
                        type: 'video', 
                        duration: '10 min', 
                        completed: true 
                    },
                    { 
                        id: 'l1-3', 
                        title: { en: 'Cryptographic Basics', he: 'יסודות הקריפטוגרפיה' }, 
                        type: 'text', 
                        duration: '25 min', 
                        completed: false, 
                        content: {
                            en: "# Cryptography Basics\n\nCryptography is the practice of securing communication from adversarial behavior.\n\n### Key Concepts\n* **Symmetric Encryption:** Uses the same key for encryption and decryption (e.g., AES).\n* **Asymmetric Encryption:** Uses a key pair - public and private (e.g., RSA, ECC).",
                            he: "# יסודות הקריפטוגרפיה\n\nקריפטוגרפיה היא הפרקטיקה של אבטחת תקשורת מפני יריבים.\n\n### מושגי מפתח\n* **הצפנה סימטרית:** שימוש באותו מפתח להצפנה ולפענוח (למשל, AES).\n* **הצפנה א-סימטרית:** שימוש בשיג מפתחות - ציבורי ופרטי (למשל, RSA, ECC)."
                        }
                    }
                ]
            },
            {
                id: 'm2',
                title: { en: '2.0 Threats & Vulnerabilities', he: '2.0 איומים וחולשות' },
                lessons: [
                    { id: 'l2-1', title: { en: 'Malware Types', he: 'סוגי נוזקות' }, type: 'text', duration: '20 min', completed: false },
                    { id: 'l2-2', title: { en: 'Social Engineering Vectors', he: 'הנדסה חברתית' }, type: 'lab', duration: '30 min', completed: false }
                ]
            }
        ]
    },
    {
        id: 'linux-plus',
        title: { en: 'Linux+ / Practical Linux', he: 'Linux+ / לינוקס מעשי' },
        description: {
            en: 'Deep dive into the Linux kernel, command line utilities, and system administration for security professionals.',
            he: 'צלילה עמוקה לליבת הלינוקס, כלי שורת הפקודה וניהול מערכות עבור אנשי אבטחה.'
        },
        icon: 'terminal',
        progress: 12,
        color: 'text-cyber-accent',
        totalModules: 4,
        modules: [
            {
                id: 'm1',
                title: { en: '1.0 System Management', he: '1.0 ניהול מערכת' },
                lessons: [
                    { id: 'linux-1', title: { en: 'File System Hierarchy', he: 'היררכיית מערכת הקבצים' }, type: 'text', duration: '15 min', completed: true },
                    { id: 'linux-2', title: { en: 'Basic Commands (ls, cd, pwd)', he: 'פקודות בסיסיות' }, type: 'lab', duration: '20 min', completed: false }
                ]
            }
        ]
    },
    {
        id: 'net-plus',
        title: { en: 'Network+ (N10-008)', he: 'Network+ (N10-008)' },
        description: {
            en: 'Essential networking concepts including ports, protocols, OSI model, and troubleshooting.',
            he: 'מושגי יסוד ברשתות כולל פורטים, פרוטוקולים, מודל ה-OSI ופתרון תקלות.'
        },
        icon: 'hub',
        progress: 0,
        color: 'text-cyber-secondary',
        totalModules: 5,
        modules: []
    }
];

export const FLASHCARDS: Flashcard[] = [
    { 
        id: 1, 
        term: 'Phishing', 
        definition: { en: 'A social engineering attack where an attacker sends fraudulent emails claiming to be from a reputable source.', he: 'מתקפת הנדסה חברתית בה התוקף שולח מיילים מתחזים הטוענים להיות ממקור אמין.' }, 
        category: { en: 'Threats', he: 'איומים' }
    },
    { 
        id: 2, 
        term: 'Ransomware', 
        definition: { en: 'Malware that encrypts the user\'s data and demands payment in exchange for unlocking it.', he: 'נוזקה שמצפינה את נתוני המשתמש ודורשת תשלום כופר תמורת שחרורם.' }, 
        category: { en: 'Malware', he: 'נוזקות' } 
    },
    { 
        id: 3, 
        term: 'DDoS', 
        definition: { en: 'Distributed Denial of Service. An attack where multiple compromised systems are used to target a single system.', he: 'מניעת שירות מבוזרת. התקפה בה מערכות רבות משמשות להפלת מערכת יעד אחת.' }, 
        category: { en: 'Attacks', he: 'התקפות' }
    }
];

export const QUIZ_DATA: QuizQuestion[] = [
    {
        id: 1,
        question: { en: "Which of the following concepts ensures that data is not modified by unauthorized parties?", he: "איזה מהמושגים הבאים מבטיח שהנתונים לא שונו על ידי גורמים לא מורשים?" },
        options: [
            { en: "Confidentiality", he: "סודיות (Confidentiality)" }, 
            { en: "Integrity", he: "שלמות (Integrity)" }, 
            { en: "Availability", he: "זמינות (Availability)" }, 
            { en: "Non-repudiation", he: "אי-התכחשות (Non-repudiation)" }
        ],
        correctAnswer: 1,
        explanation: { en: "Integrity involves maintaining the consistency, accuracy, and trustworthiness of data over its entire lifecycle.", he: "שלמות (Integrity) עוסקת בשמירה על העקביות, הדיוק והאמינות של הנתונים לאורך כל מחזור חייהם." }
    },
    {
        id: 2,
        question: { en: "A user receives an email that appears to be from their CEO asking for a wire transfer. What type of attack is this?", he: "משתמש מקבל אימייל שנראה כאילו נשלח מהמנכ\"ל ומבקש העברה בנקאית. איזה סוג של התקפה זו?" },
        options: [
            { en: "Vishing", he: "Vishing" }, 
            { en: "Whaling", he: "Whaling (ציד לווייתנים)" }, 
            { en: "Pharming", he: "Pharming" }, 
            { en: "Tailgating", he: "Tailgating" }
        ],
        correctAnswer: 1,
        explanation: { en: "Whaling is a specific type of phishing attack that targets high-profile employees, such as the CEO or CFO.", he: "Whaling היא סוג ספציפי של מתקפת פישינג המכוונת לעובדים בפרופיל גבוה, כמו מנכ\"ל או סמנכ\"ל כספים." }
    }
];