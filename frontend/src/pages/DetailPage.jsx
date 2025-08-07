import { useParams } from "react-router"
import GridMainContainer from "../components/GridMainContainer"

const DetailPage = () => {
  const { pk } = useParams()
  return (
   <GridMainContainer>
    <div className="m-4 rounded-2xl bg-white dark:bg-blue-600 sm:w-1/2 h-3/4">
      <h1>{pk}</h1>
    </div>
   </GridMainContainer>
  )
}

export default DetailPage