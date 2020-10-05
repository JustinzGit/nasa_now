import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Home from './components/Home'

class App extends Component {
  constructor(){
    super()

    this.state = {
      loggedInStatus: false,
      user: {}
    }
  }

  handleLogin = (userData) => {
    this.setState({
      loggedInStatus: true,
      user: userData
    })
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: false, 
      user: {}
    })
  }

  loggedInStatus = () => {
    fetch("http://localhost:3001/current_login", {credentials: "include"})
    .then(response => response.json())
    .then(apiData => {
      if (apiData.logged_in && !this.state.loggedInStatus){ 
        this.setState({ loggedInStatus: true, user: apiData.user})
      }
      else if (!apiData.logged_in && this.state.loggedInStatus){
        this.setState({ loggedInStatus: false, user: {}})
      }
    })
  }

  componentDidMount() {
    this.loggedInStatus()
  }

  render(){
    return (
      <div className="app">
        <Route 
          exact path={'/'} 
          render={props => (
            <Home {...props} 
            handleLogin={this.handleLogin} 
            handleLogout={this.handleLogout} 
            loggedInStatus={this.state.loggedInStatus} />)
          }/>

        <Route 
          exact path={'/dashboard'} 
          render={props => (<Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />)}/>
      </div>
    );
  }
}

export default App;