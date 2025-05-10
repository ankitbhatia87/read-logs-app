type UniqueAddressesSizeProps = {
  uniqueAddressesSize: number | undefined
}

const UniqueAddressesSize = (props: UniqueAddressesSizeProps) => {
  const { uniqueAddressesSize } = props ?? 0;
  return (
    <li>
      <h2 className='text-2xl font-medium'>Unique Addresses</h2>
      <p className='flex justify-center pt-5 h-full text-4xl text-amber-500'>{uniqueAddressesSize}</p>
    </li>
  )
}

export default UniqueAddressesSize;