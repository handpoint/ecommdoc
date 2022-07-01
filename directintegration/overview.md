---
sidebar_position: 1
id: overview
---

# Overview

The Direct Integration works by allowing you to keep the customer on your system throughout the checkout process, collecting the customer’s payment details on your own secure server before sending the collected data to our Gateway for processing. This allows you to provide a smoother, more complete checkout process to the Customer.
In addition to basic sales processing, the Direct Integration can be used to perform other actions such as refunds and cancellations, which can provide a more advanced integration with our Gateway.

## Security and Compliance 

If your website collects and/or stores sensitive Cardholder data, such as the card number (PAN) or card security code (CVV/CV2), then your webserver must have an SSL certificate and serve all payment forms using HTTPS. You will also need a higher level of PCI DSS compliance and complete a PCI validation form annually. 

The Gateway will make transaction details available for a maximum period of 13 months. Your acquirer may hold information for a different period of time.

## Authentication 

You will need the following information to integrate with the Gateway which will be provided during onboarding:

| Name      | Description |
| ----------- | ----------- |
| Merchant Account ID | Your unique Merchant Account ID. |
| Direct Integration URL | Your unique URL to use the Direct Integration. |

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

## Direct HTTP Requests {#directHttpRequests}

When using the Direct Integration, the response will be received in the same URL encoded format, unless a `redirectURL` field is provided.

If a `redirectURL` field is provided, then the response will be a HTML page designed to redirect a browser to the URL provided, using a HTTP POST request containing the response. This allows you to collect the cardholder’s payment details on your own server, using a HTML form which POSTs to the Direct Integration, which then effectively POSTs the results back to this URL your webserver, where you can display the transaction outcome.

All request fields will be returned in the response and a Merchant may add custom request fields. If the request contains a field that is also intended as a response field,
then any incoming request value will be overwritten by the correct response value.