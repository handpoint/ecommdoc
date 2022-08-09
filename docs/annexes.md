---
sidebar_position: 9 
---

# Annexes 

## Merchant Account Mapping {#merchantAccountMapping}

Merchant Accounts can be grouped together so that if a transaction is sent to an account that doesn't support either the requested card type or currency, then it can be automatically routed to another account in the same group that does support them.

For example, you can group a Merchant Account that only supports American Express cards with a Merchant Account that only supports Visa cards. Then, if a request using an American Express card is sent to the Visa only Merchant Account, the Gateway will automatically route it to the American Express Merchant Account.

This prevents you from needing to know the card type in advance in order to send the request to the correct Merchant Account. This is important when using the Hosted integration, because you don’t know the card type at the time you send the request.

It is usual for you to have one master account to which you direct all requests and then group all your accounts together.

Any Gateway routing of the transaction can be seen from the following additional response fields:

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| requestMerchantID | Always | ID of Merchant Account request was sent to (usually same as merchantID).|
| processMerchantID | Always | ID of Merchant Account request was processed by.|

## Velocity Control System (VCS)

The Gateway allows you to configure velocity controls using the Merchant Management System (MMS). These can be used to email you declined transactions automatically, where they exceed these controls.

For example, you can set up a control that stops a certain card number from being used more than twice in the space of a few minutes.

If one or more of these controls are broken by a transaction, then the following response fields will 
show the problem.
If a transaction is declined through breach of one or more of these rules, then a `responseCode` of 5 (VCS DECLINE) will be returned.

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| vcsResponseCode | Always | VCS error code. Normally 5.|
| vcsResponseMessage | Always | Description of above response code or list of rules broken by this transaction.|

## Duplicate Transaction Checking

Duplicate transaction checking prevents transaction requests from accidentally processing more than once. This can happen if a Customer refreshes your checkout page or clicks a button that issues a new transaction request. While duplicate checking can help prevent repeat transactions from going through, we recommend talking with your developers to see whether changes can be made to your form to reduce the likelihood of this occurring (eg disabling the Submit button after it has been clicked).

To help prevent duplicate transactions, each transaction can specify a time window during which previous transactions will be checked to see whether they could be possible duplicates.

This time window is specified using the `duplicateDelay` field. The value for this field can range from 0 to 9999 seconds (approx. 2 ¾ hours).

If the transaction request does not include the `duplicateDelay` field or specifies a value of zero, then a default delay of 300 seconds (5 minutes) is used.

The following fields are used in transaction comparison and must be the same for a transaction to be regarded as a duplicate:
- merchantID
- action
- type
- amount
- transactionUnique
- currencyCode
- xref (if provided in lieu of card details)
- cardNumber (may be specified indirectly via cross reference)

If a transaction is regarded as being a duplicate, then a responseCode of 65554 (REQUEST DUPLICATE) will be returned.

## Capture Delay {#captureDelay}

#### Overview

Capture Delay enables you to specify a delay between the authorisation of a payment and its capture. This allows you time to verify the order and choose whether to fulfil it or cancel it. This can be very helpful in preventing chargebacks due to fraud.

When NOT using capture delay, payments are authorised and captured immediately - funds are automatically debited from the Customer’s credit or debit card at that time.

When using capture delay, the payment is authorised only at the time of payment - funds are reserved against the credit or debit card and will not be debited until the payment is captured. 

The Customer experience with capture delay is the same as when capture delay is not used. The Customer will not know whether you are using capture delay or not.

If you choose to use capture delay, you can use the `captureDelay` request field to specify the number of days for which capture is delayed, within a range of 0 to 30 days. Alternatively, you can use the value -1 or ‘never’ to specify that the Gateway should never automatically capture in which case you must manually capture.

The Gateway will automatically capture the transaction after any delay specified unless you manually cancel or capture the transaction, using either the Direct Integration or via the Merchant Management System (MMS).

Note that some cards require capture within 4 to 5 days - if payment is not automatically captured within that period, the transaction will expire, and the reserved funds will be released to the Customer.

#### Why Use Capture Delay?

Capture delay allows you to accept online orders normally but allows you to cancel any transactions that you cannot or will not fulfil, thereby reducing the risks of chargeback. If you receive an order that appears to be fraudulent or that you cannot or do not wish to fulfil, you can simply cancel the transaction.

Note: Cancelling a transaction may not always reverse the authorisation and release the funds back to the Customer. This is dependent on the Acquirer and in these cases the authorisation will never be settled and will be left to expire releasing any reserved funds. The time taken for this varies between cards.

Some Acquirers do not support delayed capture, in which case the Hosted Integration will return a `responseCode` of 66358 (INVALID CAPTURE DELAY).

## Card Identification {#cardIdentification}

The Gateway will attempt to identify the type of each card number provided along with the associated Card Scheme (network) and, when available, the issuing institution and issuing country.

The Gateway primarily supports Mastercard, Visa and American Express branded cards. Some Acquirers may support JCB, Discover and Diners Club cards. Not all Acquirers support all types.

The card type and scheme codes will be returned in the `cardTypeCode` and `cardSchemeCode` response fields. When available, the issuer details will be returned in the `cardIssuer` and `cardIssuerCountryCode` response fields.

If the Gateway is unable to identify the card, then a code of ‘XX’ will be returned.

The following fields are returned by the Gateway to indicate a cards identity.

| Name | Description |
| ----------- | ----------- |
| cardTypeCode | Card type identification code, eg ‘VD’.|
|cardType |Card type name, eg, ‘Visa Debit’.|
| cardSchemeCode |Scheme identification code, eg ‘VC’.|
| cardScheme |Scheme name, eg ‘Visa’.|
| cardIssuer |Card Issuer’s name, eg ‘HSBC UK BANK PLC’.|
| cardIssuerCountryCode |Issuing country’s ISO-3166 2-letter code, eg ‘GB’.|
|cardIssuerCountry|Issuing country’s name, eg ‘United Kingdom’.|
|cardFlags|Bitmask of flags where each bit number indicates the following:<br></br><br></br>01 – debit (not credit) card.<br></br>02 – alternative debit (not credit) card. <br></br>03 – prepaid card.<br></br>09 – corporate card (not consumer) card.<br></br>12 – tokenised card (reserved for future use).<br></br>17 – ECOM use allowed.<br></br>18 – MOTO use allowed.<br></br>19 – EPOS use allowed.<br></br>20 – CA use allowed.<br></br>21 – LUHN conforming.<br></br>22 – 3-D Secure available (doesn’t indicate the card is enrolled).<br></br>23 – Contactless available.<br></br><br></br>An unset bit may mean that the information is unavailable and not necessarily that the information doesn’t apply to the card.|

The following is a list of primary card types supported by the Gateway.

| Card Code | Scheme Code | Card Type |
| ----------- | ----------- | ----------- |
|MC|MC|Mastercard Credit|
|MD|MC|Mastercard Debit|
|MA|MC|Mastercard International Maestro|
|MI|MC|Mastercard/Diners Club|
|MP|MC|Mastercard Purchasing|
|MU|MC|Mastercard Domestic Maestro (UK)|
|VC|VC|Visa Credit|
|VD|VC|Visa Debt|
|EL|VC|Visa Electron|
|VA|VC|Visa ATM|
|VP|VC|Visa Purchasing|
|AM|AM|American Express|
|JC|JC|JCB|
|DS|DS|Discover|
|DI|DI|Diners Club|
|DC|DI|Diners Club Carte Blanche|
|CU|CU|China UnionPay|
|CC|CU|China UnionPay Credit|
|CD|CU|China UnionPay Debit|

