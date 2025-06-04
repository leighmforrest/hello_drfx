import React, { useEffect, useState } from "react";

import api from "./apiClient";

const IndexPage = () => {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const { data } = await api.get("/")
        setMessage(data.message)
      } catch (error) {
        console.log(error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
      
    })()
  }, [])

  if (isLoading) return <h2>Loading...</h2>

  if (isError) return <h1>Unable. Malfunction. Need input.</h1>

  return <h1 className="text-3xl font-bold underline bg-amber-300">Hello world!</h1>;
};

export default IndexPage;
