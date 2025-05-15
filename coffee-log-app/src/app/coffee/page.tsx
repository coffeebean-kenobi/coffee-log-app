import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import ClientCoffeeList from './ClientCoffeeList'
import { Container } from '@/components/Container'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

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
    <Container>
      <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem' 
        }}>
          <Typography variant="h2">コーヒー記録一覧</Typography>
          <Link href="/coffee/add">
            <Button variant="primary">新しい記録を追加</Button>
          </Link>
        </div>
        
        <ClientCoffeeList initialCoffees={coffees || []} />
      </div>
    </Container>
  )
}