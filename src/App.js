import { useState, useEffect, useRef } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import drawingUtils from './utils/drawingUtils';
import Snake from './classes/Snake';

import './App.css';
import Food from './classes/Food';

import { side, nBlocks } from './utils/consts';

function App() {

	const canvasRef = useRef(null)
	const contextRef = useRef(null)
	
	const [snake] = useState(new Snake())
	const [food] = useState(new Food(nBlocks))

	const [speed, setSpeed] = useState(0)
	const [score, setScore] = useState(0)
	const [bestScore, setbestScore] = useState(0)
	const [eatenFoods, setEatenFoods] = useState(0)
	
	const [isGameStopped, setIsGameStopped] = useState(true)

	const [timerController, setTimerController] = useState(0)

	//Start settings
	useEffect(()=>{
		const canvas = canvasRef.current

		canvas.width = side * 2
		canvas.height = side * 2

		canvas.style.width = `${side}px`
		canvas.style.height = `${side}px`

		const context = canvas.getContext("2d")
		context.scale(2,2)
		contextRef.current = context

		draw()

	},[])


	//Animation -----------

	//TODO: Verify this. CurrDir is always with the last position value....
	useEffect(()=>{
		setTimeout(()=>{
			if(snake.currDir){
				setIsGameStopped(false)
				
				//let willMove = true
				// if (snake.lastDir) {
				// 	const [lX, lY] = snake.directions[snake.lastDir]
				// 	const [cX, cY] = snake.directions[snake.currDir]
				// 	willMove = snake.lastDir && (lX - cX === 0 && lY - cY === 0)
				// }
				snake.move(snake.currDir)
				

				snakeFoodVerification()
				
				if (snake.hasLost()){
					alert(`GAME OVER! \n Your score: ${score}`)
					
					snake.setToInitialState()
					food.newRandomPosition()

					if (score > bestScore) setbestScore(score)
					setScore(0)
					setEatenFoods(0)
					setSpeed(0)

					setIsGameStopped(true)
				}
				draw()

				
				
			}

			setTimerController((timerController+1)%20)

			if (timerController === 0 && speed < 120 && !isGameStopped){
				setSpeed(speed + 1)
				setScore(score + 2)
			}

		}, 150-speed)
	},[timerController])


	function draw(){
		drawingUtils.drawStage(contextRef.current, "#455")
		snake.draw(contextRef.current, side/nBlocks)
		food.draw(contextRef.current, side/nBlocks)
	}

	function snakeFoodVerification(){
		const [xHead, yHead] = snake.head
		const [xFood, yFood] = food.coords

		if (xHead===xFood && yHead===yFood){

			setScore(score + Math.floor(20*speed/10))
			setEatenFoods(eatenFoods + 1)

			food.newRandomPosition()
			snake.grow()
		}
	}


	return (
		<div className="App">
			
			<div className="Panel">
				<div>
					<p><span>Best score:</span> {bestScore}</p>
					<p><span>Eaten:</span> {eatenFoods}</p>
				</div>
				<p className="Score"><span>Score:</span> {score}</p>

			</div>

			<canvas
				style={{background: "#344"}}
				ref={canvasRef}
			/>

			<KeyboardEventHandler
				handleKeys={['left', 'up', 'right', 'down']}
				handleEventType="keydown"
				onKeyEvent={(newDir) => {
					let willChange = true
					if (snake.currDir && snake.body.size > 1) {
						const [cX, cY] = snake.directions[snake.currDir]
						const [lX, lY] = snake.directions[newDir]
						willChange = !(cX + lX === 0 && cY + lY === 0)
					}

					if (willChange) snake.currDir = newDir
				}}
			/>

		</div>
	);
}

export default App;
