---
sidebar_position: 4
---

# 3D Secure & Strong Customer Authentication (SCA)

## PSD2 SCA Compliance 

Strong Customer Authentication (SCA) is a requirement of the second Payment Services Directive (PSD2) in the European Economic Area (EEA), Monaco, and the United Kingdom. It aims to add extra layers of security to e-commerce payments by requiring banks to perform additional checks when Customers make payments.

PSD2 is for banks, not for merchants. This means that to comply with the law in their home country, banks must refuse non-compliant payments. To avoid the risk of the bank declining your payment, you as a merchant need to ensure that your payments comply with PSD2 SCA regulations.

You can comply by obtaining additional authentication to verify the Customer’s identity or by providing a valid reason for the payment to be exempt from SCA. Any authentication must use a least two of the following three elements:
1. Something the Customer knows (eg password)
2. Something the Customer has (eg phone)
3. Something the Customer is (eg fingerprint)

PSD2 countries are: Austria, Belgium, Bulgaria, Croatia, Republic of Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Ireland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Monaco, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, and the UK.

### Obtaining Strong Customer Authentication 

Strong Customer Authentication applies to Customer entered online transactions (ECOM). Mail Order/Telephone Order (MOTO) transactions and recurring transactions are considered Merchant entered transactions and do not require strong authentication.

Currently, the most common way of authenticating an online card payment is to use 3-D Secure. 3-D Secure is accepted as a means of obtaining Cardholder authentication for the purposes of SCA.

Other card-based payment method such as Apple Pay and some Google Pay payments already support payment flows with a built-in layer of strong authentication (biometric or password). These can be a great way for you to offer a frictionless checkout experience while meeting the new requirements.

We also expect many alternative European payment methods such as PayPal, Amazon Pay, iDEAL, etc. to follow the new SCA rules without any major changes to their user experience.

### SCA Soft-Declines

There are two main types of card transaction declines: hard declines and soft declines.

Hard declines happen when the issuing bank rejects the transaction. Examples include attempting to use a card that has been reported lost or stolen, or the card has expired. Hard declines are permanent, so the payment should not be retried.

Soft declines are temporary authorisation failures. Around 80% to 90% of all declines fall into this category. They occur for a host of reasons including the need to authenticate the Cardholder further or because there are issues with the technical infrastructures that process the transaction. Soft declines are temporary, meaning you can process the transaction again after meeting the requirements that led to the decline the first time around.

If you do not obtain SCA on an eligible payment the issuer may soft decline the payment insisting that SCA be obtained. In which case a `responseCode` of 65 will be returned by the Gateway and you can choose to resubmit the payment with SCA if required.

With the Handpoint Gateway you can use 3-D Secure to obtain SCA and automatically retry payments that have been soft declined for this reason. If 3-D Secure has been used to provide SCA and the issuer still declines insisting that SCA be obtained, then the Gateway will return a normal decline `responseCode` of 5 to prevent an infinite loop of obtaining SCA and then being declined for lack of SCA.

### Exemptions to Strong Customer Authentication {#scaExemptions}

There are some e-commerce transactions which are out of scope of the regulation, and others that may be exempt.

Obtaining Strong Customer Authentication can add friction and increase Customer drop-off and therefore you should make use of exemptions to reduce the number of times you will need to authenticate a Customer.

However, the bank has the right to refuse any requested exemption and decline the payment insisting that SCA be obtained. The following exemptions are available:

#### Mail Order / Telephone Order Payments

Card details collected via mail or over the phone (MOTO) fall outside of the scope of SCA and do not require authentication. You can flag such payments by passing a value of ‘2’ in the `type` request field.

#### Merchant Initiated Transactions (including recurring transactions)

Payments made with saved cards when the Customer is not present in the payment flow may qualify as [Merchant Initiated Transactions](credentialsonfile#mit). These payments fall outside of the scope of SCA however it is still up to the bank to decide whether authentication is needed for the payment.

The initial payment that saved the card will still need to have obtained SCA or be exempt and agreement must be obtained from the Customer to charge their card at a later point.

You can flag such payments by passing a value of ‘9’ (Continuous Authority) in the `type` request field or using an `rtAgreementType` that signifies the transaction as being Merchant Initiated.

#### Low Value Exemption 

Payments below €30 are considered low value and are generally exempt from authentication. However, if the Customer initiates more than five consecutive low value payments or if the total payments value exceeds €100) then SCA will be required.

You can request this exemption by passing a value of ‘lowvalue’ in the `scaExemption` request field, or it may be automatically applied by the Issuer.

#### Trusted Beneficiary Exemption

The Customer can opt to trust you as a Merchant during their first authentication, then subsequent payments with you are likely to be exempt from future SCA.

You can request this exemption by passing a value of ‘trusted’ in the `scaExemption` request field to allow this trust to be taken into consideration.

#### Trusted Risk Analysis (TRA) Exemption

If the payment provider, having in place effective risk analysis tools, assesses that the fraud risk associated with the payment is low then they can allow this exemption.

You can request this exemption by passing a value of ‘risk’ in the `scaExemption` request field if agreed to by the payment provider.

#### Secured Corporate Payment Exemption

Payments initiated by a business rather than a Consumer and processed through a secured dedicated payment protocol can be exempt from SCA provided alternative controls are sufficiently secure.

You can request this exemption by passing a value of ‘corporate’ in the `scaExemption` request field to indicate such a secure transaction.

#### Delegated Authentication Exemption

If you already require your Customers to perform sufficient authentication on your website, such as secure account logins etc., then you can use this exemption to request that further SCA is not required.

You can request this exemption by passing a value of ‘delegated’ in the `scaExemption` request field to indicate such a secure transaction.

### SCA Using 3-D Secure {#scaUsing3dSecure}

3-D Secure can be used to provide the necessary Strong Customer Authentication. You have a choice of how and when to use 3-D Secure to satisfy SCA:

**Authentication Before Authorisation**
You submit payments using 3-D Secure for authentication up front so that the authorisation will be submitted to the Acquirer with the appropriate authentication data showing that SCA was sought. You may pass an exemption indicator (an exemption can be explicitly requested using the `scaExemption` field) causing the Gateway to automatically request a frictionless flow (the Gateway will use the correct ‘requestorChallengeIndicator’ unless overridden by any value passed in the request).

**Authentication After Authorisation, when requested by the Issuer (Bypass)**
You submit payments without 3-D Secure authentication but with an exemption indicator (an exemption can be explicitly requested using the `scaExemption` field), if required, and the authorisation will be submitted to the Acquirer with no authentication data. If the Issuer approves the authorisation, then no further additional authentication is needed. However, if the Issuer refuses the authorisation due to SCA being required (the issuer will soft decline the transaction indicating SCA is required) then transaction can be repeated but this time using 3-D Secure (you are advised to send a `threeDSOptions` ‘requestorChallengeIndicator’ value of 4 to mandate a challenge) and no exception indicator.

The Gateway can support both choices and in the case of the second choice it can automatically perform the repeat transaction on your behalf.

The choice of how and when authentication is performed is indicated by selecting a 3-D Secure Policy in the Merchant Management System or by sending the `threeDSPolicy` field in the request.

The policies available are:
1. Authenticate Before Authorisation or When Issuer Requests (Default)
2. Authenticate Before Authorisation Only
3. Authenticate When Issuer Requests Only (Bypass)
4. Authenticate Before Authorisation or When Issuer Requests [PSD2]
5. Authenticate Before Authorisation Only [PSD2]
6. Authenticate When Issuer Requests Only [PSD2] (Bypass)

The [PSD2] policies will perform 3-D Secure authentication only if the transaction falls within the jurisdiction of the European Union's Payment Services Directive 2, otherwise it will behave as if 3-D Secure had not been required.


## 3D Secure Overview 

:::tip
The Gateway supports both 3-D Secure version 1 and version 2 and will use the highest version available. Version 2 is also commonly known as EMV 3-D Secure. 
3DS Version 2 is now enforced across all Europe and it is therefore **MANDATORY** to support it to prevent a high number of declines. 
::: 

3-D Secure authentication is now a **MANDATORY** fraud prevention scheme in Europe that is on all e-commerce card transactions processed by the Gateway, where supported by the Acquirer.

It allows the Cardholder to assign a password to their card that is then verified whenever a transaction is processed through a site that supports the use of the scheme. The addition of password protection allows extra security on transactions that are processed online.

3-D Secure stands for Three Domain Secure. There are 3 parties that are involved in the 3-D Secure process:
- The company from which the purchase is being made.
- The Acquiring Bank (the bank of the company)
- VISA and Mastercard (the card issuers themselves)

The gateway supports EMV 3-D Secure as implemented by Visa, Mastercard and American Express and marketed under the brand names of Visa Secure, Mastercard ID Check and American Express SafeKey. Implementations by JCB (J/Secure) and DCI (ProtectBuy) are not currently supported.

