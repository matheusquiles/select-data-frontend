import React from 'react';
import { InputLabel, InputMoney } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';
import { NumericFormat } from 'react-number-format';

export default function MoneyImput({ label, fieldName, first, topless, imgW, small, formData, setFormData, value, onChange }) {
    
    const handleChange = (values) => {
        const { value: numericValue } = values; // Renomeia para evitar conflito com prop "value"
        
        // Atualiza o estado global (Redux ou estado local)
        setFormData((prevFormData) => ({
          ...prevFormData,
          [fieldName]: numericValue,
        }));
    
        // Chama o onChange se for passado
        if (onChange) {
          onChange({ target: { name: fieldName, value: numericValue } });
        }
      };

    return (
        <InputLabel first={first} topless={topless} imgW={imgW} small={small}>
           <GenericP>{label}:</GenericP>
            <NumericFormat
                id={label}
                value={value || ''} // Garante que o valor seja uma string
                onValueChange={handleChange}
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