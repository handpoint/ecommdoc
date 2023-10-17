---
sidebar_position: 2
---

# Sample Code & Examples

## Hosted Payment Page - Integration methods 

### Sample Code - Embed the hosted payment page in a Lightbox (modal) over your website

The following example code shows how to embed the hosted payment page in a lightbox (modal) over your website. You can use the following test card details to fill out the payment form: 

| Cardholder Name | Card Number | Expiry Date | CVV/CVC2 | 
| ----------- | ----------- | ----------- | ----------- |
| Any cardholder name (ex: John Doe)  | 5573 4712 3456 7898 | Any date in the future (12/31) | 159 |

:::info

An expiry month of **12** (December) will simulate the non frictionless flow and a challenge will appear to the cardholder. 

:::


<iframe width="100%" height="650" src="//jsfiddle.net/Handpoint/vg9on6j0/50/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### Sample Code - Embed the hosted payment page in an iFrame

The following example code shows how to embed the hosted payment page as an iFrame into your website. You can use the following test card details to fill out the payment form: 

| Cardholder Name | Card Number | Expiry Date | CVV/CVC2 | 
| ----------- | ----------- | ----------- | ----------- |
|Any cardholder name (ex: John Doe) | 5573 4712 3456 7898 | Any date in the future (12/2031) | 159 |

Note : The address has been pre-filled from the code sample to demonstrate that some of the fields of the payment form can be pre-populated. 

:::info

An expiry month of **12** (December) will simulate the non frictionless flow and a challenge will appear to the cardholder. 

:::


<iframe width="100%" height="700" src="//jsfiddle.net/Handpoint/xg0dptsw/44/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### Sample Code - Redirect the user to a fully separate hosted payment page

The following example code shows how to redirect the user to a secure hosted payment page running on the Handpoint servers. You can use the following test card details to fill out the payment form: 

| Cardholder Name | Card Number | Expiry Date | CVV/CVC2 | 
| ----------- | ----------- | ----------- | ----------- |
|Any cardholder name (ex: John Doe) | 5573 4712 3456 7898 | Any date in the future (12/2031) | 159 |

:::info

An expiry month of **12** (December) will simulate the non frictionless flow and a challenge will appear to the cardholder. 

:::

<iframe width="100%" height="900" src="//jsfiddle.net/Handpoint/32tmc70h/52/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest sandbox='allow-forms allow-popups allow-scripts allow-same-origin allow-modals allow-top-navigation-by-user-activation' frameborder="0"></iframe>


## Hosted Payment Page - Transaction Types

All requests must specify the action to be performed, using the `action` request field.

### Sample Code - SALE

This `form` will start a new SALE transaction (10.01 GBP) and attempt to seek authorisation from the card issuer. You can use the following test card details to fill out the payment form: 

| Cardholder Name | Card Number | Expiry Date | CVV/CVC2 | 
| ----------- | ----------- | ----------- | ----------- |
| Any cardholder name (ex: John Doe)  | 5573 4712 3456 7898 | Any date in the future (12/31) | 159 |

:::info

An expiry month of **12** (December) will simulate the non frictionless flow and a challenge will appear to the cardholder. 

:::

```html
<!--form example of SALE (Amount:10,01GBP)-->

<form id="paynow" name="payment-form" method="post" action="https://commerce-api.handpoint.com/hosted/modal/" data-hostedforms-modal>
          <input type="hidden" name="merchantID" value="155928" /> <!-- merchantID will be provided by the Handpoint Support team -->
          <input type="hidden" name="action" value="SALE" /> <!-- action could be SALE, VERIFY or PREAUTH -->
          <input type="hidden" name="type" value="1" /> <!-- 1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA) -->
          <input type="hidden" name="currencyCode" value="826" /> <!-- ISO 3-letter currency code. 826-> GBP -->
          <input type="hidden" name="countryCode" value="826" /> <!-- ISO 3-letter country code. 826-> United Kingdom -->
          <input type="hidden" name="amount" value="1001" /> <!-- Either major currency units includes a single decimal point such as ’10.99’; or minor currency units contains no decimal points such as ‘1099’.  -->
          <input type="hidden" name="orderRef" value="Test purchase" /> <!--Free format text field to store order details, reference numbers, etc. for the Merchant’s records.-->
          <input type="hidden" name="redirectURL" value="https://checkout.handpoint.io/" /> <!--Hosted form will redirect the Customer’s browser after the transaction has been completed.-->
          <input type="hidden" name="customerAddress" value="Merevale Avenue Leicester" /> <!-- Cardholder address -->
          <input type="hidden" name="customerPostCode" value="LE10 2BU" /> <!-- Registered postcode for the card. -->
          <input type="hidden" name="duplicateDelay" value="0" /> <!-- Do not copy this line. For demonstration purposes only -->
          <input type="hidden" name="signature" value="1c91239e521d247bf10e61bbe30c96e7e3382623bc14650c93a9e96d6a30096d4e866f8b8df83d538bdae651ae6a41eb303be6e6a5281226dfc605995c3bedc0" />
          <!-- Hash generated from the combination of the serialised request and this signing secret phrase -->
          <input type="submit" value="Pay Now">
</form>
```


<iframe width="100%" height="550" src="//jsfiddle.net/Handpoint/zt9bdxof/24/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
 

### Sample Code - VERIFY

This `form` will start a new VERIFY transaction (0.00GBP) and attempt to verify that the card account exists. You can use the following test card details to fill out the payment form: 

| Cardholder Name | Card Number | Expiry Date | CVV/CVC2 | 
| ----------- | ----------- | ----------- | ----------- |
| Any cardholder name (ex: John Doe)  | 5573 4712 3456 7898 | Any date in the future (12/31) | 159 |

:::info

An expiry month of **12** (December) will simulate the non frictionless flow and a challenge will appear to the cardholder. 

:::

```html
<!--form example of VERIFY-->

<form name="payment-form" method="post" action="https://commerce-api.handpoint.com/hosted/modal/" data-hostedforms-modal>
          <input type="hidden" name="merchantID" value="155928" /> <!-- merchantID will be provided by the Handpoint Support team -->
          <input type="hidden" name="action" value="VERIFY" /> <!-- action could be SALE, VERIFY or PREAUTH -->
          <input type="hidden" name="type" value="1" /> <!-- 1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA) -->
          <input type="hidden" name="currencyCode" value="826" /> <!-- ISO 3-letter currency code. 826-> GBP -->
          <input type="hidden" name="countryCode" value="826" /> <!-- ISO 3-letter country code. 826-> United Kingdom -->
          <input type="hidden" name="amount" value="0" /> <!-- Either major currency units includes a single decimal point such as ’10.99’; or minor currency units contains no decimal points such as ‘1099’.  -->
          <input type="hidden" name="orderRef" value="Test purchase" /> <!--Free format text field to store order details, reference numbers, etc. for the Merchant’s records.-->
          <input type="hidden" name="redirectURL" value="https://checkout.handpoint.io/" /> <!--Hosted form will redirect the Customer’s browser after the transaction has been completed.-->
          <input type="hidden" name="customerAddress" value="Merevale Avenue Leicester" /> <!-- Cardholder address -->
          <input type="hidden" name="customerPostCode" value="LE10 2BU" /> <!-- Registered postcode for the card. -->
          <input type="hidden" name="duplicateDelay" value="0" /> <!-- Do not copy this line. For demonstration purposes only -->
          <input type="hidden" name="signature" value="3b1f82760eaeffce1c28eeac788b69b70a53ba98966aee3d008b6dbf3a59741b7f2439f4b583695ac882417c3f6dbd1c117543d2a839f9e5a104840fe8c496b8" />
          <!-- Hash generated from the combination of the serialised request and this signing secret phrase -->
          <input type="submit" value="Verify Card">
</form>
```            