The 3-D Secure preferences can be configured per Merchant Account. These preferences can be overridden per transaction by sending one of the preference fields which hold a comma separated list of the check responses that should be allowed to continue to completion. Responses not in the list will result in the transaction being declined with a `responseCode` of 65803 (3DS_NOT_AUTHENTICATED).

## 3DS Benefits 
- The results are available immediately and returned as part of the transaction.
- The checks can be managed independently allowing you the utmost control over how the results are used.
- The checks can be configured to decline the transaction automatically, where required..
- There are no extra Gateway costs for using 3-D Secure. Your Acquirer may charge to add this onto your business account; however, you may also find that your transaction charges are lower as a result of using 3-D Secure.
- Fully configurable for each merchant account. 

## 3DS Limitations 
- The gateway does not support 3-D Secure for JCB or Diner’s club cards.
- 3-D Secure transactions require a browser in order to display the Customer authentication dialog.

## 3DS Implementation 

If your Merchant account is set up for 3-D Secure, the Gateway will require further authentication details provided by the 3-D Secure system.

The 3-D Secure authentication form is designed and controlled by the Customer’s Issuing bank and will display the Merchant Account name and any website address added when the account was onboarded. You can change the displayed name and website address by sending the `merchantName` and/or `merchantWebsite` request fields. Any `merchantWebsite` must be a fully qualified URL containing at least the scheme and host components.

You may also pass additional information about the transaction and Cardholder, using the `threeDSOptions` field. This extra information can help the Issuer decide on whether a challenge is required.

Your Merchant Account must be configured with your Merchant Category Code (MCC). This value is usually configured in the backend but can also be provided in the request using the `merchantCategoryCode` or `threeDSOptions` fields.

You will need to implement a callback page on your web server which the 3-D Secure Access Control Server (ACS) can redirect the Cardholder’s browser to on completion of any challenges. You will need to provide the address of this page to the Gateway in your initial payment request via the `threeDSRedirectURL` field.

The direct integration uses two complex fields to pass data between the 3-D Secure Access Control Server (ACS) and the Gateway. The `threeDSRequest` is a record whose name/value properties must be sent via a HTTP POST request to the ACS. The corresponding `threeDSResponse` field should be returned to the Gateway and must be a record containing name/value properties taken from the HTTP POST received from the ACS when it redirects the Cardholder’s browser back to your callback page on completion of any challenge.

