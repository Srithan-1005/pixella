export interface Job {
  id: string
  title: string
  company: string
  logo: string
  location: string
  workType: 'Remote' | 'Hybrid' | 'On-site'
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead'
  salary: string
  salaryMin: number
  salaryMax: number
  postedAt: string
  matchScore: number
  skills: string[]
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
}

export const SAMPLE_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack AI Engineer',
    company: 'NeuralOrbit Labs',
    logo: '🧠',
    location: 'San Francisco, CA (or Remote)',
    workType: 'Remote',
    experienceLevel: 'Senior',
    salary: '$165,000 - $210,000',
    salaryMin: 165000,
    salaryMax: 210000,
    postedAt: '2 hours ago',
    matchScore: 96,
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'OpenAI API', 'pgvector'],
    description: 'Lead the architecture and implementation of generative AI user experiences and scalable agentic backend systems.',
    responsibilities: [
      'Architect robust web applications using Next.js 15, TypeScript, and modern state architectures.',
      'Integrate LLM reasoning pipelines and semantic retrieval mechanisms with low latency.',
      'Collaborate with product designers to ship intuitive, high-polish user interfaces.'
    ],
    requirements: [
      '5+ years of full-stack engineering experience with React and Node.js/Python.',
      'Experience in building production applications using modern AI/LLM APIs.'
    ],
    benefits: ['100% Remote flexibility', '$5,000 home office stipend', 'Comprehensive health & dental', 'Unlimited PTO']
  },
  {
    id: 'job-2',
    title: 'Data Engineer (Python & SQL)',
    company: 'Dataspark Analytics',
    logo: '📊',
    location: 'Hyderabad, India (or Remote)',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '$95,000 - $135,000',
    salaryMin: 95000,
    salaryMax: 135000,
    postedAt: '3 hours ago',
    matchScore: 95,
    skills: ['Python', 'SQL', 'PostgreSQL', 'Data Engineering', 'Spark', 'FastAPI', 'Pandas'],
    description: 'Build enterprise ETL/ELT pipelines, optimize SQL queries on massive transactional databases, and deliver high-throughput analytics schemas.',
    responsibilities: [
      'Design, build, and maintain scalable data pipelines in Python and SQL.',
      'Perform complex SQL transformations, query optimization, and schema indexing.',
      'Integrate vector databases and data lakehouses for downstream AI consumers.'
    ],
    requirements: [
      '2+ years experience in Data Engineering, Python, and SQL databases.',
      'Strong knowledge of PostgreSQL, query performance tuning, and schema normalization.'
    ],
    benefits: ['Flexible remote work', 'Annual learning stipend', 'Comprehensive health cover', 'Performance bonus']
  },
  {
    id: 'job-3',
    title: 'Generative AI & LLM Systems Developer',
    company: 'Cognitive Nexus',
    logo: '✨',
    location: 'Bengaluru, India (Hybrid)',
    workType: 'Hybrid',
    experienceLevel: 'Mid',
    salary: '$110,000 - $150,000',
    salaryMin: 110000,
    salaryMax: 150000,
    postedAt: '4 hours ago',
    matchScore: 98,
    skills: ['Python', 'LLMs', 'RAG', 'LangChain', 'FastAPI', 'Vector DBs', 'React'],
    description: 'Develop production Retrieval-Augmented Generation (RAG) pipelines, implement intelligent agents, and connect multi-modal reasoning models to enterprise APIs.',
    responsibilities: [
      'Build end-to-end RAG workflows with semantic search and reranking.',
      'Optimize token utilization, latency, and model context retrieval.',
      'Deploy RESTful microservices with FastAPI and Docker.'
    ],
    requirements: [
      'Proficiency in Python, LangChain/LlamaIndex, and vector databases (pgvector/Pinecone).',
      'Solid understanding of transformer architectures and prompt evaluation.'
    ],
    benefits: ['Cutting-edge GPU compute access', 'Stock equity grant', 'Flexible hybrid schedule', 'Health insurance']
  },
  {
    id: 'job-4',
    title: 'Full Stack Web Developer (React & Node.js)',
    company: 'TekTalis Systems',
    logo: '⚡',
    location: 'Hyderabad, India',
    workType: 'Hybrid',
    experienceLevel: 'Entry',
    salary: '$70,000 - $95,000',
    salaryMin: 70000,
    salaryMax: 95000,
    postedAt: '5 hours ago',
    matchScore: 94,
    skills: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'HTML5', 'CSS3'],
    description: 'Join an agile engineering team crafting scalable client portals, REST APIs, and microservices for global enterprise customers.',
    responsibilities: [
      'Develop modern, responsive web pages in React and Tailwind CSS.',
      'Implement robust backend routes in Node.js and Express.',
      'Collaborate with QA and design teams to ensure accessible, bug-free releases.'
    ],
    requirements: [
      'Hands-on experience with React, Node.js, and relational or NoSQL databases.',
      'Strong problem-solving skills and passion for clean code.'
    ],
    benefits: ['Dedicated engineering mentor', 'Health & wellness allowance', 'Commuter benefits', 'Paid certifications']
  },
  {
    id: 'job-5',
    title: 'Frontend Platform Architect',
    company: 'Veloce Cloud',
    logo: '🌐',
    location: 'New York, NY',
    workType: 'Hybrid',
    experienceLevel: 'Lead',
    salary: '$180,000 - $230,000',
    salaryMin: 180000,
    salaryMax: 230000,
    postedAt: '6 hours ago',
    matchScore: 91,
    skills: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Web Performance', 'Design Systems'],
    description: 'Spearhead our core web platform performance, micro-frontend architecture, and shared component ecosystem serving millions of active developers.',
    responsibilities: [
      'Optimize Core Web Vitals across mission-critical dashboard applications.',
      'Maintain and evolve the enterprise multi-brand design system in React/Tailwind.'
    ],
    requirements: [
      '6+ years of specialized frontend engineering experience.',
      'Deep mastery of modern JavaScript/TypeScript, browser rendering engines, and DOM performance.'
    ],
    benefits: ['Hybrid work stipend', 'Competitive base + 0.15% equity', 'Wellness allowance', '401(k) matching']
  },
  {
    id: 'job-6',
    title: 'SQL Database Administrator & Developer',
    company: 'Apex Data Services',
    logo: '💾',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '$90,000 - $125,000',
    salaryMin: 90000,
    salaryMax: 125000,
    postedAt: '1 day ago',
    matchScore: 93,
    skills: ['SQL', 'PostgreSQL', 'MySQL', 'Database Tuning', 'Stored Procedures', 'Python'],
    description: 'Maintain high availability, query optimization, indexing strategies, and automated backup routines across multi-terabyte production SQL databases.',
    responsibilities: [
      'Write and optimize complex analytical queries, stored procedures, and triggers.',
      'Profile database locks, execution plans, and query indexes to eliminate latency spikes.',
      'Ensure disaster recovery readiness, replication lag monitoring, and backup validation.'
    ],
    requirements: [
      '3+ years SQL development and administration on PostgreSQL or MySQL.',
      'Deep understanding of ACID compliance, indexes (B-tree, GIN), and query execution plans.'
    ],
    benefits: ['100% Remote flexibility', 'Annual hardware refresh budget', 'Full medical and dental', 'Generous 401(k)']
  },
  {
    id: 'job-7',
    title: 'Junior Software Engineer',
    company: 'Aetheria Dynamics',
    logo: '🚀',
    location: 'Austin, TX',
    workType: 'Remote',
    experienceLevel: 'Entry',
    salary: '$85,000 - $110,000',
    salaryMin: 85000,
    salaryMax: 110000,
    postedAt: '1 day ago',
    matchScore: 89,
    skills: ['JavaScript', 'React', 'HTML/CSS', 'Node.js', 'Git', 'SQL'],
    description: 'Join an agile product crew building consumer-facing web apps with mentorship from seasoned principal engineers.',
    responsibilities: [
      'Implement clean UI components and test coverage in React and TypeScript.',
      'Fix bugs, implement feature tickets, and participate in code reviews.'
    ],
    requirements: [
      'B.S. in Computer Science or equivalent bootcamp / self-taught portfolio.',
      'Solid grasp of JavaScript fundamentals, CSS flexbox/grid, and Git workflow.'
    ],
    benefits: ['Dedicated 1-on-1 mentor', 'Continuous learning budget ($2,000/yr)', 'Flexible hours', 'Healthcare coverage']
  },
  {
    id: 'job-8',
    title: 'Cloud DevOps & SRE Engineer',
    company: 'HyperScale Systems',
    logo: '🛡️',
    location: 'Chicago, IL',
    workType: 'Hybrid',
    experienceLevel: 'Senior',
    salary: '$150,000 - $190,000',
    salaryMin: 150000,
    salaryMax: 190000,
    postedAt: '2 days ago',
    matchScore: 82,
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker', 'CI/CD', 'Linux', 'Go'],
    description: 'Build automated, fault-tolerant infrastructure hosting enterprise Kubernetes clusters across global AWS regions.',
    responsibilities: [
      'Manage multi-region AWS cloud environments using Terraform and GitOps.',
      'Maintain zero-downtime CI/CD deployment pipelines.'
    ],
    requirements: [
      '4+ years managing production AWS workloads and Kubernetes.',
      'Proficiency in Infrastructure as Code (IaC) and shell scripting.'
    ],
    benefits: ['Generous stock grant', 'Full medical/vision/dental', 'Commuter benefits', 'Catered lunches']
  },
  {
    id: 'job-9',
    title: 'AI Machine Learning Engineer',
    company: 'Prism AI Labs',
    logo: '🤖',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '$130,000 - $165,000',
    salaryMin: 130000,
    salaryMax: 165000,
    postedAt: '2 days ago',
    matchScore: 92,
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Machine Learning', 'Docker', 'FastAPI'],
    description: 'Train, evaluate, and deploy machine learning models on high-volume real-time data streams.',
    responsibilities: [
      'Develop predictive models and feature engineering pipelines in Python.',
      'Deploy sub-second model inference microservices with FastAPI and Docker.'
    ],
    requirements: [
      'Degree in Computer Science, Data Science, or related field.',
      'Experience with classical ML, deep learning frameworks, and model evaluation.'
    ],
    benefits: ['Work from anywhere', 'High-end GPU cloud access', 'Generous paid time off', 'Company retreats']
  },
  {
    id: 'job-10',
    title: 'Backend Java / Spring Boot Engineer',
    company: 'FinGuard Core',
    logo: '💳',
    location: 'Hyderabad, India (Hybrid)',
    workType: 'Hybrid',
    experienceLevel: 'Senior',
    salary: '$110,000 - $145,000',
    salaryMin: 110000,
    salaryMax: 145000,
    postedAt: '3 days ago',
    matchScore: 88,
    skills: ['Java', 'Spring Boot', 'SQL', 'PostgreSQL', 'Microservices', 'Kafka', 'Docker'],
    description: 'Develop resilient financial transaction processing microservices handling thousands of operations per second with zero data loss.',
    responsibilities: [
      'Build scalable REST and event-driven services in Java and Spring Boot.',
      'Implement distributed locking, idempotency keys, and Kafka messaging.'
    ],
    requirements: [
      '4+ years of Java/Spring Boot enterprise development.',
      'Proficiency in relational databases, transaction isolation levels, and microservices.'
    ],
    benefits: ['Competitive compensation', 'Annual bonus', 'Comprehensive family health insurance', 'Wellness perks']
  },
  {
    id: 'job-11',
    title: 'UI/UX & Product Design Engineer',
    company: 'Studio Lumina',
    logo: '🎨',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '$105,000 - $140,000',
    salaryMin: 105000,
    salaryMax: 140000,
    postedAt: '3 days ago',
    matchScore: 86,
    skills: ['React', 'Tailwind CSS', 'Figma', 'Framer Motion', 'TypeScript', 'CSS3'],
    description: 'Bridge design and code by translating Figma mockups into interactive, pixel-perfect frontend experiences.',
    responsibilities: [
      'Build responsive UI components in React and Tailwind CSS.',
      'Craft smooth micro-animations using Framer Motion.'
    ],
    requirements: [
      'Portfolio showcasing clean UI/UX and web implementation.',
      'Strong eye for typography, layout spacing, and accessibility.'
    ],
    benefits: ['Home office setup stipend', 'Flexible work hours', 'Annual conference pass', 'Generous equity']
  },
  {
    id: 'job-12',
    title: 'QA Automation Engineer',
    company: 'QualityFirst Software',
    logo: '🧪',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '$90,000 - $120,000',
    salaryMin: 90000,
    salaryMax: 120000,
    postedAt: '4 days ago',
    matchScore: 85,
    skills: ['JavaScript', 'Python', 'Playwright', 'Jest', 'CI/CD', 'Git', 'SQL'],
    description: 'Design and execute automated end-to-end testing frameworks to safeguard web and API releases.',
    responsibilities: [
      'Write end-to-end tests using Playwright and Jest.',
      'Integrate test suites into GitHub Actions CI/CD pipelines.'
    ],
    requirements: [
      '2+ years in software test automation for web apps.',
      'Experience with JavaScript/TypeScript and API testing.'
    ],
    benefits: ['100% Remote flexibility', 'Healthcare coverage', 'Paid vacation days', 'Education budget']
  },
  {
    id: 'job-13',
    title: 'Python Backend Engineer',
    company: 'Quantum Byte Technologies',
    logo: '🐍',
    location: 'Bengaluru, India',
    workType: 'Hybrid',
    experienceLevel: 'Mid',
    salary: '₹18,00,000 - ₹28,00,000',
    salaryMin: 18000,
    salaryMax: 28000,
    postedAt: '4 hours ago',
    matchScore: 97,
    skills: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs'],
    description: 'Build and maintain high-performance REST APIs and microservices powering a 10M+ user fintech platform.',
    responsibilities: [
      'Design and implement RESTful APIs using FastAPI and Django REST Framework.',
      'Write efficient database queries and manage PostgreSQL schema migrations.',
      'Optimize system performance using Redis caching and async task queues.'
    ],
    requirements: [
      '2+ years of Python backend development.',
      'Strong understanding of database design, ORM frameworks, and API security.'
    ],
    benefits: ['ESOP options', 'Comprehensive health cover', 'Remote Fridays', 'Learning & development budget']
  },
  {
    id: 'job-14',
    title: 'React.js Frontend Developer',
    company: 'InnovateTech Solutions',
    logo: '⚛️',
    location: 'Hyderabad, India',
    workType: 'On-site',
    experienceLevel: 'Mid',
    salary: '₹12,00,000 - ₹20,00,000',
    salaryMin: 12000,
    salaryMax: 20000,
    postedAt: '6 hours ago',
    matchScore: 96,
    skills: ['React', 'JavaScript', 'TypeScript', 'Redux', 'HTML5', 'CSS3', 'REST APIs'],
    description: 'Join our fast-growing product team to build intuitive user interfaces for enterprise SaaS applications.',
    responsibilities: [
      'Develop responsive, accessible React.js UIs from Figma designs.',
      'Integrate REST APIs and manage complex application state with Redux.',
      'Conduct code reviews and mentor junior frontend developers.'
    ],
    requirements: [
      '2-4 years of React.js development experience.',
      'Familiarity with TypeScript and modern CSS methodologies.'
    ],
    benefits: ['Flexible timings', 'Performance bonus', 'Gym membership', 'Team outings']
  },
  {
    id: 'job-15',
    title: 'Data Analyst (SQL & Python)',
    company: 'Analytics Hive',
    logo: '📈',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Entry',
    salary: '₹6,00,000 - ₹12,00,000',
    salaryMin: 6000,
    salaryMax: 12000,
    postedAt: '8 hours ago',
    matchScore: 91,
    skills: ['SQL', 'Python', 'Pandas', 'Excel', 'Power BI', 'Data Visualization'],
    description: 'Analyze large datasets to generate actionable insights and business intelligence reports for C-suite leadership.',
    responsibilities: [
      'Write optimized SQL queries to extract, transform, and load business data.',
      'Create automated dashboards and reports using Power BI and Python.',
      'Present insights and recommendations to stakeholders and leadership.'
    ],
    requirements: [
      'Proficiency in SQL and Python (Pandas, NumPy).',
      'Experience with at least one BI tool (Power BI, Tableau, or Metabase).'
    ],
    benefits: ['Remote-first culture', 'Continuous learning support', 'Health insurance', 'Annual appraisal cycle']
  },
  {
    id: 'job-16',
    title: 'Node.js Backend Developer',
    company: 'ScaleStack Labs',
    logo: '🟢',
    location: 'Pune, India',
    workType: 'Hybrid',
    experienceLevel: 'Mid',
    salary: '₹14,00,000 - ₹22,00,000',
    salaryMin: 14000,
    salaryMax: 22000,
    postedAt: '10 hours ago',
    matchScore: 93,
    skills: ['Node.js', 'Express', 'JavaScript', 'MongoDB', 'Redis', 'REST APIs', 'Docker'],
    description: 'Design scalable REST API microservices handling millions of daily transactions for e-commerce and logistics platforms.',
    responsibilities: [
      'Build and maintain Node.js microservices with Express and TypeScript.',
      'Optimize MongoDB aggregation pipelines for performance.',
      'Implement authentication, rate limiting, and API security best practices.'
    ],
    requirements: [
      '2+ years Node.js backend development in production environments.',
      'Experience with MongoDB, Redis, and containerized deployments.'
    ],
    benefits: ['WFH 3 days/week', 'Annual bonus', 'Cab facility', 'Subsidized meals']
  },
  {
    id: 'job-17',
    title: 'Machine Learning Engineer (NLP)',
    company: 'LinguaAI Corp',
    logo: '🗣️',
    location: 'Remote (India)',
    workType: 'Remote',
    experienceLevel: 'Senior',
    salary: '₹30,00,000 - ₹50,00,000',
    salaryMin: 30000,
    salaryMax: 50000,
    postedAt: '12 hours ago',
    matchScore: 94,
    skills: ['Python', 'NLP', 'PyTorch', 'Hugging Face', 'LLMs', 'BERT', 'FastAPI'],
    description: 'Build state-of-the-art NLP models for document understanding, information extraction, and conversational AI systems.',
    responsibilities: [
      'Fine-tune transformer models (BERT, LLaMA, Mistral) for domain-specific tasks.',
      'Build inference APIs to serve NLP models with sub-200ms latency.',
      'Run experiments with MLflow and monitor model drift in production.'
    ],
    requirements: [
      '3+ years in applied NLP/ML with transformer architectures.',
      'Hands-on experience with Hugging Face Transformers and PyTorch.'
    ],
    benefits: ['Remote-first', 'GPU compute stipend', 'Conference allowance', 'Medical & dental']
  },
  {
    id: 'job-18',
    title: 'DevOps Engineer',
    company: 'CloudPeak Infra',
    logo: '☁️',
    location: 'Hyderabad, India',
    workType: 'Hybrid',
    experienceLevel: 'Mid',
    salary: '₹16,00,000 - ₹26,00,000',
    salaryMin: 16000,
    salaryMax: 26000,
    postedAt: '1 day ago',
    matchScore: 84,
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'GitHub Actions', 'Terraform', 'Linux'],
    description: 'Automate and maintain cloud infrastructure for mission-critical production systems across AWS and GCP environments.',
    responsibilities: [
      'Design and maintain Kubernetes clusters and Helm chart deployments.',
      'Build CI/CD pipelines with GitHub Actions and ArgoCD.',
      'Manage IAM, VPC networking, and security groups in AWS.'
    ],
    requirements: [
      '2+ years in DevOps/Cloud infrastructure engineering.',
      'AWS Solutions Architect Associate certification preferred.'
    ],
    benefits: ['Certification reimbursement', 'Health insurance', 'Flexible WFH days', 'Annual tech allowance']
  },
  {
    id: 'job-19',
    title: 'Software Development Engineer (SDE-2)',
    company: 'FlipKart Tech',
    logo: '🛒',
    location: 'Bengaluru, India',
    workType: 'Hybrid',
    experienceLevel: 'Mid',
    salary: '₹28,00,000 - ₹40,00,000',
    salaryMin: 28000,
    salaryMax: 40000,
    postedAt: '1 day ago',
    matchScore: 90,
    skills: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'MongoDB', 'Redis', 'SQL'],
    description: 'Design and develop high-scale distributed systems supporting 100M+ active users during peak shopping events.',
    responsibilities: [
      'Build fault-tolerant microservices using Spring Boot and event-driven Kafka architecture.',
      'Optimize service performance to handle 50,000+ RPS during Big Billion Day sale events.',
      'Lead technical design reviews and mentor junior engineers.'
    ],
    requirements: [
      '3-6 years of Java backend development experience.',
      'Strong understanding of distributed systems, CAP theorem, and database internals.'
    ],
    benefits: ['ESOPs', 'Comprehensive health insurance', 'Food allowance', 'Flexible working hours']
  },
  {
    id: 'job-20',
    title: 'Full Stack Developer (MERN)',
    company: 'GrowthSpark Digital',
    logo: '🌱',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Entry',
    salary: '₹8,00,000 - ₹15,00,000',
    salaryMin: 8000,
    salaryMax: 15000,
    postedAt: '2 days ago',
    matchScore: 95,
    skills: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript', 'REST APIs', 'Git'],
    description: 'Build full-featured e-commerce and SaaS web applications using the modern MERN stack for global clients.',
    responsibilities: [
      'Develop and maintain full-stack web applications using React and Node.js.',
      'Design RESTful APIs with Express.js and integrate MongoDB schemas.',
      'Deploy applications on AWS EC2 / Heroku with CI/CD pipelines.'
    ],
    requirements: [
      'Demonstrated project experience with MERN stack.',
      'Understanding of JWT authentication, CORS, and REST security practices.'
    ],
    benefits: ['100% Remote', 'Flexible schedule', 'Learning allowance', 'Annual team trip']
  },
  {
    id: 'job-21',
    title: 'Associate Software Engineer',
    company: 'Infosys Digital',
    logo: '🏢',
    location: 'Hyderabad, India',
    workType: 'On-site',
    experienceLevel: 'Entry',
    salary: '₹4,50,000 - ₹7,00,000',
    salaryMin: 4500,
    salaryMax: 7000,
    postedAt: '2 days ago',
    matchScore: 87,
    skills: ['Java', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Git', 'Agile'],
    description: 'Start your engineering career at scale with structured mentorship, global project exposure, and world-class training programs.',
    responsibilities: [
      'Contribute to feature development under senior engineer guidance.',
      'Write unit tests and participate in sprint planning and code reviews.',
      'Learn and apply enterprise Java frameworks and Agile methodologies.'
    ],
    requirements: [
      'B.E./B.Tech in CS, IT, or related discipline with 60%+ marks.',
      'Good communication skills and eagerness to learn new technologies.'
    ],
    benefits: ['Structured onboarding', 'Global mobility opportunities', 'Health insurance', 'PPF contribution']
  },
  {
    id: 'job-22',
    title: 'Product Manager (Technical)',
    company: 'ProdAxis',
    logo: '📱',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Senior',
    salary: '$145,000 - $185,000',
    salaryMin: 145000,
    salaryMax: 185000,
    postedAt: '3 days ago',
    matchScore: 80,
    skills: ['Product Strategy', 'Agile', 'SQL', 'Data Analysis', 'Jira', 'User Research'],
    description: 'Own the product roadmap and execution for a B2B SaaS developer tooling platform used by 25,000+ engineering teams.',
    responsibilities: [
      'Define and prioritize product features based on user research and data analysis.',
      'Collaborate with engineering, design, and go-to-market teams to deliver quarterly OKRs.',
      'Write detailed PRDs and acceptance criteria for engineering sprints.'
    ],
    requirements: [
      '4+ years of product management experience, ideally with developer tools or APIs.',
      'Strong analytical skills and comfort reading code/engineering specifications.'
    ],
    benefits: ['Remote-first', 'Stock options', 'Team offsites', 'Medical & dental']
  },
  {
    id: 'job-23',
    title: 'Cybersecurity Analyst',
    company: 'ShieldNet Security',
    logo: '🔒',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '$100,000 - $135,000',
    salaryMin: 100000,
    salaryMax: 135000,
    postedAt: '3 days ago',
    matchScore: 78,
    skills: ['Python', 'SQL', 'Network Security', 'SIEM', 'Incident Response', 'Linux'],
    description: 'Monitor, detect, and respond to cyber threats across enterprise cloud environments in real-time.',
    responsibilities: [
      'Triage and investigate security alerts from SIEM tools (Splunk, Sentinel).',
      'Conduct vulnerability assessments and penetration testing.',
      'Author incident response playbooks and conduct post-mortem reviews.'
    ],
    requirements: [
      '2+ years of cybersecurity operations experience.',
      'CISSP, CEH, or CompTIA Security+ certification preferred.'
    ],
    benefits: ['Remote work', 'Professional cert reimbursement', 'Annual security conference pass', 'Full benefits']
  },
  {
    id: 'job-24',
    title: 'Django & Python Web Developer',
    company: 'WebForge Labs',
    logo: '🔧',
    location: 'Pune, India (Remote)',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '₹10,00,000 - ₹18,00,000',
    salaryMin: 10000,
    salaryMax: 18000,
    postedAt: '4 days ago',
    matchScore: 92,
    skills: ['Python', 'Django', 'REST APIs', 'PostgreSQL', 'Docker', 'Celery', 'Redis'],
    description: 'Build robust, scalable web applications and RESTful APIs with Django for international SaaS and marketplace clients.',
    responsibilities: [
      'Develop Django REST API endpoints, models, serializers, and viewsets.',
      'Implement Celery background task queues for async processing.',
      'Write comprehensive unit and integration tests using pytest.'
    ],
    requirements: [
      '2+ years of production Django development.',
      'Experience with Django REST Framework and PostgreSQL.'
    ],
    benefits: ['Work from home', 'Project completion bonuses', 'Health cover', 'Paid team retreats']
  },
  {
    id: 'job-25',
    title: 'iOS Developer (Swift & SwiftUI)',
    company: 'AppNova Studio',
    logo: '🍎',
    location: 'Bengaluru, India',
    workType: 'Hybrid',
    experienceLevel: 'Mid',
    salary: '₹18,00,000 - ₹30,00,000',
    salaryMin: 18000,
    salaryMax: 30000,
    postedAt: '4 days ago',
    matchScore: 75,
    skills: ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'iOS', 'REST APIs', 'Git'],
    description: 'Build premium iOS consumer apps with delightful animations, pixel-perfect UI, and seamless backend integration.',
    responsibilities: [
      'Develop and ship polished iOS features in Swift and SwiftUI.',
      'Collaborate with backend team to design and integrate REST/GraphQL APIs.',
      'Conduct app store reviews, performance profiling, and crash reporting.'
    ],
    requirements: [
      '3+ years iOS development with published App Store apps.',
      'Deep understanding of memory management, concurrency, and Core Data.'
    ],
    benefits: ['Hybrid flexibility', 'MacBook Pro provided', 'Health insurance', 'App Store success bonuses']
  },
  {
    id: 'job-26',
    title: 'Android Developer (Kotlin)',
    company: 'MobileFirst Labs',
    logo: '📲',
    location: 'Hyderabad, India',
    workType: 'Hybrid',
    experienceLevel: 'Mid',
    salary: '₹15,00,000 - ₹25,00,000',
    salaryMin: 15000,
    salaryMax: 25000,
    postedAt: '5 days ago',
    matchScore: 76,
    skills: ['Kotlin', 'Android', 'Jetpack Compose', 'REST APIs', 'MVVM', 'Coroutines'],
    description: 'Craft high-performance Android applications used by 5M+ users across India and Southeast Asia.',
    responsibilities: [
      'Build and maintain Jetpack Compose Android UI components.',
      'Implement MVVM architecture with ViewModel and StateFlow.',
      'Integrate Firebase Analytics, Crashlytics, and push notifications.'
    ],
    requirements: [
      '2+ years of Kotlin Android development.',
      'Experience publishing apps on the Google Play Store.'
    ],
    benefits: ['Performance bonuses', 'Work flexibility', 'Health & accident insurance', 'Certification support']
  },
  {
    id: 'job-27',
    title: 'Cloud Solutions Architect (AWS)',
    company: 'NimbusCloud Solutions',
    logo: '☁️',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Lead',
    salary: '$175,000 - $220,000',
    salaryMin: 175000,
    salaryMax: 220000,
    postedAt: '5 days ago',
    matchScore: 83,
    skills: ['AWS', 'Terraform', 'Kubernetes', 'Serverless', 'Python', 'Networking', 'Security'],
    description: 'Design and implement enterprise-grade cloud architectures on AWS for Fortune 500 clients across finance and healthcare sectors.',
    responsibilities: [
      'Lead cloud migration strategies and Well-Architected Framework reviews.',
      'Design multi-account AWS organizations with OU-level governance.',
      'Mentor engineering teams on cloud-native design patterns.'
    ],
    requirements: [
      'AWS Solutions Architect Professional or Specialty certification.',
      '6+ years of cloud infrastructure experience at enterprise scale.'
    ],
    benefits: ['Fully remote', 'Premium benefits package', 'AWS certification budget', '20 days PTO']
  },
  {
    id: 'job-28',
    title: 'Data Science Engineer',
    company: 'InsightFlow Analytics',
    logo: '🔬',
    location: 'Bengaluru, India (Hybrid)',
    workType: 'Hybrid',
    experienceLevel: 'Mid',
    salary: '₹20,00,000 - ₹35,00,000',
    salaryMin: 20000,
    salaryMax: 35000,
    postedAt: '6 days ago',
    matchScore: 91,
    skills: ['Python', 'Pandas', 'Scikit-learn', 'SQL', 'Matplotlib', 'Spark', 'Jupyter'],
    description: 'Turn complex datasets into predictive models and business insights that drive million-dollar decisions for retail and FMCG companies.',
    responsibilities: [
      'Build supervised and unsupervised ML models for demand forecasting and churn prediction.',
      'Develop Spark pipelines for large-scale data transformation.',
      'Present analytical findings with compelling visualizations to stakeholders.'
    ],
    requirements: [
      '2+ years in data science or analytics engineering.',
      'Proficiency in Python data stack: Pandas, Scikit-learn, and NumPy.'
    ],
    benefits: ['Hybrid flexibility', 'Learning & development budget', 'Health insurance', 'ESOP participation']
  },
  {
    id: 'job-29',
    title: 'Site Reliability Engineer (SRE)',
    company: 'Infra360 Inc.',
    logo: '⚙️',
    location: 'Remote (US)',
    workType: 'Remote',
    experienceLevel: 'Senior',
    salary: '$155,000 - $195,000',
    salaryMin: 155000,
    salaryMax: 195000,
    postedAt: '6 days ago',
    matchScore: 81,
    skills: ['Python', 'Go', 'Kubernetes', 'Prometheus', 'Grafana', 'AWS', 'Terraform'],
    description: 'Ensure 99.999% uptime for critical distributed services used by millions of daily active users globally.',
    responsibilities: [
      'Build observability stacks with Prometheus, Grafana, and OpenTelemetry.',
      'Manage on-call rotations, incident response, and blameless postmortems.',
      'Automate toil reduction and improve deployment frequency with SLO/SLI tracking.'
    ],
    requirements: [
      '4+ years of SRE or platform engineering experience.',
      'Experience with distributed tracing, alerting, and capacity planning.'
    ],
    benefits: ['Remote forever policy', 'On-call compensation', 'Exceptional 401(k)', 'Equity package']
  },
  {
    id: 'job-30',
    title: 'Computer Vision Engineer',
    company: 'VisionaryAI Labs',
    logo: '👁️',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Senior',
    salary: '$145,000 - $185,000',
    salaryMin: 145000,
    salaryMax: 185000,
    postedAt: '1 week ago',
    matchScore: 88,
    skills: ['Python', 'PyTorch', 'OpenCV', 'Computer Vision', 'YOLO', 'TensorFlow', 'CUDA'],
    description: 'Build real-time computer vision systems for autonomous vehicles, industrial inspection, and medical imaging applications.',
    responsibilities: [
      'Train and deploy object detection models (YOLO, Detectron2) for real-time inference.',
      'Optimize GPU inference pipelines for sub-30ms latency using CUDA and TensorRT.',
      'Curate large-scale labeling pipelines and benchmark models against industry datasets.'
    ],
    requirements: [
      '4+ years of applied computer vision research or engineering.',
      'Experience with CUDA programming and GPU optimization.'
    ],
    benefits: ['High-end GPU workstations', 'Research publication support', 'Remote flexibility', 'Equity package']
  },
  {
    id: 'job-31',
    title: 'Angular Frontend Developer',
    company: 'EnterpriseFlow Corp',
    logo: '🔴',
    location: 'Hyderabad, India',
    workType: 'Hybrid',
    experienceLevel: 'Mid',
    salary: '₹12,00,000 - ₹20,00,000',
    salaryMin: 12000,
    salaryMax: 20000,
    postedAt: '8 days ago',
    matchScore: 83,
    skills: ['Angular', 'TypeScript', 'RxJS', 'HTML5', 'CSS3', 'REST APIs', 'Jest'],
    description: 'Build complex enterprise Angular applications for insurance, banking, and healthcare clients.',
    responsibilities: [
      'Develop and maintain large-scale Angular applications with lazy loading.',
      'Implement reactive data flows using RxJS observables and operators.',
      'Write comprehensive unit and e2e tests using Jest and Cypress.'
    ],
    requirements: [
      '3+ years of Angular (v12+) development experience.',
      'Strong TypeScript skills and understanding of RxJS patterns.'
    ],
    benefits: ['Hybrid work schedule', 'Certifications paid', 'Health insurance', 'Referral bonuses']
  },
  {
    id: 'job-32',
    title: 'Prompt Engineer & AI Specialist',
    company: 'GenAI Works',
    logo: '💡',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '$120,000 - $160,000',
    salaryMin: 120000,
    salaryMax: 160000,
    postedAt: '9 days ago',
    matchScore: 96,
    skills: ['Python', 'OpenAI API', 'LangChain', 'RAG', 'Prompt Engineering', 'SQL', 'FastAPI'],
    description: 'Design, test, and optimize complex AI prompts and agent workflows for enterprise generative AI deployments.',
    responsibilities: [
      'Design multi-step prompt chains and LLM agent workflows using LangChain and LangGraph.',
      'Evaluate model outputs with automated evaluation frameworks.',
      'Build internal tools to streamline AI-assisted content workflows.'
    ],
    requirements: [
      '2+ years working with LLM APIs (OpenAI, Anthropic, Gemini).',
      'Strong Python skills and experience building RAG or agent systems.'
    ],
    benefits: ['Fully remote', 'OpenAI API credits provided', 'Flexible schedule', 'Stock options']
  },
  {
    id: 'job-33',
    title: 'Golang Backend Engineer',
    company: 'SynergyBit Technologies',
    logo: '🐹',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Senior',
    salary: '$140,000 - $180,000',
    salaryMin: 140000,
    salaryMax: 180000,
    postedAt: '9 days ago',
    matchScore: 80,
    skills: ['Go', 'Golang', 'Kubernetes', 'gRPC', 'PostgreSQL', 'Docker', 'Microservices'],
    description: 'Engineer high-throughput, low-latency backend services in Go for distributed financial and payments infrastructure.',
    responsibilities: [
      'Build concurrent Go microservices handling 100K+ requests per second.',
      'Design gRPC service contracts and Protobuf schemas.',
      'Optimize PostgreSQL query plans for sub-10ms P99 latencies.'
    ],
    requirements: [
      '4+ years Go backend development in production environments.',
      'Experience with distributed systems, message queues, and service meshes.'
    ],
    benefits: ['Remote-first', 'Equity stake', 'Premium laptop', 'Health & dental']
  },
  {
    id: 'job-34',
    title: 'Flutter Mobile Developer',
    company: 'CrossPlatform Studio',
    logo: '📲',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '₹15,00,000 - ₹25,00,000',
    salaryMin: 15000,
    salaryMax: 25000,
    postedAt: '10 days ago',
    matchScore: 77,
    skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'State Management', 'Git'],
    description: 'Build beautiful cross-platform mobile apps for iOS and Android from a single Flutter codebase.',
    responsibilities: [
      'Develop Flutter widgets and screens following Material 3 and Cupertino guidelines.',
      'Integrate Firebase Auth, Firestore, and Cloud Functions.',
      'Publish and maintain apps on both Apple App Store and Google Play Store.'
    ],
    requirements: [
      '2+ years Flutter/Dart development with published apps.',
      'Understanding of state management (BLoC, Riverpod, Provider).'
    ],
    benefits: ['Remote work', 'Latest MacBook provided', 'App Store success bonuses', 'Health cover']
  },
  {
    id: 'job-35',
    title: 'Technical Lead – Full Stack',
    company: 'NextGen Software',
    logo: '🎯',
    location: 'Hyderabad, India',
    workType: 'Hybrid',
    experienceLevel: 'Lead',
    salary: '₹35,00,000 - ₹55,00,000',
    salaryMin: 35000,
    salaryMax: 55000,
    postedAt: '10 days ago',
    matchScore: 92,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'System Design'],
    description: 'Lead a 12-person engineering team building a B2B SaaS platform, driving technical decisions and delivery excellence.',
    responsibilities: [
      'Define technical architecture, lead sprint planning, and unblock engineering blockers.',
      'Conduct code reviews, establish engineering standards, and mentor team members.',
      'Collaborate with Product and Design to translate requirements into robust engineering solutions.'
    ],
    requirements: [
      '6+ years of software engineering experience with 2+ years in a tech lead role.',
      'Proven ability to lead cross-functional teams and deliver complex projects on time.'
    ],
    benefits: ['Leadership bonus', 'ESOP grants', 'Health & wellness package', 'WFH 3 days/week']
  },
  {
    id: 'job-36',
    title: 'Software Engineer – Internship',
    company: 'Startopia Labs',
    logo: '🌟',
    location: 'Hyderabad, India',
    workType: 'Hybrid',
    experienceLevel: 'Entry',
    salary: '₹20,000 - ₹40,000/month',
    salaryMin: 20000,
    salaryMax: 40000,
    postedAt: '12 days ago',
    matchScore: 86,
    skills: ['JavaScript', 'React', 'Python', 'SQL', 'Git', 'HTML/CSS'],
    description: 'Launch your career with a paid internship building real product features alongside senior engineers at a fast-growing startup.',
    responsibilities: [
      'Develop UI components and REST API integrations under mentorship.',
      'Participate in daily standups, sprints, and design reviews.',
      'Document code and write unit tests for assigned features.'
    ],
    requirements: [
      'Pursuing or recently completed B.E./B.Tech in CS or related field.',
      'Strong coding fundamentals in JavaScript or Python.'
    ],
    benefits: ['Stipend + performance bonus', 'Pre-placement offer for top interns', 'Mentorship', 'Certificate of completion']
  },
  {
    id: 'job-37',
    title: 'Salesforce Developer',
    company: 'CRM Solutions Pro',
    logo: '📋',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '$110,000 - $145,000',
    salaryMin: 110000,
    salaryMax: 145000,
    postedAt: '1 week ago',
    matchScore: 74,
    skills: ['Salesforce', 'Apex', 'LWC', 'SOQL', 'JavaScript', 'REST APIs', 'Flow Builder'],
    description: 'Customize and extend Salesforce CRM platforms for Fortune 1000 clients using Apex, Lightning Web Components, and Flow automations.',
    responsibilities: [
      'Develop custom Apex triggers, classes, and batch jobs.',
      'Build Lightning Web Components for intuitive CRM user experiences.',
      'Design integration patterns connecting Salesforce to ERP and marketing platforms.'
    ],
    requirements: [
      'Salesforce Certified Platform Developer I or II.',
      '2+ years of Salesforce development experience.'
    ],
    benefits: ['Remote work', 'Certification support', 'Competitive compensation', 'Annual bonus']
  },
  {
    id: 'job-38',
    title: 'Technical Content Engineer',
    company: 'DevDocs.io',
    logo: '📝',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '$95,000 - $120,000',
    salaryMin: 95000,
    salaryMax: 120000,
    postedAt: '1 week ago',
    matchScore: 79,
    skills: ['JavaScript', 'Python', 'React', 'Technical Writing', 'Git', 'REST APIs'],
    description: 'Create world-class developer documentation, interactive tutorials, and code examples that help 500K+ developers succeed.',
    responsibilities: [
      'Write clear, accurate API documentation, guides, and developer tutorials.',
      'Build interactive code playgrounds and live SDK demos.',
      'Collaborate with engineering teams to keep docs accurate with every release.'
    ],
    requirements: [
      'Strong coding skills in at least one modern language (JavaScript, Python).',
      'Excellent technical writing and communication skills.'
    ],
    benefits: ['Fully remote', 'Author recognition', 'Conference speaking budget', 'Full health cover']
  },
  {
    id: 'job-39',
    title: 'Backend Engineer (Python / FastAPI)',
    company: 'Zeepto Technologies',
    logo: '⚡',
    location: 'Mumbai, India',
    workType: 'Hybrid',
    experienceLevel: 'Mid',
    salary: '₹18,00,000 - ₹30,00,000',
    salaryMin: 18000,
    salaryMax: 30000,
    postedAt: '1 week ago',
    matchScore: 95,
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs', 'Celery'],
    description: 'Build sub-second delivery logistics and inventory microservices for a 10-minute delivery platform operating at massive scale.',
    responsibilities: [
      'Design and maintain FastAPI microservices handling peak order volumes.',
      'Implement Redis-based caching and Celery task queues for real-time operations.',
      'Collaborate with data science team to integrate ML-based demand predictions.'
    ],
    requirements: [
      '2+ years of Python backend development with FastAPI or Flask.',
      'Experience with high-throughput systems and database performance tuning.'
    ],
    benefits: ['Competitive CTC', 'Performance bonus', 'Zomato/Swiggy allowance', 'Health insurance']
  },
  {
    id: 'job-40',
    title: 'React Native Developer',
    company: 'TravelTech Innovations',
    logo: '✈️',
    location: 'Remote',
    workType: 'Remote',
    experienceLevel: 'Mid',
    salary: '₹16,00,000 - ₹28,00,000',
    salaryMin: 16000,
    salaryMax: 28000,
    postedAt: '2 weeks ago',
    matchScore: 82,
    skills: ['React Native', 'JavaScript', 'TypeScript', 'Redux', 'Firebase', 'REST APIs', 'Expo'],
    description: 'Build feature-rich React Native travel apps for iOS and Android serving millions of travelers worldwide.',
    responsibilities: [
      'Develop cross-platform mobile screens and components in React Native.',
      'Integrate booking APIs, payment gateways, and location services.',
      'Optimize app performance, bundle size, and startup time.'
    ],
    requirements: [
      '2+ years of React Native development with published apps.',
      'Strong understanding of JavaScript/TypeScript and mobile performance optimization.'
    ],
    benefits: ['Remote-first', 'Travel allowance', 'Health & dental insurance', 'Learning budget']
  },
]

