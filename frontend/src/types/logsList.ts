type Logs = {
  address: string;
  id: string;
  message: string;
}

export type LogsListProps = {
  logsList: Logs[] | undefined
}

export type LogCount = {
  url?: string;
  address?: string;
  count: number;
}

export type LogsInformationProps = {
  uniqueAddressesSize: number
  topThreeVisitedURLs: LogCount[]
  mostActiveIPAddresses: LogCount[]
}

export type LogsData = LogsInformationProps & {
  data: Logs[]
}