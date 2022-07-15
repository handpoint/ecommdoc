---
sidebar_position: 17
---

# Advanced Data 

The Gateway provides a number of fields that you can use to store information about the transaction. These fields are only sent to the Acquirer if needed. The stored data can be obtained by sending a QUERY request.

## Customer Request Fields

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

## Merchant Request Fields

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

## Supplier Request Fields

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

## Delivery Request Fields

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

## Receiver Request Fields

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

## Shipping Request Fields

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

## Device Information Fields

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