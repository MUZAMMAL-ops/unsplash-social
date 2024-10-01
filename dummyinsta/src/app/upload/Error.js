"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xjK267b4Xb1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Error({error,reset}) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-red-500 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto h-12 w-12 text-white" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Oops, an error occurred!</h1>
          <p className="mt-4 text-white">
            Something went wrong. Please try again later or contact support if the issue persists.
          </p>
        </div>
      </div>
    )
  }