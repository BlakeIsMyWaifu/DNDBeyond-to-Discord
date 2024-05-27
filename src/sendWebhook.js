import process from 'node:process'

import { AttachmentBuilder, WebhookClient } from 'discord.js'

import getImageBuffer from './getImageBuffer.js'

const webhookClient = new WebhookClient({
	url: process.env.WEBHOOK_URL
})

/** @type {import('./types').SendWebhook} */
export default async function sendWebhook({ data }) {
	const imageBuffer = await getImageBuffer(data)
	const attachment = new AttachmentBuilder(imageBuffer, {
		name: 'dndbeyond-roll.png'
	})

	await webhookClient.send({
		username: data.context.name,
		files: [attachment],
		avatarURL: data.context.avatarUrl ?? 'https://www.dndbeyond.com/content/1-0-2729-0/skins/waterdeep/images/characters/default-avatar.png'
	})
}

