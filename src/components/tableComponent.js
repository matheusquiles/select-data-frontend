import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableContainer, Table, Th, Td, Tr, Checkbox } from '../styles/TableComponentStyles.jsx';

const TableComponent = ({ data, columns }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: columns?.[0]?.key || '', direction: 'ascending' });

  const handleRowClick = (index) => {
    setSelectedIndices((prevSelectedIndices) => {
      if (prevSelectedIndices.includes(index)) {
        return prevSelectedIndices.filter((i) => i !== index);
      } else {
        return [...prevSelectedIndices, index];
      }
    });
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
              className={selectedIndices.includes(index) ? 'selected' : ''}
            >
              <Td width="50px">
                <Checkbox
                  checked={selectedIndices.includes(index)}
                  onChange={() => handleRowClick(index)}
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
};

export default TableComponent;