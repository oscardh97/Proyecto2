import React, { Component } from 'react'
import {Jumbotron,Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import update from 'immutability-helper'
import axios from 'axios'
import ProductForm from './ProductForm'
import './Product.css'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
class Product extends Component {
	constructor(props, context) {

		super(props, context);
	    this.state = {
	    	id: this.props.id,
		    title: this.props.title,
		    description: this.props.description,
			// url: this.props.url,
			votes: this.props.votes || 0,
			productImageUrl: this.props.productImageUrl,
			deleteModalStatus: false,
			updateParent: this.props.updateParent
	    };
	}


	openForm = () => {
		this.editForm.toggle();
	}
	
	update = (data) => {
		this.setState(data);
	}
	handleUpVote = () => {
		const product = {
			title: this.state.title,
			description: this.state.description,
			votes: parseInt(this.state.votes) + 1
		};

		axios.put("https://votting-app-be.herokuapp.com/api/v1/products" + (this.props.id ? ("/" + this.props.id) : ""),
			{product: product}
		).then(response => {
			this.setState(response.data);
			this.state.updateParent();
		}).catch(error => {
			console.log(error)
		});
		// this.editForm.upVote();
	}

	handleDelete = () => {
		axios.delete(`https://votting-app-be.herokuapp.com/api/v1/products/${this.state.id}`)
		.then(response => {
			this.state.updateParent();
		})
    	.catch(error => console.log(error))
	}

	toggleDeleteModal = () => {
		this.setState({
			deleteModalStatus: !this.state.deleteModalStatus
		})
	}
    
	render() {
		const productImageUrl = this.state.productImageUrl ? ("-" + this.state.productImageUrl) : "";
		return (
			<div>
				<Jumbotron className="JumboProduct">
					<div className="Product">
						 <Modal isOpen={this.state.deleteModalStatus} toggle={this.toggleDeleteModal}>
				          <ModalHeader toggle={this.toggleDeleteModal}>Eliminar</ModalHeader>
				          <ModalBody>
				          	¿Está seguro de eliminar el produto?
				          </ModalBody>
				          <ModalFooter>
				            <Button color="primary" onClick={this.handleDelete}>Sí</Button>{' '}
				            <Button color="secondary" onClick={this.toggleDeleteModal}>No</Button>
				          </ModalFooter>
				        </Modal>

				        <ProductForm 
				          updateParent = {this.update}
				          ref = {(form) => {this.editForm = form}}
				          isNew = {false}
				          id = {this.state.id}
				          title = {this.state.title}
				          description = {this.state.description}
				          productImageUrl = {this.state.productImageUrl}
				          votes = {this.state.votes}
				          titleRef = {input => this.title = input}
				        />

						<p className="Votes"> 
							Votes: {this.state.votes}
							<Button className="Upvote" onClick={this.handleUpVote} ><FaThumbsOUp/></Button>

							
						</p>
				        
				    	
				    	

					    <p className="Title" > 
					    		<img className="Image" src={"products/image" + productImageUrl + ".png"} width="100" />
					    		{this.state.title}
					    </p>
					    		
						
						

						<p className="Description" >{this.state.description}</p>
						
						
						<Button className="Edit" onClick={this.openForm}>Edit</Button>
						<Button className="Delete" onClick={this.toggleDeleteModal}>Delete</Button>
					
					</div>
				</Jumbotron>
			</div>	
		)
	}
}

export default Product