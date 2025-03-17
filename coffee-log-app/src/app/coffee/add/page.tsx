import CoffeeForm from '@/components/coffee/CoffeeForm'

export default function AddCoffeePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">新しいコーヒー記録を追加</h1>
      <CoffeeForm />
    </div>
  )
}