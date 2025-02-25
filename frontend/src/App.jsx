import { useEffect, useState } from "react"
import apiClient from "./apiClient"
import urls from "./urls"

const App = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient.get(urls.index)
        setPosts(response.data)
      } catch (error) {
        console.error(error)
      }
    })()

  }, [])
  
  return (
    <div>
      {posts.map(post => <p key={post.id}>{post.title}</p>)}
    </div>
  )
}

export default App