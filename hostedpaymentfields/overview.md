---
sidebar_position: 1
id: overview
---

# Overview

## Introduction 

The Hosted Integration method makes it easy to add secure payment processing to your e-commerce business, using our **Hosted Payment Fields**. You can use this method if you **do not want to collect and store cardholder data**.

For greater control over the customisation of the payment page, our Gateway offers the use of Hosted Payment Fields, where only the individual input fields collecting the sensitive cardholder data are hosted by the Gateway while the remainder of the payment form is provided by your website. These Hosted Payment Fields fit seamlessly into your payment page and can be styled to match your payment fields. When your payment form is submitted to your server, the Gateway will submit a payment token representing the sensitive card data it collected and your webserver can then use the [Direct Integration](directintegration/overview)  to process the payment without ever being in contact with the collected cardholder data. 

## Security and Compliance 

If you use Hosted Payment Fields with the Direct or Batch Integrations, then your webserver does not need an SSL certificate and you require the **lowest level of PCI DSS compliance**.

The Gateway will make transaction details available for a maximum period of 13 months. Your acquirer may hold information for a different period of time.

## Authentication 

You will need the following information to integrate with the Gateway which will be provided during onboarding:

| Name      | Description |
| ----------- | ----------- |
| Merchant Account ID | Your unique Merchant Account ID. |
| Direct Integration URL | Your unique URL to use the Direct Integration. |
| Batch Integration URL (Optional) | Your unique URL to use the Batch Integration. |

 You will be provided with unique production and test Merchant Account IDs during the onboarding process. You will also be provided with the integration URL. 

All requests must specify which merchant account they are for, using the merchantID request field. In addition to this, message signing is enforced. 

### Message signing 

You must configure a signing secret phrase for each merchant account. When configured, each request will need to be ‘signed’ by providing a signature field containing a hash generated from the combination of the serialised request and this signing secret phrase. On receipt, the Gateway will then re-generate the hash and compare it with the one sent. If the two hashes are different then the request received must not be the same as that sent and so the contents must have been tampered with and the transaction will be aborted and an error response is returned.

The Gateway will also return the hash of the response message in the returned signature field, allowing you to create your own hash of the response (minus the signature field) and verify that the hashes match. The data POSTed to any callback URL will also be signed. See [signature calculation](annexes#signatureCalculation) for information on how to create the hash.



## Handling Errors 

When the Gateway is uncontactable due to a communications error, or problem with the internet connection, you may receive a HTTP status code in the 500 to 599 range. In this situation, you may want to retry the transaction. If you do choose to retry a transaction, then we recommend that you perform a limited number of attempts with an increasing delay between each attempt.

If the Gateway is unavailable during a scheduled maintenance period, you will receive a HTTP status code of 503 ‘Service Temporarily Unavailable’. In this situation, you should retry the transaction after the scheduled maintenance period has expired. You will be notified of the times and durations of any such scheduled maintenance periods in advance, by email, and given a time when transactions can be reattempted.

If you are experiencing these errors, then we recommend you consider the following steps as appropriate for the integration method being used:
- Ensure the request is being sent to HTTPS and not HTTP. HTTP is not supported and is not redirected.
- Send transactions sequentially rather than concurrently.
- Configure your integration code with try/catch loops around individual transactions to determine whether they were successful or not and retry if required, based on the return code or HTTP status returned.
- Configure the integration so that if one transaction fails, the entire batch does not stop at that point – ie log the failure to be checked and then skip to the next transaction rather than stopping entirely.

## Redirect URL {#redirectUrl}

The `redirectURL` request field is used to provide the URL of a webpage on your server.

When provided, the Gateway will respond with a HTML page designed to redirect the Customer’s browser to the URL provided, using a HTTP POST request containing the URL encoded response.
For the Hosted Integration, this will redirect the Customer from the Hosted Payment Page back to this URL on your website.

The `redirectURL` must be a fully qualified URL, containing at least the scheme and host components.

## Callback URL {#callbackUrl}

The callbackURL request field allows you optionally to request that the Gateway sends a copy of the response to an alternative URL. In this case, each response will then be POSTed to this URL in addition to the normal response. This allows you to specify a URL on a secure shopping cart or backend order processing system, which will then fulfil any order associated with the transaction. The callback URL is **optional**, it must be a fully qualified URL, containing at least the scheme and host components.

## Field Formats {#fieldFormats}

Most integration field values are either numerical or textual, and either free format or from a range of predetermined values. Some field values are records or arrays of records.

Unless otherwise stated, numerical values are whole integer values with no decimal points. Textual values should use the UTF-8 character set and will be automatically truncated if too long, unless stated otherwise in the field’s description. Textual values may be transliterated when sending to third parties such as Acquirers but the original value is stored by Gateway.

Field values should use the following formats unless otherwise stated in the field’s description:

| Field Type      | Value Format |
| ----------- | ----------- |
| Monetary Amounts | Either major currency units by providing a value that includes a single decimal point such as ’10.99’; or in minor currency units by providing a value that contains no decimal points such as ‘1099’. |
| Timestamps | Date in the format ‘YYYY-MM-DD HH:MM:SS’ |
| Dates | Date in the format ‘YYYY-MM-DD’ |
| Country Codes | Either the ISO-3166-1 2-letter, 3-letter or 3-digit code.|
| Currency Codes | Either the ISO-4217 3-letter or 3-digit code. |
| Records | Records can be provided using the [Y] notation, where Y is the record’s sub-field name. Records can be nested to any depth, that is a sub-field’s value can be another record. Arrays can be provided by using numeric sub-fields starting with the value 0 and incrementing by 1. For example: to send a value for the sub-field Z, of the sub-field Y in the integration field X, use the field name X[Y][Z]; however, to send a value for the sub-field Z in the fourth record for integration field X, then use the field name X[4][Z] etc. Boolean values must be sent as the words ‘true’ or ‘false’.|
| Serialised Records | Certain fields allow records to be sent as JSON or URL serialised strings. If the first character of the serialised string is ‘{‘, then the string is assumed to be in JSON format with any boolean values sent as their JSON equivalents, all other strings will be assumed to be application/x-www-form-urlencoded format with any boolean values sent as the words ‘true’ or ‘false’.|

Note: Record format is useful when posting sub-fields directly from individual field in a HTML FORM. However, unlike the main integration fields, a record’s sub-fields are not sorted when constructing the signature and are processed in the order received. Serialised record format can overcome any problems caused by the sub-fields of a record being received in a different order to that used when generating the signature. Not all fields using the record format also support the serialised record format especially the threeDSRequest, threeDSResponse, checkoutRequest, checkoutResponse and the purchase items field.

Boolean values cannot be represented when using the record format or the application/x-www-form-urlencoded serialised record format and the words ‘true’ and ‘false’ must be used. The JSON serialised record format does not have this restriction and a JSON boolean can be used.


