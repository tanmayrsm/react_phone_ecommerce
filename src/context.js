import React, { Component } from 'react';
import {storeProducts , detailProduct} from './data';

const ProductContext = React.createContext();
//iske 2 child : 
//provider
//consumer

//we will use provider re


class ProductProvider extends Component {
    state = {
        products : [],
        detailProduct : detailProduct,
        cart : [],
        modalOpen : false,
        modalProduct : detailProduct,
        cartSubTotal : 0,
        cartTax : 0,
        cartTotal : 0
    }; 
    componentDidMount() {
        this.setProducts();
    }
    setProducts = () => {
        let tempproducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempproducts = [...tempproducts,singleItem];
        })
        this.setState(() => {
            return {products : tempproducts}
        })
    };
    getitem = (id) => {
        console.log('get item');
        const product = this.state.products.find(item => item.id === id);
        return product;
    }
    handleDetail = (id) =>{
        console.log('helo from handle');

        const product = this.getitem(id);
        this.setState(() => {
            return {detailProduct : product};
        });
    };
    addToCart = (id) =>{
        let tempProducts = [...this.state.products];
        //console.log('temp products:' ,tempProducts)
        const index = tempProducts.indexOf(this.getitem(id));

        const product = tempProducts[index];

        //console.log('index:',index , 'product:',product);
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
        //  console.log('cart:',[...this.state.cart]);
            return { products : tempProducts , cart : [...this.state.cart ,product]};
        },
        () => {
            console.log('add cart vals:',product);
            this.addTotals()
        })
    };

    openModal = (id) => {
        const product = this.getitem(id) ;
        this.setState(() => {
            return { modalProduct : product ,modalOpen : true };
        })   
    }

    closeModal = () => {
        this.setState (() => {
            return { modalOpen : false };
        });
    };

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return {
                cart : [...tempCart]
            }
        } ,() => {
            this.addTotals();
        })

    };

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        if (product.count > 1){
            product.count = product.count - 1;
            product.total = product.count * product.price;

            this.setState(() => {
                return {
                    cart : [...tempCart]
                }
            } ,() => {
                this.addTotals();
            })
        }
    };

    removeItem = (id) =>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id); //jo bhi nhi delte h wo h isme

        const index = tempProducts.indexOf(this.getitem(id));   //get index from product list

        let removedProducts = tempProducts[index];  //get the product

        removedProducts.inCart = false;
        removedProducts.count = 0;
        removedProducts.total = 0;

        this.setState(() => {
            return {
                cart : [...tempCart],
                product: [...tempProducts]
            }
        },() => {
            this.addTotals();
        })
    }

    clearCart = () => {
        this.setState(() => {
            return { cart: []}
        } ,() => {
            this.setProducts();
            this.addTotals();
        });
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => {subTotal += item.total});
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;

        this.setState(() => {
            return{
                cartSubTotal : subTotal,
                cartTax : tax,
                cartTotal : total
            }
        })
    }
    render() {
        return (
            <ProductContext.Provider value = 
                {{
                    ...this.state,
                    handleDetail : this.handleDetail,
                    addToCart : this.addToCart ,
                    openModal : this.openModal , 
                    closeModal : this.closeModal ,
                    increment : this.increment,
                    decrement : this.decrement,
                    removeItem : this.removeItem,
                    clearCart : this.clearCart
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
            
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider ,ProductConsumer };