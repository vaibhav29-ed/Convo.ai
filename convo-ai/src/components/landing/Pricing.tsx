import Button from "@/components/ui/Button";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/month",
    description: "Perfect for trying out Convo.ai",
    features: [
      "5 PDFs / month",
      "5 pages per PDF",
      "4MB file limit",
      "Basic AI responses",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹99",
    period: "/month",
    description: "For power users who need more",
    features: [
      "30 PDFs / month",
      "25 pages per PDF",
      "16MB file limit",
      "Advanced AI responses",
      "Priority support",
      "Chat history",
      "Export conversations",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Choose the plan that works for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "border-2 border-brand-500 bg-white dark:bg-gray-900 shadow-xl shadow-brand-500/10"
                  : "border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{plan.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {plan.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <svg
                      className={`h-5 w-5 shrink-0 ${
                        plan.popular ? "text-brand-600" : "text-green-500"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/auth/signup" className="block">
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
            <svg
              className="h-5 w-5 text-brand-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            If you want free access for a meaningful cause, contact the owner at{" "}
            <a
              href="mailto:vaibhavsingh292005@gmail.com"
              className="text-brand-600 font-medium hover:underline"
            >
              vaibhavsingh292005@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
