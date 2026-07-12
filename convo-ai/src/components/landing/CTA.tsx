import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-600 to-red-700 p-12 sm:p-16 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to chat with your documents?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of users who are already saving hours every week with
            AI-powered document chat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-white text-brand-700 hover:bg-gray-100 shadow-lg w-full sm:w-auto"
              >
                Start for Free
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
