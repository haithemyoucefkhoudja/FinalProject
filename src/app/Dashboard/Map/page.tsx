import FetchAllData from '@/actions/FetchData';
import { getServerSession } from '@/app/utils/getServerSession';
import { NoData } from '@/components/ui/NoData';
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map/Location'), {
  ssr: false
});

export default async function Home() {
  
  const session = await getServerSession()
  if(!session)
    return(<NoData/>)
  const Data = await FetchAllData(session.user.role)
  if(!Data)
    return<NoData/>
  return (
    
        <Map  Ware_data={Data} session={session} />
      
  )
}