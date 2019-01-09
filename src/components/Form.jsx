import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class View extends React.Component {
  constructor(props, title, properties) {
    super(props);
    this.state = {
      authenticated: false,
      title,
      properties
    }
  };
  
  render = () => {
    const { title, properties } = this.state;
    const { classes } = this.props;

    return (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Typography variant="h4" gutterBottom component="h2">
          Create { title }
        </Typography>

        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            {properties.map(property => (
              <TextField
                key={ property.id }
                id={ property.id }
                label={ property.label }
                placeholder={ property.placeholder }
                type={ property.type }
                className={ classes.textField }
                margin="normal"
                variant="outlined"
              />
            ))}

            <div className={ classes.buttonWrapper }>
              <Button variant="contained" color="primary" className={classes.button}>
                Create
              </Button>

              <Button variant="outlined" className={classes.button}>
                Clear
              </Button>

              <Button variant="outlined" color="secondary" className={classes.button} onClick={buttonAction}>
                Cancel
              </Button>
            </div>
          </div>
        </Paper>
      </main>
      );
    };
  }
export default View;

const buttonAction = button => {
  console.log(button.target)
}