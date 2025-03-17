import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import ClientCoffeeList from './ClientCoffeeList'

export const revalidate = 0

export default async function CoffeeListPage() {
  const supabase = createClient()
  
  const { data: coffees, error } = await supabase
    .from('coffee_records')
    .select('*')
    .order('consumed_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching coffee records:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">コーヒー記録一覧</h1>
        <Link href="/coffee/add" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          新しい記録を追加
        </Link>
      </div>
      
      <ClientCoffeeList initialCoffees={coffees || []} />
    </div>
  )
}