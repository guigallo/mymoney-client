import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import styles from '../styles/login';
import withStyles from '@material-ui/core/styles/withStyles';
import { logIn } from '../services/api';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockOutlined';

class Login extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      authenticated: false,
      msg: props.location.search.substring(5),
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendForm = this.sendForm.bind(this);
  };

  sendForm(event) {
    event.preventDefault();
    logIn(this.state.email, this.state.password)
      .then(token => {
        localStorage.setItem('auth-token', token);
        this.setState({ authenticated: true });
      })
      .catch(errorMessage =>  this.setState({ msg: errorMessage }));
  };

  handleChange = name => event => { this.setState({ [name]: event.target.value }) };

  render() {
    return (
      this.state.authenticated ? (
        <Redirect to="/" />
      ) : (
        <React.Fragment>
          <CssBaseline />
          <main className={this.classes.layout}>
            <Paper className={this.classes.paper}>
              <Avatar className={this.classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={this.classes.form} method="post" onSubmit={this.sendForm}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={this.state.name}
                    onChange={this.handleChange('email')}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.classes.submit}
                >
                  Sign in
                </Button>
              </form>
              <span className={this.classes.message}>{this.state.msg}</span>
            </Paper>
          </main>
        </React.Fragment>
      )
    );
  };
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);