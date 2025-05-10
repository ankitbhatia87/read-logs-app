import { LogsInformationProps } from "../../types/logsList";
import TopThreeLogs from "../TopThreeLogs/TopThreeLogs";
import UniqueAddressesSize from "../UniqueAddressesSize/UniqueAddressesSize";

const LogsInformation = (props: LogsInformationProps) => {
  const {topThreeVisitedURLs, mostActiveIPAddresses, uniqueAddressesSize} = props ?? {}
  console.log({topThreeVisitedURLs})
  return (
    <ul className='flex justify-between'>
      <UniqueAddressesSize uniqueAddressesSize={uniqueAddressesSize} />
      <TopThreeLogs title="Most visited URLs" data={topThreeVisitedURLs} />
      <TopThreeLogs title="Most Active IP Addresses" data={mostActiveIPAddresses} />
    </ul>
  )
}

export default LogsInformation;