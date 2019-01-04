import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/header';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CategoryIcon from '@material-ui/icons/Category';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import AssignmentIcon from '@material-ui/icons/Assignment';

import 'typeface-roboto';

const routes = {
  main: [
    { path: '/dashboard', text: 'Dashboard', icon: DashboardIcon }
  ],
  transactions: [
    { path: '/account', text: 'Accounts', icon: AccountBalanceIcon },
    { path: '/income', text: 'Incomes', icon: AttachMoneyIcon },
    { path: '/expense', text: 'Expenses', icon: MoneyOffIcon },
    { path: '/transfer', text: 'Transfers', icon: CompareArrowsIcon }
  ],
  configs: [
    { path: '/creditcard', text: 'Credit Cards', icon: CreditCardIcon },
    { path: '/category', text: 'Categories', icon: CategoryIcon },
    { path: '/user', text: 'Users', icon: PeopleIcon }
  ],
  reports: [
    { path: '/#', text: 'Current month', icon: AssignmentIcon },
    { path: '/#', text: 'Last quarter', icon: AssignmentIcon }
  ]
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class Layout extends React.Component {
  state = { open: true };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Mymoney
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <div>
              { createListMenu(routes.main, classes) }
              <Divider />
              { createListMenu(routes.transactions, classes) }
              <Divider />
              { createListMenu(routes.configs, classes) }
              <Divider />
              { createListMenu(routes.reports, classes, 'Reports') }
            </div>
          </List>
        </Drawer>
      </>
    );
  }
}

function createListMenu(arr, classes, subHeader = '') {
  return (
    <>
      {subHeader !== '' ? (<ListSubheader inset>{ subHeader }</ListSubheader>) : '' }
      {arr.map(route => {
        const Icon = route.icon;
        return (
          <Link key={ route.path } to={ route.path } className={ classes.link } >
            <ListItemLink component="div">
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={ route.text } />
            </ListItemLink>
          </Link>
        )}
      )}
      <Divider />
    </>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);