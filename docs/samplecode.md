---
sidebar_position: 7
---

# Sample Code


## Hosted Payment Page 

The following example code shows how to create a payment form to open the Hosted Payment Page in a lightbox style overlay on your website using the Hosted Payment Page and jQuery libraries:

```php
<html>

<head>
    <!-- Load the jQuery library -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>

    <!-- Load the Hosted Payment Page library -->
    <script src="https://commerce-api.handpoint.com/sdk/web/v1/js/hostedforms.min.js"></script>
    
     <!-- Style for the Pay Now button -->
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

<body>

    <!-- Sample content - Simulate an online store -->
    <p class="aligncenter">
        <img src="https://handpoint.com/wp-content/uploads/2022/05/Logo.svg" alt="Logo">
    </p>
    <p>Welcome to the Handpoint ecommerce Shop</p>
    <br/>
    <p>PAX A920</p>
    <img style="height:80px"
        src="https://handpoint.imgix.net/Website%20refresh%20photos/product-images/SmartPOS_clean.png" alt="">
    <p> Price 10.01GBP / unit</p>
 
    <!-- Hosted Payment <form> as created by the Gateway Integration Library hostedRequest() method
         with addition of 'data-hostedforms-modal' attribute to signify a modal form is required.-->
    <form name="payment-form" method="post" action="https://commerce-api.handpoint.com/hosted/modal/" data-hostedforms-modal>
        <input type="hidden" name="merchantID" value="000111" />   <!-- merchantID will be provided by the Handpoint Support team -->
        <input type="hidden" name="action" value="SALE" />    <!-- action could be SALE, VERIFY or PREAUTH -->
        <input type="hidden" name="type" value="1" />   <!-- 1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA) --> 
        <input type="hidden" name="currencyCode" value="826" /> <!-- ISO 3-letter currency code. 826-> GBP --> 
        <input type="hidden" name="countryCode" value="826" />  <!-- ISO 3-letter country code. 826-> United Kingdom --> 
        <input type="hidden" name="amount" value="1001" />  <!-- Either major currency units includes a single decimal point such as ’10.99’; or minor currency units contains no decimal points such as ‘1099’.  --> 
        <input type="hidden" name="orderRef" value="Test purchase" />  <!--Free format text field to store order details, reference numbers, etc. for the Merchant’s records.-->
        <input type="hidden" name="redirectURL" value="https://www.merchant.com/payment/" /> <!--Hosted form will redirect the Customer’s browser after the transaction has been completed.-->

        <!-- Hash generated from the combination of the serialised request and this signing secret phrase -->
        <input type="hidden" name="signature"  
            value="93a550987ce1e4a8164d65d4a7fb924b3366a7ba621959788234df1efdbd1e303acb43c38f01bcb4ea08994199e160fc4cafa2ff55e9b2c573aacb8db7162c12" /> 
            
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



