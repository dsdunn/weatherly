import React, { Component } from 'react';
//import suggestionTrie from './Trie.js';
import './css/Welcome.css';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      welcome: true,
      suggestions: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.defineCityAndState = this.defineCityAndState.bind(this);
  }
  handleChange(e) {
    let val = e.target.value;
    // suggestionTrie.suggest()
    this.setState({
      value: val
    },console.log(this.state))
    this.props.onChange(val);
  }
  defineCityAndState(){
    this.setState({
      welcome: false
    })
    let val = this.state.value;
    let city = val.split(',')[0];
    let state = val.split(',')[1];
    this.props.fetchData(city,state);
    this.props.storeLocation();
  }
  render(){
    return (
      <div className='searchComponent'>
        {this.state.welcome && 
          <h2 className='title'>Welcome to Weatherly! Enter a City and State abbreviation or a zipcode to search</h2>
        }
        <input type='text' className='title-input' onChange={this.handleChange} />


        <button className='title-btn' onClick={this.defineCityAndState}> Search </button>
      </div> 
    )
  }
}

export default Search;