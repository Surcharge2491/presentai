import { env } from "@/env";

const PricingPage = async () => {
    const publishableKey = env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const pricingTableId = env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID;

    // If Stripe is not configured, show a fallback message
    if (!publishableKey || !pricingTableId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="max-w-2xl w-full px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
                    <p className="text-gray-600 mb-6">
                        Configure your Stripe pricing table to display pricing options.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <p className="text-sm text-yellow-800">
                            <strong>Setup Required:</strong> Please add your Stripe publishable key and pricing table ID to your environment variables.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="max-w-6xl w-full px-4">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
                    <p className="text-xl text-gray-600 mb-2">
                        Transform your presentations with AI-powered features
                    </p>
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Secure payment powered by Stripe
                    </p>
                </div>

                {/* Stripe Embeddable Pricing Table */}
                <stripe-pricing-table
                    pricing-table-id={pricingTableId}
                    publishable-key={publishableKey}
                />

                {/* FAQ Section */}
                <div className="mt-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-lg mb-2">Can I cancel my subscription anytime?</h3>
                            <p className="text-gray-600">
                                Yes! You can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
                            <p className="text-gray-600">
                                We accept all major credit cards, debit cards, and various local payment methods through our secure payment processor, Stripe.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-lg mb-2">Is there a free trial available?</h3>
                            <p className="text-gray-600">
                                You can use our free plan indefinitely to explore basic features. Upgrade to Pro anytime to unlock unlimited AI generations and advanced features.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-lg mb-2">How secure is my payment information?</h3>
                            <p className="text-gray-600">
                                All payments are processed securely through Stripe, a PCI-DSS compliant payment processor. We never store your credit card information on our servers.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-lg mb-2">Can I upgrade or downgrade my plan?</h3>
                            <p className="text-gray-600">
                                Absolutely! You can change your plan at any time from your account settings. Changes will be reflected in your next billing cycle.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="font-semibold text-lg mb-2">Do you offer refunds?</h3>
                            <p className="text-gray-600">
                                If you're not satisfied with your purchase, contact us within 14 days of your subscription start date and we'll be happy to provide a full refund.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <p className="text-gray-600">
                            Still have questions? <a href="mailto:support@presentai.com" className="text-primary hover:underline font-medium">Contact our support team</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
