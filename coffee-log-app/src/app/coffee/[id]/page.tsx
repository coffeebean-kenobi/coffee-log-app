import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 0

export default async function CoffeeDetailPage({
  params
}: {
  params: { id: string }
}) {
  const supabase = createClient()
  
  const { data: coffee, error } = await supabase
    .from('coffee_records')
    .select('*')
    .eq('id', params.id)
    .single()
  
  if (error || !coffee) {
    console.error('Error fetching coffee record:', error)
    notFound()
  }
  
  // 焙煎度合いの日本語表示
  const getRoastLevelText = (level: string | null) => {
    if (!level) return 'なし'
    
    const levels: Record<string, string> = {
      'light': '浅煎り',
      'medium': '中煎り',
      'medium-dark': '中深煎り',
      'dark': '深煎り'
    }
    
    return levels[level] || level
  }
  
  // 日付のフォーマット
  const formattedDate = coffee.consumed_at 
    ? new Date(coffee.consumed_at).toLocaleDateString('ja-JP')
    : '日付なし'
  
  // 星評価の表示
  const renderStars = (rating: number | null) => {
    if (rating === null) return 'なし'
    
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      ))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/coffee" className="text-blue-600 hover:underline">
          ← 一覧に戻る
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{coffee.shop_name}</h1>
            <div className="flex space-x-2">
              <Link 
                href={`/coffee/edit/${coffee.id}`}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                編集
              </Link>
              {/* 削除ボタンはクライアントコンポーネントで実装 */}
            </div>
          </div>
          
          {coffee.coffee_name && (
            <p className="text-gray-600 mt-1">{coffee.coffee_name}</p>
          )}
          
          <div className="flex items-center mt-3 text-xl">
            {renderStars(coffee.rating)}
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <span className="font-medium">飲んだ日: </span>
                <span>{formattedDate}</span>
              </div>
              <div>
                <span className="font-medium">原産国: </span>
                <span>{coffee.country || 'なし'}</span>
              </div>
              <div>
                <span className="font-medium">地域: </span>
                <span>{coffee.region || 'なし'}</span>
              </div>
              <div>
                <span className="font-medium">農園: </span>
                <span>{coffee.farm || 'なし'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="font-medium">精製方法: </span>
                <span>{coffee.processing_method || 'なし'}</span>
              </div>
              <div>
                <span className="font-medium">焙煎度合い: </span>
                <span>{getRoastLevelText(coffee.roast_level)}</span>
              </div>
            </div>
          </div>
          
          {coffee.description && (
            <div className="mt-6">
              <h2 className="font-medium text-lg mb-2">感想</h2>
              <p className="whitespace-pre-line">{coffee.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}