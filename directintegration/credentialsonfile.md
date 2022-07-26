---
sidebar_position: 12
---

# Credentials on file

## Background 

You may need to repeat a payment or perform a new payment using payment details previously requested from the Customer and stored by either yourself or the Gateway. These payment details could be stored in previous transaction or in the Gateway wallet. These repeat payments could be one off payments, scheduled recurring payments, or repeats due to authorisation problems or industry requirements. All must be correctly flagged to allow the payment network to process them.

The stored details, or credentials, are termed Credentials on File (COF) and refer to any payment details (including, but not limited to, an account number or payment token) that the Consumer has authorised you to store to perform future transactions without the need for them to enter their payment details again.

These transactions must always be identified with the reason for storing or using the stored credentials and who initiated the transaction – the Consumer (CIT) or the Merchant (MIT).

You may store the credentials and send them with the future transaction, or you may store the details in the [Gateway’s Wallet](#gatewayWallet) or by taking advantage of the [payment tokenisation](#paymentTokenisation) feature of the Gateway. Either way you must tell the Gateway of your intentions, it will not assume that just because you have asked, for example, to store credentials in the Wallet that those are legitimate stored credentials and follow all the requirements laid out below.

If you store credentials on file, then you must:
- Disclose to consumers how those credentials will be used.
- Obtain consumers’ consent to store the credentials.
- Notify consumers when any changes are made to the terms of use.
- Inform the card issuer via a transaction that payment credentials are now stored on file.
- Identify transactions with appropriate `rtAgreementType` when using stored credentials. • Perform a PREAUTH, SALE or VERIFY transaction during the initial credential setup.

Note: Credentials stored to complete a single transaction (or a single purchase) for a Consumer, including multiple authorisations related to that particular transaction or future refunds are not considered stored credentials and can be stored and used without following the above rules.

Note: A new recurring transaction will be a clone of the cross-referenced transaction, including any stored credentials details except for any new data provided in the new transaction. If the new transaction provided different payment details, then any stored credentials in the cross-referenced transaction cannot be used. The cloneFields request field can also be used to control which fields in the cross-referenced transaction are used in the repeat transaction (refer to [Transaction Cloning](annexes#transactionCloning)).

## Consumer Initiated Transactions (CIT)

Consumer Initiated Transactions (CIT) are any transaction where the Consumer is actively participating in the transaction. This can be either through a checkout experience online, via a mail order or telephone order, with or without the use of an existing stored credential.

**A Consumer Initiated Transaction is one whose action field is one of PREAUTH, SALE or VERIFY and whose type is one of 1 (ECOM) or 2 (MOTO).**

To indicate that the card details are to be stored as, or were stored as, Credentials on File then send the `rtAgreementType` field as one of the following values:
- cardonfile – card details stored as Credential on File
- recurring – initial payment as the start of a recurring payment agreement.
- instalment – initial payment as the start of an instalment payment agreement.

If the card details are cloned from an existing transaction or loaded from a Gateway Wallet which also stored the Credentials on File, then the transaction will be flagged as subsequent use of stored credentials rather than first use of them.

If the transaction is the first in a recurring or instalment sequence then the optional `rtSequenceCount` field can be used to specify how many transactions will be taken in total, with a value greater than 1, and any optional `rtSequenceNumber` field specifying which transaction it is in the sequence will be expected to have a value of 0.

## Merchant Initiated Transactions (MIT)

Merchant Initiated Transactions (MIT) are any transaction where you have performed the transaction without the active participation of the Consumer. This would normally always be as a follow-up to a previous Consumer Initiated Transaction (CIT). The Gateway can be instructed to take Merchant Initiated recurring transactions automatically, according to a pre-determined schedule. Merchant Initiated Transactions are broken down in to two categories as follows.

### Standing Instruction MITs 

Merchant Initiated Transactions defined under this category are performed to address pre-agreed standing instructions from the Consumer for the provision of goods or services.

The following transaction types are standing instructions transactions:
- Instalment Payments: A transaction in a series of transactions that use a stored credential and that represent Consumer agreement for the merchant to initiate one or more future transactions over a period for a single purchase of goods or services. An example of such a transaction is a higher purchase repayment.
- Recurring Payments: A transaction in a series of transactions that use a stored credential and that are processed at fixed, regular intervals (not to exceed one year between transactions), representing Consumer agreement for the merchant to initiate future transactions for the purchase of goods or services provided at regular intervals. An example of such a transaction is a gym membership subscription.
- Unscheduled Credential on File (UCOF): A transaction using a stored credential for a fixed or variable amount that does not occur on a scheduled or regularly occurring transaction date, where the Consumer has provided consent for the merchant to initiate one or more future transactions. An example of such a transaction is an account auto-top up transaction.

The Gateway classifies the first two types of instalment and recurring payments as Continuous Authority (CA) payments and the third type as a normal Cardholder not present payments. Different Acquirers may use different classifications, but the Gateway will handle this and send the classification expected by the Acquirer.

The maximum period between each transaction is 13 months, however individual Card Schemes or Acquirers may impose shorter periods.

### Industry-Specific Business Practice MIT 

Merchant Initiated Transactions defined under this category are performed to fulfil a business practice as a follow-up to an original Consumer-Merchant interaction that could not be completed with one single transaction. Not every industry practice Merchant Initiated Transaction requires a stored credential, for example, if you store card details for a single transaction or a single purchase, it is not considered as a stored credential transaction.

The following transaction types are industry specific transactions:
- Incremental: Incremental authorizations can be used to increase the total amount authorised if the authorised amount is insufficient. An incremental authorization request may also be based on a revised estimate of what the Consumer may spend. The Gateway does not currently support incremental authorisations.
- Resubmission: You can perform a resubmission in cases where it requested an authorization but received a decline due to insufficient funds; however, the goods or services were already delivered to the Consumer. In such scenarios, you can resubmit the request to recover outstanding debt from Consumers.
- Reauthorization: You can initiate a reauthorization when the completion or fulfilment of the original order or service extends beyond the authorization validity limit set by the Card Scheme.
- Delayed Charges: Delayed charges are performed to make a supplemental account charge after original services have been rendered and payment has been processed.
- No Show: Consumers can use their payment credentials to make a guaranteed reservation with certain merchant segments. A guaranteed reservation ensures that the reservation will be honoured and allows you to perform a No Show transaction to charge the Consumer a penalty according to your cancellation policy. If no payment is made to guarantee a reservation, then it is necessary to perform a VERIFY Consumer Initiated Transaction at the time of reservation to be able perform a No Show transaction later.

### Types of MIT

**A Merchant Initiated Transaction is one whose action field is one of PREAUTH, SALE or VERIFY and whose type is one of 2 (MOTO) or 9 (CA) depending on the category.**

To indicate the type of MIT, send the `rtAgreementType` field as one of the following values:
- recurring – subsequent payment as the start of a recurring payment agreement (CA).
- instalment – subsequent payment as the start of an instalment payment agreement (CA).
- unscheduled – subsequent payment not to a fixed schedule (MOTO)
- incremental – subsequent payment to increment initial amount authorised (MOTO)
- resubmission – subsequent payment due to failed initial payment (MOTO)
- reauthorisation – subsequent payment to refresh expired initial payment (MOTO)
- delayedcharges – subsequent payment for additional charges (MOTO)
- noshow – subsequent payment as penalty for missed reservation (MOTO)

In addition, the optional `rtSequenceCount` field can be used to specify how many transactions will be taken in total, with a value greater than 1, and the optional rtSequenceNumber field can be used to specify which transaction this is in the sequence, with a value greater than 0.

The `xref` of the initial Consumer Initiated Transaction, or previous Merchant Initiated Transaction must be provided as follows:
- For standing order MITs the initial authorisation must have been a successful Consumer Initiated Transaction with Credentials on File. This MIT will be a subsequent use of those Credentials on File. For recurring and instalment MITs the initial authorisation must have used the same `rtAgreementType`. The xref can be to the previous MIT in which case the Gateway will follow the chain of transactions back to the initial CIT. An xref is only valid for 13 months and so there cannot be longer between recurring payments, however the Card Scheme or Acquirer may impose a shorter period.

- For industry practice MITs the initial authorisation must be successful (apart from for a resubmission) but need not have Credentials on File. For example, it may not be known at the time of the initial authorisation that the MIT would be required and so the initial authorisation would not necessarily have stored the Credentials on File. This is an example of when an industry practice Merchant Initiated Transaction does not require a stored credential
Note: For compatibility with existing practices, Instalment Payments and Recurring Payments MITs use Continuous Authority (CA) type transactions while other MITs Mail Order/Telephone Order (MOTO) type transactions. This use of MOTO is different to its use with a Consumer Initiated Transaction (CIT).

## Request Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| xref | <span class="badge badge--primary">Yes</span> | Reference to initial CIT or previous MIT transaction.|
| type | <span class="badge badge--primary">Yes</span> | The type of transaction.<br></br><br></br> Possible values are:<br></br> 1 – E-commerce (ECOM) (CIT).<br></br> 2 – Mail Order/Telephone Order (MOTO (CIT).<br></br> 9 – Continuous Authority (CA) (MIT).<br></br> <br></br> Required differentiate between initial and subsequent recurring or instalment transaction.|
| rtAgreementType | <span class="badge badge--primary">Yes</span> | Consumer/Merchant agreement type.<br></br><br></br> Possible values are: <br></br>cardonfile – credential storage agreed (CIT/MIT).<br></br> recurring – recurring type agreed (CIT/MIT). <br></br>instalment – instalment type agreed (CIT/MIT).<br></br> unscheduled – ad hoc COF payment (MIT). <br></br>incremental – authorisation amount increment (MIT). <br></br>resubmission – failed authorisation retry (MIT).<br></br> reauthorisation – expired authorisation refresh (MIT). <br></br>delayedcharges – post authorisation charges (MIT).<br></br> noshow – missed reservation penalty (MIT).<br></br><br></br>Not required on the initial transaction for a subsequent Industry-Specific Business Practice MIT to be used. <br></br><br></br>MIT type incremental is not currently supported but reserved for future use.|
| rtSequenceCount | No | Number of transactions in a recurring sequence if known. <br></br><br></br>Mandatory for some Acquirers, its use is highly recommended with recurring transactions.|
| rtSequenceNumber | No | Transaction number in a recurring sequence if known.|
| initiator | No | Indicate who initiated the transaction.<br></br><br></br> Possible values are: <br></br>consumer – consumer initiated (CIT) <br></br>merchant – merchant initiated (MIT)<br></br><br></br> If not provided the Gateway will attempt to determine the initiator from the other request values.|

For backwards compatibility, the Gateway will try to automatically identify if a transaction is CIT or MIT from the values provided for the `action`, `type` and `rtAgreementType` fields.

You may also pass the `initiator` field in the request to force a classification. This can be used if the Gateway is unable to correctly classify the transaction. If, however, the requested classification is incompatible with the provided request fields then the transaction will fail with a `   ` of 66944 (INVALID INITIATOR).

The `initiator` field will be returned in the response with either the value passed in the request or the automatically identified value.

## Credentials on File Matrix {#credentialsOnFileMatrix}

| Scenario | CIT/MIT | CNP | COF | SCA (3D Secure) | initiator | type | rtAgreementType | xref |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| Cardholder opts to store their card details on Merchant's website. | CIT | ECOMMERCE | initial | Required | consumer | 1 | cardonfile  | Optional for cloning |
| Cardholder opts to store their card details provided to Merchant via mail or telephone. | CIT | MOTO | initial | Exempt | consumer | 2 | cardonfile | Optional for cloning  |
| Cardholder pays using a card they previously stored on the Merchant's website. | CIT | ECOMMERCE | Subsequent | Required | consumer | 1 | cardonfile | Reference to transaction that initially stored the card |
| Cardholder provides their card details to sign up to a subscription on the Merchant's website. | CIT | ECOMMERCE | initial or subsequent | Required  | consumer | 1 | recurring | Optional for cloning or using previous stored card |
| Cardholder provides their card details when agreeing to purchase by instalments on the Merchant's website.| CIT | ECOMMERCE | initial or subsequent |Required| consumer | 1 | instalment | Optional for cloning or using previous stored card  |
| Cardholder provides their card details to sign up to a subscription via mail or telephone to the Merchant. | CIT | MOTO | initial or subsequent | Exempt |consumer | 2 | recurring | Optional for cloning or using previous stored card  |
| Cardholder provides their card details when agreeing to purchase by instalments via mail or telephone to the Merchant. | CIT | MOTO | initial or subsequent | Exempt |  consumer | 2 | instalment |Optional for cloning or using previous stored card|
| Merchant/Gateway takes an automatic subscription payment at the interval agreed to by the Cardholder. | MIT | Continuous Authority | Subsequent | Exempt | merchant | 9 | recurring  | Reference to initial or previous recurring payment |
| Merchant/Gateway makes an automatic instalment payment at the interval agreed to by the Cardholder. | MIT | Continuous Authority | Subsequent |Exempt | merchant | 9 | instalment  | Reference to initial or previous instalment payment |
| Merchant makes an unscheduled transaction, such as an account top-up, as previously agreed with the Cardholder when they stored their card details. | MIT | MOTO | Subsequent  | Exempt | merchant | 2 | unscheduled | Reference to transaction that initially stored the card |
| Merchant resubmits a payment where the initial payment was declined due to insufficient funds, but the goods have already been provided to the Cardholder. | MIT | MOTO | N/A  | Exempt | merchant | 2 | resubmission | Reference to initial payment that was declined |
| Merchant reauthorises a payment when the completion or fulfilment of the original order or service extends beyond the authorization validity limit set by the Card Scheme. | MIT | MOTO | N/A | Exempt | merchant | 2 | reauthorisation | Reference to payment that is to be reauthorised |
| Merchant makes a payment to process a supplemental account charge after original services have been rendered and respective payment has been processed. | MIT | MOTO |  | N/A | Exempt | merchant | 2 | Reference to original payment to which the delayed charges relate |
| Merchant makes a payment to charge the Cardholder a penalty according to the merchant’s reservation cancellation policy. | MIT | MOTO | N/A | Exempt | merchant | 2 | noshow | Reference to an initial CIT payment or account verification payment made by Cardholder at time of booking |