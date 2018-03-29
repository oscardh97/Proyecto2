import React, { Component } from 'react'
import {Jumbotron,Button} from 'reactstrap'
import update from 'immutability-helper'
import axios from 'axios'
import ProductForm from './ProductForm'
import './Product.css'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
class Product extends Component {
	
	openForm = () => {
		this.editForm.toggle();
	}

	handleDelete = () => {
 	 	this.editForm.deletep()
	}
    
	render() {
		return (
			<div>
				<Jumbotron className="JumboProduct">
					<div className="Product">
				        <ProductForm 
				          ref = {(form) => {this.editForm = form}}
				          isNew = {false}
				          id = {this.props.id}
				          title = {this.props.title}
				          description = {this.props.description}
				          votes = {this.props.votes}
				          titleRef = {input => this.title = input}
				        />
				        <Button className="Upvote" onClick={this.openForm} ><FaThumbsOUp/></Button>
				        <h1 className="Title" > Title: {this.props.title}</h1>

						<p 
							className="Votes"> Votes: {this.props.votes}
							
						</p>

						<p className="Description" >Description: {this.props.description}</p>
						
						
						<Button className="Edit" onClick={this.openForm}>Edit</Button>
						<Button className="Delete" onClick={this.handleDelete}>Delete</Button>
					
					</div>
				</Jumbotron>
			</div>	
		)
	}
}

export default Product