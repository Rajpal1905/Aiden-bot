import React from 'react'

export const UserChat = ({ message, chatresponse }) => {
  return (
    <div className="mb-4">
      <div className="bg-blue-100 text-blue-900 p-3 rounded-lg mb-2 shadow-sm">
        <span className="font-semibold">User:</span> {message}
      </div>
      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg shadow-sm">
        <span className="font-semibold">Bot:</span> {chatresponse}
      </div>
    </div>
  )
}
 