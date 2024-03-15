import React, {useEffect, useState, useContext} from 'react'
import dayjs from 'dayjs'
import {getMonth} from '../util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import GlobalContext from '../context/GlobalContext';

function SmallCalendar() {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    const {setDaySelected, setShowEventModal, monthIndex} = useContext(GlobalContext);
    useEffect(() => {
        setCurrentMonthIdx(monthIndex);
    }, [monthIndex]);     
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);
    

    const onPreviousMonth = () => { setCurrentMonthIdx(currentMonthIdx-1); }
    const onNextMonth = () => { setCurrentMonthIdx(currentMonthIdx+1); }
    function checkIfCurrentDay(day){
        return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY") ? 'bg-blue-500 text-white rounded-full' : '';
    }
  return (
    <div className='mt-9'>
        <header className='flex justify-between'>
            <p>
                {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
            </p>
            <div>
                <FontAwesomeIcon className='cursor-pointer mx-2 text-gray-600' icon={faChevronLeft} onClick={onPreviousMonth}/>
                <FontAwesomeIcon className='cursor-pointer mx-2 text-gray-600' icon={faChevronRight} onClick={onNextMonth} />
            </div>
        </header>
        <div className='grid grid-cols-7 grid-rows-6'>
            {currentMonth[0].map((day, index) => (
                <div key={index} className='text-sm text-center py-1' >
                    {day.format('dd').charAt(0)}
                </div>
            ))}


            {currentMonth.map((week, index) => (
                <React.Fragment key={index}>
                    {week.map((day, index_) => (
                        <button key={index_} className={`py-1 w-full ${checkIfCurrentDay(day)}`} onClick={
                            () => {
                                setDaySelected(day);
                                setShowEventModal(true);
                            }
                        }>
                            <span className='text-sm'>{day.format('D')}</span>
                        </button>
                    ))}
                </React.Fragment>
            ))}
        </div>
    </div>
  )
}

export default SmallCalendar