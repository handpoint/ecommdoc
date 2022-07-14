---
sidebar_position: 1
id: Overview
---
## Introduction 

The Batch Integration is an enhancement to the Direct Integration, allowing you to send multiple transactions in a single request and monitor their status. This is useful if you wish to capture multiple transactions or collect multiple payments – for example, collecting subscription charges or loan repayments.
In addition to basic sales processing, the Batch Integration can be used to perform other actions, such as refunds and cancellations, which can provide a more advanced integration with our Gateway.

Unlike the Hosted and Direct Integrations, the Batch Integration does not process transactions sent to it immediately. Instead, the Gateway queues these transactions to be processed and returns a batch reference number which can be used to download a file that contains the current status of the transactions.

**Batch Processing does not support transactions that require Customer interaction such as 3-D Secure transactions, or alternative payment methods with interactive Wallet or Checkout pages. It is also important to note that the Gateway does not support Dynamic Currency Conversion (DCC) with the batch integration method.**

## Security and Compliance 

If you use  Hosted Payment Fields with the  Batch Integrations, then your webserver does not need an SSL certificate and you require the lowest level of PCI DSS compliance.

If your website collects and/or stores sensitive Cardholder data, such as the card number (PAN) or card security code (CVV/CV2), then your webserver must have an SSL certificate and serve all payment forms using HTTPS. You will also need a higher level of PCI DSS compliance and complete a PCI validation form annually. 

The Gateway will make transaction details available for a maximum period of 13 months. Your acquirer may hold information for a different period of time.



## Authentication 

You will need the following information to integrate with the Gateway which will be provided during onboarding:

| Name      | Description |
| ----------- | ----------- |
| Merchant Account ID | Your unique Merchant Account ID. |
| Batch Integration URL | Your unique URL to use the Batch Integration. |

 You will be provided with unique production and test Merchant Account IDs during the onboarding process. You will also be provided with the integration URL. 

All requests must specify which merchant account they are for, using the merchantID request field. In addition to this, the following security measures can be used:

### Password authentication

A password can be configured for each Merchant Account. This password must then be sent in the merchantPwd field in each request. If an incorrect password is received by the Gateway, then the transaction will be aborted and an error response is returned.

:::warning 
Use of a password is discouraged in any integration where the transaction is posted from a form in the client browser as the password may appear in plain text in code.
:::

### Message signing 

A signing secret phrase can be configured for each merchant account. When configured, each request will need to be ‘signed’ by providing a signature field containing a hash generated from the combination of the serialised request and this signing secret phrase. On receipt, the Gateway will then re-generate the hash and compare it with the one sent. If the two hashes are different then the request received must not be the same as that sent and so the contents must have been tampered with and the transaction will be aborted and an error response is returned.

