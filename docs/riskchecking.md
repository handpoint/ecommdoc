---
sidebar_position: 5
---

# Risk Checking 

## Background

The Gateway is integrated with Kount, the leading solution for digital fraud prevention.

If you have an existing account with Kount, or sign up for one, you can request that the Gateway pass your transactions to them for risk checking before they are sent to the Acquirer for authorisation.

Kount’s patented fraud prevention technology combines device fingerprinting; supervised and unsupervised machine learning; a robust policy and rules engine; business intelligence tools; and a web-based case-management and investigation system.

Their team of experts can help you understand and identify the rules necessary to optimise your protection, as well as provide ongoing support. To get the most out of your investment, you may want to dedicate an individual or a team to monitor your rules and ensure they continue to work as intended.

The risk checking preferences can be configured per Merchant Account within the Merchant Management System (MMS). These preferences can be overridden per transaction by sending new preferences. You must use the Kount management portal to configure your risk parameters and thresholds.

:::tip 
Risk checking is an advanced feature and must be enabled on your Merchant Account before it can be used. Please contact support if you wish to have it enabled.
:::

## Benefits and Limitations

### Benefits
- The results are available immediately and returned as part of the transaction.
- The checks can be managed independently, allowing you the utmost control over how the results are used.
- The checks can be configured to decline the transaction automatically where required.
- Leverage the ability to review transactions and decide what course of action to take.
- The checks can reduce chargebacks by blocking transactions made without the Cardholder’s consent that would have resulted in the Cardholder raising a chargeback to recover the fraudulent transaction amount.
- Providing enhanced risk checking increases Customer confidence and thus increases the likelihood of their making a purchase.
- Fully configurable within the Merchant Management System (MMS).

### Limitations
- Checking cannot prevent all fraudulent transactions and could even prevent some non-fraudulent transactions.
- There are additional fees associated with having a Kount account.
- You will have to spent time analysing your transactions and establishing fraud rules.

## Implementation 

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

## Request Fields {#riskCheckRequestFields}

These fields should be sent in addition to basic request fields detailed in the [transaction types](transactiontypes.md/#transactionRequest) section: 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| riskCheckRequired | No | Is risk checking required for this transaction?<br></br><br></br> Possible values are:<br></br> N – risk checking is not required.<br></br> Y – risk checking is required.<br></br><br></br> This parameter overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| riskCheckPref | No | List of riskCheck response values and the action to be taken for those responses.<br></br><br></br> Value is a comma separated list containing one or more of the following risk check results and associated actions:<br></br> Results: not known, not checked, approve, decline, review, escalate. <br></br>Actions: continue, decline1, decline2, authonly, finished.<br></br><br></br> This parameter overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| riskCheckOptions | No | Record containing options used to customise the risk checking. Refer to the [Risk Check Options](#riskCheckOptions) section for more details.|

### Risk Check Options {#riskCheckOptions}

The following options may be sent in the `riskCheckOptions` field to customise the risk checking. Where possible, the options will be initialised from standard integration fields as shown in brackets below the option name. The options must be formatted using the  [record or serialised record formats](overview#fieldFormats). 

 | Name      | Description | 
| ----------- | ----------- |
| IPAD (remoteAddress) | Customer’s IPv4 address (X.X.X.X). |
| MACK | Merchant’s acknowledgement to ship/process the order (Y or N).|
| SESS| Unique Session ID. Used to link to Kount’s browser device data collector. SESS, the unique session id, is automatically sent from the Kount Device Collector loaded in the Hosted Payment Page.|
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

## Response Fields

These fields should be sent in addition to the [risk check request fields](#riskCheckRequestFields)and the basic response fields detailed in the [transaction types](transactiontypes.md/#transactionResponse) section: 

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| riskCheckEnabled | Always | Is risk checking enabled for this Merchant Account?<br></br><br></br> Possible values are:<br></br> N – Merchant account is not enabled.<br></br> Y – Merchant account is enabled.|
| riskCheck | If checked | The result of the risk check.<br></br><br></br>Possible values are:<br></br> approve – ok, recommend proceed to authorisation. <br></br> decline – probably fraudulent, recommend decline. <br></br> review – possibly fraudulent, recommend review. <br></br> escalate – possibly fraudulent, recommend review.|
| riskCheckDetails | If checked | Record containing the raw response received from Kount minus any sensitive data. |
| riskCheckResponseCode | If checked | Response code for the risk processing stage. |
| riskCheckResponseMessage | If checked | Response message for the risk processing stage. |

