export default function SuccessStoriesLoading() {
    return (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            {/* Navbar placeholder */}
            <div className="h-20 bg-white shadow-sm" />

            {/* Hero skeleton */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <div className="h-5 w-32 bg-blue-600 rounded mx-auto" />
                    <div className="h-10 w-80 max-w-full bg-blue-600 rounded mx-auto" />
                    <div className="h-5 w-96 max-w-full bg-blue-600 rounded mx-auto" />
                </div>
            </div>

            {/* Featured story skeleton */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="h-72 lg:h-96 bg-gray-200" />
                        <div className="p-8 space-y-4">
                            <div className="h-5 w-24 bg-gray-200 rounded-full" />
                            <div className="h-8 w-64 bg-gray-200 rounded" />
                            <div className="h-4 w-full bg-gray-200 rounded" />
                            <div className="h-4 w-full bg-gray-200 rounded" />
                            <div className="h-4 w-3/4 bg-gray-200 rounded" />
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="text-center space-y-1">
                                        <div className="h-6 w-12 bg-gray-200 rounded mx-auto" />
                                        <div className="h-3 w-16 bg-gray-200 rounded mx-auto" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other stories grid skeleton */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow overflow-hidden">
                            <div className="h-48 bg-gray-200" />
                            <div className="p-5 space-y-3">
                                <div className="h-5 w-20 bg-gray-200 rounded-full" />
                                <div className="h-6 w-44 bg-gray-200 rounded" />
                                <div className="h-4 w-full bg-gray-200 rounded" />
                                <div className="h-4 w-4/5 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA skeleton */}
            <div className="bg-blue-900 py-16 px-4">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <div className="h-8 w-72 max-w-full bg-blue-700 rounded mx-auto" />
                    <div className="h-4 w-96 max-w-full bg-blue-700 rounded mx-auto" />
                    <div className="h-12 w-40 bg-blue-600 rounded-lg mx-auto" />
                </div>
            </div>

            {/* Footer placeholder */}
            <div className="h-64 bg-gray-900" />
        </div>
    )
}
