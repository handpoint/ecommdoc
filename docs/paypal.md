---
sidebar_position: 20
---

# PayPal Transactions

## Background

PayPal is an additional payment method that is available to all Merchants using the Gateway who have a PayPal account.

To use PayPal, you will be supplied with a separate PayPal Merchant Account that can be grouped with your main Merchant Account using the account mapping facility as documented in the [merchant account mapping](annexes#merchantAccountMapping) section. This allows transactions to be sent using your main Merchant Account and then routed automatically to the PayPal Merchant Account in the same mapping group.

It allows you to offer payment via PayPal in addition to normal card payments.

PayPal transactions will appear in the Merchant Management System (MMS) alongside any card payments and can be captured, cancelled and refunded in the same way as card payments.

PayPal transactions can also be used for recurring billing but require you to indicate in the initial transaction that it will be the basis for recurring billing and that a billing agreement will be entered between your Customer and PayPal when they agree to the payment.

PayPal transactions cannot be used for ad-hoc Credentials on File (COF) repeat transactions unless a billing agreement has been set up.

For more information on how to accept PayPal transactions, please contact customer support.

## Benefits

- Provides your customers with the flexibility of paying by using their PayPal account when this is more suitable to them than using a traditional credit or debit card.
- The in-context PayPal Express Checkout helps improve conversion rates with an easier way to pay without customers leaving your website.
- There are no extra costs for adding a PayPal Merchant Account. However, you will still be liable for the PayPal transaction fees.
- The full PayPal transaction information is available and returned as part of the transaction.
- Transactions are controlled within the Merchant Management System (MMS) in the same manner as normal card transactions.

## Limitations

- You will need a PayPal account.
- Recurring transactions are not supported unless as part of a prearranged billing agreement.
- Independent refunds that are not tied to a previous sale transaction are not supported without prior agreement.
- Transactions require a browser in order to display the PayPal Checkout.
- The PayPal Checkout cannot be opened from within a browser IFRAME and so care must be taken to ensure that any PayPal Checkout button is not placed within such an IFRAME.

## Implementation 

If a transaction is sent to the Hosted Integration using a `merchantID` that is part of a routing group containing a PayPal Merchant, then the Hosted Payment Page will display a PayPal payment button that, when clicked, will open the PayPal Checkout and allow the Customer to pay using their PayPal account.

To customise the PayPal Checkout experience, you may send various options in the `payPalCheckoutOptions` field in your initial request.

Additional information available from the PayPal Checkout will be made available in the `checkoutDetails` response field.

Note: Custom Hosted Payment Pages might not support the displaying of the PayPal Checkout button. If you have a custom page that doesn’t support this, then you would need to contact support to have your Hosted Payment Page upgraded.

#### Request Fields 

These fields should be sent in addition to the [basic request fields](transactiontypes.md/#transactionRequest).

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| paymentMethod | No | Must contain the value ‘paypal’ in lower case letters only. |
| checkoutRedirectURL | No | URL on Merchant’s server to return to when the PayPal Checkout is closed.|
| payPalCheckoutOptions | No | Record containing options used to customise the PayPal Checkout. See the [checkout options](#checkoutOptions) section.|

### Checkout Options {#checkoutOptions}

The following options may be set in the `payPalCheckoutOptions` field to customise the PayPal Checkout. The options must be formatted using the record or serialised record formats detailed in the [format guide](overview#fieldFormats).

| Name      | Description |
| ----------- | ----------- |
| inContext |Use the in-context PayPal Checkout rather than the full screen Checkout when possible.<br></br><br></br> Possible values are:<br></br> 0 – use the full screen Checkout.<br></br> 1 – use the in-context Checkout if possible.|
| userAction |Determines whether buyers complete their purchases on PayPal or on your website.<br></br><br></br> Possible values are:<br></br>  commit – sets the submit button text to ‘Pay Now’ on the PayPal Checkout. This text lets buyers know that they complete their purchases if they click the button.<br></br>  continue– sets the submit button text to ‘Continue’ on the PayPal Checkout. This text lets buyers know that they will return to the Merchant’s cart to complete their purchases if they click the button.|
| maxAmount |The expected maximum total amount of the order, including shipping and taxes. PayPal refer to this field as MAXAMT.|
| reqBillingAddress |Determines whether the buyer’s billing address on file with PayPal is returned. This feature must be enabled by PayPal.|
| reqConfirmShipping |Determines whether the buyer’s shipping address on file with PayPal must be a confirmed address.<br></br><br></br> Possible values are:<br></br> 0 – does not need to be confirmed<br></br> 1 – must be confirmed|
| noShipping |Determines whether PayPal displays shipping address.<br></br> Possible values are:<br></br> 0 – display the shipping address <br></br>1 – do not display shipping address and remove shipping information <br></br>2 – If no `deliveryXXXX` fields passed, PayPal obtains them from the buyer's account profile.|
| addrOverride |Determines whether the PayPal Checkout displays the shipping address sent using the `deliveryXXXX` fields and not the shipping address on file with PayPal for this buyer. Displaying the PayPal street address on file does not allow the buyer to edit that address.<br></br><br></br> Possible values are:<br></br> 0 – PayPal should not display the address.<br></br> 1 – PayPal should display the address.|
| localeCode |Locale of the pages displayed by PayPal during Express Checkout. It is either a two-letter country code or five-character locale code supported by PayPal.|
|allowNote|Enables the buyer to enter a note to the merchant on the PayPal page during Checkout. The note is returned in the `checkoutDetails` response field.|
|pageStyle|Name of the Custom Payment Page Style used for the PayPal Checkout. It is the same name as the Page Style Name used when adding styles in the PayPal Account.|
|payflowColor|The HTML hex colour code for the PayPal Checkout’s background colour. By default, the colour is white (FFFFFF).|
|cardBorderColor|The HTML hex colour code for the PayPal Checkout’s principal identifying colour. The colour will be blended to white in a gradient fill that borders the cart review area.|
|hdrImg|URL for the image you want to appear at the top left of the payment page. The image has a maximum size of 750 pixels wide by 90 pixels high. PayPal requires that you provide an image that is stored on a secure (https) server. If you do not specify an image, the business name displays.|
|logoImg|A URL to your logo image. Use a valid graphics format, such as .gif, .jpg, or .png. Limit the image to 190 pixels wide by 60 pixels high. PayPal crops images that are larger. PayPal places your logo image at the top of the cart review area.|
|landingPage|Type of PayPal Checkout to display.<br></br><br></br> Possible values are: <br></br>Billing – Non-PayPal account <br></br>Login – PayPal account login|
|channelType|Type of channel.<br></br><br></br> Possible values are: <br></br> Merchant – Non-auction seller<br></br>  eBayItem – eBay auction|
|solutionType|Type of Checkout flow.<br></br><br></br> Possible values are: <br></br>Sole – Buyer does not need to create a PayPal account to check out. This is referred to as PayPal Account Optional. <br></br>Mark – Buyer must have a PayPal account to check out.|
|totalType|Type declaration for the label to be displayed in MiniCart for UX.<br></br><br></br> Possible values are: <br></br>Total <br></br>EstimatedTotal
|brandName|A label that overrides the business name in the PayPal account on the PayPal Checkout.|
|customerServiceNumber| Merchant Customer Service number displayed on the PayPal Checkout.|
|buyerEmailOptInEnable|Enables the buyer to provide an email address on the PayPal pages to be notified of promotions or special events.<br></br><br></br> Possible values are:<br></br>  0 – Do not enable buyer to provide email.<br></br>  1 – Enable the buyer to provide email.|
|noteToBuyer|A note from the merchant to the buyer that will be displayed in the PayPal Checkout.|
|paymentAction|Defines how to obtain payment. This can be used to override any `captureDelay` setting that can also be used to indicate a Sale or Authorisation only.<br></br><br></br> Possible values are:<br></br> Sale – sale with immediate capture.<br></br> Authorization – authorisation subject to later capture (note spelling).<br></br> Order – order subject to later authorisation and capture.|
|allowedPaymentMethod|The payment method type. Specify the value InstantPaymentOnly|
|insuranceOptionOffered|Indicates whether insurance is available as an option that the buyer can choose on the PayPal Review page.<br></br><br></br> Possible values are:<br></br> true – The Insurance option displays 'Yes' and the insuranceAmount. If true, the total shipping insurance for this order must be a positive number.<br></br> false – The Insurance option displays 'No'.|
|multiShipping|Indicates whether this payment is associated with multiple shipping addresses.<br></br><br></br> Possible values are:<br></br> 0 – Single/No shipping address.<br></br> 1 – Multiple shipping addresses.|
|noteText|The category of a payment.<br></br><br></br> Possible values are:<br></br> 1 – International shipping<br></br> 2 – Local delivery<br></br> 3 – BOPIS, Buy online pick-up in store <br></br>4 – PUDO, Pick-up drop-off|
|locationType|Type of merchant location. Required if the items purchased will not be shipped, such as, BOPIS (Buy Online Pick-up In Store) or PUDO (Pick-Up Drop-Off) transactions.<br></br> <br></br>  Possible values are:<br></br>  1 – Consumer.<br></br>  2 – Store, for BOPIS transactions.<br></br>  3 – PickupDropoff, for PUDO transactions.|
|locationID|Location ID specified by the merchant for BOPIS (Buy Online Pick-up In Store) or PUDO (Pick-Up Drop-Off) transactions.|
|sellerPayPalAccountID|Unique identifier for the Merchant. For parallel payments, this field is required and must contain the Payer Id or the email address of the Merchant.|
|invNum|Merchant’s invoice or tracking number.|
|custom|Custom field for your own use. buyerID|
|buyerID|The unique identifier provided by eBay for this buyer. The value may or may not be the same as the username. In the case of eBay, it is different.|
|buyerUsername|The username of the user at the marketplaces site.|
|buyerRegistrationDate|Date when the user registered with the marketplace. In UTC/GMT format, for example, 2013-08-24T05:38:48Z.|
|allowPushFunding|Indicates whether the Merchant can accept push funding.<br></br><br></br> Possible values are:<br></br> 0 – Merchant cannot accept push funding.<br></br> 1 – Merchant can accept push funding.|
|userSelectedFundingSource|This element could be used to specify the preferred funding option for a guest user. However, the `landingPage` Checkout option must also be set to Billing, otherwise, it is ignored.<br></br><br></br> Possible values are:<br></br> ChinaUnionPay.<br></br> CreditCard.<br></br> ELV.<br></br> QIWI.|
|billingType|Type of billing agreement for reference transactions. You must have permission from PayPal to use this field.<br></br><br></br>Possible values are:<br></br> MerchantInitiatedBilling – PayPal creates a billing agreement for each transaction associated with buyer.<br></br> MerchantInitiatedBillingSingleAgreement – PayPal creates a single billing agreement for all transactions associated with buyer. Use this value unless you need per-transaction billing agreements.|
|billingAgreementDescription|Description of goods or services associated with the billing agreement. This field is required for each recurring payment billing agreement. PayPal recommends that the description contain a brief summary of the billing agreement terms and conditions. For example, buyer is billed at "9.99 per month for 2 years".|
|paymentType|Type of PayPal payment you require for the billing agreement.<br></br><br></br>Possible values are:<br></br>  Any – The merchant accepts any payment method for the billing agreement, even if it could take a few working days for the movement of funds to the merchant account. This includes echeck, in addition to credit or debit cards and PayPal balance. <br></br>InstantOnly – The payment options accepted by the merchant are credit cards, debit cards or PayPal balance only because the merchant expects immediate payment.|
|taxIDType|Buyer's tax ID type. This field is required for Brazil and used for Brazil only.<br></br><br></br> For Brazil use only: The tax ID type is BR_CPF for individuals and BR_CNPJ for businesses.|
|taxID|Buyer's tax ID. This field is required for Brazil and used for Brazil only.<br></br><br></br>For Brazil use only: The tax ID is 11 single-byte characters for individuals and 14 single-byte characters for businesses|
|returnFMFDetails|Flag to indicate whether you want the results returned by Fraud Management Filters when doing a recurring/reference transaction.<br></br><br></br> Possible values are:<br></br> 0 – Do not receive FMF details (default).<br></br> 1 – Receive FMF details.|
|riskSessionCorrelationID|The ID of the risk session for correlation purposes when doing a recurring/reference transaction.|
|merchantSessionID|The buyer session identification token when doing a recurring/reference transaction.|
|buttonSource|PayPal Partner’s BN Code (if required). The BN code is the unique button source code provided by PayPal to its partners and added by its partners to the PayPal buttons used by merchants to offer the PayPal Services that are enabled through Partner Product. The button source code provides a means of identifying and tracking referred merchants' payments.|

For further information on the options, refer to the PayPal Express Checkout documentation: https://developer.paypal.com/docs/classic/api/merchant/SetExpressCheckout_API_Operation_NVP/.

### Purchase Details

The following request fields may be sent to provide information on the purchased items and to populate the cart on the PayPal Checkout.


| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| shippingAmount | No | Shipping costs.|
|shippingDiscountAmount | No |Discount applied to shipping costs. |
| handlingAmount| No | Handling costs.|
|insuranceAmount| No | Insurance costs.|
| itemXXDescription| No | Description of XXth item purchased.|
| itemXXQuantity| No | Quantity of XXth item purchased.|
| itemXXAmount| No | Gross amount for XXth item purchased.|
|itemXXTaxAmount | No |Tax amount for XXth item purchased. |
| itemXXProductCode| No | Product code for XXth item purchased.|
|itemXXProductURL| No | Shopping cart URL for XXth item purchased.|
| itemXXSize| No |Size of XXth item purchased in the format ‘LengthxWidthxHeight Unit’. |
|itemXXWeight| No | Weight of XXth item purchased in the format ‘Weight Unit’.|
|items | No | Nested array of line items.|

Note: The shopping cart items must total to the amount specified in the transaction. If they do not, cart items will not be sent to the PayPal Checkout.

### Checkout Details

The following details may be provided in the `checkoutDetails` field included in the response. The details will be returned using the record format detailed in the [format guide](overview#fieldFormats). 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
|correlationID | No | Correlation ID, which uniquely identifies the transaction to PayPal.|
| checkoutStatus| No |Status of the Checkout session. If payment is completed, the transaction identification number of the resulting transaction is returned.<br></br><br></br> Possible values are:<br></br> PaymentActionNotInitiated <br></br>PaymentActionFailed <br></br>PaymentActionInProgress<br></br> PaymentActionCompleted |
|invNum | No |Merchant’s invoice or tracking number, as set sent in `checkoutDetails.invNum` or assigned by the Gateway. |
| custom| No | Merchant’s invoice or tracking number, as set sent in `checkoutDetails.custom` or assigned by the Gateway.|
|payPalAdjustment | No |A discount or gift certificate offered by PayPal to the buyer. This amount is represented by a negative amount. If the buyer has a negative PayPal account balance, PayPal adds the negative balance to the transaction amount, which is represented as a positive value. |
| buyerMarketingEmail| No |Buyer's marketing email address. Only available if email option was enabled in the initial request using `checkoutOptions.buyerEmailOptInEnable` option.|
|note | No | Buyer’s note to the Merchant. Only available if the leaving of notes was enabled in the initial request using `checkoutOptions.allowNote` option.|
|cartChangeTolerance| No |Indicates whether a cart's contents can be modified. If this parameter is not returned, then assume the cart can be modified. This will return NONE if financing was used in Germany.<br></br><br></br> Possible values are:<br></br> NONE – The cart cannot be changed.<br></br> FLEXIBLE – The cart can be changed. |
|payerID | No | Buyer’s PayPal Customer Account ID.|
|payerStatus| No |Buyer’s PayPal status.<br></br><br></br> Possible values are: <br></br>verified<br></br> unverified |
|billingName| No |Buyer’s name. Also returned in `customerName`. Permission is needed from PayPal to support this field.|
|firstName | No | Buyer’s first name. Also returned in `customerName`. These fields are used when no permission to use billingName.|
| middleName| No |Buyer’s middle name. Also returned in `customerName`.|
|lastName | No | Buyer’s last name. Also returned in `customerName`.|
| suffix| No |Buyer’s name suffix. Also returned in `customerName`. |
|business| No |Buyer's business name. Also returned in `customerCompany`. |
|street| No | Buyer’s street first line. Also returned in `customerAddress`.|
|street2| No |Buyer’s street second line. Also returned in `customerAddress`. |
|city| No |Buyer’s city Also returned in `customerTown`.|
|state| No |Buyer’s state. Also returned in `customerCounty`. |
| zip| No |Buyer’s postal code. Also returned in `customerPostcode`. |
|countryCode| No |Buyer's country code. (ISO 2 char. code) Also returned in `customerCountryCode`. |
|countryName| No |Buyer's country name. |
|phoneNum| No | Buyer's contact phone number. Also returned in `customerPhone`.|
|email| No | Buyer’s email address. Also returned in `customerEmail`.|
|shipToName | No |Name of person/entity to ship to. Also returned in `deliveryName`. |
|shipToStreet| No |Ship to street first line. Also returned in `deliveryAddress`. |
|shipToStreet2| No |Ship to street second line. Also returned in `deliveryAddress`. |
|shipToCity| No | Ship to city. Also returned in `deliveryTown`.|
| shipToState| No |Ship to state. Also returned in `deliveryCounty`. |
|shipToZip| No | Ship to postal code. Also returned in `deliveryPostcode`.|
|shipToCountryCode| No |Ship to country code. (ISO 2 char. code) Also returned in `deliveryCountryCode`. |
|shipToCountryName| No |Ship to country name. |
|shipToPhoneNum | No |Ship to phone number. Also returned in `deliveryPhone`. |
|shipToAddressStatus| No |Status of shipping address on file with PayPal.<br></br><br></br> Possible values are:<br></br> none <br></br>Confirmed<br></br> Unconfirmed |
|addressNormalizationStatus| No | The PayPal address normalisation status for Brazilian addresses.<br></br><br></br> Possible values are:<br></br> None<br></br> Normalized<br></br> Unnormalized<br></br> UserPreferred <br></br><br></br>This field is passed directly to PayPal and therefore the field name and value must be spelt ‘ize’ and not ‘ise’.|
|amount| No |Total amount for this order. |
|itemAmount| No | Total item amount for this order.|
|taxAmount| No |Tax amount for this order. |
|exchangeRate| No |Exchange rate for this order. |
|shippingAmount| No |Shipping amount for this order. |
|handlingAmount| No | Handling amount for this order.|
|insuranceAmount| No | Insurance amount for this order.|
|shipDiscountAmount| No | Shipping discount amount for this order.|
|desc| No |Description of items the buyer is purchasing. |
|currencyCode| No |ISO 3-letter currency code. |
|isFinancing| No |Indicates whether the Customer ultimately was approved for and chose to make the payment using the approved instalment credit.<br></br><br></br> Possible values are:<br></br> FALSE – financing not in use<br></br> TRUE – financing approved and used |
|financingFeeAmount| No |The transaction financing fee associated with the payment. This will be set to the instalment fee amount that is the same as the estimated cost of credit or the interest/fees amount the user will have to pay during the lifetime of the loan. This field will only be included in instalment credit orders. In the case of “same as cash” or “no interest” offers, this will be set to 0. |
|financingTerm| No |The length of the financing term, in months. Example values are 6, 12, 18 and 24 months. |
|financingMonthlyPayment| No |This is the estimated amount per month that the Customer will need to pay including fees and interest. |
|financingTotalCost| No |This is the estimated total payment amount including interest and fees that the user will pay during the lifetime of the loan.|
|financingDiscountAmount| No | Discount amount for the buyer if paid in one instalment.|
|regularTakeFeeAmount| No | Fee of the regular take rate on the transaction amount. It could be equal to `financingDiscountAmount` in the case of non-instalment transactions.|
|noteText| No |Note to Merchant. |
|transactionID| No |PayPal transaction ID. |
|allowedPaymentMethod| No |The payment method type as specified in the initial request. |
|paymentRequestID| No |A unique identifier of the specific payment request. |
|bucketCategoryType| No |The category of a payment as specified in the initial request. |
|instrumentCategory| No |Identifies the category of the promotional payment instrument.<br></br><br></br> Possible values are:<br></br> 1 – PayPal Credit® (formerly Bill Me Later®).<br></br> 2 – A Private Label Credit Card (PLCC) or co-branded payment card. |
|instrumentID| No |An instrument ID (issued by the external party) corresponding to the funding source used in the payment. |
|shippingCalculationMode| No |Describes how the options that were presented to the buyer were determined.<br></br><br></br> Possible values are:<br></br> API – Callback <br></br>API – Flatrate |
|insuranceOptionSelected| No | The option that the buyer chose for insurance.<br></br><br></br> Possible values are:<br></br> Yes – opted for insurance.<br></br> No – did not opt for insurance.|
|shippingOptionIsDefault| No |Indicates whether the buyer chose the default shipping option.<br></br><br></br> Possible values are:<br></br> true – chose the default shipping option.<br></br> false – did not choose the default shipping option. |
|shippingOptionAmount| No | The shipping amount that the buyer chose.|
|shippingOptionName| No |The name of the shipping option, such as Air or Ground. |
|scheduledShippingDate| No |The scheduled shipping date is returned only if scheduled shipping options are passed in the request. |
|scheduledShippingPeriod| No |The scheduled shipping period is returned only if scheduled shipping options are passed in the request. |
|sellerPayPalAcountID| No | Unique identifier for the merchant. For parallel payments, this field contains either the Payer Id or the email address of the merchant.|
|taxIDType| No |Buyer's tax ID type. This field is required for Brazil and used for Brazil only. For Brazil use only: The tax ID type is BR_CPF for individuals and BR_CNPJ for businesses.|
|taxID| No |Buyer's tax ID. This field is required for Brazil and used for Brazil only. For Brazil use only: The tax ID is 11 single-byte characters for individuals and 14 single-byte characters for businesses. |
|billingAgreementID| No |Identification number of the billing agreement. When the buyer approves the billing agreement, it becomes valid and remains valid until it is cancelled by the buyer. |
|billingAgreementAcceptedStatus| No | Indicates whether the buyer accepted the billing agreement for a recurring payment. Currently, this field is always returned in the response for agreement based products, such as subscriptions; reference transactions; recurring payments; and regular single payment transactions.<br></br><br></br> 0 – Not accepted.<br></br> 1 – Accepted.|
|paymentStatus| No |Status of the payment.<br></br><br></br> Possible values are:<br></br> None – No status. <br></br>Canceled-Reversal – A reversal has been cancelled: for example, when you win a dispute and the funds for the reversal have been returned to you.<br></br> Completed – The payment has been completed and the funds have been added successfully to your account balance.<br></br> Denied – You denied the payment. This happens only if the payment was previously pending because of possible reasons described for the pendingReason element.<br></br> Expired – The authorisation period for this payment has been reached.<br></br> Failed – The payment has failed. This happens only if the payment was made from your buyer's bank account. <br></br>In-Progress – The transaction has not terminated: for example, an authorisation may be awaiting completion.<br></br> Partially-Refunded – The payment has been partially refunded. <br></br>Pending – The payment is pending. See the pendingReason field for more information. <br></br>Refunded – You refunded the payment. <br></br>Reversed – A payment was reversed due to a chargeback or other type of reversal. The funds have been removed from your account balance and returned to the buyer. The reason for the reversal is specified in the reasonCode element. <br></br>Processed – A payment has been accepted. <br></br>Voided – An authorisation for this transaction has been voided. |
|refundStatus| No |Status of the refund.<br></br><br></br> Possible value are:<br></br> none – returned if the refund fails <br></br>instant – refund was instant <br></br>delayed – refund was delayed |
|pendingReason| No | The reason the payment is pending.<br></br><br></br> Possible values are:<br></br> none – No pending reason.<br></br> address – The payment is pending because your buyer did not include a confirmed shipping address and your Payment Receiving Preferences is set such that you want to accept or deny each of these payments manually. To change your preference, go to the Preferences section of your Profile. <br></br>authorization – The payment is pending because it has been authorised but not settled. You must capture the funds first. <br></br>echeck – The payment is pending because it was made by an eCheck that has not yet cleared.<br></br> intl – The payment is pending because you hold a non-U.S. account and do not have a withdrawal mechanism. You must manually accept or deny this payment from your Account Overview.<br></br> multi-currency – You do not have a balance in the currency sent, and you do not have your Payment Receiving Preferences set to automatically convert and accept this payment. You must manually accept or deny this payment.<br></br> order – The payment is pending because it is part of an order that has been authorised but not settled. <br></br>payment-review – The payment is pending while it is being reviewed by PayPal for risk.<br></br> regulatory-review – The payment is pending while we make sure it meets regulatory requirements. You will be contacted again in from 24 to 72 hours with the outcome of the review. <br></br>unilateral – The payment is pending because it was made to an email address that is not yet registered or confirmed.<br></br> verify – The payment is pending because you are not yet verified. You must verify your account before you can accept this payment. <br></br>other – The payment is pending for a reason other than those listed above. For more information, contact PayPal Customer Service. <br></br><br></br>`pendingReason` is returned in the response only if paymentStatus is Pending.|
|reasonCode| No |The reason for a reversal if the transaction type is reversal.<br></br><br></br> Possible values are:<br></br> none – No reason code. <br></br>chargeback – A reversal has occurred on this transaction due to a chargeback by your buyer. <br></br>guarantee – A reversal has occurred on this transaction due to your buyer triggering a money-back guarantee. <br></br>buyer-complaint – A reversal has occurred on this transaction due to a complaint about the transaction from your buyer.<br></br> refund – A reversal has occurred on this transaction because you have given the buyer a refund. <br></br>other – A reversal has occurred on this transaction due to a reason not listed above. |
|protectionEligibilityType| No |The kind of seller protection in force for the transaction.<br></br><br></br> Possible values are:<br></br> ItemNotReceivedEligible – Merchant is protected by PayPal's Seller Protection Policy for Item Not Received.<br></br> UnauthorizedPaymentEligible7 – Merchant is protected by PayPal's Seller Protection Policy for Unauthorised Payments. <br></br>Ineligible – Merchant is not protected under the Seller Protection Policy. (Multiple values are separated by commas) |
|feeAmount| No |PayPal fee amount charged for the transaction. |
|settleAmount| No |Amount deposited in your PayPal account after a currency conversion. |
|storeID| No | Store identifier as entered in the transaction.|
|terminalID| No | Terminal identifier as entered in the transaction.|

## Transaction Lifecycle

PayPal transactions will use the normal Authorise, Capture life cycle as documented in the section [Authorise, Capture and Settlement](annexes#authoriseCaptureSettlement) with the following differences. In addition, the PayPal `paymentAction` option can be included in the `checkoutOptions` field to alter the normal payment lifecycle further, to allow an Order, Authorise, Capture model or a straight Sale model to be specified.

### Order

If a `paymentAction` with a value of ‘Order’ is sent, then PayPal will store the transaction but delay authorising it until instructed. To instruct PayPal to authorise the transaction, a further management request can be sent to the Gateway with an `action` of ‘AUTHORISE’ and the `xref` of the transaction to authorise. Alternatively, the AUTHORISE command can be selected in the Merchant Management System (MMS). The transaction will be left in the ‘received’ state.

**Processing management requests (AUTHORISE) is not possible with the Hosted payment page integration, it requires a separate Direct Integration.**  

### Authorise

If no `paymentAction` is specified or a `paymentAction` with a value of ‘Authorize’ is sent, then PayPal will authorise the transaction on receipt as per a standard card transaction and you can capture it later if you used the `captureDelay` field. Note that the value uses the PayPal spelling ‘Authorize’, and not the British spelling ‘Authorise’.

For the first three days (by default) of the authorisation, funds are reserved. This is known as the honour period. After the honour period, captures can still be attempted, but may be returned with insufficient funds.

Authorisations have a fixed expiry period of 29 days.

### Sale

If a `paymentAction` with a value of ‘Sale’ is sent, then PayPal will immediately capture the transaction after authorisation. The transaction will be regarded as having been settled and you will not be able to capture it manually and it will not be sent for settlement that evening. The transaction will be left in either the accepted or rejected terminal states depending on whether PayPal accepted or rejected the transaction.

### Capture

Transactions that have been authorised by PayPal and not immediately settled due to a paymentAction of ‘Sale’ will be able to be captured as normal.

Captures are sent to PayPal immediately and the PayPal response and the transaction will be left in either the accepted or rejected terminal state depending on whether PayPal accepted or rejected the capture request.

There is no need to wait for the nightly settlement batch to run as with normal card transactions. This means that it is not possible to change the amount to be captured or cancel the transaction one a capture has been requested.

Note: PayPal allows multiple captures where they sum the individual capture amounts – ie in a different manner from the Gateway’s, where only a single capture operation can be processed.

**Processing management requests (CAPTURE) is not possible with the Hosted payment page integration, it requires a separate Direct Integration.**  

### Refund

PayPal transactions can be refunded in the same way as normal card transactions (requires a separate Direct Integration). However, in the same way as capture requests, these will be sent to PayPal immediately and not batched up to be sent as part of the nightly settlement process. This means that the transaction will be left in either the accepted or rejected terminal state, depending on whether PayPal accepted or rejected the refund request.

Refunds can be made for full or partial amounts, with multiple refunds allowed up to the original authorised amount.

By default, PayPal allows a Merchant up to 60 days from the original authorised transaction date to perform refunds.

### Cancel

You should cancel any transactions that you do not wish to capture in order to prevent ‘pending’ transactions on the Customer’s PayPal account.

Authorisations should be cancelled when an initial authorisation was created to confirm the validity of funds during checkout, but the goods will not ship for a significant amount of time (>29 days). Cancelling the transaction will mean that you will have to contact the Customer for an alternative payment method.

All transactions must be completed by being captured or cancelled.

**Processing management requests (CANCEL) is not possible with the Hosted payment page integration, it requires a separate Direct Integration.**  

### Pending Payments 

PayPal may put a transaction into a pending state when flagged for additional fraud review. This state is known to PayPal as payment review or IPR.

IPR transactions will be automatically cancelled by the Gateway and treated as referred transactions with a `responseCode` of 2 and a `responseMessage` indicating the reason that the transaction was put into a pending state. Unlike card referred transactions, an authorisation code cannot be obtained from PayPal verbally and then the transaction resent.

## Reference Transactions

PayPal does not allow ad hoc Credentials on File (COF) type repeat or recurring transactions using the xref of a reference transaction unless that transaction has specifically started a PayPal Billing Agreement.

If you want to be able to make future repeat or recurring transactions, then the initial transaction must include the `billingType` and `billingAgreementDescription` options in the `checkoutOptions` so as to identify this transaction as the start of a recurring billing sequence. **Processing recurring payments is not possible with the Hosted payment page integration, it requires a separate Direct Integration.**  

This will cause the Gateway to request PayPal to set up a Billing Agreement between you and the Customer. In this case, the PayPal Billing Agreement ID will be returned as part of the `checkoutDetails` and displayed on the Merchant Management System (MMS) as part of the payment details, so that you can easily see which PayPal transactions can be used for recurring billing.