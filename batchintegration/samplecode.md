---
sidebar_position: 2

---

# Sample Code & Examples

## Transaction Types

### SALE

 The following example PHP code shows how to launch a batch of **SALE** transactions (3 in total):

```php
 <?PHP 

 // Merchant signature key
 $key = '3obzOxdqw6e1u';

 // Gateway URL
 $url = 'https://commerce-api.handpoint.com/batch/';

 // Create a unique multipart boundary
 $boundary = uniqid();

 // Requests
 $reqs = array(
 array(
    'merchantID' => 155928,
    'action' => 'SALE',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 1001,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 24,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    ),
 array(
    'merchantID' => 155928,
    'action' => 'SALE',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 2002,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 24,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    ),
 array(
    'merchantID' => 155928,
    'action' => 'SALE',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 3003,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 24,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    ),
 );

 // Create the batch parts
 $parts = array();
 foreach ($reqs as $req) {

 // Create the signature using the function called below.
 $req['signature'] = createSignature($req, $key);

 $parts[] =
 "Content-Id: TX{$req['transactionUnique']}\r\n" .
 "Content-Type: application/x-www-form-urlencoded; charset=\"UTF-8\"\r\n" .
 "\r\n" .
 http_build_query($req);
 }

 // Join the parts together separated by the boundary string
 $post = "\r\n--{$boundary}\r\n" . join("\r\n--{$boundary}\r\n", $parts) . "\r\n--{$boundary}--\r\n";

 // Initiate and set curl options to post to the gateway
 $ch = curl_init($url);
 curl_setopt($ch, CURLOPT_POST, true);
 curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
 curl_setopt($ch, CURLOPT_HEADER, true);
 curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 curl_setopt($ch, CURLOPT_HTTPHEADER, array(
 'Content-type: multipart/mixed; charset="UTF-8"; boundary=' . $boundary,
 'Content-length: ' . strlen($post),
));

// Send the request
$res = curl_exec($ch);

// Normally would process the response here, but for this example just echo it out 

header ('Content-Type: text/plain');

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($res, 0, $header_size);

//Shows the Headers information
echo $header;


// Close the connection to the gateway
curl_close($ch);

// Function to create a message signature
 function createSignature(array $data, $key) {
 // Sort by field name
 ksort($data);

 // Create the URL encoded signature string
 $ret = http_build_query($data, '', '&');

 // Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)
 $ret = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $ret);

 // Hash the signature string and the key together
 return hash('SHA512', $ret . $key);
}
?>
```


### VERIFY

The following example PHP code shows how to launch a batch of **VERIFY** transactions (3 in total):

```php
<?PHP 

 // Merchant signature key --> It will be provided by the Handpoint support team.
 $key = '3obzOxdqw6e1u';

 // Gateway URL
 $url = 'https://commerce-api.handpoint.com/batch/';

 // Create a unique multipart boundary
 $boundary = uniqid();

 // Requests
 $reqs = array(
 array(
    'merchantID' => 155928,
    'action' => 'VERIFY',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 0,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 22,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    ),
 array(
    'merchantID' => 155928,
    'action' => 'VERIFY',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 0,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 22,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    ),
 array(
    'merchantID' => 155928,
    'action' => 'VERIFY',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 0,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 22,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    ),
 );

 // Create the batch parts
 $parts = array();
 foreach ($reqs as $req) {

 // Create the signature using the function called below.
 $req['signature'] = createSignature($req, $key);

 $parts[] =
 "Content-Id: TX{$req['transactionUnique']}\r\n" .
 "Content-Type: application/x-www-form-urlencoded; charset=\"UTF-8\"\r\n" .
 "\r\n" .
 http_build_query($req);
 }

 // Join the parts together separated by the boundary string
 $post = "\r\n--{$boundary}\r\n" . join("\r\n--{$boundary}\r\n", $parts) . "\r\n--{$boundary}--\r\n";

 // Initiate and set curl options to post to the gateway
 $ch = curl_init($url);
 curl_setopt($ch, CURLOPT_POST, true);
 curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
 curl_setopt($ch, CURLOPT_HEADER, true);
 curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 curl_setopt($ch, CURLOPT_HTTPHEADER, array(
 'Content-type: multipart/mixed; charset="UTF-8"; boundary=' . $boundary,
 'Content-length: ' . strlen($post),
));

// Send the request
$res = curl_exec($ch);

// Normally would process the response here, but for this example just echo it out 

header ('Content-Type: text/plain');

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($res, 0, $header_size);

//Shows the Headers information
echo $header;


// Close the connection to the gateway
curl_close($ch);

// Function to create a message signature
 function createSignature(array $data, $key) {
 // Sort by field name
 ksort($data);

 // Create the URL encoded signature string
 $ret = http_build_query($data, '', '&');

 // Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)
 $ret = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $ret);

 // Hash the signature string and the key together
 return hash('SHA512', $ret . $key);
}
?>
```

