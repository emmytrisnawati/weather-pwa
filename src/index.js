import React from 'react';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import { render } from 'react-dom';
import configureStore, { history } from './store/configureStore';
import App from './App';
// import registerServiceWorker from './serviceWorkerRegistration';
import './App.css';
import './favicon.ico';
const store = configureStore();

render(
  <App history={history} store={store} />,
  document.getElementById('app')
);

// registerServiceWorker();

moduleHotAccept(module);

export function moduleHotAccept(mod) {
  if (mod.hot) {
    mod.hot.accept('./App', () => {
      const NewApp = require('./App').default;
      render(
        NewApp({ history, store }),
        document.getElementById('app')
      );
    });
  }
}
