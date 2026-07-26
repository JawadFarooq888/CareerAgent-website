export const services = [
  {
    slug: "reverse-recruiting",
    title: "Reverse Recruiting",
    summary:
      "I work as your personal recruiter — sourcing roles, tailoring applications, and managing outreach so you can focus on interviews, not job boards.",
    icon: "Target",
  },
  {
    slug: "job-search-assistance",
    title: "Job Search Assistance",
    summary:
      "A structured, weekly job search plan targeting roles that match your goals, with hidden-market outreach beyond public listings.",
    icon: "Search",
  },
  {
    slug: "resume-writing",
    title: "Resume Writing & ATS Optimization",
    summary:
      "A keyword-optimized, ATS-friendly resume rebuilt around your achievements so it passes screening software and impresses hiring managers.",
    icon: "FileText",
  },
  {
    slug: "cover-letter-writing",
    title: "Cover Letter Writing",
    summary:
      "Compelling, role-specific cover letters that tell your story and connect your experience directly to what employers are looking for.",
    icon: "Mail",
  },
  {
    slug: "linkedin-optimization",
    title: "LinkedIn Profile Optimization",
    summary:
      "A fully optimized LinkedIn profile designed to attract recruiters, rank in searches, and reinforce your personal brand.",
    icon: "Share2",
  },
  {
    slug: "job-application-management",
    title: "Job Application Management",
    summary:
      "End-to-end tracking and submission of applications on your behalf, so no opportunity slips through the cracks.",
    icon: "ClipboardList",
  },
  {
    slug: "interview-coaching",
    title: "Interview Coaching",
    summary:
      "Mock interviews, real-time feedback, and proven frameworks (like STAR) to help you walk into every interview with confidence.",
    icon: "MessagesSquare",
  },
  {
    slug: "career-consulting",
    title: "Career Consulting",
    summary:
      "One-on-one strategy sessions to clarify your career direction, identify target companies, and build a realistic action plan.",
    icon: "Compass",
  },
  {
    slug: "salary-negotiation",
    title: "Salary Negotiation Guidance",
    summary:
      "Data-backed negotiation strategy and scripts to help you secure the best possible offer — salary, equity, and benefits.",
    icon: "HandCoins",
  },
  {
    slug: "career-planning",
    title: "Career Planning",
    summary:
      "Long-term career mapping that aligns your skills and ambitions with realistic, achievable milestones over the next 3-5 years.",
    icon: "Map",
  },
] as const;

export const faqs = [
  {
    question: "What exactly does a Reverse Recruiter do?",
    answer:
      "A reverse recruiter works for you, the job seeker, instead of an employer. I handle the time-consuming parts of the job search — finding roles, tailoring applications, submitting them, and coordinating outreach — so you can focus your energy on networking and interviewing.",
  },
  {
    question: "How is this different from a career coach?",
    answer:
      "A career coach typically advises you on strategy. I do that too, but I also do the hands-on work: application management, outreach, and submissions. Think of it as coaching plus execution.",
  },
  {
    question: "How long does the process usually take?",
    answer:
      "Most clients see interview activity within 2-4 weeks of starting, though timelines vary based on your industry, target role, and market conditions. We'll set realistic expectations during your free consultation.",
  },
  {
    question: "Do you guarantee a job offer?",
    answer:
      "No ethical career service can guarantee an offer, since hiring decisions are made by employers. What I can guarantee is a professional, ATS-optimized application, a consistent search process, and expert guidance through every stage.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "I primarily support professionals in tech, business operations, sales, marketing, and finance, but I've helped clients across many industries. Book a free consultation to discuss your specific background.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a free consultation using the button on this site. We'll discuss your goals, review your current materials, and recommend the right service package for your situation.",
  },
] as const;

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Product Manager",
    company: "Hired at a Series B startup",
    quote:
      "Within three weeks of working together, I had five interviews lined up — more than I'd gotten in three months on my own. The resume rewrite alone made a huge difference.",
    rating: 5,
  },
  {
    name: "Marcus Webb",
    role: "Software Engineer",
    company: "Hired at a Fortune 500 company",
    quote:
      "Having someone manage my applications while I kept my day job was a game changer. The interview coaching sessions were worth the investment on their own.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Marketing Director",
    company: "Landed a 22% salary increase",
    quote:
      "The salary negotiation guidance helped me secure an offer well above the initial number. I wouldn't have had the confidence to push back without that prep.",
    rating: 5,
  },
  {
    name: "David Okafor",
    role: "Data Analyst",
    company: "Hired at a healthcare tech company",
    quote:
      "I'd been searching on my own for six months with almost no response. Within a month of the LinkedIn overhaul and application management, I had three offers to choose from.",
    rating: 5,
  },
  {
    name: "Jessica Tran",
    role: "Operations Manager",
    company: "Transitioned into a new industry",
    quote:
      "I was trying to pivot industries and had no idea how to position my experience. The career consulting sessions completely reframed how I told my story.",
    rating: 5,
  },
  {
    name: "Ryan Alvarez",
    role: "Sales Executive",
    company: "Hired at a Series A startup, remote",
    quote:
      "The mock interviews were brutally honest in the best way. By the time I got to the real thing, nothing caught me off guard.",
    rating: 5,
  },
] as const;

export const pricingPackages = [
  {
    name: "Starter",
    price: "$249",
    billingNote: "one-time",
    description: "For job seekers who need a strong foundation.",
    features: [
      "ATS-optimized resume rewrite",
      "Tailored cover letter template",
      "LinkedIn profile audit",
      "1 strategy call (30 min)",
    ],
    highlighted: false,
    ctaText: "Get Started",
  },
  {
    name: "Accelerator",
    price: "$799",
    billingNote: "per month",
    description: "Full reverse-recruiting support for an active search.",
    features: [
      "Everything in Starter",
      "Done-for-you job applications (up to 20/week)",
      "Full LinkedIn optimization",
      "Weekly strategy calls",
      "Interview coaching (2 sessions/month)",
    ],
    highlighted: true,
    ctaText: "Book a Consultation",
  },
  {
    name: "Executive",
    price: "Custom",
    billingNote: "tailored engagement",
    description: "White-glove search support for senior and executive roles.",
    features: [
      "Everything in Accelerator",
      "Unlimited interview coaching",
      "Salary negotiation support",
      "Direct outreach to target companies",
      "Dedicated priority support",
    ],
    highlighted: false,
    ctaText: "Contact Me",
  },
] as const;
