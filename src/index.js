import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

//redux
import { Provider } from 'react-redux'
import { compose,createStore } from 'redux'
import { persistStore, autoRehydrate} from 'redux-persist'
//reducers
import reducers from './reducers';

//init firebase
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBhumFfX-cb8pqlhmCjnAovsvOyvlRx6Ww",
  authDomain: "pwa-hackathon-22c30.firebaseapp.com",
  databaseURL: "https://pwa-hackathon-22c30.firebaseio.com",
  projectId: "pwa-hackathon-22c30",
  storageBucket: "pwa-hackathon-22c30.appspot.com",
  messagingSenderId: "471785560448",
};

firebase.initializeApp(config);

const store = createStore(
  reducers,
  compose(
    autoRehydrate()
  )
);
persistStore(store);

injectTapEventPlugin();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
