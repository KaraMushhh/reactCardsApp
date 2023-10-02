import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//const testData = [
  //{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
  //{name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  //{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
//];

const CardList = (props) =>
(
  <div>
    {props.profiles.map(profile => <Card key= {profile.id} {...profile} onRemove={props.onRemove}/>)}
    {/*<Card {...testData[0]}/>
    <Card {...testData[1]}/>       
    <Card {...testData[2]}/> */}
  </div>

)
   //[<Card/>, <Card/>, <Card/>]
   //[React.createElement(), React.createElement(), React.createElement()]


class Card extends React.Component {
  handleRemove = () => {
    // Chiamare la funzione removeProfile passata dalle props di App
    this.props.onRemove(this.props.id);
  };
	render() {
    const profile = this.props;
  	return (
    	<div className="github-profile" style={{ margin: '1rem'}}>
    	  <img src={profile.avatar_url} alt={profile.name} />
        <div className="info" style={{display:'inline-block',marginLeft: 10}}>
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
          <button onClick={this.handleRemove}>Remove</button>
        </div>
    	</div>
    );
  }
}

class Form extends React.Component {
  //userNameInput = React.createRef();
  state = {userName: ''};
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit( resp.data);
    this.setState({userName: ''});
      //this.userNameInput.current.value
    
  }

	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
    	  <input 
        type="text" 
        value ={this.state.userName}
        onChange={event => this.setState({userName: event.target.value})}
        placeholder="GitHub username" 
        required/>
        <button>Add card</button>

    	</form>
    );
  }
}

class App extends React.Component {
  //constructor(props) {
    //super(props);
    //this.state = {
      //profiles: testData,
    //};
  //}

  state = {
    profiles: [],
  };

  addNewProfile = async (profileData) => {
    // Aggiungi un campo "id" al profilo utilizzando l'ID GitHub
    profileData.id = profileData.id || profileData.login;
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData],
    }));
  };

  removeProfile = (profileIdToRemove) => {
    this.setState(prevState => ({
      profiles: prevState.profiles.filter(profile => profile.id !== profileIdToRemove),
    }));
  };


	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles ={this.state.profiles} onRemove={this.removeProfile} />
    	</div>
    );
  }	
}

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  document.getElementById('root')
);

// *** The React 18 way:
// root.render(
//   <App title="The GitHub Cards App" />,
// );

export default App;