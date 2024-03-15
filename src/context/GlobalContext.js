//we just define the global context variables here, with random values that dont matter
import React from 'react';

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},

    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => {},

    showEventModal: false,
    setShowEventModal: () => {},

    daySelected: null,
    setDaySelected: (day) => {},

    savedEvents: [],
    dispatchEvents: ({type, payload}) => {},

    selectedEvent: null,
    setSelectedEvent: () => {},

    labels: [],
    setLabels: () => {},
    updateLabel: () => {},
    filteredEvents: [],
});

export default GlobalContext;