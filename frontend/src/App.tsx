import { useEffect, useState } from 'react'
import './App.css'
import LogsList from './components/LogsList/LogsList';
import { LogsData } from './types/logsList';
import LogsInformation from './components/LogsInformation/LogsInformation';

const ENDPOINT = "http://localhost:3030/graphql";

function App() {
  const [logs, setLogs] = useState<LogsData>()

  useEffect(() => {
    (async() => {
      try {
        const response = await fetch(`${ENDPOINT}/logs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query GetLogFile($fileName: String!) {
                getLogFile(fileName: $fileName) {
                  data {
                    id
                    address
                    message
                  }
                  uniqueAddressesSize
                  topThreeVisitedURLs {
                    url
                    count
                  }
                  mostActiveIPAddresses {
                    address
                    count
                  }
                }
              }`,
            variables: {
              fileName: "data.log"
            }
          })
        })

        const result = await response.json();
        setLogs(result.data.getLogFile)
      } catch(err) {
        console.error(err);
        throw new Error(err as string)
      }
    })();
  }, [])

  
  return (
    <div className='flex flex-col gap-10'>
    {
      logs &&
      <>
        <LogsInformation 
          data-testid="logs-information"
          topThreeVisitedURLs={logs?.topThreeVisitedURLs} 
          mostActiveIPAddresses={logs?.mostActiveIPAddresses} 
          uniqueAddressesSize={logs?.uniqueAddressesSize} />
        <LogsList logsList={logs?.data} />
      </>
    }  
    </div>
  )
}

export default App
