import React from 'react';
import Typography from '@material-ui/core/Typography';
import Protected from '../services/Protected';
import TableCustom from '../components/TableCustom';


export default (view) => {
  const { classes } = view.props;
  const { title, columns, data } = view.state;

  return (
    <main className={ classes.content }>
      <div className={ classes.appBarSpacer } />

      <Typography variant="h4" gutterBottom component="h2">
        { title }
      </Typography>

      <TableCustom
        columns={ columns }
        rows={ data.list || [] }
        rowsPerPage={ 5 }
      />
    </main>
  )
}