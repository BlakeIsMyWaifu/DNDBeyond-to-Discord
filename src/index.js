import 'dotenv/config'

import process from 'node:process'

import puppeteer from 'puppeteer-extra'
import stealthPlugin from 'puppeteer-extra-plugin-stealth'

import sendWebhook from './sendWebhook.js'

const headless = process.argv[2] !== '--login'

puppeteer.use(stealthPlugin())

const instance = await puppeteer.launch({
	headless,
	userDataDir: './userdata',
	args: ['--window-size=1920,1080'],
	ignoreDefaultArgs: ['--disable-extensions'],
	defaultViewport: {
		width: 1920,
		height: 1080
	}
})

const [page] = await instance.pages()

await page.setUserAgent(
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
)

const cdp = await page.createCDPSession()
await cdp.send('Network.enable')
await cdp.send('Page.enable')

cdp.on('Network.webSocketFrameReceived', ({ response }) => {
	/** @type {import('./types').WebhookData} */
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data = JSON.parse(response.payloadData)

	if (data.eventType !== 'dice/roll/fulfilled') return

	sendWebhook(data).catch(error => {
		console.log(data)
		console.error(error)
	})
})

// eslint-disable-next-line no-undef
await page.goto(`https://www.dndbeyond.com/campaigns/${process.env.CAMPGAIN_ID}`)

console.log('Ready!')
