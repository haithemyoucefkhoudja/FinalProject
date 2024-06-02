import get_Accounts from "@/actions/FetchAccounts";
import FetchAllData from "@/actions/FetchData";
import { getServerSession } from "@/app/utils/getServerSession";
import { AccountCard } from "@/components/Management/Accounts/AccountCard";
import { AccountsWrapper } from "@/components/Management/Accounts/AccountWrapper";
import { NoData } from "@/components/ui/NoData";

export default async function Page(){
	const session =await getServerSession()
    if(!session)
        return <NoData></NoData>
    const WareData = await FetchAllData(session);
	if(!WareData)
		return(<NoData/>)
    const Data = await get_Accounts(session.user.role, session.user.company)
    if(!Data.success || !Data.accounts)
        return<NoData/>
	const Accounts = Data.accounts
	
	
	return (
		<AccountsWrapper accounts={Accounts} session={session}/>
	)
}