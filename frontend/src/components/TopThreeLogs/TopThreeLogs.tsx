import { LogCount } from "../../types/logsList";

type TopThreeLogs = {
  title: string;
  data: LogCount[]
}

const TopThreeLogs = (props: TopThreeLogs) => {
  const {data, title} = props ?? {}

  return (
    <li>
        <h2 className='text-2xl font-medium  pb-4'>{title}</h2>
        <ul className='flex flex-col gap-5 justify-center text-gray-500'>
          {
            data.map(val => (
              <li className='text-xl' key={val.url || val.address}>{val.url || val.address}, ({val.count})</li>
            ))
          }
          
        </ul>
      </li>
  )
}

export default TopThreeLogs;