require('dotenv').config()

module.exports = {
	store: 'kados-chile.myshopify.com/',
	store_admin: 'kados-chile.myshopify.com/admin/',
	app_name: 'kadosinternal',
	emergency_developer_email: 'kados@kreados.cl',
	API_key: process.env.API_KEY_SHOPIFY,
	password: process.env.API_KEY_PASSWORD,
	secret: process.env.API_SECRET_SHOPIFY
}