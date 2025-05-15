import { createClient } from '@/lib/supabase-server'
import CoffeeForm from '@/components/coffee/CoffeeForm'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { Typography } from '@/components/Typography'

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
    <Container>
      <div style={{ padding: '2rem 0' }}>
        <Typography variant="h2" style={{ marginBottom: '1.5rem' }}>コーヒー記録を編集</Typography>
        <CoffeeForm initialData={coffee} isEditing={true} />
      </div>
    </Container>
  )
}