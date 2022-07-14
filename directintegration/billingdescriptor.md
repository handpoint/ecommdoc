---
sidebar_position: 9
---

# Billing Descriptor

## Background

The Billing Descriptor is how your details appear on the Cardholder’s statement. It is set up with the Acquirer when the Merchant Account is opened. It is used by the Cardholder to identify who a payment was made to on a particular transaction.

Selecting a clear Billing Descriptor is important for you to avoid a chargeback when the Cardholder does not recognise the name on the transaction.

### Static Descriptor 

The Static Descriptor is the descriptor agreed between yourself and your Acquirer when the Merchant Account is opened. The descriptor used is typically your trading name, location and contact phone number.

### Dynamic Descriptor {#dynamicDescriptor}

The Dynamic Descriptor is a descriptor sent with the transaction that includes details on the goods purchased or service provided, this is often used by large companies that provide many services and where the brand of the service is more familiar than the company name. The Dynamic Descriptor usually replaces any Static Descriptor on a per transaction basis.

Not all Acquirers accept Dynamic Descriptors and, for those that do, the required format varies. Often, your Merchant name is shortened to three (3) letters, followed by an asterisk (*), followed by a short description of the service or product that the business provides. This field typically has a limit of twenty-five (25) characters including the phone number.

For more information on whether your Acquirer allows Dynamic Descriptor and the format in which they should be sent, please contact customer support.

## Request Fields 

The Dynamic Descriptor is built using one or more of the following narrative fields.

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| statementNarrative1 | No | Merchant’s name.|
| statementNarrative2 | No | Product, service or other descriptive info.|