import { createClient } from '@/lib/supabase-server'
import CoffeeForm from '@/components/coffee/CoffeeForm'
import { notFound } from 'next/navigation'

export const revalidate = 0

export default async function EditCoffeePage({
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">コーヒー記録を編集</h1>
      <CoffeeForm initialData={coffee} isEditing={true} />
    </div>
  )
}