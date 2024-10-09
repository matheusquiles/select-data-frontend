import React, { useState } from 'react';
import { InputLabel, Input } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';
import PropTypes from 'prop-types';

export default function TextInput({ label, fieldName, first, topless, imgW, small, formData, setFormData, invalidFields }) {
  const [error, setError] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [fieldName]: value,
    }));
    
    if (value.trim() !== '') {
      setError(false);
    }
  };

  const isInvalid = invalidFields.includes(fieldName);

  return (
    <InputLabel first={first} topless={topless} imgW={imgW} small={small} style={{ borderColor: isInvalid ? 'red' : 'inherit' }}>
      <GenericP>{label}:</GenericP>
      <Input
        id={label}
        type="text"
        value={formData?.[fieldName] || ''} 
        onChange={handleChange}
        style={{ borderColor: isInvalid ? 'red' : 'initial' }} 
      />
      {isInvalid && <span style={{ color: 'red' }}>Este campo é obrigatório</span>} {/* Mensagem de erro */}
    </InputLabel>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  first: PropTypes.bool,
  topless: PropTypes.bool,
  imgW: PropTypes.bool,
  small: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  invalidFields: PropTypes.array.isRequired,
};

TextInput.defaultProps = {
  first: false,
  topless: false,
  imgW: false,
  small: false,
  invalidFields: [],
};