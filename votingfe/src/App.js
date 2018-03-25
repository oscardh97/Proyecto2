import React, { Component } from 'react';
import {Modal, Button} from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import ProductsContainer from './components/ProductsContainer'
import ProductForm from './components/ProductForm'
// Button = ReactBootstrap.Button;

class App extends Component {
  test = () => {
    this.child.toggle()
  }
  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <h1>Products</h1>
        </div>
        
        <ProductForm 
          ref = {(form) => {this.child = form}}
          isNew = {false}
        />

        <ProductsContainer />
        <Button onClick={this.test}>
          Agregar Produto
        </Button>
      </div>
    );
  }
}

export default App;
