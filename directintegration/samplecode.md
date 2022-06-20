---
sidebar_position: 2

---

# Sample Code

The following example PHP code shows how to send a SALE transaction with support for 3-D
Secure using the [Gateway library](annexes.md#gateway-library-php):

```php

<?PHP

require('gateway.php');

use \P3\SDK\Gateway;

// Merchant signature key
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
 'merchantID' => 000111,
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
 'customerAddress' => 'Merevale Avenue Leicester LE10 2BU',
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
      'merchantID' => '000111',
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


