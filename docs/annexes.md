---
sidebar_position: 20
---

# Annexes 

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


### Sample Code PHP

Example of calculating the signature in PHP:

```php

<?PHP 

//Merchant signature key
$key = 'm3rch4nts1gn4tur3k3y';


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

### E-Commerce (ECOM) {#ecommerce}

E-commerce transactions are supported by the Gateway by using a transaction `type` of `1`. They are designed for you to accept payments via a website, such as a shopping cart payment. E-commerce transactions MUST use advance fraud detection, such as 3-D Secure V2.

### Mail Order/Telephone Order (MOTO){#moto}

Mail Order/Telephone Order transactions are supported by the Gateway by using a transaction `type` of `2`. They are designed for you to build your own virtual terminal system to enter remote order details. MOTO transactions cannot use 3-D Secure as the cardholder is not able to perform the challenge.

Your Acquirer may need to enable MOTO capabilities on your main acquiring account, or they provide a separate acquiring account which will be available through its own Gateway Merchant Account.

### Continuous Authority (CA) {#continuousAuthority}

Continuous Authority transactions are supported by the Gateway by using a transaction `type` of `9`. They are designed for you to make subscription transactions. 

The following transaction types are considered as Continuous Authority (CA) Payments :
- Instalment Payments: A transaction in a series of transactions that use a stored credential and that represent Consumer agreement for the merchant to initiate one or more future transactions over a period for a single purchase of goods or services. An example of such a transaction is a higher purchase repayment.

- Recurring Payments: A transaction in a series of transactions that use a stored credential and that are processed at fixed, regular intervals (not to exceed one year between transactions), representing Consumer agreement for the merchant to initiate future transactions for the purchase of goods or services provided at regular intervals. An example of such a transaction is a gym membership subscription.

Your Acquirer may need to enable Continuous Authority capabilities on your main acquiring account, or they provide a separate acquiring account which will be available through its own Gateway Merchant Account.

The Gateway offers a means of automating the taking of regular CA transactions using [Recurring Transaction Agreements (RTA)](#RTA)

## Recurring Transaction Agreements {#RTA}

### Background 

A Recurring Transaction Agreement (RTA) is used to request that the Gateway should perform repeat payments on your behalf, using pre-agreed amounts and schedules.

An RTA can be configured easily and quickly, using the Merchant Management System (MMS). An RTA can also be set up while performing the initial transaction request, by including specific integration request fields. The RTA is only set up in the transaction results in a successful payment authorisation.

The initial transaction should be either SALE or VERIFY transaction and the `rtAgreementType` field should be provided to indicate whether the transactions are part of a recurring or instalment.

Merchants who use this system to implement billing or subscription type payments must use recurring or instalment type Continuous Authority (CA) transactions to comply with Card Payment Scheme practices. Your Acquirer may refuse to accept the recurring transactions if they are not subject to an agreement between yourself and your Customer.
The maximum period between recurring transactions is 13 months, however individual Acquirers may impose a shorter period.

### Scheduling 

There are two different types of scheduling available when requesting the Gateway to take recurring transactions automatically on the Merchant’s behalf. In addition, a start date can be provided to allow for a recurring subscription with an initial free trial period.

#### Fixed Scheduling 

Fixed scheduling causes the subsequent transaction to be taken at fixed intervals of time and for fixed amounts. A different initial date and amount or final date and amount can be provided for use when the agreed payment term or amount doesn’t exactly divide by the fixed time intervals.

Fixed scheduling is specified by providing an `rtScheduleType` field with a value of ‘fixed’ and providing the `rtCycleDuration`, `rtCycleAmount` and `rtCycleCount` fields to define the interval at which transactions should be taken and the number of transactions to take.

An `rtCycleCount` field value of 0 can be provided to indicate that transactions should be taken ad-infinitum until the RTA is stopped.

#### Variable Scheduling {#variableScheduling}

Variable scheduling causes the subsequent transaction to be taken on prespecified dates and for prespecified amounts.

Variable scheduling is specified by providing an `rtScheduleType` field with a value of ‘variable’ and providing the `rtSchedule` field with a value containing an array of one or more schedule records.

Each schedule record must contain the following fields:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| date | <span class="badge badge--primary">Yes</span> | Date on which to take the payment. |
| amount | <span class="badge badge--primary">Yes</span> | Amount to take on provided date. |

The schedule records should be passed in a sequential array of records, either as nested records or serialised records. The record field names are case sensitive.

### Request Fields  

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| rtName | No | Free format short name for the agreement. |
| rtDescription | No | Free format longer description for the agreement. |
| rtPolicyRef | No | Merchant Policy Reference Number (MPRN). |
| rtAgreementType | No| Recurring transaction agreement type. Indicates the type of Continuous Payment Authority or Repeat Billing agreement made with the Cardholder. Possible values are: <br></br> **recurring** – recurring type CPA agreed. <br></br>  **instalment** – instalment type CPA agreed. |
| rtMerchantID | No | Merchant Account ID to use for the recurring transactions (defaults to `merchantID`). |
| rtStartDate | No | Start date of agreement (defaults to date received). |
| rtScheduleType | No | Schedule type. Possible values are: <br></br> **fixed** – fixed interval schedule (default). <br></br> **variable** – variable interval schedule. <br></br> For use with variable schedules only. |
| rtSchedule | <span class="badge badge--primary">Yes</span> | Nested array or serialised string containing payment schedule information as described in [variable Scheduling](#variableScheduling) |
| rtInitialDate | No | Date of initial payment (defaults to `rtStartDate`).<br></br> For use with fixed schedules only.|
| rtInitialAmount | No | Amount of initial payment (defaults to `rtCycleAmount`).<br></br> For use with fixed schedules only.|
| rtFinalDate | No | Date of final payment.<br></br> For use with fixed schedules only. |
| rtFinalAmount | No | Amount of final payment (defaults to `rtCycleAmount`).<br></br> For use with fixed schedules only. |
| rtCycleAmount | No | Amount per cycle (defaults to `amount`).<br></br> For use with fixed schedules only. |
| rtCycleDuration | <span class="badge badge--primary">Yes</span> | Length of each cycle in rtCycleDurationUnit units.<br></br> For use with fixed schedules only.  |
| rtCycleDurationUnit | <span class="badge badge--primary">Yes</span> | Cycle duration unit. One of: day, week, month or year.<br></br> For use with fixed schedules only.  |
| rtCycleCount | <span class="badge badge--primary">Yes</span> | Number of cycles to repeat (zero to repeat forever).<br></br> For use with fixed schedules only.  |
| rtMerchantData | No| Free format Merchant data field. |
| rtCloneFields | No | Fields to clone from one recurring transaction to the next. see [Transaction Cloning)](#transactionCloning) |

### Response Fields 

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| rtID | Always | Recurring Transaction Agreement ID. |
| rtResponseCode | Always | Recurring Transaction Agreement ID. |
| rtResponseMessage | Always | Description of above response code. |

## Transaction Cloning {#transactionCloning}

## Payment Tokenisation {#paymentTokenisation}

## Response Codes {#responseCodes}

## AVS / CV2 Check Response Codes {#AvsResponseCodes}

## Transaction States {#transactionStates}

## Card Identification {#cardIdentification}

## Device Information Fields {#deviceInformationFields}

## SCA Using 3-D Secure {#scaUsing3dSecure}

## Exemptions to Strong Customer Authentication {#scaExemptions}

## 3-D Secure Authentication Data {#3dSecureAuthenticationData}

## Merchant Request Fields {#merchantRequestFields}

## Card Identification {#cardIdentification}

## Test Amounts

Transaction `amount` can be used to trigger different authorisation and settlement outcomes as follows:

| Min. Amount      | Max. Amount | Authorisation response | Settlement outcome | 
| ----------- | ----------- | ----------- | ----------- |
| 100 (1.00) | 2499 (24.99) | (0) AUTH CODE: XXXXXX | ACCEPTED |
| 2500 (25.00) | 4999 (49.99) | (0) AUTH CODE: XXXXXX | REJECTED |
| 5000 (50.00) | 7499 (74.99) | (1) CARD REFERRED <br/> (0) AUTH CODE: XXXXXX | ACCEPTED |
| 7500 (75.00) | 9999 (99.99) | (1) CARD REFERRED  <br/> (0) AUTH CODE: XXXXXX | REJECTED |
| 10000 (100.00) | 14999 (149.99) | (5) CARD DECLINED | N/A |
| 15000 (150.00) | 19999 (199.99) | (4) CARD DECLINED – KEEP CARD | N/A |
| 20000 (200.00) | 24999 (249.99) | (65) CARD DECLINED - SCA REQUIRED <br/> (0) AUTH CODE: XXXXXX | ACCEPTED |
| 25000 (250.00)| 29999 (299.99) | (65) CARD DECLINED – SCA REQUIRED <br/> (5) CARD DECLINED | N/A |


Any other amount will return a responseCode of **66311** (Invalid Test Amount).