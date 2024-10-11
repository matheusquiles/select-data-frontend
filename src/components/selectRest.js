import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setOptions } from '../redux/reducers/formSlice'; 
import { InputLabel, StyledSelect } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';
import { API_BASE_URL } from '../helpers/constants';
import PropTypes from 'prop-types';

export default function SelectRest({ label, first, medium, topless, small, route, id, name, onChange, defaultValue, invalidFields }) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.form.formData[route] || defaultValue); // Obtenha o valor do formData
  const options = useSelector((state) => state.form.options[route] || []); // Obtenha as opções do Redux
  const isInvalid = invalidFields.includes(route);

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/${route}`);
      const thisOptions = data.map((obj) => ({ id: obj[id], name: obj[name] }));
      
      dispatch(setOptions({ route, options: thisOptions }));
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  }, [route, id, name, dispatch]);

  const handleSelect = (event) => {
    const { value } = event.target;
    dispatch(setFormData({ [route]: value })); 
    onChange(prevForm => ({
      ...prevForm,
      [name]: value 
    }));
  };

  useEffect(() => {
    if (!options.length) getData();
  }, [getData, options.length]);

  return (
    options.length === 0
      ? <p>Carregando...</p>
      : (
        <InputLabel first={first} medium={medium} topless={topless} small={small} style={{ borderColor: isInvalid ? 'red' : 'inherit' }}>
          <GenericP>{label}:</GenericP>
          <StyledSelect onChange={handleSelect} value={selected} style={{ borderColor: isInvalid ? 'red' : 'inherit' }}>
            <option value="">{`Selecione`}</option>
            {options.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
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
  small: PropTypes.bool,
  route: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  invalidFields: PropTypes.array.isRequired,
};

SelectRest.defaultProps = {
  first: false,
  topless: false,
  small: false,
  defaultValue: '',
};
