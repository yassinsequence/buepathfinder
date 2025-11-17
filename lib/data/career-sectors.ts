// 3-Layer Career Exploration Structure for BUE Students
// Layer 1: Sectors → Layer 2: Functions/Roles → Layer 3: Jobs

export interface CareerSector {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  overview: string;
  whyThisSector: string;
  skillsNeeded: string[];
  functions: CareerFunction[];
  facultyAlignment: string[];
  salaryRange: { min: number; max: number; currency: string };
}

export interface CareerFunction {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  dayInLife: string;
  careerPath: string;
  requiredSkills: string[];
  typicalTitles: string[];
  salaryRange: { min: number; max: number; currency: string };
  jobIds: string[]; // References to actual job postings
  growthOpportunities: string;
}

export const careerSectors: CareerSector[] = [
  {
    id: 'investment',
    name: 'Investment & Finance',
    description: 'Capital markets, asset management, and investment services',
    icon: '💰',
    color: 'from-emerald-600 to-emerald-800',
    overview: 'The investment sector connects capital with opportunities, helping companies grow and investors build wealth. From analyzing stocks to structuring billion-dollar deals, this sector offers diverse paths for analytical minds.',
    whyThisSector: 'If you love numbers, strategic thinking, and making high-stakes decisions that shape economies, investment is where theory meets real-world impact. Every day brings new challenges in a fast-paced, intellectually stimulating environment.',
    skillsNeeded: ['Financial Modeling', 'Excel', 'Valuation', 'Market Analysis', 'Presentation Skills', 'Attention to Detail'],
    facultyAlignment: ['Business Administration, Economics & Political Science'],
    salaryRange: { min: 18000, max: 50000, currency: 'EGP' },
    functions: [
      {
        id: 'investment-banking',
        name: 'Investment Banking (IB)',
        description: 'Advisory services for mergers, acquisitions, and capital raising',
        detailedDescription: 'Investment bankers are the dealmakers of finance. They help companies raise capital, execute M&A transactions, and provide strategic advisory. Working in IB means long hours but unparalleled learning opportunities and compensation.',
        dayInLife: 'Morning: Update pitch deck for pharma company merger. Afternoon: Financial modeling for IPO valuation. Evening: Client dinner to discuss acquisition strategy. Late night: Refine presentation for tomorrow\'s board meeting.',
        careerPath: 'Analyst (2-3 years) → Associate (2-3 years) → VP (3-4 years) → Director → Managing Director. Many pivot to private equity, hedge funds, or corporate development after 2-5 years.',
        requiredSkills: ['Financial Modeling', 'PowerPoint', 'Excel', 'Valuation (DCF, Comps)', 'Deal Structuring', 'Client Management'],
        typicalTitles: ['Investment Banking Analyst', 'IB Associate', 'M&A Analyst', 'Corporate Finance Associate'],
        salaryRange: { min: 25000, max: 50000, currency: 'EGP' },
        jobIds: ['bus-3'],
        growthOpportunities: 'Exit to PE/VC, corporate development, or stay for VP+ track with multimillion-dollar compensation.',
      },
      {
        id: 'private-equity',
        name: 'Private Equity (PE)',
        description: 'Buying, improving, and selling companies for profit',
        detailedDescription: 'PE professionals acquire companies, work to improve their operations and value, then sell them for profit. It\'s about being an owner, not just an advisor. You get your hands dirty in operations while maintaining financial rigor.',
        dayInLife: 'Review investment memos for potential acquisitions. Meet with portfolio company CEOs to discuss growth strategy. Analyze market trends in healthcare sector. Negotiate term sheets with sellers.',
        careerPath: 'Typically requires 2-3 years IB experience first. PE Associate → Senior Associate → VP → Principal → Partner. Long-term partnership track is lucrative but competitive.',
        requiredSkills: ['LBO Modeling', 'Due Diligence', 'Value Creation', 'Operations Strategy', 'Negotiation', 'Portfolio Management'],
        typicalTitles: ['PE Associate', 'Investment Associate', 'Portfolio Manager', 'Principal Investor'],
        salaryRange: { min: 30000, max: 60000, currency: 'EGP' },
        jobIds: ['bus-3'],
        growthOpportunities: 'Partner track with carried interest (share of profits), or start your own fund. Top performers earn millions.',
      },
      {
        id: 'venture-capital',
        name: 'Venture Capital (VC)',
        description: 'Investing in early-stage, high-growth startups',
        detailedDescription: 'VCs find and fund the next big things - from fintech apps to biotech breakthroughs. You\'ll meet founders, assess markets, and help startups scale. It\'s part investor, part mentor, part trend forecaster.',
        dayInLife: 'Morning pitch meetings with 3 startups. Research emerging AI applications. Call portfolio company founder about hiring challenges. Evening: Networking event at startup hub.',
        careerPath: 'Analyst → Associate → Principal → Partner. Alternative entry: successful entrepreneur or domain expert joining as partner.',
        requiredSkills: ['Market Research', 'Startup Evaluation', 'Network Building', 'Trend Analysis', 'Mentorship', 'Term Sheet Negotiation'],
        typicalTitles: ['VC Analyst', 'Investment Associate', 'Venture Partner', 'Principal'],
        salaryRange: { min: 20000, max: 45000, currency: 'EGP' },
        jobIds: ['bus-4'],
        growthOpportunities: 'Partner at major VC fund, angel investing, or starting your own VC fund. Many VCs also serve on startup boards.',
      },
      {
        id: 'asset-management',
        name: 'Asset Management',
        description: 'Managing investment portfolios for individuals and institutions',
        detailedDescription: 'Asset managers invest money on behalf of clients - pension funds, endowments, or wealthy individuals. You\'ll research opportunities, build diversified portfolios, and deliver returns while managing risk.',
        dayInLife: 'Analyze market movements and adjust portfolio allocations. Research emerging markets bonds. Prepare quarterly performance report for pension fund client. Attend earnings call for portfolio company.',
        careerPath: 'Research Analyst → Portfolio Manager → Senior PM → CIO. CFA certification highly valued.',
        requiredSkills: ['Portfolio Construction', 'Risk Management', 'Market Research', 'Client Relations', 'Performance Analysis'],
        typicalTitles: ['Portfolio Manager', 'Research Analyst', 'Fund Manager', 'Investment Analyst'],
        salaryRange: { min: 22000, max: 40000, currency: 'EGP' },
        jobIds: ['bus-2'],
        growthOpportunities: 'Manage larger funds, launch your own fund, or move to hedge funds for higher risk/reward.',
      },
    ],
  },
  // ... More sectors to be added
];
