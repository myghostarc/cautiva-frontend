import { isAdmin, login, uploadImage, getImages, logout } from '../actions';
import Link from 'next/link';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    uploadError?: string;
    uploaded?: string;
  }>;
}) {
  const loggedIn = await isAdmin();
  const params = await searchParams;

  const hasError = params.error === '1';
  const uploadError = params.uploadError === '1';
  const uploaded = params.uploaded === '1';

  // ========== LOGIN ==========
  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Admin
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Acceso restringido
            </p>
          </div>

          <form
            action={login}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
          >
            {hasError && (
              <div className="mb-5 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                Contraseña incorrecta
              </div>
            )}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-300">
                Contraseña
              </span>
              <input
                type="password"
                name="password"
                required
                autoFocus
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-zinc-100 outline-none transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
                placeholder="••••••••"
              />
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-zinc-100 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-white"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-zinc-500 transition hover:text-zinc-300"
            >
              ← Volver a la galería
            </Link>
          </p>
        </div>
      </main>
    );
  }

  // ========== PANEL ADMIN ==========
  const images = await getImages();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <h1 className="text-xl font-semibold tracking-tight">
            Panel de Admin
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:text-zinc-200"
            >
              Ver galería
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium transition hover:bg-zinc-700"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Mensajes */}
        {uploaded && (
          <div className="mb-6 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            Imagen subida correctamente
          </div>
        )}
        {uploadError && (
          <div className="mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            Error: no se seleccionó ninguna imagen
          </div>
        )}

        {/* Formulario de subida */}
        <section className="mb-12 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-lg font-semibold">Subir imagen</h2>
          <form action={uploadImage} className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <input
              type="file"
              name="file"
              accept="image/*"
              required
              className="block w-full text-sm text-zinc-400 file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:px-4 file:py-2 file:text-sm file:font-medium file:text-zinc-200 hover:file:bg-zinc-700"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-zinc-100 px-6 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-white"
            >
              Subir
            </button>
          </form>
        </section>

        {/* Lista de imágenes */}
        <section>
          <h2 className="mb-6 text-lg font-semibold">
            Imágenes subidas{' '}
            <span className="text-zinc-500">({images.length})</span>
          </h2>

          {images.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 py-16 text-center text-zinc-500">
              No hay imágenes todavía
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((img) => (
                <div
                  key={img.pathname}
                  className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
                >
                  <img
                    src={img.url}
                    alt={img.pathname}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}