---
sidebar_position: 15
---

# Purchase Data 

## Background

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

## Purchase Data Request Fields 

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