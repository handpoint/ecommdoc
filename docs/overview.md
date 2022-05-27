---
sidebar_position: 1
---

# Overview

## Introduction 

The Hosted Integration method makes it easy to add secure payment processing to your e-commerce business, using our Hosted Payment Pages (HPP). You can use this method if you do not want to collect and store Cardholder data.

The Hosted Integration method works by redirecting the Customer to our Gateway’s Hosted Payment Page, which will collect the Customer’s payment details and process the payment before redirecting the Customer back to a page on your website, letting you know the payment outcome. This allows you the quickest path to integrating with the Gateway.
The standard Hosted Payment Page is designed to be shown in a lightbox over your website and styled with logos and colours to match. Alternatively, you can arrange for fully customised Hosted Payment Pages to be produced that can match your website’s style and layout. These fully customised pages are usually provided using a browser redirect, displaying full-page in the browser, or can be displayed embedded in an iframe on your website.

For greater control over the customisation of the payment page, our Gateway offers the use of Hosted Payment Fields, where only the individual input fields collecting the sensitive Cardholder data are hosted by the Gateway while the remainder of the payment form is provided by your website. These Hosted Payment Fields fit seamlessly into your payment page and can be styled to match your payment fields. When your payment form is submitted to your server, the Gateway will submit a payment token representing the sensitive card data it collected and your webserver can then use the Direct Integration to process the payment without ever being in contact with the collected Cardholder data. For more information, please refer to our Hosted Payment Fields SDK Guide.

## Security and Compliance 

Each method requires a different level of server security and compliance with the Payment Card Industry Data Security Standard (PCI DSS).If you use Hosted Payment Pages with the Hosted Integration or Hosted Payment Fields with the Direct or Batch Integrations, then your webserver does not need an SSL certificate and you require the lowest level of PCI DSS compliance.

## Authentication 

You will need the following information to integrate with the Gateway which will be provided during onboarding:

| Name      | Description |
| ----------- | ----------- |
| Merchant Account ID | Your unique Merchant Account ID. |
| Hosted Integration URL | Your unique URL to use the Hosted Integration. |

 You will be provided with unique production and test Merchant Account IDs during the onboarding process. You will also be provided with the integration URL. 

All requests must specify which Merchant Account they are for, using the merchantID request field. In addition to this, message signing is often used.

 ### Message signing 

You can configure a signing secret phrase for each Merchant Account. When configured, each request will need to be ‘signed’ by providing a signature field containing a hash generated from the combination of the serialised request and this signing secret phrase. On receipt, the Gateway will then re-generate the hash and compare it with the one sent. If the two hashes are different then the request received must not be the same as that sent and so the contents must have been tampered with and the transaction will be aborted and an error response is returned.

The Gateway will also return hash of the response message in the returned signature field, allowing you to create your own hash of the response (minus the signature field) and verify that the hashes match.

**Message signing maybe mandatory on some Merchant Accounts**.
If message signing is enabled, then the data POSTed to any callback URL will also be signed.
See [signature calculation](annexes#signatureCalculation) for information on how to create the hash.


## Hosted HTTP Requests 

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

When using the Hosted Integration, the request must be sent from the Customer’s web browser as the response will be a HTML Hosted Payment Page (HPP), used to collect the Customer’s details. The format of the request is designed so that it can be sent using a standard HTML form with the data in hidden form fields. The browser will then automatically encode the request correctly according to application/x-www-form-urlencoded format.

When the Hosted Payment Page has been completed and the payment processed, the Customer’s browser will be automatically redirected to the URL provided via the redirectURL field. The response will be returned to this page in application/x-www-form-urlencoded format, using a HTTP POST request.

All request fields will be returned in the response and a Merchant may add custom request fields as detailed in our pdf documentation. If the request contains a field that is also intended as a response field, then any incoming request value will be overwritten by the correct response value.

**The Gateway may add new request and response fields at any time and so your integration must take care not to send request fields that may conflict with future Gateway fields and be able to ignore response fields which it doesn’t yet understand.**

## Handling Errors 

When the Gateway is uncontactable due to a communications error, or problem with the internet connection, you may receive a HTTP status code in the 500 to 599 range. In this situation, you may want to retry the transaction. If you do choose to retry a transaction, then we recommend that you perform a limited number of attempts with an increasing delay between each attempt.

If the Gateway is unavailable during a scheduled maintenance period, you will receive a HTTP status code of 503 ‘Service Temporarily Unavailable’. In this situation, you should retry the transaction after the scheduled maintenance period has expired. You will be notified of the times and durations of any such scheduled maintenance periods in advance, by email, and given a time when transactions can be reattempted.

If you are experiencing these errors, then we recommend you consider the following steps as appropriate for the integration method being used:
- Ensure the request is being sent to HTTPS and not HTTP. HTTP is not supported and is not redirected.
- Send transactions sequentially rather than concurrently.
- Configure your integration code with try/catch loops around individual transactions to determine whether they were successful or not and retry if required, based on the return code or HTTP status returned.
- Configure the integration so that if one transaction fails, the entire batch does not stop at that point – ie log the failure to be checked and then skip to the next transaction rather than stopping entirely.

## Redirect URL {#redirectUrl}

The redirectURL request field is used to provide the URL of a webpage on your server.

When provided, the Gateway will respond with a HTML page designed to redirect the Customer’s browser to the URL provided, using a HTTP POST request containing the URL encoded response.
For the Hosted Integration, this will redirect the Customer from the Hosted Payment Page back to this URL on your website.

The redirectURL must be a fully qualified URL, containing at least the scheme and host components.

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
