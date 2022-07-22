---
sidebar_position: 30
---

# Annexes 

## Capture Delay {#captureDelay}

#### Overview

Capture Delay enables you to specify a delay between the authorisation of a payment and its capture. This allows you time to verify the order and choose whether to fulfil it or cancel it. This can be very helpful in preventing chargebacks due to fraud.

When NOT using capture delay, payments are authorised and captured immediately - funds are automatically debited from the Customer’s credit or debit card at that time.

When using capture delay, the payment is authorised only at the time of payment - funds are reserved against the credit or debit card and will not be debited until the payment is captured. 

The Customer experience with capture delay is the same as when capture delay is not used. The Customer will not know whether you are using capture delay or not.

If you choose to use capture delay, you can use the captureDelay request field to specify the number of days for which capture is delayed, within a range of 0 to 30 days. Alternatively, you can use the value -1 or ‘never’ to specify that the Gateway should never automatically capture in which case you must manually capture.

The Gateway will automatically capture the transaction after any delay specified unless you manually cancel or capture the transaction, using either the Direct Integration or via the Merchant Management System (MMS).

Note that some cards require capture within 4 to 5 days - if payment is not automatically captured within that period, the transaction will expire, and the reserved funds will be released to the Customer.

#### Why Use Capture Delay?

Capture delay allows you to accept online orders normally but allows you to cancel any transactions that you cannot or will not fulfil, thereby reducing the risks of chargeback. If you receive an order that appears to be fraudulent or that you cannot or do not wish to fulfil, you can simply cancel the transaction.

Note: Cancelling a transaction may not always reverse the authorisation and release the funds back to the Customer. This is dependent on the Acquirer and in these cases the authorisation will never be settled and will be left to expire releasing any reserved funds. The time taken for this varies between cards.

Some Acquirers do not support delayed capture, in which case the Hosted Integration will return a responseCode of 66358 (INVALID CAPTURE DELAY).

## Transaction Types Definitions

The Gateway supports card not present (CNP) types of transactions, made where the Cardholder does not or cannot physically present the card for your visual examination at the time that an order is placed and payment effected.
The type of transaction required is specified using the `type` request field when performing a new payment transaction.

#### E-Commerce (ECOM) {#ecommerce}

E-commerce transactions are supported by the Gateway by using a transaction `type` of `1`. They are designed for you to accept payments via a website, such as a shopping cart payment. E-commerce transactions MUST use advance fraud detection, such as 3-D Secure V2.

#### Mail Order/Telephone Order (MOTO){#moto}

Mail Order/Telephone Order transactions are supported by the Gateway by using a transaction `type` of `2`. They are designed for you to build your own virtual terminal system to enter remote order details. MOTO transactions cannot use 3-D Secure as the cardholder is not able to perform the challenge.

Your Acquirer may need to enable MOTO capabilities on your main acquiring account, or they provide a separate acquiring account which will be available through its own Gateway Merchant Account.

#### Continuous Authority (CA) {#continuousAuthority}

Continuous Authority transactions are supported by the Gateway by using a transaction `type` of `9`. They are designed for you to make subscription transactions. 

The following transaction types are considered as Continuous Authority (CA) Payments :
- Instalment Payments: A transaction in a series of transactions that use a stored credential and that represent Consumer agreement for the merchant to initiate one or more future transactions over a period for a single purchase of goods or services. An example of such a transaction is a higher purchase repayment.

- Recurring Payments: A transaction in a series of transactions that use a stored credential and that are processed at fixed, regular intervals (not to exceed one year between transactions), representing Consumer agreement for the merchant to initiate future transactions for the purchase of goods or services provided at regular intervals. An example of such a transaction is a gym membership subscription.

Your Acquirer may need to enable Continuous Authority capabilities on your main acquiring account, or they provide a separate acquiring account which will be available through its own Gateway Merchant Account.

The Gateway offers a mean of automating the taking of regular CA transactions using [Recurring Transaction Agreements (RTA)](recurringtransactionagreements).

## Transaction Cloning {#transactionCloning}

## Payment Tokenisation {#paymentTokenisation}

## Transaction States {#transactionStates}

## Response Codes {#responseCodes}

## AVS / CV2 Check Response Codes {#AvsResponseCodes}

## Card Identification {#cardIdentification}

## Device Information Fields {#deviceInformationFields}

## SCA Using 3-D Secure {#scaUsing3dSecure}

## Exemptions to Strong Customer Authentication {#scaExemptions}

## Merchant Request Fields {#merchantRequestFields}

## Card Identification {#cardIdentification}

## Merchant Account Mapping {#merchantAccountMapping}

## Authorise, Capture and Settlement {#authoriseCaptureSettlement}