---
sidebar_position: 14
---

# Dynamic Currency Conversion

## Background 

Dynamic Currency Conversion is a process where the amount of a credit card transaction is converted by the Gateway into the Cardholder’s local currency as determined by the card’s country of issue.

It allows your Customer to pay in their currency, but you will receive the funds in the original transaction currency. You can profit from a mark-up on the exchange rate used, as negotiated with your Acquirer and DCC Provider.

If your Merchant Account is set up for Dynamic Currency Conversions, then the Hosted Payment Page will offer the Cardholder the option of paying in their native currency. NOTHING else is required!

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

## DCC Optional Request Fields

**If your Merchant Account is set up for Dynamic Currency Conversions, then the Hosted Payment Page will offer the Cardholder the option of paying in their native currency. NOTHING else is required, you don't even need to pass the below optional parameter!**

These fields should be sent in addition to basic request fields detailed in the [transaction types](transactiontypes.md/#transactionRequest) section: 

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| dccRequired | No| Is 3DS required for this transaction?<br></br><br></br> Possible values are:<br></br>  N – DCC is not required. <br></br> Y – DCC is not required. <br></br><br></br> Any other value will use the preference set in the Merchant Management System (MMS).|



