import { getImages } from './actions';
import Link from 'next/link';

export default async function HomePage() {
  const images = await getImages();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-xl font-semibold tracking-tight">Cautiva</h1>
          <Link
            href="/admin"
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700"
          >
            Admin
          </Link>
        </div>
      </header>

      {/* Contenido */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Galería</h2>
          <p className="mt-2 text-zinc-400">
            {images.length === 0
              ? 'Aún no hay imágenes'
              : `${images.length} imagen${images.length === 1 ? '' : 'es'}`}
          </p>
        </div>

        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-24">
            <p className="text-zinc-500">No hay imágenes todavía</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <div
                key={img.pathname}
                className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
              >
                <img
                  src={img.url}
                  alt={img.pathname}
                  className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}