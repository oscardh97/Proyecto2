import React, { Component } from 'react'
import {Button} from 'reactstrap'
import ProductForm from './ProductForm'
class Product extends Component {
	openForm = () => {
		this.editForm.toggle();
	}
	render() {
		return (
			<div className="title">
		        <ProductForm 
		          ref = {(form) => {this.editForm = form}}
		          isNew = {false}
		          id = {this.props.id}
		          title = {this.props.title}
		          description = {this.props.description}
		          votes = {this.props.votes}
		          titleRef = {input => this.title = input}
		        />
				<label>Title: {this.props.title}</label>
				<label>Description: {this.props.description}</label>
				<label>Votes: {this.props.votes}</label>
				<Button onClick={this.openForm}>Edit</Button>
			</div>
		)
	}
}

export default Product