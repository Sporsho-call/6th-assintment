export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500"></div>

        <p className="mt-4 font-medium text-gray-600">
          Loading FitLog...
        </p>
      </div>
    </main>
  );
}
