import dayjs from 'dayjs';
import React, {useContext, useState, useEffect} from 'react';
import GlobalContext from '../context/GlobalContext';

function Day({day, rowIdx}) {
  function checkIfCurrentDay(){
    return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY") ? 'bg-blue-600 text-white rounded-full w-7' : '';
  }
  const {setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent} = useContext(GlobalContext);

  const [dayEvents, setDayEvents] = useState([]);
    useEffect(() => {
        const events = filteredEvents.filter(event => dayjs(event.day).format("YYYY-MM-DD") === day.format("YYYY-MM-DD"));
        setDayEvents(events);
    }, [filteredEvents, day]);

  return (
    <div className='border border-gray-200 flex flex-col'>
      <header className='flex flex-col items-center'>
        {rowIdx===0 && (<p className='text-sm p-1 mt-1'>{day.format('ddd').toUpperCase()}</p>)}
        <p className={`text-sm p-1 my-1 text-center ${checkIfCurrentDay()}`}>
          {day.format('D')}
        </p>
      </header>
      <div className="flex-1 cursor-pointer" onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}>
        {dayEvents.map((e,ind) => (
          <div
            key={ind}
            className={`bg-${e.label}-200 p-1 mr-3 text-sm text-gray-600 rounded mb-1 truncate`}
            onClick={() => setSelectedEvent(e)}
          >
            {e.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Day