The following is a list of secondary card types recognised by the Gateway. These cards may be
returned in response to a card lookup, but they are either deprecated or most likely not supported
by any current Acquirer.

| Card Code | Scheme Code | Card Type |
| ----------- | ----------- | ----------- |
|CF|CF|Clydesdale Financial Services|
|BC|BC|BankCard|
|DK|DK|Dankort|
|DE|DI|Diners Club Enroute|
|FC|FC|FlexCache|
|LS|LS|Laser|
|SO|SO|Solo|
|ST|ST|Style|
|SW|SW|Switch|
|TP|TP|Tempo Payments|
|IP|IP|InstaPayment|

## Transaction Life Cycle

Each transaction received by the Gateway follows a pre-determined life cycle from receipt to completion. The stages in the life cycle are determined by the type of transaction and its success or failure at different stages in its life.

#### Authorise, Capture and Settlement {#authoriseCaptureSettlement}

The key stages in the transaction’s life cycle can be grouped into the Authorisation, Capture and Settlement stages as follows:

##### Authorisation

An authorisation places a hold on the transaction amount in the Cardholder’s issuing bank. No money actually changes hands yet. For example, let’s say that you are going to ship a physical product from your website. First, you authorise the amount of the transaction; then you ship the product. You only capture the transaction after the product is shipped.

##### Capture

A capture essentially marks a transaction as ready for settlement. As soon as the product is shipped, you can capture an amount up to the amount of the authorisation. Usually, the full amount is captured. An example of a situation in which the whole amount is not captured is where the Customer ordered multiple items and one of them is unavailable.
The Gateway will normally automatically capture all authorisations as soon as they are approved, freeing you up from having to do this.

