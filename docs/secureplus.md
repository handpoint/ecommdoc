---
sidebar_position: 24
---

# SecurePlus Transactions

## Background 

SecurePlus is available if you have a Planet Merchant Account. It is a secure e-commerce payment solution designed to allow you to accept China UnionPay debit cards via the Planet Acquirer, with a reduced the risk of fraudulent transactions while providing a friction-free payment process for your Customers. SecurePlus divides the online payment process into separate
authentication and authorisation transaction flows that authenticates the cardholder’s identity before you submit the authorisation request.

To use SecurePlus you will be supplied with a separate Planet Merchant Account that can be grouped with your main Merchant Account using the account mapping facility as documented in the [merchant account mapping](annexes#merchantAccountMapping) section. This allows transactions to be sent using your main Merchant Account and then routed automatically to the Planet Merchant Account in the same mapping group.

When UnionPay debit cards are issued, the Cardholder must register their mobile number with the Issuer. The SMS code authentication works at the time of checkout by submitting the payment details to UnionPay together with the Cardholder’s mobile number. The Issuer verifies the card and registered mobile number and sends an SMS message to the Cardholder’s mobile phone containing a unique 6-digit code. The Cardholder then enters this code into an authentication dialog provided by the Gateway so that it can be sent to UnionPay for verification.
If approved, the final financial transaction is submitted.

The authentication process is only required for debit cards. To accommodate the use of cards stored in secure online wallet, the card authentication has some built-in flexibility when other
compensating controls are employed.

SecurePlus transactions will appear in the Merchant Management System (MMS) alongside any card payments and can be captured, cancelled and refunded in the same way as card payments.

SecurePlus transactions can also be used for recurring billing with the SMS authentication not been required on recurring transactions as long as the initial transaction was successfully SMS authenticated.

For more information on how to accept SecurePlus transactions, please contact customer support.

:::tip
SecurePlus transactions are only available with a Planet Merchant Account.
::: 

## Benefits 

- Authorisations are available immediately and returned as part of the transaction.
- Provides your customers the flexibility of paying using their UnionPay debit card when this is more suitable to them than using other payment methods.
- Can be implemented with little or no extra integration work if you already support 3-D Secure transactions.
- There are no extra Gateway costs to use SecurePlus. Your Acquirer may charge to add this onto your business account; however, you may also find that your transaction charges are lower as a result of using 3-D Secure.
- Fully configurable within the Merchant Management System (MMS).

## Limitations 

- You will need a Planet Acquiring account, however, such an account can also be used to process all your other card transactions.
- Only UnionPay debit cards are supported, however, UnionPay credit cards can be accepted without the need for SecurePlus.
- You must currently provide the Gateway with the Cardholder’s mobile phone number at the time of the transaction. The Hosted Payment Page will prompt the Cardholder for this information if it detects that a UnionPay debit card is being supplied.
- The Cardholder must have access to their registered mobile phone during the payment process.
- Transactions require a browser in order to display the Customer SMS code entry dialog.

## Implementation 

If a transaction is sent to the Hosted Integration using a `merchantID` which is part of a routing group containing a Planet Merchant, then the Hosted Payment Page will automatically attempt to collect the Cardholder’s mobile phone number if they detect that a UnionPay debit card has been entered. It will then display the SecurePlus authentication page to allow the Cardholder to enter the received SMS code.

The SecurePlus authentication page is designed and controlled by the Gateway, but you can change the Merchant name and website address that is displayed on the form by sending the
`merchantName` and/or `merchantWebsite` request fields.

Any `merchantWebsite` must be a fully qualified URL containing at least the scheme and host components.