import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, vi } from 'vitest'
import App from './App'

vi.mock('./components/LogsInformation/LogsInformation', () => ({
  default: () => <div data-testid="logs-information" />
}))

vi.mock('./components/LogsList/LogsList', () => ({
  default: () => <div data-testid="logs-list" />
}))

const mockLogsData = {
  data: {
    getLogFile: {
      data: [
        { id: '1', address: '192.168.0.1', message: 'GET /home HTTP/1.1' },
        { id: '2', address: '192.168.0.2', message: 'GET /about HTTP/1.1' }
      ],
      uniqueAddressesSize: 2,
      topThreeVisitedURLs: [
        { url: '/home', count: 10 },
        { url: '/about', count: 5 }
      ],
      mostActiveIPAddresses: [
        { address: '192.168.0.1', count: 7 },
        { address: '192.168.0.2', count: 5 }
      ]
    }
  }
}

describe("App Component", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockLogsData)
    })
  })

  it("renders LogsInformation and LogsList after data fetch", async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByTestId('logs-information')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByTestId('logs-list')).toBeInTheDocument()
    })
  })
})