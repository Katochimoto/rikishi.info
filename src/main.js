import App from './components/App';

import './style/main.css';

ReactDOM.render((
  <App />
), document.getElementById('app'));


window.addEventListener('load', () => {
  document.body.classList.add('is-loaded');
});
