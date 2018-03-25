import React, { Component } from 'react'
import axios from 'axios'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
// Modal = ReactBootstrap.Modal;
// Button = ReactBootstrap.Button;
class ProductForm extends Component {
	constructor(props, context) {
		super(props, context);
	    this.state = {
	    	id: this.props.id,
		    modal: false,
		    title: this.props.title,
		    description: this.props.description,
			// url: this.props.url,
			votes: this.props.votes || 0
	    };

    	this.toggle = this.toggle.bind(this);
	}

	save = () => {
		let _self = this;
		axios.post("http://localhost:3001/api/v1/products" + (this.props.id ? ("/" + this.props.id) : ""),
		// axios.post(`http://localhost:3001/api/v1/products/${this.props.id}`,
			{
				title: this.state.title,
				description: this.state.description,
				votes: this.state.votes
			}
		).then(response => {
			console.log(response)
			 this.setState(response.data)
			_self.toggle();
		}).catch(error => {
			console.log(error)
		});
	}
	
	toggle(product) {
		console.log("@ProductForm.toggle()...")
	    this.setState({
	      modal: !this.state.modal
	    });
	}

	handleInput = (e) => {
	    // this.props.resetNotification()
	    console.log(e.target.name)
	    console.log(e.target.value)
	    this.setState({
	    	[e.target.name]: e.target.value
	    })
	    console.log(this.state)
	}
	render() {
		return (
			<div>
		        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
		          <ModalHeader toggle={this.toggle}>Product</ModalHeader>

		          <ModalBody>
			        <FormGroup>
			          <Label for="title">Title</Label>
			          <Input type="text" name="title" id="title" placeholder="Title..." value={this.state.title} onChange={this.handleInput} />
			        </FormGroup>
			        <FormGroup>
			          <Label for="description">Description</Label>
			          <Input type="textarea" name="description" id="description" placeholder="Description..." value={this.state.description} onChange={this.handleInput}/>
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