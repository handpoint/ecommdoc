---
sidebar_position: 14
---

# Dynamic Currency Conversion

## Background 

Dynamic Currency Conversion is a process where the amount of a credit card transaction is converted by the Gateway into the Cardholder’s local currency as determined by the card’s country of issue.

It allows your Customer to pay in their currency, but you will receive the funds in the original transaction currency. You can profit from a mark-up on the exchange rate used, as negotiated with your Acquirer and DCC Provider.

Dynamic Currency Conversion is not available with all Acquirers and must be enabled on your Merchant Account before it can be used. Please contact support to find out whether your Acquirer supports it and if it can be enabled on your Merchant Account.

## Benefits and Limitations 

### Benefits 
- You may see fewer abandoned transactions because the Cardholder can choose to pay in a familiar currency and need not carry out any mental conversions.
- You can gain income from an exchange rate mark-up.
- Currency conversion can be viewed in your transaction reports.
- Fully configurable within the Merchant Management System (MMS).

### Limitations
- Cardholders can be sceptical of use due to previously unfavourable exchange rates’ being offered.
- There may be extra costs involved, though you may also find that you can recover this from your conversion mark-up.
- Not all card types are supported.

## Implementation

If your Merchant Account is set up for Dynamic Currency Conversions, then the Gateway will need you to present the conversion offer to the Cardholder and ask whether they wish to accept or refuse the offer.

### Initial Request (Fetch DCC Conversion details)

If no DCC conversion details are provided in the initial request, the Gateway will determine whether the transaction is eligible for DCC and whether any suitable conversion rate is available.

If the Gateway determines that the transaction is not eligible for DCC or no conversion rate is available, then it will continue and process it as a normal transaction without DCC.

If a rate was checked for but none was available, then the transaction response will contain DCC conversion details but the `dccRate` field will be zero.

If the Gateway determines that the transaction is eligible, it will respond with a `responseCode` of 65890 (DCC REQUIRED) and the response will include details of the DCC offer to ask the Cardholder whether they wish to accept, together with a `dccRef` transaction continuation reference.

#### Request Fields {#dccInitialRequestFields}

These fields should be sent in addition to basic request fields detailed in the [transaction types](transactiontypes.md/#transactionRequest) section: 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| dccRequired | No| Is 3DS required for this transaction?<br></br><br></br> Possible values are:<br></br>  N – DCC is not required. <br></br> Y – DCC is not required. <br></br><br></br> Any other value will use the preference set in the Merchant Management System (MMS).|

#### Response Fields {#dccInitialResponseFields}

These fields will be returned in addition to the [basic response fields](transactiontypes#transactionResponse).

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| dccEnabled | Always| Is DCC enabled for this Merchant Account?<br></br> <br></br> Possible values are:<br></br>  N – Merchant Account is not enabled.<br></br>  Y – Merchant Account is enabled.|
| dccRequired | Always| Is DCC required for this transaction?<br></br><br></br> Possible values are:<br></br> N – DCC is not required.<br></br> Y – DCC is required.|
| dccProvider | Yes| DCC provider code name.|
| dccRate | Always| Conversion rate (0-999.999999)|
| dccMargin | Yes| Percentage markup (0-9999.999999)|
| dccCommission | Yes| Percentage commission (0-9999.999999)|
| dccSource | Yes| Source of exchange rate|
| dccCreated | Yes| Time rate sourced (YYYY-MM-DD HH:MM:SS)|
| dccExpires | Yes| Time rate expires (YYYY-MM-DD HH:MM:SS)|
| dccCurrencyCode | Yes| Cardholder’s currency|
| dccAmount | Yes| The amount of the transaction in the Cardholder’s minor currency converted at the rate provided.|
| dccResponseCode | Yes| Any response code generated while performing the DCC processing.|
| dccResponseMessage | Yes| Any response description corresponding to the above `dccResponseCode`.|

### Continuation Request (Accept/Refuse DCC offer)

When the DCC offer has been presented to the Cardholder and their acceptance or refusal obtained, then a new request should be sent to the Gateway containing their decision in the `dccAccepted` and the original `dccRef` field received above.

#### Request Fields

These fields may be sent alone:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| dccRef | <span class="badge badge--primary">Yes</span> | The value of the `dccRef` field in the initial Gateway response.|
| dccAccepted | <span class="badge badge--primary">Yes</span> | The Cardholder’s acceptance to pay using the DCC conversion offered. If they don’t accept then the original transaction currency is used.<br></br><br></br> Possible values are:<br></br> N – Cardholder refused the DCC offer.<br></br> Y – Cardholder accepted the DCC offer.|

It is only necessary to send the `dccRef` and the `dccAccepted` in the continuation request, because the `dccRef` will identify the Merchant Account and initial request. However, you can send any of the normal request fields to modify or supplement the initial request. Any card details and transaction amount sent in the second request must match those used in the first request, else the second request will fail with a responseCode of 64442 (REQUEST MISMATCH).

#### Response Fields

No further fields will be returned in addition to the [dcc initial request fields](#dccInitialRequestFields); the [dcc initial response fields](#dccInitialResponseFields); and the 

### External Authentication Request

You can choose to obtain the DCC details from a third party, in which case you should provide their details as part of a standard request. If the Gateway receives valid third-party DCC details, then it will use those and not attempt to fetch rates from its own DCC Provider.

#### Request Fields {#externalAuthenticationRequestFields}

These fields should be sent in addition to basic request fields detailed in the [transaction types](transactiontypes.md/#transactionRequest) section: 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| dccAccepted | No| The Cardholder’s acceptance to pay using the DCC conversion offered. If they don’t accept then the original transaction currency is used.<br></br><br></br> Possible values are:<br></br> N – Cardholder refused the DCC offer.<br></br> Y – Cardholder accepted the DCC offer.|
| dccProvider | <span class="badge badge--primary">Yes</span>| DCC provider code name.|
| dccMargin | <span class="badge badge--primary">Yes</span>| Percentage markup (0-9999.999999)|
| dccCommission | <span class="badge badge--primary">Yes</span>| Percentage commission (0-9999.999999)|
| dccSource | <span class="badge badge--primary">Yes</span>| Source of exchange rate|
| dccCreated | <span class="badge badge--primary">Yes</span>| Time rate sourced (YYYY-MM-DD HH:MM:SS)|
| dccExpires | <span class="badge badge--primary">Yes</span>| Time rate expires (YYYY-MM-DD HH:MM:SS)|
| dccCurrencyCode | <span class="badge badge--primary">Yes</span>| Cardholder’s currency|
| dccAmount |No| The amount of the transaction in the Cardholder’s minor currency converted at the rate provided.|

Note: If DCC is not enabled for the Merchant Account then any DCC conversion fields sent in the request are ignored and the transaction is processed as normal without DCC. If DCC is enabled but the transaction is otherwise not eligible for DCC conversion, then any DCC field sent in the request will result in an error response.

#### Response Fields 

No further fields will be returned in addition to the [external authentication request fields](#externalAuthenticationRequestFields)  and the [basic response fields](transactiontypes#transactionResponse).