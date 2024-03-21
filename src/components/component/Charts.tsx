
import { CardDescription, CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { ResponsiveLine } from "@nivo/line"
export function Charts(){
    return(
        <>
    <div className="grid md:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardDescription>Net Sales</CardDescription>
        <CardTitle>$1,234.56</CardTitle>
      </CardHeader>
      <CardContent>
        <CurvedlineChart className="aspect-[2/1]" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardDescription>Gross Profit</CardDescription>
        <CardTitle>$5,432.10</CardTitle>
      </CardHeader>
      <CardContent>
        <CurvedlineChart className="aspect-[2/1]" />
      </CardContent>
    </Card>
  </div>
  <Card>
    <CardHeader>
      <CardDescription>Gross Margin</CardDescription>
      <CardTitle>45%</CardTitle>
    </CardHeader>
    <CardContent>
      <LineChart className="aspect-[2/1]" />
    </CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Drivers</CardTitle>
      <CardDescription>Performance Metrics</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Deliveries</TableHead>
            <TableHead>Issues</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">John Doe</TableCell>
            <TableCell>12345</TableCell>
            <TableCell>56</TableCell>
            <TableCell>2</TableCell>
            <TableCell>4.5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Jane Smith</TableCell>
            <TableCell>54321</TableCell>
            <TableCell>72</TableCell>
            <TableCell>1</TableCell>
            <TableCell>4.8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Mike Johnson</TableCell>
            <TableCell>98765</TableCell>
            <TableCell>42</TableCell>
            <TableCell>3</TableCell>
            <TableCell>4.2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Sarah Lee</TableCell>
            <TableCell>13579</TableCell>
            <TableCell>63</TableCell>
            <TableCell>0</TableCell>
            <TableCell>4.9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Kevin Brown</TableCell>
            <TableCell>24680</TableCell>
            <TableCell>37</TableCell>
            <TableCell>5</TableCell>
            <TableCell>4.0</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  </>
    )
}
function CurvedlineChart(props:any) {
    return (
      <div {...props}>
        <ResponsiveLine
          data={[
            {
              id: "Desktop",
              data: [
                { x: "Jan", y: 43 },
                { x: "Feb", y: 137 },
                { x: "Mar", y: 61 },
                { x: "Apr", y: 145 },
                { x: "May", y: 26 },
                { x: "Jun", y: 154 },
              ],
            },
            {
              id: "Mobile",
              data: [
                { x: "Jan", y: 60 },
                { x: "Feb", y: 48 },
                { x: "Mar", y: 177 },
                { x: "Apr", y: 78 },
                { x: "May", y: 96 },
                { x: "Jun", y: 204 },
              ],
            },
          ]}
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
            min: 0,
            max: "auto",
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 16,
          }}
          colors={["#2563eb", "#e11d48"]}
          pointSize={6}
          useMesh={true}
          gridYValues={6}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          role="application"
        />
      </div>
    )
  }
  
  
  function LineChart(props:any) {
    return (
      <div {...props}>
        <ResponsiveLine
          data={[
            {
              id: "Desktop",
              data: [
                { x: "Jan", y: 43 },
                { x: "Feb", y: 137 },
                { x: "Mar", y: 61 },
                { x: "Apr", y: 145 },
                { x: "May", y: 26 },
                { x: "Jun", y: 154 },
              ],
            },
            {
              id: "Mobile",
              data: [
                { x: "Jan", y: 60 },
                { x: "Feb", y: 48 },
                { x: "Mar", y: 177 },
                { x: "Apr", y: 78 },
                { x: "May", y: 96 },
                { x: "Jun", y: 204 },
              ],
            },
          ]}
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 16,
          }}
          colors={["#2563eb", "#e11d48"]}
          pointSize={6}
          useMesh={true}
          gridYValues={6}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          role="application"
        />
      </div>
    )
  }