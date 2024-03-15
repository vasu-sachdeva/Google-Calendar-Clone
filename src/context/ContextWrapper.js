import React, { useEffect, useMemo, useReducer, useState } from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';
import {getMonth} from '../util';

function savedEventsReducer(state, {type, payload}) {
    switch(type){
        case 'push':
            return [...state, payload];
        case 'update':
            //update a current event
            return state.map(event => event.id === payload.id ? payload : event);
        case 'delete':
            //delete an event
            return state.filter(event => event.id !== payload.id);
        default:
            //no ther action allowed
            throw new Error();
    }
}
function initEvents() {
    const storageEvents = localStorage.getItem('savedEvents');
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
}
function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month()); 
    const [showEventModal, setShowEventModal] = useState(false);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [savedEvents, dispatchEvents] = useReducer(savedEventsReducer, [], initEvents); 
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);

    useEffect(() => {
        if (smallCalendarMonth !== null) {
          setMonthIndex(smallCalendarMonth);
        }
      }, [smallCalendarMonth]);

    function updateLabel(label) {
        setLabels(labels.map(lbl => lbl.label === label.label ? label : lbl));
    }
    
    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set(savedEvents.map(event => event.label))].map(label => {
              const currentLabel = prevLabels.find(prevLabel => prevLabel.label === label);  
              return {label, checked: currentLabel ? currentLabel.checked : true}
            })
        })
    }, [savedEvents]);

    const filteredEvents = useMemo(() => {
        return savedEvents.filter(event => 
            labels.filter(lbl => lbl.checked).map(lbl => lbl.label).includes(event.label)    
        ); 
    }, [savedEvents, labels]);

    useEffect(() => {
        if(!showEventModal) setSelectedEvent(null);
    }, [showEventModal])

    return (
        <GlobalContext.Provider value={{
            monthIndex,
            setMonthIndex,
            showEventModal, 
            setShowEventModal, 
            daySelected, 
            setDaySelected,
            savedEvents,
            dispatchEvents,
            selectedEvent,
            setSelectedEvent,
            labels,
            setLabels,
            updateLabel,
            filteredEvents,
            smallCalendarMonth,
            setSmallCalendarMonth
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default ContextWrapper;