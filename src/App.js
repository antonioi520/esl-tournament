import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Redirect } from 'react-router-dom';
import Search from '../src/Components/Search.jsx'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Route exact path='/' component={Search} />
        </BrowserRouter>
    );
  }
}



export default App;
