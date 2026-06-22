// ─── Portfolio Data ─────────────────────────────────────────────────────────
// Update this file with your real info — all sections pull from here.

export const personalInfo = {
  name: "Rajesh Patankar",
  tagline: "I build fast, secure, full-stack web apps.",
  email: "rajeshpatankar24@gmail.com",       
  linkedin: "https://www.linkedin.com/in/rajeshpatankar-y2024/", 
  github: "https://github.com/rajeshpatankar24",          
  githubUsername: "rajeshpatankar24 ",                    
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
    longDescription: "A robust MERN stack application tailored for government departments and certified vendors. It replaces manual paperwork with a secure, digital pipeline. Admins can announce tenders, set deadlines, and assess bids, while vendors can register, check eligibility, search for opportunities, and securely submit bidding documents. Built with full data validation and robust audit logging.",
    features: [
      "Admin dashboard to create, update, and manage government tenders.",
      "Vendor bidding system with deadline enforcement and automated status updates.",
      "Secure authentication and authorization using JWT with role-based access control (Admin vs. Vendor).",
      "Comprehensive filtering and search tools for matching categories, values, and departments."
    ],
    challenges: "Optimizing database queries for high-concurrency vendor bidding and enforcing absolute security/validation on tender bids via Express middleware.",
    image: "/tender_app.png",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
    live: "https://tender-management-mu.vercel.app",
    github: "https://github.com/rajeshpatankar24/tender_management",
    featured: true,
  },
  {
    id: 2,
    title: "Glacial Engineers",
    category: "Website",
    description: "A premium corporate website for Glacial Engineers — HVAC and air conditioning experts. Features service explorer and modern lead generation system.",
    problem: "The firm needed a fast, high-conversion online presence to represent their commercial & industrial ventilation services and capture consultation leads.",
    longDescription: "A modern business website tailored for Glacial Engineers. It visually aligns with their premium HVAC & air conditioning branding, showcasing services across residential, commercial, and industrial clients. It features interactive service exploration sections, optimized lead acquisition flows, and smooth animations.",
    features: [
      "Air conditioning and ventilation service showcases with custom categorized tabs.",
      "Modern call-to-actions (CTAs) including 'Book A Service' and dynamic consultation inquiries.",
      "Highly responsive fluid layout built with Tailwind CSS for perfect rendering on mobile/desktop.",
      "SEO best practices implementing semantic markup for high localized visibility."
    ],
    challenges: "Crafting a clean, engineered aesthetic utilizing premium color harmony (matching their cold glacial tones) and ensuring extremely fast load speeds through asset optimization.",
    image: "/glacial_engineers.png",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"],
    live: "https://glacial-three.vercel.app",
    github: "https://github.com/rajeshpatankar24",
    featured: true,
  },
  {
    id: 3,
    title: "Chatty",
    category: "Web App",
    description: "A real-time instant messaging application featuring secure email authentication, real-time message broadcasting, and customizable user settings.",
    problem: "Standard web communications lack a combination of secure credentials handling and low-latency websocket message broadcasting.",
    longDescription: "A modern real-time messaging application. Built on the MERN stack and WebSockets, it features a rich welcome and onboarding system, secure sign-in, responsive grid visual panels, and robust, secure instant message sync across sessions.",
    features: [
      "Secure JWT-based email/password authentication and onboarding workflows.",
      "Real-time low-latency instant messaging architecture utilizing Socket.io.",
      "Custom profile setup options and interactive status settings.",
      "Highly reactive state-driven user interfaces with clean responsive dashboards."
    ],
    challenges: "Synchronizing active user sessions and validating real-time database inputs under high concurrency.",
    image: "/chatty.png",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    live: "https://chat-app-sage-beta.vercel.app/",
    github: "https://github.com/rajeshpatankar24/chat_app",
    featured: true,
  },
  // {
  //   id: 4,
  //   title: "Smart Expense Tracker",
  //   category: "Web App",
  //   description: "A personal finance tracker with category breakdowns, monthly graphs, and budget alerts — helping users stay on top of their spending.",
  //   problem: "People lose track of daily expenses. This app gives visual insights into spending patterns with an intuitive, mobile-friendly interface.",
  //   longDescription: "A sleek personal finance manager that empowers users to take control of their spending. Built with the MERN stack, the application processes expense logs in real-time, updates analytical dashboards instantly, and renders category-based budget limits. It includes comprehensive history filters, enabling users to export or view historical trends over multiple months.",
  //   features: [
  //     "Visual spending charts and monthly category breakdowns utilizing Chart.js integrations.",
  //     "Budget threshold alerts that trigger visual warnings when category limits are approached.",
  //     "Dynamic filtering of historical transactions by date ranges, categories, and payment methods.",
  //     "Responsive design optimized for quick expense entries on the go."
  //   ],
  //   challenges: "Handling date/time serialization consistently across MongoDB aggregations and rendering smooth, responsive charts on mobile dimensions.",
  //   image: "/expense_tracker.png",
  //   tech: ["React.js", "Node.js", "MongoDB", "Chart.js", "Express.js"],
  //   live: "https://github.com/rajeshpatankar24",
  //   github: "https://github.com/rajeshpatankar24",
  //   featured: false,
  // },
];

export const experiences = [
  {
    company: "Walrus solutions pvt ltd",
    role: "Full Stack Developer Intern",
    duration: "Feb 2026 – Mar 2026",
    location: "Indore",
    color: "#c084fc",
    points: [
      "Developed responsive React.js interfaces for OSM application.",
      "Integrated REST APIs, optimized frontend performance, and collaborated with backend teams for seamless functionality.",
    ],
  },
  {
    company: "Anantixia LLP",
    role: "MERN Stack Developer Intern",
    duration: "Nov 2025 – Jan 2026",
    location: "Gurugram",
    color: "#a78bfa",
    points: [
      "Built reusable React.js components and integrated APIs for a school service platform.",
      "Implemented multilingual support and improved responsive UI performance.",
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

// export const testimonials = [
//   {
//     name: "Manager Name",
//     role: "Tech Lead",
//     company: "Ypsilon IT Solution",
//     avatar: "YP",
//     quote: "Rajesh is a dedicated developer who consistently delivered clean, well-structured code. His understanding of the MERN stack is impressive for someone with his experience level.",
//     stars: 5,
//   },
//   {
//     name: "Manager Name",
//     role: "Project Manager",
//     company: "Anantixia LLP",
//     avatar: "AN",
//     quote: "Working with Rajesh was a pleasure. He took ownership of the Tender Management App from day one and delivered it ahead of schedule with excellent documentation.",
//     stars: 5,
//   },
// ];
