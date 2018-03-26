import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import Product from './Product'
class ProductsContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			products: []
		};
	}

	componentDidMount() {
		axios.get('http://localhost:3001/api/v1/products.json').then(response => {
			this.setState({
				products: response.data
			})
			console.log(response.data)
		}).catch(error => console.log(error))
	}

	deletep = () => {
    	axios.delete(`http://localhost:3001/api/v1/products/${this.props.id}`)
    	.catch(error => console.log(error))
  	}  

  	render() {
		return (
			<div>
			Products
			{this.state.products.map((product) => {
				return (
					<Product 
						id = {product.id}
						key = {product.id}
						title = {product.title}
						description = {product.description}
						votes = {product.votes}

					/>
				)
			})}

			</div>
		)
	}
}

export default ProductsContainer