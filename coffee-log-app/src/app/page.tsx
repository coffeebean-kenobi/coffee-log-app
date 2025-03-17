import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'

export default async function Home() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-6">コーヒー記録アプリ</h1>
      <p className="max-w-lg mb-8 text-lg">
        飲んだコーヒーの情報や感想を記録して、あなただけのコーヒージャーナルを作りましょう。
      </p>
      
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
        {session ? (
          <>
            <Link 
              href="/coffee"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
            >
              記録を見る
            </Link>
            <Link 
              href="/coffee/add"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 inline-block"
            >
              新しい記録を追加
            </Link>
          </>
        ) : (
          <>
            <Link 
              href="/signin"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
            >
              ログイン
            </Link>
            <Link 
              href="/signup"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 inline-block"
            >
              ユーザー登録
            </Link>
          </>
        )}
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-3">記録する</h2>
          <p>飲んだコーヒーの店名、豆の情報、評価、感想を簡単に記録できます。</p>
        </div>
        
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-3">振り返る</h2>
          <p>過去に飲んだコーヒーを簡単に検索、フィルタリングして振り返ることができます。</p>
        </div>
        
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-3">発見する</h2>
          <p>あなたの好みのパターンを見つけて、新しいコーヒーとの出会いを楽しみましょう。</p>
        </div>
      </div>
    </div>
  )
}