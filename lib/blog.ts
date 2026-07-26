export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

// Placeholder posts — swap this module for Prisma queries (`prisma.blogPost.findMany`)
// once the database is connected. Keeping the data-access surface here means only
// this file needs to change.
const posts: BlogPostData[] = [
  {
    slug: "5-resume-mistakes-costing-you-interviews",
    title: "5 Resume Mistakes That Are Costing You Interviews",
    excerpt:
      "Most resumes fail before a human ever reads them. Here are the five most common mistakes that get qualified candidates filtered out by ATS software.",
    category: "Resume Tips",
    publishedAt: "2026-06-02",
    content: [
      "Applicant Tracking Systems (ATS) reject the majority of resumes before a recruiter ever sees them — often for reasons that have nothing to do with your qualifications.",
      "1. Using tables, columns, or graphics that ATS software can't parse correctly. 2. Missing exact keyword matches from the job description. 3. Listing responsibilities instead of measurable achievements. 4. Inconsistent date formatting that confuses parsing software. 5. A generic, one-size-fits-all resume sent to every application.",
      "The fix isn't complicated, but it does require rebuilding your resume around how hiring systems actually work — not how resumes 'used to' work ten years ago. A clean, single-column format with clear section headers, quantified achievements, and role-specific keywords will outperform a beautifully designed resume every time.",
    ],
  },
  {
    slug: "hidden-job-market-explained",
    title: "The Hidden Job Market: Why 70% of Jobs Are Never Posted",
    excerpt:
      "Job boards only show a fraction of available roles. Here's how to access the hidden job market that most candidates never see.",
    category: "Job Search Strategies",
    publishedAt: "2026-05-18",
    content: [
      "Industry estimates suggest that up to 70% of jobs are filled through networking, referrals, and direct outreach before they're ever posted publicly.",
      "This is why applying only through job boards puts you in competition with hundreds of other applicants for a shrinking pool of visible roles — while the majority of opportunities go to candidates who found them another way.",
      "Accessing the hidden job market means proactive outreach to hiring managers, leveraging warm introductions, and building relationships with recruiters before you need them. It's more work upfront, but it dramatically increases your odds of landing an offer.",
    ],
  },
  {
    slug: "linkedin-profile-checklist",
    title: "The Complete LinkedIn Profile Checklist for Job Seekers",
    excerpt:
      "Recruiters spend an average of 6 seconds scanning a LinkedIn profile. Make sure yours passes the test with this checklist.",
    category: "LinkedIn Tips",
    publishedAt: "2026-05-04",
    content: [
      "Your LinkedIn profile is often the first impression a recruiter forms of you — sometimes before they even open your resume.",
      "Key elements to optimize: a professional headshot, a headline that goes beyond your job title, a keyword-rich 'About' section written in first person, quantified achievements under each role, and skills endorsed by real connections.",
      "Turning on the 'Open to Work' setting (visible to recruiters only) and engaging with industry content regularly can also meaningfully increase profile views and inbound recruiter messages.",
    ],
  },
  {
    slug: "star-method-interview-answers",
    title: "How to Answer Behavioral Interview Questions Using the STAR Method",
    excerpt:
      "\"Tell me about a time when...\" questions trip up even strong candidates. Here's a simple framework to structure compelling answers.",
    category: "Interview Preparation",
    publishedAt: "2026-04-20",
    content: [
      "The STAR method — Situation, Task, Action, Result — gives you a repeatable structure for answering behavioral interview questions clearly and confidently.",
      "Situation: briefly set the context. Task: explain your specific responsibility. Action: describe exactly what you did (this should be the longest part of your answer). Result: quantify the outcome wherever possible.",
      "Preparing 6-8 STAR stories in advance — covering leadership, conflict resolution, failure, and achievement — means you'll rarely be caught off guard, no matter how the question is phrased.",
    ],
  },
  {
    slug: "negotiating-your-next-offer",
    title: "How to Negotiate Your Next Job Offer (Without Losing It)",
    excerpt:
      "Most candidates leave money on the table simply because they never ask. Here's how to negotiate confidently and professionally.",
    category: "Salary Negotiation",
    publishedAt: "2026-04-05",
    content: [
      "Research shows that candidates who negotiate typically increase their starting offer by 5-15% — yet most people accept the first number out of fear of losing the offer.",
      "The key is framing: negotiation isn't confrontation, it's a normal part of the hiring process that employers expect. Come prepared with market-rate data, lead with enthusiasm for the role, and ask open-ended questions like 'Is there flexibility in the base salary?'",
      "Remember that compensation includes more than salary — sign-on bonuses, equity, additional PTO, and remote flexibility are all negotiable levers.",
    ],
  },
  {
    slug: "remote-job-search-tips",
    title: "6 Tips for Landing a Remote Job in a Competitive Market",
    excerpt:
      "Remote roles attract significantly more applicants. Here's how to stand out and prove you can thrive outside the office.",
    category: "Remote Jobs",
    publishedAt: "2026-03-22",
    content: [
      "Remote postings often receive 2-3x the applications of comparable in-office roles, which means differentiation matters even more.",
      "Highlight prior remote or distributed-team experience explicitly, even if it was informal. Demonstrate strong written communication in your application itself. Be specific about your home office setup and time-zone availability.",
      "During interviews, come prepared with examples of how you stay organized and proactive without in-person oversight — this is the number one concern hiring managers have about remote hires.",
    ],
  },
];

export function getAllBlogPosts(): BlogPostData[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  return posts.find((post) => post.slug === slug);
}
