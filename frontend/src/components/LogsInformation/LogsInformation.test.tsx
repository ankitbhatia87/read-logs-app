import { render, screen, waitFor } from '@testing-library/react'
import LogsInformation from "./LogsInformation"
import { vi } from "vitest"

vi.mock('../UniqueAddressesSize/UniqueAddressesSize', () => ({
  default: () => <div data-testid="unique-addressSize" />
}))

const uniqueAddressesSizeMock = 15;

const topThreeVisitedURLsMock = [
  { url: '/home', count: 10 },
  { url: '/about', count: 5 }
];

const mostActiveIPAddressesMock = [
  { address: '192.168.0.1', count: 7 },
  { address: '192.168.0.2', count: 5 }
];

describe("Logs Information", () => {
  it("Renders UniqueAddressesSize & TopThreeLogs", async() => {
    render(<LogsInformation 
      uniqueAddressesSize={uniqueAddressesSizeMock}
      topThreeVisitedURLs={topThreeVisitedURLsMock}
      mostActiveIPAddresses={mostActiveIPAddressesMock} />)

    await waitFor(() => {
      expect(screen.getByTestId('unique-addressSize')).toBeInTheDocument()
    })
  })
})