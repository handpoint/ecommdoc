---
sidebar_position: 19
---

# Gateway Wallet

## Background

The Gateway supports an internal digital Wallet that is available to all Merchants using the Gateway.

The Gateway allows you to store your Customer’s payment card, billing and delivery address details and other information securely encrypted in its internal Wallet. You can then allow your Customer to select from stored payment cards to check out faster on your website.

Management of this Wallet is done using the Gateway’s REST API. However, you can use the Hosted, Direct or Batch Integrations to perform transactions, using cards and addresses stored in the Wallet; or to store new cards and address used with successful transactions.

## Benefits 

- Details can be used from or added to the Wallet with just a few extra integration fields.
- Customers can select from previously stored details, making the checkout process more streamlined, resulting in fewer abandoned carts and thus increasing sales.
- Compatible with existing card base fraud solutions such as Address Verification Service (AVS), 3-D Secure and third-party fraud providers.
- There are no extra costs to use the internal Gateway Wallet.
- The Wallet transactions are controlled within the Merchant Management System (MMS) in the same manner as normal card transactions.
- Stored cards are assigned a Card Token which is fully LUHN checkable PAN ending in the same last 4 digits as stored card and thus can be used to replace the PAN in any system that is expecting to store PANs and not arbitrary card identifiers.

## Limitations 
- The payment details are stored internally by the Gateway and not available for use with other Gateway Merchants or other payment gateways.

## Implementation 

If a transaction is sent to the Direct Integration, then with the addition of a few extra integration fields, it can be instructed to use payment details stored in the Wallet and/or store the used payment details.

Using stored payment details is similar to performing cross-referenced transactions where the payment details are cloned from a previous transaction. However, in this case the payment details are taken from the Wallet and not a previous transaction.

The details are only saved if the transaction is successful, ensuring that the Wallet is not filled up with invalid payment details.

The details requiring to be stored in the Wallet are validated when the transaction is performed prior to any authorisation with the Acquirer. If any of the details are invalid, then the transaction will be aborted with a `responseCode` of 66304 (INVALID_REQUEST) and a `responseMessage` indicating which data could not be stored in the Wallet. Any failure that occurs post authorisation will not abort the transaction but will be available in the appropriate `xxxxStoreResponseCode` response fields.

The `walletOwnerRef` field can be used to assign a unique Customer reference to the Wallet allowing you to identify which of your Customers owns the Wallet. This could be the Customer reference you use within your own Customer accounts or Shopping Cart software. You must ensure that this value is less than 50 characters, or the transaction will be aborted with a `responseCode` of 65xxx (INVALID_WALLETCUSTOMERREF).

## Request Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| walletID | No |Identifier for an existing Wallet to use.|
|walletName| No |Name for any new Wallet created.|
|walletDescription| No |Description for any new Wallet created.|
|walletOwnerRef| No |Owner Reference for any new Wallet created. |
|walletData| No | Merchant Data for any new Wallet created.|
|walletStore| No |Request that all payment details be stored in the Wallet. A new Wallet will be created if needed.<br></br><br></br> Possible values are:<br></br> Y- store all payment details.<br></br> N- store details according to their `xxxStore` value. |
|cardID | No |Identifier for an existing card stored in a Wallet. |
|cardToken | No | Identifier for an existing card stored in a Wallet represented as valid PAN ending with same last 4 digits as the stored PAN.|
|cardName| No |Name for any new card stored.|
|cardDescription| No |Description for any new card stored.|
|cardData| No |Merchant Data for any new card stored.|
|cardStore| No |Request that the payment card details be stored in the Wallet. A new Wallet will be created if needed.<br></br><br></br> Possible values are:<br></br> Y- store the card details.<br></br> N- do not store the card details. |
|customerAddressID | No |Identifier for an existing address stored in a Wallet. |
|customerAddressName| No | Name for any new address stored.|
|customerAddressDescription| No | Description for any new address stored.|
|customerAddressData | No | Merchant Data for any new address stored.|
|customerAddressStore| No | Request that the customer address details be stored in the Wallet. A new Wallet will be created if needed.<br></br><br></br> Possible values are:<br></br> Y- store the customer address details.<br></br> N- do not store the customer address details.|
|deliveryAddressID| No |Identifier for an existing address stored in a Wallet. |
|deliveryAddressName| No | Name for any new address stored.|
|deliveryAddressDescription| No |Description for any new address stored. |
|deliveryAddressData| No | Merchant Data for any new address stored.|
|deliveryAddressStore| No |Request that the delivery address details be stored in the Wallet. A new Wallet will be created if needed.<br></br><br></br> Possible values are:<br></br> Y- store the delivery address details.<br></br> N- do not store the delivery address details. |

## Response Fields

These fields will be returned in addition to the request fields from section.

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
|walletStoreResponseCode| No |Result of creating or updating the Wallet details. Refer to [Response Codes](annexes#responseCodes) for details. |
|walletStoreResponseMessage| No |Description of above response code.|
|cardStoreResponseCode| No |Result of creating or updating the card details. Refer to [Response Codes](annexes#responseCodes) for details.|
|cardStoreResponseMessage| No |Description of above response code.|
|customerAddresStoreResponseCode| No |Result of creating or updating the address details. Refer to [Response Codes](annexes#responseCodes) for details. |
|customerAddressStoreResponseMessage| No |Description of above response code.|
|deliveryAddressStoreResponseCode| No |Result of creating or updating the address details. Refer to [Response Codes](annexes#responseCodes) for details.|
|deliveryAddressStoreResponseMessage| No |Description of above response code.|

If new items are stored in the Wallet, then their identifiers will be returned in the appropriate walletID, cardID, customerAddressID and deliveryAddressID together with any values provided for or assigned by default to the other item fields.

Failure to store any of the details in the Wallet will be reported using the appropriate `xxxxStoreResponseCode` response field.