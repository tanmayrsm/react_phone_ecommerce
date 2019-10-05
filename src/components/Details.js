import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const {id ,company ,info ,img ,price ,title ,inCart} = value.detailProduct;
                    return (
                        // title
                        <div className = "row">
                            <div className = "col-10 mx-auto text-center text-slanted text-blue my-5">
                                <h1>{title}</h1>
                            </div>
                        
                            <div className = "col-10 mx-auto col-md-6 my-3 text-capitalize">
                                <img src = {img} className = "img-fluid" alt = "product"/>
                            </div>
                            {/* product text */}
                            <div className = "col-10 mx-auto col-md-6 my-3 text-capitaize">
                                <h2>{title}</h2>
                                <h4 className = "text-title text-uppercase text-muted mt-3 mb-2">made by : 
                                    <span className = "text-uppercase">
                                        {company}
                                    </span>
                                </h4>
                                <h4 className = "text-blue"><strong>price : <span>Rs </span>{price}</strong></h4>
                                <p className = "text-capitalize font-weight-bold mt-3 mb-0">Info about product : </p>
                                <p className = "text-muted lead">{info}</p>
                                
                                {/* buttons */}
                                <div>
                                    <Link to = "/">
                                        <ButtonContainer>back to products</ButtonContainer>
                                    </Link>
                                    <ButtonContainer cart disabled = {inCart ? true : false} onClick = {() => {
                                        value.addToCart(id)
                                    }}>
                                        {inCart ? 'inCart' : 'add to cart'}
                                    </ButtonContainer>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}
//3:25:14