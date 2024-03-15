import React from 'react'
import Day from './Day'
import {getMonth} from '../util'

function Month({month}) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
        {month.map((week, index) => (
            <React.Fragment key={index}>
                {week.map((day, index_) => (
                    <Day day={day} key={index_} rowIdx={index}/>
                ))}
            </React.Fragment>
        ))}
    </div>
  )
}
export default Month