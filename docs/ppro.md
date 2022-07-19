---
sidebar_position: 22
---

# PPRO Transactions (APMs)

## Background 

PPRO is an additional payment method that is available to all Merchants using the Gateway that have a PPRO account.

To use PPRO you will be supplied with a separate PPRO Merchant account that can be grouped with your main Merchant Account using the account mapping facility as documented in the [merchant account mapping](annexes#merchantAccountMapping) section. This allows transactions to be sent using your main Merchant Account and then routed automatically to the PPRO Merchant Account in the same mapping group.

PPRO is an Acquirer that offers many Alternative Payment Methods (APM), that you can then offer to your Customers.

E-wallets, SMS payments and PSP services are some of the many payment methods PPRO support (eg Alipay, EasyPay, Bancontact). This could allow a business to facilitate overseas transactions or alternative payment methods using a different payment method suitable for that country or business plan.

All transactions created with this payment method will appear in the Merchant Management System (MMS) together with the payment method that was used to process the transaction.

PPRO transactions cannot be used for ad-hoc Credential on File (COF) repeat transactions or for recurring billing.

For more information on how to accept PPRO transactions please contact customer support.

## Benefits 

- Multiple alternative payment methods could be used.
- Expands range of payment methods for international use.
- Supports a variety of e-wallets, SMS and PSP’s.
- Ability to perform refunds on supported payment methods.
- Transactions are controlled within the Merchant Management System (MMS) in the same manner as normal card transactions.

## Limitations 

- You will need a PPRO account.
- Payment authorisation is not always instantaneous and may require additional ‘QUERY’ requests.
- An alternative payment method may only support one or a limited set of currencies or countries.
- Alternative payment methods require a browser in order to display their Checkout.

## Implementation 

If a transaction is sent to the Hosted Integration using a `merchantID` which is part of a routing group containing a PPRO Merchant Account, then the Hosted Payment Page will show alternative payment method (APM) buttons for each payment method listed in the `allowedPaymentMethods` field. When clicked on the Hosted Payment Page may request further details from the Customer before opening the APM Checkout allowing the Customer to pay using that APM.

To customise the alternative payment methods checkout experience, you may send various options in the `pproCheckoutOptions` field in your initial request.

Additional information available from PPRO will be made available in the `checkoutDetails` response field.

### Request Fields

These fields should be sent in addition to the [basic request fields](transactiontypes.md/#transactionRequest).

| Name | mandatory |Description|
| ----------- | ----------- |----------- |
|allowedPaymentMethods| <span class="badge badge--primary">Yes</span> |Payment method to be used with PPRO (eg ppro.astropay, ppro.alipay, etc.). Refer to the [Payment Method Tag](#pproPaymentMethodTag) section.|
|paymentMethod| No |Request the Hosted Payment Page to invoke an alternative payment method on display without the need for the Customer to select it.|
|pproCheckoutOptions|No||Record containing options used to customise the alternative payment methods Checkout. See the [checkout options](#checkoutOptions) section. Whilst the Gateway does not see this field as mandatory, PPRO may have payment methods that require additional configuration using checkout options.|


#### Response Fields

These fields will be returned, in addition to the request fields above and the [basic response fields](transactiontypes.md/#transactionResponse).

| Name | mandatory |Description|
| ----------- | ----------- |----------- |
|checkoutName| <span class="badge badge--primary">Yes</span>|The `paymentMethod` you used to identify the PPRO payment method.|
|pproCheckoutOptions| <span class="badge badge--primary">Yes</span>|Record containing any Checkout options provided in the request.|
|checkoutDetails| <span class="badge badge--primary">Yes</span>|Record containing additional information provided from the payment method used during checkout.|
|checkoutResponse| <span class="badge badge--primary">Yes</span>|Containing additional information provided by the Checkout. Any change in the payment’s status will be given in `responseMessage` and `responseCode`. <br></br><br></br> Not all payment methods give an immediate payment status. This will require a further QUERY to the Gateway to see whether this value has changed to a status of ‘tendered’.|
|checkoutStatus| <span class="badge badge--primary">Yes</span>|A string containing the result of the checkout process. This is not used to identify the transaction’s payment status.|


### Payment Method Tag {#pproPaymentMethodTag}

`allowedPaymentMethods` is a comma separated list of `paymentMethod` supported by the Merchant to show on the Hosted Payment Page where supported. The `paymentMethod` field follows the format ‘ppro.XXXX’, where XXXX is the alternative payment method’s tag name as assigned by PPRO. 

For example, to use the alternative payment method AstroPay Card that has a tag name of “astropaycard” (all lowercase); the resulting payment method code would be “ppro.astropaycard”.

The table below is a guide to the tag names available. This list is fluid as PPRO add and remove methods.

If you know of a payment method that is not on this list or the payment method cannot be used; please contact customer support for advice.

| Payment Method Tag | Payment Method Name |
| ----------- | ----------- |
|affinbank|Affin bank|
|alipay| AliPay|
|ambank|AmBank|
|argencard|Argencard|
|astropaycard|AstroPay Card|
|astropaydirect|AstroPay Direct|
|aura|Aura|
|baloto|Baloto|
|banamex|Banamex|
|bancodobrasil|Banco Do Brasil|
|bancodechile|Banco de Chile|
|bancodeoccidente|Banco de Occidente|
|bancomer|Bancomer|
|bankislam|Bank Islam|
|bcmc|Bancontact|
|bitpay|BitPay|
|boleto|Boleto Bancario|
|bradesco|Bradesco|
|cabal|Cabal|
|cartaomercadolivre|Cartao Mercado Livre|
|carulla|Carulla|
|ccauth|Credit/Debit Card|
|ccweb|Credit/Debit Card|
|cencosud|Cencosud|
|cimbclicks|CIMB Clicks|
|cmr|CMR|
|davivienda|Davivienda|
|directpay|Sofortüberweisung (Direct Pay)|
|dragonpay|Dragonpay|
|easypay|EasyPay|
|efecty|Efecty|
|elo|Elo|
|empresedeenergia|Emprese de Energia|
|enets|eNETS|
|entercash|Entercash|
|eps|EPS|
|estonianbanks|Estonian Banks|
|giropay|Giropay|
|hipercard|Hipercard|
|hongleongbank|Hong Leong Bank|
|ideal|iDEAL|
|instanttransfer|Instant Transfer|
|int_payout|International Pay-Outs|
|itau|Itau|
|latvianbanks|Latvian Banks|
|lithuanianbanks|Lithuanian Banks|
|magna|Magna|
|maxima|Maxima|
|maybanktwou|Maybank2u|
|multibanco|Multibanco|
|mybank|MyBank|
|myclearfpx|MyClear FPX|
|naranja|Naranja|
|narvesen|Narvesen|
|nativa|Nativa|
|oxxo|OXXO|
|p24|Przelewy24|
|p24payout|Przelewy24 Payout|
|pagofacil|Pago Facil|
|paypost|PayPost|
|paysafecard|Paysafe Card|
|paysbuy|Paysbuy|
|paysera|Paysera|
|payu|PayU|
|perlas|Perlas Terminals|
|poli|OLI|
|presto|Presto|
|pse|PSE|
|pugglepay|Pugglepay|
|qiwi|QIWI|
|qiwipayout|QIWI Payout|
|rapipago|Rapipago|
|redpagos|Redpagos|
|rhbbank|RHB Bank|
|safetypay|SafetyPay|
|santander|Santander|
|sepadirectdebit|SEPA DirectDebit|
|sepapayout|SEPA Payout|
|seveneleven|7eleven|
|singpost|SingPost|
|skrill|Skrill|
|surtimax|Surtimax|
|tarjetashopping|Tarjeta Shopping|
|trustly|Trustly|
|trustpay|TrustPay|
|unionpay|UnionPay|
|verkkopankki|Verkkopankki – Finish Online Banking|
|webpay|Webpay|
|yellowpay|Yellow Pay|

### Checkout Options {#checkoutOptions}

The following options may be set in the `pproCheckoutOptions` field to customise the Checkout. The options must be formatted using the record or serialised record formats detailed in the [format guide](overview#fieldFormats).

| Name | Description |
| ----------- | ----------- |
|nationalid|Consumer’s national ID (up to 30 characters).|
|consumerref|Unique reference identifying the consumer within 1 to 20 characters and a format of A-Za-z0-9.%,&/+*$-|
|siteid|Unique site identifier. Required for clients serving multiple points of sale and forwarded onwards whilst using the qiwi payment method.|
|iban|Valid IBAN of consumer/destination account.|
|sequencetype|Sequence type of the direct debit.<br></br><br></br> Possible values are:<br></br> oneOff – The direct debit is executed once (default)<br></br> first – First direct debit in a series of recurring ones|
|mandatereference|Mandate reference as returned on the first transaction in the sequence (found from mandatereference in checkoutDetails)|
|mandatesignaturedate|Date of the initial transaction.|
|bic|Valid BIC (8 or 11 alphanumeric letters) – optionally supplied to skip the bank selection page (by using the bank referenced by BIC as supplied)|
|clientip|Optional IP address of the consumer during checkout using Trustly (127.0.0.1 is not allowed!)|
|address|Customer’s billing address <br></br><br></br>This information is supplied to PPRO by default using the Gateway field customerAddress|
|city|Customer’s billing city<br></br><br></br>This information is supplied to PPRO by default using the Gateway field customerTown.|
|phone|Customer’s phone<br></br><br></br>This information is supplied to PPRO by default using the Gateway field customerPhone.|
|mobilephone|Customers mobile phone<br></br><br></br>This information is supplied to PPRO by default using the Gateway field customerMobile.|
|dob|MCC 6012 Date of Birth<br></br><br></br>This information is supplied to PPRO by default using the Gateway field receiverDateOfBirth.|
|dynamicdescriptor|Statement narrative<br></br><br></br>This information is supplied to PPRO by default using the Gateway field statementNarrative1.|

### Notifications and "Tendered" Payments 

Whilst some payment methods give an immediate payment status (ie direct card payment methods rather than SMS and e-wallet systems), some payments may come back with the status of ‘tendered’. At this time, online shopping modules will not be able to monitor the transaction status. The use of a QUERY request may be of use. **Processing management requests (QUERY) is not possible with the Hosted payment page integration, it requires a separate Direct Integration.**   

Please ask customer support in this matter who will be able to give more information and may be able to provide better advice for your situation.

Notifications from PPRO regarding the payment status, seconds, minutes or hours after the checkout will automatically update the transaction status.