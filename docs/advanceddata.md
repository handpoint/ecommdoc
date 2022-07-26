---
sidebar_position: 17
---

# Extra Transaction Data 

## Purchase Data 

The Gateway can be sent advanced purchase information with each transaction, where required.

The Gateway provides a number of fields that you can use to store advanced purchase information about the transaction, including details on individual items purchased. These fields are only sent to the Acquirer if needed. The stored data can be obtained by sending a QUERY request.

The details may also be used for advanced purposes, such as displaying shopping cart information on the Masterpass wallet, or PayPal checkout.

### American Express Purchases 

Purchases using American Express cards will send a subset of this information to the Card Scheme as appropriate.

With American Express, you can provide tax or discount reason (but not both). If `taxAmount` is provided, then `taxReason` is used; if `discountAmount` is provided, then `discountReason` is used. If both are provided, then `taxReason` is used.

Only the description, quantity, and amount of the first six line item details are sent to American Express.

### Purchase Orders

These fields together with other advanced fields, as detailed in [Custom Data](customdata), can be used to send full information relating to a purchase order and related invoice indicating types; quantities; and agreed prices for products or services. Details on the supplier; shipping; delivery can also be included.

At present, this information is not sent to the Acquirer, unless needed, but future enhancements to the Gateway may include sending such information as Level 2 or 3 Purchasing data as defined by the relevant Card Schemes.

### Purchase Data Request Fields 

The following request fields may be sent to provide more information on the breakdown of the purchase amount:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| grossAmount | No | Total gross amount of sale.|
| netAmount | No | Total net amount of sale.|
| taxRate | No | Total tax rate (percentage).|
| taxAmount | No | Total tax amount of sale. <br></br><br></br>Amex/Diners require either tax or discount, not both.|
| taxReason | No | Reason for above tax (eg VAT). <br></br><br></br>Amex/Diners require either tax or discount, not both.|
| discountAmount | No | Total discount amount of sale. <br></br><br></br>Amex/Diners require either tax or discount, not both.|
| discountReason | No | Reason for above discount. <br></br><br></br>Amex/Diners require either tax or discount, not both.|
| handlingAmount | No | Handling costs.|
| insuranceAmount | No | Insurance costs.|

The following request fields may be sent to provide more information on the purchased items:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| itemXXAmount | No | Amount for XXth item purchased.|
| itemXXDescription | No | Description of XXth item purchased.|
| itemXXDescription | No | Quantity of XXth item purchased.|
| itemXXGrossAmount | No | Gross amount for XXth item purchased.|
| itemXXNetAmount | No | Net amount for XXth item purchased.|
| itemXXTaxAmount | No | Tax amount for XXth item purchased.|
| itemXXTaxRate | No | Total tax rate for XXth item purchased.|
| itemXXTaxReason | No | Tax reason for XXth item purchased.|
| itemXXDiscountAmount | No | Total discount for XXth item purchased.|
| itemXXDiscountReason | No | Discount reason for XXth item purchased.|
| itemXXProductCode | No | Product code for XXth item purchased.|
| itemXXProductURL | No | Shopping cart URL for XXth item purchased.|
| itemXXCommodityCode | No | Commodity code for XXth item purchased.|
| itemXXUnitOfMeasure | No | Unit of measure for XXth item purchased.|
| itemXXUnitAmount | No | Unit amount for XXth item purchased.|
| itemXXImageUrl | No | Image of XXth item purchased.|
| itemXXSize | No | Size of XXth item purchased in the format ‘LengthxWidthxHeight Unit’.|
| itemXXWeight | No | Weight of XXth item purchased in the format ‘Weight Unit’.|
| items | No | Nested line item records (see below).|

:::tip
XX is a number between 1 and 99.
:::

