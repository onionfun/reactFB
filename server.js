//node server.js

require('dotenv').config('./variables.env');

    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const { Wit } = require('node-wit');

    const client = new Wit({
      accessToken: process.env.ER74C4OF34MQCPMYJFGOQTV54DQMEFOB,
    });

    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/chat', (req, res) => {
      const message = req.body;
      client
        .message(message)
        .then(data => {
          handleMessage(data);
        })
        .catch(error => console.log(error));
      //=========================
      const responses = {
        greetings: ["Hey, how's it going?", "What's good with you?"],
  
        jokes: [
          'Do I lose when the police officer says papers and I say scissors?',
          'I have clean conscience. I haven’t used it once till now.',
          'Did you hear about the crook who stole a calendar? He got twelve months.',
        ],
      };
  
      const firstEntityValue = (entities, entity) => {
        const val =
          entities &&
          entities[entity] &&
          Array.isArray(entities[entity]) &&
          entities[entity].length > 0 &&
          entities[entity][0].value;
  
        if (!val) {
          return null;
        }
  
        return val;
      };
  
      const handleMessage = ({ entities }) => {
      const greetings = firstEntityValue(entities, 'greetings');
      const jokes = firstEntityValue(entities, 'getJoke');

      if (greetings) {
        return pusher.trigger('bot', 'bot-response', {
          message:
            responses.greetings[
              Math.floor(Math.random() * responses.greetings.length)
            ],
        });
      }

      if (jokes) {
        return pusher.trigger('bot', 'bot-response', {
          message:
            responses.jokes[
              Math.floor(Math.random() * responses.jokes.length)
            ],
        });
      }

      return pusher.trigger('bot', 'bot-response', {
        message: 'I can tell jokes! Say \'tell me a joke\'',
      });
      //=========================
      
    }})
  
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/almostbot';
mongoose.connect(mongoUri);
    app.set('port', process.env.PORT || 7777);
    const server = app.listen(app.get('port'), () => {
      console.log(`Express running → PORT ${server.address().port}`);
    });