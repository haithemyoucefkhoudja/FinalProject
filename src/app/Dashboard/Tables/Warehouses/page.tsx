import { Table } from "@/components/component/TableWareHouse";

export default async function Page() {
    return(
        <ul className="space-y-4">
            <li key={1}>
            <Table num={1}></Table>
            </li>
            <li key={2}>
            <Table num={2}></Table>
            </li>
            <li key={3}>
            <Table num={3}></Table>
            </li>
        </ul>
)
}