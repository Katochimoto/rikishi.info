import './style/main.css'
import ReactDOM from 'react-dom'
import App from './components/App'

ReactDOM.render((
  <App />
), document.getElementById('app'))

window.onload = function () {
  document.body.classList.add('is-loaded')
}

// @if NODE_ENV='production'
(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {
      scope: '/'
    })
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args) {
    dataLayer.push(args)
  }

  window.gtag('js', new Date())
  window.gtag('config', '/* @echo GOOGLE_TAG */')
 }())
// @endif
