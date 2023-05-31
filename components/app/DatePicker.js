import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'

const DatePicker = () => {
    const [date, setDate] = React.useState()
  return (
    <>
    
      <Popover>
      <PopoverTrigger asChild>
      <button className="text-lg flex items-center py-3 px-4 text-white bg-[#344054] rounded-[5px]">
      <i class="las la-calendar-day"></i>
        Date posted
      </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    </>
  )
}

export default DatePicker