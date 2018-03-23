import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
// Modal = ReactBootstrap.Modal;
// Button = ReactBootstrap.Button;
class ProductForm extends Component {
	constructor(props, context) {
		super(props, context);
	    this.state = {
	      modal: false
	    };

    	this.toggle = this.toggle.bind(this);
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}
	
	toggle() {
		console.log("@ProductForm.toggle()...")
	    this.setState({
	      modal: !this.state.modal
	    });
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
			          <Input type="text" name="title" id="title" placeholder="Title..." value={this.props.title} />
			        </FormGroup>
			        <FormGroup>
			          <Label for="description">Description</Label>
			          <Input type="textarea" name="description" id="description" placeholder="Description..." value={this.props.description} />
			        </FormGroup>
			        <FormGroup>
			          <Label for="url">URL</Label>
			          <Input type="text" name="url" id="url" placeholder="URL..." value={this.props.url} />
			        </FormGroup>
			        {this.props.isNew &&
				        <FormGroup>
				        	<Label>Total votos: {this.props.votes || 0}</Label>
				        </FormGroup>
		          	}
		          </ModalBody>
		          
		          <ModalFooter>
		            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
		            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
		          </ModalFooter>
		        </Modal>
		    </div>
		)
	}
}

export default ProductForm