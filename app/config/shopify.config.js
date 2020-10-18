require('dotenv').config()

module.exports = {
	store: 'storetets.myshopify.com/',
	store_admin: 'storetets.myshopify.com/admin',
	app_name: 'storetestapi',
	emergency_developer_email: 'snakesfc@gmail',
	API_key: process.env.API_KEY_SHOPIFY,
	password: process.env.API_KEY_PASSWORD,
	secret: process.env.API_SECRET_SHOPIFY
}