The purchased items can be passed as either individual `itemXXField` fields; or as a single items field whose value is a sequential array of nested records as described in the [format guide](overview#fieldFormats).

Both formats cannot be used together. The presence of an items field will cause the Gateway to ignore any individual fields.

The Gateway does not currently support `items` to be formatted as a serialised array of records.

Note: no attempt is made to check that any gross, net and tax amounts are correct with respect to each other. It is the sender’s responsibility to ensure alternative amount formats are correct.

Line item fields can either be sent ‘flat’ using field names containing the item row number as a sequential number from 1 to 99; or be sent using nested arrays of the form `items[XX][field]` where `XX` is the row number from 1 to 99 and `field` is the field name from the above table without the `itemXX` prefix and starting with a lowercase first letter. For example, the tax rate for item 5 can be sent either as `item5TaxRate`; or as `items[5][taxRate]`. The two formats should not be mixed. If a request field of `items` is seen, then the ‘flat’ fields are ignored.

## Custom Data 

You may send arbitrary data with the request by appending extra fields, which will be returned unmodified in the response. These extra fields are merely ‘echoed’ back and not stored by the Gateway.

Caution should be made to ensure that any extra fields do not match any currently documented fields or possible future fields. One way to do this is to prefix the field names with a value unique to you, the Merchant.

If the request contains a field that is also intended as a response field, then any incoming request value will be overwritten by the correct response value.

**The Gateway may add new request and response fields at any time and so your integration must take care not to send request fields that may conflict with future Gateway fields and be able to ignore response fields which it doesn’t yet understand.**

You can also use the `merchantData` field to store custom data with the transaction. This stored data can then be retrieved at a later date, using a QUERY request. Complex data can be stored as per the details for nested records as described in the [format guide](overview#fieldFormats), however the Gateway does not currently support these fields to be provided in the serialised record format. Alternatively, you can serialise the data before storing and unserialise it on retrieval.

### Request Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| merchantData | No | Arbitrary data to be stored together with this transaction. |

## Advanced Data 

The Gateway provides a number of fields that you can use to store information about the transaction. These fields are only sent to the Acquirer if needed. The stored data can be obtained by sending a QUERY request.

### Customer Request Fields

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| customerName | No | Customer’s name.|
| customerCompany | No | Customer’s company (if applicable).|
| customerAddress | No | Customer’s address.<br></br><br></br>Mandatory if AVS checking required.|
| customerPostcode | No | Customer’s postcode.<br></br><br></br>Mandatory if AVS checking required.|
| customerTown | No | Customer’s town/city.|
| customerCounty | No | Customer’s county/province.|
| customerCountryCode | No | Customer’s country.|
| customerPhone | No | Customer’s phone number.|
| customerMobile | No | Customer’s mobile phone number.|
| customerFax | No | Customer’s fax number.|
| customerEmail | No | Customer’s email address.|
| customerDateOfBirth | No | Customer’s date of birth.|
| customerOrderRef | No | Customer’s reference for this order (Purchase Order Reference).|
| customerMerchantRef | No | Customer’s reference for the Merchant.|
| customerTaxRef | No | Customer’s tax reference number.|

### Merchant Request Fields {#merchantRequestFields}

These fields can be used to store details about the Merchant and any relationship between the Merchant and Customer such as any invoice reference.

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| merchantName | No | Merchant’s contact name.|
| merchantCompany | No | Merchant’s company name.|
| merchantAddress | No | Merchant’s contact address.|
| merchantTown | No | Merchant’s contact town/city.|
| merchantCounty | No | Merchant’s contact county.|
| merchantPostcode | No | Merchant’s contact postcode.|
| merchantCountryCode | No | Merchant’s contact country.|
| merchantPhone | No | Merchant’s phone number.|
| merchantMobile | No | Merchant’s mobile phone number.|
| merchantFax | No | Merchant’s fax number.|
| merchantEmail | No | Merchant’s email address.|
| merchantWebsite | No | Merchant’s website. The website must be a fully qualified URL and include at least the scheme and host components.|
| merchantOrderRef | No | Merchant’s reference for this order (Invoice/Sales Reference).|
| merchantCustomerRef | No | Merchant’s reference for the Customer.|
| merchantTaxRef | No | Merchant’s tax reference number.|
| merchantOriginalOrderRef | No | Reference to a back order.|
| merchantCategoryCode | No | Scheme assigned Merchant Category Code (MCC).|
| merchantType | No | Acquirer assigned Merchant type code.|
| merchantAccountNo | No | Merchant’s bank account number|

### Supplier Request Fields

These fields can be used to store details about the Supplier. This is where any purchased goods are being supplied by a third-party and not directly from the Merchant.

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| supplierName | No | Supplier’s contact name.|
| supplierCompany | No | Supplier’s company name.|
| supplierAddress | No | Supplier’s contact address.|
| supplierTown | No | Supplier’s contact town/city.|
| supplierCounty | No | Supplier’s contact county.|
| supplierPostcode | No |Supplier’s contact postcode.|
| supplierCountryCode | No | Supplier’s contact country.|
| supplierPhone | No | Supplier’s phone number.|
| supplierMobile | No | Supplier’s mobile phone number.|
| supplierFax | No | Supplier’s fax number.|
| supplierEmail | No | Supplier’s email address.|
| supplierOrderRef | No | Supplier’s reference for this order (Invoice/Sales Reference).|
| supplierAccountNo | No | Supplier’s bank account number.|

### Delivery Request Fields

These fields can be used to store details about the delivery address. This is where any purchased goods are being delivered to if different from the Customer’s address.

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| deliveryName | No | Name of person receiving the delivery.|
| deliveryCompany | No | Name of company receiving the delivery.|
| deliveryAddress | No | Delivery address.|
| deliveryTown | No | Delivery town/city.|
| deliveryCounty | No | Delivery county.|
| deliveryPostcode | No | Delivery postcode.|
| deliveryCountryCode | No | Delivery country.|
| deliveryPhone | No | Phone number of delivery location.|
| deliveryMobile | No | Mobile phone number of delivery location.|
| deliveryFax | No | Fax number of delivery location.|
| deliveryEmail | No | Delivery email address.|

### Receiver Request Fields

These fields can be used to store details about the recipient of the purchased goods where different from the Customer’s and Delivery details. It is most commonly used by Financial Institutions (MCC 6012 Merchants) who need to record the primary recipient of a loan.

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| receiverName | No | Receiver’s contact name.|
| receiverCompany | No | Receiver’s company name.|
| receiverAddress | No | Receiver’s contact address.|
| receiverCounty | No | Receiver’s contact town/city.|
| receiverPostcode | No | Receiver’s contact postcode.|
| receiverCountryCode | No | Receiver’s contact country.|
| receiverPhone | No | Receiver’s phone.|
| receiverMobile | No | Receiver’s mobile phone number.|
| receiverFax | No | Receiver’s fax number.|
| receiverEmail | No | Receiver’s email address.|
| receiverAccountNo | No | Receiver’s account number.|
| receiverDateOfBirth | No | Receiver’s date of birth.|

### Shipping Request Fields

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| shippingTrackingRef | No | Shipping tracking reference.|
| shippingMethod | No | Shipping method (eg Courier, Post, etc.).|
| shippingAmount | No | Cost of shipping.|
| shippingGrossAmount | No | Gross cost of shipping.|
| shippingNetAmount | No | Net cost of shipping.|
| shippingTaxRate | No | Tax rate as percentage to 2 decimal places.|
| shippingTaxAmount | No | Tax cost of shipping.|
| shippingTaxReason | No | Tax reason (eg VAT).|
| shippingDiscountAmount | No | Discount on shipping.|
| shippingDiscountReason | No | Reason for discount.|

Note: no attempt is made to check that any gross, net and tax amounts are correct with respect to each other. It is the sender’s responsibility to ensure alternative amount formats are correct.

### Device Information Fields {#deviceInformationFields}

These fields can be used to provide details of the device from which the transaction is being made. Although not strictly mandatory, they may be required for fraud checking or 3-D Secure authentication, in which case it is highly recommended that they be provided.

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| deviceType | No | Type of Consumer’s device.<br></br><br></br>  One of the following values: desktop, laptop, tablet, phone, other.|
| deviceChannel | No | Communications channel used by the Consumer’s device.<br></br><br></br> One of the following values: browser, app, other.|
| deviceIdentity | No | Content of the HTTP User-Agent header received from the Consumer’s device.<br></br><br></br> Truncated to 2048 characters maximum.<br></br><br></br>This field is mandatory for 3-D Secure unless an alternative is provided via the `threeDSOptions` field.|
| deviceTimeZone | No | Time zone offset in minutes between UTC and the Consumer’s device. The offset is positive if the local time zone is behind UTC and negative if it is ahead.<br></br><br></br>This field is mandatory for 3-D Secure unless an alternative is provided via the `threeDSOptions` field.|
| deviceCapabilities | No | Comma separated list of capabilities supported by the Consumer’s device. <br></br><br></br>One or more of the following values: java, javascript.<br></br><br></br>This field is mandatory for 3-D Secure unless an alternative is provided via the `threeDSOptions` field.|
| deviceAcceptContent | No | Content of HTTP Accept header received from the Consumer’s device.<br></br><br></br> Truncated to 2048 characters maximum.<br></br><br></br>This field is mandatory for 3-D Secure unless an alternative is provided via the `threeDSOptions` field.|
| deviceAcceptCharset | No | Content of HTTP Accept-Charset header received from the Consumer’s device.<br></br><br></br> Truncated to 2048 characters maximum.<br></br><br></br>This field is mandatory for 3-D Secure unless an alternative is provided via the `threeDSOptions` field.|
| deviceAcceptEncoding | No | Content of HTTP Accept-Encoding header received from the Consumer’s device. <br></br><br></br>Truncated to 2048 characters maximum.<br></br><br></br>This field is mandatory for 3-D Secure unless an alternative is provided via the `threeDSOptions` field.|
| deviceAcceptLanguage | No | Content of HTTP Accept-Language header received from the Consumer’s device. <br></br><br></br>Truncated to 2048 characters maximum.<br></br><br></br>This field is mandatory for 3-D Secure unless an alternative is provided via the `threeDSOptions` field.|
| deviceScreenResolution | No | Screen resolution of the Consumer’s device.<br></br><br></br> Formatted as [HxWxD] where:<br></br> • H – screen height in pixels<br></br> • W – screen width in pixels<br></br> • D – colour depth in bits<br></br><br></br> Screen height and width must be between 1 and 999999 pixels. <br></br><br></br>Colour depth must be one of the following values: 1, 4, 8, 15, 16, 24, 32, 48.<br></br><br></br>This field is mandatory for 3-D Secure unless an alternative is provided via the `threeDSOptions` field.|
| deviceOperatingSystem | No | Operating system used by the Consumer’s device.<br></br><br></br>One of the following values: win, unix, linux, macos, ios, android, other.|

## Acquirer Data 

The Gateway supports the passing of Acquirer specific data where needed by an individual Acquirer to provide additional or non-standard features.

When supported, this data can be passed in the acquirerOptions request field, which must be provided using the record or serialised record format detailed in the [format guide](overview#fieldFormats).

Please contact our customer support team if you need information about what options can be provided to your Acquirer.

The Gateway also supports the returning of Acquirer specific details in the request in situations where the Gateway considers the data to be of value.

When supported, this data will be returned in the acquirerResponseDetails response field, which will be returned using the record format detailed in the [format guide](overview#fieldFormats).

In addition to this the Gateway will return the original response code and message received from the Acquirer and any transaction referenced provided by the Acquirer. This later reference can help you identify the transaction when you have access to the Acquirers merchant management portal or need to contact them to query a transaction.

The original Acquirer response code may not be numeric and information on these codes will need to be requested from the Acquirer.

**The Gateway may support new acquirer options and return new acquirer details at any time and so your integration must be able to handle such changes and not reject unknown fields.**

### Request Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| acquirerOptions | No | Record containing Acquirer specific options.|

### Response Fields 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| acquirerResponseCode | No | Response code supplied by the Acquirer, maybe prefixed with ‘G:’ if the Acquirer is itself a payment Gateway.|
| acquirerResponseMessage | No | Response message supplied the Acquirer.|
| acquirerResponseDetails | No | Record containing Acquirer specific response details.|
| acquirerTransactionID | No | Transaction identifier/reference used to identify the transaction in the Acquirer’s system.|