import Link from 'next/link';
import Image from 'next/image';

// Fungsi untuk mengambil data dari API Laravel
async function getPosts() {
  // Melakukan request ke endpoint API Laravel
  const res = await fetch('http://localhost:8000/api/posts', {
    // Memastikan Next.js selalu mengambil data terbaru (tidak di-cache terlalu lama)
    cache: 'no-store' 
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data dari API');
  }

  return res.json();
}

// Komponen Home sekarang bersifat 'async'
export default async function Home() {
  // Memanggil fungsi getPosts untuk mendapatkan data dari database
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4">
            Professional Development
          </span>
          <h1 className="text-4xl font-extrabold text-gray-950 tracking-tight sm:text-6xl mb-6">
            Cara Menulis Komunikasi<br /> Bisnis yang <span className="text-blue-600">Efektif</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600 mx-auto leading-relaxed">
            Panduan komprehensif menguasai seni komunikasi tertulis di dunia kerja, mulai dari penulisan email hingga pemanfaatan data yang akurat.
          </p>
        </div>
      </div>

      {/* Grid Section - Menampilkan data dari API */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 py-16 px-4 sm:px-6 lg:px-8">
        {/* Kita melakukan map pada variabel 'posts' yang didapat dari database */}
        {posts.map((post: any) => (
          <Link 
            key={post.id} 
            href={`/artikel/${post.slug}`}
            className="flex flex-col group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-1"
          >
            {/* Wadah Gambar */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-white border-b border-gray-50">
              {/* Kita panggil post.image_url sesuai nama kolom di database */}
              <Image 
                src={post.image_url} 
                alt={`Sampul untuk materi ${post.title}`}
                fill 
                className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-w-7xl) 33vw, 100vw" 
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors pointer-events-none"></div>
            </div>

            {/* Bagian Teks */}
            <div className="p-7 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-gray-950 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">
                {post.description}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600">
                Baca Selengkapnya
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}