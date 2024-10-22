import React from 'react';
import { LookupLabel, Input, LookupButton } from '../styles/formulario';
import { useSelector, useDispatch } from 'react-redux'; 
import { setLoading } from '../redux/reducers/formSlice';
import { GenericP } from '../styles/globalstyles';

export default function LookupRest({ label, value, first, small, onChange, onSearch }) {
  const isLoading = useSelector((state) => state.form.isLoading); 
  const dispatch = useDispatch();


  const handleSearch = async () => {
    dispatch(setLoading(true)); 
    try {
      await onSearch(); 
    } catch (error) {
      console.error("Erro ao buscar:", error);
    } finally {
      dispatch(setLoading(false)); 
    }
  };

  return (
    <LookupLabel first={first} small={small} style={{ borderColor: 'inherit' }}>
      <GenericP>{label}</GenericP>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Digite para buscar"
          disabled={isLoading} 
        />
        <LookupButton type="button" onClick={handleSearch} disabled={isLoading}>
          🔍
        </LookupButton>
      </div>
    </LookupLabel>
  );
}
