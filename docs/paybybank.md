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

If a transaction is sent to the Hosted Integration using a `merchantID` that is part of a routing group containing a PBBA Merchant, then the Hosted Payment Page will display a Pay by Bank App payment button which, when clicked, will display a Basket Reference Number (BRN) which the Customer can enter into their mobile banking application to complete the payment. When payment has been completed the Hosted Payment Page will display a payment confirmation page in the usual manner.

Only SALE transactions are supported.

Additional information available about the PBBA transaction will be made available in the checkoutDetails response field.

### Request Fields

| Name | mandatory |Description|
| ----------- | ----------- |----------- |
|paymentMethod| No |Payment method to be used. Must be pbba.|
|checkoutOptions| No| Record containing options used to customise the PBBA Checkout. See the [checkout options](#checkoutOptions) section. Whilst the Gateway does not see this field as mandatory, PBBA mandates that certain options are provided.|

### Response Fields 

There are no additional response fields for PBBA. The Hosted Integration will return the [basic response fields](transactiontypes.md/#transactionResponse).

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