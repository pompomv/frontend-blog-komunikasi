import Link from 'next/link';

const authors = [
  {
    name: 'Kontol 1',
    nim: '2300000001',
    role: 'Lead Writer & Email Communication',
    bio: 'Specializes in digital business communication, with a focus on professional email writing, etiquette, and cross-organizational correspondence. Passionate about making formal communication accessible and effective for modern workplaces.',
    initials: 'K1',
    gradient: ['#2563eb', '#4f46e5'],
    topics: ['Email Communication', 'Business Etiquette', 'Digital Tools'],
  },
  {
    name: 'Kontol 2',
    nim: '2300000002',
    role: 'Content Lead & Documentation Specialist',
    bio: 'Focuses on formal written communication, business letters, and meeting documentation. Believes that well-structured records are the backbone of professional accountability and organizational trust.',
    initials: 'K2',
    gradient: ['#059669', '#2563eb'],
    topics: ['Business Letters', 'Meeting Minutes', 'Formal Writing'],
  },
  {
    name: 'Kontol 3',
    nim: '2300000003',
    role: 'Research Lead & Data Communication',
    bio: 'Explores how data and evidence-based writing elevate the credibility of business messages. Her work bridges analytical thinking and clear prose, helping organizations communicate decisions with confidence and precision.',
    initials: 'K3',
    gradient: ['#db2777', '#7c3aed'],
    topics: ['Data in Communication', 'Effective Writing', 'Research & Analysis'],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div className="bg-slate-900 dark:bg-white relative overflow-hidden transition-colors duration-300">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
          <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" className="fill-white dark:fill-slate-900 transition-colors duration-300" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-900 text-sm font-medium transition-colors mb-10 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to Home
          </Link>

          <span className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-4 block">
            The Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white dark:text-slate-900 leading-tight mb-5 transition-colors duration-300">
            Meet the Authors
          </h1>
          <p className="text-slate-400 dark:text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            KombisBlog is written and maintained by three students from the CCIT FTUI in partnership with Jakarta State Polytechnic,
            dedicated to making professional writing skills clear, practical, and accessible.
          </p>
        </div>
      </div>

      {/* Wave: slate-900 → gray-50 in light mode, white -> slate-900 in dark mode */}
      <div className="w-full bg-gray-50 dark:bg-slate-900 overflow-hidden leading-none transition-colors duration-300">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '60px' }}>
          <rect width="1440" height="60" className="fill-gray-50 dark:fill-slate-900 transition-colors duration-300" />
          <path d="M0,60 C480,0 960,0 1440,60 L1440,0 L0,0 Z" className="fill-slate-900 dark:fill-white transition-colors duration-300" />
        </svg>
      </div>

      {/* ── AUTHOR CARDS ─────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col gap-10">
          {authors.map((author, i) => {
            const [from, to] = author.gradient;
            const isEven = i % 2 === 0;
            return (
              <div
                key={author.nim}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-0 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-shadow duration-500`}
              >
                {/* Color panel */}
                <div
                  className="md:w-56 flex-shrink-0 flex flex-col items-center justify-center py-12 px-8 gap-4"
                  style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
                >
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center shadow-xl">
                    <span className="text-3xl font-extrabold text-white">{author.initials}</span>
                  </div>
                  {/* NIM */}
                  <span className="text-white/70 text-xs font-mono tracking-widest">{author.nim}</span>
                </div>

                {/* Content panel */}
                <div className="flex-1 bg-white dark:bg-slate-800 p-8 md:p-10 flex flex-col justify-center transition-colors duration-300">
                  <div className="mb-1">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: `${from}18`, color: from }}
                    >
                      {author.role}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-3 mb-3 transition-colors duration-300">{author.name}</h2>

                  <p className="text-gray-500 dark:text-slate-300 text-sm leading-relaxed mb-6 transition-colors duration-300">{author.bio}</p>

                  {/* Topic tags */}
                  <div className="flex flex-wrap gap-2">
                    {author.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs font-semibold px-3 py-1 rounded-full border dark:border-opacity-50"
                        style={{ borderColor: `${from}40`, color: from, background: `${from}10` }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <section className="bg-slate-900 dark:bg-white py-16 px-4 text-center transition-colors duration-300">
        <p className="text-slate-400 dark:text-slate-500 text-sm mb-2 uppercase tracking-widest font-bold transition-colors duration-300">KombisBlog · 2026</p>
        <h2 className="text-2xl font-extrabold text-white dark:text-slate-900 mb-4 transition-colors duration-300">Ready to dive into the material?</h2>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm"
        >
          Browse All Articles →
        </Link>
      </section>

    </main>
  );
}
