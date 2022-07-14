---
sidebar_position: 8
---

# Financial Institutions Merchants

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

## Request Fields 

To comply with the card brand rules, an MCC6012 Merchant must send these additional fields:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| merchantCategoryCode | <span class="badge badge--primary">Yes</span> | Merchant’s VISA MCC (should be 6012).<br></br><br></br>Only required if the Merchants Category Code is not configured on your Gateway account.|
| receiverName | <span class="badge badge--primary">Yes</span> | Surname only - up to 6 letters allowed.|
| receiverAccountNo | <span class="badge badge--primary">Yes</span> | Account number. If a PAN is supplied only the first 6 and last 4 digits will be used.|
| receiverDateOfBirth | <span class="badge badge--primary">Yes</span> | Primary recipient’s date of birth.|
| receiverPostcode | <span class="badge badge--primary">Yes</span> | Primary recipient’s postcode. (Only the district is required but full postcodes are accepted, therefore ‘W12 8QT’ or just ‘W12’ are acceptable values).|