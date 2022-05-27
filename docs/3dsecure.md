---
sidebar_position: 5
---

# 3D Secure


## Overview 

:::tip
The Gateway supports both 3-D Secure version 1 and version 2 and will use the highest version available. Version 2 is also commonly known as EMV 3-D Secure. 
3DS Version 2 is now enforced across all Europe and it is therefore **MANDATORY** to support it to prevent a high number of declines. 
::: 

3-D Secure authentication is an additional fraud prevention scheme that is on all e-commerce card transactions processed by the Gateway, where supported by the Acquirer.

It allows the Cardholder to assign a password to their card that is then verified whenever a transaction is processed through a site that supports the use of the scheme. The addition of password protection allows extra security on transactions that are processed online.

3-D Secure stands for Three Domain Secure. There are 3 parties that are involved in the 3-D Secure process:
- The company from which the purchase is being made.
- The Acquiring Bank (the bank of the company)
- VISA and Mastercard (the card issuers themselves)

The gateway supports 3-D Secure as implemented by Visa, Mastercard and American Express and marketed under the brand names of Verified by VISA (VBV), Mastercard Secure Code (MSC) and American Express (SafeKey). Implementations by JCB (J/Secure) and DCI (ProtectBuy) are not currently supported.

3-D Secure is also the only fraud prevention scheme available that offers you liability cover for transactions that are verified by the checks. This provides additional protection for transactions using the scheme as distinct from those that do not.

The 3-D Secure preferences can be configured per Merchant Accoun. These preferences can be overridden per transaction by sending one of the preference fields which hold a comma separated list of the check responses that should be allowed to continue to completion. Responses not in the list will result in the transaction being declined with a responseCode of 65803 (3DS_NOT_AUTHENTICATED).

## 3DS Benefits 
- The results are available immediately and returned as part of the transaction.
- The checks can be managed independently allowing you the utmost control over how the results are used.
- The checks can be configured to decline the transaction automatically, where required.
- If authentication is completed, liability for any subsequent fraud-related chargeback on that transaction shifts from you to the card issuer (but note the limitations below and check your Acquirer’s Terms and Conditions fully on this point).
- There are no extra Gateway costs for using 3-D Secure. Your Acquirer may charge to add this onto your business account; however, you may also find that your transaction charges are lower as a result of using 3-D Secure.
- Fully configurable for each merchant account. 

## 3DS Limitations 
- Authenticated 3-D Secure transactions do not guarantee a liability shift and chargebacks can still occur. This is decided at the discretion of your Acquirer, with whom you should check its policy.
- The gateway does not support 3-D Secure for JCB or Diner’s club cards.
- 3-D Secure transactions require a browser in order to display the Customer authentication dialog.

## 3DS Implementation 

If your Merchant Account is set up for 3-D Secure, the Hosted Payment Page will automatically attempt to display the 3-D Secure authentication page for the Customer’s bank.

The 3-D Secure authentication form is designed and controlled by the Customer’s Issuing bank and will display the Merchant Account name and any website address added when the account was onboarded. You can change the displayed name and website address by sending the merchantName and/or merchantWebsite request fields. Any merchantWebsite must be a fully qualified URL containing at least the scheme and host components.

For 3-D Secure version 2 you **NEED** to pass additional information about the transaction and Cardholder, using the `threeDSOptions` field. This extra information can help the Issuer decide on whether a challenge is required. This version also requires your Merchant Account to be configured with your Merchant Category Code (MCC).


