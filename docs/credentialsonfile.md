---
sidebar_position: 4
---

# Credentials on file

## Stored Credentials

The stored details, or credentials, are termed Credentials on File (COF) and refer to any payment details (including, but not limited to, an account number or payment token) that the consumer has authorised you to store to perform future transactions. **For Hosted Payment Page integrations, card details can be saved and reused by the cardholder for a future transaction. In this case the cardholder won't need to type in his card number or expiry date again but he will always need to type in the CVV of the card.**

These transactions must always be identified with the reason for storing or using the stored credentials and who initiated the transaction – the Consumer (CIT) or the Merchant (MIT).  

You may store the details in the [Gateway’s Wallet](#gatewayWallet) or by taking advantage of the [payment tokenisation](#paymentTokenisation) feature of the Gateway. Either way you must tell the Gateway of your intentions, it will not assume that just because you have asked, for example, to store credentials in the Wallet that those are legitimate stored credentials and follow all the requirements laid out below.

If you store credentials on file, then you must:
- Disclose to consumers how those credentials will be used.
- Obtain consumers’ consent to store the credentials.
- Notify consumers when any changes are made to the terms of use.
- Inform the card issuer via a transaction that payment credentials are now stored on file.
- Identify transactions with appropriate `rtAgreementType` when using stored credentials. 
- Perform a PREAUTH, SALE or VERIFY transaction during the initial credential setup.

Note: Credentials stored to complete a single transaction (or a single purchase) for a consumer, including multiple authorisations related to that particular transaction or future refunds are not considered stored credentials and can be stored and used without following the above rules.

### Consumer Initiated Transactions (CIT)

Consumer Initiated Transactions (CIT) are any transaction where the Consumer is actively participating in the transaction. This can be either through a checkout experience online, via a mail order or telephone order, with or without the use of an existing stored credential.

**A Consumer Initiated Transaction is one whose action field is one of PREAUTH, SALE or VERIFY and whose type is one of 1 (ECOM) or 2 (MOTO).**

To indicate that the card details are to be stored as, or were stored as, Credentials on File then send the `rtAgreementType` field as one of the following values:

- cardonfile – card details stored as Credential on File
- ~~recurring – initial payment as the start of a recurring payment agreement.~~
- ~~instalment – initial payment as the start of an instalment payment agreement.~~

:::warning
 `recurring` and `instalment` are not supported for Hosted Payment Page integrations. To support recurring or instalment payments you will need to carry a separate Direct Integration or an Hosted Payment Fields Integration.
:::


### Merchant Initiated Transactions (MIT) {#mit}

Merchant Initiated Transactions (MIT) are any transaction where you have performed the transaction without the active participation of the Consumer. This would normally always be as a follow-up to a previous Consumer Initiated Transaction (CIT). The Gateway can be instructed to take Merchant Initiated recurring transactions automatically, according to a pre-determined schedule. 

:::warning
 Merchant initiated transactions without the participation of the cardholder are not supported for Hosted Payment Page integrations. Even if MOTO (mail order / telephone order) can be used and card details can be saved on file, the Hosted payment page will always, at a minimum, require the cardholder to input the CVV of his card. To support recurring, instalment or unscheduled payments where the cardholder is **not involved at all**, you will need to carry a separate Direct Integration or an Hosted Payment Fields Integration.
:::


Merchant Initiated Transactions are broken down in to two categories as follows.

#### Standing Instruction MITs 

Merchant Initiated Transactions defined under this category are performed to address pre-agreed standing instructions from the Consumer for the provision of goods or services.

The following transaction types are standing instructions transactions:
- Instalment Payments: A transaction in a series of transactions that use a stored credential and that represent Consumer agreement for the merchant to initiate one or more future transactions over a period for a single purchase of goods or services. An example of such a transaction is a higher purchase repayment. **Not supported by the Hosted Payment Page integration method. To support recurring payments where the cardholder is not involved at all, you will need to carry a separate Direct Integration or an Hosted Payment Fields Integration.**
- Recurring Payments: A transaction in a series of transactions that use a stored credential and that are processed at fixed, regular intervals (not to exceed one year between transactions), representing Consumer agreement for the merchant to initiate future transactions for the purchase of goods or services provided at regular intervals. An example of such a transaction is a gym membership subscription. **Not supported by the Hosted Payment Page integration method. To support instalment payments where the cardholder is not involved at all, you will need to carry a separate Direct Integration or an Hosted Payment Fields Integration.**
- Unscheduled Credential on File (UCOF): A transaction using a stored credential for a fixed or variable amount that does not occur on a scheduled or regularly occurring transaction date, where the Consumer has provided consent for the merchant to initiate one or more future transactions. An example of such a transaction is an account auto-top up transaction. **Partially supported by the Hosted Payment Page integration method. For Hosted Payment Pages, the cardholder will always need to provide the CVV of the card when processing an unscheduled payment. To support unscheduled payments where the cardholder is not involved at all, you will need to carry a separate Direct Integration or an Hosted Payment Fields Integration.**

The Gateway classifies the first two types of instalment and recurring payments as Continuous Authority (CA) payments and the third type as a normal Cardholder not present payments. Different Acquirers may use different classifications, but the Gateway will handle this and send the classification expected by the Acquirer.

The maximum period between each transaction is 13 months, however individual Card Schemes or Acquirers may impose shorter periods.

#### Industry-Specific Business Practice MIT 

Merchant Initiated Transactions defined under this category are performed to fulfil a business practice as a follow-up to an original Consumer-Merchant interaction that could not be completed with one single transaction. Not every industry practice Merchant Initiated Transaction requires a stored credential, for example, if you store card details for a single transaction or a single purchase, it is not considered as a stored credential transaction.

The following transaction types are industry specific transactions:
- Incremental: Incremental authorizations can be used to increase the total amount authorised if the authorised amount is insufficient. An incremental authorization request may also be based on a revised estimate of what the Consumer may spend. The Gateway does not currently support incremental authorisations.
- Resubmission: You can perform a resubmission in cases where it requested an authorization but received a decline due to insufficient funds; however, the goods or services were already delivered to the Consumer. In such scenarios, you can resubmit the request to recover outstanding debt from Consumers.
- Reauthorization: You can initiate a reauthorization when the completion or fulfilment of the original order or service extends beyond the authorization validity limit set by the Card Scheme.
- Delayed Charges: Delayed charges are performed to make a supplemental account charge after original services have been rendered and payment has been processed.
- No Show: Consumers can use their payment credentials to make a guaranteed reservation with certain merchant segments. A guaranteed reservation ensures that the reservation will be honoured and allows you to perform a No Show transaction to charge the Consumer a penalty according to your cancellation policy. If no payment is made to guarantee a reservation, then it is necessary to perform a VERIFY Consumer Initiated Transaction at the time of reservation to be able perform a No Show transaction later.

#### Types of MIT

**A Merchant Initiated Transaction is one whose action field is one of PREAUTH, SALE or VERIFY and whose type is one of 2 (MOTO) or 9 (CA) depending on the category.**

To indicate the type of MIT, send the `rtAgreementType` field as one of the following values:
- **~~recurring – subsequent payment as the start of a recurring payment agreement (CA).~~** Not supported by the Hosted Payment Page integration method. To support recurring payments where the cardholder is not involved at all, you will need to carry a separate Direct Integration or an Hosted Payment Fields Integration.
- **~~instalment – subsequent payment as the start of an instalment payment agreement (CA).~~** Not supported by the Hosted Payment Page integration method. To support instalment payments where the cardholder is not involved at all, you will need to carry a separate Direct Integration or an Hosted Payment Fields Integration.
- **unscheduled – subsequent payment not to a fixed schedule (MOTO)** 
- **incremental – subsequent payment to increment initial amount authorised (MOTO)** - Reserved for future use.
- **resubmission – subsequent payment due to failed initial payment (MOTO)** 
- **reauthorisation – subsequent payment to refresh expired initial payment (MOTO)** 
- **delayedcharges – subsequent payment for additional charges (MOTO)** 
- **noshow – subsequent payment as penalty for missed reservation (MOTO)** 

:::warning 
`unscheduled`, `resubmission`, `reauthorisation`, `delayedcharges` and `noshow` are only partially supported by the Hosted Payment Page integration method. For Hosted Payment Pages, the cardholder will always need to provide the CVV of the card when processing those types of payments. To support payments where the cardholder is not involved at all, you will need to carry a separate Direct Integration or an Hosted Payment Fields Integration.
::: 


The `xref` of the initial Consumer Initiated Transaction, or previous Merchant Initiated Transaction must be provided as follows:
- For standing order MITs the initial authorisation must have been a successful Consumer Initiated Transaction with Credentials on File. This MIT will be a subsequent use of those Credentials on File. For recurring and instalment MITs the initial authorisation must have used the same `rtAgreementType`. The xref can be to the previous MIT in which case the Gateway will follow the chain of transactions back to the initial CIT. An xref is only valid for 13 months and so there cannot be longer between recurring payments, however the Card Scheme or Acquirer may impose a shorter period.

- For industry practice MITs the initial authorisation must be successful (apart from for a resubmission) but need not have Credentials on File. For example, it may not be known at the time of the initial authorisation that the MIT would be required and so the initial authorisation would not necessarily have stored the Credentials on File. This is an example of when an industry practice Merchant Initiated Transaction does not require a stored credential
Note: For compatibility with existing practices, Instalment Payments and Recurring Payments MITs use Continuous Authority (CA) type transactions while other MITs Mail Order/Telephone Order (MOTO) type transactions. This use of MOTO is different to its use with a Consumer Initiated Transaction (CIT).


### Request Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| xref | <span class="badge badge--primary">Yes</span> | Reference to initial CIT or previous MIT transaction.|
| type | <span class="badge badge--primary">Yes</span> | The type of transaction.<br></br><br></br> Possible values are:<br></br> 1 – E-commerce (ECOM) (CIT).<br></br> 2 – Mail Order/Telephone Order (MOTO (CIT).<br></br> <br></br> Required differentiate between initial and subsequent recurring or instalment transaction.|
| rtAgreementType | <span class="badge badge--primary">Yes</span> | Consumer/Merchant agreement type.<br></br><br></br> Possible values are: <br></br>cardonfile – credential storage agreed (CIT/MIT).<br></br> unscheduled – ad hoc COF payment (MIT). <br></br>incremental – authorisation amount increment (MIT) - reserved for future use <br></br>resubmission – failed authorisation retry (MIT).<br></br> reauthorisation – expired authorisation refresh (MIT). <br></br>delayedcharges – post authorisation charges (MIT).<br></br> noshow – missed reservation penalty (MIT).<br></br><br></br>Not required on the initial transaction for a subsequent Industry-Specific Business Practice MIT to be used.|
| initiator | No | Indicate who initiated the transaction.<br></br><br></br> Possible values are: <br></br>consumer – consumer initiated (CIT) <br></br>merchant – merchant initiated (MIT)<br></br><br></br> If not provided the Gateway will attempt to determine the initiator from the other request values.|

For backwards compatibility, the Gateway will try to automatically identify if a transaction is CIT or MIT from the values provided for the `action`, `type` and `rtAgreementType` fields.

You may also pass the `initiator` field in the request to force a classification. This can be used if the Gateway is unable to correctly classify the transaction. If, however, the requested classification is incompatible with the provided request fields then the transaction will fail with a `   ` of 66944 (INVALID INITIATOR).

The `initiator` field will be returned in the response with either the value passed in the request or the automatically identified value.

### Credentials on File Matrix {#credentialsOnFileMatrix}

| Scenario | CIT/MIT | CNP | COF | SCA (3D Secure) | initiator | type | rtAgreementType | xref |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| Cardholder opts to store their card details on Merchant's website. | CIT | ECOMMERCE | initial | Required | consumer | 1 | cardonfile  | Optional for cloning |
| Cardholder opts to store their card details provided to Merchant via mail or telephone. | CIT | MOTO | initial | Exempt | consumer | 2 | cardonfile | Optional for cloning  |
| Cardholder pays using a card they previously stored on the Merchant's website. | CIT | ECOMMERCE | Subsequent | Required | consumer | 1 | cardonfile | Reference to transaction that initially stored the card |
| Cardholder provides their card details to sign up to a subscription on the Merchant's website. | CIT | ECOMMERCE | initial or subsequent | Required  | consumer | 1 | recurring | Optional for cloning or using previous stored card |
| Cardholder provides their card details when agreeing to purchase by instalments on the Merchant's website.| CIT | ECOMMERCE | initial or subsequent |Required| consumer | 1 | instalment | Optional for cloning or using previous stored card  |
| Cardholder provides their card details to sign up to a subscription via mail or telephone to the Merchant. | CIT | MOTO | initial or subsequent | Exempt |consumer | 2 | recurring | Optional for cloning or using previous stored card  |
| Cardholder provides their card details when agreeing to purchase by instalments via mail or telephone to the Merchant. | CIT | MOTO | initial or subsequent | Exempt |  consumer | 2 | instalment |Optional for cloning or using previous stored card|
| ~~Merchant/Gateway takes an automatic subscription payment at the interval agreed to by the Cardholder.~~ | ~~MIT~~ | ~~Continuous Authority~~ | ~~Subsequent~~ | ~~Exempt~~ | ~~merchant~~ | ~~9~~ | ~~recurring~~  | ~~Reference to initial or previous recurring payment~~ |
| ~~Merchant/Gateway makes an automatic instalment payment at the interval agreed to by the Cardholder.~~ | ~~MIT~~ | ~~Continuous Authority~~ | ~~Subsequent~~ |~~Exempt~~ | ~~merchant~~ | ~~9~~| ~~instalment~~  | ~~Reference to initial or previous instalment payment~~ |
| Merchant makes an unscheduled transaction, such as an account top-up, as previously agreed with the Cardholder when they stored their card details. **Partially supported by the Hosted Payment Page integration method.** | MIT | MOTO | Subsequent  | Exempt | merchant | 2 | unscheduled | Reference to transaction that initially stored the card |
| Merchant resubmits a payment where the initial payment was declined due to insufficient funds, but the goods have already been provided to the Cardholder. **Partially supported by the Hosted Payment Page integration method.**  | MIT | MOTO | N/A  | Exempt | merchant | 2 | resubmission | Reference to initial payment that was declined |
| Merchant reauthorises a payment when the completion or fulfilment of the original order or service extends beyond the authorization validity limit set by the Card Scheme. **Partially supported by the Hosted Payment Page integration method.**  | MIT | MOTO | N/A | Exempt | merchant | 2 | reauthorisation | Reference to payment that is to be reauthorised |
| Merchant makes a payment to process a supplemental account charge after original services have been rendered and respective payment has been processed. **Partially supported by the Hosted Payment Page integration method.**  | MIT | MOTO |  | N/A | Exempt | merchant | 2 | Reference to original payment to which the delayed charges relate |
| Merchant makes a payment to charge the Cardholder a penalty according to the merchant’s reservation cancellation policy. **Partially supported by the Hosted Payment Page integration method.**  | MIT | MOTO | N/A | Exempt | merchant | 2 | noshow | Reference to an initial CIT payment or account verification payment made by Cardholder at time of booking |

## Gateway Wallet {#gatewayWallet}

The Gateway supports an internal digital Wallet that is available to all Merchants using the Gateway.

The Gateway allows you to store your Customer’s payment card, billing and delivery address details and other information securely encrypted in its internal Wallet. You can then allow your Customer to select from stored payment cards to check out faster on your website.

Management of this Wallet is done using the Gateway’s REST API. However, you can use the Hosted, Direct or Batch Integrations to perform transactions, using cards and addresses stored in the Wallet; or to store new cards and address used with successful transactions.

#### Benefits 

- Details can be used from or added to the Wallet with just a few extra integration fields.
- Customers can select from previously stored details, making the checkout process more streamlined, resulting in fewer abandoned carts and thus increasing sales.
- Compatible with existing card base fraud solutions such as Address Verification Service (AVS), 3-D Secure and third-party fraud providers.
- There are no extra costs to use the internal Gateway Wallet.
- The Wallet transactions are controlled within the Merchant Management System (MMS) in the same manner as normal card transactions.
- Stored cards are assigned a Card Token which is fully LUHN checkable PAN ending in the same last 4 digits as stored card and thus can be used to replace the PAN in any system that is expecting to store PANs and not arbitrary card identifiers.

#### Limitations 

- The payment details are stored internally by the Gateway and not available for use with other Gateway Merchants or other payment gateways.

### Implementation 

If a transaction is sent to the Hosted Integration, then with the addition of a few extra integration fields, the Customer can be asked whether they wish to save their details in the internal Wallet for future use.

Customers who have payment details already saved will have the option to select from those details rather than having to re-enter them. Customers will also have the option to delete stored details. There is no option to modify stored payment details. However, the Customer can delete them and then restore them.

The details are only saved if the transaction is successful, ensuring that the Wallet is not filled up with invalid payment details.

The details requiring to be stored in the Wallet are validated when the transaction is performed, prior to any authorisation with the Acquirer. If any of the details are invalid, then the transaction will be aborted with a responseCode of 66304 (INVALID_REQUEST) and a `responseMessage` indicating which data could not be stored in the Wallet. Any failure that occurs post authorisation will not abort the transaction but will be available in the appropriate `xxxxStoreResponseCode` response fields.

The `walletOwnerRef` field can be used to assign a unique Customer reference to the Wallet, allowing you to identify which of your Customers owns the Wallet. This could be the Customer reference you use within your own Customer accounts or Shopping Cart software. You must ensure that this value is less than 50 characters, or the transaction will be aborted with a `responseCode` of 65xxx (INVALID_WALLETCUSTOMERREF).

### Request Fields 

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

### Response Fields

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


## Payment Tokenisation {#paymentTokenisation}

All new transactions stored by the Gateway are assigned a unique reference number that is referred to as the cross reference and returned in the `xref` response field. This cross reference is displayed on the Merchant Management System (MMS) and used whenever a reference to a previous transaction is required.

The cross reference can be sent as part of a transaction request, in the `xref` request field, to tell the Gateway to perform an action on an existing transaction. The cross reference can also be sent with new transactions such as PREAUTH and SALE actions, to request that the Gateway uses the values from the existing transaction if they have not been specified in the new request. For more information on how the existing values are used, please refer to the [transaction cloning](annexes#transactionCloning) section. This allows an existing transaction to be effectively repeated without you needing to know the original card number. The only exception to this is the card’s security code (CVV) which the Gateway cannot store, due to PCI DSS restrictions. Accordingly, it will have to be supplied in the new request (unless the new request.

The Gateway will make transaction details available for a maximum period of 13 months, after this time the `xref` to the transaction will be invalid. The card number will be available during this time, but you may request that it is removed sooner. Once the card number has been removed the `xref` can no longer be used to provide the number to a future a transaction.

The way each action handles any supplied `xref` is as follows:

### PREAUTH, SALE, VERIFY requests

These requests will always create a new transaction.

The `xref` field can be provided to reference an existing transaction, which will be used to complete any missing fields in the current transaction. The previous transaction will not be modified. For more information on how the existing values are used, please refer to the [transaction cloning](annexes#transactionCloning) section. If the existing transaction cannot be found, then an error will be returned and recorded against the new transaction.

The request is expected to contain any transaction information required.

The `xref` will only be used to complete any missing card and order details, relieving you from having to store card details and reducing your PCI requirements.

### SALE Referred Authorisation requests

These will always create a new transaction.

The `xref` field must be provided to reference an existing transaction, which must be of the same request type and be in the referred state. A new transaction will be created based upon this transaction. If the existing transaction cannot be found or is not in the referred state, then an error will be returned and recorded against the new transaction.

The new transaction will be put in the approved state and captured when specified by the existing or new transaction details. It will not be sent for authorisation again first.

The request may contain new transaction details, but any card details or order amount must be the same as the existing transaction. Any attempt to send different card details or order details will result in an error.

NB: This usage is very similar to a normal SALE or REFUND request sent with an `authorisationCode` included. The difference is that the `xref` must refer to an existing referred transaction whose full details are used if required and not simply an existing transaction whose card details are used if required.

This means it is not possible to create a pre-authorised SALE or REFUND request and use a xref (ie to use the card and order details from an existing transaction). As a soon as the `xref` field is seen, the Gateway identifies that it is a referred transaction that you wish to authorise.
