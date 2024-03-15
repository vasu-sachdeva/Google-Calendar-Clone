import React, { useContext } from 'react'
import logo from "../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';

function CalendarHeader() {
  const {monthIndex, setMonthIndex} = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className='px-4 py-2 flex items-center'>
      <img src={logo} alt="logo" className="w-12 h-12 mr-2" />
      <h1 className='mr-10 text-xl text-gray-600'>Calendar</h1>
      <button className="border rounded py-2 px-4 mr-5" onClick={handleReset}>
        Today
      </button>
      <FontAwesomeIcon className='cursor-pointer mx-2 text-gray-600' icon={faChevronLeft} onClick={handlePrevMonth}/>
      <FontAwesomeIcon className='cursor-pointer mx-2 text-gray-600' icon={faChevronRight} onClick={handleNextMonth} />
      <h2 className='ml-4 text-xl text-gray-500 font-bold'>
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </header>
  )
}

export default CalendarHeader