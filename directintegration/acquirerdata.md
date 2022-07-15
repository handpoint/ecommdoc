---
sidebar_position: 18
---

# Acquirer Data 

The Gateway supports the passing of Acquirer specific data where needed by an individual Acquirer to provide additional or non-standard features.

When supported, this data can be passed in the acquirerOptions request field, which must be provided using the record or serialised record format detailed in the [format guide](overview#fieldFormats).

Please contact our customer support team if you need information about what options can be provided to your Acquirer.

The Gateway also supports the returning of Acquirer specific details in the request in situations where the Gateway considers the data to be of value.

When supported, this data will be returned in the acquirerResponseDetails response field, which will be returned using the record format detailed in the [format guide](overview#fieldFormats).

In addition to this the Gateway will return the original response code and message received from the Acquirer and any transaction referenced provided by the Acquirer. This later reference can help you identify the transaction when you have access to the Acquirers merchant management portal or need to contact them to query a transaction.

The original Acquirer response code may not be numeric and information on these codes will need to be requested from the Acquirer.

**The Gateway may support new acquirer options and return new acquirer details at any time and so your integration must be able to handle such changes and not reject unknown fields.**

## Request Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| acquirerOptions | No | Record containing Acquirer specific options.|

## Response Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| acquirerResponseCode | No | Response code supplied by the Acquirer, maybe prefixed with ‘G:’ if the Acquirer is itself a payment Gateway.|
| acquirerResponseMessage | No | Response message supplied the Acquirer.|
| acquirerResponseDetails | No | Record containing Acquirer specific response details.|
| acquirerTransactionID | No | Transaction identifier/reference used to identify the transaction in the Acquirer’s system.|