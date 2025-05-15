import CoffeeForm from '@/components/coffee/CoffeeForm'
import { Container } from '@/components/Container'
import { Typography } from '@/components/Typography'

export default function AddCoffeePage() {
  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        <Typography variant="h2" style={{ marginBottom: '1.5rem' }}>新しいコーヒー記録を追加</Typography>
        <CoffeeForm />
      </div>
    </Container>
  )
}