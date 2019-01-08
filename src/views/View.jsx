import React from 'react';
import Typography from '@material-ui/core/Typography';
import TableCustom from '../components/TableCustom';

class View extends React.Component {
  constructor(props, title, columns) {
    super(props);
    this.state = {
      authenticated: false,
      title,
      columns,
      data: []
    }
  };

  componentDidMount = () => this.props.List().then(list => {console.log(list); this.setState({ data: list })});
  
  render = () => {
    const { data, title, columns } = this.state;
    const { classes } = this.props;
    const key = data.list !== undefined ? data.list.key : 'empty';
    console.log(this.state.data)

    return (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Typography variant="h4" gutterBottom component="h2">
          { title }
        </Typography>

        <TableCustom
          key={ key }
          columns={ columns }
          rows={ data.list || [] }
          rowsPerPage={ 5 }
        />
      </main>
    );
  };
}

export default View;