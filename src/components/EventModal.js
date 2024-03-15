import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines, faTimes, faClock, faFileLines, faBookmark, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import GlobalContext from '../context/GlobalContext';
const labels = ["indigo", "gray", "green", "blue", "red", "purple"];
function EventModal() {
    const { setShowEventModal, daySelected, dispatchEvents, selectedEvent } = useContext(GlobalContext);
    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '');
    const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? labels.find(label => label === selectedEvent.label) : labels[0]);

    // const [state, dispatch] = useReducer(reducer, initialState); dispatch is a method used to specify the action
    // newState = reducer(currentState, action)

    function handleSubmit(event){
        event.preventDefault(); //prevent the page from refreshing
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.format("YYYY-MM-DD"),
            id: selectedEvent ? selectedEvent.id : Date.now()
        }
        if(selectedEvent) dispatchEvents({type: 'update', payload: calendarEvent});
        else dispatchEvents({type: 'push', payload: calendarEvent});
        setShowEventModal(false);
    }

    return (
        <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
                    <FontAwesomeIcon icon={faGripLines} className='cursor-pointer' />
                    <div>
                        {selectedEvent && <FontAwesomeIcon icon={faTrash} className='cursor-pointer text-gray-600 mr-4' onClick={() => {
                            dispatchEvents({type: 'delete', payload: selectedEvent});
                            setShowEventModal(false);
                        }} />}
                        <FontAwesomeIcon icon={faTimes} className='cursor-pointer text-gray-600' onClick={() => setShowEventModal(false)} />
                    </div>
                </header>
                <div className='p-3'>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr', gap: '1.75rem', alignItems: 'end' }}>
                        <div></div>
                        <input 
                          type="text" 
                          name='title' 
                          placeholder='Add title here' 
                          required
                          value={title} onChange={(e) => setTitle(e.target.value )}
                          className='pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500'
                        />
                        <FontAwesomeIcon icon={faClock} className='text-gray-500' />
                        <p>{daySelected.format("dddd, MMMM DD")}</p>
                        <FontAwesomeIcon icon={faFileLines} className='text-gray-500' />
                        <input 
                          type="text" 
                          name='description' 
                          placeholder='Add description' 
                          required
                          value={description} onChange={(e) => setDescription(e.target.value )}
                          className='border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500'
                        />
                        <FontAwesomeIcon icon={faBookmark} className='text-gray-500' />
                        <div className="flex gap-x-2">
                            {labels.map((color, index) => (
                                <span key={index} className={`bg-${color}-500 w-6 h-6 rounded-full flex items-center cursor-pointer`} onClick={() => setSelectedLabel(color)}>
                                    {selectedLabel===color && <FontAwesomeIcon icon={faCheck} className='text-white text-sm m-auto' />}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className='flex justify-end border-t p-3 mt-5'>
                    <button type='submit' className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white' onClick={handleSubmit}>
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
}

export default EventModal;
