import { connect } from 'react-redux'
import { moveKnight } from '../actions'
import Board from '../components/Board'

const mapStateToProps = (state) => {
	console.log("BOARD MAPSTATETOPROPS")
	console.log("BOARD STATE.POSITION: ", state.position)
	return {
		currentPosition: state.position
	}
}

const canMove = (toX, toY, pastPosition) => {
	const [x, y] = pastPosition
	const dx = toX - x
	const dy = toY - y
	return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || 
	  (Math.abs(dx) === 1 && Math.abs(dy) === 2)
}

const mapDispatchToProps = (dispatch, ownProps) => {
	console.log("BOARD MAPDISPATCHTOPROPS")
	console.log("BOARD OWNPROPS: ", ownProps.position)
	return {
		onSquareClick: (position, pastPosition) => {
			console.log("ONSQUARECLICK")
      if(canMove(position[0], position[1], pastPosition)) {
        console.log("MOVING:", position)
        dispatch(moveKnight(position))
      } else {
        console.log("CAN'T MOVE")
        null
      }
		}
	}
}

const ChessBoard = connect(mapStateToProps, mapDispatchToProps)(Board)

export default ChessBoard
