import React, { Component } from 'react';
import CurrentWeather from './CurrentWeather.js';
import cleanData from './data.js';
import apiKey from './apiKey.js';
import CardContainer from './CardContainer.js';
import Search from './Search.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.storeLocation = this.storeLocation.bind(this);
  }

  componentDidMount() {
    let location = JSON.parse(localStorage.getItem('location'));

    if (location) {
      this.setState({
        searchTerms: location
      });
      this.fetchData(location.split(',')[0], location.split(',')[1]);
    }
  }

  fetchData(city, state) {
    let url;

    if (typeof city === 'number') {
      url = `http://api.wunderground.com/api/${apiKey}
      /conditions/forecast10day/hourly/q/${city}.json`;
    } else {
      url = `http://api.wunderground.com/api/${apiKey}
      /conditions/forecast10day/hourly/q/${state}/${city}.json`;
    }

    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        data: cleanData(data),
        location: this.state.searchTerms
        }, this.storeLocation(city + ', ' + state));
    })
    .catch(error => {
      alert('Could not find location. Please enter (City, STATE) or a valid zipcode');
      console.log('Error: ', error);
      });
  }

  updateSearchValue(terms) {
    if(terms) {
      this.setState({
        searchTerms: terms
      })
    }
  }

  storeLocation(location) {
    localStorage.setItem('location',JSON.stringify(location))
  }

  currentCondition() {
    return this.state.data.currentCondition ? <CurrentWeather data={ this.state.data } />
                                      : null;
  }
  renderCards() {
    return this.state.data.sevenHour ? <CardContainer hours={ this.state.data.sevenHour }
                                                      days={this.state.data.tenDay}/>
                                      : null;
  }

  render() {
    return (
      <div>
        {
          <Search 
          updateSearchValue={this.updateSearchValue} 
          fetchData={this.fetchData} 
          storeLocation={this.storeLocation} />
        }
        {this.currentCondition()}
        {this.renderCards()}
      </div>
    )
  }
}

export default App;