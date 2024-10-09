import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { InputLabel, StyledSelect, SelectedItem, RemoveButton } from '../styles/formulario'; // Importa os estilos
import { GenericP } from '../styles/globalstyles';
import { API_BASE_URL } from '../helpers/constants';

export default function MultiSelectRest({ label, first, topless, imgW, small, route, id, name, onChange, form, defaultValue, invalidFields }) {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/${route}`);
      const thisOptions = data.map((obj) => ({ id: obj[id], name: obj[name] }));
      setOptions(thisOptions);
      setIsLoading(false);
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  }, [route, id, name]);

  useEffect(() => {
    getData();

    if (defaultValue && defaultValue.length > 0) {
      setSelectedItems(defaultValue);
       onChange(defaultValue.map(item => ({ idTipoPedido: item.id })));
    }
  }, [getData, defaultValue, onChange]);


  const handleSelect = ({ target: { value } }) => {
    const selectedItem = options.find(option => option.id === Number(value));

    console.log("Valor selecionado:", value); // Log
    console.log("Item selecionado encontrado:", selectedItem); // Log

    if (selectedItem && !selectedItems.some(item => item.id === selectedItem.id)) {
        const newSelectedItems = [...selectedItems, selectedItem];
        setSelectedItems(newSelectedItems);

        console.log("Itens selecionados após adicionar:", newSelectedItems); // Log

        // Aqui, você precisa passar os novos itens selecionados
        onChange(newSelectedItems); // Passando os itens selecionados
    }
};


  const removeItem = (itemId) => {
    const newSelectedItems = selectedItems.filter(item => item.id !== itemId);
    setSelectedItems(newSelectedItems);

    onChange(newSelectedItems.map(item => ({
      idTipoPedido: item.id // Aqui também deve ser o id do item
    })));
  };

  const isInvalid = invalidFields.includes(route);

  return (
    isLoading ? <p>Carregando...</p> : (
      <InputLabel first={first} topless={topless} imgW={imgW} small={small} style={{ borderColor: isInvalid ? 'red' : 'inherit' }}>
        <GenericP>{label}:</GenericP>

        {/* Dropdown de seleção */}
        <StyledSelect onChange={handleSelect} value="">
          <option value="">{`Selecione`}</option>
          {options.map(({ id, name }) => (
            <option key={id} value={id} disabled={selectedItems.some(item => item.id === id)}>
              {name}
            </option>
          ))}
        </StyledSelect>

        {/* Lista de itens selecionados abaixo */}
        <div style={{ marginTop: '10px' }}>
          {selectedItems.map(item => (
            <SelectedItem key={item.id}>
              {item.name}
              <RemoveButton onClick={() => removeItem(item.id)}>
                &times;
              </RemoveButton>
            </SelectedItem>
          ))}
        </div>

        {isInvalid && <span style={{ color: 'red' }}>Este campo é obrigatório.</span>}
      </InputLabel>
    )
  );
}
