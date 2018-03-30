import React, { Component } from 'react'
import {Modal, Button} from 'reactstrap';
import axios from 'axios'
import update from 'immutability-helper'
import Product from './Product'
import ProductForm from './ProductForm'
import './ProductContainer.css'
class ProductsContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			products: []
		};
	}

	openForm = () => {
   		this.child.toggle()
	}
	getProducts = () => {
		axios.get('http://localhost:3001/api/v1/products.json').then(response => {
			this.setState({
				products: response.data
			})
			console.log(response.data)
		}).catch(error => console.log(error))	
	}

	componentDidMount() {
		this.getProducts();
	}

	deletep = () => {
    	axios.delete(`http://localhost:3001/api/v1/products/${this.props.id}`)
    	.catch(error => console.log(error))
  	}  

  	render() {
		return (
			<div>
			{this.state.products.map((product) => {
				return (
					<Product 
						id = {product.id}
						key = {product.id}
						title = {product.title}
						description = {product.description}
						votes = {product.votes}
						productImageUrl = {product.productImageUrl}
			  			updateParent = {this.getProducts}
					/>
				)
			})}

	        <ProductForm 
	          ref = {(form) => {this.child = form}}
			  updateParent = {this.getProducts}
	          isNew = {true}
	        />

	        <Button className="Create" onClick={this.openForm}>
	          Create Product
	        </Button>
	        
			</div>
		)
	}
}

export default ProductsContainer