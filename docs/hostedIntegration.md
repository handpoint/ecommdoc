---
sidebar_position: 2
---

# Hosted Integration

The Hosted Integration method makes it easy to add secure payment processing to your e-commerce business, using our Hosted Payment Pages (HPP). You can use this method if you do not want to collect and store Cardholder data.
The Hosted Integration method works by redirecting the Customer to our Gateway’s Hosted Payment Page, which will collect the Customer’s payment details and process the payment before redirecting the Customer back to a page on your website, letting you know the payment outcome. This allows you the quickest path to integrating with the Gateway.


```html
<html>

<head>
    <!-- Load the jQuery library -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>

    <!-- Load the Hosted Payment Page library -->
    <script src="https://ecommerce.example.com/sdk/web/v1/js/hostedforms.min.js"></script>
    <style>
        input[type=submit] {
            background-color: #e97d29;
            border: none;
            color: white;
            padding: 1px 32px;
            text-decoration: none;
            margin: 4px 2px;
            cursor: pointer;
        }
    </style>
</head>
```
```html
<body>

    <p class="aligncenter">
        <img src="https://handpoint-receipt-images.imgix.net/handpoint_logo_black.jpg" alt="Logo">
    </p>
    <p>Welcome to the Handpoint eShop</p>
    <br></br>
    <p>PAX A920</p>
    <img style="height:80px"
        src="https://handpoint.imgix.net/Website%20refresh%20photos/product-images/SmartPOS_clean.png" alt="">

    <p> Price $100/unit</p>
   

    <!--
 Hosted Payment <form> as created by the Gateway Integration Library hostedRequest() method
 with addition of 'data-hostedforms-modal' attribute to signify a modal form is required.
 -->
    <form name="payment-form" method="post" action="https://ecommerce.example.com/hosted/modal/"
        data-hostedforms-modal>
        <input type="hidden" name="merchantID" value="providedbyHandpoint" />
        <input type="hidden" name="action" value="SALE" />
        <input type="hidden" name="type" value="1" />
        <input type="hidden" name="currencyCode" value="826" />
        <input type="hidden" name="countryCode" value="826" />
        <input type="hidden" name="amount" value="1000" />
        <input type="hidden" name="orderRef" value="Test purchase" />
        <input type="hidden" name="redirectURL" value="https://www.handpoint.com" />
        <input type="hidden" name="signature"
            value="CalculateTheSignatureValue" />
        <input type="submit" value="Pay Now">
    </form>

    <script>
        // Create a new Hosted Form object which will cause the above <form> to load into a modal
        // overlay over this page.
        var form = $(document.forms[0]).hostedForm();
    </script>
</body>

</html>
```
