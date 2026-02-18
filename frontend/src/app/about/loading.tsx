export default function AboutLoading() {
    return (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            {/* Navbar placeholder */}
            <div className="h-20 bg-white shadow-sm" />

            {/* Hero skeleton */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <div className="h-5 w-32 bg-blue-600 rounded mx-auto" />
                    <div className="h-10 w-96 max-w-full bg-blue-600 rounded mx-auto" />
                    <div className="h-5 w-80 max-w-full bg-blue-600 rounded mx-auto" />
                </div>
            </div>

            {/* Stats skeleton */}
            <div className="max-w-6xl mx-auto px-4 -mt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow p-6 text-center space-y-2">
                            <div className="h-8 w-20 bg-gray-200 rounded mx-auto" />
                            <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Company info skeleton */}
            <div className="max-w-6xl mx-auto px-4 py-16 space-y-4">
                <div className="h-8 w-64 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>

            {/* Values grid skeleton */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow p-6 space-y-3">
                            <div className="h-12 w-12 bg-gray-200 rounded-lg" />
                            <div className="h-5 w-32 bg-gray-200 rounded" />
                            <div className="h-4 w-full bg-gray-200 rounded" />
                            <div className="h-4 w-4/5 bg-gray-200 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer placeholder */}
            <div className="h-64 bg-gray-900" />
        </div>
    )
}
