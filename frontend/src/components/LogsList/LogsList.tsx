import { LogsListProps } from "../../types/logsList";

const LogsList = (props: LogsListProps) => {
  const {logsList} = props ?? []
  return (
    <ul className='text-left h-96 overflow-auto flex flex-col items-start gap-5'>
      {
        logsList?.map(log => (
            <li key={log.id} className='border border-solid border-gray-300 p-5'>
              <span className='font-bold'>Address:</span> {log.address} <br />
              <span className='font-bold'>Message:</span> {log.message}
            </li>
        ))
      }
    </ul>
  )
}

export default LogsList;