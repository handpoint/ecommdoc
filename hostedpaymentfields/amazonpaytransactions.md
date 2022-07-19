---
sidebar_position: 21
---

# Amazon Pay Transactions

## Background 

Amazon Pay is an additional payment method that is available to all Merchants using the Gateway that have an Amazon Pay account.

To use Amazon Pay, you will be supplied with a separate Amazon Pay Merchant account that can be grouped with your main Merchant account using the account mapping facility as documented in the [merchant account mapping](annexes#merchantAccountMapping) section. This allows transactions to be sent using your main Merchant Account and then routed automatically to the Amazon Pay Merchant Account in the same mapping group.

It allows you to offer payment via Amazon Pay in addition to normal card payments.

Amazon Pay transactions will appear in the Merchant Management System (MMS) alongside any card payments and can be captured, cancelled and refunded in the same way as card payments.

Amazon Pay transactions can also be used for recurring billing but require you to indicate in the initial transaction that it will be the basis for recurring billing and a billing agreement will be entered into between your Customer and Amazon Pay when they agree to the payment.

Amazon Pay transactions cannot be used for ad-hoc Credentials on File (COF) repeat transactions unless a billing agreement has been set up.

For more information on how to accept Amazon Pay transactions, please contact customer support.

## Benefits 

- Provides your customers with the flexibility of paying using their Amazon Pay account when this is more suitable to them.
- The Amazon Pay Checkout can be added as an overlay on the standard checkout to help improve conversion rates with an easier way to pay without customers leaving your website.
- There are no extra costs to add an Amazon Pay Merchant Account. However, you will still be liable for the Amazon Pay transaction fees.
- The full Amazon Pay transaction information is available and returned as part of the transaction.
- Transactions are controlled within the Merchant Management System (MMS) in the same manner as normal card transactions.

## Limitations

- You will need an Amazon Pay account.
- Recurring transactions are not supported unless part of a prearranged billing agreement.
- Independent refunds that are not tied to a previous sale transaction are not supported without prior agreement.
- Transactions require a browser in order to display the Amazon Pay Checkout widgets.

## Implementation 

Amazon Pay transactions require you to display an Amazon Pay Checkout to your Customer as part of the transaction flow. The transaction must be done in two stages, with the Checkout page being displayed between the stages. They can also optionally be done in three stages, allowing you to display an order confirmation after the Checkout page and before authorising the transaction. You can change the amount at this stage to allow for shipping costs when you know the confirmed delivery address the Customer selected as part of the Amazon Pay Checkout.

Amazon Pay do not provide a ready built Checkout page and require you to create one on your servers using the JavaScript widget toolkit they provide.

Amazon Pay supports the normal payment and management actions. This section explains how to make payment requests. Management requests are performed as detailed in the [management operations](transactiontypes#managementOperations) section.

To customise the Amazon Pay Checkout experience, you may send various options in the `checkoutOptions` field in your initial request.

Additional information available from the Amazon Pay Checkout will be made available in the `checkoutDetails` response field.

The direct integration uses two complex fields to pass data between the Amazon Pay JavaScript widgets and the Gateway. The `checkoutRequest` field will be provided by the Gateway and is a record whose name/value properties should be used to help initialise the widgets. The corresponding `checkoutResponse` field should be returned to the Gateway and must be a record containing name/value properties received from the widgets.

The contents of the `checkoutOptions`, `checkoutDetails`, `checkoutRequest` and `checkoutResponse` fields are formatted using the record format detailed in the [format guide](overview#fieldFormats), the `checkoutOptions` field also supports being provided using the serialised record format.

### Initial Request (Checkout Preparation)

To request that a transaction be processed via Amazon Pay, the request must contain a `paymentMethod` of ‘amazonpay’ In addition, you may send `checkoutOptions` to customise the Checkout experience. When the Gateway receives this `paymentMethod`, assuming there are no other errors with the request, it will attempt to find a suitable Amazon Pay Merchant Account in the current account mapping group (refer to the [merchant account mapping](annexes#merchantAccountMapping) section).

If the Gateway is unable to find a suitable account, then the transaction will be aborted, and it will respond with a `responseCode` of 66364 (INVALID PAYMENTMETHOD).

Otherwise, the Gateway will respond with a `responseCode` of 65826 (CHECKOUT REQUIRED) and the response will include a `checkoutURL` field containing the URL required to load the Amazon Pay JavaScript Widgets; and a `checkoutRequest` containing any data required by those Widgets. The response will also contain a unique `checkoutRef` that must be echoed back in the continuation requests.

At this point, your server must create an Amazon Pay Checkout page using their JavaScript Widgets. Further details on how to use the Widgets are provided in the Amazon Pay guide at https://developer.amazonpay.com/docs/classic/express-checkout/in-context/enable_in_context_checkout/.

#### Request Fields 

These fields should be sent in addition to the [basic request fields](transactiontypes.md/#transactionRequest) excluding any card details.

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| paymentMethod | <span class="badge badge--primary">Yes</span> | Must contain the value ‘amazonpay’ in lower case letters only.|
| checkoutRedirectURL | No  | Reserved for future use.|
| checkoutOptions | No | Record containing options used to customise the Amazon Pay Checkout. See the [checkout options](#checkoutOptions) section.|

#### Response Fields

These fields will be returned, in addition to the request fields above and the [basic response fields](transactiontypes.md/#transactionResponse).

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| checkoutRef | <span class="badge badge--primary">Yes</span> | Unique reference required to continue this transaction when the Amazon Pay Checkout has completed.|
| checkoutName | <span class="badge badge--primary">Yes</span>  | Unique name of the Checkout. For Amazon Pay this is the value amazonpay.|
| checkoutURL | <span class="badge badge--primary">Yes</span>  | URL required to load the Amazon Pay JavaScript Widgets.|
| acquirerResponseDetails | <span class="badge badge--primary">Yes</span> | Record containing details about the Amazon Pay response containing any error messages and codes. This can be used together with the normal `responseCode` and `responseMessage` response fields to further determine the reason for any failure.|
| checkoutRequest | No  | Record containing data required for the Amazon Pay Widgets such as:<br></br><br></br> • merchantID – Amazon Pay merchant id <br></br>• clientID – Amazon Pay client id <br></br>• sandbox – true if Amazon Pay sandbox <br></br>• region – Amazon Pay API region code<br></br> • scope – Login Widget scope parameter|
| checkoutOptions | No | Record containing any Checkout options passed in the request.|

### Continuation Request (Checkout Details and Authorise)

On completion of the Amazon Pay Widgets, the Merchant should send the information created by the Widgets to the Gateway together with a status value. If the Checkout was successful, the status will be ‘success’; alternatively, if the Checkout was cancelled, the status will be ‘cancel’. Any `accessToken` generated by the Amazon Pay Login Widget; `orderReferenceID`, generated by the Wallet or Address Widgets; and `billingAgreementID` generated by the optional Billing Widget, must be added to the `checkoutResponse` field and sent in a new request to the Gateway. The `checkoutResponse` field can be sent either as a URL query string; as a JSON encoded string; or as an array of parameters. This new request will load the Checkout details, including any purchase and delivery address details as required, and send the transaction to Amazon Pay for authorisation, returning the result as in the case of a normal authorisation transaction. The new request must contain the `checkoutRef` received in the initial response.

#### Request Fields

These fields may be sent alone. It is only necessary to send the `checkoutRef` and the `checkoutResponse` in the continuation request because the `checkoutRef` will identify the Merchant Account and initial request. The message does not need to be signed. You can send any of the normal request fields to modify or supplement the initial request – however, in this case the request should be signed. The `checkoutRedirectURL` and `checkoutOptions` fields sent in the initial request cannot be modified and any sent in the second request must match those used in the first request, or the second request will fail with a `responseCode` of 64442 (REQUEST MISMATCH).

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| checkoutRef | <span class="badge badge--primary">Yes</span> | Unique reference returned in the initial response.|
| checkoutResponse | <span class="badge badge--primary">Yes</span>  | The data received from the Amazon Pay Checkout Widgets together with a status value.|
| checkoutOnly | No | Pass Y to complete the processing as far as the next Checkout stage and then return with the loaded Checkout details.|

#### Response Fields

These fields will be returned, in addition to the request fields above and the [basic response fields](transactiontypes.md/#transactionResponse).

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| checkoutRef | <span class="badge badge--primary">Yes</span> | Provided if `checkoutOnly` was used in the continuation response to indicate that a further request will be sent to finalise the transaction.|
| checkoutName | <span class="badge badge--primary">Yes</span>  | Unique name of the Checkout. For Amazon Pay this is the value amazonpay.|
| checkoutDetails | <span class="badge badge--primary">Yes</span>  | Record containing options used to customise the Amazon Pay Checkout. Refer to the [checkout details](#checkoutDetails) section.|
| acquirerResponseDetails | <span class="badge badge--primary">Yes</span> | Record containing details about the Amazon Pay response containing any error messages and codes. This can be used together with the normal `responseCode` and `responseMessage` response fields to determine further the reason for any failure.|
| customerXXXX | No | Customer details if provided by the Amazon Pay Checkout. The response will include the Customer/billing address details if provided by the Amazon Pay Checkout. |
| deliveryXXXX | No | Delivery details if provided by the Amazon Pay Checkout.The response will include the delivery address details if provided by the Amazon Pay Checkout.|
| receiverXXXX | No |Buyer details if provided by Amazon Pay. Amazon Pay will usually provide the buyer’s name, postcode and email only, which are returned in the `receiverName`, `receiverPostcode` and `receiverEmail` fields accordingly|

### Separate Checkout Details and Authorisation Requests

You can choose to obtain the Checkout details before actually sending the transaction for authorisation by sending the `checkoutOnly` field in the above continuation request. If this field is sent with a value of ‘Y’ then the Gateway will load the Checkout details and then return them to you without sending the request for authorisation. You can then display them and/or adjust the amount, for example, according to delivery charges appropriate to the received delivery address. You should then send a new request containing the checkou`tRef received to continue the transaction and authorise it.

Note: this stage can be repeated multiple times by including the `checkoutOnly` field with a value of ‘Y’ each time. To complete the transaction, the final request must not contain the `checkoutOnly` field or it must not have a value of ‘Y’.

### Checkout Options {#checkoutOptions}

The following options may be set in the `checkoutOptions` field to customise the Amazon Pay Checkout. The options must be formatted using the record or serialised record formats detailed in the [format guide](overview#fieldFormats).

| Name      | Description |
| ----------- | ----------- |
| billingAgreementRequired | Can be used to specify that a billing agreement must be started. Alternatively, the `rtAgreementType` standard integration field can be used with a value of ‘recurring’ or ‘instalment’.|
|shippingAddressRequired|Indication that the shipping address is required, and the Address Checkout Widget will be used. |
|sellerOrderID| The Merchant specified identifier for this order. If not sent, then any value in the merchantOrderRef standard integration field is used.|
|sellerNote| Represents a description of the order that is displayed in emails to the buyer.|
|sellerAuthorizationNote|A description for the authorisation transaction that is shown in emails to the buyer. |
|sellerCaptureNote  | A description for the capture that is displayed in emails to the buyer.|
|sellerBillingAgreementID  | The Merchant specified identifier for this billing agreement. If not sent, then any value in the `rtPolicyRef` standard integration field is used.|
|customInformation|Any additional information that you want to include with this order reference |
| supplementaryData |Supplementary data.|
|softDescriptor| The description to be shown on the buyer's payment statement.|
|billingAgreementRequired|Can be used to specify that a billing agreement must be started. Alternatively, the `rtAgreementType` standard integration field can be used with a value of ‘recurring’ or ‘instalment’. |
|shippingAddressRequired| Indication that the shipping address is required, and the Address Checkout Widget will be used.|

For further information on the options refer to the Amazon Pay API Reference Guide: https://pay.amazon.com/us/developer/documentation/apireference/201751630. 

### Checkout Details {#checkoutDetails}

The `checkoutDetails` field included in the response above will contain the following values and any further values received from Amazon Pay allowing the Merchant to see the full Amazon Pay order information. The details will be returned using the record format detailed in the [format guide](overview#fieldFormats). 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| referenceID| No |Amazon Pay reference id. Either the `orderReferenceID` or the `billingReferenceID` where appropriate. |
| accessToken| No | Amazon Pay access token as sent in the continuation request `checkoutResponse` data.|
| bilingAgreementID| No | Amazon Pay billing agreement id as sent in the continuation request `checkoutResponse` data.|
|orderReferenceID | No | Amazon Pay order reference id as sent in the continuation request `checkoutResponse` data.|

## Transaction Lifecycle 

Amazon Pay transactions will use the normal Authorise, Capture life cycle as documented in the section [Authorise, Capture and Settlement](annexes#authoriseCaptureSettlement) with the following differences.

### Capture 

Captures made by the Direct Integration or Merchant Management System (MMS) are sent to Amazon Pay immediately the transaction will be left in either the accepted or rejected terminal state depending on whether Amazon Pay accepted or rejected the capture request. Unlike card payments, captures do not flag the transaction to be included in the nightly settlement batch and therefore, when done they cannot be redone. This means that it is not possible to change the amount to be captured or cancel the transaction when a capture has been requested.

Captures that are not explicitly performed such as normal transactions or those with a captureDelay are still done as part of the nightly settlement batch.

Transactions that are not captured within 3 days will be placed in a pending state in the Amazon Pay system which is reflected as the tendered state in the Gateway and will show on the Merchant Management System as being settled.

### Refund Sale

Amazon Pay transactions can be refunded the same as normal card transactions. however, like capture requests, these will be sent to Amazon Pay immediately and not batched up and sent as part of the nightly settlement process. This means the transaction will be left in either the accepted or rejected state depending on whether Amazon Pay accepted or rejected the refund request.

Refunds can be made for full or partial amounts, with multiple refunds allowed up to the original authorised amount.

## Reference Transactions 

Amazon Pay does not allow ad hoc Credentials on File (COF) type repeat or recurring transactions using the xref of a reference transaction unless that transaction has specifically started an Amazon Pay Billing Agreement.

If you want to be able to make future repeat or recurring transactions, then the initial transaction must include an `rtAgreementType` of recurring or instalment. Alternatively, the `billingAgreementRequired` option can be included in the `checkoutOptions` so as to identify this transaction as the start of a recurring billing sequence.

This will cause the Gateway to request Amazon Pay setup a Billing Agreement between you and the Customer. In this case the Amazon Pay Billing Consent Widget must be used in the Checkout and the `billingAgreementID` it creates sent in the `checkoutResponse` data in the continuation request. Any billing agreement id will be displayed on the Merchant Management System (MMS) as part of the payment details so that you can easily see which Amazon Pay transactions can be used for recurring billing.
