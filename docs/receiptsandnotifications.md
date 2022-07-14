---
sidebar_position: 11
---

# Receipts and Notifications 

## Background

The Gateway can be configured to email transaction receipts automatically to the Customer and notifications to the Merchant.

## Customer Email Receipts 

The Customer can be emailed a transaction receipt automatically each time a transaction is processed by the Gateway. Receipts are sent at the time the transaction is authorised and only for transactions where the Acquirer has approved the authorisation. Receipts are not sent for declined or referred authorisations or aborted transactions.

This functionality is enabled globally on a per Merchant Account basis using the Merchant Management System (MMS). This global setting can also be overridden per transaction if required, using the `customerReceiptsRequired` field.

Customer receipts require the Customer to provide an email address; if no email address is provided then no receipt will be sent.

## Merchant Email Notifications 

You can be automatically emailed a transaction notification each time a transaction is processed by the Gateway. Notifications are sent at the time the transaction is authorised and only for transactions where the Acquirer approved, declined or referred the authorisation. Notifications are not sent for aborted transactions.

This functionality is enabled globally on a per Merchant Account basis, using the Merchant Management System (MMS). This global setting can also be overridden per transaction if required, using the `notifyEmailRequired` field.

Merchant notifications require you to provide an email address; if no email address is provided, using the Merchant Management System (MMS) or the `notifyEmail` field, then no notification will be sent.

## Request Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| customerReceiptsRequired | No | Send a Customer receipt if possible.<br></br><br></br> Possible values are:<br></br> N – Don’t send a receipt.<br></br> Y – Send if Customer’s email provided.<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| customerEmail | No | Customer’s email address.|
| notifyEmailRequired | No | Send a notification email if possible.<br></br><br></br> Possible values are:<br></br> N – Don’t send a notification.<br></br> Y – Send if notification email provided.<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| notifyEmail | No | Merchant’s notification email address.<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|

## Response Fields 

The request fields for the required receipts and notifications are returned together with the appropriate fields from the following:

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| customerReceiptsResponseCode | If required | Result of sending email to Customer. Refer to [Response Codes](annexes#responseCodes) for more details.|
| customerReceiptsResponseMessage | If required | Description of above response code.|
| notifyEmailResponseCode | If required | Result of sending email to Merchant. Refer to [Response Codes](annexes#responseCodes) for more details.|
| notifyEmailResponseMessage | If required | Description of above response code.|