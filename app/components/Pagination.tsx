import Link from 'next/link'
import React from 'react'

interface Props {
    page: number
    lastPage: number
}

const Pagination = ({page, lastPage}: Props) => {
  return (
    <>
        {+page > 1 && (
        <Link href={`/events?page=${+page - 1}`} className="btn-secondary">Prev</Link>
      )}
      {+page < lastPage && (
        <Link href={`/events?page=${+page + 1}`} className="btn-secondary">Next</Link>
      )}
    </>
  )
}

export default Pagination