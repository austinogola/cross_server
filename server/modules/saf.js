let unirest = require('unirest');

let req = unirest('GET', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')

.headers({ 'Authorization': 'Basic VHZBZEY5VWZCbXFyY29HWjBlVUduM3hVTW1PWGNTR086bDNNc0hWUXJaRmt1dEphaw==' })
.send()
.end(res => {
    if (res.error) throw new Error(res.error);
    console.log(res.raw_body);
});


// {
//   "access_token": "yOGnTwuNR1KmDrbhgAQvvlttT9XW",
            // "expires_in": "3599"
// }
