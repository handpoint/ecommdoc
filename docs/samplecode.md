---
sidebar_position: 7
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
        Customer Address: <strong>Merevale Avenue Leicester LE10 2BU</strong>
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
        Customer Address: <strong>Flat 6 Primrose Rise 347 Lavender Road Northampton NN17 8YG</strong>
      </p>
    </div>
  </div>
</div>

## Hosted Payment Page 

### Using Lightbox modal

The following example code shows how to create a payment form to open the Hosted Payment Page in a lightbox style overlay on your website using the Hosted Payment Page and jQuery libraries. 

The test accounts will only accept card numbers that are designated for test purposes. [Test cards](samplecode#test-cards-data) cannot be used on production accounts.


<iframe width="100%" height="650" src="//jsfiddle.net/MiguelGarcia/0hL4y7jv/51/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>


<br/>
<br/>

### Redirecting to payments website
The following example code shows how to create a payment form to open the Hosted Payment Page. Instead of the  lightbox (modal) on top of the page, the user is redirected to a fully separate web page

<iframe width="100%" height="650" src="//jsfiddle.net/MiguelGarcia/jw0eL4hy/14/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## Transaction Types

All requests must specify what action they require the Gateway to perform, using the action request field.

### SALE

This `form` will create a new transaction (10.01GBP) and attempt to seek authorisation for a sale from the Acquirer. 

```html
<form id="paynow" name="payment-form" method="post" action="https://commerce-api.handpoint.com/hosted/modal/"
                data-hostedforms-modal>
                <input type="hidden" name="merchantID" value="155928" />
                <!-- merchantID will be provided by the Handpoint Support team -->
                <input type="hidden" name="action" value="SALE" /> <!-- action could be SALE, VERIFY or PREAUTH -->
                <input type="hidden" name="type" value="1" />
                <!-- 1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA) -->
                <input type="hidden" name="currencyCode" value="826" /> <!-- ISO 3-letter currency code. 826-> GBP -->
                <input type="hidden" name="countryCode" value="826" />
                <!-- ISO 3-letter country code. 826-> United Kingdom -->
                <input type="hidden" name="amount" value="1001" />
                <!-- Either major currency units includes a single decimal point such as ’10.99’; or minor currency units contains no decimal points such as ‘1099’.  -->
                <input type="hidden" name="orderRef" value="Test purchase" />
                <!--Free format text field to store order details, reference numbers, etc. for the Merchant’s records.-->
                <input type="hidden" name="redirectURL" value="https://www.handpoint.com" />
                <!--Hosted form will redirect the Customer’s browser after the transaction has been completed.-->
                <input type="hidden" name="customerAddress" value="Merevale Avenue Leicester LE10 2BU" />
                <!-- Cardholder address -->
                <input type="hidden" name="signature"
                    value="7e9d7b598dfb56f5be68cfbba571caf0e7bce138dc6f066a733c6f523fd96db745ff4909d64a37ccf1b5e99169c23dcdf6f298f381ea4f5236a3fe37e4760060" />
                <!-- Hash generated from the combination of the serialised request and this signing secret phrase -->
                <input type="submit" value="Pay Now">
            </form>
```
 

### VERIFY

This `form` will create a new transaction (0.00GBP) and attempt to verify that the card account exists with the Acquirer. 

```html
<form name="payment-form" method="post" action="https://commerce-api.handpoint.com/hosted/modal/"
                data-hostedforms-modal>
                <input type="hidden" name="merchantID" value="155928" />
                <!-- merchantID will be provided by the Handpoint Support team -->
                <input type="hidden" name="action" value="VERIFY" /> <!-- action could be SALE, VERIFY or PREAUTH -->
                <input type="hidden" name="type" value="1" />
                <!-- 1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA) -->
                <input type="hidden" name="currencyCode" value="826" /> <!-- ISO 3-letter currency code. 826-> GBP -->
                <input type="hidden" name="countryCode" value="826" />
                <!-- ISO 3-letter country code. 826-> United Kingdom -->
                <input type="hidden" name="amount" value="0" />
                <!-- Either major currency units includes a single decimal point such as ’10.99’; or minor currency units contains no decimal points such as ‘1099’.  -->
                <input type="hidden" name="orderRef" value="Test purchase" />
                <!--Free format text field to store order details, reference numbers, etc. for the Merchant’s records.-->
                <input type="hidden" name="redirectURL" value="https://www.handpoint.com" />
                <!--Hosted form will redirect the Customer’s browser after the transaction has been completed.-->
                <input type="hidden" name="customerAddress" value="Merevale Avenue Leicester LE10 2BU" />
                <!-- Cardholder address -->
                <input type="hidden" name="signature"
                    value="1b2779af8d178265545353d1fb5d83dbdb596ca158e3d770c469010bd0c8cdf32f43e40e33d540c9b76222c75c3a1f456487f1c44655086352ffca0179065ef6" />
                <!-- Hash generated from the combination of the serialised request and this signing secret phrase -->
                <input type="submit" value="Pay Now">
            </form>
```            


 ### PREAUTH
This `form` will create a new transaction (1.01GBP) and attempt to seek authorisation for a sale from the Acquirer.

```html
            <form name="payment-form" method="post" action="https://commerce-api.handpoint.com/hosted/modal/"
                data-hostedforms-modal>
                <input type="hidden" name="merchantID" value="155928" />
                <!-- merchantID will be provided by the Handpoint Support team -->
                <input type="hidden" name="action" value="PREAUTH" /> <!-- action could be SALE, VERIFY or PREAUTH -->
                <input type="hidden" name="type" value="1" />
                <!-- 1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA) -->
                <input type="hidden" name="currencyCode" value="826" /> <!-- ISO 3-letter currency code. 826-> GBP -->
                <input type="hidden" name="countryCode" value="826" />
                <!-- ISO 3-letter country code. 826-> United Kingdom -->
                <input type="hidden" name="amount" value="101" />
                <!-- Either major currency units includes a single decimal point such as ’1.01’; or minor currency units contains no decimal points such as ‘1099’.  -->
                <input type="hidden" name="orderRef" value="Test purchase" />
                <!--Free format text field to store order details, reference numbers, etc. for the Merchant’s records.-->
                <input type="hidden" name="redirectURL" value="https://www.handpoint.com" />
                <!--Hosted form will redirect the Customer’s browser after the transaction has been completed.-->
                <input type="hidden" name="customerAddress" value="Merevale Avenue Leicester LE10 2BU" />
                <!-- Cardholder address -->
                <input type="hidden" name="signature"
                    value="d0f9bd499ac12911ccc8c764375d963536c54b6613b91932a2b04b59b1c34019961fee69f9389bb1ea8d9fecdeaa8aec84d40566af9e52fb28793cf2b9a4a427" />
                <!-- Hash generated from the combination of the serialised request and this signing secret phrase -->
                <input type="submit" value="Pay Now">
            </form>
```