import { useState, useCallback } from 'react'

export function useFetch() {
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)

  const statusType = {
    IDLE: 'IDLE',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED',
  }

  const [status, setStatus] = useState(statusType.IDLE)

  const retrieve = useCallback(async (url, fetchOptions) => {
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
    })
    const options = {
      headers: fetchHeaders,
      mode: 'cors',
      ...fetchOptions,
    }
    let json = null

    try {
      const response = await fetch(url, options)

      if (response.status !== 200 && !response.ok) {
        throw new Error(`request failed with status: ${response.status}`)
      }

      json = await response.json()
      setResults(json)
    } catch (err) {
      setError(err)
      setStatus(statusType.REJECTED)
    } finally {
      setStatus(statusType.FULFILLED)
    }

    return json
  }, [])

  return {
    retrieve,
    results,
    isLoading: status === statusType.IDLE,
    isFinished: status === statusType.FULFILLED,
    isRejected: status === statusType.REJECTED,
    error,
  }
}
