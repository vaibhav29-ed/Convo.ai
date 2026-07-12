export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          This page could not be found.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
