---
sidebar_position: 1
---

# Overview

## Introduction 

The Hosted Integration method makes it easy to add secure payment processing to your e-commerce business, using our **Hosted Payment Page**. You can use this method if you **do not want to collect and store cardholder data**.

The Hosted integration works by redirecting the customer to our Gateway’s Hosted Payment Page, which will collect the Customer’s payment details and process the payment before redirecting the customer back to a page on your website, letting you know the payment outcome. **This is the quickest path to integrating with the Gateway**.
The standard Hosted Payment Page is designed to be shown in a lightbox (modal) over your website and styled with logos and colours to match. Alternatively, you can arrange for fully customised Hosted Payment Pages to be produced that can match your website’s style and layout. These fully customised pages are usually provided using a browser redirect, displaying full-page in the browser, or can be displayed embedded in an iframe on your website.

By using the hosted payment page integration, **you are kept out of the EMV 3D-Secure flow** which allows you to keep the integration very simple without any added complexity.

## Security and Compliance 

If you use Hosted Payment Pages with the Hosted Integration then your webserver does not need an SSL certificate and you require the **lowest level of PCI DSS compliance**.

The Gateway will make transaction details available for a maximum period of 13 months. Your acquirer may hold information for a different period of time.

## Authentication 

You will need the following information to integrate with the Gateway which will be provided during onboarding:

| Name      | Description |
| ----------- | ----------- |
| Merchant Account ID | Your unique Merchant Account ID. |
| Hosted Integration URL | Your unique URL to use the Hosted Integration. |

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

## Hosted HTTP Requests 

When using the Hosted Integration, the request must be sent from the Customer’s web browser as the response will be a HTML Hosted Payment Page (HPP), used to collect the Customer’s details. The format of the request is designed so that it can be sent using a standard HTML form with the data in hidden form fields. The browser will then automatically encode the request correctly according to `application/x-www-form-urlencoded` format.

When the Hosted Payment Page has been completed and the payment processed, the Customer’s browser will be automatically redirected to the URL provided via the `redirectURL` field. The response will be returned to this page in `application/x-www-form-urlencoded` format, using a HTTP POST request.

All request fields will be returned in the response and a merchant may add custom request fields. If the request contains a field that is also intended as a response field, then any incoming request value will be overwritten by the correct response value.


## Redirect URL {#redirectUrl}

The `redirectURL` request field is mandatory and used to provide the URL of a webpage on your server.

For the Hosted Integration, the Customers browser will load this URL when the Hosted Payment Page has completed and can be used to continue the payment journey on your website. The URL will be loaded using a HTTP POST request containing transaction response data allowing you to tailor the journey depending on the outcome of the transaction.

The `redirectURL` must be a fully qualified URL, containing at least the scheme and host components.

**It is strongly recommended that the response data sent to the `redirectURL` be used to display a payment confirmation page only and not used to update your backend systems. The Customer may close their browser before the redirection happens resulting in you never receiving this data. Please use the callbackURL if you need to update your backend systems.**


## Callback URL {#callbackUrl}

The `callbackURL` request field allows you optionally to request that the Gateway sends a copy of the response to an alternative URL. In this case, each response will then be POSTed to this URL in addition to the normal response. This allows you to specify a URL on a secure shopping cart or backend order processing system, which will then fulfil any order associated with the transaction.
The callbackURL must be a fully qualified URL, containing at least the scheme and host components.

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
