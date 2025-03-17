import Link from 'next/link'
import { Database } from '@/types/database.types'

type CoffeeRecord = Database['public']['Tables']['coffee_records']['Row']

type Props = {
  coffee: CoffeeRecord
}

export default function CoffeeCard({ coffee }: Props) {
  const formattedDate = coffee.consumed_at 
    ? new Date(coffee.consumed_at).toLocaleDateString('ja-JP')
    : '日付なし';
  
  // 星評価の表示
  const renderStars = (rating: number | null) => {
    if (rating === null) return null;
    
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      ));
  };

  // 焙煎度合いの日本語表示
  const getRoastLevelText = (level: string | null) => {
    if (!level) return null;
    
    const levels: Record<string, string> = {
      'light': '浅煎り',
      'medium': '中煎り',
      'medium-dark': '中深煎り',
      'dark': '深煎り'
    };
    
    return levels[level] || level;
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <h3 className="font-bold text-lg">{coffee.shop_name}</h3>
        {coffee.coffee_name && (
          <p className="text-sm text-gray-600 mt-1">{coffee.coffee_name}</p>
        )}
        <div className="flex items-center mt-2">
          {renderStars(coffee.rating)}
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {coffee.country && (
            <div>
              <span className="text-gray-500">原産国:</span> {coffee.country}
            </div>
          )}
          {coffee.roast_level && (
            <div>
              <span className="text-gray-500">焙煎:</span>{' '}
              {getRoastLevelText(coffee.roast_level)}
            </div>
          )}
        </div>
        
        {coffee.description && (
          <p className="mt-3 text-sm text-gray-700 line-clamp-2">
            {coffee.description}
          </p>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">{formattedDate}</span>
          <Link href={`/coffee/${coffee.id}`} className="text-blue-600 text-sm hover:underline">
            詳細を見る
          </Link>
        </div>
      </div>
    </div>
  );
}