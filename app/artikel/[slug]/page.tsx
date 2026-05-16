import Link from 'next/link';
import { notFound } from 'next/navigation';

// Fungsi untuk mengambil 1 artikel spesifik berdasarkan slug dari API
async function getPost(slug: string) {
  const res = await fetch(`http://localhost:8000/api/posts/${slug}`, {
    cache: 'no-store'
  });

  // Jika API mengembalikan error (misal artikel tidak ada), kembalikan null
  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Mengambil data artikel dari database
  const article = await getPost(resolvedParams.slug);

  // Jika artikel tidak ditemukan di database, tampilkan 404
  if (!article) {
    notFound();
  }

  // Format tanggal untuk mempercantik tampilan (opsional)
  const formattedDate = new Date(article.created_at).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        {/* Tombol Kembali */}
        <div className="mb-10">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            &larr; Kembali ke Beranda
          </Link>
        </div>

        {/* Header Artikel */}
        <header className="mb-10 pb-8 border-b border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Materi Komunikasi Bisnis</span>
            <span className="mx-2">&bull;</span>
            <span>Dipublikasikan: {formattedDate}</span>
          </div>
        </header>

        {/* Konten Artikel yang dipanggil dari database */}
        <div 
          className="prose prose-lg prose-blue text-gray-700 max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
      </article>
    </main>
  );
}