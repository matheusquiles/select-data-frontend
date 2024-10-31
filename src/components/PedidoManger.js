import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setOptions, setSelectedPedidos, setLoading } from '../redux/reducers/formSlice';
import { API_BASE_URL } from '../helpers/constants';

export default function PedidoManager({ form, disabled = false }) {
  const dispatch = useDispatch();
  const options = useSelector(state => state.form.options['tipoPedido'] || []);
  const pedidos = useSelector(state => state.form.selectedPedidos);

  const [selectedTipoPedido, setSelectedTipoPedido] = useState(null);

  const loadTipoPedidoOptions = useCallback(async () => {
    dispatch(setLoading(true));
    if (options.length === 0) {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/tipoPedido`);
        const optionsData = data.map(item => ({
          id: item.idTipoPedido,
          descricao: item.descricao,
        }));
        dispatch(setOptions({ route: 'tipoPedido', options: optionsData }));
      } catch (error) {
        console.error("Erro ao carregar opções de tipo de pedido", error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  }, [dispatch, options.length]);

  useEffect(() => {
    loadTipoPedidoOptions();
  }, [loadTipoPedidoOptions]);

  useEffect(() => {
    if (form && form.pedido && form.pedido.length !== pedidos.length) {
      const pedidosInicializados = form.pedido.map(p => ({
        idPedido: p.idPedido,
        idTipoPedido: p.idTipoPedido,
        descricao: p.descricao,
        pedidoGanhoPrimeiraInstancia: p.pedidoGanhoPrimeiraInstancia,
        pedidoGanhoSegundaInstancia: p.pedidoGanhoSegundaInstancia,
        pedidoGanhoTerceiraInstancia: p.pedidoGanhoTerceiraInstancia,
      }));
      dispatch(setSelectedPedidos(pedidosInicializados));
    }
  }, [form, pedidos.length, dispatch]);

  const handleAddPedido = () => {
    if (selectedTipoPedido) {
      const newPedido = {
        idTipoPedido: selectedTipoPedido.id,
        descricao: selectedTipoPedido.descricao,
      };
      dispatch(setSelectedPedidos([...pedidos, newPedido]));
      setSelectedTipoPedido(null);
    }
  };

  const handleRemovePedido = (idPedido) => {
    const updatedPedidos = pedidos.filter(pedido => pedido.idPedido !== idPedido);
    dispatch(setSelectedPedidos(updatedPedidos));
  };

  const isLoading = useSelector((state) => state.form.isLoading);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3>Pedidos</h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <select
        disabled={disabled || isLoading}
          value={selectedTipoPedido ? selectedTipoPedido.id : ''}
          onChange={(e) => {
            const tipo = options.find(opt => opt.id === Number(e.target.value));
            setSelectedTipoPedido(tipo || null);
          }}
          style={{ padding: '5px' }}
        >
          <option value="">Selecione o tipo de pedido</option>
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.descricao}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddPedido}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '25px',
            height: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          disabled={!selectedTipoPedido}
        >
          +
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {pedidos.map((pedido) => (
          <li
            key={pedido.idPedido}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {pedido.descricao}
            <button
              onClick={() => handleRemovePedido(pedido.idPedido)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