<iframe width="100%" height="500" src="//jsfiddle.net/Handpoint/3q86ypo0/22/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### Sample Code - PREAUTH

This `form` will create a new PREAUTH transaction (1.01GBP) and attempt to seek authorisation from the card issuer. If the authorisation is approved, then it is immediately voided so that no funds are reserved on the Cardholder’s account. You can use the following test card details to fill out the payment form: 

| Cardholder Name | Card Number | Expiry Date | CVV/CVC2 | 
| ----------- | ----------- | ----------- | ----------- |
| Any cardholder name (ex: John Doe)  | 5573 4712 3456 7898 | Any date in the future (12/31) | 159 |

:::info

An expiry month of **12** (December) will simulate the non frictionless flow and a challenge will appear to the cardholder. 

:::

```html
<!--form example of PREAUTH (1,01GBP)-->

<form name="payment-form" method="post" action="https://commerce-api.handpoint.com/hosted/modal/" data-hostedforms-modal>
          <input type="hidden" name="merchantID" value="155928" /> <!-- merchantID will be provided by the Handpoint Support team -->
          <input type="hidden" name="action" value="PREAUTH" /> <!-- action could be SALE, VERIFY or PREAUTH -->
          <input type="hidden" name="type" value="1" /> <!-- 1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA) -->
          <input type="hidden" name="currencyCode" value="826" /> <!-- ISO 3-letter currency code. 826-> GBP -->
          <input type="hidden" name="countryCode" value="826" /> <!-- ISO 3-letter country code. 826-> United Kingdom -->
          <input type="hidden" name="amount" value="101" /> <!-- Either major currency units includes a single decimal point such as ’1.01’; or minor currency units contains no decimal points such as ‘1099’.  -->
          <input type="hidden" name="orderRef" value="Test purchase" /> <!--Free format text field to store order details, reference numbers, etc. for the Merchant’s records.-->
          <input type="hidden" name="redirectURL" value="https://checkout.handpoint.io/" /> <!--Hosted form will redirect the Customer’s browser after the transaction has been completed.-->
          <input type="hidden" name="customerAddress" value="Merevale Avenue Leicester" /> <!-- Cardholder address -->
          <input type="hidden" name="customerPostCode" value="LE10 2BU" /> <!-- Registered postcode for the card. -->
          <input type="hidden" name="duplicateDelay" value="0" /> <!-- Do not copy this line. For demonstration purposes only -->
          <input type="hidden" name="signature" value="a7cfa871539ae0807bc6b070e84263555492f8004abcedf768a377610899bc09a02e238850da742e0aaad1ce9f828a0cf1076add73065d541af72b0a67005aaf" />
          <!-- Hash generated from the combination of the serialised request and this signing secret phrase -->
          <input type="submit" value="Pre Authorization (£1,01)">
</form>
```

<iframe width="100%" height="500" src="//jsfiddle.net/Handpoint/th3a8L54/21/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>


## Hosted Payment Page - Gateway Wallet 

### Sample code - Processing a transaction and save the card details in a Wallet for future use. 

This example asks the user at the checkout if he wishes to save his card details for future use. 

![Save card details ](/img/CardDetailsWallet.png)

