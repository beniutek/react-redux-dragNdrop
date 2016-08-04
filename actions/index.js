export const MOVE = 'MOVE'

export const moveKnight = (position) => {
	return {
	  type: MOVE,
	  position: position
	}
}