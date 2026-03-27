export const metadata = {
  title: 'Sanity Studio',
  description: 'Manage content for the website',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
