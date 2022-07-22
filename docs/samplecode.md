---
sidebar_position: 2
---

# Sample Code


## Test Cards Data

The test accounts will only accept card numbers that are designated for test purposes. These test cards cannot be used on production accounts.

<div class="card-demo">
  <div class="card shadow--md">
    <div class="card__header">
      <h3>Mastercard Debit</h3>
    </div>
    <div class="card__body">
      <p>
        Cardholder Name: <strong>Test Customer</strong> <br/>
        Card Number: <strong>5573 4712 3456 7898</strong> <br/>
        Expiration Date: <strong>12/25</strong> <br/>
        CVV: <strong>159</strong><br/>
        Customer Address: <strong>Merevale Avenue Leicester </strong> <br/>
        Postal Code: <strong>LE10 2BU</strong>
      </p>
    </div>
  </div>
</div>

<br/>

<div class="card-demo">
  <div class="card shadow--md">
    <div class="card__header">
      <h3>Visa Credit</h3>
    </div>
    <div class="card__body">
      <p>
        Cardholder Name: <strong>Test Customer</strong> <br/>
        Card Number: <strong>4929 4212 3460 0821</strong> <br/>
        Expiration Date: <strong>12/25</strong> <br/>
        CVV: <strong>356</strong><br/>
        Customer Address: <strong>Flat 6 Primrose Rise 347 Lavender Road Northampton </strong> <br/>
         Postal Code: <strong>NN17 8YG</strong>
      </p>
    </div>
  </div>
</div>

## Request Checking Only

Sometimes, you may wish to submit a request to the Gateway in order for it to be ‘validated only’ and not processed by the simulator or sent to the Acquirer. In these cases, the following flag can be used that will stop the processing after the integrity verification has been performed:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| checkOnly | No | Check the request for syntax and field value errors only. Do not attempt to submit the transaction for honouring by the Merchant’s financial institution.|

If the request is OK, then a responseCode is returned as 0 (Success); otherwise, the code that would have prevented the request from completing is returned.

Note: in these cases, the request is not stored by the Gateway and is not available within the Merchant Management System (MMS).

## Hosted Payment Page 

### Using Embedded iFrame

The following example code shows how to create a payment form using the Hosted Payment Page via an embedded iFrame


<iframe width="100%" height="750" src="//jsfiddle.net/Handpoint/xg0dptsw/12/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameBorder="0"></iframe>

### Using Lightbox modal

The following example code shows how to create a payment form to open the Hosted Payment Page in a lightbox style overlay on your website using the Hosted Payment Page and jQuery libraries. 

The test accounts will only accept card numbers that are designated for test purposes. [Test cards](samplecode#test-cards-data) cannot be used on production accounts.


<iframe width="100%" height="650" src="//jsfiddle.net/Handpoint/vg9on6j0/17/embedded/html,result/dark/" allowFullScreen={true} allowpaymentrequest="true" frameBorder="0"></iframe>


<br/>
<br/>

### Redirecting to payments website
The following example code shows how to create a payment form to open the Hosted Payment Page. Instead of the  lightbox (modal) on top of the page, the user is redirected to a fully separate web page


<iframe width="100%" height="650" src="//jsfiddle.net/Handpoint/32tmc70h/26/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameBorder="0"></iframe>


## Transaction Types

All requests must specify what action they require the Gateway to perform, using the action request field.

### SALE

This `form` will create a new transaction (10.01GBP) and attempt to seek authorisation for a sale from the Acquirer. 

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
      <input type="hidden" name="redirectURL" value="https://www.handpoint.com" /> <!--Hosted form will redirect the Customer’s browser after the transaction has been completed.-->
      <input type="hidden" name="customerAddress" value="Merevale Avenue Leicester" /> <!-- Cardholder address -->
      <input type="hidden" name="customerPostCode" value="LE10 2BU" /> <!-- Registered postcode for the card. -->
      <input type="hidden" name="signature" value="6cdc7f1b2b457ad63261837e9fb7fb96530b4aa37a703717a926e58739f809c64f28d2f5f31563b1ac022b04ea94c34b6e375cf8370362cd5179bda12d2f76fd" />
      <!-- Hash generated from the combination of the serialised request and this signing secret phrase -->
      <input type="submit" value="Pay Now">
</form>
```

<iframe width="100%" height="550" src="//jsfiddle.net/Handpoint/zt9bdxof/22/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameBorder="0"></iframe>
 

### VERIFY

This `form` will create a new transaction (0.00GBP) and attempt to verify that the card account exists with the Acquirer. 

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
      <input type="hidden" name="redirectURL" value="https://www.handpoint.com" /> <!--Hosted form will redirect the Customer’s browser after the transaction has been completed.-->
      <input type="hidden" name="customerAddress" value="Merevale Avenue Leicester" /> <!-- Cardholder address -->
      <input type="hidden" name="customerPostCode" value="LE10 2BU" /> <!-- Registered postcode for the card. -->
      <input type="hidden" name="signature" value="63f917d6031480d5a5dfce926a767c6982ee93135bfd1e488113046be98d3db9ff3270aa3a4a25bc76bf61b83618449d532c464bb42166705a27cf26547716ca" />
      <!-- Hash generated from the combination of the serialised request and this signing secret phrase -->
      <input type="submit" value="Verify Card">
</form>
```            

<iframe width="100%" height="500" src="//jsfiddle.net/Handpoint/3q86ypo0/19/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

 ### PREAUTH
This `form` will create a new transaction (1.01GBP) and attempt to seek authorisation for a sale from the Acquirer.

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
    <input type="hidden" name="redirectURL" value="https://www.handpoint.com" /> <!--Hosted form will redirect the Customer’s browser after the transaction has been completed.-->
    <input type="hidden" name="customerAddress" value="Merevale Avenue Leicester" /> <!-- Cardholder address -->
    <input type="hidden" name="customerPostCode" value="LE10 2BU" /> <!-- Registered postcode for the card. -->
    <input type="hidden" name="signature" value="f4f7b0c893d846d09efd2edfc3cbb21ab0c4248e35da0a8ae8cd8634273e4d10f53ca2fa5502508058319ce49adef9cd329d4bc781896e0d9db41a19e6ddac2d" />
    <!-- Hash generated from the combination of the serialised request and this signing secret phrase -->
    <input type="submit" value="Pre Authorization (£1,01)">
</form>
```

<iframe width="100%" height="500" src="//jsfiddle.net/Handpoint/th3a8L54/16/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>


## Gateway Wallet

### Hosted Integration creating a new Gateway Wallet

In this example we can make a SALE of 19.99 GBP.

Once the card data has been entered, the option "**Save my card details**" must be selected.

![Save card details ](/img/CardDetailsWallet.png)

A `walletID` will be generated, the transaction information (and the included `walletID`) will appear on the website indicated in the request `callbackURL` field.
This wallet ID will have to be used in the requests so that it can be used. See example of using a `walletID` [Hosted Integration using Gateway Wallet](samplecode.md#hosted-integration-using-gateway-wallet)


<iframe width="100%" height="600" src="//jsfiddle.net/Handpoint/j0ck72bu/11/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### Hosted Integration using Gateway Wallet

Using the **Saved Cards** option will allow you to use a previously used card. A `walletID` needs to be provided in the request.

The CVV of the stored card is **159**. 

<iframe width="100%" height="600" src="//jsfiddle.net/Handpoint/31yq5L2h/11/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameBorder="0"></iframe>