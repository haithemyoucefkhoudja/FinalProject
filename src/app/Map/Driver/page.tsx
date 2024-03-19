import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../../../components/Map/Location'), {
  ssr: false
});

export default function Home() {
  return (
    <main>
       <h1 className="text-3xl font-bold ">
      Hello world!
    </h1>
     <Map />
    </main>
  )
}