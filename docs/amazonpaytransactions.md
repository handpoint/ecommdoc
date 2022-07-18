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

If a transaction is sent to the Hosted Integration using a `merchantID` that is part of a routing group containing an Amazon Pay Merchant, then the Hosted Payment Page will display an Amazon Pay payment button which, when clicked, will open the Amazon Pay Checkout and allow the Customer to pay using their Amazon Pay account.

To customise the Amazon Pay Checkout experience, you may send various options in the `amazonPayCheckoutOptions` field in your initial request.

Additional information available from Amazon Pay will be made available in the `checkoutDetails` response field.

### Request Fields 

These fields should be sent in addition to the [basic request fields](transactiontypes.md/#transactionRequest).

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| paymentMethod | No| Must contain the value ‘amazonpay’ in lower case letters only.|
| checkoutRedirectURL | No | Reserved for future use.|
| amazonPayCheckoutOptions | No | Record containing options used to customise the Amazon Pay Checkout. See the [checkout options](#checkoutOptions) section.|

### Checkout Options {#checkoutOptions}

The following options may be set in the `amazonPayCheckoutOptions` field to customise the Amazon Pay Checkout. The options must be formatted using the record or serialised record formats detailed in the [format guide](overview#fieldFormats).

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

The `checkoutDetails` field included in the response will contain the following values and any further values received from Amazon Pay allowing the Merchant to see the full Amazon Pay order information. The details will be returned using the record format detailed in the [format guide](overview#fieldFormats). 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| referenceID| No |Amazon Pay reference id. Either the `orderReferenceID` or the `billingReferenceID` where appropriate. |
| accessToken| No | Amazon Pay access token .|
| bilingAgreementID| No | Amazon Pay billing agreement id.|
|orderReferenceID | No | Amazon Pay order reference id.|

## Transaction Lifecycle 

Amazon Pay transactions will use the normal Authorise, Capture life cycle as documented in the section [Authorise, Capture and Settlement](annexes#authoriseCaptureSettlement) with the following differences.

### Capture 

Captures made by the Merchant Management System (MMS) are sent to Amazon Pay immediately the transaction will be left in either the accepted or rejected terminal state depending on whether Amazon Pay accepted or rejected the capture request. Unlike card payments, captures do not flag the transaction to be included in the nightly settlement batch and therefore, when done they cannot be redone. This means that it is not possible to change the amount to be captured or cancel the transaction when a capture has been requested.

Captures that are not explicitly performed such as normal transactions or those with a `captureDelay` are still done as part of the nightly settlement batch.

Transactions that are not captured within 3 days will be placed in a pending state in the Amazon Pay system which is reflected as the tendered state in the Gateway and will show on the Merchant Management System as being settled.

### Refund Sale

Amazon Pay transactions can be refunded the same as normal card transactions. however, like capture requests, these will be sent to Amazon Pay immediately and not batched up and sent as part of the nightly settlement process. This means the transaction will be left in either the accepted or rejected state depending on whether Amazon Pay accepted or rejected the refund request.

Refunds can be made for full or partial amounts, with multiple refunds allowed up to the original authorised amount.

**Processing Refunds is not possible with the Hosted payment page integration, it requires a separate Direct Integration.**  

## Reference Transactions 

Amazon Pay does not allow ad hoc Credentials on File (COF) type repeat or recurring transactions using the xref of a reference transaction unless that transaction has specifically started an Amazon Pay Billing Agreement.

If you want to be able to make future repeat or recurring transactions, then the initial transaction must include an `rtAgreementType` of recurring or instalment. Alternatively, the `billingAgreementRequired` option can be included in the `checkoutOptions` so as to identify this transaction as the start of a recurring billing sequence. **Processing recurring payments is not possible with the Hosted payment page integration, it requires a separate Direct Integration.**  

This will cause the Gateway to request Amazon Pay setup a Billing Agreement between you and the Customer. In this case the Amazon Pay Billing Consent Widget must be used in the Checkout and the `billingAgreementID` it creates sent in the `checkoutResponse` data in the continuation request. Any billing agreement id will be displayed on the Merchant Management System (MMS) as part of the payment details so that you can easily see which Amazon Pay transactions can be used for recurring billing.

