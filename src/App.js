import React from 'react';
import { Switch ,Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Details from './components/Details';
import Default from './components/Default';
import Cart from './components/Cart';
import Product from './components/Product';
import ProductList from './components/ProductList';
import Modal from './components/Modal';

function App() {
  return (
    <React.Fragment>
      <Navbar/>

      <Switch>
        <Route exact path = "/" component = {ProductList}/>
        <Route exact path = "/details" component = {Details} />
        <Route exact path = "/cart" component = {Cart}/>
        <Route component = {Default} />
      </Switch>

      <Modal/>
    </React.Fragment>
  );
}

export default App;
//5:00:23