import React from 'react'
import Nav from './Nav'
import Table from './Table'
import Timezone from './Timezone'

const Calendar = () => {
  return (
    <div className=' p-1 flex flex-col gap-3'>
        <Nav/>
        <Timezone/>
        <Table/>
    </div>
  )
}

export default Calendar