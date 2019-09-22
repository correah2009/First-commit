import React, { Component } from 'react'

class ExchangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    console.log("this.amount.value", this.amount.value, "this.currency.value", this.currency.value, "this.props.index", this.props.index);
    this.props.onChange(this.amount.value, this.currency.value, this.props.index);
  }

  _renderCurrencyOptions (cur){
    return [
      {cur: "USD", currency: "US Dollar - USD"}, 
      {cur: "ZAR", currency: "South African Rand - ZAR"},
      {cur: "GBP", currency: "British Pound - GBP"},
      {cur: "EUE", currency: "EU Euro - EUE"}
    ].map(objCurrency => {
      return (
        <option key={`option${objCurrency.cur}`} value={objCurrency.cur}>{objCurrency.currency}</option>
      )
    })
  }

  render() {
    const {currency, amount} = this.props;
    return (
      <fieldset>
          <select 
          ref={select => this.currency = select}
          onChange={this.handleChange} > 
          {this._renderCurrencyOptions(currency)}
          </select>
          <input 
          ref={number => this.amount = number}
          type="number" 
          placeholder="0.00"
          value={amount}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}

function exchange (inputs, amount=0, currency, index, data){
  console.log("exchanging input ", index, " amount ", amount, " currency ", currency, " and state inputs are ", inputs); 
  return inputs.map((input, i) => {
     //if the currency is the same
    if (index === i){
      console.log("Im 1");
      input.amount = amount===""? 0 : amount;
      input.currency = currency;
    //if the amount is blank or 0
    }else if (!amount){
      console.log("Im 2");
      input.amount = 0;
    //if the same index, replace the values.
    }else if ( currency === input.currency ){
      console.log("Im 3");
      input.amount = amount;
    //if the currency is different
    }else{
      console.log("Im 4");
      //If one of the currencies is EUE, 
      if(currency === "EUE"){
        console.log("Im 4a");
        input.amount = input.currency === "EUE"?  amount : amount*data.rates[input.currency];
      }else if(input.currency === "EUE"){
        console.log("Im 4b");
        input.amount = amount/data.rates[currency];
      }else {
        console.log("Im 4c");
        console.log("Balues in here amount", amount, "input.currency", input.currency, "data", data);
        console.log("Balues in here amount", amount, "input.currency", input.currency, "ata.rates[index.currency]", data.rates[input.currency], "currency",currency,"data.rates[currency]", data.rates[currency]);
        input.amount = amount*(data.rates[input.currency]/data.rates[currency]);
      }
    }
    return input 
  })
}

export default class UserForm_children extends Component {
  constructor(props) {
    super(props);
    this.state = { inputs: [{ amount: 0, currency: "USD" }, { amount: 0, currency: "USD" }], data:{} }
    // Bind 'this' in the callback
    this.handleChange = this.handleChange.bind(this);
    this.addInput = this.addInput.bind(this);

    this._renderExchangeInputs = this._renderExchangeInputs.bind(this);
  }

  componentDidMount() {
    if (typeof data === 'undefined' || typeof data === null){ 
      this.setState({ data: { rates: {ZAR: 15, USD: 1.25, GBP: 0.89}}})
    }else{
      return fetch(`https://api.exchangeratesapi.io/latest`)
      .then(response => response.json())
      .then(
        (data) => {
          this.setState({data});
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({ data: { rates: {ZAR: 15, USD: 1.25, GBP: 0.89}}});
        }
      )
    }
  }

  handleChange(amount, currency, index){
    console.log("handleChange", "amount", amount, "currency", currency, "index", index );
    const inputs = exchange(this.state.inputs, amount, currency, index, this.state.data);
    this.setState({inputs});
  }

  addInput(){
    console.log("addInput this.state.inputs", this.state.inputs);
    let inputs = this.state.inputs.concat([{ amount: 0, currency: "USD" }]);
    console.log("addInput inputs", inputs);
    this.setState({inputs});
  }

  _renderExchangeInputs(){
    console.log("this.state.inputs", this.state.inputs);
    let inputsList = this.state.inputs.map((input, index)=> (
      <ExchangeInput
      key={`input${index}`}
      index={index}
      currency={input.currency}
      amount={input.amount}
      onChange={this.handleChange} />
    ))

    console.log("inputsList", inputsList);
    return inputsList
  }

  render() {
    return (
      <div style={{marginTop: '200px'}}>
        <h1>Currency converter 2.0</h1>
        {this._renderExchangeInputs()}
        <button onClick={this.addInput}>Add Currency</button>
      </div>
    )
  }
}

// Define internal CSS rule which can also be used by multiple elements