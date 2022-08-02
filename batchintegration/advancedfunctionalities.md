---
sidebar_position: 7
---

# Advanced Gateway Functionalities

## AVS/CV2 Checking

AVS and CV2 fraud checking is available on all card transactions processed by the Gateway where supported by the Acquirer. 

These fraud prevention checks are performed by the Acquirer while authorising the transaction. You can choose how to act on the outcome of the check (or even to ignore them altogether).

#### AVS Checking

The Address Verification System (AVS) uses the address details that are provided by the Cardholder to verify that the address is registered to the card being used. The address and postcode are checked separately.

#### CV2 Checking 
CV2, CVV, or Card Verification Value is a 3-digit or 4-digit security code. The check verifies that the code is the correct one for the card used.

For most cards, the CVV is a 3-digit number to the right of the signature strip. For American Express cards, this is a 4-digit number printed, not embossed, on the front right of the card.

The AVS/CV2 checking preferences can be configured per Merchant Account. These preferences can be overridden per transaction by sending one of the preference fields that hold a comma separated list of the check responses that should be allowed in order to continue to completion. Responses not in the list will result in the transaction being declined with a `responseCode` of 5 (AVS/CV2 DECLINED).

#### AVS/CV2 Benefits
-  Can be enabled with just a few extra integration fields.
- The results are available immediately and returned as part of the transaction.
- The checks can be managed independently, allowing you the utmost control over how the results are used.
- The checks can be configured to decline a transaction automatically, where required.
-  There are no extra costs for using AVS/CV2 checking with your transactions.
-  Fully configurable per merchant account.

#### AVS/CV2 Limitations 
- The AVS checks are mainly supported by Visa, MasterCard and American Express in the USA, Canada and United Kingdom. Cardholders with a bank that does not support the checks might receive declines due to the lack of data.
- Because AVS only verifies the numeric portion of the address and postcode, certain anomalies such as apartment numbers and house names can cause false declines.
- The checks are meant for consumer cards. Company cards are not fully supported due to the Acquirers’ not having access to this information.

### Request Fields 

