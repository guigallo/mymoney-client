import React from 'react';
import Typography from '@material-ui/core/Typography';
import TableCustom from '../components/TableCustom';

class View extends React.Component {
  constructor(props, title, columns) {
    super(props);
    this.state = {
      authenticated: false,
      title,
      columns
    }
  };

  componentDidMount = () => this.props.List();
  
  render = () => {
    const { title, columns } = this.state;
    const { list, classes } = this.props;
    const key = list !== undefined ? list : `empty${this.title}`;
    const rows = list !== undefined ? list : [];

    return (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Typography variant="h4" gutterBottom component="h2">
          { title }
        </Typography>

        <TableCustom
          key={ key }
          columns={ columns }
          rows={ rows }
          rowsPerPage={ 5 }
        />
      </main>
    );
  };
}

export default View;