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

If a transaction is sent to the Hosted Integration using a `merchantID` which is part of a routing group containing a PPRO Merchant Account, then the Hosted Payment Page will show alternative payment method (APM) buttons for each payment method listed in the `allowedPaymentMethods` field. When clicked on the Hosted Payment Page may request further details from the Customer before opening the APM Checkout allowing the Customer to pay using that APM.

To customise the alternative payment methods checkout experience, you may send various options in the `pproCheckoutOptions` field in your initial request.

Additional information available from PPRO will be made available in the checkoutDetails response field.