export const SAMPLE_RESUME = {
  fullName: 'Srithan Kontham',
  title: 'AI & Full Stack Engineer',
  email: 'konthamsrithan@gmail.com',
  phone: '+91 6281919862',
  location: 'Hyderabad, India',
  summary: 'Computer Science undergraduate with hands-on experience in software development, full-stack web applications, data analytics, and AI-driven solutions. Proficient in React.js, Python, SQL, PostgreSQL, and modern LLM retrieval architectures.',
  skills: {
    frontend: ['JavaScript', 'TypeScript', 'React', 'React.js', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
    backend: ['Python', 'SQL', 'Java', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Supabase', 'RESTful APIs'],
    ai_cloud: ['LLMs', 'RAG (Retrieval-Augmented Generation)', 'pgvector', 'Firebase', 'Docker', 'Git / CI/CD']
  },
  experience: [
    {
      role: 'Full Stack & AI Engineer Intern',
      company: 'TekTalis / OpenText Projects',
      period: '2023 - Present',
      location: 'Hyderabad, India',
      bullets: [
        'Engineered responsive web applications using React.js, Next.js, and Node.js with sub-second API latencies.',
        'Designed and optimized relational database schemas in PostgreSQL and SQL for high-volume data analytics.',
        'Implemented GenAI and semantic search modules utilizing embeddings and vector indexing.'
      ]
    },
    {
      role: 'Data Engineering & Analytics Developer',
      company: 'Academic & Industry Projects',
      period: '2022 - 2023',
      location: 'Hyderabad, India',
      bullets: [
        'Built automated data collection and validation pipelines in Python handling over 100,000 rows.',
        'Created real-time visual dashboards and analytics reports for performance tracking.'
      ]
    }
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'VNR Vignana Jyothi Institute of Engineering & Technology',
      year: '2021 - 2025',
      gpa: '8.5 / 10'
    }
  ],
  certifications: ['Certified Python & SQL Specialist', 'Meta Frontend Developer Certified']
}

export const INTERVIEW_QUESTIONS = [
  {
    id: 'q-1',
    category: 'Technical',
    role: 'Frontend Engineer',
    question: 'How does Next.js App Router differ from Pages Router, and what are the specific benefits of React Server Components (RSC)?',
    hint: 'Focus on client bundle size reduction, streaming SSR, direct database access on server, and automatic code splitting.',
    modelAnswer: 'The App Router leverages React Server Components (RSC) by default. Unlike the Pages Router where all page components were hydrated on the client, RSC execute exclusively on the server without sending JS code to the client bundle. This significantly reduces Time-to-Interactive (TTI) and First Contentful Paint (FCP). Furthermore, App Router introduces nested layouts, parallel routes, intercepting routes, and streaming responses with Suspense boundaries.'
  },
  {
    id: 'q-2',
    category: 'Technical',
    role: 'Data & SQL Engineer',
    question: 'How do you optimize a slow-running SQL query with multiple JOINs and millions of records?',
    hint: 'Discuss EXPLAIN ANALYZE, indexing (B-tree, composite, GIN), avoiding SELECT *, partitioning, and index selectivity.',
    modelAnswer: '1. Analysis: Run EXPLAIN (ANALYZE, BUFFERS) to inspect sequential scans, join algorithms (Hash Join vs Nested Loop), and cost estimates.\n2. Indexing: Create covering B-tree indexes on foreign keys and WHERE clause filter columns. Use partial indexes for skewed boolean columns.\n3. Query Refactoring: Avoid SELECT *; project only needed columns. Replace non-sargable expressions in WHERE conditions (e.g. UPPER(name) -> functional index).\n4. Architecture: Partition massive tables by date/range, and implement read replicas or materialized views for analytical reporting.'
  },
  {
    id: 'q-3',
    category: 'Technical',
    role: 'AI / LLM Engineer',
    question: 'How would you architect a Retrieval-Augmented Generation (RAG) system with low latency and high relevance?',
    hint: 'Mention semantic chunking, dense + sparse hybrid search (BM25 + pgvector), cross-encoder reranking, and citation checks.',
    modelAnswer: '1. Ingestion: Clean text and apply semantic chunking (500 tokens with 100-token overlap). Generate embeddings and store in pgvector with HNSW index.\n2. Hybrid Retrieval: Combine lexical keyword search (BM25) with vector similarity (cosine distance). Pass the top-30 candidates to a cross-encoder reranker to pick the top-5 most relevant chunks.\n3. Prompt Assembly: Inject the top chunks as verified context with strict instructions against hallucination. Stream tokens via SSE to achieve sub-second TTFT (Time To First Token).'
  },
  {
    id: 'q-4',
    category: 'Behavioral',
    role: 'All Roles',
    question: 'Tell me about a challenging technical bug or performance bottleneck you solved under tight deadlines.',
    hint: 'Use the STAR method: Situation, Task, Action, Result. Highlight methodical debugging, root cause analysis, and measurable outcomes.',
    modelAnswer: 'Situation: Ahead of a critical product demo, our application experienced 5-second API query timeouts during user search operations.\nTask: As the engineer responsible for data retrieval, I needed to identify the bottleneck and restore sub-second response times within 24 hours.\nAction: I inspected database query execution plans and server logs. I found missing indexes on two composite foreign keys and redundant N+1 ORM queries. I added targeted composite indexes and refactored the ORM queries into a single batch query with Redis caching.\nResult: Search query response times dropped from 5,200ms to 85ms (a 98% latency reduction), enabling a flawless client presentation and zero dropped transactions.'
  },
  {
    id: 'q-5',
    category: 'Technical',
    role: 'Backend Engineer',
    question: 'Explain the differences between REST, GraphQL, and gRPC — when would you choose each?',
    hint: 'Focus on overfetching vs underfetching, schema contracts, bi-directional streaming, latency, and browser support.',
    modelAnswer: 'REST is simple and widely supported, ideal for public APIs where clients vary. Each resource has a URL; HTTP verbs indicate operations. Downside: overfetching or underfetching data.\nGraphQL lets clients specify exactly what data they need, reducing payload sizes dramatically. Best for complex domain models and frontend teams that need flexibility (e.g., mobile + web).\ngRPC uses Protocol Buffers and HTTP/2, enabling bi-directional streaming and sub-millisecond latency. Ideal for internal microservice communication where performance and schema contracts are critical.'
  },
  {
    id: 'q-6',
    category: 'System Design',
    role: 'Senior Engineer',
    question: 'Design a URL shortening service (like bit.ly) that handles 1 billion URLs and 10,000 redirects per second.',
    hint: 'Discuss Base62 encoding, key generation service, read-heavy caching with Redis, horizontal sharding, and CDN edge caching.',
    modelAnswer: 'Core architecture:\n1. URL Generation: Accept long URL → generate 7-char Base62 hash (unique ID from auto-increment counter). Store mapping in PostgreSQL with TTL.\n2. Read Path (10K RPS): Reverse proxy → Redis cache (LRU, 1-hour TTL for hot URLs) → PostgreSQL (miss only). Cache hit rate ~95%.\n3. Write Path: Rate-limited API → async write to PostgreSQL + Redis warm-up.\n4. Scaling: Shard PostgreSQL by first 2 chars of short URL. Deploy read replicas in multiple regions.\n5. CDN: Cache redirect responses at edge nodes for zero-DB redirects on the hottest URLs.'
  },
  {
    id: 'q-7',
    category: 'Technical',
    role: 'Full Stack Engineer',
    question: 'How does React\'s reconciliation algorithm (Fiber) work, and how do you avoid unnecessary re-renders?',
    hint: 'Cover the virtual DOM diffing, Fiber work units, React.memo, useMemo, useCallback, key prop, and context splitting.',
    modelAnswer: 'React Fiber breaks rendering into interruptible "units of work" that can be paused, aborted, or reused based on priority. During reconciliation, React diffs the new virtual DOM tree against the previous tree, updating only changed nodes.\nTo prevent unnecessary re-renders:\n1. React.memo() for pure functional components.\n2. useMemo() to memoize expensive computed values.\n3. useCallback() to stabilize function references passed as props.\n4. Stable key props in lists — never use array index.\n5. Split large contexts into smaller, focused providers to minimize consumer re-renders.'
  },
  {
    id: 'q-8',
    category: 'Behavioral',
    role: 'All Roles',
    question: 'Describe a time you disagreed with a technical decision made by your team lead or manager. How did you handle it?',
    hint: 'Demonstrate professional communication, evidence-based reasoning, respect for hierarchy, and outcome focus.',
    modelAnswer: 'Situation: My team lead proposed using a monolithic deployment for our new microservices rewrite. I felt this would create the same scaling bottlenecks we were trying to solve.\nTask: I needed to advocate for a containerized deployment without creating conflict.\nAction: I prepared a technical comparison deck with benchmarks, cost projections, and migration complexity for both approaches. I requested a 30-minute architecture review and presented the data objectively, acknowledging the valid concerns about operational complexity.\nResult: We agreed on a phased approach — starting with a modular monolith, then containerizing the two highest-traffic services first. This reduced risk while enabling us to scale where needed. The approach later became our team standard.'
  }
]
