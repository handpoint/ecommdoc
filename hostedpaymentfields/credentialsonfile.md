---
sidebar_position: 5
---

# Credentials on file & Recurring Transactions

## Credentials on File 

You may need to repeat a payment or perform a new payment using payment details previously requested from the Customer and stored by either yourself or the Gateway. These payment details could be stored in previous transaction or in the Gateway wallet. These repeat payments could be one off payments, scheduled recurring payments, or repeats due to authorisation problems or industry requirements. All must be correctly flagged to allow the payment network to process them.

The stored details, or credentials, are termed Credentials on File (COF) and refer to any payment details (including, but not limited to, an account number or payment token) that the Consumer has authorised you to store to perform future transactions without the need for them to enter their payment details again.

These transactions must always be identified with the reason for storing or using the stored credentials and who initiated the transaction – the Consumer (CIT) or the Merchant (MIT).

You may store the credentials and send them with the future transaction, or you may store the details in the [Gateway’s Wallet](#gatewayWallet) or by taking advantage of the [payment tokenisation](#paymentTokenisation) feature of the Gateway. Either way you must tell the Gateway of your intentions, it will not assume that just because you have asked, for example, to store credentials in the Wallet that those are legitimate stored credentials and follow all the requirements laid out below.

If you store credentials on file, then you must:
- Disclose to consumers how those credentials will be used.
- Obtain consumers’ consent to store the credentials.
- Notify consumers when any changes are made to the terms of use.
- Inform the card issuer via a transaction that payment credentials are now stored on file.
- Identify transactions with appropriate `rtAgreementType` when using stored credentials. 
- Perform a PREAUTH, SALE or VERIFY transaction during the initial credential setup.

Note: Credentials stored to complete a single transaction (or a single purchase) for a Consumer, including multiple authorisations related to that particular transaction or future refunds are not considered stored credentials and can be stored and used without following the above rules.

Note: A new recurring transaction will be a clone of the cross-referenced transaction, including any stored credentials details except for any new data provided in the new transaction. If the new transaction provided different payment details, then any stored credentials in the cross-referenced transaction cannot be used. The `cloneFields` request field can also be used to control which fields in the cross-referenced transaction are used in the repeat transaction (refer to [Transaction Cloning](annexes#transactionCloning)).

### Consumer Initiated Transactions (CIT)

Consumer Initiated Transactions (CIT) are any transaction where the Consumer is actively participating in the transaction. This can be either through a checkout experience online, via a mail order or telephone order, with or without the use of an existing stored credential.

**A Consumer Initiated Transaction is one whose action field is one of PREAUTH, SALE or VERIFY and whose type is one of 1 (ECOM) or 2 (MOTO).**

To indicate that the card details are to be stored as, or were stored as, Credentials on File then send the `rtAgreementType` field as one of the following values:
- cardonfile – card details stored as Credential on File
- recurring – initial payment as the start of a recurring payment agreement.
- instalment – initial payment as the start of an instalment payment agreement.

If the card details are cloned from an existing transaction or loaded from a Gateway Wallet which also stored the Credentials on File, then the transaction will be flagged as subsequent use of stored credentials rather than first use of them.

If the transaction is the first in a recurring or instalment sequence then the optional `rtSequenceCount` field can be used to specify how many transactions will be taken in total, with a value greater than 1, and any optional `rtSequenceNumber` field specifying which transaction it is in the sequence will be expected to have a value of 0.

### Merchant Initiated Transactions (MIT) {#mit}

Merchant Initiated Transactions (MIT) are any transaction where you have performed the transaction without the active participation of the Consumer. This would normally always be as a follow-up to a previous Consumer Initiated Transaction (CIT). The Gateway can be instructed to take Merchant Initiated recurring transactions automatically, according to a pre-determined schedule. Merchant Initiated Transactions are broken down in to two categories as follows.

#### Standing Instruction MITs 

Merchant Initiated Transactions defined under this category are performed to address pre-agreed standing instructions from the Consumer for the provision of goods or services.

The following transaction types are standing instructions transactions:
- Instalment Payments: A transaction in a series of transactions that use a stored credential and that represent Consumer agreement for the merchant to initiate one or more future transactions over a period for a single purchase of goods or services. An example of such a transaction is a higher purchase repayment.
- Recurring Payments: A transaction in a series of transactions that use a stored credential and that are processed at fixed, regular intervals (not to exceed one year between transactions), representing Consumer agreement for the merchant to initiate future transactions for the purchase of goods or services provided at regular intervals. An example of such a transaction is a gym membership subscription.
- Unscheduled Credential on File (UCOF): A transaction using a stored credential for a fixed or variable amount that does not occur on a scheduled or regularly occurring transaction date, where the Consumer has provided consent for the merchant to initiate one or more future transactions. An example of such a transaction is an account auto-top up transaction.

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

### Request Fields 

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
| Merchant/Gateway takes an automatic subscription payment at the interval agreed to by the Cardholder. | MIT | Continuous Authority | Subsequent | Exempt | merchant | 9 | recurring  | Reference to initial or previous recurring payment |
| Merchant/Gateway makes an automatic instalment payment at the interval agreed to by the Cardholder. | MIT | Continuous Authority | Subsequent |Exempt | merchant | 9 | instalment  | Reference to initial or previous instalment payment |
| Merchant makes an unscheduled transaction, such as an account top-up, as previously agreed with the Cardholder when they stored their card details. | MIT | MOTO | Subsequent  | Exempt | merchant | 2 | unscheduled | Reference to transaction that initially stored the card |
| Merchant resubmits a payment where the initial payment was declined due to insufficient funds, but the goods have already been provided to the Cardholder. | MIT | MOTO | N/A  | Exempt | merchant | 2 | resubmission | Reference to initial payment that was declined |
| Merchant reauthorises a payment when the completion or fulfilment of the original order or service extends beyond the authorization validity limit set by the Card Scheme. | MIT | MOTO | N/A | Exempt | merchant | 2 | reauthorisation | Reference to payment that is to be reauthorised |
| Merchant makes a payment to process a supplemental account charge after original services have been rendered and respective payment has been processed. | MIT | MOTO |  | N/A | Exempt | merchant | 2 | Reference to original payment to which the delayed charges relate |
| Merchant makes a payment to charge the Cardholder a penalty according to the merchant’s reservation cancellation policy. | MIT | MOTO | N/A | Exempt | merchant | 2 | noshow | Reference to an initial CIT payment or account verification payment made by Cardholder at time of booking |

## Recurring Transaction Agreements {#recurringtransactionagreements}

A Recurring Transaction Agreement (RTA) is used to request that the Gateway should perform repeat payments on your behalf, using pre-agreed amounts and schedules.

An RTA can be configured easily and quickly, using the Merchant Management System (MMS). An RTA can also be set up while performing the initial transaction request, by including the integration [RTA request fields](#rtaRequestFields). The RTA is only set up in the transaction results in a successful payment authorisation.
The initial transaction should be either SALE or VERIFY transaction and the `rtAgreementType` field should be provided to indicate whether the transactions are part of a recurring or instalment.

Merchants who use this system to implement billing or subscription type payments must use recurring or instalment type Continuous Authority (CA) transactions to comply with Card Payment Scheme practices. Your Acquirer may refuse to accept the recurring transactions if they are not subject to an agreement between yourself and your Customer.

The maximum period between recurring transactions is 13 months, however individual Acquirers may impose a shorter period.

Refer to the [Credentials on File](credentialsonfile) section for more information on the different types of repeat or recurring transactions.

### Scheduling

There are two different types of scheduling available when requesting the Gateway to take recurring transactions automatically on the Merchant’s behalf. In addition, a start date can be provided to allow for a recurring subscription with an initial free trial period.

#### Fixed Scheduling 

Fixed scheduling causes the subsequent transaction to be taken at fixed intervals of time and for fixed amounts. A different initial date and amount or final date and amount can be provided for use when the agreed payment term or amount doesn’t exactly divide by the fixed time intervals.

Fixed scheduling is specified by providing an `rtScheduleType` field with a value of ‘fixed’ and providing the `rtCycleDuration`, `rtCycleAmount` and `rtCycleCount` fields to define the interval at which transactions should be taken and the number of transactions to take.

An `rtCycleCount` field value of 0 can be provided to indicate that transactions should be taken ad-infinitum until the RTA is stopped.

#### Variable Scheduling {#variableScheduling}

Variable scheduling causes the subsequent transaction to be taken on prespecified dates and for prespecified amounts.

Variable scheduling is specified by providing an `rtScheduleType` field with a value of ‘variable’ and providing the `rtSchedule` field with a value containing an array of one or more schedule records.

Each schedule record must contain the following fields:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| date | <span class="badge badge--primary">Yes</span> | Date on which to take a payment.|
| amount | <span class="badge badge--primary">Yes</span> | Amount to take on the provided date.|

The schedule records should be passed in a sequential array of records, either as nested records or serialised records as described in the [format guide](overview#fieldFormats). The record field names are case sensitive.

### Request Fields {#rtaRequestFields}

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| rtName | No| Free format short name for the agreement.|
| rtDescription | No| Free format longer description for the agreement.|
| rtPolicyRef | No| Merchant Policy Reference Number (MPRN).|
| rtAgreementType | No| Recurring transaction agreement type. Indicates the type of Continuous Payment Authority or Repeat Billing agreement made with the Cardholder.<br></br><br></br> Possible values are:<br></br> recurring – recurring type CPA agreed.<br></br> instalment – instalment type CPA agreed.|
| rtMerchantID | No| Merchant Account ID to use for the recurring transactions (defaults to merchantID).|
| rtStartDate | No| Start date of agreement (defaults to date received).|
| rtScheduleType | No| Schedule type. <br></br><br></br>Possible values are: <br></br>fixed – fixed interval schedule (default). <br></br>variable – variable interval schedule.|
| rtSchedule | <span class="badge badge--primary">Yes</span>| Nested array or serialised string containing payment schedule information as per the [variable scheduling](#variableScheduling) section.<br></br><br></br>For use with variable schedules only.|
| rtInitialDate | No| Date of initial payment (defaults to `rtStartDate`).<br></br><br></br>For use with fixed schedules only.|
| rtInitialAmount | No| Amount of initial payment (defaults to `rtCycleAmount`).<br></br><br></br>For use with fixed schedules only.|
| rtFinalDate | No| Date of final payment.<br></br><br></br>For use with fixed schedules only.|
| rtFinalAmount | No| Amount of final payment (defaults to `rtCycleAmount`).<br></br><br></br>For use with fixed schedules only.|
| rtCycleAmount | No| Amount per cycle (defaults to `amount`).<br></br><br></br>For use with fixed schedules only.|
| rtCycleDuration | <span class="badge badge--primary">Yes</span>| Length of each cycle in `rtCycleDurationUnit` units.<br></br><br></br>For use with fixed schedules only.|
| rtCycleDurationUnit | <span class="badge badge--primary">Yes</span>| Cycle duration unit. One of: day, week, month or year.<br></br><br></br>For use with fixed schedules only.|
| rtCycleCount | <span class="badge badge--primary">Yes</span>| Number of cycles to repeat (zero to repeat forever).<br></br><br></br>For use with fixed schedules only.|
| rtMerchantData | No| Free format Merchant data field.|
| rtCloneFields | No| Fields to clone from one recurring transaction to the next. Refer to [Transaction Cloning](annexes#transactionCloning)|

### Response Fields

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| rtID | Always| Recurring Transaction Agreement ID.|
| rtResponseCode | Always| Result of setting up RT Agreement.Refer to [Response Codes](annexes#responseCodes) for details. |
| rtResponseMessage | Always| Description of above response code.|


## Quering RTA

You might have to check the status of the last transaction or when the next payment will be. We have at your disposal an API to be able to consult all the information related to the RTA (Recurring Transactions Agreements).

### HTTP Authentication

You will need the following information to integrate with Gateway’s REST interface.

| Name      |  Description |
| ----------- | ----------- | 
| User Account | Access to the REST interface requires a valid user account. You should have received these details when your account was set up.|
| Integration URL |  https://commerce-api.handpoint.com/rest/ |


Each request must contain authentication data. The normal method of authentication is to send your username and password in a ‘Authorization’ request header using the HTTP Basic Auth authorization scheme. This can sometimes be easily achieved by using the ‘username:password’ addition to the base integration URL (eg. `https://username:password@commerce-api.handpoint.com/rest/...`).

Each successfully authenticated request will also return a `x-p3-token` response header which contains an authentication token. This token may be used to authenticate further requests by sending it in an `Authorization` header using the scheme name `x-p3-token` or in an `x-p3-token` header (as received). Each time you send in a token a new one is returned. Each returned token is valid for 1 hour.

To aid where custom authorization header schemes or custom headers cannot easily be sent or when manually typing the URL into a browser for testing etc. the token can also be sent using the HTTP Basic Auth authorization scheme by specifying a username of `__token__` and then sending the tokens value as the password (the keyword is “token” surrounded by a double underscore “__”).
The following HTTP headers passing the token are therefore identical;

```
x-p3-token: <token>
authorization: x-p3-token <token>
authorization: basic <base64token>
```

Where `<base64token>` is the string `__token__:<token>` base64 encoded, and `<token>` is the actual authentication token.

Recurring Transactions Agreement request example:
```curl
curl --location --request GET 'https://YourUser:P4$$w00rd@commerce-api.handpoint.com/rest/rtagreements/'
```


### RTAgreements Resources

The RtAgreements resource contains information about all past, present and future RT agreements.

RtAgreements resources are child resources to the Customers resource they belong to.

An RtAgreements resource consists of the following fields;


|Field Name      |  Description |Field Name      |  Description |
| ----------- | ----------- | ----------- | ----------- | 
|**id** |Primary unique resource key| **policyRef**| Recurring Transaction Policy Reference|
|**pid** |Id of parent Customer resource| **startDate**| Agreement start date (YYYY-MM-DD)
|**type** |Type of resource (always ‘addons’)|**transactionUnique** |Unique reference per transaction
|**ptype** |Type of parent resource (always ‘customers’)|**method** |Method (ECOM, MOTO or CA)
|**Uri** |URI of resource| **initialDate**|Initial payment date (YYYY-MM-DD)
|**puri**| URI of parent Customer resource|**initialAmount**| Initial payment amount (YYYY-MM-DD)
|**path** |Hierarchical path to resource| **finalDate**| Final payment date (YYYY-MM-DD)
|**text**| Short textual description of the resource|**finalAmount**| Final payment amount (YYYY-MM-DD)
|**rtAgreementID**| Primary unique resource key (same as ‘id’)|**cycleAmount**| Cost per billing cycle
|**rtAgreementUri**| URI of resource (same as ‘uri’)|**cycleDuration** | Plan cycle duration
|**rtAgreementName**| Name of agreement|**cycleDurationUnit**| Plan cycle duration unit. One of ‘day’, ‘week’, ‘month’, ‘year’
|**customerID**|Id of parent/ancestor Customer resource|**cycleCount** | Number of cycles plan last for
|**customerUri** |URI of parent/ancestor Customer resource|**cycleRemainingCount**|Number of cycles remaining in the current agreement
|**customerName** |Name of parent/ancestor Customer resource| **currencyCode** |Currency the ‘amount’ are in (ISO 3 letter code, ie ‘GBP’)
|**resellerID** |Id of ancestor Reseller resource| **currencyName**| Descriptive name of the currency
|**resellerUri** |URI of ancestor Reseller resource| **currencySymbol**|Symbol for the currency
|**resellerName**| Name of ancestor Reseller resource| **currencyExponent**| Exponent for the currency
|**merchantID** |Id of Merchants Resource used to take payments|**currentCycleStartDate**| Start date of the current cycle
|**merchantName**| Name Merchants Resource used to take payments|**currentCycleEndDate** |End date of the current cycle
|**merchantUri**| Uri of Merchants Resource used to take payments| **lastTrasactionID** |ID of last recurring transaction
|**cardID** |Id of Cards resource used to take payments| **lastTransactionUri**| URI of last recurring transaction was sent
|**cardName**| Name of Cards resource used to take payments|**lastTransactionXref**| Cross reference of last recurring transaction (and used as xref of next transaction)
|**cardUri** |Uri of Cards resource used to take payments| **lastTransactionDate**| Date the last recurring transaction was sent
|**walletID**| Id of Cards resource’s parent Wallets resource| **paymentFailCount**| Number of times recurring transaction has been retried
|**walletName** |Name of Cards resource’s parent Wallets resource| **paymentFailMaxRetries**|  Number of times recurring transaction will be retried before giving up.
|**walletUri**| Uri of Cards resource’s parent Wallets resource| **rtusEnabled** | Recurring Transaction Update Service enabled. If enabled the card details will be checked for updates in card number and expiry date.
|**description**| Description of the agreement|**rtusMerchantID** |Id of Merchants Resource used to make RTUS enquiries
|**baseTrasactionID**|Transaction id of base Transaction resource|**rtusMerchantUri**| Uri of Merchants Resource used to make RTUS enquiries
|**baseTransactionUri**| URI of base Transaction resource|**rtusMerchantName**|Name Merchants Resource used to make RTUS enquiries
|**baseTransactionXref** |Cross reference of base Transaction resource|**merchantData** |Free format data (for merchants use)
|**baseTransactionDate**|Date the base Transaction was sent|**state**| State of the agreement. One of ‘pending’, ‘running’, ‘pastdue’, ‘expired’, ‘stopped’ or ‘aborted’
|**responseCode** |Response code of last recurring transaction|**createTime**| Time the resource was created (UTC)| 
|**responseMsg** |Response message of last recurring transaction|**modifyTime** |Time the resource was modified (UTC)| 
|**transactionCnt** |Number of transactions made as part of this Subscription|**status** |Resource status ‘active’ or ‘inactive’|
|**transactionsUri** |Uri to Transactions resource collection contain transactions made as part of this Subscription |**perms**| Resource permissions (to this resource) for the authenticated user

### RTUS Enquiries Resources

The RtusEnquiries resource contains information about payment cards that should be submitted on behalf of a Merchant in the next Recurring Transaction Update Service enquiry. This service will query the card scheme for changes in the card number and expiry date and if any recurring transactions should be stopped on the card.

Wallet stored Cards can automatically be included in the next RTUS enquiry by setting their ‘rtusEnabled’ property, they will not be shown in the RtusEnquiries resource.
Likewise Wallet Cards stored used as payment for subscriptions will automatically be included.
RtusEnquiries resources are child resources to the Merchants resource they belong to.

A RtusEnquiries resource consists of the following fields:

|Field Name      |  Description |Field Name      |  Description |
| ----------- | ----------- | ----------- | ----------- | 
|**id** |Primary unique resource key| **resellerID**| Id of ancestor Reseller resource
|**pid** |Id of parent Customer resource| **resellerUri** | URI of ancestor Reseller resource
|**type** |Type of resource (always 'rtusenquiries')|**resellerName**|  Name of ancestor Reseller resource
|**ptype** |Type of parent resource (always ‘customers’)|**cardsCsv**| Card records in CSV format (see below)
|**Uri** |URI of resource| **cards**|  Card records in native format (see below)
|**puri**| URI of parent Customer resource|**totalCount**| Total number of cards included in this enquiry
|**path** |Hierarchical path to resource| **completedCount**| Number of cards whose status has been checked
|**text**| Short textual description of the resource|**ompletedPercent**| Percentage of cards whose status has been checked
|**rtusEnquiryID**| Primary unique resource key (same as ‘id’)|**updatedCount**| Number of cards whose details have been updated
|**rtusEnquiryUri**| URI of resource (same as ‘uri’)|**updatedPercent**| Percentage of cards whose details have been updated
|**merchantID** |Id of parent Merchant resource| **createTimeTime**| the resource was created (UTC)
|**merchantUrl** |URI of parent Merchant resource|**modifyTime**| Time the resource was modified (UTC)
|**merchantName**| Name of parent Merchant resource|**perms** |Resource permissions (to this resource) for the authenticated user
|**customerID**| Id of ancestor Customer resource|**customerUri**| URI of ancestor Customer resource|
|**customerName**| Name of ancestor Customer resource|



#### RtusEnquiries.CardsCsv Property

The payment cards can be included in the RtusEnquiries resource using the cards property or the cardsCsv property. The cardsCsv property expects a single string of data containing the contents of the CSV file used to upload/download the card details in the Merchant Management System (MMS).
The string should contain one or more CSV records separated by a new line character. The records should contain the following cells:

| Cell Number      |  Description |
| ----------- | ----------- | 
| 1 | Version identifier (always ‘C1.1’)|
| 2 | Card number (full PAN – 13-19 digits)|
| 3 | Card expiry date [MMYY]|
| 4 | Recurring Transaction (RT) Policy Ref [up to 20 characters] (optional)|
| 5 | Recurring Transaction (RT) Frequency [0-8] (optional)|
| 6 | Currency Code [180-4217 3 letter currency code] (optional)|
| 7 | Next transaction amount [11 digits implied 2 decimals] (optional)|
| 8 | Next transaction date [YYYY-MM-DD] (optional)|
| 9 | Originators data (free format)|
| 11 | New Card Number (if updated)|
| 12 | New Expiry Number [MMYY] (if updated)|
| 13 | Gateway response code (if updated)|
| 14 | Gateway response message (if updated)|





#### RtusEnquiries.Cards Property

The payment cards can be included in the RtusEnquiries resource using the cards property or the cardsCsv property. The cards property expects an array of card records. This is the more natural format for the interface as it allows a simple nested array type format..
The cards array should contain records with the follow fields:

| Field Name     |  Description |
| ----------- | ----------- | 
| number | Version identifier (always ‘C1.1’)|
| expiryDate | Card number (full PAN – 13-19 digits)|
|policyRef |Recurring Transaction (RT) Policy Ref [up to 20 characters] (optional)|
|transasctionFrequency |Recurring Transaction (RT) Frequency [0-8] (optional)|
|currencyCode | ISO-4217 3 character currency code|
|currencyName |ISO-4217 currency name|
|currencySymbol| ISO-4217 currency symbol|
|currencyCode| Currency Code [180-4217 3 letter currency code] (optional)|
|nextTranasctionAmount| Next transaction amount [11 digits implied 2 decimals] (optional)|
|nextTransactionDate| Next transaction date [YYYY-MM-DD] (optional)|
|data |Originators data (free format)|
|newNumber |New Card Number (if updated)|
|newExpiryDate| New Expiry Number [MMYY]2 (if updated)|
|responseCode| Gateway response code (if updated)|
|responseMessage| Gateway response message (if updated)|


### RTUS Files Resources

The RtusFiles resource contains information about communications with an Acquirer’s Recurring Transaction Update Service.
This is a read only resource, the REST interface cannot be used to modify these resources.

RtusFiles resources are root resources and have no parent or child resources. A RtusFiles resource consists of the following fields:

| Field Name     |  Description |
| ----------- | ----------- | 
|id |Primary unique resource key|
|pid|Id of parent resource (always blank)|
|type |Type of resource (always ‘rtusfiles’)|
|ptype| Type of parent resource (always blank)|
|Uri| URI of resource|
|puri| URI of parent Wallet resource|
|path| Hierarchical path to resource|
|text| Short textual description of the resource|
|rtusFileID| Primary unique resource key (same as ‘id’)|
|rtusFileUri| URI of resource (same as ‘uri’)|
|rtusFileName| Name of resource|
|processorID| Id of associated Processor resource|
|processorUrl| URI of associated Processor resource|
|processorName| Name of associated Processor resource|
|date| Date the communications started|
|totalValue| Value of all amounts included|
|totalCount| Number of card enquiries included|
|updatedCount| Number of cards updated|
|outSentTime| Time the output file was successfully sent to the Acquirer|
|ackRecvTime| Time the acknowledgement file was received|
|rspRecvTime| Time the response file was received|
|dependentOnFileID |Id of RtusFile resource this one is dependent on|
|dependentOnFileUri| URI of RtusFile resource this one is dependent on|
|dependentOnFileName| Name of RtusFile resource this one is dependent on|
|dependentOnFileState |State of RtusFile resource this one is dependent on|
|state| Processing state (one of ‘out’, ‘ack’, ‘rep’, ‘fin’ or ‘err’)|
|responseCode |Response code of last processing stage|
|responseMessage| Response message for above responseCode|
|createTime |Time the resource was created (UTC)|
|modifyTime| Time the resource was modified (UTC)|
|perms| Resource permissions (to this resource) for the authenticated user|


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

If a transaction is sent to the Direct Integration, then with the addition of a few extra integration fields, it can be instructed to use payment details stored in the Wallet and/or store the used payment details.

Using stored payment details is similar to performing cross-referenced transactions where the payment details are cloned from a previous transaction. However, in this case the payment details are taken from the Wallet and not a previous transaction.

The details are only saved if the transaction is successful, ensuring that the Wallet is not filled up with invalid payment details.

The details requiring to be stored in the Wallet are validated when the transaction is performed prior to any authorisation with the Acquirer. If any of the details are invalid, then the transaction will be aborted with a `responseCode` of 66304 (INVALID_REQUEST) and a `responseMessage` indicating which data could not be stored in the Wallet. Any failure that occurs post authorisation will not abort the transaction but will be available in the appropriate `xxxxStoreResponseCode` response fields.

The `walletOwnerRef` field can be used to assign a unique Customer reference to the Wallet allowing you to identify which of your Customers owns the Wallet. This could be the Customer reference you use within your own Customer accounts or Shopping Cart software. You must ensure that this value is less than 50 characters, or the transaction will be aborted with a `responseCode` of 65xxx (INVALID_WALLETCUSTOMERREF).

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

The cross reference can be sent as part of a transaction request, in the `xref` request field, to tell the Gateway to perform an action on an existing transaction. This is usually for management actions such as CANCEL or CAPTURE.

The cross reference can also be sent with new transactions such as PREAUTH, SALE, and REFUND actions, to request that the Gateway uses the values from the existing transaction if they have not been specified in the new request. For more information on how the existing values are used, please refer to the [transaction cloning](annexes#transactionCloning) section. This allows an existing transaction to be effectively repeated without you needing to know the original card number. The only exception to this is the card’s security code (CVV) which the Gateway cannot store, due to PCI DSS restrictions. Accordingly, it will have to be supplied in the new request (unless the new request is a Continuous Authority transaction, refer to the [continuous authority](transactiontypes#continuousAuthority) section.

The use of cross references to perform repeat transactions is referred to as Payment Tokenisation and should not be confused with Card Tokenisation which is a separate service offered by the Gateway.

Refer to the [credentials on file](credentialsonfile) section for details on how to instruct the Gateway to repeat a payment automatically.

The Gateway will make transaction details available for a maximum period of 13 months, after this time the `xref` to the transaction will be invalid. The card number will be available during this time, but you may request that it is removed sooner. Once the card number has been removed the `xref` can no longer be used to provide the number to a future a transaction.

The way each action handles any supplied `xref` is as follows:

### PREAUTH, SALE, REFUND, VERIFY requests

These requests will always create a new transaction.

The `xref` field can be provided to reference an existing transaction, which will be used to complete any missing fields in the current transaction. The previous transaction will not be modified. For more information on how the existing values are used, please refer to the [transaction cloning](annexes#transactionCloning) section. If the existing transaction cannot be found, then an error will be returned and recorded against the new transaction.

The request is expected to contain any transaction information required.

The `xref` will only be used to complete any missing card and order details, relieving you from having to store card details and reducing your PCI requirements.

### REFUND_SALE requests

These requests will always create a new transaction.

The `xref` field can be provided to reference an existing transaction that is going to be refunded. This existing transaction will be marked as have been fully or partially refunded and the amounts will be tallied to ensure that you cannot refund more than the original amount of this existing transaction. If the existing transaction cannot be found, then an error will be returned and recorded against the new transaction.

The request is expected to contain any transaction information required.

The `xref` will not only be used to find the transaction to be refunded: additionally, that transaction will be used to complete any missing card and order details, relieving you from having to store card details and reducing your PCI requirements.

### CANCEL or CAPTURE requests

These requests will always modify an existing transaction.

The `xref` field must be provided to reference an existing transaction, which will be modified to the desired state. If the existing transaction cannot be found, then an error is returned but no record of the error will be recorded against any transaction.

The request must not contain any new transaction information any attempt to send any new transaction information will result in an error. The exception is that a CAPTURE request can send in a new lesser `amount` field when a lesser amount, than originally authorised, must be settled.

### QUERY requests

These requests will not create or modify any transaction.

The `xref` field must be provided to reference an existing transaction, which will be returned as if it had just been performed. If the existing transaction cannot be found, then an error is returned but no record of the error will be recorded against any transaction.

The request must not contain any new transaction information and any attempt to send any new transaction information will result in an error.

### SALE or REFUND Referred Authorisation requests

These will always create a new transaction.

The `xref` field must be provided to reference an existing transaction, which must be of the same request type and be in the referred state. A new transaction will be created based upon this transaction. If the existing transaction cannot be found or is not in the referred state, then an error will be returned and recorded against the new transaction.

The new transaction will be put in the approved state and captured when specified by the existing or new transaction details. It will not be sent for authorisation again first.

The request may contain new transaction details, but any card details or order amount must be the same as the existing transaction. Any attempt to send different card details or order details will result in an error.

NB: This usage is very similar to a normal SALE or REFUND request sent with an `authorisationCode` included. The difference is that the `xref` must refer to an existing referred transaction whose full details are used if required and not simply an existing transaction whose card details are used if required.

This means it is not possible to create a pre-authorised SALE or REFUND request and use a xref (ie to use the card and order details from an existing transaction). As a soon as the `xref` field is seen, the Gateway identifies that it is a referred transaction that you wish to authorise.
