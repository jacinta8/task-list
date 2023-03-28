import { useState, useCallback } from "react"

export type RequestConfig = {
  url: string
  method?: string
  body?: { text: string }
  headers?: Record<string, string>
}

export type ApplyData = (data: any) => void

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const sendRequest = useCallback(
    async (requestConfig: RequestConfig, applyData: ApplyData) => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "get",
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          headers: requestConfig.headers ? requestConfig.headers : {},
        })

        if (!response.ok) {
          throw new Error("Request failed!")
        }
        const data = await response.json()
        applyData(data)
      } catch (err: any) {
        setError(err.message || "Something went wrong!")
      }
      setIsLoading(false)
    },
    []
  )

  return { isLoading, error, sendRequest }
}

export default useHttp
