---
sidebar_position: 6
---

# Annexes 

## Signature Calculation {#signatureCalculation} 

It is highly recommended that transactions are protected using message signing. The signing process offers a quick and simple way to ensure that the message came from an authorised source and has not been tampered with during transmission.

Signing, however, must be completed on your servers and never left for the Customer’s browser to complete in JavaScript, as this would mean revealing your secret signature code to anyone who viewed the JavaScript code in the browser.

Signatures are especially important when a transaction is sent from a browser’s payment form via the use of hidden form fields because the Customer can easily use tools built into their browser to modify these hidden fields and change items such as the amount they should be charged.

Care must be taken to ensure that fields are sorted before signing into ascending field name order according to their numeric ASCII value. Some languages natural sort routines do NOT use ASCII order by default and so need to be adjusted or alternative methods used.

Also, when signing requests with fields formatted as per the [format guide](overview#fieldFormats), only the root integration field is included in any sorting as the sub-fields are part of the value and should not have their order changed. The sub-fields must then be sent in the same order as they were hashed if added as hidden fields in HTML forms etc.
The section below gives a step-by-step example of how to sign a transaction, complete with coding examples using the PHP language.

### Example Signature Key: 

```php
$key = 'DontTellAnyone
```

### Example Transaction 

```php
$tran = array ( 
    'merchantID' => '100001', 
    'action' => 'SALE', 
    'type' => '1', 
    'currencyCode' => '826', 
    'countryCode' => '826', 
    'amount' => '2691', 
    'transactionUnique' => '55f025addd3c2', 
    'orderRef' => 'Signature Test', 
    'cardNumber' => '4929 4212 3460 0821',
    'cardExpiryDate' => '1213', )
```
:::tip
The transaction used for signature calculation must not include any 'signature' field as this will be added after signing when its value is known.
:::

### Step 1 - Sort transaction values by their field name

Transaction fields must be in ascending field name order according to their numeric ASCII value.

```php
ksort($tran);
array ( 'action' => 'SALE', 'amount' => '2691', 'cardExpiryDate' => '1213', 'cardNumber' => '4929 4212 3460 0821', 'countryCode' => '826', 'currencyCode' => '826', 'merchantID' => '100001', 'orderRef' => 'Signature Test', 'transactionUnique' => '55f025addd3c2', 'type' => '1' )
```

### Step 2 - Create url encoded string from sorted fields

Use RFC 1738 and the application/x-www-form-urlencoded media type, which implies that spaces are encoded as plus (+) signs.

```php
$str = http_build_query($tran, '', '&');

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1
```

### Step 3 - Normalise all line endings in the url encoded string

Convert all CR NL, NL CR, CR character sequences to a single NL character.

```php
$str = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $str);

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1
```
### Step 4 - Append your signature key to the normalised string

The signature key is appended to the normalised string with no separator characters.

```php
$str .= 'DontTellAnyone'

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1DontTellAnyone
```

### Step 5 - Hash the string using the SHA-512 algorithm

The normalised string is hashed to a more compact value using the secure SHA-512 hashing algorithm.

```php
$signature = hash('SHA512', $str);

da0acd2c404945365d0e7ae74ad32d57c561e9b942f6bdb7e3dda49a08fcddf74fe6af6b23b8481b8dc8895c12fc21c72c69d60f137fdf574720363e33d94097
```

### Step 6 - Add the signature to the transaction form or post data

The signature should be sent as part of the transaction in a field called 'signature'.

```php
<input type="hidden" name="signature" value="<?=$signature?>">
or
$tran['signature'] = $signature;
```