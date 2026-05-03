const DashboardPageClient = ({ session }: { session: any }) => {
  return (
    <>
      <h1 className='text-4xl font-semibold'>Welcome, { session?.user.name }!</h1>
    </>
  )
}

export default DashboardPageClient