import React from 'react';
import { InputLabel, InputDate } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';


const formatDateForInput = (isoDate) => {
    if (!isoDate) return ''; 
    return new Date(isoDate).toISOString().split('T')[0]; 
  };
  
  const formatDateForApi = (date) => {
    if (!date) return ''; 
    return new Date(date).toISOString(); 
  };


  export default function DateImput({ 
    label, 
    fieldName, 
    first, 
    topless, 
    small, 
    medium, 
    setFormData, 
    onChange, 
    value,
    disabled = false  
  }) {
    const handleChange = ({ target: { value } }) => {
      const formattedValue = formatDateForApi(value); // Converte para ISO ao enviar
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: formattedValue,
      }));
      if (onChange) {
        onChange({ target: { name: fieldName, value: formattedValue } });
      }
    };
  
    return (
      <InputLabel first={first} topless={topless} small={small} medium={medium}>
        <GenericP>{label}:</GenericP>
        <InputDate
          id={label}
          type="date"
          value={formatDateForInput(value)} 
          onChange={handleChange}
          disabled={disabled}
        />
      </InputLabel>
    );
};