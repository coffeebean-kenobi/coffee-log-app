import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/profile/ProfileForm'

export const revalidate = 0

export default async function ProfilePage() {
  const supabase = createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/signin')
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">プロフィール設定</h1>
      <ProfileForm initialProfile={profile} />
    </div>
  )
}