However, it is usually more desirable to delay the capture either for a period of time or indefinitely. The `captureDelay` field can be used for this purpose and will allow you to state the number of days to delay any automatic capture or never to automatically capture. For more details on delayed capture, refer to the [delayed capture guide](#captureDelay)

##### Settlement 

Within 24 hours, the Gateway will instruct your Acquirer to settle the captured transaction. The Acquirer then transfers the funds between the Cardholder’s and your accounts.

#### Transaction States {#transactionStates}

At any time during the transaction’s life cycle, it is in one of a number of states as follows:

##### Received 
The transaction has been received by the Gateway and stored away. This is the first stage. The Gateway will examine the transaction and pass it on to the next stage, as appropriate.

##### Approved 

The transaction has been sent to the Acquirer for authorisation and the Acquirer has approved it and is holding the Cardholder’s funds.

This is an intermediate state and follows the received state.

##### Verified

The transaction has been sent to the Acquirer for verification and the Acquirer has confirmed that the account is valid.

This is a terminal state and follows the received state. The transaction will never be settled and no funds will ever be transferred.

##### Declined 
The transaction has been sent to the Acquirer for authorisation and the Acquirer declined it. The Acquirer will not usually give any reason for a decline and will not have held any funds.

The transaction has now completed its life cycle and no more processing will be done on it.

This is a terminal state and follows the received state. The transaction will never be settled and no funds will ever be transferred. The transaction `responseCode` will be 5 (Declined).

##### Referred 
The transaction has been sent to the Acquirer for authorisation and the Acquirer referred it for verbal approval.

You can choose not to seek verbal approval and treat these transactions the same as a normal ‘declined’ authorisation.

To seek verbal approval, you must phone the Acquirer and ask for an authorisation code. They will probably ask for more information about the transaction and might require you to gather other forms of identification from the Cardholder. If an authorisation code is provided, then a new transaction can be sent to the Gateway specifying the `xref` of this transaction and the received `authorisationCode`. This new request will not be sent for authorisation and will be in the ‘approved’ state ready for capture and settlement.

This is a terminal state and follows the received state. The transaction will never be settled and no funds will ever be transferred. The transaction `responseCode` will be 2 (Referred).

##### Reversed 
The transaction was sent to the Acquirer for authorisation and the Acquirer approved it. However, the transaction has been voided and the approval reversed. The Acquirer will have been asked to reverse any approval previously received, effectively cancelling the authorisation and returning any held funds back to the Cardholder.

The Gateway will reverse an authorisation if it declines the transaction post authorisation due to any AVS/CV2 checking. The PREAUTH action will also automatically reverse an authorisation before return.

This is a terminal state and follows the approved state. The transaction will never be settled and no funds will ever be transferred.

If the transaction was reversed due to AVS/CV2 checking, then the transaction `responseCode` will be 5 (AVS/CV2 Declined).

##### Captured 

The transaction has been captured and the Acquirer will be asked to capture the approved held funds when the settling process next runs. The settling process usually runs each evening but the Acquirer may take up to 3 days to transfer the funds.

The capture state can either be entered automatically if the transaction requested an immediate or delayed capture; or it can be manually requested by sending a CAPTURE request. You are free to change the amount to be captured to a value less than that initially approved by issuing one or more CAPTURE commands. When captured, there is no way to un-capture a transaction. If not explicitly cancelled, it will be sent for settlement at the next opportunity.

This is an intermediate state and follows the approved state.

##### Tendered 
The transaction has been sent to the Acquirer for settlement by the settling process and is awaiting confirmation that it has been accepted.

At this point, the transaction can no longer be cancelled or re-captured.

This is an intermediate state and follows the captured state.

##### Deferred 

The transaction could not be settled due to some temporary problem such as a communications loss. It will be attempted again the next time the settling process runs – usually first thing the next day.

This is an intermediate state and follows the tendered state. It will normally be accompanied by a transaction response that indicates why the settlement process could not settle the transaction.

##### Accepted 
The transaction has been accepted for settlement by the Acquirer. The held funds will be transferred between the Merchant and Cardholder in due course.

The transaction has now completed its life cycle and no more processing will be done on it, unless it is subject to a rejection while the Acquirer is settling it.

This is a terminal state and follows the tendered state.

##### Rejected

The transaction has been rejected for settlement by the Acquirer. The held funds will not be transferred between the Merchant and Cardholder.

Only a few Acquirers inform the Gateway that they have rejected a transaction: they usually inform you directly. Therefore, a transaction may show as accepted even if was ultimately rejected or it may change from accepted to rejected if the Acquirer does inform the Gateway.

The transaction has now completed its life cycle and no more processing will be done on it.

This is a terminal state and follows the tendered or accepted states. The transaction response will normally indicate the reason the transaction was rejected.

##### Canceled 

The transaction has been cancelled by the Merchant by sending a cancellation request to the Gateway either using the CANCEL action or via the Merchant Management System (MMS).

You can cancel any transaction that is not in a terminal state or in the ‘tendered’ state. When cancelled, any further processing that would have normally taken place will be halted. Cancelling a transaction may or may not release any funds held on the Cardholder’s card, depending on support from the Acquirer and Card Scheme. Note: the state is spelt American style, with a single ‘l’ as canceled.

This is a terminal state and follows any non-terminal state that occurs before the transaction reaches the tendered state.

##### Finished 

The transaction has finished and reached the end of its lifespan but did not reach one of the other terminal states. Usually this indicates that a problem has occurred with the transaction that prevents it continuing with its normal life cycle.

This is a terminal state and can follow any other state. The transaction response will normally indicate the reason that the transaction failed.

## Transaction Cloning {#transactionCloning}

If a new transaction request is received with the Cross Reference (xref) of an existing transaction, then the values of certain fields in the existing transaction will be used to initialise the new transaction where new values have not been provided in the new request. This copying of fields from a base transaction is termed ‘transaction cloning’, and the copied-over value is termed the ‘cloned value’. To allow for easy addition of future fields, the fields are grouped into logical groupings and each group is given a name, given in brackets after the group title.

Certain groups of fields, such as address fields, can only be copied as a whole entity and any new value provided in the new request will prevent the whole group from being copied from the existing transaction. These fields are marked with an asterisk after the field name.

By default, the values of all the fields are copied from the existing transaction where appropriate. However, you can control exactly which fields are copied using the `cloneFields` field in the new request. The value of `cloneFields` should be a comma separated list of field names or group names that should be copied over. Alternatively, if you wish to specify a list of fields not to copy, then prefix the list with a single exclamation mark (!).

| Name | Mandatory | Description |
| ----------- | ----------- | ----------- |
|cloneFields|No|Comma separated list of field names or group names whose values should be cloned.|

**Examples**

To copy over only the value of `customerName` and any values for the fields in the `customerAddressFields` group:

`cloneFields=”customerName, customerAddressFields”`

To copy over the values of all supported fields apart from the value of `customerName` and `merchantName`:

`cloneFields=”!customerName,merchantName”`

#### Cloned Fields 

Transaction fields currently cloned are as follows:

Order Details Fields (`orderFields`)
    - type
    - countryCode
    - currencyCode
    - amount
    - grossAmount
    - netAmount
    - taxRate
    - taxAmount
    - taxReason
    - discountAmount
    - discountReason
    - handlingAmount
    - insuranceAmount
    - surchargeAmount

Order Reference Fields (`orderRefFields`)
    - transactionUnique
    - orderRef
    - orderDate

Card Fields (`cardFields`)
    - paymentMethod
    - paymentToken
    - cardToken
    - cardNumber
    - cardExpiryDate*
    - cardExpiryMonth*
    - cardExpiryYear*
    - cardStartDate*
    - cardStartMonth*
    - cardStartYear*
    - cardIssueNumber

Cardholder Fields (`cardholderFields`)
    - customerName
    - customerAddress
    - customerPostcode
    - customerEmail
    - customerPhone

Purchase Fields (`purchaseFields`)
    - items

Statement Narrative Fields (`narrativeFields`)
    - statementNarrative1
    - statementNarrative2

AVS/CV2 Fields (`avscv2Fields`)
    - avscv2Required
    - cv2CheckPref
    - addressCheckPref
    - postcodeCheckPref
    - customerAddress
    - customerPostcode

Risk Check Fields (`riskCheckFields`)
    - riskCheckRequired
    - riskCheckPref
    - riskCheckOptions

3-D Secure Fields (`threedsFields`) - 3-D Secure fields are only cloned if both the existing and new transaction support 3-D Secure.
    - threeDSRequired
    - threeDSPolicy
    - threeDSCheckPref
    - threeDSRedirectURL
    - threeDSOptions
    - scaExemption

 Merchant Email Notification Fields (`notifyFields`)
    - notifyEmailRequired
    - notifyEmail

Customer Receipt Fields (`cReceiptFields`)
    - customerReceiptsRequired
    - customerEmail

Merchant Information Fields (`merchantFields`)
    - merchantName
    - merchantCompany
    - merchantAddress*
    - merchantTown*
    - merchantCounty*
    - merchantPostcode*
    - merchantCountryCode*
    - merchantPhone
    - merchantMobile
    - merchantFax
    - merchantEmail
    - merchantWebsite
    - merchantData
    - merchantOrderRef
    - merchantCustomerRef
    - merchantTaxRef
    - merchantOriginalOrderRef
    - merchantCategoryCode
    - merchantAccountNo
    - merchantType

Customer Information Fields (`customerFields`)
    - customerName
    - customerCompany
    - customerAddress*
    - customerTown*
    - customerCounty*
    - customerPostcode*
    - customerCountryCode*
    - customerPhone
    - customerMobile
    - customerFax
    - customerEmail
    - customerDateOfBirth
    - customerOrderRef
    - customerMerchantRef
    - customerTaxRef

Supplier Information Fields (`supplierFields`)
    - supplierName
    - supplierCompany
    - supplierAddress*
    - supplierTown*
    - supplierCounty*
    - supplierPostcode*
    - supplierCountryCode*
    - supplierPhone
    - supplierMobile
    - supplierFax
    - supplierEmail
    - supplierOrderRef
    - supplierAccountNo

Receiver Information Fields (`receiverFields`)
    - receiverName
    - receiverCompany
    - receiverAddress*
    - receiverTown*
    - receiverCounty*
    - receiverPostcode*
    - receiverCountryCode*
    - receiverPhone
    - receiverMobile
    - receiverFax
    - receiverEmail
    - receiverAccountNo
    - receiverDateOfBirth

Delivery Information Fields (`deliveryFields`)
    - deliveryName
    - deliveryCompany
    - deliveryAddress*
    - deliveryTown*
    - deliveryCounty*
    - deliveryPostcode*
    - deliveryCountryCode*
    - deliveryPhone
    - deliveryMobile
    - deliveryFax
    - deliveryEmail

Shipping Information Fields (`shippingFields`)
    - shippingMethod
    - shippingTrackingRef
    - shippingAmount
    - shippingGrossAmount
    - shippingNetAmount
    - shippingTaxRate
    - shippingTaxAmount
    - shippingTaxReason
    - shippingDiscountAmount
    - shippingDiscountReason

MCC 6012 Additional Authorisation Data (mcc6012Fields)
    - receiverName
    - receiverPostcode
    - receiverAccountNo
    - receiverDateOfBirth

Payment Facilitator Data (`facilitatorFields`) - Payment facilitator fields are only cloned if the existing transaction uses the same merchantID as the new transaction.
    - subMerchantID
    - facilitatorID
    - facilitatorName
    - isoID

Surcharge Data (`surchargeFields`)
    - surchargeRequired
    - surchargeAmount
    - surchargeRules

Device Data (`deviceFields`)
    - deviceType
    - deviceChannel
    - deviceIdentity
    - deviceTimeZone
    - deviceCapabilities
    - deviceAcceptContent
    - deviceAcceptCharset
    - deviceAcceptEncoding
    - deviceAcceptLanguage
    - deviceScreenResolution
    - deviceOperatingSystem

Acquirer Data (`acquirerFields`)
    - acquirerOptions

#### Cloned Groups

To allow for easy future addition of new fields, the existing fields are grouped into logic groupings. Each group is given a name (as shown in brackets after the group title). It is recommended that this group name be used in any `cloneFields` value instead of listing all the fields separately.

##### Compound Groups
To help maintain transaction integrity, certain groups of fields, such as address fields, can only be copied as a whole entity and any new value provided in the new request will prevent the whole group from being copied from the existing transaction.

These compound fields are marked with an asterisk in the list of fields above and can be referred to in `cloneFields` as logical groups using the following group names; merchantAddressFields, customerAddressFields, deliveryAddressFields, supplierAddressFields and receiverAddressFields.

##### Line-Item Data 
Any line-item data (`items`) is copied over in its entirety and there is no way to merge the line item from an existing transaction with any sent in a new transaction.

##### Amount Consistency 
he Gateway does not validate that the various sub-amount fields, such as `netAmount`, `grossAmount`, all add up to the actual requested amount. Therefore, these fields are currently not treated as a compound group.

If a new amount value is passed that is different from the value in the existing transaction, then the following fields should also be passed so that they tally with the new amount.
- grossAmount
- netAmount
- taxRate
- discountAmount

## Response Codes {#responseCodes}

The Gateway will always issue a numeric `responseCode` to report the status of the transaction. These codes should be used rather than the `responseMessage` field to determine the outcome
of a transaction. Response codes are grouped; however, the groupings are for informational purposes only and not all codes in a group are used and some codes may exist for completeness or future use. A zero `responseCode` always indicates a successful outcome.

#### Authorisation Response Codes 

The Gateway uses a set of standard response codes to indicate the status of an authorisation request to the Acquirer. These response codes are based on the 2-character ISO 8583 response
codes. The full set of ISO 8583 codes used are given in the table below, however not all are applicable to transactions currently supported by the Gateway and therefore not used and documented for reference purposes only.

Some ISO-8583 codes are not numeric and therefore to ensure all Gateway response codes are numeric these codes are mapped to an equivalent numeric code greater than 99. This equivalent
numeric code is shown in the table below along with the original 2 letter code in brackets.

Not all ISO-8583 codes are applicable to the types of transactions currently available via the Gateway and therefore unapplicable codes, although documented, may not currently be returned.

If the authorising Acquirer does not return a suitable ISO 8583 code, then the Gateway will attempt to map the Acquirers response to a suitable code.

The original Acquirer authorisation response code and response message will always be returned in the `acquirerResponseCode` and `acquirerResponseMessage` fields. 
The original Acquirer authorisation response code may not be numeric and information on these codes will need to be requested from the Acquirer.

##### Acquirer Authorisation Response codes: 0 - 9999

| Code      | Description |
| ----------- | ----------- | 
|0|Successful approval/completion|
|1|Refer to card issuer|
|2|Refer to card issuer, special condition|
|3|Invalid merchant or service provider|
|4|Pickup card|
|5|Do not honor|
|6|Error|
|7|Pickup card, special condition (other than lost/stolen card)|
|8|Honor with identification|
|9|Request in progress|
|10|Approval for partial amount|
|11|Approved VIP|
|12|Invalid transaction|
|13|Invalid amount (currency conversion field overflow), or amount|
|14|Invalid card number/account number|
|15|No such issuer|
|16|Approved, Update Track 3|
|17|Customer cancellation|
|18|Customer dispute|
|19|Re-enter transaction|
|20|Invalid response/Acquirer error|
|21|No action taken (unable to back out prior transaction)|
|22|Suspected malfunction|
|23|Unacceptable transaction|
|24|File update impossible|
|25|Reference number cannot be found. Unable to locate record in fi|
|fr|om the inquiry|
|26|Duplicate reference number|
|27|Error in reference number|
|28|File is temporarily unavailable for update|
|29|File action failed/Contact acquirer|
|30|Format error|
|31|Bank not supported by Switch/Unknown acquirer account code|
|32|Complete partially|
|33|Pickup card (expired)|
|34|Pickup card (suspected fraud)|
|35|Pickup card (acceptor contact acquirer)|
|36|Pickup card (restricted card)|
|37|Pickup card (acceptor call acquirer security)|
|38|Pickup card (PIN tries exceeded)|
|39|No credit account|
|40|Function not supported|
|41|Pickup card (lost card)|
|42|No universal account|
|43|Pickup card (stolen card)|
|44|No investment account|
|45|Account closed|
|46|Identification required|
|47|Identification cross-check required|
|48|No from account|
|49|No to account|
|50|No account|
|51|Insufficient funds|
|52|No checking account|
|53|No savings account|
|54|Expired card|
|55|Incorrect PIN|
|56|Unknown card|
|57|Transaction not permitted to cardholder|
|58|Transaction not allowed at terminal|
|59|Suspected fraud|
|60|Contact acquirer|
|61|Exceeds withdrawal amount limit|
|62|Restricted card (for example, in Country Exclusion table)|
|63|Security violation|
|64|Amount higher than previous transaction|
|65|SCA Required (previously, Exceeds withdrawal limit)|
|66|Contact acquirer|
|67|Hard capture - ATM|
|68|Time out|
|69|Advice received too late|
|70|Contact card issuer|
|71|Message flow error|
|72|Authorization centre not available for 60 seconds.|
|73|Authorization centre not available for 300 seconds.|
|74|PIN entry necessary|
|75|Allowable number of PIN tries exceeded|
|76|Unable to locate previous message (no match on Retrieval Refere|
|77|Previous message located for a repeat or reversal, but repeat o|
|or|iginal message|
|78|Blocked, first used. The transaction is from a new cardholder,|
|79|Already reversed|
|80|Visa transactions: credit issuer unavailable. Private label and|
|81|PIN cryptographic error found (error found by VIC security modu|
|82|Negative CAM, dCVV, iCVV, or CVV results|
|83|STIP cannot approve|
|84|Pre-auth time too great|
|85|No reason to decline a request for account number verification,|
|ve|rification, or a credit voucher or merchandise return|
|86|Unable to verify PIN|
|87|Purchase amount only, no cash back allowed|
|88|Unable to authorise|
|89|Ineligible to receive|
|90|Cut-off in progress|
|91|Issuer unavailable or switch inoperative (STIP not applicable o|
|92|Destination cannot be found for routing|
|93|Transaction cannot be completed, violation of law|
|94|Duplicate transaction|
|95|Reconcile error|
|96|System malfunction|
|97|Security Breach|
|98|Date and time not plausible|
|99|Error in PAC encryption detected|
|497 (B1)| Surcharge amount not permitted on Visa cards (U.S. acquir|
|498 (B2)| Surcharge not supported|
|928 (N0)| Unable to authorise|
|931 (N3) |Cash service not available|
|932 (N4)| Cashback request exceeds issuer limit|
|933 (N5) |Resubmitted transaction over max days limit|
|935 (N7) |Decline for CVV2 failure|
|936 (N8)| Transaction amount greater than pre-authorised approved amount|
|1002 (P2)| Invalid biller information|
|1005 (P5)| PIN Change/Unblock request declined|
|1006 (P6)| Unsafe PIN|
|1037 (Q1) |Card Authentication failed|
|1072 (R0)| Stop Payment Order|
|1073 (R1)| Revocation of Authorization Order|
|1074 (R3) |Revocation of All Authorizations Order|
|1144 (T0)| Approval, keep first check|
|1145 (T1)| Check OK, no conversion|
|1146 (T2) |Invalid RTTN|
|1147 (T3)| Amount greater than limit|
|1148 (T4) |Unpaid items, failed NEG|
|1149 (T5)| Duplicate check number|
|1150 (T6)| MICR error|
|1151 (T7)| Too many checks|
|1298 (XA) |Forward to issuer|
|1301 (XD) |Forward to issuer|
|1363 (Z3)| Unable to go online|

#### Gateway Response Codes 

The Gateway uses a set of enhanced response codes to indicate if there is an issue with the transaction which prevented any authorisation response being received from the Acquirer. These
response codes start at 65536.

The responses are grouped into categories and the codes in the ‘missing’ and ‘invalid’ field categories are designed so that that invalid field code is exactly 256 greater than the
corresponding missing field code. For example, the code of a missing action field is 66055 and the corresponding code for an invalid action field is 66311 (66055 + 256).

##### General Error Codes

| Code      | Description |
| ----------- | ----------- | 
|65536|Transaction in progress. Contact customer support if this error occurs.|
|65537|A general error has occurred.|
|65538|Reserved for future use. Contact customer support if this error occurs.|
|65539|Invalid Credentials: merchantID is unknown or the signature doesn’t match.|
|65540|Permission denied: caused by sending a request from an unauthorised IP address.|
|65541|Action not allowed: action is not supported by the Acquirer or allowed for the transaction.|
|65542|Request Mismatch: fields sent while completing a request do not match initially requested values. Usually due to sending different card details to those used to authorise the transaction when completing a 3-D Secure transaction or performing a REFUND_SALE transaction.|
|65543|Request Ambiguous: request could be misinterpreted due to inclusion of mutually exclusive fields.|
|65544|Request Malformed: could not parse the request data.|
|65545|Suspended Merchant account.|
|65546|Currency not supported by Merchant.|
|65547|Request Ambiguous, both taxValue and discountValue provided when should be one only.|
|65548|Database error.|
|65549|Payment processor communications error.|
|65550|Payment processor error.|
|65551|Internal Gateway communications error.|
|65552|Internal Gateway error.|
|65553|Encryption error.|
|65554|Duplicate request.|
|65555|Settlement error.|
|65556|AVS/CV2 Checks are not supported for this card (or Acquirer).|
|65557|IP Blocked: Request is from a banned IP address.|
|65558|Primary IP blocked: Request is not from one of the primary IP addresses configured for this Merchant Account.|
|65559|Secondary IP blocked: Request is not from one of the secondary IP addresses configured for this Merchant Account.|
|65560|Reserved for future use. Contact customer support if this error occurs.|
|65561|Unsupported Card Type: Request is for a card type that is not supported on this Merchant Account.|
|65562|Unsupported Authorisation: External authorisation code authorisationCode has been supplied and this is not supported for the transaction or by the Acquirer.|
|65563|Request not supported: The Gateway or Acquirer does not support the request.|
|65564|Request expired: The request cannot be completed as the information is too old.|
|65565|Request retry: The request can be retried later.|
|65566|Test Card Used: A test card was used on a live Merchant Account.|
|65567|Unsupported card issuing country: Request is for a card issuing country that is not supported on this Merchant Account.|
|65568|Masterpass processing error.|
|65569|Masterpass not supported.|
|65570|Masterpass checkout failure.|
|65571|Masterpass checkout success.|
|65572|Masterpass checkout is required.|
|65573|Amounts error. Provided transaction amounts to not tally.|
|65574|Reserved for future use. Contact customer support if this error occurs.|
|65575|No data was found that match the selection criteria.|
|65576|Request cancelled.|

##### 3-D Secure Error Codes

| Code      | Description |
| ----------- | ----------- | 
|65792|3-D Secure processing in progress.|
|65793|3-D Secure processing error.|
|65794|3-D Secure processing is required. 3-D Secure ACS challenge must be displayed.|
|65795|3-D Secure processing is not required.|
|65796|3-D Secure processing is unavailable. Merchant account or Acquirer doesn’t support 3-D Secure.|
|65797|Error occurred during 3-D Secure enrolment check|
|65798|Reserved for future use.|
|65799|Reserved for future use.|
|65800|Error occurred during 3-D Secure authentication check|
|65801|Reserved for future use.|
|65802|3-D Secure authentication is required.|
|65803|3-D Secure authentication results do not meet the Merchant’s preferences.|
|65804|3-D Secure authentication was successful.|

##### Remote Checkout Processing Error Codes

| Code      | Description |
| ----------- | ----------- | 
|65824|Remote checkout processing in progress.|
|65825|Remote checkout processing error.|
|65826|Remote checkout processing is required. Remote checkout must be displayed.|
|65827|Remote checkout processing is not required.|
|65828|Remote checkout processing is not supported.|
|65829|Remote checkout was successful.|
|65830|Remote checkout failed.|

##### Risk Check Processing Error Codes

| Code      | Description |
| ----------- | ----------- | 
|65856|Risk check processing in progress.|
|65857|Risk check processing error.|
|65858|Risk check processing required.|
|65859|Risk check processing is not required.|
|65860|Risk check processing is not supported.|
|65861|Risk check processor communication error.|
|65862|Risk check results do not meet the Merchant’s preferences.|

##### Missing Request Field Error Codes

| Code      | Description |
| ----------- | ----------- | 
|66048|Missing request. No data posted to integration URL.|
|66049|Missing merchantID field.|
|66050|Missing merchantPwd field.|
|66051|Reserved for internal use. Contact customer support if this error occurs.|
|66052|Reserved for internal use. Contact customer support if this error occurs.|
|66053|Reserved for internal use. Contact customer support if this error occurs.|
|66054|Reserved for internal use. Contact customer support if this error occurs.|
|66055|Missing action field.|
|66056|Missing amount field.|
|66057|Missing currencyCode field.|
|66058|Missing cardNumber field.|
|66059|Missing cardExpiryMonth field.|
|66060|Missing cardExpiryYear field.|
|66061|Missing cardStartMonth field. (Legacy field)|
|66062|Missing cardStartYear field. (Legacy field)|
|66063|Missing cardIssueNumber field. (Legacy field)|
|66064|Missing cardCVV field.|
|66065|Missing customerName field.|
|66066|Missing customerAddress field.|
|66067|Missing customerPostcode field.|
|66068|Missing customerEmail field.|
|66069|Missing customerPhone field.|
|66070|Missing countryCode field.|
|66071|Missing transactionUnique field.|
|66072|Missing orderRef field.|
|66073|Missing remoteAddress field.|
|66074|Missing redirectURL field.|
|66075|Missing callbackURL field.|
|66076|Missing merchantData field.|
|66077|Reserved for internal use. Contact customer support if this error occurs.|
|66078|Missing duplicateDelay field.|
|66079|Missing itemQuantity field.|
|66080|Missing itemDescription field|
|66081|Missing itemAmount field.|
|66082|Missing taxAmount field.|
|66083|Missing discountAmount field.|
|66084|Missing discountReason field.|
|66085|Missing xref field.|
|66086|Missing type field.|
|66087|Missing signature field (field is required if message signing is enabled).|
|66088|Missing authorisationCode field.|
|66089|Missing transactionID field.|
|66090|Missing threeDSRequired field.|
|66091|Missing threeDSMD field.|
|66092|Missing threeDSPaRes field.|
|66093|Missing threeDSECI field.|
|66094|Missing threeDSCAVV field.|
|66095|Missing threeDSXID field.|
|66096|Missing threeDSEnrolled field.|
|66097|Missing threeDSAuthenticated field.|
|66098|Missing threeDSCheckPref field.|
|66099|Missing cv2CheckPref field.|
|66100|Missing addressCheckPref field.|
|66101|Missing postcodeCheckPref field.|
|66102|Missing captureDelay field.|
|66103|Missing orderDate field.|
|66104|Missing grossAmount field.|
|66105|Missing netAmount field.|
|66106|Missing taxRate field.|
|66107|Missing taxReason field.|
|66108|Missing surchargeRules field.|
|66109|Reserved for internal use. Contact customer support if this error occurs.|
|66110|Missing statementNarrative1 field.|
|66111|Missing statementNarrative2 field.|
|66112|Missing merchantName field.|
|66113|Missing merchantCompany field.|
|66114|Missing merchantAddress field.|
|66115|Missing merchantTown field.|
|66116|Missing merchantPostcode field.|
|66117|Missing merchantCountryCode field.|
|66118|Missing merchantPhone field.|
|66119|Missing merchantMobile field.|
|66120|Missing merchantEmail field.|
|66121|Missing merchantWebsite field.|
|66122|Missing merchantOrderRef field.|
|66123|Missing merchantCustomerRef field.|
|66124|Reserved for future use. Contact customer support if this error occurs.|
|66125|Missing merchantType field.|
|66126|Reserved for future use. Contact customer support if this error occurs.|
|66127|Missing merchantCategoryCode field.|
|66128|Missing supplierName field.|
|66129|Missing supplierCompany field.|
|66130|Missing supplierAddress field.|
|66131|Missing supplierTown field.|
|66132|Missing supplierPostcode field.|
|66133|Missing supplierCountryCode field.|
|66134|Missing supplierPhone field.|
|66135|Missing supplierMobile field.|
|66136|Missing supplierEmail field.|
|66137|Missing supplierCounty field.|
|66138|Missing customerCompany field.|
|66139|Missing customerTown field.|
|66140|Missing customerCountryCode field.|
|66141|Missing customerMobile field.|
|66142|Missing customerCounty field.|
|66143|Missing merchantCounty field.|
|66144|Missing customerOrderRef field.|
|66145|Missing customerMerchantRef field.|
|66146|Missing customerVatNumber field.|
|66147|Missing customerDateOfBirth field.|
|66148|Missing deliveryName field.|
|66149|Missing deliveryCompany field.|
|66150|Missing deliveryAddress field.|
|66151|Missing deliveryTown field.|
|66152|Missing deliveryPostcode field.|
|66153|Missing deliveryCountryCode field.|
|66154|Missing deliveryPhone field.|
|66155|Missing deliveryMobile field.|
|66156|Missing deliveryEmail field.|
|66157|Reserved for future use. Contact customer support if this error occurs.|
|66158|Missing deliveryCounty field.|
|66159|Missing deliveryFax field.|
|66160|Missing cardExpiryDate field.|
|66161|Missing cardStartDate field. (Legacy field)|
|66162|Reserved for future use. Contact customer support if this error occurs.|
|66163|Reserved for future use. Contact customer support if this error occurs.|
|66164|Missing items field.|
|66165|Missing itemGrossAmount field.|
|66166|Missing itemNetAmount field.|
|66167|Missing itemProductCode field.|
|66168|Missing itemCommodityCode field.|
|66169|Missing itemUnitOfMeasure field.|
|66170|Missing itemUnitAmount field.|
|66171|Missing itemDiscountAmount field.|
|66172|Missing itemDiscountReason field.|
|66173|Missing itemTaxRate field.|
|66174|Missing itemTaxAmount field.|
|66175|Missing itemTaxReason field.|
|66176|Missing shippingTrackingRef field.|
|66177|Missing shippingMethod field.|
|66178|Missing shippingAmount field.|
|66179|Missing shippingNetAmount field.|
|66180|Missing shippingGrossAmount field.|
|66181|Missing shippingTaxRate field.|
|66182|Missing shippingTaxAmount field.|
|66183|Missing shippingTaxReason field.|
|66184|Missing shippingDiscountAmount field.|
|66185|Missing shippingDiscoutReason field.|
|66186|Reserved for future use. Contact customer support if this error occurs.|
|66187|Reserved for future use. Contact customer support if this error occurs.|
|66188|Reserved for future use. Contact customer support if this error occurs.|
|66189|Reserved for future use. Contact customer support if this error occurs.|
|66190|Reserved for future use. Contact customer support if this error occurs.|
|66191|Reserved for future use. Contact customer support if this error occurs|
|66192|Missing walletID field.|
|66193|Missing walletName field.|
|66194|Missing walletDesc field.|
|66195|Missing walletData field.|
|66196|Missing cardID field.|
|66197|Missing cardName field.|
|66198|Missing cardDesc field.|
|66199|Missing cardData field.|
|66200|Missing customerAddressID field.|
|66201|Missing customerAddressName field.|
|66202|Missing customerAddressDesc field.|
|66203|Missing customerAddressData field.|
|66204|Missing deliveryAddressID field.|
|66205|Missing deliveryAddressName field.|
|66206|Missing deliveryAddressDesc field.|
|66207|Missing deliveryAddressData field.|
|66208|Missing walletOwnerRef field.|
|66209|Missing cardToken field.|
|66210|Missing masterPassData field.|
|66211|Reserved for future use. Contact customer support if this error occurs.|
|66212|Missing masterPassCheckoutOptions field.|
|66213|Missing masterPassCallbackURL field.|
|66214|Missing masterPassCheckoutURL field.|
|66215|Missing masterPassToken field.|
|66216|Missing masterPassVerifier field.|
|66217|Missing masterPassResourceURL field.|
|66218|Missing masterPassStatus field.|
|66219|Missing masterPassWalletID field.|
|66220|Missing handlingAmount field.|
|66221|Missing insuranceAmount field.|
|66222|Missing paymentMethod field.|
|66223|Missing paymentToken field.|
|66256|Missing receiverName field.|
|66257|Missing receiverCompany field.|
|66258|Missing receiverAddress field.|
|66259|Missing receiverTown field.|
|66260|Missing receiverPostCode field.|
|66261|Missing receiverCountryCode field.|
|66262|Missing receiverPhone field.|
|66263|Missing receiverMobile field.|
|66264|Missing receiverEmail field.|
|66265|Missing receiverDateOfBirth field.|
|66266|Missing receiverAccountNo field.|
|66267|Missing receiverCounty field.|
|66268|Missing receiverFax field.|
|66269|Missing customerFax field.|
|66270|Missing rtScheduleType field.|
|66271|Missing rtSchedule field.|
|66272|Missing rtID field.|
|66273|Missing rtName field.|
|66274|Missing rtDescription field.|
|66275|Missing rtPolicyRef field.|
|66276|Missing rtMerchantID field.|
|66277|Missing rtStartDate field.|
|66278|Missing rtInitialDate field.|
|66279|Missing rtInitialAmount field.|
|66280|Missing rtFinalDate field.|
|66281|Missing rtFinalAmount field.|
|66282|Missing rtCycleAmount field.|
|66283|Missing rtCycleDuration field.|
|66284|Missing rtCycleDurationUnit field.|
|66285|Missing rtCycleCount field.|
|66286|Missing rtMerchantData field.|
|66287|Missing rtCloneFields field.|
|66288|Missing checkoutRef field.|
|66289|Missing checkoutRedirectURL field.|
|66290|Missing checkoutOptions field.|
|66291|Missing checkoutRequest field.|
|66292|Missing checkoutResponse field.|
|66293|Missing rtAgreementType field.|
|66294|Missing rtSequenceNumber field.|
|66295|Missing rtSequenceCount field.|
|66296|Missing itemProductURL field.|
|66297|Missing itemImageURL field.|
|66298|Missing itemSize field.|
|66299|Missing itemWeight field.|
|66300|Missing riskCheckPref field.|
|66301|Missing riskCheckOptions field.|
|66302|Missing cloneFields field.|
|66303|Missing customField field.|
|66560|Missing dccRef field.|
|66561|Missing dccProvider field.|
|66562|Missing dccRate field.|
|66563|Missing dccMargin field.|
|66564|Missing dccCommission field.|
|66565|Missing dccSource field.|
|66566|Missing dccCreated field.|
|66567|Missing dccExpires field.|
|66568|Missing dccCurrencyCode field.|
|66569|Missing dccAmount field.|
|66570|Missing dccAccepted field.|
|66592|Missing threeDSRef field.|
|66593|Missing threeDSVersion field.|
|66594|Missing threeDSRedirectURL field.|
|66595|Missing threeDSOptions field.|
|66596|Missing threeDSDetails field.|
|66597|Missing threeDSURL field.|
|66598|Missing threeDSRequest field.|
|66599|Missing threeDSResponse field.|
|66600|Missing threeDSPolicy field.|
|66608|Missing scaExemption field.|
|66628|Missing riskCheckPref field.|
|66656|Missing deviceType field.|
|66657|Missing deviceChannel field.|
|66658|Missing deviceIdentity field.|
|66659|Missing deviceTimeZone field.|
|66660|Missing deviceCapabilities field.|
|66661|Missing deviceAcceptContent field.|
|66662|Missing deviceAcceptCharset field.|
|66663|Missing deviceAcceptEncoding field.|
|66664|Missing deviceAcceptLanguage field.|
|66665|Missing deviceScreenResolution field.|
|66666|Missing deviceOperatingSystem field.|
|66688|Missing initiator field.|
|66689|Missing acquirerOptions field.|

##### Invalid Request Field Error Codes

| Code      | Description |
| ----------- | ----------- | 
|66304|Invalid request. No data posted to integration URL.|
|66305|Invalid merchantID field.|
|66306|Invalid merchantPwd field.|
|66307|Reserved for internal use. Contact customer support if this error occurs.|
|66308|Reserved for internal use. Contact customer support if this error occurs.|
|66309|Reserved for internal use. Contact customer support if this error occurs.|
|66310|Reserved for internal use. Contact customer support if this error occurs.|
|66311|Invalid action field.|
|66312|Invalid amount field.|
|66313|Invalid currencyCode field.|
|66314|Invalid cardNumber field.|
|66315|Invalid cardExpiryMonth field.|
|66316|Invalid cardExpiryYear field.|
|66317|Invalid cardStartMonth field. (Legacy field)|
|66318|Invalid cardStartYear field. (Legacy field)|
|66319|Invalid cardIssueNumber field. (Legacy field)|
|66320|Invalid cardCVV field.|
|66321|Invalid customerName field.|
|66322|Invalid customerAddress field.|
|66323|Invalid customerPostcode field.|
|66324|Invalid customerEmail field.|
|66325|Invalid customerPhone field.|
|66326|Invalid countyCode field.|
|66327|Invalid transactionUnique field.|
|66328|Invalid orderRef field.|
|66329|Invalid remoteAddress field.|
|66330|Invalid redirectURL field.|
|66331|Invalid callbackURL field.|
|66332|Invalid merchantData field.|
|66333|Reserved for internal use. Contact customer support if this error occurs.|
|66334|Invalid duplicateDelay field.|
|66335|Invalid itemQuantity field.|
|66336|Invalid itemDescription field|
|66336|Invalid itemAmount field.|
|66338|Invalid taxAmount field.|
|66339|Invalid discountAmount field.|
|66340|Invalid discountReason field.|
|66341|Invalid xref field.|
|66342|Invalid type field.|
|66343|Invalid signature field (field is required if message signing is enabled).|
|66344|Invalid authorisationCode field.|
|66345|Invalid transactionID field.|
|66346|Invalid threeDSRequired field.|
|66347|Invalid threeDSMD field.|
|66348|Invalid threeDSPaRes field.|
|66349|Invalid threeDSECI field.|
|66350|Invalid threeDSCAVV field.|
|66351|Invalid threeDSXID field.|
|66352|Invalid threeDSEnrolled field.|
|66353|Invalid threeDSAuthenticated field.|
|66354|Invalid threeDSCheckPref field.|
|66355|Invalid cv2CheckPref field.|
|66356|Invalid addressCheckPref field.|
|66357|Invalid postcodeCheckPref field.|
|66358|Invalid captureDelay field.|
|66359|Invalid orderDate field.|
|66360|Invalid grossAmount field.|
|66361|Invalid netAmount field.|
|66362|Invalid taxRate field.|
|66363|Invalid taxReason field.|
|66364|Invalid surchargeRules field.|
|66365|Reserved for internal use. Contact customer support if this error occurs.|
|66366|Invalid statementNarrative1 field.|
|66367|Invalid statementNarrative2 field.|
|66368|Invalid merchantName field.|
|66369|Invalid merchantCompany field.|
|66370|Invalid merchantAddress field.|
|66371|Invalid merchantTown field.|
|66372|Invalid merchantPostcode field.|
|66373|Invalid merchantCountryCode field.|
|66374|Invalid merchantPhone field.|
|66375|Invalid merchantMobile field.|
|66376|Invalid merchantEmail field.|
|66377|Invalid merchantWebsite field.|
|66378|Invalid merchantOrderRef field.|
|66379|Invalid merchantCustomerRef field.|
|66380|Reserved for internal use. Contact customer support if this error occurs.|
|66381|Invalid merchantType field.|
|66382|Reserved for internal use. Contact customer support if this error occurs|
|66383|Invalid merchantCategoryCode field.|
|66384|Invalid supplierName field.|
|66385|Invalid supplierCompany field.|
|66386|Invalid supplierAddress field.|
|66387|Invalid supplierTown field.|
|66388|Invalid supplierPostcode field.|
|66389|Invalid supplierCountryCode field.|
|66390|Invalid supplierPhone field.|
|66391|Invalid supplierMobile field.|
|66392|Invalid supplierEmail field.|
|66393|Invalid supplierCounty field.|
|66394|Invalid customerCompany field.|
|66395|Invalid customerTown field.|
|66396|Invalid customerCountryCode field.|
|66397|Invalid customerMobile field.|
|66398|Invalid customerCounty field.|
|66399|Invalid merchantCounty field.|
|66400|Invalid customerOrderRef field.|
|66401|Invalid customerMerchantRef field.|
|66402|Invalid customerVatNumber field.|
|66403|Invalid customerDateOfBirth field.|
|66404|Invalid deliveryName field.|
|66405|Invalid deliveryCompany field.|
|66406|Invalid deliveryAddress field.|
|66407|Invalid deliveryTown field.|
|66408|Invalid deliveryPostcode field.|
|66409|Invalid deliveryCountryCode field.|
|66410|Invalid deliveryPhone field.|
|66411|Invalid deliveryMobile field.|
|66412|Invalid deliveryEmail field.|
|66413|Reserved for future use. Contact customer support if this error occurs|
|66414|Invalid deliveryCounty field.|
|66415|Invalid deliveryFax field.|
|66416|Invalid cardExpiryDate field.|
|66417|Invalid cardStartDate field. (Legacy field)|
|66418|Invalid line items count, either too few or too many for processor.|
|66419|Invalid line items sequence, either not sequential or not 0 to 99.|
|66420|Invalid items field.|
|66421|Invalid itemGrossAmount field.|
|66422|Invalid itemNetAmount field.|
|66423|Invalid itemProductCode field.|
|66424|Invalid itemCommodityCode field.|
|66425|Invalid itemUnitOfMeasure field.|
|66426|Invalid itemUnitAmount field.|
|66427|Invalid itemDiscountAmount field.|
|66428|Invalid itemDiscountReason field.|
|66429|Invalid itemTaxRate field.|
|66430|Invalid itemTaxAmount field.|
|66431|Invalid itemTaxReason field.|
|66432|Invalid shippingTrackingRef field.|
|66433|Invalid shippingMethod field.|
|66434|Invalid shippingAmount field.|
|66435|Invalid shippingNetAmount field.|
|66436|Invalid shippingGrossAmount field.|
|66437|Invalid shippingTaxRate field.|
|66438|Invalid shippingTaxAmount field.|
|66439|Invalid shippingTaxReason field.|
|66440|Invalid shippingDiscountAmount field.|
|66441|Invalid shippingDiscoutReason field.|
|66442|Reserved for future use. Contact customer support if this error occurs.|
|66443|Reserved for future use. Contact customer support if this error occurs.|
|66444|Reserved for future use. Contact customer support if this error occurs.|
|66445|Reserved for future use. Contact customer support if this error occurs.|
|66446|Reserved for future use. Contact customer support if this error occurs.|
|66447|Reserved for future use. Contact customer support if this error occurs|
|66448|Invalid walletID field.|
|66449|Invalid walletName field.|
|66450|Invalid walletDesc field.|
|66451|Invalid walletData field.|
|66452|Invalid cardID field.|
|66453|Invalid cardName field.|
|66454|Invalid cardDesc field.|
|66455|Invalid cardData field.|
|66456|Invalid customerAddressID field.|
|66457|Invalid customerAddressName field.|
|66458|Invalid customerAddressDesc field.|
|66459|Invalid customerAddressData field.|
|66460|Invalid deliveryAddressID field.|
|66461|Invalid deliveryAddressName field.|
|66462|Invalid deliveryAddressDesc field.|
|66463|Invalid deliveryAddressData field.|
|66464|Invalid walletOwnerRef field.|
|66465|Invalid cardToken field.|
|66466|Invalid masterPassData field.|
|66467|Reserved for future use. Contact customer support if this error occurs.|
|66468|Invalid masterPassCheckoutOptions field.|
|66469|Invalid masterPassCallbackURL field.|
|66470|Invalid masterPassCheckoutURL field.|
|66471|Invalid masterPassToken field.|
|66472|Invalid masterPassVerifier field.|
|66473|Invalid masterPassResourceURL field.|
|66474|Invalid masterPassStatus field.|
|66475|Invalid masterPassWalletID field.|
|66476|Invalid handlingAmount field.|
|66477|Invalid insuranceAmount field.|
|66478|Invalid paymentMethod field.|
|66479|Invalid paymentToken field.|
|66512|Invalid receiverName field.|
|66513|Invalid receiverCompany field.|
|66514|Invalid receiverAddress field.|
|66515|Invalid receiverTown field.|
|66516|Invalid receiverPostCode field.|
|66517|Invalid receiverCountryCode field.|
|66518|Invalid receiverPhone field.|
|66519|Invalid receiverMobile field.|
|66520|Invalid receiverEmail field.|
|66521|Invalid receiverDateOfBirth field.|
|66522|Invalid receiverAccountNo field.|
|66523|Invalid receiverCounty field.|
|66524|Invalid receiverFax field.|
|66525|Invalid customerFax field.|
|66526|Invalid rtScheduleType field.|
|66527|Invalid rtSchedule field.|
|66528|Invalid rtID field.|
|66529|Invalid rtName field.|
|66530|Invalid rtDescription field.|
|66531|Invalid rtPolicyRef field.|
|66532|Invalid rtMerchantID field.|
|66533|Invalid rtStartDate field.|
|66534|Invalid rtInitialDate field.|
|66535|Invalid rtInitialAmount field.|
|66536|Invalid rtFinalDate field.|
|66537|Invalid rtFinalAmount field.|
|66538|Invalid rtCycleAmount field.|
|66539|Invalid rtCycleDuration field.|
|66540|Invalid rtCycleDurationUnit field.|
|66541|Invalid rtCycleCount field.|
|66542|Invalid rtMerchantData field.|
|66543|Invalid rtCloneFields field.|
|66544|Invalid checkoutRef field.|
|66545|Invalid checkoutRedirectURL field.|
|66546|Invalid checkoutOptions field.|
|66547|Invalid checkoutRequest field.|
|66548|Invalid checkoutResponse field.|
|66549|Invalid rtAgreementType field.|
|66550|Invalid rtSequenceNumber field.|
|66551|Invalid rtSequenceCount field.|
|66552|Invalid itemProductURL field.|
|66553|Invalid itemImageURL field.|
|66554|Invalid itemSize field.|
|66555|Invalid itemWeight field.|
|66556|Invalid riskCheckPref field.|
|66557|Invalid riskCheckOptions field.|
|66558|Invalid cloneFields field.|
|66559|Invalid customField field.|
|66816|Invalid dccRef field.|
|66817|Invalid dccProvider field.|
|66818|Invalid dccRate field.|
|66819|Invalid dccMargin field.|
|66820|Invalid dccCommission field.|
|66821|Invalid dccSource field.|
|66822|Invalid dccCreated field.|
|66823|Invalid dccExpires field.|
|66824|Invalid dccCurrencyCode field.|
|66825|Invalid dccAmount field.|
|66826|Invalid dccAccepted field.|
|66848|Invalid threeDSRef field.|
|66849|Invalid threeDSVersion field.|
|66850|Invalid threeDSRedirectURL field.|
|66851|Invalid threeDSOptions field.|
|66852|Invalid threeDSDetails field.|
|66853|Invalid threeDSURL field.|
|66854|Invalid threeDSRequest field.|
|66855|Invalid threeDSResponse field.|
|66856|Invalid threeDSPolicy field.|
|66864|Invalid scaExemption field.|
|66880|Invalid riskCheckPref field.|
|66912|Invalid deviceType field.|
|66913|Invalid deviceChannel field.|
|66914|Invalid deviceIdentity field.|
|66915|Invalid deviceTimeZone field.|
|66916|Invalid deviceCapabilities field.|
|66917|Invalid deviceAcceptContent field.|
|66918|Invalid deviceAcceptCharset field.|
|66919|Invalid deviceAcceptEncoding field.|
|66920|Invalid deviceAcceptLanguage field.|
|66921|Invalid deviceScreenResolution field.|
|66922|Invalid deviceOperatingSystem field.|
|66944|Invalid initiator field.|
|66945|Invalid acquirerOptions field.|

#### AVS/CV2 Check Response Codes {#AvsResponseCodes}

The AVS/CV2 Check Response Message field `avscv2ResponseMessage` is sent back in the raw form that is received from the Acquiring bank and can contain the following values:

| Response      | Description |
| ----------- | ----------- | 
| ALL MATCH | AVS and CV2 match| 
| SECURITY CODE MATCH ONLY |CV2 match only | 
| ADDRESS MATCH ONLY | AVS match only | 
| NO DATA MATCHES | No matches for AVS and CV2 | 
| DATA NOT CHECKED | Supplied data not checked | 
| SECURITY CHECKS NOT SUPPORTED | Card scheme does not support checks | 

The AVS/CV2 Response Code `avscv2ResponseCode` is made up of six characters and is sent back in the raw form that is received from the Acquiring bank. The first 4 characters can be
decoded as below, the remaining 2 characters are currently reserved for future use:

| Position 1 Value      | Description |
| ----------- | ----------- | 
| 0 | No Additional information available.| 
| 1 | CV2 not checked| 
| 2 | CV2 matched.| 
| 4 | CV2 not matched| 
| 8 | Reserved| 

| Position 2 Value      | Description |
| ----------- | ----------- | 
| 0 | No Additional information available.| 
| 1 | Postcode not checked| 
| 2 | Postcode matched.| 
| 4 | Postcode not matched| 
| 8 | Postcode partially matched| 

| Position 3 Value      | Description |
| ----------- | ----------- | 
| 0 | No Additional Information| 
| 1 | Address numeric not checked| 
| 2 | Address numeric matched| 
| 4 | Address numeric not matched| 
| 8 | Address numeric partially matched| 

| Position 4 Value      | Description |
| ----------- | ----------- | 
| 0 | Authorising entity not known| 
| 1 | Authorising entity – merchant host| 
| 2 | Authorising entity – acquirer host| 
| 4 | Authorising entity – card scheme | 
| 8 | Authorising entity – issuer | 