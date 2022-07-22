---
sidebar_position: 2

---

# Sample Code

## Request Checking Only

Sometimes, you may wish to submit a request to the Gateway in order for it to be ‘validated only’ and not processed by the simulator or sent to the Acquirer. In these cases, the following flag can be used that will stop the processing after the integrity verification has been performed:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| checkOnly | No | Check the request for syntax and field value errors only. Do not attempt to submit the transaction for honouring by the Merchant’s financial institution.|

If the request is OK, then a responseCode is returned as 0 (Success); otherwise, the code that would have prevented the request from completing is returned.

Note: in these cases, the request is not stored by the Gateway and is not available within the Merchant Management System (MMS).


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