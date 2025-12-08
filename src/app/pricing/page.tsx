import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const PricingPage = async () => {
    const isPro = await checkSubscription();

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
                        <p className="text-4xl font-bold mb-6">$0<span className="text-base font-normal text-gray-500">/month</span></p>
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
                        <p className="text-4xl font-bold mb-6">$19<span className="text-base font-normal text-gray-500">/month</span></p>
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
                        <SubscriptionButton isPro={isPro} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
