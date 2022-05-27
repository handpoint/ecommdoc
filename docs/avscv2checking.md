---
sidebar_position: 4
---

# AVS/CV2 Checking

AVS and CV2 fraud checking is available on all card transactions processed by the Gateway where supported by the Acquirer.

These fraud prevention checks are performed by the Acquirer while authorising the transaction. You can choose how to act on the outcome of the check (or even to ignore them altogether).

## AVS Checking

The Address Verification System (AVS) uses the address details that are provided by the Cardholder to verify that the address is registered to the card being used. The address and postcode are checked separately.

## CV2 Checking 
CV2, CVV, or Card Verification Value is a 3-digit or 4-digit security code. The check verifies that the code is the correct one for the card used.

For most cards, the CVV is a 3-digit number to the right of the signature strip. For American Express cards, this is a 4-digit number printed, not embossed, on the front right of the card.

The AVS/CV2 checking preferences can be configured per Merchant Account. These preferences can be overridden per transaction by sending one of the preference fields that hold a comma separated list of the check responses that should be allowed in order to continue to completion. Responses not in the list will result in the transaction being declined with a responseCode of 5 (AVS/CV2 DECLINED).

## AVS/CV2 Benefits
-  Can be enabled with just a few extra integration fields.
- The results are available immediately and returned as part of the transaction.
- The checks can be managed independently, allowing you the utmost control over how the results are used.
- The checks can be configured to decline a transaction automatically, where required.
-  There are no extra costs for using AVS/CV2 checking with your transactions.
-  Fully configurable per merchant account.

## AVS/CV2 Limitations 
- The AVS checks are mainly supported by Visa, MasterCard and American Express in the USA, Canada and United Kingdom. Cardholders with a bank that does not support the checks might receive declines due to the lack of data.
- Because AVS only verifies the numeric portion of the address and postcode, certain anomalies such as apartment numbers and house names can cause false declines.
- The checks are meant for consumer cards. Company cards are not fully supported due to the Acquirers’ not having access to this information.

