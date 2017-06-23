import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

//redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
//reducers
import reducers from './reducers';

const store = createStore(reducers);

injectTapEventPlugin();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
