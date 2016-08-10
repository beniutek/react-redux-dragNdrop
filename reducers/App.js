const initialState = {
	position: [0,0]
}

function App(state = initialState, action) {
  console.log("APP REDUCERS")
  console.log("CURRENT STATE: ", state)
  console.log("ACTION: ", action)

  switch (action.type) {
    case 'MOVE':
      console.log("APP REDUCERS MOVE")
      return Object.assign({}, state, {
        position: action.position
      })
    default:
      console.log("APP REDUCERS DEFAULT")
      return state
  }
}

export default App
