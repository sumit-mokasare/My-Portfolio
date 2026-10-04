export const projects = [
  {
    id: "01",
    title: "Task Management Platform",
    category: "Full-stack application",
    image: "/projects/task-management.png",
    liveUrl: "", // e.g. "https://your-app.vercel.app"
    githubUrl: "", // e.g. "https://github.com/yourname/repo"
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    description:
      "A project management application that helps teams organize work, collaborate, and track progress from a single dashboard.",
    details: [
      "User authentication",
      "Role-based authorization",
      "Project, task, and subtask management",
      "Team collaboration and file uploads",
      "Dashboard analytics",
    ],
  },
  {
    id: "02",
    title: "AI Chat Application",
    category: "AI application",
    image: "/projects/ai-chat.png",
    liveUrl: "", // e.g. "https://your-app.vercel.app"
    githubUrl: "", // e.g. "https://github.com/yourname/repo"
    tags: ["React", "Node.js", "OpenAI-compatible API", "Tailwind CSS"],
    description:
      "An intelligent chatbot experience designed for natural conversations with large language models and a clean, responsive interface.",
    details: [
      "AI-powered chat interface",
      "Conversation history",
      "Markdown response support",
      "Responsive conversation experience",
    ],
  },
  {
    id: "03",
    title: "Developer Portfolio",
    category: "Personal portfolio",
    image: "/projects/portfolio.png",
    liveUrl: "", // e.g. "https://your-app.vercel.app"
    githubUrl: "", // e.g. "https://github.com/yourname/repo"
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    description:
      "A responsive portfolio with a Bento Grid-inspired layout to present projects, technical skills, and a developer journey.",
    details: [
      "Responsive Bento Grid layout",
      "Dark, minimal visual design",
      "Project showcase and skills dashboard",
      "Contact section",
    ],
  },
];
export const skills = [
  {
    id: "01",
    title: "Frontend",
    short: "Responsive interfaces & UI",
    description: "Creating responsive, accessible, and modern user interfaces with current frontend technologies.",
    tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS", "Bootstrap", "Vite"],
    icon: "react",
  },
  {
    id: "02",
    title: "Backend",
    short: "APIs & server-side systems",
    description: "Building REST APIs, authentication, and secure backend architectures for full-stack products.",
    tech: ["Node.js", "Express.js", "REST API Development", "JWT", "OAuth", "Multer", "Cloudinary"],
    icon: "node",
  },
  {
    id: "03",
    title: "Database",
    short: "Data models & persistence",
    description: "Working with relational and document databases and the tools used to model application data.",
    tech: ["MongoDB", "PostgreSQL", "Prisma ORM", "Mongoose"],
    icon: "node",
  },
  {
    id: "04",
    title: "Tools & Platforms",
    short: "Build, test & collaborate",
    description: "Using familiar development and design tools throughout the build and collaboration workflow.",
    tech: ["Git", "GitHub", "Docker", "Postman", "VS Code"],
    icon: "git",
  },
  // {
  //   id: "05",
  //   title: "Currently Learning",
  //   short: "Generative AI & LLMs",
  //   description: "Expanding into AI-assisted software development and intelligent applications through ongoing practice.",
  //   tech: ["Generative AI", "LangChain", "AI Agents", "RAG", "Vector Databases", "Prompt Engineering"],
  //   icon: "ai",
  // },
];

export const certifications = [
  {
    title: "Full-Stack Web Development",
    issuer: "Chai Code — Hitesh Choudhary",
    year: "2025",
    description:
      "Hands-on full-stack web development covering modern frontend, backend, databases, authentication, REST APIs, and real-world application development.",
    focus: [
      "HTML, CSS & JavaScript",
      "React & Frontend Development",
      "Node.js & Express.js",
      "MongoDB & PostgreSQL",
      "REST API Development",
      "Authentication & Authorization",
      "Deployment & Production",
      "Full-Stack Application Development",
    ],
    image: "/fullstackCertificate.png",
    link: "https://courses.chaicode.com/learn/certificate/9871648-214298",
    credentialId: "9871648-214298",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Simplilearn SkillUp",
    year: "2026",
    description:
      "Completed a Google Cloud-powered introductory course on Generative AI, building a foundational understanding of generative artificial intelligence and its practical applications.",
    focus: ["Generative AI Fundamentals", "Generative AI Applications"],
    image: "/genAICertificate.png",
    link: "https://simpli-web.app.link/e/sRXAbrtpX6b",
    credentialId: "10538517",
  },
  // {
  //   title: "JavaScript Algorithms and Data Structures",
  //   issuer: "freeCodeCamp",
  //   year: "2024",
  //   description: "JavaScript problem solving, algorithms, and data structures.",
  //   focus: ["JavaScript", "Algorithms", "Data structures"],
  //   image: "",
  //   link: "",
  //   credentialId: "",
  // },
  // {
  //   title: "Responsive Web Design",
  //   issuer: "freeCodeCamp",
  //   year: "2024",
  //   description: "Responsive layouts, accessibility fundamentals, and modern interface patterns.",
  //   focus: ["Responsive layouts", "Accessibility", "CSS"],
  //   image: "",
  //   link: "",
  //   credentialId: "",
  // },
];
export const specialties = [
  {
    number: "01",
    title: "Frontend Development",
    description: "Creating responsive, accessible, and modern user interfaces with React and modern CSS.",
    tools: "React · JavaScript · Tailwind · Bootstrap · Vite",
  },
  {
    number: "02",
    title: "Backend Development",
    description: "Developing REST APIs, authentication, file workflows, and secure server-side architectures.",
    tools: "Node.js · Express · JWT · OAuth · Cloudinary",
  },
  {
    number: "03",
    title: "AI Development",
    description: "Exploring LLMs, prompt engineering, AI agents, vector databases, and retrieval-augmented generation.",
    tools: "Generative AI · RAG · AI agents · LangChain",
  },
  {
    number: "04",
    title: "UI Implementation",
    description: "Turning design concepts into reusable, responsive React components with a focus on usability.",
    tools: "Figma · React · CSS · Responsive design",
  },
];

export const learningJourney = [
  "Started with HTML, CSS, and JavaScript fundamentals.",
  "Learned React and modern frontend development.",
  "Built backend applications with Node.js and Express.",
  "Worked with MongoDB, PostgreSQL, Prisma, and Mongoose.",
  "Explored Docker for containerized development.",
  "Now expanding into Generative AI, AI agents, and LLM-powered applications.",
];

export const strengths = [
  "Continuous learning",
  "Full-stack mindset",
  "Clean, maintainable code",
  "Frontend and backend",
  "Curiosity about AI",
  "Ready for new challenges",
];
export const facts = [
  { label: "Role", value: "Full Stack Developer" },
  { label: "Studying", value: "BCA (Bachelor of Computer Applications)" },
  { label: "Focus", value: "React, Node.js, Generative AI" },
  { label: "Looking for", value: "Internship / entry-level role" },
];
