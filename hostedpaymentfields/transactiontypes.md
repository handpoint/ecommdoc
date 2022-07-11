---
sidebar_position: 2
---

# Transaction Types

All requests must specify what action they require the Gateway to perform, using the action request field. 

## SALE

This will create a new transaction and attempt to seek authorisation for a sale from the Acquirer. A successful authorisation will reserve the funds on the Cardholder’s account until the transaction is settled.

The `captureDelay` field can be used to state whether the transaction should be authorised only and settled at a later date. **For more details on delayed capture, refer to the [delayed capture guide](annexes#captureDelay).

## VERIFY 
This will create a new transaction and attempt to verify that the card account exists with the Acquirer. The transaction will result in no transfer of funds and no hold on any funds on the Cardholder’s account. It cannot be captured and will not be settled. The transaction `amount` must always be zero.

This transaction type is the preferred method for validating that the card account exists and is in good standing; however, it cannot be used to validate that it has sufficient funds.

## PREAUTH
This will create a new transaction and attempt to seek authorisation for a sale from the Acquirer. If authorisation is approved, then it is immediately voided (where possible) so that no funds are reserved on the Cardholder’s account. The transaction will result in no transfer of funds. It cannot be captured and will not be settled.

This transaction type can be used to check whether funds are available and that the account is valid. However, due to the problem highlighted below, it is recommended that Merchants use the VERIFY action when supported by their Acquirer.

:::warning
If the transaction is to be completed then a new authorisation must be sought using the SALE action. If the PREAUTH authorisation could not be successfully voided, then this will result in the funds’ being authorised twice effectively putting two holds on the amount on the Cardholder’s account and thus requiring twice the amount to be available in the Cardholder’s account. It is therefore recommended only to PREAUTH small amounts, such as £1.00 to check mainly account validity.
:::

## REFUND_SALE

This will create a new transaction and attempt to seek authorisation for a refund of a previous SALE from the Acquirer. The transaction will then be captured and settled if and when appropriate. It can only be performed on transactions that have been successfully settled. Up until that point, a CANCEL or partial CAPTURE can be used, to refund or partially refund the original SALE transaction. The previous SALE transaction should be specified using the `xref` field. This may take up to 180 days from the date of the original sale, however different Card Schemes and Acquirers may set shorter time periods.

Partial refunds are allowed by specifying the amount to refund. Any amount must not be greater than the original received amount minus any already refunded amount. Multiple partial refunds may be made while there is still a portion of the originally received amount un-refunded.

The `captureDelay` field can be used to state whether the transaction should be authorised only and settled at a later date. **For more details on delayed capture, refer to the [delayed capture guide](annexes#captureDelay).

## REFUND

This will create a new transaction and attempt to seek authorisation for a refund from the Acquirer. The transaction will then be captured and settled if and when appropriate. This is an independent refund and need not be related to any previous SALE. The amount is therefore not limited by any original received amount.

The `captureDelay` field can be used to state whether the transaction should be authorised only and settled at a later date. **For more details on delayed capture, refer to the [delayed capture guide](annexes#captureDelay).

## CAPTURE

This will capture an existing transaction, identified using the `xref` request field, making it available for settlement at the next available opportunity. It can only be performed on transactions that have been authorised but not yet captured. An `amount` to capture may be specified but must not exceed the original amount authorised. This may take up to 30 days from the date of authorisation, however different Card Schemes and Acquirers may set shorter time periods.

The original transaction must have been submitted with a captureDelay value that prevented immediate capture and settlement leaving the transaction in an authorised but un-captured state. **For more details on delayed capture, refer to the [delayed capture guide](annexes#captureDelay).

## CANCEL 

This will cancel an existing transaction, identified using the `xref` request field, preventing it from being settled. It can only be performed on transactions, which have been authorised but not yet settled, and it is not reversible. Depending on the Acquirer it may not reverse the authorisation and release any reserved funds on the Cardholder’s account. In such cases authorisation will be left to expire as normal, releasing the reserved funds. This may take up to 30 days from the date of authorisation, however different Card Schemes and Acquirers may set shorter time periods.

## QUERY 

This will query an existing transaction, identified using the `xref` request field, returning the original response. This is a simple transaction lookup action.

## Transaction Request 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| merchantID | <span class="badge badge--primary">Yes</span> | Your Gateway Merchant Account ID. |
| merchantPwd | No | Any password used for an added security layer  |
| signature | <span class="badge badge--primary">Yes</span> | Hash used to sign this request. See [signature calculation](annexes#signatureCalculation) for information on how to create the hash. A signature maybe mandatory on some Merchant Accounts and requests.|
| action | <span class="badge badge--primary">Yes</span> | Possible values are: PREAUTH, VERIFY, SALE, REFUND, REFUND_SALE.<br></br><br></br> If a REFUND_SALE action is used, then the request must not attempt to change the payment details, or it will fail with a responseCode of 65542 (REQUEST MISMATCH) because the refund must be made to the original card.|
| amount  | <span class="badge badge--primary">Yes</span> | The amount of the transaction. Either major currency units by providing a value that includes a single decimal point such as ’10.99’; or in minor currency units by providing a value that contains no decimal points such as ‘1099’. <br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction.|
| Type  | <span class="badge badge--primary">Yes</span> | The type of transaction. Possible values are: <br></br> 1 – [E-commerce (ECOM)](annexes#ecommerce)<br></br> 2 -  [Mail Order/Telephone Order (MOTO)](annexes#moto)<br></br> 9 – [Continuous Authority (CA)](annexes#continuousAuthority) <br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction.|
| countryCode | <span class="badge badge--primary">Yes</span> | Merchant's location. Either the ISO-3166-1 2-letter, 3-letter or 3-digit code. <br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction. |
| currencyCode | <span class="badge badge--primary">Yes</span> | Transaction currency. Either the ISO-4217 3-letter or 3-digit code.<br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction. |
| paymentMethod | No | The payment method required. For card payments either omit this field or use the value `card`.|
| cardNumber | No | The primary account number (PAN) as printed on the front of the payment card. Digits and spaces only. <br></br><br></br>**Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction.|
| cardExpiryMonth | No | Payment card’s expiry month from 1 to 12.<br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction.|
| cardExpiryYear | No | Payment card’s expiry year from 00 to 99. <br></br><br></br>**Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction.|
| cardExpiryDate | No | Payment card’s expiry date in MMYY format as an alternative to sending a separate `cardExpiryMonth` and `cardExpiryYear`.<br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction.|
| cardCVV | No | Payment card’s security number. The 3-digit number printed on the signature strip.<br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction. |
| transactionUnique | No | You can supply a unique identifier for this transaction. This is an added security feature to combat transaction spoofing.<br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction.  |
| orderRef | No | Free format text field to store order details, reference numbers, etc. for the Merchant’s records.<br></br><br></br> **Optional** if an `xref` is provided as the value will be taken from the cross-referenced transaction. |
| orderDate | No | Optional date to record with the transaction. |
| captureDelay | No | Number of days to wait between authorisation of a payment and subsequent settlement. refer to the [delayed capture](annexes#captureDelay) guide.|
| xref | No | Reference to a previous transaction. refer to [payment tokenisation](annexes#paymentTokenisation) <br></br> <br></br>**Mandatory** for a REFUND_SALE request to specify the original SALE transaction. |
| redirectURL | No | URL to which the hosted form will redirect the Customer’s browser after the transaction has been completed. The URL must be fully qualified and include at least the scheme and host components. Refer to the [redirect URL](overview#redirectUrl) docs for details. |
| callbackURL | No | URL which will receive a copy of the transaction result by POST. The URL must be fully qualified and include at least the scheme and host components. Refer to the [callback URL](overview#callbackUrl) docs for details. |
| remoteAdress | No | IP address of client making the transaction. This should be provided where possible to aid fraud prevention. |
| rtAgreementType | No | Agreement between Merchant and Cardholder for the storage of, or subsequent use of, payment details. refer to the [credentials on file](annexes#credentialsOnFile) section. <br></br><br></br> **Mandatory** for recurring transactions or other transactions using stored credentials.|



## Transaction Response 

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
| amountRefunded | If refund | Total amount of original SALE that has so far been refunded. Returned when action is REFUND_SALE. |
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