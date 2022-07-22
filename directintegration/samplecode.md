---
sidebar_position: 2

---

# Sample Code

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
$key = 'm3rch4nts1gn4tur3k3y';


//Request Information
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


## Transaction Types

### SALE

The following example PHP code shows how to send a **SALE** transaction (amount £21,01) with support for 3-D
Secure using the [Gateway library](annexes.md#gateway-library-php):

```php

<?PHP

require('gateway.php');

use \P3\SDK\Gateway;

 // Merchant signature key --> It will be provided by the Handpoint support team.
 Gateway::$merchantSecret = 'm3rch4nts1gn4tur3k3y';

 // Handpoint Gateway URL
 Gateway::$directUrl = 'https://commerce-api.handpoint.com/direct/';

 // Setup PHP session as use it to store data between 3DS steps
 if (isset($_GET['sid'])) {
 session_id($_GET['sid']);
 }

 session_start(); 
 // Compose current page URL (removing any sid and acs parameters)
 $pageUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://'). $_SERVER['SERVER_NAME']. ($_SERVER['SERVER_PORT'] != '80' ? ':' . $_SERVER['SERVER_PORT'] : ''). preg_replace('/(sid=[^&]+&?)|(acs=1&?)/', '', $_SERVER['REQUEST_URI']);

 // Add back the correct sid parameter (used as session cookie may not be passed when the page is redirected from an IFRAME)
 $pageUrl .= (strpos($pageUrl, '?') === false ? '?' : '&') . 'sid=' . urlencode(session_id());
 
 // If ACS response into the IFRAME then redirect back to parent window
 if (!empty($_GET['acs'])) {
 echo silentPost($pageUrl, array('threeDSResponse' => $_POST), '_parent');
 exit();
 }

 if (!isset($_POST['threeDSResponse'])) {
 // Initial request

 // Gather browser info - can be done at any time prior to the checkout
 if (!isset($_POST['browserInfo'])) {
 echo Gateway::collectBrowserInfo();
 exit();
 }

 // Direct Request
 
 $req = array(
 'merchantID' => 155928,
 'action' => 'SALE',
 'type' => 1,
 'currencyCode' => 826,
 'countryCode' => 826,
 'amount' => 2101,
 'cardNumber' => '5573471234567898',
 'cardExpiryMonth' => 12,
 'cardExpiryYear' => 25,
 'cardCVV' => '159',
 'customerName' => 'Test Customer',
 'customerEmail' => 'example@example.com',
 'customerAddress' => 'Merevale Avenue Leicester',
 'customerPostCode' => 'LE10 2BU',
 'orderRef' => 'Test purchase',

 // The following fields are mandatory for 3DS v2
 'remoteAddress' => $_SERVER['REMOTE_ADDR'],
 'threeDSRedirectURL' => $pageUrl . '&acs=1',

 // The following field allows options to be passed for 3DS v2
 // and the values here are for demonstration purposes only
 'threeDSOptions' => array(
      'paymentAccountAge' => '20220601', //Date that the payment account was enrolled in the cardholder's account with the 3DS Requestor. 
                                         //Accepted date format is YYYYMMDD.
      
      'paymentAccountAgeIndicator' => '05', //Indicates the length of time that the payment account was enrolled in the cardholder's account 
                                            //with the 3DS Requestor. Possible values are:
                                            //01 – No account (guest check-out) 
                                            //02 – Created during this transaction
                                            //03 – Less than 30 days
                                            //04 – 30-60 days  
                                            //05 – More than 60 days
   ),
 );

 // Add the browser info as it is mandatory for 3DS v2
 $req += $_POST['browserInfo'];

 } else {

  // 3DS continuation request
    $req = array (
      // The following field are only required for tbe benefit of the SDK 
      'merchantID' => '155928',
      'action' => 'SALE',

      // The following field must be passed to continue the 3DS request
      'threeDSRef' => $_SESSION['threeDSRef'],
      'threeDSResponse' => $_POST['threeDSResponse'],
    );   
        
 } 

 try {
    $res = Gateway::directRequest($req);
 } catch (\Exception $e) {
 
// You should exit gracefully
 die('Sorry, the request could not be sent: ' . $e);
 }

 print $res['responseCode'];
// Check the response code
    if ($res['responseCode'] === Gateway::RC_3DS_AUTHENTICATION_REQUIRED) { 
    // Send request to the ACS server displaying response in an IFRAME

        // Render an IFRAME to show the ACS challenge (hidden for fingerprint method)
        $style = (isset($res['threeDSRequest']['threeDSMethodData']) ? 'display: none;' : '');
        echo "<iframe name=\"threeds_acs\" style=\"height:420px; width:420px; {$style}\"></iframe>\n";

        // Silently POST the 3DS request to the ACS in the IFRAME
        echo silentPost($res['threeDSURL'], $res['threeDSRequest'], 'threeds_acs');

        // Remember the threeDSRef as need it when the ACS responds
        $_SESSION['threeDSRef'] = $res['threeDSRef'];

    } else if ($res['responseCode'] === Gateway::RC_SUCCESS) {

        echo "<p>Thank you for your payment.</p>";
          } else {
           echo "<p>Failed to take payment: " . htmlentities($res['responseMessage']) . "</p>";
          }


// Render HTML to silently POST data to URL in target brower window 
function silentPost($url = '?', array $post = null, $target = '_self') { 
  $url = htmlentities($url);
  $target = htmlentities($target);
  $fields = '';


  if ($post) {
    foreach ($post as $name => $value) {
      $fields .= Gateway::fieldToHtml($name, $value);
    }
  }

    $ret = "<form id=\"silentPost\" action=\"{$url}\" method=\"post\" target=\"{$target}\">
    {$fields}
    <noscript><input type=\"submit\" value=\"Continue\"></noscript
    </form>

    <script>
      window.setTimeout('document.forms.silentPost.submit()', 0);
    </script>
    ";

 return $ret;
}

?>
```

### VERIFY

The following example PHP code shows how to send a **VERIFY** (amount £0,00) transaction with support for 3-D
Secure using the [Gateway library](annexes.md#gateway-library-php):


```php
<?PHP

require('gateway.php');

use \P3\SDK\Gateway;

 // Merchant signature key --> It will be provided by the Handpoint support team.
 Gateway::$merchantSecret = 'm3rch4nts1gn4tur3k3y';

 // Handpoint Gateway URL
 Gateway::$directUrl = 'https://commerce-api.handpoint.com/direct/';

 // Setup PHP session as use it to store data between 3DS steps
 if (isset($_GET['sid'])) {
 session_id($_GET['sid']);
 }

 session_start(); 
 // Compose current page URL (removing any sid and acs parameters)
 $pageUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://'). $_SERVER['SERVER_NAME']. ($_SERVER['SERVER_PORT'] != '80' ? ':' . $_SERVER['SERVER_PORT'] : ''). preg_replace('/(sid=[^&]+&?)|(acs=1&?)/', '', $_SERVER['REQUEST_URI']);

 // Add back the correct sid parameter (used as session cookie may not be passed when the page is redirected from an IFRAME)
 $pageUrl .= (strpos($pageUrl, '?') === false ? '?' : '&') . 'sid=' . urlencode(session_id());
 
 // If ACS response into the IFRAME then redirect back to parent window
 if (!empty($_GET['acs'])) {
 echo silentPost($pageUrl, array('threeDSResponse' => $_POST), '_parent');
 exit();
 }

 if (!isset($_POST['threeDSResponse'])) {
 // Initial request

 // Gather browser info - can be done at any time prior to the checkout
 if (!isset($_POST['browserInfo'])) {
 echo Gateway::collectBrowserInfo();
 exit();
 }

 // Direct Request
 
 $req = array(
 'merchantID' => 155928,
 'action' => 'VERIFY',
 'type' => 1,
 'currencyCode' => 826,
 'countryCode' => 826,
 'amount' => 0,
 'cardNumber' => '5573471234567898',
 'cardExpiryMonth' => 12,
 'cardExpiryYear' => 25,
 'cardCVV' => '159',
 'customerName' => 'Test Customer',
 'customerEmail' => 'example@example.com',
 'customerAddress' => 'Merevale Avenue Leicester',
 'customerPostCode' => 'LE10 2BU',
 'orderRef' => 'Test purchase',

 // The following fields are mandatory for 3DS v2
 'remoteAddress' => $_SERVER['REMOTE_ADDR'],
 'threeDSRedirectURL' => $pageUrl . '&acs=1',

 // The following field allows options to be passed for 3DS v2
 // and the values here are for demonstration purposes only
 'threeDSOptions' => array(
      'paymentAccountAge' => '20220601',
      'paymentAccountAgeIndicator' => '05',
   ),
 );

 // Add the browser info as it is mandatory for 3DS v2
 $req += $_POST['browserInfo'];

 } else {

   $req = array (
      // The following field are only required for tbe benefit of the SDK 
      'merchantID' => '155928',
      'action' => 'VERIFY',
      'threeDSRef' => $_SESSION['threeDSRef'],
      'threeDSResponse' => $_POST['threeDSResponse'],
    );
        
 } 

 try {
    $res = Gateway::directRequest($req);
 } catch (\Exception $e) {
 
// You should exit gracefully
 die('Sorry, the request could not be sent: ' . $e);
 }

 print $res['responseCode'];
// Check the response code
if ($res['responseCode'] === Gateway::RC_3DS_AUTHENTICATION_REQUIRED) { 
// Send request to the ACS server displaying response in an IFRAME

 // Render an IFRAME to show the ACS challenge (hidden for fingerprint method)
 $style = (isset($res['threeDSRequest']['threeDSMethodData']) ? 'display: none;' : '');
 echo "<iframe name=\"threeds_acs\" style=\"height:420px; width:420px; {$style}\"></iframe>\n";

 // Silently POST the 3DS request to the ACS in the IFRAME
 echo silentPost($res['threeDSURL'], $res['threeDSRequest'], 'threeds_acs');

 

 // Remember the threeDSRef as need it when the ACS responds
 $_SESSION['threeDSRef'] = $res['threeDSRef'];

} else if ($res['responseCode'] === Gateway::RC_SUCCESS) {

 echo "<p>Thank you for your payment.</p>";
   } 
   else {
        echo "<p>Failed to take payment: " . htmlentities($res['responseMessage']) . "</p>";
  }

// Render HTML to silently POST data to URL in target brower window 
function silentPost($url = '?', array $post = null, $target = '_self') { 
 $url = htmlentities($url);
 $target = htmlentities($target);
 $fields = '';


 if ($post) {
 foreach ($post as $name => $value) {
 $fields .= Gateway::fieldToHtml($name, $value);
 }
 }

 $ret = "
 <form id=\"silentPost\" action=\"{$url}\" method=\"post\" target=\"{$target}\">
 {$fields}
 <noscript><input type=\"submit\" value=\"Continue\"></noscript
 </form>
 <script>
 window.setTimeout('document.forms.silentPost.submit()', 0);
 </script>
 ";

 return $ret;
}

?>
```

### PREAUTH

The following example PHP code shows how to do a **PREAUTH** (amount £1,00) transaction with support for 3-D Secure using the [Gateway library](annexes.md#gateway-library-php):

```php
<?PHP

require('gateway.php');

use \P3\SDK\Gateway;

 // Merchant signature key --> It will be provided by the Handpoint support team.
 Gateway::$merchantSecret = 'm3rch4nts1gn4tur3k3y';

 // Handpoint Gateway URL
 Gateway::$directUrl = 'https://commerce-api.handpoint.com/direct/';

 // Setup PHP session as use it to store data between 3DS steps
 if (isset($_GET['sid'])) {
 session_id($_GET['sid']);
 }

 session_start(); 
 // Compose current page URL (removing any sid and acs parameters)
 $pageUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://'). $_SERVER['SERVER_NAME']. ($_SERVER['SERVER_PORT'] != '80' ? ':' . $_SERVER['SERVER_PORT'] : ''). preg_replace('/(sid=[^&]+&?)|(acs=1&?)/', '', $_SERVER['REQUEST_URI']);

 // Add back the correct sid parameter (used as session cookie may not be passed when the page is redirected from an IFRAME)
 $pageUrl .= (strpos($pageUrl, '?') === false ? '?' : '&') . 'sid=' . urlencode(session_id());
 
 // If ACS response into the IFRAME then redirect back to parent window
 if (!empty($_GET['acs'])) {
 echo silentPost($pageUrl, array('threeDSResponse' => $_POST), '_parent');
 exit();
 }

 if (!isset($_POST['threeDSResponse'])) {
 // Initial request

 // Gather browser info - can be done at any time prior to the checkout
 if (!isset($_POST['browserInfo'])) {
 echo Gateway::collectBrowserInfo();
 exit();
 }

 // Direct Request
 
 $req = array(
 'merchantID' => 155928,
 'action' => 'PREAUTH',
 'type' => 1,
 'currencyCode' => 826,
 'countryCode' => 826,
 'amount' => 100,
 'cardNumber' => '5573471234567898',
 'cardExpiryMonth' => 12,
 'cardExpiryYear' => 24,
 'cardCVV' => '159',
 'customerName' => 'Test Customer',
 'customerEmail' => 'example@example.com',
 'customerAddress' => 'Merevale Avenue Leicester',
 'customerPostCode' => 'LE10 2BU',
 'orderRef' => 'Test purchase',

 // The following fields are mandatory for 3DS v2
 'remoteAddress' => $_SERVER['REMOTE_ADDR'],
 'threeDSRedirectURL' => $pageUrl . '&acs=1',

 // The following field allows options to be passed for 3DS v2
 // and the values here are for demonstration purposes only
 'threeDSOptions' => array(
      'paymentAccountAge' => '20220601',
      'paymentAccountAgeIndicator' => '05',
   ),
 );

 // Add the browser info as it is mandatory for 3DS v2
 $req += $_POST['browserInfo'];

 } else {

   $req = array (
      // The following field are only required for tbe benefit of the SDK 
      'merchantID' => '155928',
      'action' => 'PREAUTH',

      // The following field must be passed to continue the 3DS request
      'threeDSRef' => $_SESSION['threeDSRef'],
      'threeDSResponse' => $_POST['threeDSResponse'],
    );
        
 } 

 try {
    $res = Gateway::directRequest($req);
 } catch (\Exception $e) {
 
// You should exit gracefully
 die('Sorry, the request could not be sent: ' . $e);
 }

 print $res['responseCode'];
// Check the response code
if ($res['responseCode'] === Gateway::RC_3DS_AUTHENTICATION_REQUIRED) { 
// Send request to the ACS server displaying response in an IFRAME

 // Render an IFRAME to show the ACS challenge (hidden for fingerprint method)
 $style = (isset($res['threeDSRequest']['threeDSMethodData']) ? 'display: none;' : '');
 echo "<iframe name=\"threeds_acs\" style=\"height:420px; width:420px; {$style}\"></iframe>\n";

 // Silently POST the 3DS request to the ACS in the IFRAME
 echo silentPost($res['threeDSURL'], $res['threeDSRequest'], 'threeds_acs');

 

 // Remember the threeDSRef as need it when the ACS responds
 $_SESSION['threeDSRef'] = $res['threeDSRef'];

} else if ($res['responseCode'] === Gateway::RC_SUCCESS) {

 echo "<p>Thank you for your payment.</p>";
   } 
   else {
        echo "<p>Failed to take payment: " . htmlentities($res['responseMessage']) . "</p>";
  }

// Render HTML to silently POST data to URL in target brower window 
function silentPost($url = '?', array $post = null, $target = '_self') { 
 $url = htmlentities($url);
 $target = htmlentities($target);
 $fields = '';


 if ($post) {
 foreach ($post as $name => $value) {
 $fields .= Gateway::fieldToHtml($name, $value);
 }
 }

 $ret = "
 <form id=\"silentPost\" action=\"{$url}\" method=\"post\" target=\"{$target}\">
 {$fields}
 <noscript><input type=\"submit\" value=\"Continue\"></noscript
 </form>
 <script>
 window.setTimeout('document.forms.silentPost.submit()', 0);
 </script>
 ";

 return $ret;
}

?>
```

### REFUND_SALE

The following example PHP code shows how to do a **REFUND_SALE** transaction, the previous SALE transaction should be specified using the `xref` field, using the [Gateway library](annexes.md#gateway-library-php).

Partial refunds are allowed by specifying the amount to refund. Any amount must not be greater than the original received amount minus any already refunded amount. Multiple partial refunds may be made while there is still a portion of the originally received amount un-refunded.



```php
<?PHP

require('gateway.php');

use \P3\SDK\Gateway;

 // Merchant signature key --> It will be provided by the Handpoint support team.
 Gateway::$merchantSecret = 'm3rch4nts1gn4tur3k3y';


 // Handpoint Gateway URL
 Gateway::$directUrl = 'https://commerce-api.handpoint.com/direct/';

 // Setup PHP session as use it to store data between 3DS steps
 if (isset($_GET['sid'])) {
 session_id($_GET['sid']);
 }

 session_start(); 
 // Compose current page URL (removing any sid and acs parameters)
 $pageUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://'). $_SERVER['SERVER_NAME']. ($_SERVER['SERVER_PORT'] != '80' ? ':' . $_SERVER['SERVER_PORT'] : ''). preg_replace('/(sid=[^&]+&?)|(acs=1&?)/', '', $_SERVER['REQUEST_URI']);

 // Add back the correct sid parameter (used as session cookie may not be passed when the page is redirected from an IFRAME)
 $pageUrl .= (strpos($pageUrl, '?') === false ? '?' : '&') . 'sid=' . urlencode(session_id());
 
 // If ACS response into the IFRAME then redirect back to parent window
 if (!empty($_GET['acs'])) {
 echo silentPost($pageUrl, array('threeDSResponse' => $_POST), '_parent');
 exit();
 }

 if (!isset($_POST['threeDSResponse'])) {
 // Initial request

 // Gather browser info - can be done at any time prior to the checkout
 if (!isset($_POST['browserInfo'])) {
 echo Gateway::collectBrowserInfo();
 exit();
 }

 // Direct Request
 
 $req = array(
 'merchantID' => 155928,
 'action' => 'REFUND_SALE',
 'type' => 1,
 'currencyCode' => 826,
 'countryCode' => 826,
 'amount' => 1301,
 'cardNumber' => '5573471234567898',
 'cardExpiryMonth' => 12,
 'cardExpiryYear' => 25,
 'cardCVV' => '159',
 'customerName' => 'Test Customer',
 'customerEmail' => 'example@example.com',
 'customerAddress' => 'Merevale Avenue Leicester',
 'customerPostCode' => 'LE10 2BU',
 'orderRef' => 'Test purchase',
 'xref' => '11223344556677889911223', //That field is mandatory for REFUND_SALE transaction.

 // The following fields are mandatory for 3DS v2
 'remoteAddress' => $_SERVER['REMOTE_ADDR'],
 'threeDSRedirectURL' => $pageUrl . '&acs=1',

 // The following field allows options to be passed for 3DS v2
 // and the values here are for demonstration purposes only
 'threeDSOptions' => array(
      'paymentAccountAge' => '20220601',
      'paymentAccountAgeIndicator' => '05',
   ),
 );

 // Add the browser info as it is mandatory for 3DS v2
 $req += $_POST['browserInfo'];

 } else {

   $req = array (
      // The following field are only required for tbe benefit of the SDK 
      'merchantID' => '155928',
      'action' => 'REFUND_SALE',
      'threeDSRef' => $_SESSION['threeDSRef'],
      'threeDSResponse' => $_POST['threeDSResponse'],
    );
        
 } 

 try {
    $res = Gateway::directRequest($req);
 } catch (\Exception $e) {
 
// You should exit gracefully
 die('Sorry, the request could not be sent: ' . $e);
 }

 print $res['responseCode'];
// Check the response code
if ($res['responseCode'] === Gateway::RC_3DS_AUTHENTICATION_REQUIRED) { 
// Send request to the ACS server displaying response in an IFRAME

 // Render an IFRAME to show the ACS challenge (hidden for fingerprint method)
 $style = (isset($res['threeDSRequest']['threeDSMethodData']) ? 'display: none;' : '');
 echo "<iframe name=\"threeds_acs\" style=\"height:420px; width:420px; {$style}\"></iframe>\n";

 // Silently POST the 3DS request to the ACS in the IFRAME
 echo silentPost($res['threeDSURL'], $res['threeDSRequest'], 'threeds_acs');

 

 // Remember the threeDSRef as need it when the ACS responds
 $_SESSION['threeDSRef'] = $res['threeDSRef'];

} else if ($res['responseCode'] === Gateway::RC_SUCCESS) {

 echo "<p>Thank you for your payment.</p>";
   } 
   else {
        echo "<p>Failed to take payment: " . htmlentities($res['responseMessage']) . "</p>";
  }

// Render HTML to silently POST data to URL in target brower window 
function silentPost($url = '?', array $post = null, $target = '_self') { 
 $url = htmlentities($url);
 $target = htmlentities($target);
 $fields = '';


 if ($post) {
 foreach ($post as $name => $value) {
 $fields .= Gateway::fieldToHtml($name, $value);
 }
 }

 $ret = "
 <form id=\"silentPost\" action=\"{$url}\" method=\"post\" target=\"{$target}\">
 {$fields}
 <noscript><input type=\"submit\" value=\"Continue\"></noscript
 </form>
 <script>
 window.setTimeout('document.forms.silentPost.submit()', 0);
 </script>
 ";

 return $ret;
}

?>
```


### REFUND

The following example PHP code shows how to do a **REFUND** (amount £22,00) transaction with support for 3-D Secure using the [Gateway library](annexes.md#gateway-library-php):

This is an independent refund and need not be related to any previous SALE. The amount is therefore not limited by any original received amount.

```php

<?PHP

require('gateway.php');

use \P3\SDK\Gateway;

 // Merchant signature key --> It will be provided by the Handpoint support team.
 Gateway::$merchantSecret = 'm3rch4nts1gn4tur3k3y';

 // Handpoint Gateway URL
 Gateway::$directUrl = 'https://commerce-api.handpoint.com/direct/';

 // Setup PHP session as use it to store data between 3DS steps
 if (isset($_GET['sid'])) {
 session_id($_GET['sid']);
 }

 session_start(); 
 // Compose current page URL (removing any sid and acs parameters)
 $pageUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://'). $_SERVER['SERVER_NAME']. ($_SERVER['SERVER_PORT'] != '80' ? ':' . $_SERVER['SERVER_PORT'] : ''). preg_replace('/(sid=[^&]+&?)|(acs=1&?)/', '', $_SERVER['REQUEST_URI']);

 // Add back the correct sid parameter (used as session cookie may not be passed when the page is redirected from an IFRAME)
 $pageUrl .= (strpos($pageUrl, '?') === false ? '?' : '&') . 'sid=' . urlencode(session_id());
 
 // If ACS response into the IFRAME then redirect back to parent window
 if (!empty($_GET['acs'])) {
 echo silentPost($pageUrl, array('threeDSResponse' => $_POST), '_parent');
 exit();
 }

 if (!isset($_POST['threeDSResponse'])) {
 // Initial request

 // Gather browser info - can be done at any time prior to the checkout
 if (!isset($_POST['browserInfo'])) {
 echo Gateway::collectBrowserInfo();
 exit();
 }

 // Direct Request
 
 $req = array(
 'merchantID' => 155928,
 'action' => 'REFUND',
 'type' => 1,
 'currencyCode' => 826,
 'countryCode' => 826,
 'amount' => 2200,
 'cardNumber' => '5573471234567898',
 'cardExpiryMonth' => 12,
 'cardExpiryYear' => 25,
 'cardCVV' => '159',
 'customerName' => 'Test Customer',
 'customerEmail' => 'example@example.com',
 'customerAddress' => 'Merevale Avenue Leicester',
 'customerPostCode' => 'LE10 2BU',
 'orderRef' => 'Test purchase',

 // The following fields are mandatory for 3DS v2
 'remoteAddress' => $_SERVER['REMOTE_ADDR'],
 'threeDSRedirectURL' => $pageUrl . '&acs=1',

 // The following field allows options to be passed for 3DS v2
 // and the values here are for demonstration purposes only
 'threeDSOptions' => array(
      'paymentAccountAge' => '20220601',
      'paymentAccountAgeIndicator' => '05',
   ),
 );

 // Add the browser info as it is mandatory for 3DS v2
 $req += $_POST['browserInfo'];

 } else {

   $req = array (
      // The following field are only required for tbe benefit of the SDK 
      'merchantID' => '155928',
      'action' => 'REFUND',
      'threeDSRef' => $_SESSION['threeDSRef'],
      'threeDSResponse' => $_POST['threeDSResponse'],
    );
        
 } 

 try {
    $res = Gateway::directRequest($req);
 } catch (\Exception $e) {
 
// You should exit gracefully
 die('Sorry, the request could not be sent: ' . $e);
 }

 print $res['responseCode'];
// Check the response code
if ($res['responseCode'] === Gateway::RC_3DS_AUTHENTICATION_REQUIRED) { 
// Send request to the ACS server displaying response in an IFRAME

 // Render an IFRAME to show the ACS challenge (hidden for fingerprint method)
 $style = (isset($res['threeDSRequest']['threeDSMethodData']) ? 'display: none;' : '');
 echo "<iframe name=\"threeds_acs\" style=\"height:420px; width:420px; {$style}\"></iframe>\n";

 // Silently POST the 3DS request to the ACS in the IFRAME
 echo silentPost($res['threeDSURL'], $res['threeDSRequest'], 'threeds_acs');

 

 // Remember the threeDSRef as need it when the ACS responds
 $_SESSION['threeDSRef'] = $res['threeDSRef'];

} else if ($res['responseCode'] === Gateway::RC_SUCCESS) {

 echo "<p>Thank you for your payment.</p>";
   } 
   else {
        echo "<p>Failed to take payment: " . htmlentities($res['responseMessage']) . "</p>";
  }

// Render HTML to silently POST data to URL in target brower window 
function silentPost($url = '?', array $post = null, $target = '_self') { 
 $url = htmlentities($url);
 $target = htmlentities($target);
 $fields = '';


 if ($post) {
 foreach ($post as $name => $value) {
 $fields .= Gateway::fieldToHtml($name, $value);
 }
 }

 $ret = "
 <form id=\"silentPost\" action=\"{$url}\" method=\"post\" target=\"{$target}\">
 {$fields}
 <noscript><input type=\"submit\" value=\"Continue\"></noscript
 </form>
 <script>
 window.setTimeout('document.forms.silentPost.submit()', 0);
 </script>
 ";

 return $ret;
}

?>
```


### CAPTURE

The following example PHP code shows how to do a **CAPTURE** using the [Gateway library](annexes.md#gateway-library-php).

This will capture an existing transaction, identified using the `xref` request field, making it available for settlement at the next available opportunity. It can only be performed on transactions that have been authorised but not yet captured. An amount to capture may be specified but must not exceed the original amount authorised. 

**NOTE**: The original transaction must have been submitted with a `captureDelay` value that prevented immediate capture and settlement leaving the transaction in an authorised but un-captured state.

```php

<?PHP

require('gateway.php');

use \P3\SDK\Gateway;

// Merchant signature key --> It will be provided by the Handpoint support team.
Gateway::$merchantSecret = 'm3rch4nts1gn4tur3k3y';

 // Handpoint Gateway URL
 Gateway::$directUrl = 'https://commerce-api.handpoint.com/direct/';

 // Setup PHP session as use it to store data between 3DS steps
 if (isset($_GET['sid'])) {
 session_id($_GET['sid']);
 }

 session_start(); 
 // Compose current page URL (removing any sid and acs parameters)
 $pageUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://'). $_SERVER['SERVER_NAME']. ($_SERVER['SERVER_PORT'] != '80' ? ':' . $_SERVER['SERVER_PORT'] : ''). preg_replace('/(sid=[^&]+&?)|(acs=1&?)/', '', $_SERVER['REQUEST_URI']);

 // Add back the correct sid parameter (used as session cookie may not be passed when the page is redirected from an IFRAME)
 $pageUrl .= (strpos($pageUrl, '?') === false ? '?' : '&') . 'sid=' . urlencode(session_id());
 
 // If ACS response into the IFRAME then redirect back to parent window
 if (!empty($_GET['acs'])) {
 echo silentPost($pageUrl, array('threeDSResponse' => $_POST), '_parent');
 exit();
 }

 if (!isset($_POST['threeDSResponse'])) {
 // Initial request

 // Gather browser info - can be done at any time prior to the checkout
 if (!isset($_POST['browserInfo'])) {
 echo Gateway::collectBrowserInfo();
 exit();
 }

 // Direct Request
 
 $req = array(
 'merchantID' => 155928,
 'action' => 'CAPTURE',
 'xref' => '11223344556677889911223', //That field is mandatory for CAPTURE transaction.

 // The following fields are mandatory for 3DS v2
 'remoteAddress' => '$_SERVER['REMOTE_ADDR']',
 );


 } else {

   $req = array (
      // The following field are only required for tbe benefit of the SDK 
      'merchantID' => '155928',
      'action' => 'CAPTURE',
      'threeDSRef' => $_SESSION['threeDSRef'],
      'threeDSResponse' => $_POST['threeDSResponse'],
    );
        
 } 

 try {
    $res = Gateway::directRequest($req);
 } catch (\Exception $e) {
 
// You should exit gracefully
 die('Sorry, the request could not be sent: ' . $e);
 }

 print $res['responseCode'];
// Check the response code
if ($res['responseCode'] === Gateway::RC_3DS_AUTHENTICATION_REQUIRED) { 
// Send request to the ACS server displaying response in an IFRAME

 // Render an IFRAME to show the ACS challenge (hidden for fingerprint method)
 $style = (isset($res['threeDSRequest']['threeDSMethodData']) ? 'display: none;' : '');
 echo "<iframe name=\"threeds_acs\" style=\"height:420px; width:420px; {$style}\"></iframe>\n";

 // Silently POST the 3DS request to the ACS in the IFRAME
 echo silentPost($res['threeDSURL'], $res['threeDSRequest'], 'threeds_acs');

 

 // Remember the threeDSRef as need it when the ACS responds
 $_SESSION['threeDSRef'] = $res['threeDSRef'];

} else if ($res['responseCode'] === Gateway::RC_SUCCESS) {

 echo "<p>Thank you for your payment.</p>";
   } 
   else {
        echo "<p>Failed to take payment: " . htmlentities($res['responseMessage']) . "</p>";
  }

// Render HTML to silently POST data to URL in target brower window 
function silentPost($url = '?', array $post = null, $target = '_self') { 
 $url = htmlentities($url);
 $target = htmlentities($target);
 $fields = '';


 if ($post) {
 foreach ($post as $name => $value) {
 $fields .= Gateway::fieldToHtml($name, $value);
 }
 }

 $ret = "
 <form id=\"silentPost\" action=\"{$url}\" method=\"post\" target=\"{$target}\">
 {$fields}
 <noscript><input type=\"submit\" value=\"Continue\"></noscript
 </form>
 <script>
 window.setTimeout('document.forms.silentPost.submit()', 0);
 </script>
 ";

 return $ret;
}

?>
```


### CANCEL

The following example PHP code shows how to do a **CANCEL** using the [Gateway library](annexes.md#gateway-library-php).

This will cancel an existing transaction, identified using the `xref` request field, preventing it from being settled. It can only be performed on transactions, which have been authorised but not yet settled, and it is not reversible

```php
<?PHP

require('gateway.php');

use \P3\SDK\Gateway;

// Merchant signature key --> It will be provided by the Handpoint support team.
Gateway::$merchantSecret = 'm3rch4nts1gn4tur3k3y';

 // Handpoint Gateway URL
 Gateway::$directUrl = 'https://commerce-api.handpoint.com/direct/';

 // Setup PHP session as use it to store data between 3DS steps
 if (isset($_GET['sid'])) {
 session_id($_GET['sid']);
 }

 session_start(); 
 // Compose current page URL (removing any sid and acs parameters)
 $pageUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://'). $_SERVER['SERVER_NAME']. ($_SERVER['SERVER_PORT'] != '80' ? ':' . $_SERVER['SERVER_PORT'] : ''). preg_replace('/(sid=[^&]+&?)|(acs=1&?)/', '', $_SERVER['REQUEST_URI']);

 // Add back the correct sid parameter (used as session cookie may not be passed when the page is redirected from an IFRAME)
 $pageUrl .= (strpos($pageUrl, '?') === false ? '?' : '&') . 'sid=' . urlencode(session_id());
 
 // If ACS response into the IFRAME then redirect back to parent window
 if (!empty($_GET['acs'])) {
 echo silentPost($pageUrl, array('threeDSResponse' => $_POST), '_parent');
 exit();
 }

 if (!isset($_POST['threeDSResponse'])) {
 // Initial request

 // Gather browser info - can be done at any time prior to the checkout
 if (!isset($_POST['browserInfo'])) {
 echo Gateway::collectBrowserInfo();
 exit();
 }

 // Direct Request
 
 $req = array(
 'merchantID' => 155928,
 'action' => 'CANCEL',
 'xref' => '11223344556677889911223', //That field is mandatory for CANCEL transaction.
 );


 } else {

   $req = array (
      // The following field are only required for tbe benefit of the SDK 
      'merchantID' => '155928',
      'action' => 'CANCEL',
    );
        
 } 

 try {
    $res = Gateway::directRequest($req);
 } catch (\Exception $e) {
 
// You should exit gracefully
 die('Sorry, the request could not be sent: ' . $e);
 }

 print $res['responseCode'];
// Check the response code
if ($res['responseCode'] === Gateway::RC_3DS_AUTHENTICATION_REQUIRED) { 
// Send request to the ACS server displaying response in an IFRAME

 // Render an IFRAME to show the ACS challenge (hidden for fingerprint method)
 $style = (isset($res['threeDSRequest']['threeDSMethodData']) ? 'display: none;' : '');
 echo "<iframe name=\"threeds_acs\" style=\"height:420px; width:420px; {$style}\"></iframe>\n";

 // Silently POST the 3DS request to the ACS in the IFRAME
 echo silentPost($res['threeDSURL'], $res['threeDSRequest'], 'threeds_acs');

 

 // Remember the threeDSRef as need it when the ACS responds
 $_SESSION['threeDSRef'] = $res['threeDSRef'];

} else if ($res['responseCode'] === Gateway::RC_SUCCESS) {

 echo "<p>Thank you for your payment.</p>";
   } 
   else {
        echo "<p>Failed to take payment: " . htmlentities($res['responseMessage']) . "</p>";
  }

// Render HTML to silently POST data to URL in target brower window 
function silentPost($url = '?', array $post = null, $target = '_self') { 
 $url = htmlentities($url);
 $target = htmlentities($target);
 $fields = '';


 if ($post) {
  foreach ($post as $name => $value) {
    $fields .= Gateway::fieldToHtml($name, $value);
  }
 }

 $ret = "
 <form id=\"silentPost\" action=\"{$url}\" method=\"post\" target=\"{$target}\">
 {$fields}
 <noscript><input type=\"submit\" value=\"Continue\"></noscript
 </form>
 <script>
 window.setTimeout('document.forms.silentPost.submit()', 0);
 </script>
 ";

 return $ret;
}

?>
```


### QUERY

The following example PHP code shows how to do a **QUERY** using the [Gateway library](annexes.md#gateway-library-php).

This will query an existing transaction, identified using the `xref` request field, returning the original response. This is a simple transaction lookup action.

```php
<?PHP

require('gateway.php');

use \P3\SDK\Gateway;

// Merchant signature key --> It will be provided by the Handpoint support team.
Gateway::$merchantSecret = 'm3rch4nts1gn4tur3k3y';

 // Handpoint Gateway URL
 Gateway::$directUrl = 'https://commerce-api.handpoint.com/direct/';

 // Setup PHP session as use it to store data between 3DS steps
 if (isset($_GET['sid'])) {
 session_id($_GET['sid']);
 }

 session_start(); 
 // Compose current page URL (removing any sid and acs parameters)
 $pageUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://'). $_SERVER['SERVER_NAME']. ($_SERVER['SERVER_PORT'] != '80' ? ':' . $_SERVER['SERVER_PORT'] : ''). preg_replace('/(sid=[^&]+&?)|(acs=1&?)/', '', $_SERVER['REQUEST_URI']);

 // Add back the correct sid parameter (used as session cookie may not be passed when the page is redirected from an IFRAME)
 $pageUrl .= (strpos($pageUrl, '?') === false ? '?' : '&') . 'sid=' . urlencode(session_id());
 
 
 // Direct Request
  
   $req = array (
      // The following field are only required for tbe benefit of the SDK 
      'merchantID' => '155928',
      'action' => 'QUERY',
      'xref' => '11223344556677889911223', //That field is mandatory for CANCEL transaction.
    );
    

 try {
    $res = Gateway::directRequest($req);
 } catch (\Exception $e) {
 
// You should exit gracefully
 die('Sorry, the request could not be sent: ' . $e);
 }


// Check the response code
if ($res['responseCode'] === Gateway::RC_SUCCESS) {

 echo "QUERY transaction:";
 echo "<br>";
 echo "ResponseStatus:"." ".$res['responseStatus'];
 echo "<br>";
 echo "ResponseMessage:"." ".$res['responseMessage'];
 echo "<br>";
 echo "Action:"." ".$res['action'];
 echo "<br>";
 echo "Amount:"." ".$res['amount'] ;
 echo "<br>";
 echo "XREF:"." ". $res['xref'];
 echo "<br>";
 echo "TransactionID:"." ".$res['transactionID'];
 echo "<br>";
 echo "State:"." ".$res['state'];
 echo "<br>";
 echo "Timestamp:"." ".$res['timestamp'];
 echo "<br>";
 echo "CardNumberMask:"." ".$res['cardNumberMask'];
 echo "<br>";
 echo "CardTypeCode:"." ".$res['cardTypeCode'];
 echo "<br>";
 echo "CardType:"." ".$res['cardType'];
 echo "<br>";
 echo "CardSchemeCode:"." ".$res['cardSchemeCode'];
 echo "<br>";
 echo "CardScheme:"." ".$res['cardScheme'];
 echo "<br>";
 echo "CardIssuer:"." ".$res['cardIssuer'];

   } 
   else {
        echo "<p>Failed to take payment: " . htmlentities($res['responseMessage']) . "</p>";
  }

?>

```


## Gateway Wallet


### Direct Integration creating a new Gateway Wallet

Provide card details IF no `walletID` is provided, if `walletID` is provided, then no card details can be present. 

`walletID` value will be returned in the response.

```php
<?PHP

require('gateway.php');

use \P3\SDK\Gateway;

// Merchant signature key --> It will be provided by the Handpoint support team.
Gateway::$merchantSecret = 'm3rch4nts1gn4tur3k3y';

 // Handpoint Gateway URL
 Gateway::$directUrl = 'https://commerce-api.handpoint.com/direct/';

 // Setup PHP session as use it to store data between 3DS steps
 if (isset($_GET['sid'])) {
 session_id($_GET['sid']);
 }

 session_start(); 
 // Compose current page URL (removing any sid and acs parameters)
 $pageUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://'). $_SERVER['SERVER_NAME']. ($_SERVER['SERVER_PORT'] != '80' ? ':' . $_SERVER['SERVER_PORT'] : ''). preg_replace('/(sid=[^&]+&?)|(acs=1&?)/', '', $_SERVER['REQUEST_URI']);

 // Add back the correct sid parameter (used as session cookie may not be passed when the page is redirected from an IFRAME)
 $pageUrl .= (strpos($pageUrl, '?') === false ? '?' : '&') . 'sid=' . urlencode(session_id());
 
 // If ACS response into the IFRAME then redirect back to parent window
 if (!empty($_GET['acs'])) {
 echo silentPost($pageUrl, array('threeDSResponse' => $_POST), '_parent');
 exit();
 }

 if (!isset($_POST['threeDSResponse'])) {
 // Initial request

 // Gather browser info - can be done at any time prior to the checkout
 if (!isset($_POST['browserInfo'])) {
 echo Gateway::collectBrowserInfo();
 exit();
 }

 // Direct Request
 
 $req = array(
 'merchantID' => 155928,
 'action' => 'SALE',
 'type' => 1,
 'currencyCode' => 826,
 'countryCode' => 826,
 'amount' => 1999,
 //Provide card details IF no walletID is provided, if walletID is provided, then no card details can be present. 
 'cardNumber' => '5573471234567898',
 'cardExpiryMonth' => 12,
 'cardExpiryYear' => 24,
 //CVV needs to be provided even for wallet.
 'cardCVV' => '159',
 'customerName' => 'Test Customer',
 'customerEmail' => 'example@example.com',
 'customerAddress' => 'Merevale Avenue Leicester',
 'customerPostCode' => 'LE10 2BU',
 'orderRef' => 'Test purchase',
 //enables wallet system
 'walletEnabled' => 'Y',
	
 //stores card in a wallet automatically if a transaction went through, wallet id is returned in callback.
 'walletStore' => 'Y',
 
//Insert walletid below from previous transaction and remove card details (CVV needs to stay).
//Leave blank if no wallet exists yet. walletID value will be returned in the response.
 'walletID' => '',

 // The following fields are mandatory for 3DS v2
 'remoteAddress' => $_SERVER['REMOTE_ADDR'],
 'threeDSRedirectURL' => $pageUrl . '&acs=1',

 // The following field allows options to be passed for 3DS v2
 // and the values here are for demonstration purposes only
 'threeDSOptions' => array(
      'paymentAccountAge' => '20220601',
      'paymentAccountAgeIndicator' => '05',
   ),
 );

 // Add the browser info as it is mandatory for 3DS v2
 $req += $_POST['browserInfo'];

 } else {

   $req = array (
      // The following field are only required for tbe benefit of the SDK 
      'merchantID' => '155928',
      'action' => 'SALE',
      'threeDSRef' => $_SESSION['threeDSRef'],
      'threeDSResponse' => $_POST['threeDSResponse'],
    );
        
 } 

 try {
    $res = Gateway::directRequest($req);
 } catch (\Exception $e) {
 
// You should exit gracefully
 die('Sorry, the request could not be sent: ' . $e);
 }

 print $res['responseCode'];
// Check the response code
if ($res['responseCode'] === Gateway::RC_3DS_AUTHENTICATION_REQUIRED) { 
// Send request to the ACS server displaying response in an IFRAME

 // Render an IFRAME to show the ACS challenge (hidden for fingerprint method)
 $style = (isset($res['threeDSRequest']['threeDSMethodData']) ? 'display: none;' : '');
 echo "<iframe name=\"threeds_acs\" style=\"height:420px; width:420px; {$style}\"></iframe>\n";

 // Silently POST the 3DS request to the ACS in the IFRAME
 echo silentPost($res['threeDSURL'], $res['threeDSRequest'], 'threeds_acs');

 

 // Remember the threeDSRef as need it when the ACS responds
 $_SESSION['threeDSRef'] = $res['threeDSRef'];

} else if ($res['responseCode'] === Gateway::RC_SUCCESS) {

  

 echo "<p>Thank you for your payment.</p>";
 echo $res['walletID'].' '.'This is your walletID';
   } 
   else {
        echo "<p>Failed to take payment: " . htmlentities($res['responseMessage']) . "</p>";
  }

// Render HTML to silently POST data to URL in target brower window 
function silentPost($url = '?', array $post = null, $target = '_self') { 
 $url = htmlentities($url);
 $target = htmlentities($target);
 $fields = '';


 if ($post) {
 foreach ($post as $name => $value) {
 $fields .= Gateway::fieldToHtml($name, $value);
 }
 }

 $ret = "
 <form id=\"silentPost\" action=\"{$url}\" method=\"post\" target=\"{$target}\">
 {$fields}
 <noscript><input type=\"submit\" value=\"Continue\"></noscript
 </form>
 <script>
 window.setTimeout('document.forms.silentPost.submit()', 0);
 </script>
 ";

 return $ret;
}

?>
```

### Direct Integration using Gateway Wallet

Providing a `walletID`will allow you to use a previously used card. A `walletID` needs to be provided in the request.

The `cardCVV` of the stored card is **159**.

```php
<?PHP

require('gateway.php');

use \P3\SDK\Gateway;

// Merchant signature key --> It will be provided by the Handpoint support team.
Gateway::$merchantSecret = 'm3rch4nts1gn4tur3k3y';

 // Handpoint Gateway URL
 Gateway::$directUrl = 'https://commerce-api.handpoint.com/direct/';

 // Setup PHP session as use it to store data between 3DS steps
 if (isset($_GET['sid'])) {
 session_id($_GET['sid']);
 }

 session_start(); 
 // Compose current page URL (removing any sid and acs parameters)
 $pageUrl = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://'). $_SERVER['SERVER_NAME']. ($_SERVER['SERVER_PORT'] != '80' ? ':' . $_SERVER['SERVER_PORT'] : ''). preg_replace('/(sid=[^&]+&?)|(acs=1&?)/', '', $_SERVER['REQUEST_URI']);

 // Add back the correct sid parameter (used as session cookie may not be passed when the page is redirected from an IFRAME)
 $pageUrl .= (strpos($pageUrl, '?') === false ? '?' : '&') . 'sid=' . urlencode(session_id());
 
 // If ACS response into the IFRAME then redirect back to parent window
 if (!empty($_GET['acs'])) {
 echo silentPost($pageUrl, array('threeDSResponse' => $_POST), '_parent');
 exit();
 }

 if (!isset($_POST['threeDSResponse'])) {
 // Initial request

 // Gather browser info - can be done at any time prior to the checkout
 if (!isset($_POST['browserInfo'])) {
 echo Gateway::collectBrowserInfo();
 exit();
 }

 // Direct Request
 
 $req = array(
 'merchantID' => 155928,
 'action' => 'SALE',
 'type' => 1,
 'currencyCode' => 826,
 'countryCode' => 826,
 'amount' => 1999,
 //CVV needs to be provided even for wallet.
 'cardCVV' => '159',
 'customerName' => 'Test Customer',
 'customerEmail' => 'example@example.com',
 'customerAddress' => 'Merevale Avenue Leicester',
 'customerPostCode' => 'LE10 2BU',
 'orderRef' => 'Test purchase',
 //enables wallet system
 'walletEnabled' => 'Y',
	
 //Stores card in a wallet automatically if a transaction went through, wallet id is returned in callback.
 'walletStore' => 'Y',
 
 //Insert walletid below from previous transaction and remove card details (CVV needs to stay).
 'walletID' => '1379824',

 // The following fields are mandatory for 3DS v2
 'remoteAddress' => $_SERVER['REMOTE_ADDR'],
 'threeDSRedirectURL' => $pageUrl . '&acs=1',

 // The following field allows options to be passed for 3DS v2
 // and the values here are for demonstration purposes only
 'threeDSOptions' => array(
      'paymentAccountAge' => '20220601',
      'paymentAccountAgeIndicator' => '05',
   ),
 );

 // Add the browser info as it is mandatory for 3DS v2
 $req += $_POST['browserInfo'];

 } else {

   $req = array (
      // The following field are only required for tbe benefit of the SDK 
      'merchantID' => '155928',
      'action' => 'SALE',
      'threeDSRef' => $_SESSION['threeDSRef'],
      'threeDSResponse' => $_POST['threeDSResponse'],
    );
        
 } 

 try {
    $res = Gateway::directRequest($req);
 } catch (\Exception $e) {
 
// You should exit gracefully
 die('Sorry, the request could not be sent: ' . $e);
 }

 print $res['responseCode'];
// Check the response code
if ($res['responseCode'] === Gateway::RC_3DS_AUTHENTICATION_REQUIRED) { 
// Send request to the ACS server displaying response in an IFRAME

 // Render an IFRAME to show the ACS challenge (hidden for fingerprint method)
 $style = (isset($res['threeDSRequest']['threeDSMethodData']) ? 'display: none;' : '');
 echo "<iframe name=\"threeds_acs\" style=\"height:420px; width:420px; {$style}\"></iframe>\n";

 // Silently POST the 3DS request to the ACS in the IFRAME
 echo silentPost($res['threeDSURL'], $res['threeDSRequest'], 'threeds_acs');

 

 // Remember the threeDSRef as need it when the ACS responds
 $_SESSION['threeDSRef'] = $res['threeDSRef'];

} else if ($res['responseCode'] === Gateway::RC_SUCCESS) {

  

 echo "<p>Thank you for your payment.</p>";
 echo $res['walletID'].' '.'This is your walletID';
   } 
   else {
        echo "<p>Failed to take payment: " . htmlentities($res['responseMessage']) . "</p>";
  }

// Render HTML to silently POST data to URL in target brower window 
function silentPost($url = '?', array $post = null, $target = '_self') { 
 $url = htmlentities($url);
 $target = htmlentities($target);
 $fields = '';


 if ($post) {
 foreach ($post as $name => $value) {
 $fields .= Gateway::fieldToHtml($name, $value);
 }
 }

 $ret = "
 <form id=\"silentPost\" action=\"{$url}\" method=\"post\" target=\"{$target}\">
 {$fields}
 <noscript><input type=\"submit\" value=\"Continue\"></noscript
 </form>
 <script>
 window.setTimeout('document.forms.silentPost.submit()', 0);
 </script>
 ";

 return $ret;
}

?>
```