import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="text-center">
        <p className="text-7xl font-bold gradient-text">404</p>

        <h1 className="mt-4 text-3xl font-bold">
          Workout Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          Sorry, the workout you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="gradient-button mt-7 inline-block rounded-lg px-6 py-3 font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}