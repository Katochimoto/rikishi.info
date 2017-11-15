import './style/main.css';
import App from './components/App';

ReactDOM.render((
  <App />
), document.getElementById('app'));


window.addEventListener('load', () => {
  document.body.classList.add('is-loaded');
});
