'use client';
import { AccountInfo } from "@/types/Data";
import { Session } from "next-auth";
import { AccountCard } from "./AccountCard";
import { AddAccountButton } from "./AccountButton";

export const AccountsWrapper = ({session, accounts}:{session:Session, accounts:AccountInfo[]}) => {
    return(
        <section className="flex  flex-col items-center">
        <AddAccountButton session={session} />
		{accounts.map(account=>{
			return(
			<AccountCard account={account} session={session}/>)})
		}
	</section>
		)
}