import { createCanvas } from '@napi-rs/canvas'
import { GlobalFonts, Path2D } from '@napi-rs/canvas'

GlobalFonts.registerFromPath('./assets/RobotoCondensed-Regular.ttf', 'Roboto Condensed')

/** @type {import('./types').GetImageBuffer} */
export default async function getImageBuffer(data) {
	const [height, width] = [120, 250]

	const canvas = createCanvas(width, height)
	const context = canvas.getContext('2d')

	/** @type {import('./types').SetColour} */
	function setColour(colour = 'gray') {
		const colours = {
			white: '#fff',
			black: '#000',
			gray: '#5C7080',
			lightGray: '#CED9E0'
		}
		context.fillStyle = colours[colour]
	}

	/** @type {import('./types').AddText} */
	function addText({ text, colour, x, y, fontSize = 32 }) {
		setColour(colour)
		context.font = `${fontSize}px Roboto Condensed`
		context.fillText(text, x, y)
	}

	/** @type {import('./types').AddRect} */
	function addRect({ colour, x, y, width, height }) {
		setColour(colour)
		context.fillRect(x, y, width, height)
	}

	/** @type {import('./types').AddSVG} */
	function addSVG({ path, colour, x, y }) {
		setColour(colour)
		const svg = new Path2D(path)
		context.translate(x, y)
		context.fill(svg)
		context.translate(-x, -y)
	}

	addRect({ colour: 'lightGray', x: 0, y: 0, width, height })

	const borderSize = 8
	addRect({
		colour: 'white',
		x: borderSize,
		y: borderSize,
		width: width - borderSize * 2,
		height: height - borderSize * 2
	})

	addText({ text: `${data.action}: ${data.rolls[0].rollType}`, x: 12, y: 36 })

	addSVG({
		path: 'M16 1l14 7.45v15l-1 .596L16 31 2 23.55V8.45L16 1zm5 19.868H10l6 7.45 5-7.45zm-13.3.496L5 22.954l7.1 3.874-4.4-5.464zm16.6-.1l-4.4 5.464 7.1-3.874-2.7-1.59zM4 13.716v7.55l2.7-1.59-2.7-5.96zm24 0l-2.7 5.96.2.1 2.5 1.49v-7.55zM16 9.841l-6 9.04h12l-6-9.04zm-2-.596l-9.6.795 3.7 7.947L14 9.245zm4 0l5.8 8.742 3.7-8.047-9.5-.695zm-1-5.464V7.16l7.4.596L17 3.781zm-2 0L7.6 7.755l7.4-.596V3.78z',
		x: 12,
		y: 42
	})

	addText({ text: data.rolls[0].result.text, colour: 'black', x: 42, y: 64 })

	const { diceNotation } = data.rolls[0]
	addText({
		text: `${diceNotation.set[0].count}${diceNotation.set[0].dieType}${diceNotation.constant}`,
		x: 12,
		y: 96
	})

	addRect({ x: 180, y: 12, width: 2, height: 32 })
	addRect({ x: 170, y: 48, width: 20, height: 4 })
	addRect({ x: 170, y: 56, width: 20, height: 4 })
	addRect({ x: 180, y: 64, width: 2, height: 32 })

	addText({ text: data.rolls[0].result.total.toString(), colour: 'black', x: 200, y: 64 })

	return await canvas.encode('png')
}
