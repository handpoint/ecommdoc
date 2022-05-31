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
$key = 'DontTellAnyone'
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

## Capture Delay {#captureDelay}

### Overview

Capture Delay enables you to specify a delay between the authorisation of a payment and its capture. This allows you time to verify the order and choose whether to fulfil it or cancel it. This can be very helpful in preventing chargebacks due to fraud.

When NOT using capture delay, payments are authorised and captured immediately - funds are automatically debited from the Customer’s credit or debit card at that time.

When using capture delay, the payment is authorised only at the time of payment - funds are reserved against the credit or debit card and will not be debited until the payment is captured. 

The Customer experience with capture delay is the same as when capture delay is not used. The Customer will not know whether you are using capture delay or not.

If you choose to use capture delay, you can use the captureDelay request field to specify the number of days for which capture is delayed, within a range of 0 to 30 days. Alternatively, you can use the value -1 or ‘never’ to specify that the Gateway should never automatically capture in which case you must manually capture.

The Gateway will automatically capture the transaction after any delay specified unless you manually cancel or capture the transaction, using either the Direct Integration or via the Merchant Management System (MMS).

Note that some cards require capture within 4 to 5 days - if payment is not automatically captured within that period, the transaction will expire, and the reserved funds will be released to the Customer.

### Why Use Capture Delay?

Capture delay allows you to accept online orders normally but allows you to cancel any transactions that you cannot or will not fulfil, thereby reducing the risks of chargeback. If you receive an order that appears to be fraudulent or that you cannot or do not wish to fulfil, you can simply cancel the transaction.

Note: Cancelling a transaction may not always reverse the authorisation and release the funds back to the Customer. This is dependent on the Acquirer and in these cases the authorisation will never be settled and will be left to expire releasing any reserved funds. The time taken for this varies between cards.

Some Acquirers do not support delayed capture, in which case the Hosted Integration will return a responseCode of 66358 (INVALID CAPTURE DELAY).

## Transaction Types 

The Gateway supports card not present (CNP) types of transactions, made where the Cardholder does not or cannot physically present the card for your visual examination at the time that an order is placed and payment effected.
The type of transaction required is specified using the `type` request field when performing a new payment transaction.

### E-Commerce (ECOM)

E-commerce transactions are supported by the Gateway by using a transaction type of 1. They are designed for you to accept payments via a website, such as a shopping cart payment. E-commerce transactions MUST use advance fraud detection, such as 3-D Secure.

### Mail Order/Telephone Order (MOTO)

Mail Order/Telephone Order transactions are supported by the Gateway by using a transaction type of 2. They are designed for you to build your own virtual terminal system to enter remote order details. MOTO transactions cannot use 3-D Secure as the cardholder is not able to perform the challenge.

Your Acquirer may need to enable MOTO capabilities on your main acquiring account, or they provide a separate acquiring account which will be available through its own Gateway Merchant Account.

### Continuous Authority (CA)

Continuous Authority transactions are supported by the Gateway by using a transaction type of 9. They are designed for you to make subscription transactions. 

The following transaction types are considered as Continuous Authority (CA) Payments :
- Instalment Payments: A transaction in a series of transactions that use a stored credential and that represent Consumer agreement for the merchant to initiate one or more future transactions over a period for a single purchase of goods or services. An example of such a transaction is a higher purchase repayment.

- Recurring Payments: A transaction in a series of transactions that use a stored credential and that are processed at fixed, regular intervals (not to exceed one year between transactions), representing Consumer agreement for the merchant to initiate future transactions for the purchase of goods or services provided at regular intervals. An example of such a transaction is a gym membership subscription.

Your Acquirer may need to enable Continuous Authority capabilities on your main acquiring account, or they provide a separate acquiring account which will be available through its own Gateway Merchant Account.

The Gateway offers a means of automating the taking of regular CA transactions using Recurring Transaction Agreements (RTA) as detailed in section 12.