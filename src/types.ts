export type WebhookData = {
	id: string
	dateTime: string
	gameId: string
	userId: string
	source: 'web'
	data: RollData
	entityId: string
	entityType: 'character'
	eventType: 'dice/roll/pending' | 'dice/roll/fulfilled'
	persist: boolean
	messageScope: 'gameId'
	messageTarge: string
}

type RollData = {
	context: {
		entityId: string
		entityType: string
		name: string
		messageScope: string
		messageTarget: string
	}
	rollId: string
	action: string
	rolls: Roll[]
	setId: string
}

type Roll = {
	diceNotation: {
		set: {
			count: number
			dieType: string
			dice: {
				dieType: string
				dieValue: number
			}[]
			operation: number
		}[]
		constant: number
	}
	rollType: string
	rollKind: string
	result: {
		constant: number
		values: number[]
		total: number
		text: string
	}
}

export type SendWebhook = (data: WebhookData) => Promise<void>

export type GetImageBuffer = (data: RollData) => Promise<Buffer>

interface BaseOption {
	colour?: 'white' | 'black' | 'gray' | 'lightGray'
	x: number
	y: number
}

export type SetColour = (colour: BaseOption['colour']) => void

export type AddText = (options: AddTextOptions) => void
interface AddTextOptions extends BaseOption {
	text: string
	fontSize?: number
}

export type AddRect = (options: AddRectOptions) => void
interface AddRectOptions extends BaseOption {
	height: number
	width: number
}

export type AddSVG = (options: AddSVGOptions) => void
interface AddSVGOptions extends BaseOption {
	path: string
}
