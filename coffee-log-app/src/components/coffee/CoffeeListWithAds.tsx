import { Database } from '@/types/database.types'
import CoffeeCard from './CoffeeCard'
import InFeedAdComponent from '@/components/ads/InFeedAdComponent'

type CoffeeRecord = Database['public']['Tables']['coffee_records']['Row']

interface CoffeeListWithAdsProps {
  records: CoffeeRecord[]
  className?: string
}

export default function CoffeeListWithAds({ 
  records, 
  className = '' 
}: CoffeeListWithAdsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {records.map((record, index) => (
        <div key={record.id}>
          <CoffeeCard coffee={record} />
          
          {/* フィード内広告 */}
          <InFeedAdComponent 
            itemIndex={index}
            totalItems={records.length}
            adInterval={5}
            className="mt-6"
          />
        </div>
      ))}
    </div>
  )
} 