Note that the contents of the `threeDSRequest` and `threeDSResponse` fields are formatted using the record format detailed in section [field formats](overview#fieldFormats) and their contents should be regarded as opaque and all name/value pairs received from the Gateway must be sent to the ACS, and vice versa. The Gateway does not currently support these fields to be provided in the serialised record format.

## Request Flow

Each step of the 3-D Secure flow is described below. At a high level it consists of a secure conversation between the Customer’s issuing bank and the Acquiring bank, facilitated by both the Merchant and the Gateway, in the form of several challenges. Each step of this conversation may contain a visible or invisible challenge. A 3-D Secure authentication form represents a visible challenge. An invisible challenge may be presented in the form of a Device Fingerprinting Method. The bank controls the number of challenges each transaction requires, and some transactions may be sufficiently trusted to require zero challenges. Because of this, your implementation will need to loop through multiple possible Continuation Requests, thus continuing the 3-D Secure process until you have received a message from the Gateway informing you that the 3-D Secure process has been completed.

 ![Direct integration Flow](../static/img/direct-integration-flow.png)

  - **Step 1: Initial Request**

  Your Cardholder has just pressed ‘submit’ on your payment form. You now start the payment process with a SALE request to the Gateway. You should send an initial request to the Gateway containing the payment details, device details and any required `threeDSOptions`. This request must include your callback page, as described above, in the `threeDSRedirectURL` field.

  - **Step 2: Initial Response**
  
  We check basic factors relating to the card being charged and respond with a determination of whether 3-D Secure is needed on this transaction. *Note: this process is influenced by third parties and not totally within the Gateway’s control.*
  If no 3-D Secure challenge is required, the Gateway will respond with a transaction completion status using one of our standard codes.
  However, if 3-D Secure challenge is required, the Gateway will respond with a `responseCode` of 65802, and the response will include a transaction reference called `threeDSRef`, an array of data called `threeDSRequest`, and the URL for the Access Control Server (ACS) called `threeDSURL`. You will need to save the `threeDSRef` as it will be needed in step 4.

  - **Step 3: Device Method Request**

  If 3DS device fingerprinting is required, send the contents of the `threeDSRequest` to the `threeDSURL` as received in step 2. This should be done in the Cardholder’s browser using an HTTP POST method.

  - **Step 4: Method (Continuation) Request**
  
  The ACS will respond with method data. The Gateway now needs this data to continue with the transaction.Please relay this data to the Gateway, including the relevant `threeDSRef` provided in step 2.
  If the method response was sufficient to allow the card to be authorised without a challenge, you will receive a transaction complete response, with an authorisation code.

  - **Step 5: Challenge Response / Final Response**

  If the Gateway responds with a further `responseCode` of 65802, send the contents of the `threeDSRequest` to the `threeDSURL` as explained in step 2. This should be done in the Cardholder’s browser using an HTTP POST method.

  - **Step 6: Challenge (Continuation) Request**

  Once you have received a Challenge Response from the ACS, please relay this data to the Gateway, including the relevant `threeDSRef` provided in step 5.

  - **Step 7: Final Response**

  You might have noticed that steps 3-6 were remarkably similar. It is in fact the same implementation, repeated. We recommend creating a loop to handle these similar messages as continuations of the same process, then simply ending the loop when you receive a Final Response.

### Initial Request (Verify Enrolment) {#initial3dSecureRequest}

If no 3-D Secure authentication details are provided in the initial request, the Gateway will determine if the transaction is eligible for 3-D Secure by checking whether the card is enrolled in the 3-D Secure scheme.

If the Gateway determines that the transaction is not eligible for 3-D Secure, then it will continue to process it as a normal transaction without 3-D Secure, unless the `threeDSRequired` request field indicates that the transaction should be aborted instead.

To support 3-D Secure, you must pass the `threeDSRedirectURL` field in the initial request. This field must contain the complete URL to a web page on your server that the 3-D Secure Access Control Server (ACS) will HTTP POST the authentication results back to, when the authentication has been completed.

You must also provide details about the Cardholder’s device, using the fields documented in [device information fields](advanceddata#deviceInformationFields) or using the associated options in the `threeDSOptions` field. You may also use the `threeDSOptions` field to pass additional information about the transaction and Cardholder, which can help the Issuer decide on whether a challenge is required.

If the Gateway determines that the transaction is eligible, it will respond with a responseCode of 65802 (3DS AUTHENTICATION REQUIRED) and included in the response will be a `threeDSRef` field, a `threeDSRequest` field and a `threeDSURL` field.

The `threeDSRequest` field is a record whose name/value properties must be sent, using a HTTP POST request, to the 3-D Secure Access Control Server (ACS) at the URL provided by the `threeDSURL` field. This is usually achieved via means of a hidden HTML input fields in a form rendered within an IFRAME displayed on the Cardholder’s browser and then submitted using JavaScript. The IFRAME must be of sufficient size to display the challenge screen, however, if the `threeDSRequest` contains a `threeDSMethodData` component, then the challenge is invisible, and a small hidden IFRAME can be used instead.
You must store the value of the `threeDSRef` field for use in the continuation request.

These fields should be sent in addition to basic request fields detailed in the [transaction types](transactiontypes.md/#transactionRequest) section: 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| threeDSRedirectURL | <span class="badge badge--primary">Yes</span> | A URL on the Merchant’s server to which the ACS can POST the challenge results, thus redirecting the challenge IFRAME to this page.|
| threeDSOptions | <span class="badge badge--primary">Conditional</span> | Record containing 3DS options that can be used by the ACS for advance fraud checking. Some browser configuration options are **mandatory** if the corresponding device detail fields are not provided. Refer to [3DS Options](#3dsOptions) for more details.|
| merchantName | No | Merchant name to use on 3DS challenge form. <br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| merchantWebsite | No | Merchant website to use on 3DS challenge form. The website must be a fully qualified URL and include at least the scheme and host components.<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| merchantCategoryCode | No | Merchant category code.|
| threeDSRequired | No | Is 3DS required for this transaction? <br></br><br></br>Possible values are:<br></br> N – 3DS is not required.  <br></br>Y – Abort if 3DS is not enabled<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| threeDSCheckPref | No | List of `threeDSCheck` response values that are to be accepted, any other value will cause the transaction to be declined. <br></br><br></br>Value is a comma separated list containing one or more of the following values: ‘not known', 'not checked', ' not authenticated', 'attempted authentication', 'authenticated’.<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| threeDSPolicy | No | 3DS Policy used. Refer to [SCA Using 3-D Secure](#scaUsing3dSecure).<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS). |
| threeDSVersion | No | Force a particular version to be used rather than using the highest available for the transaction details. **Use of this request field is not encouraged under normal circumstances.**<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS). |
| scaExemption | No | An SCA exemption can be used to request that a frictionless flow is preferable. Refer to [Exemptions to Strong Customer Authentication](#scaExemptions).<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).| 


### Continuation Request (Check Authentication and Authorise) {#3dSecurecontinuationRequest}

On completion of the 3-D Secure authentication the ACS will send the challenge results to you callback page, as originally specified using the `threeDSRedirectURL` field in the initial request.

The data will be received via means of a HTTP POST request and the contents of this POST request should be returned to the Gateway unmodified as name/value properties in the `threeDSResponse` field together with the `threeDSRef` received in the initial response.

This new request will check the authentication results and either respond with the details for a further challenge, send the transaction to the Acquirer for approval, or abort the transaction, depending on the authentication result and your preferences, either sent in the threeDSCheckPref field or set in the Merchant Management System (MMS).

These fields may be sent alone: 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| threeDSRef | Yes | The value of the `threeDSRef` field in the initial Gateway response.|
| threeDSResponse | Yes | The data POSTed back from the ACS when the challenge has completed.|

Note: It is only necessary to send the `threeDSRef` and the `threeDSResponse` in the continuation request, because the threeDSRef will identify the Merchant Account and initial request. The message does not need to be signed. However, you can send any of the normal request fields to modify or supplement the initial request. Any card details and transaction amount sent in the second request must match those used in the first request, else the second request will fail with a responseCode of 64442 (REQUEST MISMATCH).


### Multiple Challenges and Frictionless Flow

The API supports the issuing of multiple challenges where the continuation request may indicate the requirement to perform another challenge by responding with a `responseCode` of 65802 (3DS AUTHENTICATION REQUIRED) and including a further `threeDSRequest`, `threeDSURL` and `threeDSRef`. When this happens, these further challenge details should be treated the same as the first and POSTed to the ACS.

An initial device fingerprinting method might have to be invoked on the ACS, the results of which are used to determine whether the Cardholder must complete a challenge or whether a frictionless flow can be achieved where the transaction can continue unchallenged.

### Cardholder Challenge

The Cardholder challenge takes place with the Cardholder’s browser, usually within an IFRAME embedded on the payment form. To start the challenge, the IFRAME should contain a HTML FORM with hidden INPUT fields storing the name/value pairs returned in the `threeDSRequest` record. JavaScript should then be used to submit the form automatically, causing the form data to be sent via a HTTP POST to the `threeDSURL`.

The IFRAME should be of sufficient size to display the ACS challenge form. The challenge form supports a limited number of different sizes, giving the Merchant more flexibility in the design of their payment form. The required size can be set using the ‘challengeWindowSize’ option, passed in the `threeDSOptions` field in the initial request.

### Device Fingerprinting Challenge

The device fingerprinting method invocation is handled in the same way as a normal Cardholder challenge, except that it can be done silently in a hidden IFRAME, invisible to the normal payment flow. This silent device fingerprinting method request can be determined by the presence of a `threeDSMethodData` element in the `threeDSRequest` record (this is one time when the normally opaque data does need to be checked).

This method should take no longer than 10 seconds and therefore if the ACS has not POSTed the results back within 10 seconds, then the browser can stop waiting and the transaction can be continued as normal but the `threeDSResponse` field should be returned indicating the timeout by including a `threeDSMethodData` element with the value of 'timeout', for example, “threeDSResponse[threeDSMethodData]=timeout”

### Challenge Response {#3dSecureChallengeResponse}

These fields are returned when a 3-D Secure challenge is required and provide the information necessary for you to request the Access Control Server (ACS) perform that challenge.

These fields will be returned in addition to the [3D secure request fields](#initial3dSecureRequest) and the [basic response fields](transactiontypes#transactionResponse).

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| threeDSEnabled | Always | Is 3DS enabled for this Merchant Account?<br></br><br></br> Possible values are:<br></br> N – Merchant Account is not enabled.<br></br> Y – Merchant Account is enabled.|
| threeDSPolicy | If 3DS enabled | 3DS Policy used. Refer to [SCA using 3-D Secure](#scaUsing3dSecure) for more details.|
| threeDSVETimestamp | If 3DS enabled| The time the card was checked for 3DS enrolment, and any initial challenge determined.|
| threeDSEnrolled | If 3DS enabled| The 3DS enrolment status for the credit card. Refer to [3-D Secure Authentication Data](#3dSecureAuthenticationData) for details. <br></br> <br></br> Possible values are:<br></br>  Y – Enrolled. <br></br> N – Not enrolled.<br></br>  U – Unable to verify if enrolled.<br></br> E – Error verifying enrolment.|
| threeDSRef | If 3DS enabled| Value to return in the continuation request.|
| threeDSURL | If 3DS enrolled| The URL of the ACS to which the challenge data should be sent via a HTTP POST request from the Cardholder’s browser.|
| threeDSRequest | If 3DS enrolled| Record containing the name/value pairs that should be sent to the ACS via HTTP POST request from the Cardholder’s browser.|

### Final Response 

These fields are returned when the 3-D Secure stage has completed, and no further challenge is required.
These fields will be returned in addition to the [3D secure request fields](#initial3dSecureRequest); any [continuation request fields](#3dSecurecontinuationRequest); any [challenge response fields](#3dSecureChallengeResponse); and the [basic response fields](transactiontypes#transactionResponse).

 | Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| threeDSEnabled | Always | Is 3DS enabled for this Merchant Account?<br></br><br></br> Possible values are:<br></br> N – Merchant Account is not enabled.<br></br> Y – Merchant Account is enabled.|
| threeDSPolicy | If available | 3DS Policy used. Refer to [SCA using 3-D Secure](#scaUsing3dSecure) for more details.|
| threeDSXID | If 3DS enabled | The unique identifier for the transaction in the 3DS system.|
| threeDSVETimestamp | If 3DS enabled | The time the card was checked for 3DS enrolment, and any initial challenge determined.|
| threeDSEnrolled | If 3DS enabled | The 3DS enrolment status for the credit card. Refer to [3-D Secure Authentication Data](#3dSecureAuthenticationData) for details. <br></br><br></br>Possible values are:<br></br> Y – Enrolled. <br></br>N – Not enrolled.<br></br> U – Unable to verify if enrolled. <br></br>E – Error verifying enrolment.|
| threeDSCATimestamp | If 3DS enabled | The time the last challenge was checked.|
| threeDSAuthenticated | If 3DS enabled | The 3DS authentication status for the credit card. Refer to [3-D Secure Authentication Data](#3dSecureAuthenticationData) for details.<br></br><br></br> Possible values are:<br></br> Y – Authenticated. <br></br>A – Attempted to authenticate. <br></br>N – Not authenticated. <br></br>R – Reject transaction.<br></br> I – Information only.<br></br> U – Unable to authenticate.<br></br> E – Error checking authentication.|
| threeDSECI | If 3DS authenticated | This contains a two-digit Electronic Commerce Indicator (ECI) value. Refer to [3-D Secure Authentication Data](#3dSecureAuthenticationData) for details. The data contained within this property is only valid if the threeDSAuthenticated value is Y or A.|
| threeDSCAVV | If 3DS authenticated |This contains a 28-character Base-64 encoded Cardholder Authentication Verification Value (CAVV). Refer to [3-D Secure Authentication Data](#3dSecureAuthenticationData) for details. The data contained within this property is only valid if the threeDSAuthenticated value is Y or A.|
| threeDSDetails |If 3DS authenticated  |Record containing further details about the 3-D Secure processing stage. Notable sub fields are:<br></br>version – 3-D Secure version used <br></br>versions – 3-D Secure versions available <br></br>psd2Region – whether payment in PSD2 jurisdiction|
| threeDSErrorCode |If 3DS error |Any error response code returned by the ACS if there is an error in determining the card’s 3DS status.|
| threeDSErrorDescription |If 3DS error |Any error response description returned by the ACS if there is an error in determining the card's 3DS status.|
| threeDSResponseCode |Always |A numeric code providing the specific outcome of the 3-D Secure processing stage. Check threeDSResponseMessage for more details of any error that occurred. Refer to [Response Codes](annexes#3dsecureErrorCodes) for more details.|
| threeDSResponseMessage |Always |Any error message relating to the outcome of the 3-D Secure processing stage.|


### External Authentication Request {#externalAuthRequest}

You can choose to obtain the 3-D Secure authentication details from a third-party, in which case you should provide them as part of a standard request. If the Gateway receives valid third-party authentication details, then it will use those and not attempt to perform the 3-D Secure challenge flow.

These fields should be sent in addition to basic request fields detailed in the [transaction types](transactiontypes.md/#transactionRequest) section: 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| threeDSEnrolled | If 3DS enabled | The 3DS enrolment status for the credit card. Refer to [3-D Secure Authentication Data](#3dSecureAuthenticationData) for details.<br></br><br></br>Possible values are: <br></br>Y – Enrolled. <br></br>N – Not enrolled.<br></br>U – Unable to verify if enrolled. <br></br>E – Error verifying enrolment.|
| threeDSAuthenticated | If 3DS enrolled | The 3DS authentication status for the credit card. Refer to [3-D Secure Authentication Data](#3dSecureAuthenticationData) for details.<br></br><br></br>Possible values are: <br></br>Y – Authenticated.<br></br>A – Attempted to authenticate.<br></br>N – Not authenticated.<br></br>I – Information only.<br></br>U – Unable to authenticate<br></br>E – Error checking authentication.|
| threeDSXID | If 3DS authenticated | The unique identifier for the transaction in the 3DS system. Refer to [3-D Secure Authentication Data](#3dSecureAuthenticationData) for details.|
| threeDSECI | If 3DS authenticated | The Electronic Commerce Indicator (ECI). Refer to [3-D Secure Authentication Data](#3dSecureAuthenticationData) for details.|
| threeDSCAVV | If 3DS authenticated | The Cardholder Authentication Verification Value (CAVV). Refer to [3-D Secure Authentication Data](#3dSecureAuthenticationData) for details.|

Note: If 3-D Secure is not enabled for the Merchant Account, then any 3-D Secure authentication fields sent in the request are ignored and the transaction is processed as normal without 3-D Secure.

When an external 3-D Secure provider is used then you are responsible for deciding whether to continue at the different 3-D Secure stages and any preferences provided in the merchant management system (MMS) or using the threeDSCheckPref request field are ignored.

If the external provider returns an authentication status of ‘R’ then you must not continue with the transaction either with or without 3-D Secure. Do not attempt to send a `threeDSAuthentication` status of ‘R’ expecting the Gateway to reject the transaction.

### External Authentication Response

These fields will be returned in addition to the [external authentication request fields](#externalAuthRequest) and the [basic response fields](transactiontypes#transactionResponse).

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| threeDSEnabled | Always | Is 3DS enabled for this Merchant Account?<br></br><br></br> Possible values are:<br></br> N – Merchant Account is not enabled.<br></br> Y – Merchant Account is enabled.|

Note: If 3-D Secure is not enabled for the Merchant Account, then any 3-D Secure authentication fields sent in the request are ignored and the transaction is processed as normal without 3-D Secure.

### Cardholder Information
In the case of a frictionless flow, the card Issuer may sometimes wish to provide a message to the Cardholder. In this case, the `threeDSResponseMessage` will start with the text ‘Cardholder Info: ‘ and be followed by the message from the card Issuer.

### PSD2 Strong Customer Authentication
3-D Secure can be used to provide the Strong Customer Authentication (SCA) required by the European Union's Payment Services Directive 2 (PSD2).
For more details on how to use 3-D Secure to maintain PSD2 SCA Compliance please refer to Refer to [SCA Using 3-D Secure](#scaUsing3dSecure). 

## 3DS Options {#3dsOptions}

The following options may be sent in the `threeDSOptions` field to provide additional information to help customise the 3-D Secure experience or to help the ACS decide if a challenge is required.

Some additional information will be automatically provided by the Gateway from standard integration fields unless overridden by providing the associated option. The standard integration field associated with each option is shown in brackets below the options field name. The standard integration field should be used rather than the option, apart from the very rare circumstances where the two must have different values.

A few additional information values, such as the Cardholder’s browser details, are mandatory and therefore either the standard integration field or the option must be provided. These fields are marked as ‘Yes’ in the Mandatory column of the table below.

Some 3-D Secure information is mandatory and must be provided using the following `threeDSOptions` field or preferably using the associated standard integration field, in brackets, apart from the very rare circumstances where the two must have different values.

**If this mandatory information is not available, then 3-D Secure will fail.**
:::tip
The following information is mandatory:
- requestorName (merchantName) **we will use the default stored on file - no need to pass it as part of the threeDSOptions**
- requestorURL (merchantWebsite) **we will use the default stored on file - no need to pass it as part of the threeDSOptions**
- merchantCategoryCode (merchantCategoryCode) **we will use the default stored on file - no need to pass it as part of the threeDSOptions**
- browserIPAddress (remoteAddress)
- browserUserAgent (deviceIdentity)
- browserAcceptHeader (deviceAcceptContent)
- browserLanguage (deviceAcceptLanguage)

If the browserJavaScriptEnabled (deviceCapabilites) field is provided and indicates that JavaScript is enabled on the Cardholder’s browser, then the following information is also mandatory:
- browserScreenColourDepth/browserScreenColorDepth (deviceScreenResolution)
- browserScreenWidth (deviceScreenResolution)
- browserScreenHeight (deviceScreenResolution)
- browserTimeZone (deviceTimeZone)
:::

The options must be formatted using the record or serialised record formats detailed in the [format guide](overview#fieldFormats).

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| browserAcceptHeader (deviceAcceptContent) | <span class="badge badge--primary">Yes</span> | HTTP accept header sent from the Cardholder’s browser.|
| browserIPAddress (remoteAddress) | <span class="badge badge--primary">Yes</span> | IP v4 address of the Cardholder’s browser.|
| browserJavaEnabled (deviceCapabilities) | <span class="badge badge--primary">Yes</span> | Ability of the Cardholder’s browser to execute Java.<br></br> <br></br>Possible values are:<br></br>  true – browser can execute Java <br></br> false – browser cannot execute Java<br></br> <br></br>Boolean values must be sent as the strings ‘true’ or ‘false’ unless JSON serialisation is used|
| browserJavaScriptEnabled (deviceCapabilities) | <span class="badge badge--primary">Yes</span> | Ability of the Cardholder’s browser to execute JavaScript. <br></br> <br></br> Possible values are:<br></br>  true – browser can execute Javascript <br></br> false – browser cannot execute Javascript<br></br> <br></br>Boolean values must be sent as the strings ‘true’ or ‘false’ unless JSON serialisation is used|
| browserLanguage (deviceAcceptLanguage) | <span class="badge badge--primary">Yes</span> | The Cardholder’s browser language. The browser language as defined in IETF BCP 47.|
| browserScreenColourDepth or browserScreenColorDepth (deviceScreenResolution) | <span class="badge badge--primary">Yes</span> | The screen colour depth of the Cardholder’s browser. A value representing the bit depth of the colour palette, in bits per pixel, for displaying images.<br></br><br></br> Possible values are: 1, 4, 8, 15, 16, 24, 32, 48. <br></br><br></br> This value is not mandatory if the browser doesn’t support JavaScript.|
| browserScreenHeight (deviceScreenResolution) | <span class="badge badge--primary">Yes</span> | The screen height of the Cardholder’s browser.<br></br><br></br> This value is not mandatory if the browser doesn’t support JavaScript.|
| browserScreenWidth (deviceScreenResolution) | <span class="badge badge--primary">Yes</span> | The screen width of the Cardholder’s browser.<br></br><br></br> This value is not mandatory if the browser doesn’t support JavaScript.|
| browserTimeZone (deviceTimeZone) | <span class="badge badge--primary">Yes</span> | The difference between UTC time and the cardholder's browser local time in minutes.|
| browserUserAgent (deviceIdentity) | <span class="badge badge--primary">Yes</span> | The User-Agent header provided by the Cardholder’s browser.|
| challengeWindowSize | No | The dimensions of the challenge window that has been displayed to the cardholder. The ACS shall reply with content that is formatted to appropriately render in this window to provide the best possible user experience. <br></br><br></br>Possible values are: <br></br>01 – 250 x 400<br></br> 02 – 390 x 400 (default) <br></br>03 – 500 x 600<br></br> 04 – 600 x 400<br></br> 05 – Full screen|
| transactionType | No |Identifies the type of transaction being authenticated. This field is required in some markets (eg for Merchants in Brazil).<br></br> <br></br> Possible values are: <br></br> 01 – Goods/ Service Purchase<br></br>  03 – Check Acceptance <br></br> 10 – Account Funding <br></br> 11 – Quasi-Cash Transaction<br></br>  28 – Prepaid Activation and Load|
| cardholderEmail (customerEmail) | No | The Cardholder’s email address.|
| cardholderHomePhone (customerPhone) | No | The Cardholder’s home phone number specified in the following format: “+CountryCode Subscriber” (eg “+44 1234567899”).|
| cardholderMobilePhone (customerMobile)| No | The Cardholder’s mobile phone number specified in the following format: “+CountryCode Subscriber” (eg “+44 1234567899”).|
| cardholderName (customerName)| No | Name of the Cardholder. Limited to the alphanumeric characters listed in EMV Book 4, Annex B.|
| cardholderWorkPhone | No |The Cardholder’s work phone number specified in the following format: “+CountryCode Subscriber” (eg “+44 1234567899”).|
| deliveryTimeframe | No |Merchandise Delivery Timeframe.<br></br><br></br> Possible values are:<br></br> 01 – Electronic Delivery<br></br> 02 – Same day shipping<br></br> 03 – Overnight shipping <br></br>04 – Two-day or more shipping|
| giftCardAmount | No |For prepaid or gift card purchase, the purchase amount total of prepaid or gift card(s) in major units (for example, USD 123.45 is 123).|
| giftCardCount | No |For prepaid or gift card purchase, total count of individual prepaid or gift cards/codes purchased.|
| giftCardCurrencyCode | No |For prepaid or gift card purchase, the currency code of the card as an ISO 4217 3-digit code or its 3 letter equivalent.|
| instalmentPaymentData or installmentPaymentData | No |Indicates maximum number of authorizations permitted for instalment payments. Value must be greater than 1.|
| merchantCategoryCode (merchantCategoryCode) | No |Code describing the Merchant's type of business, product, or service.|
| merchantCountryCode (countryCode) | No |Country code of the merchant as an ISO 3166-1 3-digit code or its 2 or 3 letter equivalents.|
| merchantFraudRate | No |Merchant’s fraud rate in the EEA (all EEA card fraud divided by all EEA card volumes) calculated as per PSD2 RTS. This value is sent to Mastercard only who will not calculate or validate the fraud score.<br></br><br></br> Value will be a numeric value, between 1 and 99, representing the fraud rate, such as:<br></br> 1 – less than or equal to 1 basis point (bp), which is 0.01%<br></br> 2 – between 1 bp + - and 6 bps<br></br> 3 – between 6 bps + - and 13 bps<br></br> 4 – between 13 bps + - and 25 bps<br></br> 5 – greater than 25 bps|
| merchantName (merchantName) | No |Merchant name.|
| paymentAccountAge | No |Date that the payment account was enrolled in the cardholder's account with the 3DS Requestor. Accepted date format is YYYYMMDD.|
| paymentAccountAgeIndicator | No |Indicates the length of time that the payment account was enrolled in the cardholder's account with the 3DS Requestor.<br></br> Possible values are:<br></br> 01 – No account (guest check-out)<br></br> 02 – Created during this transaction<br></br> 03 – Less than 30 days<br></br> 04 – 30-60 days<br></br> 05 – More than 60 days|
| preOrderDate | No |For a pre-ordered purchase, the expected date that the merchandise will be available. Accepted date format is YYYYMMDD.|
| preOrderPurchaseIndicator | No |Indicates whether Cardholder is placing an order for merchandise with a future availability or release date.<br></br><br></br> Possible values are: <br></br>01 – Merchandise available<br></br> 02 – Future availability|
| priorAuthData | No |Data that documents and supports a specific authentication process.|
| priorAuthMethod | No |Mechanism used by the Cardholder to previously authenticate to the 3DS Requestor.<br></br><br></br> Part of the optional 3DS Requestor Prior Transaction Authentication Information that contains information about a 3DS cardholder authentication that occurred prior to the current transaction.<br></br><br></br> Possible values are:<br></br> 01 – Frictionless authentication occurred by ACS<br></br> 02 – Cardholder challenge occurred by ACS<br></br> 03 – ACS verified<br></br> 04 – Other issuer methods|
| priorAuthTimestamp | No |Date and time in UTC of the prior cardholder authentication. Accepted date format is YYYYMMDDHHMM.|
| priorReference | No |Provides additional information to the ACS to determine the best approach for handling a request. It contains an ACS Transaction ID for a prior authenticated transaction (for example, the first recurring transaction that was authenticated with the cardholder).|
| recurringExpDate | No |This field contains the date after which no further authorizations shall be performed. The format of this field must be: YYYYMMDD.|
| recurringFrequency | No |This field indicates the minimum number of days between authorizations.|
| reorderItemsIndicator | No |Indicates whether the cardholder is reordering previously purchased merchandise.<br></br><br></br> Possible values are:<br></br> 01 – First time ordered<br></br> 02 – Reordered|
| reqAuthData | No |Data that documents and supports a specific authentication process. In the current version of the specification, this data element is not defined in detail, however the intention is that for each 3DS Requestor Authentication Method, this field carry data that the ACS can use to verify the authentication process.|
| reqAuthMethod | No |Method used by the Cardholder to authenticate to the 3DS Requestor. <br></br><br></br>Part of the 3DS Requestor Authentication Information which contains optional information about how the cardholder authenticated during login to their 3DS Requestor account.<br></br><br></br> Possible values are:<br></br> 01 – No 3DS Requestor authentication occurred (ie cardholder "logged in" as guest) <br></br>02 – Login to the cardholder account at the 3DS Requestor system using 3DS Requestor's own credentials<br></br> 03 – Login to the cardholder account at the 3DS Requestor system using federated ID <br></br>04 – Login to the cardholder account at the 3DS Requestor system using issuer credentials <br></br>05 – Login to the cardholder account at the 3DS Requestor system using third-party authentication<br></br> 06 – Login to the cardholder account at the 3DS Requestor system using FIDO Authenticator|
| reqAuthTimestamp | No |Date and time in UTC of the cardholder authentication. Accepted date format is YYYYMMDDHHMM.|
| requestorChallengeIndicator | No |Indicates whether a challenge is requested for this transaction. For example: you may be using this to obtain SCA and not want to be challenged as you have provided an exemption. This also allows you to request a challenge when adding a card to a wallet or to follow mandates.<br></br><br></br> Possible values are: <br></br>01 – No preference <br></br>02 – No challenge requested <br></br>03 – Challenge requested: 3DS Requestor Preference<br></br> 04 – Challenge requested: Mandate <br></br>05 – No challenge requested (TRA is already performed)<br></br> 06 – No challenge requested (data share only) <br></br>07 – No challenge requested (SCA is already performed) <br></br>08 – No challenge requested (utilize whitelist exemption) <br></br>09 – Challenge requested (whitelist prompt requested) <br></br><br></br>Values 05 to 09 are for protocol version 2.2.0 but will be accepted for 2.1.0 and 05 to 08 will be downgraded to 02, and 09 to 01. Values 05 to 07 will be passed to Mastercard as part of their 'Merchant Data' extension. Values 08 and 09 are only valid for protocol version 2.2.0.|
| requestorID | No |Directory server assigned 3DS Requestor identifier. (Default on file)|
| requestorName | No |Directory server assigned 3DS Requestor name. (Default on file)|
| requestorURL (merchantWebsite) | No |3DS Requestor website or customer care site.|
| accountAgeIndicator | No | Length of time that the cardholder has had the account with the 3DS Requestor.<br></br><br></br>  Possible values are:<br></br>  01 – No account (guest check-out)<br></br>  02 – Created during this transaction<br></br>  03 – Less than 30 days<br></br>  04 – 30-60 days <br></br> 05 – More than 60 days|
| accountChangeDate | No | Date that the cardholder's account with the 3DS Requestor was last changed. Accepted date format is YYYYMMDD.|
| accountChangeIndicator | No | Length of time since the cardholder's account information with the 3DS Requestor was last changed.<br></br><br></br>  Possible values are:<br></br>  01 – Changed during this transaction.<br></br>  02 – Less than 30 days<br></br>  03 – 30-60 days <br></br> 04 – More than 60 day|
| accountDate | No | Date that the cardholder opened the account with the 3DS Requestor. Accepted date format is YYYYMMDD.|
| accountDayTransactions | No | Number of transactions (successful and abandoned) for this cardholder account with the 3DS Requestor across all payment accounts in the previous 24 hours.|
| accountId | No | Identifier for any Cardholder’s account with the Merchant.|
| accountPasswordChangeDate | No | Date that cardholder's account with the 3DS Requestor had a password change or account reset. Accepted date format is YYYYMMDD.|
| accountPasswordChangeIndicator | No | Indicates the length of time since the cardholder's account with the 3DS Requestor had a password change or account reset. <br></br><br></br> Possible values are: <br></br>01 – No change <br></br>02 – Changed during this transaction<br></br> 03 – Less than 30 days<br></br> 04 – 30-60 days<br></br> 05 – More than 60 days|
| accountProvisioningAttempts | No | Number of account provisioning attempts in the last 24 hours.|
| accountPurchaseCount | No | Number of purchases with this cardholder account during the previous six months.|
| accountType | No | Indicates the type of account.<br></br><br></br> Possible values are:<br></br> 01 – Not applicable<br></br> 02 – Credit <br></br>03 – Debit|
| accountYearTransactions | No | Number of transactions (successful and abandoned) for this cardholder account with the 3DS Requestor across all payment accounts in the previous year.|
| accountYearTransactions | No | Number of transactions (successful and abandoned) for this cardholder account with the 3DS Requestor across all payment accounts in the previous year.|
| acquirerBIN | No | Acquirer bank identification number. (Default on file)|
| acquirerCountryCode | No | Acquirer country code when the Acquirer country differs from the Merchant country and the Acquirer is in the EEA (this could mean that the transaction is covered by PSD2). (Default on file)|
| acquirerMerchantID | No | Acquirer-assigned merchant identifier. (Default on file)|
| acsChallengeMandatedIndicator | No |Indication of whether a challenge is required for the transaction to be authorized due to local/regional mandates or other variables.|
| addressMatch | No |Indicates to the ACS whether the cardholder shipping address and billing address are the same. <br></br><br></br> Possible values are:<br></br> Y – Shipping address matches billing address.<br></br> N – Shipping address does not match billing address.|
| authenticationIndicator | No |Provides additional information to the ACS to determine the best approach for handing an authentication request.<br></br><br></br> Possible values are:<br></br>  01 – Payment - default <br></br> 02 – Recurring <br></br> 03 – Instalment<br></br>  04 – Add Card <br></br> 05 – Maintain Card <br></br> 06 – Verify Cardholder<br></br>  07 – Billing Agreement|
| billingAddressCity (customerTown) | No |The city of the address. Maximum length is 50 characters.|
| billingAddressCountryCode (customerCountryCode) | No |The country of the address as an ISO 3166-1 3-digit code or its 2 or 3 letter equivalents.|
| billingAddressLine1 (customerAddress) | No |The first line of the street address or equivalent local portion of the address. Maximum length is 50 characters.|
| billingAddressLine2 | No |The seconf line of the street address or equivalent local portion of the address. Maximum length is 50 characters.|
| billingAddressLine3 | No |The third line of the street address or equivalent local portion of the address. Maximum length is 50 characters.|
| billingAddressPostcode (customerPostcode) | No |The ZIP or other postal code of the address. Maximum length is 16 characters.|
| billingAddressState | No |The state or province of the address as an ISO 3166-2 country subdivision code. Maximum length is 3 characters.|
| secureCorporatePaymentIndicator | No |Indicates dedicated payment processes and procedures were used, potential secure corporate payment exemption applies.|
| serverOperatorID | No |3DS Server identifier. (Default on file)|
| serverRefNumber | No |Assigned server reference number. (Default on file)|
| shipAddressUsageDate | No |Date when the shipping address used for this transaction was first used with the 3DS Requestor. Accepted date format is YYYYMMDD.|
| shipAddressUsageIndicator | No |DIndicates the length of time since the shipping address used for this transaction was first used with the 3DS Requestor.<br></br><br></br> Possible values are:<br></br> 01 – This transaction<br></br> 02 – Less than 30 days <br></br>03 – 30-60 days<br></br> 04 – More than 60 days|
| shipIndicator | No |Indicates shipping method chosen for the transaction. Merchants must choose the Shipping Indicator code that most accurately describes the cardholder's specific transaction, not their general business. If one or more items are included in the sale, the Shipping Indicator code for the physical goods is used, or if all digital goods, the Shipping Indicator code that describes the most expensive item. <br></br><br></br>Possible values are: <br></br>01 – Ship to cardholder's billing address <br></br>02 – Ship to another verified address on file with merchant <br></br>03 – Ship to address that is different than the cardholder's billing address <br></br>04 – "Ship to Store" / Pick-up at local store (Store address shall be populated in shipping address fields)<br></br> 05 – Digital goods (includes online services, electronic gift cards and redemption codes)<br></br> 06 – Travel and Event tickets, not shipped <br></br>07 – Other (for example, Gaming, digital services not shipped, emedia subscriptions, etc.)|
| shipNameIndicator | No |Indicates if the Cardholder Name on the account is identical to the shipping Name used for this transaction.<br></br><br></br> Possible values are:<br></br> 01 – Account Name identical to shipping Name <br></br>02 – Account Name different than shipping Name|
| shippingAddressCity (deliveryTown) | No |The city of the address. The maximum length is 50 characters.|
| shippingAddressCountryCode (deliveryCountryCode) | No |The country of the address as an ISO 3166-1 3-digit code or its 2 or 3 letter equivalents.|
| shippingAddressLine1 (deliveryAddress) | No |The first line of the street address or equivalent local portion of the address. Maximum length is 50 characters.|
| shippingAddressLine2 | No |The second line of the street address or equivalent local portion of the address. Maximum length is 50 characters.|
| shippingAddressLine3 | No |The third line of the street address or equivalent local portion of the address. Maximum length is 50 characters.|
| shippingAddressPostcode (deliveryPostcode) | No |The ZIP or other postal code of the address. Maximum length is 16 characters.|
| shippingAddressState | No |The state or province of the address as an ISO 3166-2 country subdivision code. Maximum length is 3 characters.|
| suspiciousAccountActivity | No |Indicates whether the 3DS Requestor has experienced suspicious activity (including previous fraud) on the cardholder account.<br></br> <br></br>  Possible values are:<br></br>  01 – No suspicious activity has been observed <br></br> 02 – Suspicious activity has been observed|
| whitelistStatus | No |Whitelist status. <br></br><br></br>Possible values are: <br></br>Y – 3DS Requestor is whitelisted by cardholder<br></br> N – 3DS Requestor is not whitelisted by cardholder|

## 3-D Secure Authentication Data {#3dSecureAuthenticationData}

The 3-D Secure system uses various data fields to report the authentication status of the Cardholder. Each 3-D Secure version may use slightly different terminology for the fields and have slightly different values but for ease of use the Gateway uses the terminology and values as described in this appendix.

The field’s values would normally be populated by the Gateway’s 3DS Server component (The 3DS Server is the Gateway/Merchant component that provides the interface with the 3DS Directory Server), however you may choose to use your own 3DS Server component and provide the values.

### 3D Secure enrolment status

The `threeDSEnrolled` field indicates if the card is enrolled in the 3-D Secure program.

The value is determined if the card number is within one of the enrolled ranges downloaded daily from the Directory Server using a Preparation Request/Response (PReq/PRes) message.

The field can contain one of the following values:

**Y – Enrolled**. The card is enrolled in the 3-D Secure program and the payer is eligible for authentication
processing.

**N - Not Enrolled**. The checked card is eligible for the 3-D Secure (it is within the card association’s range of accepted cards) but the card issuing bank does not participate in the 3-D Secure program. If the Cardholder later disputes the purchase, the issuer may not submit a chargeback to you.

**U - Unable To Verify Enrolment**. The card associations were unable to verify whether the Cardholder is registered. As the card is ineligible for 3-D Secure, you can choose to accept the card nonetheless and precede the purchase as non-authenticated and submits authorisation with ECI 07.

**E - Error Verifying Enrolment**. The Gateway encountered an error. This card is flagged as 3-D Secure ineligible. The card can be accepted for payment at your discretion.

### 3DS Authentication status

The `threeDSAuthenticated` field indicates if the cardholder has been authenticated by the 3-D Secure program.

The value is provided by the Directory Server either on requesting authentication in the Authentication Response (ARes) message, in the case of a frictionless flow, or after a Cardholder
challenge in the Result Request (RReq) message, in the case of a challenge flow.

The field can contain one of the following values:

**Y - Authentication Successful**. The Issuer has authenticated the Cardholder by verifying the identity information or password. A CAVV and an ECI of 5 is returned. The card is accepted for payment and authentication data passed to authorisation processing.

**A - Attempted Authentication**. A proof of authentication attempt was generated. The Cardholder is not participating, but the attempt to authenticate was recorded. The card can be accepted for payment at your discretion and authentication data passed to authorisation processing.

**N - Not Authenticated**. The Cardholder did not complete authentication and the card should not be accepted for payment.

**R – Rejected By Issuer**. The Issuer rejected the transaction and must not be accepted for payment.

**D – Decoupled Challenge Required**. Decoupled authentication confirmed.

**I – Information Only**. 3DS Requestor challenge preference acknowledged.

**U - Unable To Authenticate**. The authentication was not completed due to technical or another problem. A transmission error prevented authentication from completing. The card can be accepted for payment at your discretion, but no authentication data will be passed on to authorisation processing.

**E - Error Checking Authentication**. The Gateway encountered an error. The card can be accepted for payment at your discretion, but no authentication data will be passed on to authorisation processing.

### 3DS Transaction Identifier 

The `threeDSXID` field provides a unique value to identify the transaction through the 3-D Secure system.
The value is provided by the Directory Server and is a 36-character universally unique identifier (UUID) as defined in IETF RFC 4122.

### 3DS Electronic Commerce Indicator

The `threeDSECI` field indicates the security status of the transaction after the Cardholder has been authenticated or attempted authentication.

The value is provided by the Directory Server either on requesting authentication in the Authentication Response (ARes) message, in the case of a frictionless flow, or after a Cardholder challenge in the Result Request (RReq) message, in the case of a challenge flow.

The value is always present if the `threeDSAuthenticated` field has a value of Y (successful authentication), or A (attempted authentication) but can be present at other times.

The field can contain one of the following 2-digit values (the values are shown as pairs, the first value is for Visa and other Card Schemes and the second for Mastercard only):

- **05/02** - Both cardholder and card issuing bank are 3DS enabled. 3DS card authentication is successful.
- **06/01** - Either cardholder or card issuing bank is not 3DS enrolled. 3DS card authentication is unsuccessful, in sample situations as:
    - 3DS cardholder not enrolled.
    - Card issuing bank is not 3DS ready.
- **07/00** - Authentication is unsuccessful or not attempted. The card is either a non-3DS card or card issuing bank does not handle it as a 3DS transaction.

### 3DS Cardholder Authentication Verification Value

The `threeDSCAVV` field provides proof that the Cardholder has been authenticated or attempted authentication.

The value is provided by the Directory Server either on requesting authentication in the Authentication Response (ARes) message, in the case of a frictionless flow, or after a Cardholder challenge in the Result Request (RReq) message, in the case of a challenge flow.

The value is present if the `threeDSAuthenticated` field has a value of Y (successful authentication), or A (attempted authentication).

The field will contain a 28-character Base-64 encoded value (32-characters for Mastercard).

### 3DS Enrolment/Authentication Only

Usually, the Gateway will perform most of the 3-D Secure processing in the background leaving the only the actual contacting of the issuers Access Control Server (ACS) to the Merchant.

However, there may be times when you may wish to gain more control over the Enrolment and Authentication process. The following field allows the request processing to stop after the 3-D Secure enrolment check or authentication check and return;

| Name | Mandatory | Description |
| ----------- | ----------- | ----------- | 
| threeDSOnly | No |Complete the processing as far as the next 3-D Secure stage and then return with the appropriate
response fields for that stage. | 

As this stop is requested then a `responseCode` is returned as 0 (Success) however it will be recorded in the Merchant Management System (MMS) as 65792 (3DS IN PROGRESS) indicating that the transaction has been prematurely halted expecting it to be continued to the next 3-D Secure stage when required. In order to continue the process, the `threeDSRef` field is returned together with any relevant 3-D Secure response fields suitable for that stage in the processing.

If this flag is used when 3-D Secure is not enabled on the account or after the 3-D Secure process has been completed for the request (ie when the authentication step has completed), then passing the flag will cause the transaction to abort with a `responseCode` of 65795 (3DS PROCESSING NOT REQUIRED). This ensures that the transaction doesn’t go on to completion by accident while trying do 3-D Secure enrolment or authentication only.


## 3DS Example (PHP Code)

The following example shows the complete 3D Secure process. When executing this code, the different phases of the 3DS process are displayed on the screen.

**Note**: Requires adding the value to the `paymentToken` field

It allows you to choose between 3 different cards (Visa, Mastercard and AMEX) and allows you to select the expiration month of the selected card.

Each month represents a different authentication status returned by the Directory Server (for frictionless flow simulation). Here you can check the meaning of each month.


```php
<?php

const MERCHANT_SECRET_KEY = '3obzOxdqw6e1u';
const MERCHANT_ID = '155928';
const GATEWAY_URL = 'https://commerce-api.handpoint.com/direct/';


if (isset($_GET['run'])) {
	run();
} elseif (isset($_GET['3dscallback'])) {
	threeDSCallback();
} else {
	run();
}


// Select test card menu.
function menu()
{

	$testCards = [
		[
			'card_name' => 'Visa Credit',
			'address' => 'Flat 6 Primrose Rise 347 Lavender Road Northampton',
			'post_code' => 'NN17 8YG',
			'card_number' => '4929421234600821',
			'card_cvv' => '356',
		],
		[
			'card_name' => 'Mastercard Credit',
			'address' => '25 The Larches Narborough Leicester',
			'post_code' => 'LE10 2RT',
			'card_number' => '5301250070000191',
			'card_cvv' => '419',
		],        [
			'card_name' => 'American Express (Amex)',
			'address' => 'The Hunts Way Southampton',
			'post_code' => 'SO18 1GW',
			'card_number' => '374245455400001',
			'card_cvv' => '4887',
		],
	];

	$html = '<p>Select test card:</p><table class="table"><thead>';

	foreach ($testCards as $testCard) {

		$html .= <<<HTML
            <tr>
                <td>{$testCard['card_name']}</td>
                <td>{$testCard['card_number']}</td>
                <td>{$testCard['address']}</td>
                <td>{$testCard['post_code']}</td>
                <td> <form action="?run" method="post">
                    Expiry month
                <select class="form-select" aria-label="Default select example" name="cardExpiryMonth">
                <option selected="selected" value="12">12</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    </select>
                    <input type="hidden" name="cardNumber" value="{$testCard['card_number']}">
                    <input type="hidden" name="cardCVV" value="{$testCard['card_cvv']}">
                    <input type="hidden" name="cardAddress" value="{$testCard['address']}">
                    <input type="hidden" name="cardPostCode" value="{$testCard['post_code']}">
                
                <td><button type="submit" class="btn btn-primary btn-small">Submit</button></td>
                </form></td>
            </tr>
HTML;
	}

	$html .= <<<HTML
            </tbody>
        </table>
HTML;

	echo renderPage('3DSv2 Demo', $html, 'Handpoint');
}

function run()
{

	$threeDSRedirectURL = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https://" : "http://") . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];

	$request = array(
		'action' => 'SALE',
		'amount' => '150',
		'countryCode' => '826',
		'currencyCode' => '826',
		'customerAddress' => (isset($_POST['cardAddress']) ? $_POST['cardAddress'] : 'Merevale Avenue Leicester'),
		'customerEmail' => 'email@exampledomainnamehere.com',
		'customerPostCode' => (isset($_POST['cardPostCode']) ? $_POST['cardPostCode'] : 'LE10 2BU'),
        'paymentToken' => 'Insert here your paymentToken',
		'merchantID' => MERCHANT_ID,
		'type' => '1',
		'orderRef' => 'Test',
		'duplicateDelay' => 0,
		'remoteAddress'             =>  $_SERVER['REMOTE_ADDR'],
		'threeDSRedirectURL'        => "{$threeDSRedirectURL}?3dscallback",
		'deviceChannel'                => 'browser',
		'deviceIdentity'            => (isset($_SERVER['HTTP_USER_AGENT']) ? htmlentities($_SERVER['HTTP_USER_AGENT']) : null),
		'deviceTimeZone'            => '0',
		'deviceScreenResolution'    => '1x1x1',
		'deviceAcceptContent'        => (isset($_SERVER['HTTP_ACCEPT']) ? htmlentities($_SERVER['HTTP_ACCEPT']) : '*/*'),
		'deviceAcceptEncoding'        => (isset($_SERVER['HTTP_ACCEPT_ENCODING']) ? htmlentities($_SERVER['HTTP_ACCEPT_ENCODING']) : '*'),
		'deviceAcceptLanguage'        => (isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? htmlentities($_SERVER['HTTP_ACCEPT_LANGUAGE']) : 'en-gb;q=0.001'),
		'deviceAcceptCharset'        => (isset($_SERVER['HTTP_ACCEPT_CHARSET']) ? htmlentities($_SERVER['HTTP_ACCEPT_CHARSET']) : null),

	);

	$request['signature'] = createSignature($request, MERCHANT_SECRET_KEY);

	$response = sendRequest($request, GATEWAY_URL);

	$html = <<<HTML
      <div class="card">
        <div class="card-header">
           <h5> Request to gateway</h5>
        </div>
        <div class="card-body">
    HTML;


	$html .= '<pre>' .  print_r($request, true) . '</pre>';

	$ret = http_build_query($request, '', '&');
	// Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)  
	$ret = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $ret);

	$html .= '<h5>URL Encoded</h5>';
	$html .= '</p>' . $ret . '</p>';
	$html .= '</div></div>';
	$html .= <<<HTML
<div class="card-header" style="margin-top: 20px;">
<h5>Response from gateway</h5>
</div>
<div class="card-body">
HTML;


	$html .= '<pre>' .  print_r($response, true) . '</pre>';

	if ($response['responseCode'] == 65802) {

		$html .= "<p>Your transaction requires 3D Secure Authentication</p>";

		// Store the threeDSRef in a cookie for reuse.  (this is just one way of storeing it)
		setcookie('threeDSRef', $response['threeDSRef'], time() + 1500);

		$ref = $response['threeDSRef'];

		$html .= "<p>The threeDSRef now needs to stored be on the merchant side. In this example it's being stored to a cookie so it can be retreived after 3DS has called back</p>";

		$html .= "<p>ThreeDS Ref being stored : {$ref}</p>";

		$threeDSUrl = $response['threeDSURL'];

		$html .= "<p>Next a POST request needs to be sent to the 3DS URL provided in the threeDSURL field in the response which is {$threeDSUrl} this post request
    needs to contain the fields provided in the gateways response threeDSRequest field. These fields are ";

		// For each of the fields in threeDSRequest output a hidden input field with it's key/value
		foreach ($response['threeDSRequest'] as $key => $value) {
			$html .= "<p>Name : {$key}  with a value of {$value} </p>";
		}

		$html .= "<p>Along with these fields the threeDSRef from the response is also sent. </p></p>";

		// Start of HTML form with URL
		$html .= "<form action=\"" . htmlentities($response['threeDSURL']) . "\"method=\"post\">";

		// Add threeDSRef from the gateway response
		$html .= '<input type="hidden" name="threeDSRef" value="' . $response['threeDSRef'] . '">';

		// For each of the fields in threeDSRequest output a hidden input field with it's key/value
		foreach ($response['threeDSRequest'] as $key => $value) {
			$html .= '<input type="hidden" name="' . $key . '" value="' . $value . '">';
		}

		$html .= '<pre><code>&lt;form action="https://acs.3ds-pit.com/?method" method="post"&gt;
        &lt;input type="hidden" name="threeDSRef" value="UDNLRVk6dHJhbnNhY3Rpb25JRD0xNTAyNzk0MjgmbWVyY2hhbnRJRD0xMDA4NTYmX19saWZlX189MTY0MzI5Nzk5Mg=="&gt;
        &lt;input type="hidden" name="threeDSMethodData" value="eyJ0aHJlZURTTWV0aG9kTm90aWZpY2F0aW9uVVJMIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwLzNkc3YyLWV4YW1wbGUucGhwPzNkc2NhbGxiYWNrPSZ0aHJlZURTQWNzUmVzcG9uc2U9bWV0aG9kIiwidGhyZWVEU1NlcnZlclRyYW5zSUQiOiIxNGE2YTYyZS0yZjRjLTQxNjYtYWYwYi1jNTJmN2M0ZGFjMjUifQ"&gt;&lt;pre&gt;&lt;code&gt;&lt;input type="hidden" name="threeDSRef" value="UDNLRVk6dHJhbnNhY3Rpb25JRD0xNTAyNzkzNzkmbWVyY2hhbnRJRD0xMDA4NTYmX19saWZlX189MTY0MzI5Nzk2MA=="&gt;&lt;input type="hidden" name="threeDSMethodData" value="eyJ0aHJlZURTTWV0aG9kTm90aWZpY2F0aW9uVVJMIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwLzNkc3YyLWV4YW1wbGUucGhwPzNkc2NhbGxiYWNrPSZ0aHJlZURTQWNzUmVzcG9uc2U9bWV0aG9kIiwidGhyZWVEU1NlcnZlclRyYW5zSUQiOiJhMzczOTkxMy1kMzdlLTQyZjMtYmFhNC04NjNmOTgwMzMyYzEifQ"&gt;&lt;pre&gt;&lt;code&gt;%3Cform+action%3D%22https%3A%2F%2Facs.3ds-pit.com%2F%3Fmethod%22+method%3D%22post%22%3E%0D%0A%3Cinput+type%3D%22hidden%22+name%3D%22threeDSRef%22+value%3D%22UDNLRVk6dHJhbnNhY3Rpb25JRD0xNTAyNzkwOTEmbWVyY2hhbnRJRD0xMDA4NTYmX19saWZlX189MTY0MzI5Nzc5MQ%3D%3D%22%3E%3Cinput+type%3D%22hidden%22+name%3D%22threeDSMethodData%22+value%3D%22eyJ0aHJlZURTTWV0aG9kTm90aWZpY2F0aW9uVVJMIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwLzNkc3YyLWV4YW1wbGUucGhwPzNkc2NhbGxiYWNrPSZ0aHJlZURTQWNzUmVzcG9uc2U9bWV0aG9kIiwidGhyZWVEU1NlcnZlclRyYW5zSUQiOiI2MWUzNDJmNC1hZDg2LTQ2YzYtYmMxYy1iYzFiZjIwYWU1NzQifQ%22%3E%0D%0A%3Cinput+type%3D%22submit%22+value%3D%22Continue%22%3E%0D%0A%3C%2Fform%3E&lt;/code&gt;&lt;/pre&gt;&lt;input type="submit" value="Continue"&gt;
        &lt;/form&gt;</pre></code>';
		// End of html form with submit button.

		$html .= "<input type=\"submit\" value=\"Continue\">
            </form>";
	}


	$html .= '</div></div>';

	echo renderPage('3DSv2 Test', $html, 'Initial request to gateway');
}

function threeDSCallback()
{

	//ACS Response
	$html = <<< HTML
      <div class="card">
        <div class="card-header">
           <h5>Response from ACS</h5>
        </div>
        <div class="card-body">
    HTML;

	$html .= '<pre>' .  print_r($_POST, true) . '</pre>';

	$threeDSRequest = array(
		'threeDSRef' => $_COOKIE['threeDSRef'], // This is the threeDSref store in the cookie from the previous gateway response.
		'threeDSResponse' => $_POST, // <-- Note here no fields are hard coded. Whatever is POSTED from 3DS is returned.
	);

	// Send the 3DS response back to the gateway and get the response.
	$gatewayResponse = sendRequest($threeDSRequest, GATEWAY_URL);

	// Store the new threeDSRef in the cookie again because it may change.
	setcookie('threeDSRef', $gatewayResponse['threeDSRef'], time() + 1500);

	$html .= '</div></div>';


	$html .= <<< HTML
      <div class="card" style="margin-top: 10px">
        <div class="card-header">
           <h5>Request to gateway</h5>
        </div>
        <div class="card-body">
    HTML;


	$html .= '<pre>' .  print_r($threeDSRequest, true) . '</pre>';

	$html .= '<h5>Url encoded</h5>';
	$ret = http_build_query($threeDSRequest, '', '&');
	// Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)  
	$ret = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $ret);
	$html .= $ret;

	$html .= '</div></div>';


	$html .= <<< HTML
    <div class="card" style="margin-top: 10px; margin-bottom: 100px">
      <div class="card-header">
         <h5>Response from gateway</h5>
      </div>
      <div class="card-body">
  HTML;

	$html .= '<pre>' .  print_r($gatewayResponse, true) . '</pre>';


	if ($gatewayResponse['responseCode'] == 65802) {

		$html .= "<p>Your transaction requires 3D Secure Authentication</p>";

		// Store the threeDSRef in a cookie for reuse.  (this is just one way of storeing it)
		setcookie('threeDSRef', $gatewayResponse['threeDSRef'], time() + 500);

		$ref = $gatewayResponse['threeDSRef'];

		$html .= "<p>The threeDSRef now needs to be stored again on the merchant side.</p>";

		$html .= "<label>Three DS Ref being stored : {$ref}</label>";

		$threeDSUrl = $gatewayResponse['threeDSURL'];

		$html .= "<p>Next a POST request needs to be sent to the 3DS URL provided in the threeDSURL field in the response which is {$threeDSUrl} this post request
    needs to contain the fields provided in the gateways response threeDSRequest field. These fields are ";

		// For each of the fields in threeDSRequest output a hidden input field with it's key/value
		foreach ($gatewayResponse['threeDSRequest'] as $key => $value) {
			$html .= "<p>Name : {$key}  with a value of {$value}</p>";
		}

		// Start of HTML form with URL
		$html .= "<form action=\"" . htmlentities($gatewayResponse['threeDSURL']) . "\"method=\"post\">";

		// Add threeDSRef from the gateway response
		$html .= '<input type="hidden" name="threeDSRef" value="' . $gatewayResponse['threeDSRef'] . '">';

		// For each of the fields in threeDSRequest output a hidden input field with it's key/value
		foreach ($gatewayResponse['threeDSRequest'] as $key => $value) {
			$html .= '<input type="hidden" name="' . $key . '" value="' . $value . '">';
		}

		// End of html form with submit button.
		$html .= "<input type=\"submit\" value=\"Continue\">
                </form>";
	} else {

		$html .= 'Transaction Complete';
		$html .= '<a href="?menu" class="btn btn-primary" role="button">Return to menu</a>';
	}

	$html .= '</div></div>';

	echo renderPage('3DS Callback', $html, '3DS Callback');
}



function renderPage($title, $body, $jumotronText = null)
{
	$html = <<< HTML
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="/docs/4.0/assets/img/favicons/favicon.ico">
    
        <title>{$title}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
      </head>
    
      <body>
      <div class="jumbotron text-center">
        <h1>{$jumotronText}</h1>
    </div>

      <main role="main" class="container">
{$body}
    </main>
      </body>
    </html>
HTML;

	return $html;
}



/**
 * Send request
 * 
 * @param Array $request
 * @param String $gatewayURL
 * 
 * @return Array $responseponse
 */
function sendRequest($request, $gatewayURL)
{
	// Send request to the gateway

	// Initiate and set curl options to post to the gateway  
	$ch = curl_init($gatewayURL);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($request));
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	// Send the request and parse the response  
	parse_str(curl_exec($ch), $response);

	// Close the connection to the gateway  
	curl_close($ch);

	return $response;
}



/**
 * Sign request
 * 
 * @param Array $data
 * @param String $key
 * 
 * @return String Hash
 */
function createSignature(array $data, $key)
{
	// Sort by field name  
	ksort($data);

	// Create the URL encoded signature string  
	$ret = http_build_query($data, '', '&');

	// Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)  
	$ret = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $ret);

	// Hash the signature string and the key together  
	return hash('SHA512', $ret . $key);
}
```
