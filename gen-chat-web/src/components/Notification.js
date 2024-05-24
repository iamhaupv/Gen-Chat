import React from 'react'

export default function Notification({message}) {
  return (
    <div className="text-center text-black p-2 text-sm font-normal dark:text-white">
      {message.content}
    </div>
  )
}
