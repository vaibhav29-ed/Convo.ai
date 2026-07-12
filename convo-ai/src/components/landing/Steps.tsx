const steps = [
  {
    step: "01",
    title: "Sign Up",
    description: "Create your free account in seconds. No credit card required.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Upload PDF",
    description: "Drag and drop your PDF or click to browse. We'll process it instantly.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Ask Questions",
    description: "Type your questions and get instant, accurate answers from your document.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Steps() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Start chatting in{" "}
            <span className="text-brand-600">minutes</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Three simple steps to unlock the power of your documents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-brand-200 via-brand-500 to-brand-200" />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="relative z-10 mx-auto h-16 w-16 rounded-2xl bg-white dark:bg-gray-800 border-2 border-brand-500 flex items-center justify-center text-brand-600 mb-6 shadow-lg">
                {step.icon}
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 mb-3">
                Step {step.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
