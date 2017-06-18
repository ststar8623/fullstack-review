import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      term: ''
    }
  }
  
  componentDidMount () {
    let that = this;
    $.ajax({
      url: '/repos',
      method: 'GET',
      data: { username: this.state.term || 'ststar8623' },
      dataType: 'json',
      success: function(response) {
        that.setState({
          repos: response.repos
        })
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: '/repos/import',
      method: 'POST',
      data: {username: term},
      dataType: 'json',
      success: function(response) {
        console.log('success');
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));