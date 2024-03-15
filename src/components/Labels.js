import React, {useContext} from 'react'
import GlobalContext from '../context/GlobalContext'

function Labels() {
  const {labels, updateLabel} = useContext(GlobalContext);
  return (
    <React.Fragment>
      {labels.map(({label: lbl, checked}, index) => {
        return (
          <label key={index} className='items-center mt-3 block'>
            <input type="checkbox" checked={checked}
              className={`form-checkbox h-5 w-5 accent-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
              onChange={() => updateLabel({label: lbl, checked: !checked})}
            />
            <span className='ml-2 text-gray-700 capitalize'>{lbl}</span>
          </label>
        )
      })}
    </React.Fragment>
  )
}

export default Labels