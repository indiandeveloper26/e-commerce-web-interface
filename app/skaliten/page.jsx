export default function ProductSkeletonCard() {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {/* Image Placeholder */}
            <div className="h-48 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer"></div>
            </div>

            {/* Details */}
            <div className="p-4 flex flex-col flex-grow space-y-2">
                {/* Title */}
                <div className="h-5 w-3/4 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer"></div>
                {/* Category */}
                <div className="h-4 w-1/2 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer"></div>
                {/* Price */}
                <div className="h-5 w-1/4 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer mt-2"></div>
                {/* Button */}
                <div className="h-10 w-full rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer mt-4"></div>
            </div>
        </div>
    );
}
