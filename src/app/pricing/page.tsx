import Link from "next/link";

const PricingPage = async () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="max-w-4xl w-full px-4">
                <h1 className="text-4xl font-bold text-center mb-4">Pricing Plans</h1>
                <p className="text-center text-gray-600 mb-10">
                    Choose the plan that fits your needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Free Plan */}
                    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4">Free</h2>
                        <p className="text-4xl font-bold mb-6">0 AED<span className="text-base font-normal text-gray-500">/month</span></p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                Basic AI Features
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                Limited Presentations
                            </li>
                        </ul>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-primary relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            POPULAR
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Pro</h2>
                        <p className="text-4xl font-bold mb-6">69.99 AED<span className="text-base font-normal text-gray-500">/month</span></p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                Unlimited AI Generations
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                Priority Support
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                Advanced Analytics
                            </li>
                        </ul>
                        <Link
                            href="/checkout"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                        >
                            Upgrade to Pro
                        </Link>
                    </div>
                </div>

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
