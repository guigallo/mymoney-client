import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { ignoreFormProperties } from '../utils/propertyType';

export default function SortableTableHead(props) {
  const { columns, order, orderBy, onRequestSort } = props;

  const createSortHandler = id => event => { onRequestSort(event, id) };

  return (
    <TableHead>
      <TableRow>
        {columns.map(column => {
          if (ignoreFormProperties(column)) return null;

          return <TableCell
            key={ column.id + column.label }
            align={ column.align }
            sortDirection={ orderBy === column.id ? order : false }
          >
            <Tooltip
              title="Sort"
              placement={ column.align === 'right' ? 'bottom-end' : 'bottom-start' }
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={order}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        })}
      </TableRow>
    </TableHead>
  )
}

SortableTableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};