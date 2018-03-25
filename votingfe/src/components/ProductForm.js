import React, { Component } from 'react'
import axios from 'axios'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
// Modal = ReactBootstrap.Modal;
// Button = ReactBootstrap.Button;
class ProductForm extends Component {
	constructor(props, context) {
		super(props, context);
	    this.state = {
	    	id: null,
		    modal: false,
		    title: this.props.title,
		    description: this.props.description,
			// url: this.props.url,
			votes: this.props.votes || 0
	    };

    	this.toggle = this.toggle.bind(this);
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	save = () => {
		let _self = this;
		console.log(this)
		axios.post("http://localhost:3001/api/v1/products",{
			product: {
				title: this.state.title,
				description: this.state.description,
				votes: this.state.votes
			}
		}
		).then(response => {
			console.log(response)
			 this.setState(response.data)
			_self.toggle();
		}).catch(error => {
			console.log(error)
		});
	}
	
	toggle() {
		console.log("@ProductForm.toggle()...")
	    this.setState({
	      modal: !this.state.modal
	    });
	}

	handleInput = (e) => {
	    this.props.resetNotification()
	    this.setState({[e.target.name]: e.target.value})
	}
				// key = {product.id}
				// id = {product.id}
				// title = {product.title}
				// description = {product.description}
				// url = {product.url}
				// votes = {product.votes}
				// submitterAvatarUrl = {product.submitterAvatarUrl}
				// productImageUrl = {product.productImageUrl}
				// onVote = {this.handleProductUpVote}
	render() {
		return (
			<div>
		        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
		          <ModalHeader toggle={this.toggle}>Product</ModalHeader>

		          <ModalBody>
			        <FormGroup>
			          <Label for="title">Title</Label>
			          <Input type="text" name="title" id="title" placeholder="Title..." value={this.props.title} onChange={this.handleInput} />
			        </FormGroup>
			        <FormGroup>
			          <Label for="description">Description</Label>
			          <Input type="textarea" name="description" id="description" placeholder="Description..." value={this.props.description} onChange={this.handleInput}/>
			        </FormGroup>
			        {this.props.isNew &&
				        <FormGroup>
				        	<Label>Total votos: {this.props.votes || 0}</Label>
				        </FormGroup>
		          	}
		          </ModalBody>
		          
		          <ModalFooter>
		            <Button color="primary" onClick={this.save}>Create</Button>{' '}
		            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
		          </ModalFooter>
		        </Modal>
		    </div>
		)
	}
}

export default ProductForm