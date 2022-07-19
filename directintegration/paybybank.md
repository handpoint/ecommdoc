---
sidebar_position: 23
---

# Pay by Bank app (PBBA) Transactions

## Background 

Pay by Bank app (PBBA) is an additional payment method that is available to all Merchants using the Gateway that have a Pay by Bank app account and an OBN Global Acquiring account.

PBBA, formerly known as Zapp, is an innovative, secure, and fully digital payment option in the UK, built and operated by VocaLink, a Mastercard company. It allows your Customers to pay, in real time, using the banking app on their phone. It's designed to make online checkout easier, whilst using all the security of their bank. Payments work through secure digital tokens, meaning your Customers never reveal any of their financial details when they are shopping.

To use PBBA you will be supplied with a separate PBBA Merchant account that can be grouped with your main Merchant Account using the account mapping facility as documented in the [merchant account mapping](annexes#merchantAccountMapping) section. This allows transactions to be sent using your main Merchant Account and then routed automatically to the PBBA Merchant Account in the same mapping group.

All transactions created with this payment method will appear in the Merchant Management System (MMS) together with the payment method that was used to process the transaction.

PBBA transactions cannot be used for ad-hoc Credentials on File (COF) repeat transactions or for recurring billing.

For more information on how to accept PBBA transactions please contact customer support.

## Benefits 

- Increased conversion rate through a simple, quick payment process.
- Secure payment processing in real time.
- Lower transaction cost compared to card payments.
- Minimal fraud risk thanks to ‘Request to Pay’ technology.
- Quick and convenient processing of refunds and disputes.
- Integration on websites and in mobile apps.
- Transactions are controlled within the Merchant Management System (MMS) in the same manner as normal card transactions.

## Limitations

- You will need a PBBA account and OBN Acquiring account.
- Recurring transactions are not supported.
- Independent refunds are not supported.
- Transactions require a browser or mobile device in order to display the PBBA Checkout.
- Your Customer will need a mobile device in order to display their Banking app.
- Payment authorisation is not instantaneous and will require additional ‘QUERY’ requests.
- Only available in the UK.
- Transactions require a browser or mobile device in order to display the PBBA Checkout.
- Customers require a mobile device in order to display their Banking app.

## Implementation 

PBBA transactions are designed to be integrated with and invoked by the Merchant Button Integration Library code made available by Mastercard for embedding the PBBA payment button on your website or mobile application (The current PBBA Merchant Integration Libraries are available from Mastercard).

PBBA only supports the SALE, REFUND_SALE, CANCEL and CAPTURE actions. This section explains how to make payment requests. Management requests are performed as detailed in the [management operations](transactiontypes#managementOperations) section.

### Payment Request 

To request that a transaction be processed via PBBA, the request must contain a `paymentMethod` of ‘pbba’. In addition, you must send `checkoutOptions` to provide information about the Customer’s device. When the Gateway receives these two fields, assuming there are no other errors with the request, it will attempt to find a suitable PBBA Merchant Account in the current account mapping group (refer to the [merchant account mapping](annexes#merchantAccountMapping) section).

If the Gateway is unable to find a suitable account, then the transaction will be aborted, and it will respond with a `responseCode` of 66364 (INVALID PAYMENTMETHOD).
Otherwise, the Gateway will initiate the PBBA transaction and respond with a `responseCode` of 0 (SUCCESS) and included in the response will be a `checkoutDetails` field containing the Basket Reference Number (BRN) that should be displayed to the Customer.

Please note that the payment has not completed until the Customer enters the BRN into their mobile banking application and confirms the payment. The response will contain a `state` of received until the Gateway has received confirmation from the banking network that the payment has been confirmed by the Customer.

To determine when payment has completed you may periodically poll the Gateway using a QUERY request to check the `state` of the transaction. For more information on the QUERY request, please refer to the [management operations](transactiontypes#managementOperations) section.

#### Request Fields

| Name | mandatory |Description|
| ----------- | ----------- |----------- |
|paymentMethod| <span class="badge badge--primary">Yes</span>|Payment method to be used. Must be pbba.|
|checkoutOptions| No| Record containing options used to customise the PBBA Checkout. See the [checkout options](#checkoutOptions) section. Whilst the Gateway does not see this field as mandatory, PBBA mandates that certain options are provided.|

#### Response Fields

These fields will be returned in addition to the request fields above and the [basic request fields](transactiontypes.md/#transactionRequest).

| Name | mandatory |Description|
| ----------- | ----------- |----------- |
|checkoutDetails| <span class="badge badge--primary">Yes</span>|Record containing values made available by the PBBA Checkout. Refer to the [checkout details](#checkoutDetails) section.|

### Checkout Options {#checkoutOptions}

The following options must be sent in the `checkoutOptions` Direct Integration field to customise the Checkout. Unlike other payment methods these options are mandatory and must be sent. The options must be formatted using the record or serialised record formats detailed in the [format guide](overview#fieldFormats).

| Name | Description |
| ----------- | ----------- |
|device.type|Consumer device type. This field is mandatory and has no default value.<br></br><br></br> Possible values are:<br></br>  ATM – ATM device <br></br> MOBLPHN – Mobile phone device <br></br> PCLAPTP – PC or Laptop device <br></br> TABLET – tablet device <br></br> OTHERS – other device type|
|device.os|Consumer device operating system. This field is mandatory and has no default value.<br></br><br></br> Possible values are: <br></br>AND – Android <br></br>IOS – Apple iOS <br></br>WIN – Microsoft Windows <br></br>WINMOB – Microsoft Windows Mobile <br></br>OTHERS – other operating system|
|browser.userAgent|Content of HTTP User-Agent header received from the Consumer’s device. Maximum 127 characters.|
|browser.timeZone|Time zone offset in minutes between UTC and the Consumer’s device. The offset is positive if the local time zone is behind UTC and negative if it is ahead.|
|browser.screenResolution|Screen resolution of the Consumer’s device. Formatted as the height and width separated by a ‘x’. The height and width must be between 1 and 9999 pixels.|
|browser.acceptEncoding|Content of HTTP Accept-Encoding header received from the Consumer’s device. Maximum of 127 characters.|
|browser.acceptLanguage|Content of HTTP Accept-Encoding header received from the Consumer’s device. Maximum of 127 characters.|

The `category.name` format of the sub-field name indicates that option’s value is a record called `category` containing a sub-field called `name`.


### Checkout Details {#checkoutDetails}

The `checkoutDetails` field included in the response above will contain the following values which should be provided to the client-side PBBA Integration Library. The details will be returned using the record format detailed in the [format guide](overview#fieldFormats). 

| Name | mandatory |Description|
| ----------- | ----------- |----------- |
|transactionID| <span class="badge badge--primary">Yes</span>|Transaction identifier.|
|settlementID| <span class="badge badge--primary">Yes</span>|Settlement retrieval identifier.|
|pbbaCode| <span class="badge badge--primary">Yes</span>|Basket reference number (BRN).|
|secureToken| <span class="badge badge--primary">Yes</span>|Secure token for client-size use.|
|retrievalExpiryInterval| <span class="badge badge--primary">Yes</span>|Retrieval expiry time interval.|
|confirmationExpiryInterval| <span class="badge badge--primary">Yes</span>|Confirmation expiry time interval.|
|cookieSentStatus| <span class="badge badge--primary">Yes</span>|Cookie sent status.|
|payConnectID| No|Reserved for future use.|
|cookieExpiryDays| No|Reserved for future use.|
|riskScore| No|Reserved for future use.|
|bankName| No|Reserved for future use.|

### Refunds 

Refund requests require that a reason code be included in either the `orderRef` or `cancelReason` fields.

The codes are as follows; DUPLICATEORDER, GOODSRETURNED, ORDERCANCELLED, MERCHANTOUTOFSTOCK, GOODSNOTRECV, LATECONFIRMATION, DISPUTES.

The code must be in uppercase and must appear as a separate word anywhere in the field’s value.

For example, if refunding due to the purchased item being out of stock you could set the value to just “MERCHANTOUTOFSTOCK” or to a more complete description such as “Refund: Green polo
shirt, XXL (MERCHANTOUTOFSTOCK)”.

This also applies to refunds made by the Merchant Management System (MMS) where the reason code must be entered when prompted for the reason for the refund.

Only the refund code is sent to the PBBA system, any other text is stored by the Gateway for your benefit and viewable in the Merchant Management System (MMS).
