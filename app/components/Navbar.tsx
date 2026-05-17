'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const articles = [
  { title: 'Email as a Written Communication Tool', slug: 'email-communication' },
  { title: 'Making Business Writing Effective', slug: 'effective-business-writing' },
  { title: 'Memo', slug: 'memo' },
  { title: 'Business Letter', slug: 'business-letter' },
  { title: 'Minutes of a Meeting', slug: 'minutes-of-meeting' },
  { title: 'Importance of Data in Business Communication', slug: 'importance-of-data' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
              Kombis<span className="text-gray-900">Blog</span>.
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>

            {/* Core Curriculum dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
              >
                Core Curriculum
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu with smooth transition */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 transition-all duration-300 ease-in-out origin-top ${
                  open
                    ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Articles
                </div>
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/artikel/${article.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-300 group-hover:bg-blue-500 transition-colors flex-shrink-0"></span>
                    {article.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              About the Authors
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

