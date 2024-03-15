import React, {useContext} from 'react'
import plus from '../assets/plus.svg'
import GlobalContext from '../context/GlobalContext'
function CreateEventButton() {
  const {setShowEventModal} = useContext(GlobalContext);
  return (
    <button className='border cursor-pointer shadow-md p-2 rounded-full flex hover:shadow-2xl' onClick={() => setShowEventModal(true)}>
        <img src={plus} alt="plus sign" className='w-7 h-7'/>
        <span className='pl-3 pr-7'>Create</span>
    </button>
  )
}

export default CreateEventButton