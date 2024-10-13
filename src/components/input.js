import React, { useState } from 'react';
import { InputLabel, Input } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';

export default function TextInput({ label, fieldName, first, small, medium, topless, formData, setFormData, onChange, invalidFields = [] }) {
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    if (e && e.target && e.target.name && e.target.value !== undefined) {
      const { name, value } = e.target;
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value, 
      }));
      if (onChange) {
        onChange(e); 
      }
      
      if (value.trim() !== '') {
        setError(false);
      }
    } else {
      console.error('Event target is missing name or value:', e ? e.target : 'Event is undefined');
    }
  };

  const isInvalid = invalidFields.includes(fieldName);

  console.log('formData:', formData);
  console.log('fieldName:', fieldName);

  return (
    <InputLabel first={first} small={small} medium={medium} topless={topless} style={{ borderColor: isInvalid ? 'red' : 'inherit' }}>
      <GenericP>{label}:</GenericP>
      <Input
        id={label}
        name={fieldName}
        type="text"
        value={formData?.[fieldName] || ''}
        onChange={handleChange} 
        style={{ borderColor: isInvalid ? 'red' : 'initial' }}
      />
      {isInvalid && <span style={{ color: 'red' }}>Este campo é obrigatório</span>} 
    </InputLabel>
  );
}
