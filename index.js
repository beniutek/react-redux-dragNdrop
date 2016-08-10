import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './reducers/App'
import ChessBoard from './containers/ChessBoard'

let store = createStore(App)

ReactDOM.render(
	<Provider 
	  store={store}
  >
	  <ChessBoard />
	</Provider>,
	document.getElementById('root')
)
