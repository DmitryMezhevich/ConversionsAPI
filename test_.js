curl --location --request POST 'https://business-api.tiktok.com/open_api/v1.3/event/track/'   --header 'Access-Token: ACCESS_TOKEN'   --header 'Content-Type: application/json'   --data-raw     '{
	"event_source": "web",
	"event_source_id": "COU94SBC77U8DR5JQBHG",
	"data": [
		{
			"event": "PlaceAnOrder",
			"event_id": "<event_id>", // string. A hashed ID that can identify a unique event. Example: "1616318632825_357".
			"event_time": "<event_time>", // number. The time that the event took place. Use unix timestamp. Example: 1697783008.
			"user": {
				"ttclid": "<tiktok_click_id>", // string. TikTok Click ID (ttclid) or a tracking parameter added to a landing page URL whenever a user clicks on an ad on TikTok. It starts with "E.C.P.".
				"external_id": "<hashed_extenal_id>", // string. Any unique identifier, such as loyalty membership IDs, user IDs, and external cookie IDs.It must be hashed with SHA-256 on the client side.
				"phone": "<hashed_phone_number>", // string. The phone number of the customer if available. It must be hashed with SHA-256 on the client side.
				"ttp": "<_ttp>", // string. Cookie ID saved in the _ttp cookie when you use Pixel SDK and enable cookies. Example: "2F7h37YkS1j57AYSKTI7IHhJPYH"
				"ip": "<ip_address>", // string. Non-hashed public IP address of the browser.
				"user_agent": "<user_agent>" // string. Non-hashed user agent from the user’s device. Example: "Chrome/91.0.4472.124".
			},
			"page": {
				"url": "<webpage_url>" // string. The page URL where the event took place. Example: "http://demo.mywebsite.com/purchase"
			},
			"properties": {
				"value": "<content_value>", // number. Value of the order or items sold. Example: 100.
				"currency": "<content_currency>" // string. The 4217 currency code. Example: "USD".
			}
		}
	]
}'
