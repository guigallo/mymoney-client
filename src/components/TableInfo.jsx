import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const TableInfo = props => {
  const { keys, obj } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Property</TableCell>
          <TableCell align="right">Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {keys.map(row => {
          if(row === '_id' || row === '__v')
          return <React.Fragment key={row}/>;

          return (
            <TableRow key={row}>
              <TableCell component="th" align="left" scope="row">{row}</TableCell>
              <TableCell align="right">{row !== 'paid' ? obj[row] : obj[row].toString()}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}

export default TableInfo;