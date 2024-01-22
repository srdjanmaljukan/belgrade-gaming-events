"use client"

import React from 'react'

interface Props {
  params: {slug: string}
}

const EventPage = ({params}: Props) => {

  return (
    <div>
      <h1>My Event</h1>
      <h3>{params.slug}</h3>
    </div>
  )
}

export default EventPage