### PREAUTH

The following example PHP code shows how to launch a batch of **PREAUTH** transactions (3 in total):


```php
<?PHP 

 // Merchant signature key --> It will be provided by the Handpoint support team.
 $key = '3obzOxdqw6e1u';

 // Gateway URL
 $url = 'https://commerce-api.handpoint.com/batch/';

 // Create a unique multipart boundary
 $boundary = uniqid();

 // Requests
 $reqs = array(
 array(
    'merchantID' => 155928,
    'action' => 'PREAUTH',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 100,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 22,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    ),
 array(
    'merchantID' => 155928,
    'action' => 'PREAUTH',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 101,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 22,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    ),
 array(
    'merchantID' => 155928,
    'action' => 'PREAUTH',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 102,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 22,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    ),
 );

 // Create the batch parts
 $parts = array();
 foreach ($reqs as $req) {

 // Create the signature using the function called below.
 $req['signature'] = createSignature($req, $key);

 $parts[] =
 "Content-Id: TX{$req['transactionUnique']}\r\n" .
 "Content-Type: application/x-www-form-urlencoded; charset=\"UTF-8\"\r\n" .
 "\r\n" .
 http_build_query($req);
 }

 // Join the parts together separated by the boundary string
 $post = "\r\n--{$boundary}\r\n" . join("\r\n--{$boundary}\r\n", $parts) . "\r\n--{$boundary}--\r\n";

 // Initiate and set curl options to post to the gateway
 $ch = curl_init($url);
 curl_setopt($ch, CURLOPT_POST, true);
 curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
 curl_setopt($ch, CURLOPT_HEADER, true);
 curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 curl_setopt($ch, CURLOPT_HTTPHEADER, array(
 'Content-type: multipart/mixed; charset="UTF-8"; boundary=' . $boundary,
 'Content-length: ' . strlen($post),
));

// Send the request
$res = curl_exec($ch);

// Normally would process the response here, but for this example just echo it out 

header ('Content-Type: text/plain');

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($res, 0, $header_size);

//Shows the Headers information
echo $header;


// Close the connection to the gateway
curl_close($ch);

// Function to create a message signature
 function createSignature(array $data, $key) {
 // Sort by field name
 ksort($data);

 // Create the URL encoded signature string
 $ret = http_build_query($data, '', '&');

 // Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)
 $ret = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $ret);

 // Hash the signature string and the key together
 return hash('SHA512', $ret . $key);
}
?>
```

### REFUND

The following example PHP code shows how to launch a batch of **REFUND** transactions (3 in total):


