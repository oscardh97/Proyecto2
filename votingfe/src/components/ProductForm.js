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
		    isNew: this.props.isNew,
		    title: this.props.title,
		    description: this.props.description,
		    productImageUrl: this.props.productImageUrl,
		    updateParent: this.props.updateParent,
			// url: this.props.url,
			votes: this.props.votes || 0
	    };
    	this.toggle = this.toggle.bind(this);
	}

	deletep = () => {
    	axios.delete(`http://localhost:3001/api/v1/products/${this.props.id}`)
    	.catch(error => console.log(error))
  	}

	save = () => {
		let _self = this;

    	const product = {
			title: this.state.title,
			description: this.state.description,
			votes: this.state.votes,
			productImageUrl: this.state.productImageUrl
		};
		axios[this.props.id ? "put" : "post"]("http://localhost:3001/api/v1/products" + (this.props.id ? ("/" + this.props.id) : ""),
			{product: product}
		).then(response => {
			console.log(response)
			 // this.setState(response.data);
			 
			 if (this.state.updateParent) {
			 	this.state.updateParent(response.data);
			 }
			 if (this.state.modal){
				_self.toggle();
			 }
			 	
		}).catch(error => {
			console.log(error)
		});
	}

	
	toggle() {
		//console.log("@ProductForm.toggle()...")
		let newData = {};
		if (this.state.modal && this.state.isNew) {
			newData = {
		    	id: null,
			    title: "",
			    description: "",
			    productImageUrl: "",
				votes: 0
			}
		}
		newData.modal = !this.state.modal;
	    this.setState(newData);
	}

	handleProductImage = (e) => {
	    this.setState({
	    	productImageUrl: e.target.value
	    });
	}
	handleInput = (e) => {
	    // this.props.resetNotification()
	    this.setState({
	    	[e.target.name]: e.target.value
	    })
	}
	render() {
		return (
			// const productImageUrl = product.productImageUrl ? ("-" + product.productImageUrl) : "";
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
			        {!this.props.isNew &&
				        <FormGroup>
				        	<Label>Total votos: {this.props.votes || 0}</Label>
				        </FormGroup>
		          	}

			        <FormGroup tag="fieldset">
			          <legend>Image:</legend>
			          <FormGroup check inline>
			            <Label check>
			              <Input type="radio" name="radio1" value="steel" checked={!this.state.productImageUrl || this.state.productImageUrl === "steel"} onChange={this.handleProductImage} />{' '}
			              <img src='products/image-steel.png' heigth="100" width="75" />
			            </Label>
			          </FormGroup>
			          <FormGroup check inline>
			            <Label check>
			              <Input type="radio" name="radio1" value="aqua" checked={this.state.productImageUrl === "aqua"} onChange={this.handleProductImage}/>{' '}
			              <img src='products/image-aqua.png' heigth="100" width="75" />
			            </Label>
			          </FormGroup>
			          <FormGroup check inline>
			            <Label check>
			              <Input type="radio" name="radio1" value="rose" checked={this.state.productImageUrl === "rose"} onChange={this.handleProductImage} />{' '}
			              <img src='products/image-rose.png' heigth="100" width="75" />
			            </Label>
			          </FormGroup>
			          <FormGroup check inline>
			            <Label check>
			              <Input type="radio" name="radio1" value="yellow" checked={this.state.productImageUrl === "yellow"} onChange={this.handleProductImage} />{' '}
			              <img src='products/image-yellow.png' heigth="100" width="75" />
			            </Label>
			          </FormGroup>
			        </FormGroup>
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