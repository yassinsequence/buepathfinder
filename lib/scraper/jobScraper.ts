// Web scraper for Egyptian job boards
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedJob {
  title: string;
  company: string;
  location: string;
  source: string;
  url: string;
  description?: string;
  posted?: string;
}

// Scrape Wuzzuf
async function scrapeWuzzuf(keyword: string): Promise<ScrapedJob[]> {
  try {
    const searchUrl = `https://wuzzuf.net/search/jobs/?q=${encodeURIComponent(keyword)}&a=hpb`;
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const jobs: ScrapedJob[] = [];

    $('.css-1gatmva').each((_, element) => {
      const title = $(element).find('h2 a').text().trim();
      const company = $(element).find('.css-17s97q8').first().text().trim();
      const location = $(element).find('.css-5wys0k').text().trim();
      const url = $(element).find('h2 a').attr('href') || '';

      if (title && company) {
        jobs.push({
          title,
          company,
          location: location || 'Egypt',
          source: 'Wuzzuf',
          url: url.startsWith('http') ? url : `https://wuzzuf.net${url}`,
        });
      }
    });

    return jobs.slice(0, 10); // Limit to 10 results
  } catch (error) {
    console.error('Wuzzuf scraping error:', error);
    return [];
  }
}

// Scrape Forasna
async function scrapeForasna(keyword: string): Promise<ScrapedJob[]> {
  try {
    const searchUrl = `https://www.forasna.com/jobs?search=${encodeURIComponent(keyword)}`;
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const jobs: ScrapedJob[] = [];

    $('.job-card, .job-item').each((_, element) => {
      const title = $(element).find('.job-title, h3, h2').first().text().trim();
      const company = $(element).find('.company-name, .employer-name').first().text().trim();
      const location = $(element).find('.location, .job-location').first().text().trim();
      const url = $(element).find('a').first().attr('href') || '';

      if (title && company) {
        jobs.push({
          title,
          company,
          location: location || 'Egypt',
          source: 'Forasna',
          url: url.startsWith('http') ? url : `https://www.forasna.com${url}`,
        });
      }
    });

    return jobs.slice(0, 10);
  } catch (error) {
    console.error('Forasna scraping error:', error);
    return [];
  }
}

// Main scraper function
export async function scrapeJobs(keywords: string[]): Promise<ScrapedJob[]> {
  const allJobs: ScrapedJob[] = [];

  for (const keyword of keywords) {
    try {
      const [wuzzufJobs, forasnaJobs] = await Promise.all([
        scrapeWuzzuf(keyword),
        scrapeForasna(keyword),
      ]);

      allJobs.push(...wuzzufJobs, ...forasnaJobs);
    } catch (error) {
      console.error(`Error scraping jobs for ${keyword}:`, error);
    }
  }

  // Remove duplicates based on title and company
  const uniqueJobs = allJobs.filter((job, index, self) =>
    index === self.findIndex((j) => j.title === job.title && j.company === job.company)
  );

  return uniqueJobs;
}

// Map career path to search keywords
export function getSearchKeywords(pathId: string): string[] {
  const keywordMap: Record<string, string[]> = {
    'software-tech': ['software engineer', 'developer', 'data scientist', 'programmer'],
    'industrial-engineering': ['mechanical engineer', 'civil engineer', 'electrical engineer'],
    'sustainability': ['environmental engineer', 'renewable energy', 'sustainability'],
    'business-finance': ['business analyst', 'financial analyst', 'consultant'],
    'media-marketing': ['marketing', 'digital marketing', 'content creator', 'social media'],
    'creative-design': ['graphic designer', 'UX designer', 'UI designer'],
    'research-education': ['teacher', 'researcher', 'academic', 'translator'],
    'legal-compliance': ['lawyer', 'legal', 'compliance officer'],
    'healthcare-clinical': ['dentist', 'nurse', 'doctor', 'healthcare'],
    'pharma-biotech': ['pharmacist', 'pharmaceutical', 'clinical research'],
    'rehabilitation': ['physiotherapist', 'physical therapist', 'rehabilitation'],
  };

  return keywordMap[pathId] || [];
}
