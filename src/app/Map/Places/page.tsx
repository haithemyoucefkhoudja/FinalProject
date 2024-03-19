import { Functionalities } from '@/components/component/functionalities';
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../../../components/Map/Places'), {
  ssr: false
});

export default function Home() {
  return (
    <main>
     <Functionalities />
    </main>
  )
}