---
sidebar_position: 22
---

# PPRO Transactions

## Background 

PPRO is an additional payment method that is available to all Merchants using the Gateway that have a PPRO account.

To use PPRO you will be supplied with a separate PPRO Merchant account that can be grouped with your main Merchant Account using the account mapping facility as documented in the [merchant account mapping](annexes#merchantAccountMapping) section. This allows transactions to be sent using your main Merchant Account and then routed automatically to the PPRO Merchant Account in the same mapping group.

PPRO is an Acquirer that offers many Alternative Payment Methods (APM), that you can then offer to your Customers.

E-wallets, SMS payments and PSP services are some of the many payment methods PPRO support (eg Alipay, EasyPay, Bancontact). This could allow a business to facilitate overseas transactions or alternative payment methods using a different payment method suitable for that country or business plan.

All transactions created with this payment method will appear in the Merchant Management System (MMS) together with the payment method that was used to process the transaction.

PPRO transactions cannot be used for ad-hoc Credential on File (COF) repeat transactions or for recurring billing.

For more information on how to accept PPRO transactions please contact customer support.

## Benefits 

- Multiple alternative payment methods could be used.
- Expands range of payment methods for international use.
- Supports a variety of e-wallets, SMS and PSP’s.
- Ability to perform refunds on supported payment methods.
- Transactions are controlled within the Merchant Management System (MMS) in the same manner as normal card transactions.

## Limitations 

- You will need a PPRO account.
- Payment authorisation is not always instantaneous and may require additional ‘QUERY’ requests.
- An alternative payment method may only support one or a limited set of currencies or countries.
- Alternative payment methods require a browser in order to display their Checkout.

## Implementation 

PPRO transactions require you to display the alternative payment method’s Checkout to your Customer as part of the transaction flow. The transaction must be done in two stages with the Checkout being displayed between the stages.

PPRO supports only supports the SALE, REFUND_SALE actions. This section explains how to make payment requests. Management requests are performed as detailed in the [management operations](transactiontypes#managementOperations) section.

To customise the alternative payment method’s Checkout experience, you may send various options in the `checkoutOptions` field in your initial request.

Additional information available from the alternative payment method’s Checkout will be made available in the `checkoutDetails` response field.

The direct integration uses two complex fields to pass data between PPRO and the Gateway. The `checkoutRequest` field will be provided by the Gateway and is a record whose name/value properties represent the data provided in the `checkoutURL` and is provided for information purposes only. The corresponding `checkoutResponse` field should be returned to the Gateway and must be a record containing name/value properties received from the Checkout when it redirects the Cardholder’s browser back to the URL provided using the `checkoutRedirectURL` on completion.

The contents of the `checkoutOptions`, `checkoutDetails`, `checkoutRequest` and `checkoutResponse` fields are formatted using the record format detailed in the [format guide](overview#fieldFormats), the `checkoutOptions` field also supports being provided using the serialised record format.

### Payment Request 

To request that a transaction be processed via PPRO the request must contain a `paymentMethod` of ‘ppro.XXXX’, where XXXX is the PPRO payment method tag listed in the [ppro payment method tag](#pproPaymentMethodTag). The request must also have a `checkoutRedirectURL` containing the URL of a page on your server to return to when the alternative payment method’s Checkout is closed. In addition, you may send `checkoutOptions` to provide further custom fields required by the alternative payment method as detailed in the [ppro payment specific fields](#pproPaymentSpecificFields) section.

When the Gateway receives these fields, assuming there are no other errors with the request, it will attempt to find a suitable PPRO Merchant Account in the current account mapping group (refer to the [merchant account mapping](annexes#merchantAccountMapping) section).

If the Gateway is unable to find a suitable account, then the transaction will be aborted, and it will respond with a `responseCode` of 66364 (INVALID PAYMENTMETHOD).
Otherwise, the Gateway will respond with a `responseCode` of 65826 (CHECKOUT REQUIRED) and included in the response will be a `checkoutURL` field containing the URL that the buyer’s browser should be redirected to in order to complete the payment. The response will also contain a unique `checkoutRef` which must be echoed back in the continuation requests.

On completion of the third-party payment the browser will be directed to the `checkoutRedirectURL` you provided, complete with information about the payment in a HTTP POST request. The posted data will contain a `checkoutResponse` field that will contain any specific response data for the payment method.

### Payment Specific Fields {#pproPaymentSpecificFields}

Most of the information required by the alternative payment methods can be supplied using the standard Gateway request fields. However, there may be specific mandatory fields required by a payment method which are not available using the standard fields. In these cases, these fields can be sent in the `checkoutOptions` data, the value of which must be formatted using the record or serialised record formats detailed in the [format guide](overview#fieldFormats).

For example, most European services may require the `nationalid` and `consumerref` fields. Recurring transactions will require the use of `iban` (optionally `sequencetype`) and in follow-up payments; `mandatereference`, `mandatesignaturedate`, and `sequencetype`.

These fields are documented in your PPRO integration guide as SPECIN fields.

Customer support will be able to guide you on any mandatory options as you will find the transaction will fail with a `responseCode` of 65550 (PROCESSOR_ERROR - Invalid request data) if any are missing.

### Payment Method Tag {#pproPaymentMethodTag}

To specify which alternative payment method is required you need to send the `paymentMethod` field with a value using the format ‘ppro.XXXX’, where XXXX is the alternative payment method’s tag name as assigned by PPRO.

For example, to use the alternative payment method AstroPay Card that has a tag name of “astropaycard” (all lowercase); the resulting payment method code would be “ppro.astropaycard”. This allows the Gateway to know that you’re attempting to use AstroPay Card using the PPRO payment method.

The table below is a guide to the tag names available. This list is fluid as PPRO add and remove methods.

If you know of a payment method that is not on this list or the payment method cannot be used; please contact customer support for advice.