```php
<?PHP 

 // Merchant signature key 
 $key = '3obzOxdqw6e1u';

 // Gateway URL
 $url = 'https://commerce-api.handpoint.com/batch/';

 // Create a unique multipart boundary
 $boundary = uniqid();

 // Requests
 $reqs = array(
 array(
    'merchantID' => 155928,
    'action' => 'REFUND',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 1001,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 22,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    'remoteAddress' => $_SERVER['REMOTE_ADDR'],
    ),
 array(
    'merchantID' => 155928,
    'action' => 'REFUND',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 1002,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 22,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    'remoteAddress' => $_SERVER['REMOTE_ADDR'],
    ),
 array(
    'merchantID' => 155928,
    'action' => 'REFUND',
    'type' => 1,
    'currencyCode' => 826,
    'countryCode' => 826,
    'amount' => 1003,
    'cardNumber' => '4012001037141112',
    'cardExpiryMonth' => 12,
    'cardExpiryYear' => 22,
    'cardCVV' => '083',
    'customerName' => 'Test Customer',
    'customerEmail' => 'test@testcustomer.com',
    'customerAddress' => '16 Test Street',
    'customerPostCode' => 'TE15 5ST',
    'orderRef' => 'Test purchase',
    'transactionUnique' => uniqid(),
    'threeDSRequired' => 'N',
    'avscv2CheckRequired' => 'N',
    'remoteAddress' => $_SERVER['REMOTE_ADDR'],
    ),
 );

 // Create the batch parts
 $parts = array();
 foreach ($reqs as $req) {

 // Create the signature using the function called below.
 $req['signature'] = createSignature($req, $key);

 $parts[] =
 "Content-Id: TX{$req['transactionUnique']}\r\n" .
 "Content-Type: application/x-www-form-urlencoded; charset=\"UTF-8\"\r\n" .
 "\r\n" .
 http_build_query($req);
 }

 // Join the parts together separated by the boundary string
 $post = "\r\n--{$boundary}\r\n" . join("\r\n--{$boundary}\r\n", $parts) . "\r\n--{$boundary}--\r\n";

 // Initiate and set curl options to post to the gateway
 $ch = curl_init($url);
 curl_setopt($ch, CURLOPT_POST, true);
 curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
 curl_setopt($ch, CURLOPT_HEADER, true);
 curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
 'Content-type: multipart/mixed; charset="UTF-8"; boundary=' . $boundary,
 'Content-length: ' . strlen($post),
));

// Send the request
$res = curl_exec($ch);

// Normally would process the response here, but for this example just echo it out 

header ('Content-Type: text/plain');

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($res, 0, $header_size);

//Shows the Headers information
echo $header;




// Close the connection to the gateway
curl_close($ch);

// Function to create a message signature
 function createSignature(array $data, $key) {
 // Sort by field name
 ksort($data);

 // Create the URL encoded signature string
 $ret = http_build_query($data, '', '&');

 // Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)
 $ret = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $ret);

 // Hash the signature string and the key together
 return hash('SHA512', $ret . $key);
}
?>
```

## Example HTTP Request 

### Submission Request HTTP Headers

The following HTTP headers are sent for batch submission request:

| HTTP Header | Mandatory | Description |
| ----------- | ----------- |----------- |
| content-type  | Y | Content type of the batch request. This must be ‘multipart/mixed’ and contain a boundary parameter to separate each transaction request. A charset parameter is optional and any none UTF-8 request will be converted to UTF-8. |  
| content-encoding | N | Optional content encoding applied to the request. The value should be a comma separated list of one or more: x-gzip, gzip, base64. |  
| authorization | N |  Optional username and password to authenticate the submitter. |  

The following HTTP headers are sent on each individual part request:

| HTTP Header | Mandatory | Description |
| ----------- | ----------- |----------- |
| content-type  | Y |  Content type of the individual request. This must be ‘application/xwww-form-urlencoded’, A charset parameter is optional and any none UTF-8 request will be converted to UTF-8. |  
| content-encoding | N | Optional content encoding applied to the request. The value should be a comma separated list of one or more: x-gzip, gzip, base64. |  
| content-id | N |  Optional identifier for each individual transaction with the batch. The Gateway will return this identifier in the submission response. If not sent, the Gateway will generate a unique identifier for each transaction. |  


### Submission Response HTTP Headers {#submissionResponse}

The following HTTP headers are received for batch submission response:

| HTTP Header | Description |
| ----------- | ----------- | 
| status | HTTP status header. Possible value are:<br></br>200 – Batch submission status response ok<br></br>201 – Batch submission received and stored<br></br>400 – Batch submission invalid<br></br>401 – Unauthorised (none or incorrect credentials)<br></br>405 – HTTP method was not POST/PUT or GET<br></br>500 – Internal Gateway error | 
| location | URL to use to monitor the status of the batch. A unique batch reference number will be provided in the URL in the format: XXXX-XXXX-XXXX-XXXX (eg 1A23-B4C5-DEF6-G7HI). This reference number is used to request information about the status of a batch via HTTP GET requests to the URL endpoint | 
| x-p3-token  | If user authentication was sent in the initial request, this header will contain a token that can be used for future requests for the status of the batch instead of having to use a username/password.| 
| content-type  | Content type of the HTTP batch request. This will be ‘multipart/mixed’ and contain a boundary parameter to separate each transaction request. | 

