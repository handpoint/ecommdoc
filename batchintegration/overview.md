---
sidebar_position: 1
id: overview
---

The Batch Integration is an enhancement to the Direct Integration, allowing you to send multiple transactions in a single request and monitor their status. This is useful if you wish to capture multiple transactions or collect multiple payments – for example, collecting subscription charges or loan repayments.
In addition to basic sales processing, the Batch Integration can be used to perform other actions, such as refunds and cancellations, which can provide a more advanced integration with our Gateway.

Unlike the Hosted and Direct Integrations, the Batch Integration does not process transactions sent to it immediately. Instead, the Gateway queues these transactions to be processed and returns a batch reference number which can be used to download a file that contains the current status of the transactions.

atch Processing does not support transactions that require Customer interaction such as 3-D Secure transactions, or alternative payment methods with interactive Wallet or Checkout pages.

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

All requests must specify which merchant account they are for, using the merchantID request field. In addition to this, message signing is enforced.

### Message signing 

You must configure a signing secret phrase for each merchant account. When configured, each request will need to be ‘signed’ by providing a signature field containing a hash generated from the combination of the serialised request and this signing secret phrase. On receipt, the Gateway will then re-generate the hash and compare it with the one sent. If the two hashes are different then the request received must not be the same as that sent and so the contents must have been tampered with and the transaction will be aborted and an error response is returned.

The Gateway will also return the hash of the response message in the returned signature field, allowing you to create your own hash of the response (minus the signature field) and verify that the hashes match. The data POSTed to any callback URL will also be signed. See [signature calculation](annexes#signatureCalculation) for information on how to create the hash.

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

Each part should begin with a `Content-Type: application/x-www-form-urlencoded` HTTP header and contain a single [Direct Integration HTTP request](/directintegration/overview#directHttpRequests)

You can optionally specify a Content-Id HTTP header to identify each part message uniquely; if
not provided, the Gateway will assign a unique id to each part. The Content-Id HTTP header is
returned in the response. The Gateway will not validate the uniqueness of any id provided. After
the mandatory Content-type and the optional Content-Id header, two carriage return/line
feed pairs must follow (ie \r\n\r\n). Any deviation from this structure might lead to the part being
rejected or incorrectly interpreted. The part request payload, formatted as a regular HTTP URL
encoded request, must follow the two line breaks directly.
To reduce the size of large batch requests, the Gateway supports compression using a ContentEncoding HTTP header with either a ‘gzip’ or ‘x-gzip’ value. This header can be provided in the
main request or in the part request or both.
An Authorization HTTP header can be used in the request to provide the username and
password of a Gateway Merchant Management System user account. If correct, the batch details
will be recorded as having been submitted by that user; if invalid, then the request will fail and
respond with a 401 (Unauthorised) HTTP status code.
The Gateway will respond in the same manner as the request with a multipart/mixed content
type; each part is the response to one of the requests in the batched request. In addition, the
response will contain a standard Location HTTP header, providing a URL from which further
batch update responses can be downloaded; and a standard Content-Disposition header,
allowing a browser to download the response to a file. If the request contained an
Authorization HTTP header, then the response will contain an X-P3-Token HTTP header
containing an authentication token that can be sent in future requests instead of the username and
password. The authentication token has a limited life span, but each future request will return a
new token and thus effectively rejuvenate the token’s life.
Like the parts in the request, each response part contains a HTTP response, including headers
and body. Each response part is preceded by a Content-Type HTTP header and Content-ID
HTTP header. In addition, an X-Transaction-ID HTTP header is added containing the
requests transaction id together with an X-Transaction-Response HTTP header containing a
textual description of the transaction processing status.

The Gateway will not process the transactions immediately but will queue them up to process over
time. The transactions may not be processed in the order provided, so should not have
interdependencies. Transactions will only appear in the Merchant Management System when they
have been processed. The status of queued transaction is only available by querying the status of
the batch.
The current status of a batch can be queried at any time by issuing a HTTP GET request to the
URL provided in the initial responses Location HTTP header.
An Authorization HTTP header must be provided in the status request, containing either the
username and password of a Gateway Merchant Management System user account or an
authentication token returned in the batch submission response’s X-P3-Token HTTP header. If a
valid username and password or a valid token is provided, then the response will be an updated
version of the initial submission response providing the current status of each transaction. The
response will only contain transactions that the authenticated user has permission to view.
All request fields will be returned in the response and a Merchant may add custom request fields
as detailed in section 16. If the request contains a field that is also intended as a response field,
then any incoming request value will be overwritten by the correct response value.
The Gateway may add new request and response fields at any time and so your integration
must take care not to send request fields that may conflict with future Gateway fields and
be able to ignore response fields which it doesn’t yet understand.
An example of a Batch Integration request is provided in appendix A-21.3 and sample code is
provided in appendix A-22.3.