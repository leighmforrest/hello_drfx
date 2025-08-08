import React from 'react'

const GridMainContainer = ({ children }) => (
    <div className="min-h-screen grid p-4 gap-4  bg-blue-200 dark:bg-blue-900 dark:text-white">
        { children }
    </div>
)

export default GridMainContainer