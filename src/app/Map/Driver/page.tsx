import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../../../components/Map/Location'), {
  ssr: false
});

export default function Home() {
  return (
    <main>
     <Map />
    </main>
  )
}