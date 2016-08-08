import { connect } from 'react-redux'
import { moveKnight } from '../actions'
import Board from '../components/Board'

const mapStateToProps = (state, ownProps) => {
	console.log("MAPSTATETOPROPS")
	console.log("STATE.POSITION: ", state.position)
	return {
		position: state.position
	}
}

const canMove = (toX, toY, pastPosition) => {
	const [x, y] = pastPosition
	const dx = toX - x
	const dy = toY - y
	return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2)
}

const mapDispatchToProps = (dispatch, ownProps) => {
	console.log("MAPDISPATCHTOPROPS")
	return {
		onSquareClick: (position, pastPosition) => {
			console.log("ONSQUARECLICK")
      if(true){//canMove(position[0], position[1], pastPosition)) {
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
