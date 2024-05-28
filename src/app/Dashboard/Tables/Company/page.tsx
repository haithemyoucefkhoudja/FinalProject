import FetchAllData from "@/actions/FetchData";
import { getServerSession } from "@/app/utils/getServerSession";
import { Table } from "@/components/Tables/Table";
import { NoData } from "@/components/ui/NoData";

export default async function Page() {
    const session = await getServerSession()
    if(!session)
        return(<NoData/>)
    const Data = await FetchAllData(session.user.role)
    if(!Data)
        return<NoData/>
    return(
    <Table products={Data.company.products} company={session.user.company}></Table>
)
}