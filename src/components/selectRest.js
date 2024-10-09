import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { InputLabel, StyledSelect } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';
import { API_BASE_URL } from '../helpers/constants';
import PropTypes from 'prop-types';

export default function SelectRest({ label, first, topless, imgW, small, route, id, name, onChange, form, defaultValue, invalidFields }) {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(defaultValue || '');

  const getData = useCallback(async () => {
    try {
      const thisOptions = [];
      const { data } = await axios.get(`${API_BASE_URL}/${route}`);

      data.map((obj) => thisOptions.push({ id: obj[id], name: obj[name] }));
      
      setOptions(thisOptions);
      setIsLoading(false);
    } catch (error) { console.log('Erro na requisição:', error) }
  }, [route, id, name]);

  function handleSelect({ target: { value, options, selectedIndex } }) {
    const selectedName = options[selectedIndex].text;
    setSelected(value);
    onChange(prevForm => ({
      ...prevForm,
      [route]: Number(value)
    }));
  }

  useEffect(() => {
    if (!options.length) getData();
  }, [getData, options.length]);

  const isInvalid = invalidFields.includes(route);

  return (
    isLoading
    ? <p>Carregando...</p>
    : (
      <InputLabel first={first} topless={topless} imgW={imgW} small={small} style={{ borderColor: isInvalid ? 'red' : 'inherit' }}>
        <GenericP>{label}:</GenericP>
        <StyledSelect onChange={handleSelect} value={selected} style={{ borderColor: isInvalid ? 'red' : 'inherit' }}>
          <option value="">{`Selecione`}</option> {/* Opção padrão em branco */}
          {options.map(({ id, name }) => <option key={name} value={id}>{name}</option>)}
        </StyledSelect>
        {isInvalid && <span style={{ color: 'red' }}>Este campo é obrigatório.</span>}
      </InputLabel>
    )
  );
}

SelectRest.propTypes = {
  label: PropTypes.string.isRequired,
  first: PropTypes.bool,
  topless: PropTypes.bool,
  imgW: PropTypes.bool,
  small: PropTypes.bool,
  route: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  invalidFields: PropTypes.array.isRequired,
};

SelectRest.defaultProps = {
  first: false,
  topless: false,
  imgW: false,
  small: false,
  defaultValue: '',
};