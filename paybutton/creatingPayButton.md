---
sidebar_position: 1
id: paybutton

---

# Creating a Pay Button

## Overview

The Pay by Link or Pay Button allows a Merchant to create a simple HTML link that can be integrated into a webpage or e-mail. When clicked, the user is taken to the hosted payment form with pre-populated product information such as the amount, product description and order reference.
We offer the Pay Button as a [QR Code](#qr-code), as a [styled](#styled) and [un-styled](#un-styled) button and a [simple link](#link-only).

Creating a [Custom Pay Button](customPayButton.md), it will allow you to have full control over what information is passed to our gateway and use the full list of hosted integration fields outlined in our Hosted Guide. Check our [Sample Code](customPayButton#sample-code-request)!

The advantage of using the Pay Button compared to our hosted integration is its simplicity. It has the features of the hosted form without needing server-side scripting knowledge. Just place the link under your products and you’re done. All the card holder must do is click a button, enter their payment details and they have paid.

The Pay Button has been integrated into the Virtual Terminal so it’s all in one place.
If you want more out of your Pay Button, we offer that too with our [advanced or custom integration](customPayButton.md). This requires more server-side scripting knowledge, but allows more control over what information your pay button contains.

## Using the Virtual terminal

This Virtual Terminal also allows us to generate payment buttons. The Virtual Terminal has been designed for Merchants to use with ease when taking mail
order or secure telephone payments (MOTO). The secure environment allows a user to process
credit and debit card payments, as well as refund transactions, all in real time.




### Transaction Details

Under ‘Transaction Details’, change the `Transaction Process` field  to **Generate a Pay Button**.

![Transaction Details Options](/img/TransactionDetails.png)



| Field      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| Transaction Process | <span class="badge badge--primary">Yes</span> | Select **Generate a Pay Button** option if you wish to generate a Pay Button. |
| Merchant Account | <span class="badge badge--primary">Yes</span> | Select the Merchant Account/ID you wish to process the transaction on – we strongly recommend the SALES on the Virtual Terminal are always done on a MOTO Merchant Account |
| Transaction Action | <span class="badge badge--primary">Yes</span> | Use the drop down menu to specify the type of transaction. `SALE`, `PREAUTH`, `VERIFY`.|
| Merchant's Country | <span class="badge badge--primary">Yes</span> | Use the drop down menu to specify the country in which the Merchant is based.|
| Currency  | <span class="badge badge--primary">Yes</span> | Use the drop down menu to specify the currency to be used for the transaction. |
| Amount | <span class="badge badge--primary">Yes</span> | Enter the amount of the transaction you wish to process. |
| Capture/Settle | <span class="badge badge--primary">Yes</span> |Use the drop down menu to specify when the transaction is going to be settled.|
| Payment Type | <span class="badge badge--primary">Yes</span> | Select if this is a one off payment or whether this is part of a Recurring/Instalment Agreement. The Instalment Payment is when the Cardholder is payment in instalments for a product/service and the end price is known. The Recurring Agreement is potentially a never ending repeat payment where the repeat charge is known but the end amount may not be|
| Unique Reference  | No | The Merchant can enter a unique reference to help them identify the sale. |
| Order Description  | No | The Merchant can enter an order description.|


### Pay Button Details

With the Pay Button mode selected, a new section called ‘Pay Button Details' appears in the Virtual Terminal.

![Pay Button Options](/img/PayButtonDetails.png)

| Field      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| Button Text | <span class="badge badge--primary">Yes</span> | The text to display on the Pay Button itself, e.g. “Click Here To Pay”. |
| Redirect URL on success | <span class="badge badge--primary">Yes</span> | The location to go to after the payment has taken place. This can be any URL you wish to direct the customer to after a payment or attempted payment has been made. NOTE: If a value for Redirect URL on Failure is supplied, the URL specified for Redirect URL will only be used when a payment has been successful. |
| Redirect URL on failure | No | The location to send the customer to after payment has failed. If no value is provided, the value in Redirect URL is provided|
| Custom Amount | No | Use the drop down menu to specify whether the amount is fixed or whether the consumer can decide what to pay, i.e. donation|
| Customer Address  | No | The merchant can enter the customer address. |



## Inserting the Link/QR Code

Once 'Create Button' has been clicked, the link will be formatted and displayed on the next page.
To insert the code into HTML content, click the Select Code button and then right click and copy the selected code. The code must be pasted into the code view of your HTML content, where you can view and edit the raw HTML and edit any inline CSS. The link will then be ready for use.
There are 4 options presented: Styled, Un-Styled, Link only and QR Code which can be selected using the tabs on the page. Previews of all the styling options can be seen in the Preview window.


### Styled

The styled option makes the link look like a pre-formatted button. This is useful for displaying on websites to fit of the style/content of a web-page. It isn't always suitable to send across e-mail clients as the client may not support formatted CSS.

![Styled](/img/Styled.png)


### Un-Styled

The Un-Styled option creates a standard link that can be styled later using CSS or used as is. This is useful if you want a base to work from to create a button of your choice using CSS.

![Un-Styled](/img/Un-styled.png)

### Link Only
The link only option provides the raw URL without embedding it in an HTML link. If you want a simple link to send to customers, this is the best option.

![LinkOnly](/img/LinkOnly.png)

### QR Code

The QR Code option adds the ability for a QR Code to be downloaded. It is automatically generated and is displayed on the page for testing/preview purposes. Click the download button to save it in a file which can then be uploaded or placed wherever you wish. Alternatively, you can right click the preview image and save it from your browser.


A QR Code scanner must be used to 'read' the code, which will then send the link of the payment form to the device.

![QRCode](/img/QRdemo.png)