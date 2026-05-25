import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getPost(slug: string) {
  const res = await fetch(`http://localhost:8000/api/posts/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

async function getAllPosts() {
  const res = await fetch('http://localhost:8000/api/posts', {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

// Estimate reading time from raw HTML
function readingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Map slug → accent color pair [from, to] for hero gradient
const SLUG_COLORS: Record<string, [string, string]> = {
  'email-communication':                  ['#2563eb', '#4f46e5'],
  'effective-business-writing':           ['#0891b2', '#2563eb'],
  'memo':                                 ['#7c3aed', '#4f46e5'],
  'business-letter':                      ['#059669', '#2563eb'],
  'minutes-of-meeting':                   ['#d97706', '#dc2626'],
  'importance-of-data':                   ['#db2777', '#7c3aed'],
  'faq':                                  ['#0d9488', '#0891b2'],
};

const CATEGORY_LABEL: Record<string, string> = {
  'email-communication':                  'Digital Communication',
  'effective-business-writing':           'Writing Skills',
  'memo':                                 'Internal Communication',
  'business-letter':                      'External Communication',
  'minutes-of-meeting':                   'Documentation',
  'importance-of-data':                   'Data & Analytics',
  'faq':                                  'FAQ',
};

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allPosts] = await Promise.all([getPost(slug), getAllPosts()]);

  if (!article) notFound();

  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const mins = readingTime(article.content ?? '');
  const [gradFrom, gradTo] = SLUG_COLORS[slug] ?? ['#2563eb', '#4f46e5'];
  const category = CATEGORY_LABEL[slug] ?? 'Business Communication';

  // Suggest up to 3 other posts
  const related = (Array.isArray(allPosts) ? allPosts : allPosts?.data ?? [])
    .filter((p: any) => p.slug !== slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">

      {/* ── HERO HEADER ─────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${gradFrom} 0%, ${gradTo} 100%)` }}
      >
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/3 rounded-full blur-3xl" />
          {/* grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors mb-10 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to Home
          </Link>

          {/* Category + reading time badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
              {category}
            </span>
            <span className="bg-white/10 backdrop-blur-sm text-white/80 text-xs px-3 py-1 rounded-full border border-white/10">
              ⏱ {mins} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6 drop-shadow-sm">
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              >
                KB
              </div>
              <span className="text-white/80 font-medium">KombisBlog Editorial</span>
            </div>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '56px' }}>
            <path d="M0,56 C480,0 960,0 1440,56 L1440,56 L0,56 Z" className="fill-gray-50 dark:fill-slate-900 transition-colors duration-300" />
          </svg>
        </div>
      </div>

      {/* ── ARTICLE BODY ────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 pb-24">

        {/* Article image */}
        {article.image_url && (
          <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden shadow-xl mb-12 ring-1 ring-gray-200 dark:ring-slate-700">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Description / lead */}
        {article.description && (
          <p className="text-xl text-gray-500 dark:text-slate-400 leading-relaxed mb-10 font-light border-l-4 pl-5 py-1 transition-colors duration-300"
             style={{ borderColor: gradFrom }}>
            {article.description}
          </p>
        )}

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
          <div className="w-2 h-2 rounded-full" style={{ background: gradFrom }} />
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
        </div>

        {/* Main content */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* ── BOTTOM DIVIDER ── */}
        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between transition-colors duration-300">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to all articles
          </Link>
          <span className="text-xs text-gray-400 dark:text-slate-500">{mins} min read · {formattedDate}</span>
        </div>
      </div>

      {/* ── RELATED POSTS ───────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Continue Reading</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm mb-8 transition-colors duration-300">More articles from KombisBlog</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p: any) => {
                const [rf, rt] = SLUG_COLORS[p.slug] ?? ['#2563eb', '#4f46e5'];
                return (
                  <Link
                    key={p.slug}
                    href={`/artikel/${p.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-600 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-900"
                  >
                    <div
                      className="h-24 flex items-end p-4"
                      style={{ background: `linear-gradient(135deg, ${rf} 0%, ${rt} 100%)` }}
                    >
                      <span className="text-white/70 text-xs font-bold uppercase tracking-widest">
                        {CATEGORY_LABEL[p.slug] ?? 'Article'}
                      </span>
                    </div>
                    <div className="flex-1 p-5">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-gray-400 dark:text-slate-500 text-xs line-clamp-2 transition-colors duration-300">{p.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}