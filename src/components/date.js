import React from 'react';
import { InputLabel, InputDate } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';

export default function DateImput({ label, fieldName, first, topless, small, medium, setFormData, onChange, value }) {
    const handleChange = ({ target: { value } }) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [fieldName]: value,
        }));
        // Chama a função onChange passada como prop
        if (onChange) {
            onChange({ target: { name: fieldName, value } });
        }
    };

    return (
        <InputLabel first={first} topless={topless} small={small} medium={medium}>
            <GenericP>{label}:</GenericP>
            <InputDate
                id={label}
                type="date"
                value={value}
                onChange={handleChange}
            />
        </InputLabel>
    )
};