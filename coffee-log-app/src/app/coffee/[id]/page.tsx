import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DeleteCoffeeButton from '@/components/coffee/DeleteCoffeeButton'
import CoffeeDetailTasteChart from '@/components/coffee/CoffeeDetailTasteChart'

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
        <span key={i} className={i < rating ? 'text-amber-500' : 'text-muted'}>
          ★
        </span>
      ))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/coffee" className="text-primary hover:underline">
          ← 一覧に戻る
        </Link>
      </div>
      
      <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-card-foreground">{coffee.shop_name}</h1>
            <div className="flex space-x-2">
              <Link 
                href={`/coffee/edit/${coffee.id}`}
                className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 transition-colors"
              >
                編集
              </Link>
              <DeleteCoffeeButton coffeeId={coffee.id} />
            </div>
          </div>
          
          {coffee.coffee_name && (
            <p className="text-muted-foreground mt-1">{coffee.coffee_name}</p>
          )}
          
          <div className="flex items-center mt-3 text-xl">
            {renderStars(coffee.rating)}
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <span className="font-medium text-card-foreground">飲んだ日: </span>
                <span className="text-card-foreground">{formattedDate}</span>
              </div>
              <div>
                <span className="font-medium text-card-foreground">原産国: </span>
                <span className="text-card-foreground">{coffee.country || 'なし'}</span>
              </div>
              <div>
                <span className="font-medium text-card-foreground">地域: </span>
                <span className="text-card-foreground">{coffee.region || 'なし'}</span>
              </div>
              <div>
                <span className="font-medium text-card-foreground">農園: </span>
                <span className="text-card-foreground">{coffee.farm || 'なし'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="font-medium text-card-foreground">精製方法: </span>
                <span className="text-card-foreground">{coffee.processing_method || 'なし'}</span>
              </div>
              <div>
                <span className="font-medium text-card-foreground">焙煎度合い: </span>
                <span className="text-card-foreground">{getRoastLevelText(coffee.roast_level)}</span>
              </div>
            </div>
          </div>
          
          {/* 味わい評価のレーダーチャート */}
          <CoffeeDetailTasteChart coffee={coffee} />
          
          {coffee.description && (
            <div className="mt-6">
              <h2 className="font-medium text-lg mb-2 text-card-foreground">感想</h2>
              <p className="whitespace-pre-line text-card-foreground">{coffee.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}