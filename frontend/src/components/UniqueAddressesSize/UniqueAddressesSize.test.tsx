import { render, screen } from '@testing-library/react'
import UniqueAddressesSize from './UniqueAddressesSize';

describe("UniqueAddressesSize", () => {
  it("Renders UniqueAddressesSize when provided", () => {
    render(<UniqueAddressesSize uniqueAddressesSize={15} />)
      expect(screen.getByText("Unique Addresses")).toBeInTheDocument()
      expect(screen.getByText("15")).toBeInTheDocument()
  })
})