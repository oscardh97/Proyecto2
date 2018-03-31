import React, { Component } from 'react';
import {Modal, Button} from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import ProductsContainer from './components/ProductsContainer'
import ProductForm from './components/ProductForm'
// Button = ReactBootstrap.Button;

class App extends Component {
  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="header"> Our Products</h1>
        </div>
        
        <ProductsContainer />
      </div>
    );
  }
}

export default App;
