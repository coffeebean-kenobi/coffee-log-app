import { Database } from '@/types/database.types'
import CoffeeCard from './CoffeeCard'

type CoffeeRecord = Database['public']['Tables']['coffee_records']['Row']

type Props = {
  coffees: CoffeeRecord[]
}

export default function CoffeeList({ coffees }: Props) {
  if (coffees.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">記録がありません</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coffees.map((coffee) => (
        <CoffeeCard key={coffee.id} coffee={coffee} />
      ))}
    </div>
  );
}