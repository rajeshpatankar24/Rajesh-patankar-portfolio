// ─── Portfolio Data ─────────────────────────────────────────────────────────
// Update this file with your real info — all sections pull from here.

export const personalInfo = {
  name: "Rajesh Patankar",
  tagline: "I build fast, secure, full-stack web apps.",
  email: "rajesh.patankar@example.com",        // ← replace with your email
  linkedin: "https://www.linkedin.com/in/rajeshpatankar-dev/", 
  github: "https://github.com/rajeshpatankar24",          
  githubUsername: "rajeshpatankar24",                    
  resumeUrl: "/resume.pdf",
  location: "Indore, India",
  bio: "MCA graduate from RGPV, Bhopal. 1+ year building MERN stack applications that solve real-world problems. Cleared TCS NQT 2025. I love building things that actually make a difference — clean code, great UX, and solid architecture.",
};

export const roles = [
  "MERN Stack Developer",
  "Full-Stack Engineer",
  "React.js Specialist",
  "Node.js Developer",
];

export const funFacts = [
  { emoji: "🎓", text: "MCA graduate from RGPV, Bhopal" },
  { emoji: "🏆", text: "Cleared TCS NQT 2025" },
  { emoji: "☕", text: "Fueled by coffee and curiosity" },
  { emoji: "🚀", text: "1+ year of MERN stack experience" },
];

export const skills = {
  Frontend: [
    { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 90, label: "Proficient" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: 95, label: "Proficient" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: 88, label: "Proficient" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 85, label: "Proficient" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", level: 82, label: "Proficient" },
  ],
  Backend: [
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: 80, label: "Proficient" },
    { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", level: 80, label: "Proficient" },
    { name: "REST APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", level: 78, label: "Intermediate" },
    { name: "JWT Auth", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: 75, label: "Intermediate" },
  ],
  Database: [
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 80, label: "Proficient" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", level: 72, label: "Intermediate" },
    { name: "Mongoose", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 78, label: "Intermediate" },
  ],
  "Tools & DevOps": [
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: 85, label: "Proficient" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", level: 85, label: "Proficient" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", level: 92, label: "Proficient" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", level: 80, label: "Intermediate" },
    { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", level: 75, label: "Intermediate" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "Tender Management App",
    category: "Web App",
    description: "A full-stack MERN application for managing government tenders — track submissions, deadlines, statuses, and vendor information in one place.",
    problem: "Government departments spent hours managing tender paperwork manually. This app streamlined the entire process into a single dashboard.",
    image: "/tender_app.png",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
    live: "#",        // ← replace with your live URL
    github: "#",      // ← replace with your GitHub repo
    featured: true,
  },
  {
    id: 2,
    title: "TechSolve Website",
    category: "Website",
    description: "Professional company website for TechSolve — an IT solutions firm. Responsive, fast, and designed to convert visitors into leads.",
    problem: "The company had no online presence. Built a modern site that showcases services, generates leads via contact form, and ranks on Google.",
    image: "/techsolve.png",
    tech: ["React.js", "CSS3", "EmailJS", "Framer Motion"],
    live: "#",        // ← replace
    github: "#",      // ← replace
    featured: false,
  },
  {
    id: 3,
    title: "Expense Tracker",
    category: "Web App",
    description: "A personal finance tracker with category breakdowns, monthly graphs, and budget alerts — helping users stay on top of their spending.",
    problem: "People lose track of daily expenses. This app gives visual insights into spending patterns with an intuitive, mobile-friendly interface.",
    image: "/expense_tracker.png",
    tech: ["React.js", "Node.js", "MongoDB", "Chart.js", "Express.js"],
    live: "#",        // ← replace
    github: "#",      // ← replace
    featured: false,
  },
];

export const experiences = [
  {
    company: "Ypsilon IT Solution",
    role: "Full Stack Developer Intern",
    duration: "Jan 2024 – Jun 2024",
    location: "Remote",
    color: "#8b5cf6",
    points: [
      "Built RESTful APIs using Node.js & Express, reducing response time by 30% through query optimization.",
      "Developed React.js dashboards with real-time data updates and role-based access control.",
      "Integrated MongoDB for scalable data storage and implemented JWT-based authentication.",
    ],
  },
  {
    company: "Anantixia LLP",
    role: "MERN Stack Developer Intern",
    duration: "Jul 2023 – Dec 2023",
    location: "Remote",
    color: "#a78bfa",
    points: [
      "Developed the Tender Management App — a full-stack solution for managing government procurement workflows.",
      "Implemented secure document uploads with validation and file management via Multer.",
      "Collaborated with design team to deliver a pixel-perfect, mobile-responsive UI.",
    ],
  },
  {
    company: "EduProHub",
    role: "Web Developer Intern",
    duration: "Jan 2023 – Jun 2023",
    location: "Remote",
    color: "#c084fc",
    points: [
      "Built and maintained company website pages using HTML, CSS, and JavaScript.",
      "Created interactive UI components improving user engagement by 25%.",
      "Assisted in migrating legacy pages to a modern React.js architecture.",
    ],
  },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "RGPV University, Bhopal",
    year: "2022 – 2024",
    grade: "First Class",
    icon: "🎓",
  },
  {
    degree: "Bachelor of Science (B.Sc.)",
    institution: "Barkatullah University, Bhopal",
    year: "2016 – 2019",
    grade: "First Class",
    icon: "📚",
  },
];

export const achievements = [
  {
    title: "TCS NQT 2025",
    description: "Cleared TCS National Qualifier Test — a highly competitive national-level assessment.",
    badge: "✅ Qualified",
    color: "#10b981",
  },
];

export const testimonials = [
  {
    name: "Manager Name",
    role: "Tech Lead",
    company: "Ypsilon IT Solution",
    avatar: "YP",
    quote: "Rajesh is a dedicated developer who consistently delivered clean, well-structured code. His understanding of the MERN stack is impressive for someone with his experience level.",
    stars: 5,
  },
  {
    name: "Manager Name",
    role: "Project Manager",
    company: "Anantixia LLP",
    avatar: "AN",
    quote: "Working with Rajesh was a pleasure. He took ownership of the Tender Management App from day one and delivered it ahead of schedule with excellent documentation.",
    stars: 5,
  },
];
