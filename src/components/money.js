import React from 'react';
import { InputLabel, InputMoney } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';
import { NumericFormat } from 'react-number-format';

export default function MoneyImput({ label, fieldName, first, topless, imgW, small, formData, setFormData, value, onChange }) {
    
    const handleChange = (values) => {
        const { value } = values; 
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
        <InputLabel first={first} topless={topless} imgW={imgW} small={small}>
           <GenericP>{label}:</GenericP>
            <NumericFormat
                id={label}
                value={value}
                onValueChange={handleChange} // Use onValueChange para NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                customInput={InputMoney}
            />
        </InputLabel>
    )
};