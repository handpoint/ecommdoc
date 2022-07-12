---
sidebar_position: 5
---

# 3D Secure


## Overview 

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

### Request Flow

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


