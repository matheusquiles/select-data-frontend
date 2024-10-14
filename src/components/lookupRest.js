import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { LookupLabel, Input, LookupButton } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';
import { API_BASE_URL } from '../helpers/constants';

export default function LookupRest({ label, route, id, name, first, small, onChange, onResponse, invalidFields, blocked }) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/${route}/${inputValue}`);
      const resultData = data.length ? { id: data[0][id], name: data[0][name] } : null;
      setResult(resultData);
      setIsLoading(false);
      onChange(resultData);

      if (onResponse) {
        onResponse(resultData);  
      }
    } catch (error) {
      console.log('Erro na requisição:', error);
      setIsLoading(false);
    }
  }, [inputValue, route, id, name, onChange, onResponse]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleLookupClick = () => {
    if (inputValue.trim()) {
      fetchData();
    }
  };

  useEffect(() => {
    if (!blocked) {
      setInputValue('');
    }
  }, [blocked]);

  const isInvalid = invalidFields.includes(route);

  return (
    <LookupLabel first={first} small={small} style={{ borderColor: isInvalid ? 'red' : 'inherit' }}>
      <GenericP>{label}</GenericP>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Digite para buscar"
          style={{ borderColor: isInvalid ? 'red' : 'inherit' }}
        />
        <LookupButton onClick={handleLookupClick}>🔍</LookupButton>
      </div>
      {isInvalid && <span style={{ color: 'red' }}>Este campo é obrigatório.</span>}
      {isLoading && <p>Carregando...</p>}
      {result && <p>Resultado: {result.name}</p>}
    </LookupLabel>
  );
}

