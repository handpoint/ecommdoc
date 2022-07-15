---
sidebar_position: 16
---

# Custom Data 

You may send arbitrary data with the request by appending extra fields, which will be returned unmodified in the response. These extra fields are merely ‘echoed’ back and not stored by the Gateway.

Caution should be made to ensure that any extra fields do not match any currently documented fields or possible future fields. One way to do this is to prefix the field names with a value unique to you, the Merchant.

If the request contains a field that is also intended as a response field, then any incoming request value will be overwritten by the correct response value.

**The Gateway may add new request and response fields at any time and so your integration must take care not to send request fields that may conflict with future Gateway fields and be able to ignore response fields which it doesn’t yet understand.**

You can also use the `merchantData` field to store custom data with the transaction. This stored data can then be retrieved at a later date, using a QUERY request. Complex data can be stored as per the details for nested records as described in the [format guide](overview#fieldFormats), however the Gateway does not currently support these fields to be provided in the serialised record format. Alternatively, you can serialise the data before storing and unserialise it on retrieval.

## Request Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| merchantData | No | Arbitrary data to be stored together with this transaction. |