---
sidebar_position: 7
---

# Payment Facilitators

## Background

If you are a Payment Facilitator (PayFac/PF) or Independent Sales Organisation (ISO), then you must send additional fields to identify yourself and your sub-merchants.

These fields must be sent with every new transaction; however, they can be cloned from an existing transaction if using an xref as described in [transaction cloning](annexes#transactionCloning).

### Request Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| facilitatorID | <span class="badge badge--primary">Yes</span> | Your facilitator identifier as assigned by the Scheme.|
| facilitatorName | No | Your trading name as registered with the Scheme.|
| isoID | No | Your ISO identifier as assigned by the Scheme.|
| subMerchantID | No | Unique identifier assigned to this Sub Merchant.|
| merchantXXXX | No | Sub Merchant details as documented in the [merchant request fields](advanceddata#merchantRequestFields).|
| statementNarrativeX | No | Statement details as documented in [dynamic descriptor](billingdescriptor#dynamicDescriptor).|

Some of the above fields marked as optional might be mandatory depending on the acquirer you are working with. 