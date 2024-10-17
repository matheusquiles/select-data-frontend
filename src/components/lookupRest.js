import React from 'react';
import { LookupLabel, Input, LookupButton } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';

export default function LookupRest({ label, value, first, small, onChange, onSearch, invalidFields, blocked }) {

  return (
    <LookupLabel first={first} small={small} style={{ borderColor: 'inherit' }}>
      <GenericP>{label}</GenericP>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Digite para buscar"
          sty
        />
        <LookupButton type="button" onClick={onSearch}>🔍</LookupButton>
      </div>
    </LookupLabel>
  );
}