These fields should be sent in addition to basic request fields detailed in the [transaction types](transactiontypes.md/#transactionRequest) section : 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| customerAddress | <span class="badge badge--primary">Yes</span> | For AVS checking, this must be a registered billing address for the card.|
| customerPostCode | <span class="badge badge--primary">Yes</span> | For AVS checking, this must be a registered postcode for the card.  |
| cardCVV | <span class="badge badge--primary">Yes</span> | For CVV checking, this must be the Card Verification Value printed on the card.|
| avscv2CheckRequired | No | Is AVS/CV2 checking required for this transaction? <br></br>Possible values are: <br></br>N – Checking is not required. <br></br>Y – Abort if checking is not enabled.<br></br><br></br> Overrides any Merchant Account setting configured in the backend.|
| cv2CheckPref | No | List of `cv2Check` response values that are to be accepted; any other value will cause the transaction to be declined. Refer to [AVS response codes](annexes#AvsResponseCodes) for more information. Value is a comma separated list containing one or more of the following: not known, not checked, matched, not matched, partially matched.<br></br><br></br> Overrides any Merchant Account setting configured in the backend.|
| addressCheckPref | No | List of `addressCheck` response values that are to be accepted; any other value will cause the transaction to be declined. Refer to [AVS response codes](annexes#AvsResponseCodes) for more information. Value is a comma separated list containing one or more of the following: not known, not checked, matched, not matched, partially matched.<br></br><br></br> Overrides any Merchant Account setting configured in the backend.|
| postcodeCheckPref | No | List of `postcodeCheck` response values that are to be accepted; any other value will cause the transaction to be declined. Refer to [AVS response codes](annexes#AvsResponseCodes) for more information. Value is a comma separated list containing one or more of the following: not known, not checked, matched, not matched, partially matched.<br></br><br></br> Overrides any Merchant Account setting configured in the backend.|

### Response Fields

These fields will be returned in addition to the AVS request fields above and the basic response fields detailed in the [transaction types](transactiontypes.md/#transactionResponse) section : 

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| avscv2CheckEnabled | Always | Is AVS/CV2 checking enabled for this Merchant Account? <br></br>Possible values are: <br></br>N – Merchant account is not enabled. <br></br>Y – Merchant account is enabled.|
| avscv2ResponseCode | If checks performed | The result of the AVS/CV2 check. Refer to [AVS response codes](annexes#AvsResponseCodes) for more information.|
| avscv2ResponseMessage | If checks performed | The message received from the Acquiring bank, or any error message with regards to the AVS/CV2 check. Refer to [AVS response codes](annexes#AvsResponseCodes) for more information.|
| avscv2AuthEntity | If checks performed | Textual description of the AVS/CV2 authorising entity as described in [AVS response codes](annexes#AvsResponseCodes). Possible values are: not known, merchant host, acquirer host, card scheme, issuer.|
| cv2Check | If checks performed | Description of the AVS/CV2 check as described in [AVS response codes](annexes#AvsResponseCodes). Possible values are: not known, not checked, matched, not matched, partially matched.|
| addressCheck | If checks performed | Description of the AVS/CV2 address check as described in [AVS response codes](annexes#AvsResponseCodes). Possible values are: not known, not checked, matched, not matched, partially matched.|
| postcodeCheck | If checks performed | Description of the AVS/CV2 postcode check as described in [AVS response codes](annexes#AvsResponseCodes). Possible values are: not known, not checked, matched, not matched, partially matched.|

## Risk Checking 

The Gateway is integrated with Kount, the leading solution for digital fraud prevention.

If you have an existing account with Kount, or sign up for one, you can request that the Gateway pass your transactions to them for risk checking before they are sent to the Acquirer for authorisation.

Kount’s patented fraud prevention technology combines device fingerprinting; supervised and unsupervised machine learning; a robust policy and rules engine; business intelligence tools; and a web-based case-management and investigation system.

Their team of experts can help you understand and identify the rules necessary to optimise your protection, as well as provide ongoing support. To get the most out of your investment, you may want to dedicate an individual or a team to monitor your rules and ensure they continue to work as intended.

The risk checking preferences can be configured per Merchant Account within the Merchant Management System (MMS). These preferences can be overridden per transaction by sending new preferences. You must use the Kount management portal to configure your risk parameters and thresholds.

:::tip 
Risk checking is an advanced feature and must be enabled on your Merchant Account before it can be used. Please contact support if you wish to have it enabled.
:::

#### Benefits
- The results are available immediately and returned as part of the transaction.
- The checks can be managed independently, allowing you the utmost control over how the results are used.
- The checks can be configured to decline the transaction automatically where required.
- Leverage the ability to review transactions and decide what course of action to take.
- The checks can reduce chargebacks by blocking transactions made without the Cardholder’s consent that would have resulted in the Cardholder raising a chargeback to recover the fraudulent transaction amount.
- Providing enhanced risk checking increases Customer confidence and thus increases the likelihood of their making a purchase.
- Fully configurable within the Merchant Management System (MMS).

#### Limitations
- Checking cannot prevent all fraudulent transactions and could even prevent some non-fraudulent transactions.
- There are additional fees associated with having a Kount account.
- You will have to spent time analysing your transactions and establishing fraud rules.

### Implementation 

When risk checking is required, each transaction will be sent to Kount for checking and the result of the check will be returned in the `riskCheck` response field with one of the following values:
- not known - the checks could not be performed due to our error
- not checked - the checks could not be performed by Kount
- approve - the transaction is not risky and should proceed
- decline - the transaction is risky and should be declined
- review - the transaction is risky but proceed with caution
- escalate - the transaction is risky but proceed with caution

The actions to take for each riskCheck response can be configured for the Merchant Account, using the Merchant Management System. Alternatively, the preferred actions can be passed with the transaction request in the `riskCheckPref` field. The possible actions are as follows:
- continue - continue processing as normal
- authonly - authorise only, don't capture
- decline1 - decline without reason
- decline2 - decline with reason
- finished - abort with reason

The **continue** action allows the transaction to continue as normal and be sent to the Acquirer for authorisation. A `riskCheck` value of **approve** will always be treated as if the action was **continue**, regardless of whether the preferences say otherwise.

The **authonly** action allows the transaction to be authorised but not automatically captured giving you time to review it and decide whether you want to take the risk and capture the transaction or assume it to be fraudulent and cancel it.

The **decline1** and **decline2** actions will cause the transaction to be declined. Both decline the transaction and return with a `responseCode` of **5 (DECLINED)** and a `responseMessage` of ‘DECLINED’ or ‘RISK DECLINED’ respectively. The first action should be used if you don’t wish to alert the Customer to the fact that you suspected that their transaction was fraudulent and declined it for that reason.

The finished action will abort the transaction, causing it to return with a `responseCode` of either **65857 (RISK_CHECK_ERROR)** or **65862 (RISK_CHECK_DECLINED)** depending on whether an error prevented the transaction from being checked by Kount, resulting in a `riskCheck` value of ‘not known’ or ‘not checked’.

The `riskCheckPref` field can be provided in the request to override any settings configured in the Merchant Management System (MMS) for this Merchant Account. The value should be a comma separated list of result=actions pairs. If a result is not specified in the list, then an action of **decline1** is assumed. For example: **”decline=decline1,review=authonly,escalate=authonly”**.

### Request Fields {#riskCheckRequestFields}

These fields should be sent in addition to basic request fields detailed in the [transaction types](transactiontypes.md/#transactionRequest) section: 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| riskCheckRequired | No | Is risk checking required for this transaction?<br></br><br></br> Possible values are:<br></br> N – risk checking is not required.<br></br> Y – risk checking is required.<br></br><br></br> This parameter overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| riskCheckPref | No | List of riskCheck response values and the action to be taken for those responses.<br></br><br></br> Value is a comma separated list containing one or more of the following risk check results and associated actions:<br></br> Results: not known, not checked, approve, decline, review, escalate. <br></br>Actions: continue, decline1, decline2, authonly, finished.<br></br><br></br> This parameter overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| riskCheckOptions | No | Record containing options used to customise the risk checking. Refer to the [Risk Check Options](#riskCheckOptions) section for more details.|

#### Risk Check Options {#riskCheckOptions}

The following options may be sent in the `riskCheckOptions` field to customise the risk checking. Where possible, the options will be initialised from standard integration fields as shown in brackets below the option name. The options must be formatted using the  [record or serialised record formats](overview#fieldFormats). 

 | Name      | Description | 
| ----------- | ----------- |
| IPAD (remoteAddress) | Customer’s IPv4 address (X.X.X.X). |
| MACK | Merchant’s acknowledgement to ship/process the order (Y or N).|
| SESS| Unique Session ID. Used to link to Kount’s browser device data collector.|
| ANID | Automatic Number Identification (ANI) submitted with order. |
| CASH | Total cash amount in currency submitted. |
| ORDR (merchantOrderRef)| Merchant’s Order Number. |
| UNIQ (merchantCustomerRef) | Merchant assigned account number for Customer. |
| EPOC | Date Customer account was created by merchant. |
| NAME (customerName) |Customer’s name (or name submitted with the order).|
| GENDER (customerGender) | Customer’s gender (M or F) |
| BPREMISE (customerCompany) | Customer’s billing address premises name (UK only). |
| BSTREET (customerStreet, customerAddress) | Customer’s billing address street (UK only).|
| B2A1 (customerAddress) | Customer’s billing address county/state. |
| B2A2 (customerAddress2) | Customer’s billing address county/state. |
| B2CI (customerTown) | Customer’s billing address county/state. |
| B2ST (customerCounty) | Customer’s billing address county/state.|
| B2PC (customerPostcode) | Customer’s billing address postcode. |
| B2CC (customerCountryCode) | Customer’s billing address country code. |
| EMAL (customerEmail) | Cardholder’s email address.|
| B2PN (customerPhone) | Cardholder’s phone number. |
| DOB (customerDateOfBirth, recipientDateOfBirth)| Cardholder’s date of birth. |
| S2NM (deliveryName) | Name of person receiving the delivery. |
| SPREMISE (deliveryCompany) | Delivery premises name (UK only). |
| SSTREET (deliveryStreet, deliveryAddress) | Delivery street address (UK only). |
| S2A1 (deliveryAddress) | Delivery address line 1. |
| S2A2 (deliveryAddress2) | Deliver address line 2. |
| S2CI (deliveryTown) | Delivery town/city. |
| S2ST (deliveryCounty)| Delivery county/state. |
| S2PC (deliveryPostcode)| Delivery postcode.|
| S2CC (deliveryCountryCode) | Delivery country code. |
| S2EM (deliveryEmail) | Delivery email address.|
| S2PN (deliveryPhone) | Phone number of delivery location.|
| SHTP (shippingType, shippingMethod) | Shipping type.|
| PROD_TYPE[XX] (items.XX.description) |Type for the XXth item purchased.|
| PROD_ITEM[XX] (items.XX.productCode) |SKU for the XXth item purchased.|
| PROD_DESC[XX] (items.XX.description) |Description XXth item purchased.|
| PROD_QUANT[XX] (items.XX.quantity) | Quantity of XXth item purchased.|
| PROD_PRICE[XX] (items.XX.amount) | Unit amount for XXth item purchased.|
| UDF[XXXX] | User defined field XXXX.|

For further information on the options, refer to the Kount Integration documentation: https://kount.github.io/docs/ris-data-submission/.

### Response Fields

These fields should be sent in addition to the [risk check request fields](#riskCheckRequestFields)and the basic response fields detailed in the [transaction types](transactiontypes.md/#transactionResponse) section: 

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| riskCheckEnabled | Always | Is risk checking enabled for this Merchant Account?<br></br><br></br> Possible values are:<br></br> N – Merchant account is not enabled.<br></br> Y – Merchant account is enabled.|
| riskCheck | If checked | The result of the risk check.<br></br><br></br>Possible values are:<br></br> approve – ok, recommend proceed to authorisation. <br></br> decline – probably fraudulent, recommend decline. <br></br> review – possibly fraudulent, recommend review. <br></br> escalate – possibly fraudulent, recommend review.|
| riskCheckDetails | If checked | Record containing the raw response received from Kount minus any sensitive data. |
| riskCheckResponseCode | If checked | Response code for the risk processing stage. |
| riskCheckResponseMessage | If checked | Response message for the risk processing stage. |

## Payment Facilitators

If you are a Payment Facilitator (PayFac/PF) or Independent Sales Organisation (ISO), then you must send additional fields to identify yourself and your sub-merchants.

These fields must be sent with every new transaction; however, they can be cloned from an existing transaction if using an xref as described in [transaction cloning](annexes#transactionCloning).

### Request Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| facilitatorID | <span class="badge badge--primary">Yes</span> | Your facilitator identifier as assigned by the Scheme.|
| facilitatorName | No | Your trading name as registered with the Scheme.|
| isoID | No | Your ISO identifier as assigned by the Scheme.|
| subMerchantID | No | Unique identifier assigned to this Sub Merchant.|
| merchantXXXX | No | Sub Merchant details as documented in the [merchant request fields](advanceddata#merchantRequestFields).|
| statementNarrativeX | No | Statement details as documented in [dynamic descriptor](#dynamicDescriptor).|

Some of the above fields marked as optional might be mandatory depending on the acquirer you are working with. 

## Financial Institutions Merchants

Every Merchant Account has a category code, also known as the MCC code, attached to it. This category code identifies the market that the payment is related to, allowing issuing banks to identify what product or service is, or was, being provided.

The merchant category code 6012 is related to payments taken for financial institutions, primarily those merchants that deal with loan payments or other credit-related activities. According to Visa, this is the most fraudulent merchant category in the UK market due to compromised debit card details’ being used to pay or transfer balances to other cards. Acquirers are therefore unable to confirm whether a payment is genuine, despite matching the full CVV2 with AVS.

To address this situation, issuing banks have requested additional payment information to be provided with payment requests in order to verify that the cardholder is knowingly entering into a credit-related contractual agreement with the merchant.

If you are a Merchant who has been assigned the MCC 6012 you must collect the following data for the primary recipient for each UK domestic Visa or Mastercard transaction. The additional details are currently only required by Visa and Mastercard however we recommend sending for all card types in order to be prepared for when other card Schemes follow suite.

- Unique account identifier for the loan or outstanding balance funded. For example, the loan account number or the PAN (Primary Account Number) if it is a credit card balance.
-  Last name (family name)
- Date of Birth (D.O.B)
- Postcode

Primary recipients are the entities (people or organisations) that have a direct relationship with the financial institution. Also, these primary recipients have agreed to the terms and conditions of the financial institution.

The new fields are not currently mandatory. However, some Acquirers are now declining transactions that are missing this information and so we recommend the information is always provided, even if your Acquirer doesn’t currently mandate them.

*If you are not a UK MCC 6012 Merchant or the payment is not a UK domestic one, then you need not provide these additional authentication details though the Gateway will accept them if you do.*

### Request Fields 

To comply with the card brand rules, an MCC6012 Merchant must send these additional fields:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| merchantCategoryCode | <span class="badge badge--primary">Yes</span> | Merchant’s VISA MCC (should be 6012).<br></br><br></br>Only required if the Merchants Category Code is not configured on your Gateway account.|
| receiverName | <span class="badge badge--primary">Yes</span> | Surname only - up to 6 letters allowed.|
| receiverAccountNo | <span class="badge badge--primary">Yes</span> | Account number. If a PAN is supplied only the first 6 and last 4 digits will be used.|
| receiverDateOfBirth | <span class="badge badge--primary">Yes</span> | Primary recipient’s date of birth.|
| receiverPostcode | <span class="badge badge--primary">Yes</span> | Primary recipient’s postcode. (Only the district is required but full postcodes are accepted, therefore ‘W12 8QT’ or just ‘W12’ are acceptable values).|

## Billing Descriptor

The Billing Descriptor is how your details appear on the Cardholder’s statement. It is set up with the Acquirer when the Merchant Account is opened. It is used by the Cardholder to identify who a payment was made to on a particular transaction.

Selecting a clear Billing Descriptor is important for you to avoid a chargeback when the Cardholder does not recognise the name on the transaction.

### Static Descriptor 

The Static Descriptor is the descriptor agreed between yourself and your Acquirer when the Merchant Account is opened. The descriptor used is typically your trading name, location and contact phone number.

### Dynamic Descriptor {#dynamicDescriptor}

The Dynamic Descriptor is a descriptor sent with the transaction that includes details on the goods purchased or service provided, this is often used by large companies that provide many services and where the brand of the service is more familiar than the company name. The Dynamic Descriptor usually replaces any Static Descriptor on a per transaction basis.

Not all Acquirers accept Dynamic Descriptors and, for those that do, the required format varies. Often, your Merchant name is shortened to three (3) letters, followed by an asterisk (*), followed by a short description of the service or product that the business provides. This field typically has a limit of twenty-five (25) characters including the phone number.

For more information on whether your Acquirer allows Dynamic Descriptor and the format in which they should be sent, please contact customer support.

#### Request Fields 

The Dynamic Descriptor is built using one or more of the following narrative fields.

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| statementNarrative1 | No | Merchant’s name.|
| statementNarrative2 | No | Product, service or other descriptive info.|


## Surcharges

Surcharges are an additional charge that you can apply to the transactions that are processed through your Merchant Account.

Transactions that are sent for authorisation are subject to processing charges from your Acquirer and surcharges enable you to pass the processing charges that you incur on to your Customers.

You may, for example, be charged a fixed amount for debit card transactions and a percentage amount for credit card transactions. Consequently, the Gateway gives you the option to add both a fixed amount and percentage amount when applying a surcharge.

Surcharges should only be added to cover the processing charges that are incurred by your business. There is no Gateway imposed limit to the value of the surcharges that can be added to your transaction, although there are legal requirements. As a rule, the surcharge must not exceed the processing costs that you pay.

Some businesses apply surcharges to cover all the costs that they incur; while others use the surcharges to subsidise the charges.

:::warning
Surcharge amounts may be limited or illegal in your jurisdiction. For example, surcharging is illegal in the European Union but allowed in most US states. It is up to you to check with your Acquirer and comply with any laws.
:::

:::tip
Surcharges is an advanced feature and must be enabled on the merchant accounts before it can be used. Please contact support if you wish to have it enabled.
:::

### Surcharge Rules {#surchargeRules}

The `surchargeRules` field allows you to provide multiple rules specifying what surcharges should be applied to a transaction. If a transaction matches multiple rules, then the most specific rule will be used; or the first in the list.


Each surcharge rule contains the following fields:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| cardType | <span class="badge badge--primary">Yes</span> | One or more 2-letter card type codes for which this rule applies. The following two card type codes are also supported, in addition to the codes listed in the [card identification](annexes/#cardIdentification) section.<br></br><br></br> CC – matches any credit card.<br></br> DD – matches any debit card.|
| currency | No | Zero or more 3-letter ISO-4217 currency codes.|
| surcharge | <span class="badge badge--primary">Yes</span>  | Surcharge amount in minor (N) or major (N.N) units or a percentage (N%).|

The surcharge rules should be passed in a sequential array of records, either as nested records or serialised records as described in the [format guide](overview#fieldFormats). The record field names are case sensitive.

### Surcharge Amounts 

The Gateway doesn't usually validate that any `amount` and `grossAmount` fields are the same and that any `netAmount`, `taxAmount` and `taxRate` tally. However, in order to update them when a surcharge is applied, the `amount` and `grossAmount` must match and the correct `taxRate` must be provided or be able to be calculated from one or more of the other fields. Failure in this respect can cause the Gateway to return one of the following `responseCode` values; 66360 (INVALID_GROSSAMOUNT), 66361 (INVALID_NETAMOUNT), 66338 (INVALID_TAXAMOUNT), 66362 (INVALID_TAX_RATE).

If the request contains a `surchargeAmount` field, then the Gateway will assume that surcharging has already been performed externally and will not attempt to apply any further surcharges.

### Request Fields {#surchargeRequestFields}

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| surchargeRequired | No | Is surcharging required for this transaction?<br></br><br></br> Possible values are:<br></br> N – Surcharging is not required.<br></br> Y – Surcharging is required.<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| surchargeRules | No | Surcharge rules as documented in [surcharge rules](#surchargeRules).<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| surchargeAmount | No | Surcharge amount already added. A further surcharge will not be added.|

### Response Fields

These fields will be returned in addition to the [surcharge request fields](#surchargeRequestFields) and the [basic response fields](transactiontypes#transactionResponse).

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| surchargeEnabled | Always | Is surcharging enabled on this Merchant Account?|
| surchargeAmount | Always | Surcharge amount added.|
| amount | Always | Original request value with additional surcharge.|
| grossAmount | Conditional | Original request value adjusted for new `amount`.|
| netAmount | Conditional | Original request value adjusted for new `amount`.|
| taxAmount | Conditional | Original request value adjusted for new `amount`.|

## Receipts and Notifications 

The Gateway can be configured to email transaction receipts automatically to the Customer and notifications to the Merchant.

### Customer Email Receipts 

The Customer can be emailed a transaction receipt automatically each time a transaction is processed by the Gateway. Receipts are sent at the time the transaction is authorised and only for transactions where the Acquirer has approved the authorisation. Receipts are not sent for declined or referred authorisations or aborted transactions.

This functionality is enabled globally on a per Merchant Account basis using the Merchant Management System (MMS). This global setting can also be overridden per transaction if required, using the `customerReceiptsRequired` field.

Customer receipts require the Customer to provide an email address; if no email address is provided then no receipt will be sent.

### Merchant Email Notifications 

You can be automatically emailed a transaction notification each time a transaction is processed by the Gateway. Notifications are sent at the time the transaction is authorised and only for transactions where the Acquirer approved, declined or referred the authorisation. Notifications are not sent for aborted transactions.

This functionality is enabled globally on a per Merchant Account basis, using the Merchant Management System (MMS). This global setting can also be overridden per transaction if required, using the `notifyEmailRequired` field.

Merchant notifications require you to provide an email address; if no email address is provided, using the Merchant Management System (MMS) or the `notifyEmail` field, then no notification will be sent.

### Request Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| customerReceiptsRequired | No | Send a Customer receipt if possible.<br></br><br></br> Possible values are:<br></br> N – Don’t send a receipt.<br></br> Y – Send if Customer’s email provided.<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| customerEmail | No | Customer’s email address.|
| notifyEmailRequired | No | Send a notification email if possible.<br></br><br></br> Possible values are:<br></br> N – Don’t send a notification.<br></br> Y – Send if notification email provided.<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| notifyEmail | No | Merchant’s notification email address.<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|

### Response Fields 

The request fields for the required receipts and notifications are returned together with the appropriate fields from the following:

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| customerReceiptsResponseCode | If required | Result of sending email to Customer. Refer to [Response Codes](annexes#responseCodes) for more details.|
| customerReceiptsResponseMessage | If required | Description of above response code.|
| notifyEmailResponseCode | If required | Result of sending email to Merchant. Refer to [Response Codes](annexes#responseCodes) for more details.|
| notifyEmailResponseMessage | If required | Description of above response code.|



