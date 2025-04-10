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
        <span key={i} className={`text-lg ${i < rating ? 'text-amber-500' : 'text-muted'}`}>
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
    <div className="border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-card">
      <div className="p-4">
        <h3 className="font-bold text-lg text-card-foreground">{coffee.shop_name}</h3>
        {coffee.coffee_name && (
          <p className="text-sm text-muted-foreground mt-1">{coffee.coffee_name}</p>
        )}
        <div className="flex items-center mt-2">
          {renderStars(coffee.rating)}
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {coffee.country && (
            <div>
              <span className="text-muted-foreground">原産国:</span>{' '}
              <span className="text-card-foreground">{coffee.country}</span>
            </div>
          )}
          {coffee.roast_level && (
            <div>
              <span className="text-muted-foreground">焙煎:</span>{' '}
              <span className="text-card-foreground">{getRoastLevelText(coffee.roast_level)}</span>
            </div>
          )}
        </div>
        
        {coffee.description && (
          <p className="mt-3 text-sm text-card-foreground line-clamp-2">
            {coffee.description}
          </p>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
          <Link href={`/coffee/${coffee.id}`} className="text-primary text-sm hover:underline">
            詳細を見る
          </Link>
        </div>
      </div>
    </div>
  );
}