import { useState, useEffect, useRef } from 'react';
import './App.css';
import Snake from './classes/Snake';
import drawingUtils from './utils/drawingUtils';

function App() {

	const canvasRef = useRef(null)
	const contextRef = useRef(null)
	
	const side = 800
	const nBlocks = 40
	
	const [snake, setSnake] = useState(new Snake())

	useEffect(()=>{
		const canvas = canvasRef.current

		canvas.width = side * 2
		canvas.height = side * 2

		canvas.style.width = `${side}px`
		canvas.style.height = `${side}px`

		const context = canvas.getContext("2d")
		context.scale(2,2)
		contextRef.current = context


		drawingUtils.drawStage(contextRef.current, nBlocks, side/nBlocks, "#455")
		snake.draw(contextRef.current, side/nBlocks)


	},[])

	return (
		<div className="App">
			<canvas
				style={{background: "#344"}}
				ref={canvasRef}
			/>
		</div>
	);
}

export default App;
