import { NextRequest, NextResponse } from 'next/server';
import { scrapeJobs, getSearchKeywords } from '@/lib/scraper/jobScraper';
import { egyptianCareers } from '@/lib/data/egyptian-careers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Cache for scraped jobs (15 minutes)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pathId = searchParams.get('pathId');

    if (!pathId) {
      return NextResponse.json({ error: 'pathId is required' }, { status: 400 });
    }

    // Check cache
    const cached = cache.get(pathId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        jobs: cached.data,
        source: 'cache',
        timestamp: new Date(cached.timestamp).toISOString(),
      });
    }

    // Get search keywords for this path
    const keywords = getSearchKeywords(pathId);

    if (keywords.length === 0) {
      return NextResponse.json({ error: 'Invalid pathId' }, { status: 400 });
    }

    // Scrape live jobs
    const scrapedJobs = await scrapeJobs(keywords);

    // Get static jobs from our database as fallback
    const staticJobs = egyptianCareers
      .filter((career) => {
        // Match based on category or keywords
        return keywords.some((keyword) =>
          career.title.toLowerCase().includes(keyword.toLowerCase()) ||
          career.category.toLowerCase().includes(keyword.toLowerCase())
        );
      })
      .slice(0, 10)
      .map((career) => ({
        title: career.title,
        company: career.organization,
        location: career.location,
        source: 'PathFinder Database',
        url: career.applicationUrl || '#',
        type: career.type,
        salaryRange: career.salaryRange,
      }));

    // Combine scraped and static jobs
    const allJobs = [...scrapedJobs, ...staticJobs];

    // Cache the results
    cache.set(pathId, { data: allJobs, timestamp: Date.now() });

    return NextResponse.json({
      jobs: allJobs,
      source: 'live',
      scrapedCount: scrapedJobs.length,
      staticCount: staticJobs.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Job scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs', details: error.message },
      { status: 500 }
    );
  }
}