A `walletID` will be generated in the response from the gateway. If this wallet id is sent in the subsequent requests from the cardholder, then the cardholder will be offered to use his saved card at checkout. See the below example on how to use the [wallet id](samplecode.md#hosted-integration-using-gateway-wallet). You can use the following test card details to fill out the payment form: 

| Cardholder Name | Card Number | Expiry Date | CVV/CVC2 | 
| ----------- | ----------- | ----------- | ----------- |
| Any cardholder name (ex: John Doe)  | 5573 4712 3456 7898 | Any date in the future (12/31) | 159 |

:::info

An expiry month of **12** (December) will simulate the non frictionless flow and a challenge will appear to the cardholder. 

:::

<iframe width="100%" height="600" src="//jsfiddle.net/Handpoint/j0ck72bu/32/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### Sample Code - Offering the cardholder to pay with cards saved in the Gateway wallet

Using the **Saved Cards** option at checkout will allow the cardholder to use a previously saved card. A `walletID` needs to be provided in the request for the option to appear at checkout.

The CVV of the stored card is **159**. 

<iframe width="100%" height="600" src="//jsfiddle.net/Handpoint/31yq5L2h/28/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## Hosted Payment Page - Credentials on File

### Sample Code - CIT - 1

 1 - Cardholder opts to store their card details on Merchant's website.

 2 - Cardholder opts to store their card details provided to Merchant via mail or telephone.

 3 - Cardholder pays using a card they previously stored on the Merchant's website.

 4 - Cardholder provides their card details to sign up to a subscription on the Merchant's website.


<iframe width="100%" height="600" src="//jsfiddle.net/Handpoint/1j0u7wLh/23/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### Sample Code - CIT - 2

5 - Cardholder provides their card details when agreeing to purchase by instalments on the Merchant's website.

6 - Cardholder provides their card details to sign up to a subscription via mail or telephone to the Merchant

7 - Cardholder provides their card details when agreeing to purchase by instalments via mail or telephone to the Merchant.


<iframe width="100%" height="600" src="//jsfiddle.net/Handpoint/ek5ygrmp/13/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### Sample Code - MIT - 1

8 - Merchant makes an unscheduled transaction, such as an account top-up, as previously agreed with the Cardholder when they stored their card details.

9 - Merchant resubmits a payment where the initial payment was declined due to insufficient funds, but the goods have already been provided to the Cardholder.

10 - Merchant reauthorises a payment when the completion or fulfilment of the original order or service extends beyond the authorization validity limit set by the Card Scheme.

11 - Merchant makes a payment to process a supplemental account charge after original services have been rendered and respective payment has been processed.

12 - Merchant makes a payment to charge the Cardholder a penalty according to the merchant’s reservation cancellation policy.


<iframe width="100%" height="600" src="//jsfiddle.net/Handpoint/pvqfL6rb/17/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## Hosted Payment Page Library 

A simple client-side script is available to simplify the displaying of the Hosted Payment Page in a lightbox overlaying your website.

The library is available as a JavaScript script and is based around a single class: the Form class. The script is compatible with most modern web browsers.

The script can be loaded directly from our Gateway server as follows.

```javascript
<script src="https://commerce-api.handpoint.com/sdk/web/v1/js/hostedforms.min.js"></script>
```

If the script detects the presence of the jQuery API, then it will extend the jQuery object with its own plugin method. However, jQuery is not needed in order to use the script.

Hosted Payment Pages are a prebuilt webpage residing on our server that you can use to collect sensitive payment details without those details’ touching your server. The standard Hosted Payment Page is designed so that it can be displayed in a transparent overlay over your website, thus making the Customer feel as though they never left your shopping cart.

The standard Hosted Integration examples redirect the Customer’s browser to the Hosted Payment Page, resulting it appearing on a new browser page and not overlaying your website. The Hosted Payment Page library provides the scripting necessary to result in the redirection, causing the Hosted Payment Page to appear in an overlay and not a new browser page, without your having to make any modifications to your website. The library can also simplify the creation of the Hosted Integration redirection FORM if required.

### Library Namespace

To avoid polluting the global namespace, the library extends the global window object with a hostedForms object containing the following properties:

- `forms` – array containing all the instantiated `Form` objects.
- `classes` – array containing all the instantiable classes.
    - `form` – `Form` class prototype.

### Form Construction

The construction method can be used to build and prepare a HTML FORM element for use with the modal Hosted Payment Page; or to prepare an existing element. The method signature is as follows:

`Form(element, data)`

The `element` parameter should be either the id or DOM node of an existing FORM or DIV DOM `element`.

If the `element` is a DIV node, then the data is used to create a new FORM node within the `element`.

If the `element` is a FORM node, then the data is used to modify the existing FORM `element`.

The `data` parameter should be an object containing construction details and can contain the following optional properties:

- `id` – string containing the value to use as the FORM tag’s id attribute.
- `url` – string containing the URL to use as the FORM tag’s src attribute.
- `attrs` – object whose properties are added as additional attributes on the FORM tag.
- `modal` – boolean indicating that the HPP should open in a modal overlay.
- `data` – object whose properties are added as hidden input elements in the FORM.
- `submit` – object containing details for a submit button that should be added to the FORM.
    - `type` – type of submit button, either ‘auto’, ‘image’, ‘button’, ‘input’
    - `id` – string containing the value to use as the submit button’s id attribute.
    - `attrs` – object whose properties are added as additional attributes on the submit button.
    - `label` – string containing button label (or ‘alt’ attribute for ‘image’ buttons)
    - `src` – string containing image URL for ‘image’ buttons.

The constructor will submit the FORM immediately after preparation if the `data.submit.type` property is ‘auto’; or if the existing FORM element has a `data-hostedform-autosubmit` attribute. Otherwise, an event handler will be attached to the submit button to disable it automatically when clicked, to help prevent your Customer from clicking it twice.

The constructor will prepare the FORM so that the Hosted Payment Page (HPP) will be opened in a modal overlay if the `data.modal` property is true; or if the existing FORM `element` has a `data-hostedform-modal` attribute; or has an `action` attribute containing the string ‘modal/’ or ending in the string ‘modal’.

The modal overlay is automatically created as a semi-opaque IFRAME element that fills the browser display. The Hosted Payment Page is then loaded into this IFRAME and being semi-opaque, your shopping cart will remain visible beneath, but greyed out and noninteractive. When the Customer closes the Hosted Payment Page, then their browser will be redirected to the URL you provided using the redirectURL parameter. This will cause the original page and IFRAME to be replaced by your new page.

### Form Methods 

The following  methods are made available by the Form class:

`void destroy()`

Destroys the `Form`, reverting its `element` back to its original state.

### jQuery Plugin
If the jQuery API has been loaded into the browser before the script, then it will extend the jQuery object with its own plugin method.

Construction and destruction can then be done as follows:

```php
`$(element).hostedForm(data);
$(element).hostedForm(‘destroy’);
```

## Example HTTP Request

### Transaction Request HTTP Headers 

The following HTTP headers are sent for transaction request:

| HTTP Header | Mandatory | Description |
| ----------- | ----------- | ----------- | 
| content-type | Y | Content type of the request. This must be ‘application/x-www-formurlencoded’, A charset parameter is optional and any non UTF-8 request will be converted to UTF-8. | 

### Transaction Response HTTP Headers 

The following HTTP headers are received for a transaction response:

| HTTP Header | Description |
| ----------- | ----------- | 
| Status | HTTP status header. Possible value are:<br></br>200 – Transaction request processed<br></br>500 – Internal Server Error<br></br>503 – Service Temporarily Unavailable | 
| content-type | Content type of the response. This will be ‘application/x-www-form-urlencoded’| 

### Submission Example

The following shows an example of a transaction request:

```http
HTTP/1.1 200 OK
POST /hosted/ HTTP/1.1
Host: commerce-api.handpoint.com
Accept: */*
Content-Length: 314
Content-Type: application/x-www-form-urlencoded

merchantID=100001&action=SALE&type=1&currencyCode=826&countryCode=826&amount=680&transactionUnique=5de651c7c537
9&orderRef=Test+Transaction&redirectURL=https%3A%2F%2Fmyshop.com&signature=ba12b0766a3412782448f154be15e8f61eea
390387b1b23d4688c82c9f28f81df593de5890426546cca365943cc7b5c4897c9721b663a0e17680e1e796f1ad55 
```

The following shows an example of a transaction response:


```http
HTTP/1.1 200 OK
Date: Tue, 01 Jan 2019 09:30:45 GMT
Server: Apache/2.4.23 (Win64) OpenSSL/1.0.2k-fips PHP/5.4.12
Vary: Host
X-Powered-By: PHP/5.4.12
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Content-Length: 4129
 Content-Type: text/html

 <!DOCTYPE html>
 <html>
 --- Hosted Payment Page HTML Removed ---
 </html> 
 ```

## Gateway Integration Library 

A simple server-side integration library is available to simplify the preparation and transmission of Hosted and Direct Integration requests.

The library is available in many popular programming languages and is based around a single class: the Gateway class. Below is the PHP version of the library but checkout the [Handpoint Github](https://github.com/handpoint) website to download libraries in C#, Java, Perl, Python, NodeJs, Ruby and Swift. 

### Library Namespace 
To avoid polluting the global namespace, the library uses the ‘P3/SDK’ namespace where supported by the language.

### Gateway Configuration 

Before you can use the Gateway class, you will need to configure the following properties to match your integration parameters: 

| Name | Type | Description |
| ----------- | ----------- | -----------  |
| hostedURL |string |Absolute URL provided for the Hosted Integration. |
|directURL | string| Absolute URL provided for the Direct Integration.|
| merchantID| string|Your unique Merchant ID to be passed in the `merchantID` integration field. |
| merchantPwd|string |Any password configured on your Merchant Account |
|merchantSecret| string|Any secret configured on your Merchant Account |
| proxyUrl |string |Absolute URL to any proxy required for connections |
| debug |boolean | True to enable debugging output |

### Gateway Methods

The following methods are made available by the `Gateway` class:

#### `string hostedRequest(mixed[] request, string[] options)`

Return an HTML fragment that can be included in your webpage to render a `<form>` which will send the provided request data to the Gateway’s Hosted Integration when submitted.

The request parameter should be an associative array containing the request fields required to be sent. The request fields are not validated.

The following class properties are used unless alternative values are provided in the `request` array: `directUrl`, `merchantID`, `merchantPwd`, `merchantSecret`.

The `options` parameter is an optional associative array containing options that can be used to modify the returned HTML fragment as follows:
- formAttrs – string containing additional attributes to include in the form tag.
- submitAttrs – string containing additional attributes to include in the submit button tag.
- submitImage – string containing the URL to use as the submit button.
- submitHtml – string containing HTML to use as the label on the submit `<button>`.
- submitText – string containing text to use as the label on the submit `<input>`.

The `submitImage`, `submitHtml` and `submitText` options are mutually exclusive and will be checked for in that order. If none is provided, then a `submitText` value of ‘Pay Now' is assumed.

If a `merchantSecret` is provided, then the method will add the correct signature field to the request.

An exception is thrown if the HTML fragment cannot be composed.

The `verifyResponse()` method can be used to validate and decode any response POSTed back to your website.

Returns a string containing the HTML fragment if successful; throws an exception otherwise.

#### `mixed[] directRequest(mixed[] request, string[] options)`

Return the response received when sending the provided request to the Gateway’s Direct Integration.

The `request` parameter should be an associative array containing the request fields required to be sent. The request fields are not validated.

The following class properties are used unless alternative values are provided in the request array: `directUrl`, `merchantID`, `merchantPwd`, `merchantSecret`.

The `options` parameter is not used and reserved for future use.

If a `merchantSecret` is provided, then the method will add the correct signature field to the request and check the `signature` field on the response.

An exception is thrown if the request cannot be sent; or the response cannot be received; or if the response’s signature is incorrect.

Returns an associative array containing the received response fields; otherwise, throws an exception.

#### `void prepareRequest(mixed[] &request, string[] &options, string &secret, string &direct_url, string &hosted_url)`

Prepare a request for sending to the Gateway’s Direct Integration.

The `request` parameter should be a reference to an associative array containing the request fields required to be sent. The request fields are not validated.

The `merchantSecret`, `directUrl` and `hostedUrl` configuration properties will be returned in the `secret`, `direct_url` and `hosted_url` method parameters. These properties can be overridden by providing them in the request, in which case they will be extracted and removed from the request.

The `merchantID` and `merchantPwd` configuration properties will be added to the request.

A few known Gateway response fields will be removed from the request, if present, to avoid confusion, notably the `responseCode`, `responseMessage`, `responseStatus`, `state` fields.

An exception will be thrown if the request does not contain an action element or a merchantID element (and none could be inserted).

#### `void verifyResponse(mixed[] &response, string secret)`

Verify a response received from the Gateway’s Hosted or Direct Integration.

The `response` parameter should be a reference to an associative array containing the response received from the Gateway, either from the Direct Integration or as POSTed from the Hosted Integration.

The `secret` parameter should be any Merchant secret to use when checking the response’s `signature` element. If not provided, then the value of the `merchantSecret` property is used.

Any `signature` element is removed from the response.

An exception is thrown if the response is not valid, does not contain a `responseCode` element or its `signature` is incorrect.


#### `string sign(mixed[] request, string secret, mixed partial = false)`

Return the signature for the provided request data.

The `request` parameter should be a reference to an associative array containing the request fields required to be sent. The request fields are not validated.

The `secret` parameter should be the Merchant secret to use when signing the request.

The `partial` parameter should be either the boolean `false` or comma separated string; or an array of strings containing the names of the request elements to sign.

Returns a string containing the correct signature for the request.

### Gateway Library (PHP)

The gateway.php file contains the main body of the SDK.


```php
<?php

/**
 * Class to communicate with Payment Gateway
 */

namespace P3\SDK;

use \RuntimeException;
use \InvalidArgumentException;

class Gateway {

	/**
	 * @var string	Gateway Hosted API Endpoint
	 */
	static public $hostedUrl = 'https://commerce-api.handpoint.com/hosted/';

	/**
	 * @var string	Gateway Direct API Endpoint
	 */
	static public $directUrl = 'https://commerce-api.handpoint.com/direct/';

	/**
	 * @var string	Merchant Account Id or Alias
	 */
	static public $merchantID = '100001';

	/**
	 * @var string	Password for above Merchant Account
	 */
	static public $merchantPwd = null;

	/**
	 * @var string	Secret for above Merchant Account
	 */
	static public $merchantSecret = 'Circle4Take40Idea';

	/**
	 * @var string	Proxy URL if required (eg. 'https://www.proxy.com:3128')
	 */
	static public $proxyUrl = null;

	/**
	 * @var boolean	Enable debugging
	 */
	static public $debug = true;

	/**
	 * Useful response codes
	 */
	const RC_SUCCESS						= 0;	// Transaction successful
	const RC_DO_NOT_HONOR					= 5;	// Transaction declined
	const RC_NO_REASON_TO_DECLINE			= 85;	// Verification successful

	const RC_3DS_AUTHENTICATION_REQUIRED	= 0x1010A;

	/**
	 * Send request to Gateway using HTTP Direct API.
	 *
	 * The method will send a request to the Gateway using the HTTP Direct API.
	 *
	 * The request will use the following Gateway properties unless alternative
	 * values are provided in the request;
	 *   + 'directUrl'		- Gateway Direct API Endpoint
	 *   + 'merchantID'		- Merchant Account Id or Alias
	 *   + 'merchantPwd'	- Merchant Account Password (or null)
	 *   + 'merchantSecret'	- Merchant Account Secret (or null)
	 *
	 * The method will {@link sign() sign} the request and also {@link
	 * verifySignature() check the signature} on any response.
	 *
	 * The method will throw an exception if it is unable to send the request
	 * or receive the response.
	 *
	 * The method does not attempt to validate any request fields.
	 *
	 * The method will attempt to send the request using the PHP cURL extension
	 * or failing that the  PHP http stream wrappers. If neither are available
	 * then an exception will be thrown.
	 *
	 * @param	array	$request	request data
	 * @param	array	$options	options (or null)
	 * @return	array				request response
	 *
	 * @throws	InvalidArgumentException	invalid request data
	 * @throws	RuntimeException			communications failure
	 */
	static public function directRequest(array $request, array $options = null) {

		static::debug(__METHOD__ . '() - args=', func_get_args());

		static::prepareRequest($request, $options, $secret, $direct_url, $hosted_url);

		// Sign the request
		if ($secret) {
			$request['signature'] = static::sign($request, $secret);
		}

		if (function_exists('curl_init')) {
			$opts = array(
				CURLOPT_POST			=> true,
				CURLOPT_POSTFIELDS		=> http_build_query($request, '', '&'),
				CURLOPT_HEADER			=> false,
				CURLOPT_FAILONERROR		=> true,
				CURLOPT_FOLLOWLOCATION	=> true,
				CURLOPT_RETURNTRANSFER	=> true,
				CURLOPT_USERAGENT		=> $_SERVER['HTTP_USER_AGENT'],
				CURLOPT_PROXY			=> static::$proxyUrl,
			);

			$ch = curl_init($direct_url);

			if (($ch = curl_init($direct_url)) === false) {
				throw new RuntimeException('Failed to initialise communications with Payment Gateway');
			}

			if (curl_setopt_array($ch, $opts) === false || ($data = curl_exec($ch)) === false) {
				$err = curl_error($ch);
				curl_close($ch);
				throw new RuntimeException('Failed to communicate with Payment Gateway: ' . $err);
			}

		} else if (ini_get('allow_url_fopen')) {

			$opts = array(
				'http' => array(
					'method'		=> 'POST',
					'user_agent'	=> $_SERVER['HTTP_USER_AGENT'],
					'proxy'			=> static::$proxyUrl,
					'header'		=> 'Content-Type: application/x-www-form-urlencoded',
					'content'		=> http_build_query($request, '', '&'),
					'timeout'		=> 5,
				)
			);

			$context = stream_context_create($opts);

			if (($data = file_get_contents($direct_url, false, $context)) === false) {
				throw new RuntimeException('Failed to send request to Payment Gateway');
			}

		} else {
			throw new RuntimeException('No means of communicate with Payment Gateway, please enable CURL or HTTP Stream Wrappers');
		}

		if (!$data) {
			throw new RuntimeException('No response from Payment Gateway');
		}

		$response = null;
		parse_str($data, $response);

		static::verifyResponse($response, $secret);

		static::debug(__METHOD__ . '() - ret=', $response);

		return $response;
	}

	/**
	 * Send request to Gateway using HTTP Hosted API.
	 *
	 * The method will send a request to the Gateway using the HTTP Hosted API.
	 *
	 * The request will use the following Gateway properties unless alternative
	 * values are provided in the request;
	 *   + 'hostedUrl'		- Gateway Hosted API Endpoint
	 *   + 'merchantID'		- Merchant Account Id or Alias
	 *   + 'merchantPwd'	- Merchant Account Password (or null)
	 *   + 'merchantSecret'	- Merchant Account Secret (or null)
	 *
	 * The method accepts the following options;
	 *   + 'formAttrs'		- HTML form attributes string
	 *   + 'formHtml'		- HTML to show inside the form
	 *   + 'submitAttrs'	- HTML submit button attributes string
	 *   + 'submitImage'	- URL of image to use as the Submit button
	 *   + 'submitHtml'		- HTML to show on the Submit button
	 *   + 'submitText'		- Text to show on the Submit button
	 *
	 * 'submitImage', 'submitHtml' and 'submitText' are mutually exclusive
	 * options and will be checked for in that order. If none are provided
	 * the submitText='Pay Now' is assumed.
	 *
	 * The method will {@link sign() sign} the request, to allow for submit
	 * button images etc. partial signing will be used.
	 *
	 * The method returns the HTML fragment that needs including in order to
	 * send the request.
	 *
	 * The method will throw an exception if it is unable to send the request.
	 *
	 * The method does not attempt to validate any request fields.
	 *
	 * If the request doesn't contain a 'redirectURL' element then one will be
	 * added which redirects the response to the current script.
	 *
	 * Any response can be {@link verifyResponse() verified} using the following
	 * PHP code;
	 * <code>
	 * try {
	 *     \P3\SDK\Gateway::verifyResponse($_POST);
	 * } catch(\Exception $e) {
	 *     die($e->getMessage());
	 * }
	 * </code>
	 *
	 * @param	array	$request	request data
	 * @param	array	$options	options (or null)
	 * @return	string				request HTML form.
	 *
	 * @throws	InvalidArgumentException	invalid request data
	 */
	static public function hostedRequest(array $request, array $options = null) {

		static::debug(__METHOD__ . '() - args=', func_get_args());

		static::prepareRequest($request, $options, $secret, $direct_url, $hosted_url);

		if (!isset($request['redirectURL'])) {
			$request['redirectURL'] = ($_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
		}

		if ($secret) {
			$request['signature'] = static::sign($request, $secret, true);
		}

		$ret = '<form method="post" ' .
			(isset($options['formAttrs']) ? $options['formAttrs'] : '') .
			' action="' . htmlentities($hosted_url, ENT_COMPAT, 'UTF-8') . "\">\n";

		foreach ($request as $name => $value) {
			$ret .= static::fieldToHtml($name, $value);
		}

		if (isset($options['formHtml'])) {
			$ret .= $options['formHtml'];
		}

		if (isset($options['submitImage'])) {
			$ret .= '<input ' .
					(isset($options['submitAttrs']) ? $options['submitAttrs'] : '') .
					' type="image" src="' . htmlentities($options['submitImage'], ENT_COMPAT, 'UTF-8') . "\">\n";
		} else if (isset($options['submitHtml'])) {
			$ret .= '<button type="submit" ' .
					(isset($options['submitAttrs']) ? $options['submitAttrs'] : '') .
					">{$options['submitHtml']}</button>\n";
		} else {
			$ret .= '<input ' .
					(isset($options['submitAttrs']) ? $options['submitAttrs'] : '') .
					' type="submit" value="' . (isset($options['submitText']) ? htmlentities($options['submitText'], ENT_COMPAT, 'UTF-8') : 'Pay Now') . "\">\n";
		}

		$ret .= "</form>\n";

		static::debug(__METHOD__ . '() - ret=', $ret);

		return $ret;
	}

	/**
	 * Prepare a request for sending to the Gateway.
	 *
	 * The method will extract the following configuration properties from the
	 * request if they are present;
	 *   + 'merchantSecret'	- Merchant Account Secret (or null)
	 *   + 'directUrl'		- Gateway Direct API Endpoint
	 *   + 'hostedUrl'		- Gateway Hosted API Endpoint
	 *
	 * The method will insert the following configuration properties into the
	 * request if they are not already present;
	 *   + 'merchantID'		- Merchant Account Id or Alias
	 *   + 'merchantPwd'	- Merchant Account Password (or null)
	 *
	 * The method will throw an exception if the request doesn't contain an
	 * 'action' element or a 'merchantID' element (and none could be inserted).
	 *
	 * The method does not attempt to validate any request fields.
	 *
	 * @param	array	$request	request data (input & return)
	 * @param	array	$options	options (or null)
	 * @param	string	$secret		any extracted 'merchantSecret' (return)
	 * @param	string	$direct_url	any extracted 'directUrl' (return)
	 * @param	string	$hosted_url	any extracted 'hostedUrl' (return)
	 * @return	void
	 *
	 * @throws	InvalidArgumentException	invalid request data
	 */
	static public function prepareRequest(array &$request, array $options = null, &$secret, &$direct_url, &$hosted_url) {

		if (!$request) {
			throw new InvalidArgumentException('Request must be provided.');
		}

		if (!isset($request['action'])) {
			throw new InvalidArgumentException('Request must contain an \'action\'.');
		}

		// Insert 'merchantID' if doesn't exist and default is available
		if (!isset($request['merchantID']) && static::$merchantID) {
			$request['merchantID'] = static::$merchantID;
		}

		// Insert 'merchantPwd' if doesn't exist and default is available
		if (!isset($request['merchantPwd']) && static::$merchantPwd) {
			$request['merchantPwd'] = static::$merchantPwd;
		}

		// A 'merchantID' must be set
		if (empty($request['merchantID'])) {
			throw new InvalidArgumentException('Merchant ID or Alias must be provided.');
		}

		if (array_key_exists('merchantSecret', $request)) {
			$secret = $request['merchantSecret'];
			unset($request['merchantSecret']);
		} else {
			$secret = static::$merchantSecret;
		}

		if (array_key_exists('hostedUrl', $request)) {
			$hosted_url = $request['hostedUrl'];
			unset($request['hostedUrl']);
		} else {
			$hosted_url = static::$hostedUrl;
		}

		if (array_key_exists('directUrl', $request)) {
			$direct_url = $request['directUrl'];
			unset($request['directUrl']);
		} else {
			$direct_url = static::$directUrl;
		}

		// Remove items we don't want to send in the request
		// (they may be there if a previous response is sent)
		$request = array_diff_key($request, array(
			'responseCode'=> null,
			'responseMessage' => null,
			'responseStatus' => null,
			'state' => null,
			'signature' => null,
			'merchantAlias' => null,
			'merchantID2' => null,
		));
	}

	/**
	 * Verify the any response.
	 * 
	 * This method will verify that the response is present, contains a response
	 * code and is correctly signed.
	 *
	 * If the response is invalid then an exception will be thrown.
	 *
	 * Any signature is removed from the passed response.
	 *
	 * @param	array	$data		reference to the response to verify
	 * @param	string	$secret		secret to use in signing
	 * @return	boolean				true if signature verifies
	 */
	static public function verifyResponse(array &$response, $secret = null) {

		if (!$response || !isset($response['responseCode'])) {
			throw new RuntimeException('Invalid response from Payment Gateway');
		}

		if (!$secret) {
			$secret = static::$merchantSecret;
		}

		$fields = null;
		$signature = null;
		if (isset($response['signature'])) {
			$signature = $response['signature'];
			unset($response['signature']);
			if ($secret && $signature && strpos($signature, '|') !== false) {
				list($signature, $fields) = explode('|', $signature);
			}
		}

		// We display three suitable different exception messages to help show
		// secret mismatches between ourselves and the Gateway without giving
		// too much away if the messages are displayed to the Cardholder.
		if (!$secret && $signature) {
			// Signature present when not expected (Gateway has a secret but we don't)
			throw new RuntimeException('Incorrectly signed response from Payment Gateway (1)');
		} else if ($secret && !$signature) {
			// Signature missing when one expected (We have a secret but the Gateway doesn't)
			throw new RuntimeException('Incorrectly signed response from Payment Gateway (2)');
		} else if ($secret && static::sign($response, $secret, $fields) !== $signature) {
			// Signature mismatch
			throw new RuntimeException('Incorrectly signed response from Payment Gateway');
		}

		settype($response['responseCode'], 'integer');

		return true;
	}

	/**
	 * Sign the given array of data.
	 * 
	 * This method will return the correct signature for the data array.
	 *
	 * If the secret is not provided then any {@link static::$merchantSecret
	 * default secret} is used.
	 *
	 * The partial parameter is used to indicate that the signature should
	 * be marked as 'partial' and can take three possible value types as
	 * follows;
	 *   + boolean	- sign with all $data fields
	 *   + string	- comma separated list of $data field names to sign
	 *   + array	- array of $data field names to sign
	 *
	 * @param	array	$data		data to sign
	 * @param	string	$secret		secret to use in signing
	 * @param	mixed	$partial	partial signing
	 * @return	string				signature
	 */
	static public function sign(array $data, $secret, $partial = false) {

		// Support signing only a subset of the data fields
		if ($partial) {
			if (is_string($partial)) {
				$partial = explode(',', $partial);
			}
			if (is_array($partial)) {
				$data = array_intersect_key($data, array_flip($partial));
			}
			$partial = join(',', array_keys($data));
		}

		// Sort the data in ascending ascii key order
		ksort($data);

		// Convert to a URL encoded string
		$ret = http_build_query($data, '', '&');

		// Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)
		$ret = preg_replace('/%0D%0A|%0A%0D|%0D/i', '%0A', $ret);

		// Hash the string and secret together
		$ret = hash('SHA512', $ret . $secret);

		// Mark as partially signed if required
		if ($partial) {
			$ret . '|' . $partial;
		}

		return $ret;
	}

	/**
	 * Collect browser device information.
	 *
	 * The method will return a self submitting HTML form designed to provided
	 * the browser device details in the following integration fields;
	 *   + 'deviceChannel'			- Fixed value 'browser',
	 *   + 'deviceIdentity'			- Browser's UserAgent string
	 *   + 'deviceTimeZone'			- Browser's timezone
	 *   + 'deviceCapabilities'		- Browser's capabilities
	 *   + 'deviceScreenResolution'	- Browser's screen resolution (widthxheightxcolour-depth)
	 *   + 'deviceAcceptContent'	- Browser's accepted content types
	 *   + 'deviceAcceptEncoding'	- Browser's accepted encoding methods
	 *   + 'deviceAcceptLanguage'	- Browser's accepted languages
	 *   + 'deviceAcceptCharset'	- Browser's accepted character sets
	 *
	 * The above fields will be submitted as child elements of a 'browserInfo'
	 * parent field.
	 *
	 * The method accepts the following options;
	 *   + 'formAttrs'		- HTML form attributes string
	 *   + 'formData'		- associative array of additional post data
	 *
	 *
	 * The method returns the HTML fragment that needs including in order to
	 * render the HTML form.
	 *
	 * The browser must suport JavaScript in order to obtain the details and
	 * submit the form.
	 *
	 * @param	array	$options	options (or null)
	 * @return	string				request HTML form.
	 *
	 * @throws	InvalidArgumentException	invalid request data
	 */
	static public function collectBrowserInfo(array $options = null) {

		static::debug(__METHOD__ . '() - args=', func_get_args());

		$form_attrs = 'id="collectBrowserInfo" method="post" action="?"';

		if (isset($options['formAttrs'])) {
			$form_attrs .= $options['formAttrs'];
		}

		$device_data = array(
			'deviceChannel'				=> 'browser',
			'deviceIdentity'			=> (isset($_SERVER['HTTP_USER_AGENT']) ? htmlentities($_SERVER['HTTP_USER_AGENT']) : null),
			'deviceTimeZone'			=> '0',
			'deviceCapabilities'		=> '',
			'deviceScreenResolution'	=> '1x1x1',
			'deviceAcceptContent'		=> (isset($_SERVER['HTTP_ACCEPT']) ? htmlentities($_SERVER['HTTP_ACCEPT']) : null),
			'deviceAcceptEncoding'		=> (isset($_SERVER['HTTP_ACCEPT_ENCODING']) ? htmlentities($_SERVER['HTTP_ACCEPT_ENCODING']) : null),
			'deviceAcceptLanguage'		=> (isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? htmlentities($_SERVER['HTTP_ACCEPT_LANGUAGE']) : null),
			'deviceAcceptCharset'		=> (isset($_SERVER['HTTP_ACCEPT_CHARSET']) ? htmlentities($_SERVER['HTTP_ACCEPT_CHARSET']) : null),
		);

		$form_fields = static::fieldToHtml('browserInfo', $device_data);

		if (isset($options['formData'])) {
			foreach ((array)$options['formData'] as $name => $value) {
				$form_fields .= static::fieldToHtml($name, $value);
			}
		}

		$ret = <<<EOS
			<form {$form_attrs}>
				{$form_fields}
			</form>
			<script>
				var screen_depths = [1, 4, 8, 15, 16, 24, 32, 48];
				var screen_width = (window && window.screen ? window.screen.width : '0');
				var screen_height = (window && window.screen ? window.screen.height : '0');
				var screen_depth = (window && window.screen && window.screen.colorDepth && screen_depths.indexOf(window.screen.colorDepth) >= 0 ? window.screen.colorDepth : '0');
				var identity = (window && window.navigator ? window.navigator.userAgent : '');
				var language = (window && window.navigator ? (window.navigator.language ? window.navigator.language : window.navigator.browserLanguage) : '');
				var timezone = (new Date()).getTimezoneOffset();
				var java = (window && window.navigator ? navigator.javaEnabled() : false);
				var fields = document.forms.collectBrowserInfo.elements;
				fields['browserInfo[deviceIdentity]'].value = identity;
				fields['browserInfo[deviceTimeZone]'].value = timezone;
				fields['browserInfo[deviceCapabilities]'].value = 'javascript' + (java ? ',java' : '');
				fields['browserInfo[deviceAcceptLanguage]'].value = language;
				fields['browserInfo[deviceScreenResolution]'].value = screen_width + 'x' + screen_height + 'x' + screen_depth;
				window.setTimeout('document.forms.collectBrowserInfo.submit()', 0);
			</script>
EOS;

		static::debug(__METHOD__ . '() - ret=', $ret);

		return $ret;
	}

	/**
	 * Return the field name and value as HTML input tags.
	 *
	 * The method will return a string containing one or more HTML <input
	 * type="hidden"> tags which can be used to store the name and value.
	 *
	 * @param	string		$name		field name
	 * @param	mixed		$value		field value
	 * @return	string					HTML containing <INPUT> tags
	 */
	static public function fieldToHtml($name, $value) {
		$ret = '';
		if (is_array($value)) {
			foreach ($value as $n => $v) {
				$ret .= static::fieldToHtml($name . '[' . $n . ']', $v);
			}
		} else {
			// Convert all applicable characters or none printable characters to HTML entities
			$value = preg_replace_callback('/[\x00-\x1f]/', function($matches) { return '&#' . ord($matches[0]) . ';'; }, htmlentities($value, ENT_COMPAT, 'UTF-8', true));
			$ret = "<input type=\"hidden\" name=\"{$name}\" value=\"{$value}\" />\n";
		}

		return $ret;
	}

	/**
	 * Display debug message into PHP error log.
	 *
	 * The method will write the arguments into the PHP error log if
	 * the {@link $debug} property is true. Any none string arguments
	 * will be {@link \var_export() formatted}.
	 *
	 * @param	mixed		...			value to debug
	 * @return	void
	 */
	static public function debug() {
		if (static::$debug) {
			$msg = '';
			foreach (func_get_args() as $arg) {
				$msg .= (is_string($arg) ? $arg : var_export($arg, true)) . ' ';
			}
			error_log($msg);
		}
	}

}

?>
```


## Testing 

You will be provided with unique test Merchant Account IDs during the onboarding process. Refer to the [authentication](overview#authentication) section for the list of required parameters. Test Merchant Accounts are connected to a Simulator and not to an actual Acquirer. The Simulator will emulate the function of an Acquirer and provide simulated responses and authorisation codes.

### Test Amounts 

When testing the transaction amount can be used to trigger different authorisation and settlement outcomes as follows:

| Min. Amount | Max. Amount | Authorisation response | Settlement outcome |
| ----------- | ----------- | ----------- | ----------- |
| 100 (1.00) | 2499 (24.99) | (0) AUTH CODE: XXXXXX | ACCEPTED |
| 2500 (25.00) | 4999 (49.99) | (0) AUTH CODE: XXXXXX | REJECTED |
| 5000 (50.00) | 7499 (74.99) | (1) CARD REFERRED <br></br> (0) AUTH CODE: XXXXXX  | ACCEPTED |
| 7500 (75.00) | 9999 (99.99) | (1) CARD REFERRED <br></br> (0) AUTH CODE: XXXXXX  | REJECTED |
| 10000 (100.00) | 14999 (49.99) | (5) CARD DECLINED | N/A |
| 15000 (150.00) | 19999 (199.99) | (4) CARD DECLINED – KEEP CARD | N/A |
| 20000 (200.00) | 24999 (249.99) | (65) CARD DECLINED - SCA REQUIRED <br></br> (0) AUTH CODE: XXXXXX | ACCEPTED |
| 25000 (250.00) | 29999 (299.99) | (65) CARD DECLINED – SCA REQUIRED <br></br>  (5) CARD DECLINED | N/A |

Any other amount will return a `responseCode` of 66311 (Invalid Test Amount).

The settlement outcome only applies to transactions which reach settlement due to being successfully authorised and captured and not cancelled. The amount captured is used when determining the settlement outcome rather than the amount authorised.

The range 5000 to 9999 can be used to test manual authorisations. If the transaction does not contain an `authorisationCode` request field, then the Simulator will return a `responseCode` of 1 (CARD REFERRED). If it does, then it will return a `responseCode` of 0 (SUCCESS), with an amount between 50000 and 7499 being accepted at settlement and an amount of 7500 to 9999 being rejected.

The range 20000 to 29999 can be used to test secure customer authentication (SCA) soft declines. If the transaction is eligible to request SCA then the Simulator will return a `responseCode` of 65 (SCA REQUIRED). If not, then it will return a `responseCode` of 0 (SUCCESS) for the range 20000 to 24999 or 5 (DO NOT HONOR) for the range 25000 to 29999. Successful transactions will be approved at settlement.

Note: SCA exemptions are not supported by the simulator and so cannot be used to request that SCA is not required.

### Test Cards {#testCards}

The test accounts will only accept card numbers that are designated for test purposes. These test cards cannot be used on production accounts.

To test AVS and CV2 verification then the associated CVV and billing addresses are provided for each card. If a different value is used, then the Simulator will mark the responses as ‘not matched’.

**Unless stated otherwise an expiry date sometime in the near future should be used.**

#### Visa Credit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 4929421234600821 | 356 | Flat 6 Primrose Rise<br></br> 347 Lavender Road <br></br>Northampton <br></br> NN17 8YG| 
| 4543059999999982 | 110 | 76 Roseby Avenue<br></br> Manchester <br></br>M63X 7TH| 
| 4543059999999990 | 689 | 23 Rogerham Mansions<br></br>4578 Ermine Street<br></br> Borehamwood <br></br> WD54 8TH| 

#### Visa Debit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 4539791001730106 | 289 | Unit 5 Pickwick Walk<br></br>120 Uxbridge Road Hatch End<br></br>Middlesex<br></br>HA6 7HJ| 
| 4462000000000003 | 672 | Mews 57<br></br>Ladybird Drive<br></br>Denmark<br></br> 65890| 

#### Visa Electron 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 4917480000000008 | 009 | 5-6 Ross Avenue<br></br>Birmingham<br></br>B67 8UJ| 

#### Mastercard Credit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 5301250070000191 | 419 | 25 The Larches Narborough<br></br>Leicester<br></br>LE10 2RT| 
| 5413339000001000 | 304 | Pear Tree Cottage<br></br>The Green<br></br>Milton Keynes<br></br>MK11 7UY| 
| 5434849999999951 | 470 | 34a Rubbery Close<br></br>Cloisters Run<br></br>Rugby<br></br>CV21 8JT| 
| 5434849999999993 | 557 | 4-7 The Hay Market<br></br>Grantham<br></br>NG32 4HG| 

#### Mastercard Debit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 5573 4712 3456 7898 | 159 | Merevale Avenue<br></br>Leicester<br></br>LE10 2BU| 

#### UK Maestro 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 6759 0150 5012 3445 002 | 309 | The Parkway<br></br>5258 Larches Approach Hull<br></br>North Humberside<br></br>HU10 5OP| 
| 6759 0168 0000 0120 097 | 701 | The Manor<br></br>Wolvey Road<br></br>Middlesex<br></br>TW7 9FF| 

#### JCB

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 3540599999991047 | 209 | 2 Middle Wallop Merideth-in-the-Wolds<br></br>Lincolnshire<br></br>LN2 8HG| 


#### American Express

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 374245455400001 | 4887 | The Hunts Way<br></br>Southampton<br></br>SO18 1GW| 

#### Diners Club

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 36432685260294 | 111 | N/A | 

Diners Club do not support the Address Verification Service (AVS). For testing purposes, we advise that a separate Merchant Account is used with AVS is turned off.

### 3D Secure Testing 

Your test accounts are connected to our 3-D Secure Product Integration Testing (PIT) system rather than to the production 3-D Secure servers. You can use any of the test cards provided above with this PIT system, and the authentication status returned by the Directory Server (for frictionless flow simulation) can be selected using the value of the card expiry month as follows:

| Card Expiry Month| Auth Status | Simulation (Frictionless) | 
| ----------- | ----------- | ----------- |
| 01 - January | Y | Fully authenticated | 
| 02 - February | N | Not authenticated 
|03 - March|U|Unknown authentication status | 
|04 - April|A|Attempted authentication| 
|05 - May|D|Decoupled authentication | 
|06 - June|R|Transaction rejected (do not attempt to send for authorisation) | 
|07 – July|E|Unknown error performing 3-D Secure checks | 
|08 - August|E| Error due to timeout communicating with the Directory Server| 
|09 – September|E|Error due to corrupt response from the Directory Server.| 
|10 – October|I|Information only| 
|11 – November|U|Unknown authentication due to Cardholder not enrolled (error 13)| 
|12 - December|C|Frictionless not possible, challenge Cardholder| 

An expiry month of 12 will simulate the non frictionless flow and desired authentication status (threeDSAuthenticated) can be selected on the challenge dialog shown by the PIT Access Control Server.

When using an expiry month from the above table please use a suitable expiry year to ensure the date is sometime in the near future.

### Paypal Sandbox Accounts 

Please contact customer support to have your own PayPal test Merchant account created that connects to your own PayPal sandbox account, thus enabling you to view the transactions as they are sent to PayPal.

### Amazon Pay Sandbox Accounts 

Please contact customer support to have your own Amazon Pay test Merchant account created that connects to your own Amazon Pay sandbox account, thus enabling you to view the transactions as they are sent to Amazon Pay.

### Request Checking Only

Sometimes, you may wish to submit a request to the Gateway in order for it to be ‘validated only’ and not processed by the simulator or sent to the Acquirer. In these cases, the following flag can be used that will stop the processing after the integrity verification has been performed:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| checkOnly | No | Check the request for syntax and field value errors only. Do not attempt to submit the transaction for honouring by the Merchant’s financial institution.|

If the request is OK, then a responseCode is returned as 0 (Success); otherwise, the code that would have prevented the request from completing is returned.

Note: in these cases, the request is not stored by the Gateway and is not available within the Merchant Management System (MMS).

## Signature Calculation {#signatureCalculation} 

It is highly recommended that transactions are protected using message signing. The signing process offers a quick and simple way to ensure that the message came from an authorised source and has not been tampered with during transmission.

Signing, however, must be completed on your servers and never left for the Customer’s browser to complete in JavaScript, as this would mean revealing your secret signature code to anyone who viewed the JavaScript code in the browser.

Signatures are especially important when a transaction is sent from a browser’s payment form via the use of hidden form fields because the Customer can easily use tools built into their browser to modify these hidden fields and change items such as the amount they should be charged.

Care must be taken to ensure that fields are sorted before signing into ascending field name order according to their numeric ASCII value. Some languages natural sort routines do NOT use ASCII order by default and so need to be adjusted or alternative methods used.

Also, when signing requests with fields formatted as per the [format guide](overview#fieldFormats), only the root integration field is included in any sorting as the sub-fields are part of the value and should not have their order changed. The sub-fields must then be sent in the same order as they were hashed if added as hidden fields in HTML forms etc.
The section below gives a step-by-step example of how to sign a transaction, complete with coding examples using the PHP language.

### Example Signature Key 

```php
$key = 'DontTellAnyone'
```

### Example Transaction 

```php
$tran = array ( 
    'merchantID' => '100001',  //merchantID will be provided by the Handpoint support team
    'action' => 'SALE', //action could be SALE, VERIFY or PREAUTH 
    'type' => '1', //1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA)
    'currencyCode' => '826', //ISO 3-letter currency code. 826 -> GBP
    'countryCode' => '826', //ISO 3-letter country code. 826 -> United Kingdom
    'amount' => '2691', //Either major currency units includes a single decimal point such as ’10.99'. 
                      //Minor currency units contains no decimal points such as ‘1099
    'transactionUnique' => '55f025addd3c2', //Unique identifier for this transaction. This is an added security feature to combat transaction spoofing
    'orderRef' => 'Signature Test',  //Free format text field to store order details, reference numbers, etc. for the Merchant’s records.
    'cardNumber' => '4929 4212 3460 0821', //Card Number
    'cardExpiryDate' => '1213', ) //Card expiry date
```
:::tip
The transaction used for signature calculation must not include any 'signature' field as this will be added after signing when its value is known.
:::

#### Step 1 - Sort transaction values by their field name

Transaction fields must be in ascending field name order according to their numeric ASCII value.

```php
ksort($tran);
array ( 'action' => 'SALE', 'amount' => '2691', 'cardExpiryDate' => '1213', 'cardNumber' => '4929 4212 3460 0821', 'countryCode' => '826', 'currencyCode' => '826', 'merchantID' => '100001', 'orderRef' => 'Signature Test', 'transactionUnique' => '55f025addd3c2', 'type' => '1' )
```

#### Step 2 - Create url encoded string from sorted fields

Use RFC 1738 and the application/x-www-form-urlencoded media type, which implies that spaces are encoded as plus (+) signs.

```php
$str = http_build_query($tran, '', '&');

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1
```

#### Step 3 - Normalise all line endings in the url encoded string

Convert all CR NL, NL CR, CR character sequences to a single NL character.

```php
$str = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $str);

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1
```
#### Step 4 - Append your signature key to the normalised string

The signature key is appended to the normalised string with no separator characters.

```php
$str .= 'DontTellAnyone'

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1DontTellAnyone
```

#### Step 5 - Hash the string using the SHA-512 algorithm

The normalised string is hashed to a more compact value using the secure SHA-512 hashing algorithm.

```php
$signature = hash('SHA512', $str);

da0acd2c404945365d0e7ae74ad32d57c561e9b942f6bdb7e3dda49a08fcddf74fe6af6b23b8481b8dc8895c12fc21c72c69d60f137fdf574720363e33d94097
```

#### Step 6 - Add the signature to the transaction form or post data

The signature should be sent as part of the transaction in a field called 'signature'.

```php
<input type="hidden" name="signature" value="<?=$signature?>">
or
$tran['signature'] = $signature;
```

### Sample Code PHP

Example of calculating the signature in PHP:

```php

<?PHP 

//Merchant signature key
$key = '3obzOxdqw6e1u';


//Request Information
$tran = array (
'merchantID' => '155928',  //merchantID will be provided by the Handpoint support team
    'action' => 'SALE', //action could be SALE, VERIFY or PREAUTH 
    'type' => '1', //1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA)
    'currencyCode' => '826', //ISO 3-letter currency code. 826 -> GBP
    'countryCode' => '826', //ISO 3-letter country code. 826 -> United Kingdom
    'amount' => '2691', //Either major currency units includes a single decimal point such as ’10.99'. 
                      //Minor currency units contains no decimal points such as ‘1099
    'transactionUnique' => '55f025addd3c2', //Unique identifier for this transaction. This is an added security feature to combat transaction spoofing
    'orderRef' => 'Signature Test',  //Free format text field to store order details, reference numbers, etc. for the Merchant’s records.
    'cardNumber' => '4929 4212 3460 0821', //Card Number
    'cardExpiryDate' => '1213',
);
 

 ksort($tran);

 $str = http_build_query($tran, '', '&');

 $str = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $str);

 $str .= '3obzOxdqw6e1u';

 $signature = hash('SHA512', $str);

 //Prints the signature
 printf("Signature %s", $signature);
 ?>

 ```

 ## Card Brand Icons {#cardBrandIcons} 

Here you can find official images provided by card brands like [Mastercard](https://www.mastercard.com/brandcenter/en/download-artwork), [Maestro](https://www.mastercard.com/brandcenter/en/brand-requirements/maestro), [Visa](https://www.merchantsignage.visa.com/brand_guidelines), [Discover](https://discoversignage.com/free-signage-logos), [American Express](https://www.americanexpress.com/content/dam/amex/us/merchant/pdf/gms-stripe-pop-coverage.pdf), [JCB](https://www.jcb.co.jp/bdmanual/en/basicDesignElements/jcbEmblem/index01download01.html), [China UnionPay](https://www.unionpayintl.com/en/mediaCenter/brandCenter/artworkDownloadCenter/identification.shtml).