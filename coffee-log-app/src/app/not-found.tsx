import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-xl mb-6">ページが見つかりませんでした</h2>
      <p className="mb-8 text-center max-w-md">
        お探しのページは存在しないか、別の場所に移動した可能性があります。
      </p>
      <Link 
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        ホームに戻る
      </Link>
    </div>
  )
}