import React, { Component } from 'react';
//import "semantic-ui-css/semantic.min.css"; //{ Input, List} from
import './App.css';
import { TextField, List, ListItem, ListItemText } from "@material-ui/core"
// import WeatherContainer from './WeatherContainer';
// import Login from './Login';
// import Navi from './Navbar/Navbar';
// import { Route, Switch } from 'react-router-dom';
// import Profile from './Profile';
//import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import * as firebase from 'firebase';
const database = firebase.database();


// // Dark sky API key: 54027aaa136404819ab799aaa96235ce
// // Google API key: AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg
// class App extends Component {
//   constructor(){
//     super();
//     this.state = {
//       username: [],
//       password: "",
//       location: Number,
//       loggedIn: false,
//       id: "",
//     }
//   }
//   handleInputs = (e) => {
//     this.setState({
//       [e.currentTarget.name]: e.currentTarget.value
//     })
//   }

//   submitRegistration = async (e) => {
//     e.preventDefault();
//     console.log("GOT HERE")
//     console.log(this.state);
//     try{
//       console.log("GOT HERE, TOO")
//       const createUser = await fetch('http://localhost:8080/register', {
//         method: 'POST',
//         body: JSON.stringify(this.state),
//         headers: {
//           'Content-Type': 'application/json'
//         } 
//       });
//       const parsedResponse = await createUser.json();
//       console.log(parsedResponse, ' this is response')
//         this.setState({
//           loggedIn: true,
//           // this isn't a real login - need to align it with the back-end to sort that out
//           username: parsedResponse.username,
//           location: parsedResponse.location,
//           id: parsedResponse.id
//         })
//     }catch(err){
//       console.log(err, " error")
//     }
//   }
// }



class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
      users: [],
    //   username: "",
      text: "",
      messages: []
  }
    }
    componentDidMount=()=>{
        // database.ref().set({
        //     users: this.state.users
        // })
        // .then(()=console.log("first success"))
        // .catch(err => console.log('FB error', err))
        const config = {
            apiKey: "AIzaSyA-qIK6dsZFzEKwQF7jU-mJCkF9BL0AuZM",
            authDomain: "chatapp-b9baf.firebaseapp.com",
            databaseURL: "https://chatapp-b9baf.firebaseio.com",
            projectId: "chatapp-b9baf",
            storageBucket: "chatapp-b9baf.appspot.com",
            messagingSenderId: "987363613178"
          };
          firebase.initializeApp(config);
        
          //const database = firebase.database();  //assigns return value to database const
        
        this.getMessages()
        }

  onSubmit = (event) =>{
      if(event.charCode=== 13 && this.state.text.trim() !== ""){
          console.log(this.state.text)
          this.writeMessageToDB(this.state.text)
        this.setState({text: ""})
      }
  }
  writeMessageToDB = (message) =>{
    firebase
    .database()
    .ref("messages/")
    .push({
        text: message
    })
}

  getMessages=()=>{
      let messageDB = firebase
      .database
      .ref("messages/")
      .limitToLast(500)
      messageDB.on("value", snapshot =>{
          let newMessages = []
          snapshot.forEach(child =>{
              const message = child.val()
              newMessages.push({id: child.key, text: message.text})
          })
          this.setState({messages: newMessages, loading: false})
          this.bottomSpan.scrollIntoView({ behavior: "smooth"})
        })
  }

    renderMessages = () => {
        return this.state.messages.map(message => (
          <ListItem>
            <ListItemText
              style={{ wordBreak: "break-word" }}
              primary={message.text}
            />
          </ListItem>
        ))
      }

    render=()=>{
      return (
        <div className="App">
          {/* <UserList />
          <ChatHistory />
          <SendMessage /> */}
          <List>
                  {this.renderMessages()}
          </List>
          <TextField 
          autoFocus={true}
          multiLine={true}
          fullWidth={true}
          rowsMax={3}
          placeholder="Type something"
          onChange={event => this.setState({ text: event.target.value })}
          value={this.state.text}
          onKeyPress={this.onSubmit}
          style={{ width: "98vw", overflow: "hidden" }}
          />
          <span ref={el => (this.bottomSpan = el)} />

          
       </div>
      )
    }
}

export default App;
