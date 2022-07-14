---
sidebar_position: 10
---

# Surcharges

## Background 

Surcharges are an additional charge that you can apply to the transactions that are processed through your Merchant Account.

Transactions that are sent for authorisation are subject to processing charges from your Acquirer and surcharges enable you to pass the processing charges that you incur on to your Customers.

You may, for example, be charged a fixed amount for debit card transactions and a percentage amount for credit card transactions. Consequently, the Gateway gives you the option to add both a fixed amount and percentage amount when applying a surcharge.

Surcharges should only be added to cover the processing charges that are incurred by your business. There is no Gateway imposed limit to the value of the surcharges that can be added to your transaction, although there are legal requirements. As a rule, the surcharge must not exceed the processing costs that you pay.

Some businesses apply surcharges to cover all the costs that they incur; while others use the surcharges to subsidise the charges.

:::warning
Surcharge amounts may be limited or illegal in your jurisdiction. For example, surcharging is illegal in the European Union but allowed in most US states. It is up to you to check with your Acquirer and comply with any laws.
:::

:::tip
Surcharges is an advanced feature and must be enabled on the merchant accounts before it can be used. Please contact support if you wish to have it enabled.
:::

## Implementation 

### Surcharge Rules {#surchargeRules}

The `surchargeRules` field allows you to provide multiple rules specifying what surcharges should be applied to a transaction. If a transaction matches multiple rules, then the most specific rule will be used; or the first in the list.


Each surcharge rule contains the following fields:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| cardType | <span class="badge badge--primary">Yes</span> | One or more 2-letter card type codes for which this rule applies. The following two card type codes are also supported, in addition to the codes listed in the [card identification](annexes/#cardIdentification) section.<br></br><br></br> CC – matches any credit card.<br></br> DD – matches any debit card.|
| currency | No | Zero or more 3-letter ISO-4217 currency codes.|
| surcharge | <span class="badge badge--primary">Yes</span>  | Surcharge amount in minor (N) or major (N.N) units or a percentage (N%).|

The surcharge rules should be passed in a sequential array of records, either as nested records or serialised records as described in the [format guide](overview#fieldFormats). The record field names are case sensitive.

### Surcharge Amounts 

The Gateway doesn't usually validate that any `amount` and `grossAmount` fields are the same and that any `netAmount`, `taxAmount` and `taxRate` tally. However, in order to update them when a surcharge is applied, the `amount` and `grossAmount` must match and the correct `taxRate` must be provided or be able to be calculated from one or more of the other fields. Failure in this respect can cause the Gateway to return one of the following `responseCode` values; 66360 (INVALID_GROSSAMOUNT), 66361 (INVALID_NETAMOUNT), 66338 (INVALID_TAXAMOUNT), 66362 (INVALID_TAX_RATE).

If the request contains a `surchargeAmount` field, then the Gateway will assume that surcharging has already been performed externally and will not attempt to apply any further surcharges.

## Request Fields {#surchargeRequestFields}

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| surchargeRequired | No | Is surcharging required for this transaction?<br></br><br></br> Possible values are:<br></br> N – Surcharging is not required.<br></br> Y – Surcharging is required.<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| surchargeRules | No | Surcharge rules as documented in [surcharge rules](#surchargeRules).<br></br><br></br>Overrides any Merchant Account setting configured via the Merchant Management System (MMS).|
| surchargeAmount | No | Surcharge amount already added. A further surcharge will not be added.|

## Response Fields

These fields will be returned in addition to the [surcharge request fields](#surchargeRequestFields) and the [basic response fields](transactiontypes#transactionResponse).

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| surchargeEnabled | Always | Is surcharging enabled on this Merchant Account?|
| surchargeAmount | Always | Surcharge amount added.|
| amount | Always | Original request value with additional surcharge.|
| grossAmount | Conditional | Original request value adjusted for new `amount`.|
| netAmount | Conditional | Original request value adjusted for new `amount`.|
| taxAmount | Conditional | Original request value adjusted for new `amount`.|