import React, { Component } from 'react';
//import "semantic-ui-css/semantic.min.css"; //{ Input, List} from
import './App.css';
import { TextField, List, ListItem, ListItemText } from "@material-ui/core"
import database from './firebase/firebase';


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

    database
    .ref("messages/")
    .push({
        text: message
    })
}

  getMessages=()=>{
      let messageDB = database
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
          <ListItem key={message.id}>
            <ListItemText
              style={{ wordBreak: "break-word" }}
              primary={message.text}
            />
          </ListItem>
        ))
      }

    render(){
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
          multiline={true}
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
