import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPedidos } from '../redux/reducers/formSlice';
import { TableContainer, Table, Th, Td, Tr, Checkbox, LoadingOverlay, DisabledTable } from '../styles/TableComponentStyles.jsx';

const TableComponent = ({ data, columns, isLoading }) => {
  const dispatch = useDispatch();
  const selectedPedidos = useSelector((state) => state.form.selectedPedidos);
  const [sortConfig, setSortConfig] = useState({ key: columns?.[0]?.key || '', direction: 'ascending' });

  const handleRowClick = (index, row) => {
    const updatedSelectedPedidos = selectedPedidos.includes(row.id)
      ? selectedPedidos.filter((id) => id !== row.id)
      : [...selectedPedidos, row.id];
    dispatch(setSelectedPedidos(updatedSelectedPedidos));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
    <TableContainer>
      {isLoading && (
        <LoadingOverlay>
          <div>Carregando...</div>
        </LoadingOverlay>
      )}
      <DisabledTable style={{ pointerEvents: isLoading ? 'none' : 'auto', opacity: isLoading ? 0.5 : 1 }}>
        <Table>
          <thead>
            <tr>
              <Th width="50px"></Th> {/* Coluna para o checkbox de seleção */}
              {columns?.map((column, index) => (
                <Th
                  key={index}
                  width={column.width}
                  onClick={() => handleSort(column.key)}
                >
                  {column.title}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <Tr
                key={index}
                className={selectedPedidos.includes(row.id) ? 'selected' : ''}
              >
                <Td width="50px">
                  <Checkbox
                    checked={selectedPedidos.includes(row.id)}
                    onChange={() => handleRowClick(index, row)}
                  />
                </Td>
                {columns?.map((column, colIndex) => (
                  <Td key={colIndex} width={column.width}>
                    {row[column.key]}
                  </Td>
                ))}
              </Tr>
            ))}
          </tbody>
        </Table>
      </DisabledTable>
    </TableContainer>
  );
};

TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      width: PropTypes.string,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default TableComponent;