---
sidebar_position: 2
---

# Advanced Pay Button Integration

Creating a custom pay button allows you to have full control over what information is passed to the Handpoint gateway. You can leverage any of the [hosted integration fields](/docs/transactiontypes#transactionRequest) as part of the pay button integration.


## Pre-Requisites

| Name      | Description |
| ----------- | ----------- |
| Merchant Account ID | Your unique Merchant Account ID. You should have received these details when your account was set up. |
| Hosted Integration URL | Your unique URL to use the Hosted Integration. |
| Signature |Hash used to sign the transaction request. See the [signature calculation](/docs/samplecode#signatureCalculation) section for information on how to create the hash.|

## Gateway Request

To create the button the details should be URL encoded Name=Value fields separated by ‘&’ characters (refer to RFC 1738 and the application/x-wwwform- urlencoded media type).

This is then base64 encoded with all padding characters (=) stripped and the following characters +, / replaced with – and _ respectively.

This string is then appended to the gateway URL via a GET parameter called fields to give the final link replacing the {base 64 encoded string} above.


## Request Fields

| Field      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| merchantID | <span class="badge badge--primary">Yes</span> | The six-digit id provided to you during set-up, e.g. `123456` For testing, please use ‘TEST’ |
| amount | <span class="badge badge--primary">Yes</span> | The amount of the transaction in minor currency. For the UK this is in pence, e.g. £10.99 is sent as 1099. Numeric values only – no decimal points or currency symbols. |
| action| <span class="badge badge--primary">Yes</span> | The action of the transaction. Values are: [SALE](/docs/transactiontypes#sale), [VERIFY](/docs/transactiontypes#verify) and [PREAUTH](/docs/transactiontypes#preauth).|
| type | <span class="badge badge--primary">Yes</span> | The type of transaction. Passed as a single digit. Possible values are: <br></br> **1** – E-commerce (ECOM)<br></br> **2** - Mail Order/Telephone Order (MOTO)|
| redirectURL  | <span class="badge badge--primary">Yes</span> | The URL to which the customer will be redirected after the transaction with the transaction result sent via POST. We recommend the integration also contain a **callbackURL** to ensure the transaction details are sent to the website in case the cardholder’s browser fails to redirect them. |
| countrycode | <span class="badge badge--primary">Yes</span> | Merchant's Location. Valid ISO-3166 alpha or numeric code, e.g. 826 for U.K. |
| currencyCode | <span class="badge badge--primary">Yes</span> | Transaction Currency. Valid ISO-3166 alpha or numeric code, e.g. 826 for U.K. |
| signature| <span class="badge badge--primary">Yes</span> |A hashed string of the request containing the signature key unique to the merchant ID. More details on message signing can be found in our annex [Signature Calculation](/docs/samplecode#signatureCalculation)|
| redirectURLFail | No | The URL to which the customer will be redirected and the transaction result will be POSTed if the transaction fails.If left blank, the **redirectURL** will be used. |
| formAmountEditable | No |  Accepts the following value: <br></br> ‘**Y**’ – Allows the cardholder to enter the amount to pay in the hosted form and is useful for donations. <br></br> Note: Passing ‘**N**’, or null to this field causes the amount in the hosted form to act as default, i.e. A static value the user can’t change. |


## Sample Code (Request)

The following is an example test request built in PHP.

```php
<?php

//Gateway URL
$url = 'https://commerce-api.handpoint.com/button/';

//Merchant signature key. It will be provided by the Handpoint support team
$sigKey = '3obzOxdqw6e1u';

//Request information
$req = array(
    'merchantID' => '155928', //merchantID will be provided by the Handpoint support team
    'amount' => 1099, //Either major currency units includes a single decimal point such as ’10.99'. 
                      //Minor currency units contains no decimal points such as ‘1099
    'action' => 'SALE', //action could be SALE, VERIFY or PREAUTH 
    'type' => 1, //1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO)
    'redirectURL' => 'https://www.handpoint.com', //The payment form will redirect the Customer’s browser to this URL after the transaction has been completed.
    'countryCode' => 826, //ISO 3-letter country code. 826 -> United Kingdom
    'currencyCode' => 826 //ISO 3-letter currency code. 826 -> GBP
);

$req['signature'] = createSignature($req, $sigKey);
$poststring       = http_build_query($req, '', '&');
$base64request    = base64_encode($poststring);

echo "<form action=\"{$url}?fields={$base64request}\" method=\"post\" id=\"custom\">";

//Button to start the payment
echo '<input type="submit" value="Pay Now">
</form>';

//Function that generates the signature using the request information and the merchant signature key
function createSignature(array $data, $key){
    
    // Sort by field name
    ksort($data);
    // Create the URL encoded signature string
    $ret = http_build_query($data, '', '&');
    // Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A) 
    $ret = str_replace(array(
        '%0D%0A',
        '%0A%0D',
        '%0D'
    ), '%0A', $ret);
    
    // Hash the signature string and the key together
    return hash('SHA512', $ret . $key);
}
?>
```