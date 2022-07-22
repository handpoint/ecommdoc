---
sidebar_position: 3
---

# Transaction Types

All requests must specify what action they require the Gateway to perform, using the action request field. 

## SALE

This will create a new transaction and attempt to seek authorisation for a sale from the Acquirer. A successful authorisation will reserve the funds on the Cardholder’s account until the transaction is settled.

The `captureDelay` field can be used to state whether the transaction should be authorised only and settled at a later date. **For more details on delayed capture, refer to the [delayed capture guide](annexes#captureDelay).

Take a look at the [SALE](samplecode#using-lightbox-modal) example in our Sample Code.

## VERIFY 
This will create a new transaction and attempt to verify that the card account exists with the Acquirer. The transaction will result in no transfer of funds and no hold on any funds on the Cardholder’s account. It cannot be captured and will not be settled. The transaction `amount` must always be zero.

This transaction type is the preferred method for validating that the card account exists and is in good standing; however, it cannot be used to validate that it has sufficient funds.

Take a look at the [VERIFY](samplecode#verify) example in our Sample Code.

## PREAUTH
This will create a new transaction and attempt to seek authorisation for a sale from the Acquirer. If authorisation is approved, then it is immediately voided (where possible) so that no funds are reserved on the Cardholder’s account. The transaction will result in no transfer of funds. It cannot be captured and will not be settled.

This transaction type can be used to check whether funds are available and that the account is valid. However, due to the problem highlighted below, it is recommended that Merchants use the VERIFY action when supported by their Acquirer.

Take a look at the [PREAUTH](samplecode#preauth) example in our Sample Code.


:::warning
If the transaction is to be completed then a new authorisation must be sought using the SALE action. If the PREAUTH authorisation could not be successfully voided, then this will result in the funds’ being authorised twice effectively putting two holds on the amount on the Cardholder’s account and thus requiring twice the amount to be available in the Cardholder’s account. It is therefore recommended only to PREAUTH small amounts, such as £1.00 to check mainly account validity.
:::

## Transaction Request {#transactionRequest}

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| merchantID | <span class="badge badge--primary">Yes</span> | Your Gateway Merchant Account ID. |
| merchantPwd | No | Any password used for an added security layer.  |
| signature | <span class="badge badge--primary">Yes</span> | Hash used to sign this request. See [signature calculation](samplecode#signatureCalculation) for information on how to create the hash. A signature maybe mandatory on some Merchant Accounts and requests.|
| action | <span class="badge badge--primary">Yes</span> | Possible values are: PREAUTH, VERIFY, SALE|
| amount  | <span class="badge badge--primary">Yes</span> | The amount of the transaction. Either major currency units by providing a value that includes a single decimal point such as ’10.99’; or in minor currency units by providing a value that contains no decimal points such as ‘1099’. <br></br><br></br>**Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction.|
| Type  | <span class="badge badge--primary">Yes</span> | The type of transaction. Possible values are: <br></br> 1 – [E-commerce (ECOM)](annexes#ecommerce)<br></br> 2 -  [Mail Order/Telephone Order (MOTO)](annexes#moto)<br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction.|
| countryCode | <span class="badge badge--primary">Yes</span> | Merchant's location. Either the ISO-3166-1 2-letter, 3-letter or 3-digit code. <br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction. |
| currencyCode | <span class="badge badge--primary">Yes</span> | Transaction currency. Either the ISO-4217 3-letter or 3-digit code.<br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction. |
| redirectURL | <span class="badge badge--primary">Yes</span> | URL to which the hosted form will redirect the Customer’s browser after the transaction has been completed. The URL must be fully qualified and include at least the scheme and host components. Refer to the [redirect URL](overview#redirectUrl) docs for details. |
| paymentMethod | No | The payment method required. For card payments either omit this field or use the value `card`. |
| cardNumber | No | The primary account number (PAN) as printed on the front of the payment card. Digits and spaces only. <br></br><br></br> **Optional**:<br></br> - if provided it will be used to initialise the corresponding hosted payment page input field.<br></br> - if an `xref` is provided as the value will be taken from the cross-referenced transaction. |
| cardExpiryMonth | No | Payment card’s expiry month from 1 to 12. <br></br><br></br> **Optional**:<br></br>- if provided it will be used to initialise the corresponding hosted payment page input field.<br></br> - if an `xref` is provided as the value will be taken from the cross-referenced transaction.|
| cardExpiryYear | No | Payment card’s expiry year from 00 to 99. <br></br><br></br> **Optional**:<br></br>- if provided it will be used to initialise the corresponding hosted payment page input field.<br></br>- if an `xref` is provided as the value will be taken from the cross-referenced transaction.|
| cardExpiryDate | No | Payment card’s expiry date in MMYY format as an alternative to sending a separate `cardExpiryMonth` and `cardExpiryYear`. <br></br><br></br>**Optional**:<br></br>- if provided it will be used to initialise the corresponding hosted payment page input field.<br></br>- if an `xref` is provided as the value will be taken from the cross-referenced transaction.|
| cardCVV | No | Payment card’s security number. The 3-digit number printed on the signature strip. <br></br><br></br>**Optional**:<br></br>- if provided it will be used to initialise the corresponding hosted payment page input field.<br></br>- if an `xref` is provided as the value will be taken from the cross-referenced transaction. |
| transactionUnique | No | You can supply a unique identifier for this transaction. This is an added security feature to combat transaction spoofing.<br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction.  |
| orderRef | No | Free format text field to store order details, reference numbers, etc. for the Merchant’s records.<br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction. |
| orderDate | No | Optional date to record with the transaction. |
| captureDelay | No | Number of days to wait between authorisation of a payment and subsequent settlement. refer to the [delayed capture](annexes#captureDelay) guide.|
| xref | No | Reference to a previous transaction. refer to [payment tokenisation](annexes#paymentTokenisation). |
| callbackURL | No | URL which will receive a copy of the transaction result by POST. The URL must be fully qualified and include at least the scheme and host components. Refer to the [callback URL](overview#callbackUrl) docs for details. |


## Transaction Response {#transactionResponse}

The response will contain all the fields sent in the request (minus any `cardNumber` and `cardCVV`) plus the following:

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| responseCode | Always | A numeric code providing the specific outcome. Common values are:<br></br>  0 - Successful / authorised transaction. <br></br> 1 - Card referred – Refer to card issuer.<br></br>  2 - Card referred – Special condition. <br></br> 4 - Card declined – Keep card. <br></br> 5 - Card declined.<br></br>  Check `responseMessage` for more details of any error that occurred. Refer to [Response Codes](annexes#responseCodes) for details. |
| responseStatus | Always | A numeric code providing the outcome category. Possible values are:<br></br> 0 – Authorisation Approved / No reason to decline <br></br> 1 – Authorisation Declined. <br></br> 2 – Authorisation Error / Transaction malformed. |
| responseMessage | Always | Message received from the Acquiring bank, or any error message. |
| transactionID | Always | A unique ID assigned by the Gateway.|
| xref | Always | You may store the cross reference for repeat transactions. Refer to [payment tokenisation](annexes#paymentTokenisation). |
| state | Always |  [Transaction state](annexes#transactionStates). |
| timestamp | Always | Time the transaction was created or last modified. |
| transactionUnique | If supplied | Any value supplied in the initial request. |
| authorisationCode | On success | Authorisation code received from Acquirer. |
| referralPhone | If provided | Telephone number supplied by Acquirer to phone for voice authorisation when provided.|
| amountReceived | On success | Amount the Acquirer authorised. This should always be the full `amount` requested. |
| orderRef | If supplied | Any value supplied in the initial request. |
| cardNumberMask | Always | Card number masked for Merchant storage.|
| cardTypeCode | Always | Code identifying the type of card used. Refer to the [Card Identification](annexes#cardIdentification) guide. |
| cardType | Always | Description of the type of card used. Refer to the [Card Identification](annexes#cardIdentification) guide. |
| cardSchemeCode | Always | Code identifying the Card Scheme used. Refer to the [Card Identification](annexes#cardIdentification) guide.  |
| cardScheme | Always | Description of the Card Scheme used. Refer to the [Card Identification](annexes#cardIdentification) guide. |
| cardIssuer | Always | Card Issuer name (when known). |
| cardIssuerCountry | Always | Card issuing country’s name (when known). |
| cardIssuerCountryCode | Always | Card issuing country’s ISO-3166 2-letter code (when known). |

Undocumented fields may be returned at the Gateways discretion but should not be relied upon.
The acquirerResponseXXXX fields are dependent on the Acquirer in use and are supplied for additional information only.
The response is also POSTed to any URL provided by optional callbackURL.