The following HTTP headers are received on each individual part response:

| HTTP Header | Description |
| ----------- | ----------- | 
| content-type  | Content type of the individual request. This will be ‘application/x-www-formurlencoded’, A charset parameter is optional and any none UTF-8 request will be converted to UTF-8. | 
| content-id  | The content ID sent in the initial request. If no content-id header was sent, the Gateway will return a unique content ID per transaction. | 
| x-transaction-id | The Gateway transaction ID. This will be empty if the transaction is currently pending in this stage. | 
| x-transaction-response | A message containing the current status of the transaction.Possible value are:<br></br>skipped – insufficient permissions to view transaction<br></br>pending – queued for processing<br></br>success – (Response Message)<br></br>failure – (Response Message) | 

### Status Request HTTP Headers

The following HTTP headers are used during a batch status request:

| HTTP Header | Mandatory | Description |
| ----------- | ----------- | ----------- | 
| authorization | Y | Mandatory username and password to authenticate the submitter | 

### Status Response HTTP Headers

The batch status response is identical to the [submission status response](#submissionResponse).

### Submission Example

The following shows an example of a batch submission request:

```http 
 PUT /batch/?validate=0 HTTP/1.1
 Authorization: Basic bmljay50dXJuZXI6dGVzdGluZzI=
 Host: gateway.example.com
 Accept: */*
 Content-type: multipart/mixed; charset=UTF-8; boundary=5de63a42507a9
 Content-length: 1404

 --5de63a42507a9
 Content-Id: TX5de63a42507ac
 Content-Type: application/x-www-form-urlencoded; charset=UTF-8

merchantID=100001&action=SALE&type=1&currencyCode=826&countryCode=826&amount=680&transactionUnique=5de63a42507a
c&orderRef=Test+Transaction&cardNumber=4929+4212+3460+0821&cardExpiryDate=1219&duplicateDelay=0&signature=3cd68
6fdd40449ef33534baa62732c95fc127ff591fae3b5b611ccb38573ad921d199396e27cffd14faa4f46df8dde310252920fd1b33607b029
b9b6ff669e2b

 --5de63a42507a9
 Content-Id: TX5de63a42af062
 Content-Type: application/x-www-form-urlencoded; charset=UTF-8

merchantID=100001&action=SALE&type=1&currencyCode=826&countryCode=826&amount=681&transactionUnique=5de63a42af06
2&orderRef=Test+Transaction&cardNumber=4929+4212+3460+0821&cardExpiryDate=1219&duplicateDelay=0&signature=55f41
1d40954be7f7089e84fe489438f09fc1b37c0964e46b0fab8bdcb44e13ed3ea11b9deb9da89a6d7b45133709a126bd3581f6329bf888b83
231184597231

 --5de63a42507a9
 Content-Id: TX5de63a42ca9cd
 Content-Type: application/x-www-form-urlencoded; charset=UTF-8

merchantID=100001&action=SALE&type=1&currencyCode=826&countryCode=826&amount=682&transactionUnique=5de63a42ca9c
d&orderRef=Test+Transaction&cardNumber=4929+4212+3460+0821&cardExpiryDate=1219&duplicateDelay=0&signature=c2962
66cb9bc8082957c700da9651d98add176dd8bd62eb3b7098566c7d8e23a3426b776de815e99149c6681978b1addedac762339563732d8a4
49b6cca3a3c2

 --5de63a42507a9-- 
```

The following shows an example of a batch submission response:

```http 
HTTP/1.1 201 Created
Date: Tue, 01 Jan 2019 09:30:45 GMT
Server: Apache/2.4.23 (Win64) OpenSSL/1.0.2k-fips PHP/5.4.12
X-Powered-By: PHP/5.4.12
x-p3-token: YTo1OntzOjc6InZlcnNpb24iO3M6ODoiUDNUSy8yLjAiO3M6NzoicHVycG9zZSI7czo0OiJhdXRoIjtzOjc6ImNyZWF0b3IiO3M
6NToiQkFUQ0giO3M6NzoiY3JlYXRlZCI7aToxNTc1MzY5Mjg1O3M6NzoiZXhwaXJlcyI7aToxNTc1MzcyODg1O30.czozOiI2MjkiOw.zdfxxXY
tC2Wc4yyk-lEos-wZ99pEJtPGYpXR4KCiWW_56nmOysarOaMucrWPIt-NzwFzgq3-7u4Ud6uYkQcWBQ
Location: /batch/2D6D-AC2C-BF55-2A8C
Content-disposition: attachment; filename="batch-2D6D-AC2C-BF55-2A8C"
Content-Length: 1857
Content-Type: multipart/mixed; charset=UTF-8; boundary=5de63a5c1a071

Transaction 'TX5de63a42507ac' - pending - queued for processing
Transaction 'TX5de63a42af062' - pending - queued for processing
Transaction 'TX5de63a42ca9cd' - pending - queued for processing

--5de63a5c1a071
Content-Id: TX5de63a42507ac
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Transaction-ID:
X-Transaction-Response: pending - queued for processing

merchantID=100001&action=SALE&type=1¤cyCode=826&countryCode=826&amount=680&transactionUnique=5de63a42507ac&orde
rRef=Test+Transaction&cardNumber=492942%2A%2A%2A%2A%2A%2A0821&cardExpiryDate=1219&duplicateDelay=0&signature=03
84bbf6ca0fc153e1e27a0cfc51f3b1cd1c2cff7a49aa4e9439bba38262183e9ac7d156f218eba1ef8d04f9e6a7fa6fbc9c2b3ab990c70e0
6dc7c6923e5b27b

--5de63a5c1a071
Content-Id: TX5de63a42af062
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Transaction-ID:
X-Transaction-Response: pending - queued for processing

merchantID=100001&action=SALE&type=1¤cyCode=826&countryCode=826&amount=681&transactionUnique=5de63a42af062&orde
rRef=Test+Transaction&cardNumber=492942%2A%2A%2A%2A%2A%2A0821&cardExpiryDate=1219&duplicateDelay=0&signature=1e
13e23c2b90a30f4403d604ac20302b5504b886b0b5c9ace0764fc8d966d120f5a1beca975805292780c22953b4e6ca71f67f499804f19d2
718518463a598c4

--5de63a5c1a071
Content-Id: TX5de63a42ca9cd
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Transaction-ID:
X-Transaction-Response: pending - queued for processing

merchantID=100001&action=SALE&type=1¤cyCode=826&countryCode=826&amount=682&transactionUnique=5de63a42ca9cd&orde
rRef=Test+Transaction&cardNumber=492942%2A%2A%2A%2A%2A%2A0821&cardExpiryDate=1219&duplicateDelay=0&signature=c4
56aa211f8e3e568a40051bfd38406be02566fcd72d3bb1547f4d43e75db1d069eaa4158aa035337cac084633df945a13471db6b1a3fcd6c
0749626d9bc0044

--5de63a5c1a071-- 
```

## Testing 

You will be provided with unique test Merchant Account IDs during the onboarding process. Refer to the [authentication](overview#authentication) section for the list of required parameters. Test Merchant Accounts are connected to a Simulator and not to an actual Acquirer. The Simulator will emulate the function of an Acquirer and provide simulated responses and authorisation codes.

### Test Amounts 

When testing the transaction amount can be used to trigger different authorisation and settlement outcomes as follows:

| Min. Amount | Max. Amount | Authorisation response | Settlement outcome |
| ----------- | ----------- | ----------- | ----------- |
| 100 (1.00) | 2499 (24.99) | (0) AUTH CODE: XXXXXX | ACCEPTED |
| 2500 (25.00) | 4999 (49.99) | (0) AUTH CODE: XXXXXX | REJECTED |
| 5000 (50.00) | 7499 (74.99) | (1) CARD REFERRED <br></br> (0) AUTH CODE: XXXXXX  | ACCEPTED |
| 7500 (75.00) | 9999 (99.99) | (1) CARD REFERRED <br></br> (0) AUTH CODE: XXXXXX  | REJECTED |
| 10000 (100.00) | 14999 (49.99) | (5) CARD DECLINED | N/A |
| 15000 (150.00) | 19999 (199.99) | (4) CARD DECLINED – KEEP CARD | N/A |
| 20000 (200.00) | 24999 (249.99) | (65) CARD DECLINED - SCA REQUIRED <br></br> (0) AUTH CODE: XXXXXX | ACCEPTED |
| 25000 (250.00) | 29999 (299.99) | (65) CARD DECLINED – SCA REQUIRED <br></br>  (5) CARD DECLINED | N/A |

Any other amount will return a `responseCode` of 66311 (Invalid Test Amount).

The settlement outcome only applies to transactions which reach settlement due to being successfully authorised and captured and not cancelled. The amount captured is used when determining the settlement outcome rather than the amount authorised.

The range 5000 to 9999 can be used to test manual authorisations. If the transaction does not contain an `authorisationCode` request field, then the Simulator will return a `responseCode` of 1 (CARD REFERRED). If it does, then it will return a `responseCode` of 0 (SUCCESS), with an amount between 50000 and 7499 being accepted at settlement and an amount of 7500 to 9999 being rejected.

The range 20000 to 29999 can be used to test secure customer authentication (SCA) soft declines. If the transaction is eligible to request SCA then the Simulator will return a `responseCode` of 65 (SCA REQUIRED). If not, then it will return a `responseCode` of 0 (SUCCESS) for the range 20000 to 24999 or 5 (DO NOT HONOR) for the range 25000 to 29999. Successful transactions will be approved at settlement.

Note: SCA exemptions are not supported by the simulator and so cannot be used to request that SCA is not required.

### Test Cards {#testCards}

The test accounts will only accept card numbers that are designated for test purposes. These test cards cannot be used on production accounts.

To test AVS and CV2 verification then the associated CVV and billing addresses are provided for each card. If a different value is used, then the Simulator will mark the responses as ‘not matched’.

**Unless stated otherwise an expiry date sometime in the near future should be used.**

#### Visa Credit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 4929421234600821 | 356 | Flat 6 Primrose Rise<br></br> 347 Lavender Road <br></br>Northampton <br></br> NN17 8YG| 
| 4543059999999982 | 110 | 76 Roseby Avenue<br></br> Manchester <br></br>M63X 7TH| 
| 4543059999999990 | 689 | 23 Rogerham Mansions<br></br>4578 Ermine Street<br></br> Borehamwood <br></br> WD54 8TH| 

#### Visa Debit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 4539791001730106 | 289 | Unit 5 Pickwick Walk<br></br>120 Uxbridge Road Hatch End<br></br>Middlesex<br></br>HA6 7HJ| 
| 4462000000000003 | 672 | Mews 57<br></br>Ladybird Drive<br></br>Denmark<br></br> 65890| 

#### Visa Electron 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 4917480000000008 | 009 | 5-6 Ross Avenue<br></br>Birmingham<br></br>B67 8UJ| 

#### Mastercard Credit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 5301250070000191 | 419 | 25 The Larches Narborough<br></br>Leicester<br></br>LE10 2RT| 
| 5413339000001000 | 304 | Pear Tree Cottage<br></br>The Green<br></br>Milton Keynes<br></br>MK11 7UY| 
| 5434849999999951 | 470 | 34a Rubbery Close<br></br>Cloisters Run<br></br>Rugby<br></br>CV21 8JT| 
| 5434849999999993 | 557 | 4-7 The Hay Market<br></br>Grantham<br></br>NG32 4HG| 

#### Mastercard Debit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 5573 4712 3456 7898 | 159 | Merevale Avenue<br></br>Leicester<br></br>LE10 2BU| 

#### UK Maestro 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 6759 0150 5012 3445 002 | 309 | The Parkway<br></br>5258 Larches Approach Hull<br></br>North Humberside<br></br>HU10 5OP| 
| 6759 0168 0000 0120 097 | 701 | The Manor<br></br>Wolvey Road<br></br>Middlesex<br></br>TW7 9FF| 

#### JCB

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 3540599999991047 | 209 | 2 Middle Wallop Merideth-in-the-Wolds<br></br>Lincolnshire<br></br>LN2 8HG| 


#### American Express

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 374245455400001 | 4887 | The Hunts Way<br></br>Southampton<br></br>SO18 1GW| 

#### Diners Club

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 36432685260294 | 111 | N/A | 

Diners Club do not support the Address Verification Service (AVS). For testing purposes, we advise that a separate Merchant Account is used with AVS is turned off.

### 3D Secure Testing 

Your test accounts are connected to our 3-D Secure Product Integration Testing (PIT) system rather than to the production 3-D Secure servers. You can use any of the test cards provided above with this PIT system, and the authentication status returned by the Directory Server (for frictionless flow simulation) can be selected using the value of the card expiry month as follows:

| Card Expiry Month| Auth Status | Simulation (Frictionless) | 
| ----------- | ----------- | ----------- |
| 01 - January | Y | Fully authenticated | 
| 02 - February | N | Not authenticated 
|03 - March|U|Unknown authentication status | 
|04 - April|A|Attempted authentication| 
|05 - May|D|Decoupled authentication | 
|06 - June|R|Transaction rejected (do not attempt to send for authorisation) | 
|07 – July|E|Unknown error performing 3-D Secure checks | 
|08 - August|E| Error due to timeout communicating with the Directory Server| 
|09 – September|E|Error due to corrupt response from the Directory Server.| 
|10 – October|I|Information only| 
|11 – November|U|Unknown authentication due to Cardholder not enrolled (error 13)| 
|12 - December|C|Frictionless not possible, challenge Cardholder| 

An expiry month of 12 will simulate the non frictionless flow and desired authentication status (threeDSAuthenticated) can be selected on the challenge dialog shown by the PIT Access Control Server.

When using an expiry month from the above table please use a suitable expiry year to ensure the date is sometime in the near future.

### Paypal Sandbox Accounts 

Please contact customer support to have your own PayPal test Merchant account created that connects to your own PayPal sandbox account, thus enabling you to view the transactions as they are sent to PayPal.

### Amazon Pay Sandbox Accounts 

Please contact customer support to have your own Amazon Pay test Merchant account created that connects to your own Amazon Pay sandbox account, thus enabling you to view the transactions as they are sent to Amazon Pay.

### Request Checking Only

Sometimes, you may wish to submit a request to the Gateway in order for it to be ‘validated only’ and not processed by the simulator or sent to the Acquirer. In these cases, the following flag can be used that will stop the processing after the integrity verification has been performed:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| checkOnly | No | Check the request for syntax and field value errors only. Do not attempt to submit the transaction for honouring by the Merchant’s financial institution.|

If the request is OK, then a responseCode is returned as 0 (Success); otherwise, the code that would have prevented the request from completing is returned.

Note: in these cases, the request is not stored by the Gateway and is not available within the Merchant Management System (MMS).

## Signature Calculation {#signatureCalculation} 

It is highly recommended that transactions are protected using message signing. The signing process offers a quick and simple way to ensure that the message came from an authorised source and has not been tampered with during transmission.

Signing, however, must be completed on your servers and never left for the Customer’s browser to complete in JavaScript, as this would mean revealing your secret signature code to anyone who viewed the JavaScript code in the browser.

Signatures are especially important when a transaction is sent from a browser’s payment form via the use of hidden form fields because the Customer can easily use tools built into their browser to modify these hidden fields and change items such as the amount they should be charged.

Care must be taken to ensure that fields are sorted before signing into ascending field name order according to their numeric ASCII value. Some languages natural sort routines do NOT use ASCII order by default and so need to be adjusted or alternative methods used.

Also, when signing requests with fields formatted as per the [format guide](overview#fieldFormats), only the root integration field is included in any sorting as the sub-fields are part of the value and should not have their order changed. The sub-fields must then be sent in the same order as they were hashed if added as hidden fields in HTML forms etc.
The section below gives a step-by-step example of how to sign a transaction, complete with coding examples using the PHP language.

### Example Signature Key 

```php
$key = 'DontTellAnyone'
```

### Example Transaction 

```php
$tran = array ( 
    'merchantID' => '100001',  //merchantID will be provided by the Handpoint support team
    'action' => 'SALE', //action could be SALE, VERIFY or PREAUTH 
    'type' => '1', //1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA)
    'currencyCode' => '826', //ISO 3-letter currency code. 826 -> GBP
    'countryCode' => '826', //ISO 3-letter country code. 826 -> United Kingdom
    'amount' => '2691', //Either major currency units includes a single decimal point such as ’10.99'. 
                      //Minor currency units contains no decimal points such as ‘1099
    'transactionUnique' => '55f025addd3c2', //Unique identifier for this transaction. This is an added security feature to combat transaction spoofing
    'orderRef' => 'Signature Test',  //Free format text field to store order details, reference numbers, etc. for the Merchant’s records.
    'cardNumber' => '4929 4212 3460 0821', //Card Number
    'cardExpiryDate' => '1213', ) //Card expiry date
```
:::tip
The transaction used for signature calculation must not include any 'signature' field as this will be added after signing when its value is known.
:::

#### Step 1 - Sort transaction values by their field name

Transaction fields must be in ascending field name order according to their numeric ASCII value.

```php
ksort($tran);
array ( 'action' => 'SALE', 'amount' => '2691', 'cardExpiryDate' => '1213', 'cardNumber' => '4929 4212 3460 0821', 'countryCode' => '826', 'currencyCode' => '826', 'merchantID' => '100001', 'orderRef' => 'Signature Test', 'transactionUnique' => '55f025addd3c2', 'type' => '1' )
```

#### Step 2 - Create url encoded string from sorted fields

Use RFC 1738 and the application/x-www-form-urlencoded media type, which implies that spaces are encoded as plus (+) signs.

```php
$str = http_build_query($tran, '', '&');

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1
```

#### Step 3 - Normalise all line endings in the url encoded string

Convert all CR NL, NL CR, CR character sequences to a single NL character.

```php
$str = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $str);

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1
```
#### Step 4 - Append your signature key to the normalised string

The signature key is appended to the normalised string with no separator characters.

```php
$str .= 'DontTellAnyone'

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1DontTellAnyone
```

#### Step 5 - Hash the string using the SHA-512 algorithm

The normalised string is hashed to a more compact value using the secure SHA-512 hashing algorithm.

```php
$signature = hash('SHA512', $str);

da0acd2c404945365d0e7ae74ad32d57c561e9b942f6bdb7e3dda49a08fcddf74fe6af6b23b8481b8dc8895c12fc21c72c69d60f137fdf574720363e33d94097
```

#### Step 6 - Add the signature to the transaction form or post data

The signature should be sent as part of the transaction in a field called 'signature'.

```php
<input type="hidden" name="signature" value="<?=$signature?>">
or
$tran['signature'] = $signature;
```

### Sample Code PHP

Example of calculating the signature in PHP:

```php

<?PHP 

//Merchant signature key
$key = '3obzOxdqw6e1u';


//Request Information
$tran = array (
'merchantID' => '100001',  //merchantID will be provided by the Handpoint support team
    'action' => 'SALE', //action could be SALE, VERIFY or PREAUTH 
    'type' => '1', //1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA)
    'currencyCode' => '826', //ISO 3-letter currency code. 826 -> GBP
    'countryCode' => '826', //ISO 3-letter country code. 826 -> United Kingdom
    'amount' => '2691', //Either major currency units includes a single decimal point such as ’10.99'. 
                      //Minor currency units contains no decimal points such as ‘1099
    'transactionUnique' => '55f025addd3c2', //Unique identifier for this transaction. This is an added security feature to combat transaction spoofing
    'orderRef' => 'Signature Test',  //Free format text field to store order details, reference numbers, etc. for the Merchant’s records.
    'cardNumber' => '4929 4212 3460 0821', //Card Number
    'cardExpiryDate' => '1213',
);
 

 ksort($tran);

 $str = http_build_query($tran, '', '&');

 $str = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $str);

 $str .= '3obzOxdqw6e1u';

 $signature = hash('SHA512', $str);

 //Prints the signature
 printf("Signature %s", $signature);
 ?>

 ```