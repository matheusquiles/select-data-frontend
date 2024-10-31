import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setFormData } from '../redux/reducers/formSlice';
import { API_BASE_URL } from '../helpers/constants';

export default function PedidoEditor({ processoId, onSave }) {
    const [pedidos, setPedidos] = useState([]);
    const [tiposPedido, setTiposPedido] = useState([]);
    const [novoTipoPedido, setNovoTipoPedido] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função para carregar pedidos já vinculados ao processo
    const carregarPedidos = useCallback(async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/pedido/porProcesso/${processoId}`);
            console.log('recebido ', data);
            setPedidos(data);
        } catch (error) {
            console.error('Erro ao carregar pedidos:', error);
        }
    }, [processoId]);

    // Função para carregar tipos de pedido disponíveis
    const carregarTiposPedido = useCallback(async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/tipoPedido`);
            setTiposPedido(data);
        } catch (error) {
            console.error('Erro ao carregar tipos de pedido:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Adiciona um novo pedido à lista de pedidos
    const adicionarPedido = () => {
        if (novoTipoPedido) {
            const novoPedido = {
                idPedido: null, // Novo pedido ainda não tem ID
                tipoPedido: novoTipoPedido,
                processo: { id: processoId }, // Associa o processo pelo ID
            };
            setPedidos([...pedidos, novoPedido]);
            setNovoTipoPedido(null); // Limpa o select
        }
    };

    // Remove um pedido da lista
    const removerPedido = (idPedido) => {
        setPedidos(pedidos.filter((p) => p.idPedido !== idPedido));
    };

    // Função para salvar alterações e enviar para o backend
    const salvarAlteracoes = async () => {
        try {
            await axios.put(`${API_BASE_URL}/pedidos/${processoId}`, pedidos);
            if (onSave) onSave(pedidos); // Callback opcional
            alert('Alterações salvas com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar pedidos:', error);
            alert('Erro ao salvar alterações.');
        }
    };

    useEffect(() => {
        carregarPedidos();
        carregarTiposPedido();
    }, [carregarPedidos, carregarTiposPedido]);

    return (
        <div>
            <h3>Editar Pedidos do Processo</h3>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <ul>
                        {pedidos.map((pedido) => (
                            <li key={pedido.idPedido || pedido.tipoPedido?.idTipoPedido}>
                                {pedido.tipoPedido?.descricao || 'Tipo de Pedido Desconhecido'}
                                <button onClick={() => removerPedido(pedido.idPedido)}>
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>

                    <select
                        value={novoTipoPedido?.idTipoPedido || ''}
                        onChange={(e) =>
                            setNovoTipoPedido(
                                tiposPedido.find(
                                    (tipo) => tipo.idTipoPedido === Number(e.target.value)
                                )
                            )
                        }
                    >
                        <option value="">Selecionar tipo de pedido</option>
                        {tiposPedido.map((tipo) => (
                            <option key={tipo.idTipoPedido} value={tipo.idTipoPedido}>
                                {tipo.descricao}
                            </option>
                        ))}
                    </select>
                    <button onClick={adicionarPedido}>Adicionar Pedido</button>

                    <div style={{ marginTop: '10px' }}>
                        <button onClick={salvarAlteracoes}>Salvar Alterações</button>
                    </div>
                </>
            )}
        </div>
    );
}