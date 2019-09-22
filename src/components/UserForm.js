import React, { Component } from 'react'

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = { changed : '' }
    // Bind 'this' in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  // // Set the currency
  // handleCurrencyChange(event) {
  //   //identify the select element that was changed
  //   this.currenc
  //   //check if the name is currency1 or currency2
  //   //change the state for the respective currency
  // }

  handleClick() {
    //Fetch data
    fetch(`https://api.exchangeratesapi.io/latest`)
    .then(response => response.json())
    .then(res => {
      //set values for the form
      console.log("++++", res);
      if (this.currency1.value === "EUE"){
        this.amount2.value = (this.currency2.value === "EUE")? this.amount1.value : this.amount1.value*res.rates[this.currency2.value];
      }else if (this.currency2.value === "EUE"){
        this.amount2.value = this.amount1.value/res.rates[this.currency1.value];
      }else{
        this.amount2.value = this.amount1.value*(res.rates[this.currency2.value]/res.rates[this.currency1.value]);
      }
      console.log("**** 1 ", this.amount1.value, " 2 ", this.amount2.value);
    });
  }

  render() {
    return (
      <div>
        <h1 style={ headingStyle }>Currency converter [Deprecated]</h1>
        <form>
          <select 
          ref={select => this.currency1 = select}>
            <option value="USD">US Dollar - USD</option>
            <option value="ZAR">South African Rand - ZAR</option>
            <option value="GBP">British Pound - GBP</option>
            <option value="EUE">EU Euro - EUE</option>
          </select>
          <input 
          type="number"
          ref={number => this.amount1 = number}
          placeholder="0.00"/>          
          <br></br>
          <select 
          ref={select => this.currency2 = select}>
            <option value="ZAR">South African Rand - ZAR</option>
            <option value="USD">US Dollar - USD</option>
            <option value="GBP">British Pound - GBP</option>
            <option value="EUE">EU Euro - EUE</option>
          </select>
          <input 
          type="number" 
          ref={number => this.amount2 = number}
          placeholder="0.00"
          disabled/>
          <br></br>
          <input type="button" value="Calculate" 
            onClick={ this.handleClick } />
        </form>

      </div>
    )
  }
}

// Define internal CSS rule which can also be used by multiple elements
const headingStyle = {
  margin: '80px',
  float: 'left'
}
