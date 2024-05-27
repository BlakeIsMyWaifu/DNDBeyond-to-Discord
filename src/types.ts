interface BaseWebhookData {
	id: string
	dateTime: string
	gameId: string
	userId: string
	source: 'web' | 'simplified-character-deriver'
	data: object
	entityId: string
	entityType: 'character'
	eventType: string
	persist: boolean
	messageScope: 'gameId'
	messageTarge: string
}

interface RollWebhookData extends BaseWebhookData {
	data: RollData
	eventType: 'dice/roll/pending' | 'dice/roll/fulfilled'
}

interface CharacterWebhookData extends BaseWebhookData {
	data: {
		characterId: number
	}
	eventType: 'character-sheet/character-update/fulfilled'
}

export type WebhookData = RollWebhookData | CharacterWebhookData

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
	rolls: {
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
	}[]
	setId: string
}

export type SendWebhook = (data: RollWebhookData) => Promise<void>

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
	maxWidth?: number
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
