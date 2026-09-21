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
  {
    slug: "what-is-a-reverse-recruiter",
    title: "What Is a Reverse Recruiter? (And Is It Worth Paying For)",
    excerpt:
      "A reverse recruiter works for the job seeker, not the employer. Here's what the role actually involves, and how to tell if it's worth the investment for your search.",
    category: "Reverse Recruiting",
    publishedAt: "2026-07-10",
    seoTitle: "What Is a Reverse Recruiter? | Reverse Recruiting Explained",
    seoDescription:
      "Reverse recruiters work for job seekers instead of employers. Learn exactly what they do, how they differ from a career coach, and whether it's worth paying for.",
    content: [
      "A traditional recruiter is paid by a company to fill an open role — their loyalty, and their paycheck, belongs to the employer. A reverse recruiter flips that relationship: they're hired directly by the job seeker, and their only job is to get that one person hired.",
      "In practice, that means a reverse recruiter takes over the parts of the job search that eat the most time and produce the least reward: finding roles that actually match your background, tailoring your resume and application to each one, tracking outreach so nothing falls through the cracks, and often submitting applications on your behalf. Some also manage direct outreach to hiring managers and recruiters at target companies — the kind of warm, proactive contact that job boards can't replicate.",
      "This is different from a career coach, who typically advises on strategy but leaves the execution to you, and different from a staffing agency, which represents the employer's interest even when it's presented as helping the candidate. A reverse recruiter is closer to having a personal agent: someone whose incentive is fully aligned with getting you hired faster, not filling a specific requisition.",
      "Whether it's worth paying for usually comes down to two things: how much your time is worth, and how much a faster job search is worth to you financially. If you're currently employed and searching quietly, or if every week of unemployment has a real dollar cost, offloading 10-15 hours a week of tailoring and tracking to someone else can pay for itself many times over — especially when it also means a more consistent, professional application than most candidates submit on their own.",
    ],
  },
  {
    slug: "should-you-use-chatgpt-to-write-your-resume",
    title: "Should You Use ChatGPT to Write Your Resume in 2026?",
    excerpt:
      "AI tools can draft a resume in seconds, but recruiters are getting better at spotting them. Here's where ChatGPT actually helps — and where it quietly costs you interviews.",
    category: "Resume Tips",
    publishedAt: "2026-08-14",
    seoTitle: "Should You Use ChatGPT for Your Resume? What Actually Works",
    seoDescription:
      "ChatGPT can help brainstorm resume bullet points, but generic AI resumes are getting flagged by recruiters. Here's how to use AI without hurting your job search.",
    content: [
      "ChatGPT and similar tools have made it trivially easy to generate a resume in under a minute — and for a first draft or a brainstorming pass, that's genuinely useful. The problem is what happens next: most people copy the output with light edits, and the result reads exactly like what it is.",
      "Recruiters who screen hundreds of resumes a month have started recognizing the pattern quickly: the same overused phrases ('proven track record,' 'results-driven professional'), the same generic bullet structure, and achievements that sound impressive but are vague enough to apply to anyone. That sameness is the opposite of what gets a resume noticed, and some hiring managers now view an obviously AI-generated resume as a signal the candidate didn't put in real effort.",
      "There's also a more practical issue: ChatGPT doesn't know your actual achievements, the specific metrics that make them credible, or which keywords the applicant tracking system for a specific job is scanning for. Left unedited, it tends to invent plausible-sounding but generic accomplishments rather than sharpening your real ones.",
      "The tools are genuinely useful for narrower jobs — rephrasing an awkward sentence, checking for consistent tense, or generating a first pass at a cover letter you'll heavily rewrite. What they can't replace is someone who knows how ATS parsing actually works, has read thousands of job descriptions, and can pull the specific, quantified achievements out of your experience that a generic prompt never will.",
    ],
  },
  {
    slug: "how-much-does-a-career-coach-or-resume-writer-cost",
    title: "How Much Does a Career Coach or Resume Writer Cost?",
    excerpt:
      "Prices for career services range from under $100 to several thousand dollars. Here's what actually drives the difference, and how to figure out what's worth paying for.",
    category: "Pricing & Value",
    publishedAt: "2026-09-05",
    seoTitle: "Career Coach & Resume Writer Cost Guide (2026)",
    seoDescription:
      "What does a career coach, resume writer, or reverse recruiter actually cost? A breakdown of pricing tiers and what drives the difference in value.",
    content: [
      "Career services span an unusually wide price range. A basic resume template or a single 30-minute coaching call might run $50-150. A professionally rewritten, ATS-optimized resume from an experienced writer typically lands between $200-400. Full-service reverse recruiting — where someone manages your applications and outreach on an ongoing basis — is usually priced monthly, commonly $500-1,000+ depending on volume and level of service. Executive-level, white-glove search support can run into the thousands.",
      "The difference isn't arbitrary. A $50 resume template gives you formatting; a $300 resume rewrite gives you a document rebuilt around your actual achievements and tuned for ATS parsing; a monthly reverse-recruiting retainer gives you ongoing, done-for-you execution instead of a one-time deliverable. You're paying for depth of work and how much of the process is handled for you, not just for a document.",
      "The right tier depends on where you're stuck. If your resume is solid but you're not getting enough volume out the door, a one-time optimization package is usually enough. If you're actively job searching while working full-time, or you've been searching for months without traction, the ongoing done-for-you model tends to be worth the higher monthly cost simply because of the hours it gives back.",
      "A useful gut check before paying for anything: ask what happens after the deliverable is done. A one-time resume rewrite should still leave you with a document you can use for months. A retainer should come with a clear, ongoing weekly cadence — job targets, applications submitted, and outreach made — not just vague 'support.' If a provider can't describe that cadence specifically, that's a good reason to look elsewhere.",
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
