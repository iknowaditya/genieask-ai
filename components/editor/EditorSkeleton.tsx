import { Skeleton } from "@/components/ui/skeleton";

export const EditorSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="relative overflow-hidden rounded-full">
                <Skeleton className="h-8 w-8 rounded-full animate-shimmer" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <Skeleton className="h-10 w-48 animate-shimmer" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
              </div>
            </div>
          </div>
          {/* Model Selector */}
          <div className="hidden sm:flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative overflow-hidden rounded-lg">
                <Skeleton className="h-10 w-32 animate-shimmer" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              <div className="relative overflow-hidden rounded-lg">
                <Skeleton className="h-6 w-24 mb-6 animate-shimmer" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative overflow-hidden rounded-lg">
                    <Skeleton className="h-10 w-full animate-shimmer" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main Editor */}
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              <div className="relative overflow-hidden rounded-xl">
                <Skeleton className="h-96 w-full rounded-xl animate-shimmer" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end mt-4 space-x-2">
                {[1, 2].map((i) => (
                  <div key={i} className="relative overflow-hidden rounded-xl">
                    <Skeleton className="h-10 w-10 rounded-xl animate-shimmer" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
                  </div>
                ))}
                <div className="relative overflow-hidden rounded-xl">
                  <Skeleton className="h-10 w-24 rounded-xl animate-shimmer" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-4 w-full">
                  <div className="flex items-center gap-12">
                    <div className="flex-1">
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <Skeleton className="h-4 w-24 animate-shimmer" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
                      </div>
                      <div className="relative overflow-hidden rounded-lg">
                        <Skeleton className="h-2 w-full animate-shimmer" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
                      </div>
                    </div>
                    <div>
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <Skeleton className="h-4 w-20 animate-shimmer" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
                      </div>
                      <div className="relative overflow-hidden rounded-lg">
                        <Skeleton className="h-6 w-12 animate-shimmer" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
