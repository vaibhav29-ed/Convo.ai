export default function DemoPreview() {
  return (
    <section id="demo" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            See it in action
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Upload a PDF and start chatting with it instantly
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 shadow-2xl overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="mx-auto max-w-md bg-white dark:bg-gray-700 rounded-lg px-3 py-1 text-xs text-gray-500 dark:text-gray-300 text-center">
                  convo.ai/dashboard
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
              {/* PDF Side */}
              <div className="p-6 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">research-paper.pdf</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">12 pages</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-11/12" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Side */}
              <div className="flex flex-col p-6">
                <div className="flex-1 space-y-4">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-brand-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%]">
                      What are the main findings of this paper?
                    </div>
                  </div>
                  {/* AI message */}
                  <div className="flex gap-2">
                    <div className="h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300 shrink-0">
                      AI
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm max-w-[80%] text-gray-900 dark:text-gray-100">
                      The paper identifies three key findings:
                        <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>Improved accuracy by 23% using the new method</li>
                        <li>Reduced processing time by 40%</li>
                        <li>Better scalability across datasets</li>
                      </ol>
                    </div>
                  </div>
                  {/* Typing indicator */}
                  <div className="flex gap-2">
                    <div className="h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300 shrink-0">
                      AI
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Input */}
                <div className="mt-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 p-2 flex items-center gap-2">
                  <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 h-20 w-20 rounded-2xl bg-brand-100 dark:bg-brand-900 border border-brand-200 dark:border-brand-700 shadow-lg hidden lg:flex items-center justify-center animate-float">
            <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-2xl bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700 shadow-lg hidden lg:flex items-center justify-center animate-float" style={{ animationDelay: "2s" }}>
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
