import React from 'react'
import MainContainer from '../components/MainContainer'

const ErrorPage = () => {
  return (
    <MainContainer>
        <div className="bg-white dark:bg-blue-950 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p>Unable. Malfunction. Need Input.</p>
        </div>
    </MainContainer>
  )
}

export default ErrorPage