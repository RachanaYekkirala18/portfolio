export default function Thanks() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md border border-amber-200 rounded-3xl p-10 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
          Message sent ✅
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Thanks for reaching out! I’ll get back to you soon.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 rounded-full border border-amber-300 hover:bg-amber-50"
          >
            Back to Home
          </a>
          <a
            href="#projects"
            className="px-6 py-3 rounded-full border border-amber-300 hover:bg-amber-50"
          >
            View Projects
          </a>
        </div>
      </div>
    </main>
  );
}
