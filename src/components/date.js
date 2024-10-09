import React from 'react';
import { InputLabel, InputDate } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';

export default function DateImput({ label, fieldName, first, topless, imgW, small, medium, formData, setFormData, value, onChange }) {
    const handleChange = ({ target: { value } }) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [fieldName]: value,
        }));
    };

    return (
        <InputLabel first={first} topless={topless} imgW={imgW} small={small} medium={medium}>
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
