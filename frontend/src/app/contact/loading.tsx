export default function ContactLoading() {
    return (
        <div className="min-h-screen bg-gray-50 animate-pulse">
            {/* Navbar placeholder */}
            <div className="h-20 bg-white shadow-sm" />

            {/* Hero skeleton */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <div className="h-5 w-32 bg-blue-600 rounded mx-auto" />
                    <div className="h-10 w-72 max-w-full bg-blue-600 rounded mx-auto" />
                    <div className="h-5 w-96 max-w-full bg-blue-600 rounded mx-auto" />
                </div>
            </div>

            {/* Contact info cards skeleton */}
            <div className="max-w-6xl mx-auto px-4 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow p-6 text-center space-y-3">
                            <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto" />
                            <div className="h-5 w-24 bg-gray-200 rounded mx-auto" />
                            <div className="h-4 w-40 bg-gray-200 rounded mx-auto" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Form + Map skeleton */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form skeleton */}
                    <div className="bg-white rounded-xl shadow p-8 space-y-5">
                        <div className="h-7 w-48 bg-gray-200 rounded" />
                        <div className="space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 w-20 bg-gray-200 rounded" />
                                    <div className="h-10 w-full bg-gray-100 rounded-lg" />
                                </div>
                            ))}
                            <div className="space-y-2">
                                <div className="h-4 w-20 bg-gray-200 rounded" />
                                <div className="h-28 w-full bg-gray-100 rounded-lg" />
                            </div>
                        </div>
                        <div className="h-12 w-full bg-gray-200 rounded-lg" />
                    </div>
                    {/* Map skeleton */}
                    <div className="bg-gray-200 rounded-xl h-96" />
                </div>
            </div>

            {/* FAQ skeleton */}
            <div className="bg-white py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-8" />
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-5 space-y-2">
                                <div className="h-5 w-72 max-w-full bg-gray-200 rounded" />
                                <div className="h-4 w-full bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer placeholder */}
            <div className="h-64 bg-gray-900" />
        </div>
    )
}
