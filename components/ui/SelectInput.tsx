import React from 'react'
import FancyButton from './fancy-button'

const SelectInput = ({ 
  value, 
  onChange,
  children
}: {
  value?: string, 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  children: React.ReactNode
}) => {
  return (
    <FancyButton asChild>
      <select onChange={ (e) => { onChange(e) } } value={ value }>
        { children }
      </select>
    </FancyButton>
  )
}

export default SelectInput