The Gateway will also return the hash of the response message in the returned signature field, allowing you to create your own hash of the response (minus the signature field) and verify that the hashes match. The data POSTed to any callback URL will also be signed. See [signature calculation](annexes#signatureCalculation) for information on how to create the hash.

**Message signing maybe mandatory on some Merchant Accounts**

## Allowed IP addresses

You can configure a list of allowed IP addresses. Two different address lists can be configured, one for standard requests, such as sales; and one for advanced requests, such as refunds and cancellations. If a request is received from an address other than those configured, then it will be aborted and an error response is returned.

## HTTP Requests 

A request can be sent to the Gateway by submitting a HTTP POST request to the integration URL provided.

The request should have a `Content-Type: application/x-www-form-urlencoded` HTTP header and the request should be name, value pairs URL encoded as per RFC 1738.
Complex fields consisting of single or multidimensional records or arrays must be formatted as per the [PHP http_build_query method](https://www.php.net/manual/en/function.http-build-query.php) using square brackets to represent multiple dimensions. The sub-field names must be numeric or alphanumeric only, alphanumeric fields must not start with a numeric. Any square brackets around the nested field names should be URL encoded, [ as %5B and ] as %5D.

The following example request contains a complex items field consisting of an array of records representing the following table of purchased items.

| Description | Quantity | Amount |
| ----------- | ----------- | -----------  |
| Newspaper | 1 | 110 |
| Chocolate bar | 3 |249 |
| Carrier bag | 1 | 10 |

For example, a request would be URL encoded as:
merchantID=100001&action=SALE&type=1&amount=1001&currencyCode=826&countryCode=826&transactionUnique=55f6db1c81d95&orderRef=Test+purchase&customerPostCode=NN17+8YG&responseCode=0&responseMessage=AUTHCODE%3A350333&state=captured&xref=15091702MG47WN32MM88LPK&cardNumber=4929+4212+3460+0821&cardExpiryDate=1215&items%5B0%5D%5Bdescription%5D=Newspaper&items%5B0%5D%5Bquantity%5D=1&items%5B0%5D%5Bamount%5D=110&items%5B1%5D%5Bdescription%5D=Chocolate+bar&items%5B1%5D%5Bquantity%5D=3&items%5B1%5D%5Bamount%5D=249&items%5B2%5D%5Bdescription%5D=Carrier+bag&items%5B2%5D%5Bquantity%5D=1&items%5B2%5D%5Bamount%5D=1

**Please note that the field and sub-field names must be alphanumeric only and are cAsE sEnSiTiVe. Root integration fields must be numeric only and alphanumeric fields must not start with a numeric.** 

The response will use the same URL encoding and return the request fields in addition to any dedicated response field. If the request contains a field that is also intended as a response field, then any incoming request value will be overwritten by the correct response value.

**The Gateway may add new request and response fields at any time and so your integration must take care not to send request fields that may conflict with future Gateway fields and be able to ignore response fields which it doesn’t yet understand.**

## Batch HTTP Requests

When using the Batch Integration, a single HTTP POST request can contain multiple individual requests using the `multipart/mixed` content type with a boundary string specified. Within that main HTTP request, each of the parts contains a nested Direct Integration HTTP request, separated by the boundary string.

Each part should begin with a `Content-Type: application/x-www-form-urlencoded` HTTP header and contain a single [Direct Integration HTTP request](/directintegration/overview#directHttpRequests).

You can optionally specify a `Content-Id` HTTP header to identify each part message uniquely; if not provided, the Gateway will assign a unique id to each part. The `Content-Id` HTTP header is returned in the response. The Gateway will not validate the uniqueness of any id provided. After the mandatory `Content-type` and the optional `Content-Id` header, two carriage return/line feed pairs must follow (ie \r\n\r\n). Any deviation from this structure might lead to the part being rejected or incorrectly interpreted. The part request payload, formatted as a regular HTTP URL encoded request, must follow the two line breaks directly.

To reduce the size of large batch requests, the Gateway supports compression using a `Content-Encoding` HTTP header with either a ‘gzip’ or ‘x-gzip’ value. This header can be provided in the
main request or in the part request or both.

An `Authorization` HTTP header can be used in the request to provide the username and password of a Gateway Merchant Management System user account. If correct, the batch details
will be recorded as having been submitted by that user; if invalid, then the request will fail and respond with a 401 (Unauthorised) HTTP status code.

The Gateway will respond in the same manner as the request with a multipart/mixed content type; each part is the response to one of the requests in the batched request. In addition, the
response will contain a standard `Location` HTTP header, providing a URL from which further batch update responses can be downloaded; and a standard `Content-Disposition` header, allowing a browser to download the response to a file. If the request contained an `Authorization` HTTP header, then the response will contain an `X-P3-Token` HTTP header containing an authentication token that can be sent in future requests instead of the username and
password. The authentication token has a limited life span, but each future request will return  new token and thus effectively rejuvenate the token’s life.

Like the parts in the request, each response part contains a HTTP response, including headers and body. Each response part is preceded by a `Content-Type` HTTP header and `Content-ID` HTTP header. In addition, an `X-Transaction-ID` HTTP header is added containing the requests transaction id together with an `X-Transaction-Response` HTTP header containing a textual description of the transaction processing status.

The Gateway will not process the transactions immediately but will queue them up to process over time. The transactions may not be processed in the order provided, so should not have interdependencies. Transactions will only appear in the Merchant Management System when they have been processed. The status of queued transaction is only available by querying the status of the batch.

The current status of a batch can be queried at any time by issuing a HTTP GET request to the URL provided in the initial responses `Location` HTTP header.

An `Authorization` HTTP header must be provided in the status request, containing either the username and password of a Gateway Merchant Management System user account or an authentication token returned in the batch submission response’s `X-P3-Token` HTTP header. If a valid username and password or a valid token is provided, then the response will be an updated version of the initial submission response providing the current status of each transaction. The response will only contain transactions that the authenticated user has permission to view.

All request fields will be returned in the response and a Merchant may add custom request fields. If the request contains a field that is also intended as a response field, then any incoming request value will be overwritten by the correct response value. 

## Handling Errors 

When the Gateway is uncontactable due to a communications error, or problem with the internet connection, you may receive a HTTP status code in the 500 to 599 range. In this situation, you may want to retry the transaction. If you do choose to retry a transaction, then we recommend that you perform a limited number of attempts with an increasing delay between each attempt.

If the Gateway is unavailable during a scheduled maintenance period, you will receive a HTTP status code of 503 ‘Service Temporarily Unavailable’. In this situation, you should retry the transaction after the scheduled maintenance period has expired. You will be notified of the times and durations of any such scheduled maintenance periods in advance, by email, and given a time when transactions can be reattempted.

If you are experiencing these errors, then we recommend you consider the following steps as appropriate for the integration method being used:
- Ensure the request is being sent to HTTPS and not HTTP. HTTP is not supported and is not redirected.
- Send transactions sequentially rather than concurrently.
- Configure your integration code with try/catch loops around individual transactions to determine whether they were successful or not and retry if required, based on the return code or HTTP status returned.
- Configure the integration so that if one transaction fails, the entire batch does not stop at that point – ie log the failure to be checked and then skip to the next transaction rather than stopping entirely.

## Redirect URL {#redirectUrl}

The `redirectURL` request field is used to provide the URL of a webpage on your server. Unfortunately this is NOT supported for batch integrations.

## Callback URL {#callbackUrl}

The `callbackURL` request field allows you to request that the Gateway sends a copy of the response to an alternative URL. Unfortunately this is NOT supported for batch integrations.

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

Note: Record format is useful when posting sub-fields directly from individual field in a HTML FORM. However, unlike the main integration fields, a record’s sub-fields are not sorted when constructing the signature and are processed in the order received. Serialised record format can overcome any problems caused by the sub-fields of a record being received in a different order to that used when generating the signature. Not all fields using the record format also support the serialised record format especially the `threeDSRequest`, `threeDSResponse`, `checkoutRequest`, `checkoutResponse` and the purchase `items` field.

Boolean values cannot be represented when using the record format or the `application/x-www-form-urlencoded` serialised record format and the words ‘true’ and ‘false’ must be used. The JSON serialised record format does not have this restriction and a JSON boolean can be used.