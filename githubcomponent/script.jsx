// Code goes here
var Card = React.createClass({
  getInitialState: function(){
    return {};
  },
  componentDidMount: function(){
    var component = this;
    $.get("https://api.github.com/users/" + this.props.login, function(data){
      console.log("data", data);
      
      component.setState(data); 
    });
  },
  render: function(){
    return (
      <div>
        <img src={this.state.avatar_url} width="80" />
        <h3>{this.state.name} </h3>
        <hr />
      </div>  
    )
  }
});

var Form = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var loginInput = ReactDOM.findDOMNode(this.refs.login)
    console.log("afifo", loginInput.value);
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>  
        <input type="text" placeholder="github login" ref="login" />
        <button type="submit" >Add</button>
      </form>
    )
  }
});

var Main = React.createClass({
  getInitialState: function(){
    return {logins: []};
  },
  addCard: function(loginToAdd){
    this.setState({logins: this.state.logins.concat(loginToAdd)})
  },
  render: function(){
    var cards = this.state.logins.map(function(login){
      return (<Card login={login} />);
    });
    return (
      <div>
        <Form addCard={this.addCard}/>
        {cards}
      </div>  
    )
    
  }
});


ReactDOM.render(
  <Main />,
  document.getElementById('root')
)