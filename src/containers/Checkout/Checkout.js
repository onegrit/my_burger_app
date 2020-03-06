import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'


class Checkout extends Component {
    // Redux版本： ingredients和price从store中获取
    // state = {
    //     ingredients: null,
    //     price: 0
    // }
    // Redux版本：不再需要解析从url中传递过来的ingredients，而是从全局global store中获取ingredients
    // componentWillMount () {
    //     // 从BurgerBuilder中的purchaseContinueHandler中获取url传递过来的参数
    //     const query = new URLSearchParams( this.props.location.search );
    //     const ingredients = {};
    //     let price = 0;
    //     for ( let param of query.entries() ) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState( { ingredients: ingredients, totalPrice: price } );
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    // ingredients={this.state.ingredients}
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
                    // 不再需要向下传递ingredients和price了，因为ContactData可以自动从store中获取了。
                    component={ContactData} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    }
}


export default connect(mapStateToProps)(Checkout);