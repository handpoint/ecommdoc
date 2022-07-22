---
sidebar_position: 2

---

# Sample Code

## Testing 

You will be provided with unique test Merchant Account IDs during the onboarding process. Refer to the [authentication](overview#authentication) section for the list of required parameters. Test Merchant Accounts are not connected to a Simulator and not to an actual Acquirer. The Simulator will emulate the function of an Acquirer and provide simulated responses and authorisation codes.

### Test Amounts 

When testing the transaction amount can be used to trigger different authorisation and settlement outcomes as follows:

| Min. Amount | Max. Amount | Authorisation response | Settlement outcome |
| ----------- | ----------- | ----------- | ----------- |
| 100 (1.00) | 2499 (24.99) | (0) AUTH CODE: XXXXXX | ACCEPTED |
| 2500 (25.00) | 4999 (49.99) | (0) AUTH CODE: XXXXXX | REJECTED |
| 5000 (50.00) | 7499 (74.99) | (1) CARD REFERRED <br></br> (0) AUTH CODE: XXXXXX  | ACCEPTED |
| 7500 (75.00) | 9999 (99.99) | (1) CARD REFERRED <br></br> (0) AUTH CODE: XXXXXX  | REJECTED |
| 10000 (100.00) | 14999 (49.99) | (5) CARD DECLINED | N/A |
| 15000 (150.00) | 19999 (199.99) | (4) CARD DECLINED – KEEP CARD | N/A |
| 20000 (200.00) | 24999 (249.99) | (65) CARD DECLINED - SCA REQUIRED <br></br> (0) AUTH CODE: XXXXXX | ACCEPTED |
| 25000 (250.00) | 29999 (299.99) | (65) CARD DECLINED – SCA REQUIRED <br></br>  (5) CARD DECLINED | N/A |

Any other amount will return a `responseCode` of 66311 (Invalid Test Amount).

The settlement outcome only applies to transactions which reach settlement due to being successfully authorised and captured and not cancelled. The amount captured is used when determining the settlement outcome rather than the amount authorised.

The range 5000 to 9999 can be used to test manual authorisations. If the transaction does not contain an `authorisationCode` request field, then the Simulator will return a `responseCode` of 1 (CARD REFERRED). If it does, then it will return a `responseCode` of 0 (SUCCESS), with an amount between 50000 and 7499 being accepted at settlement and an amount of 7500 to 9999 being rejected.

The range 20000 to 29999 can be used to test secure customer authentication (SCA) soft declines. If the transaction is eligible to request SCA then the Simulator will return a `responseCode` of 65 (SCA REQUIRED). If not, then it will return a `responseCode` of 0 (SUCCESS) for the range 20000 to 24999 or 5 (DO NOT HONOR) for the range 25000 to 29999. Successful transactions will be approved at settlement.

Note: SCA exemptions are not supported by the simulator and so cannot be used to request that SCA is not required.

### Test Cards 

The test accounts will only accept card numbers that are designated for test purposes. These test cards cannot be used on production accounts.

To test AVS and CV2 verification then the associated CVV and billing addresses are provided for each card. If a different value is used, then the Simulator will mark the responses as ‘not matched’.

Unless stated otherwise an expiry date sometime in the near future should be used.

#### Visa Credit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 4929421234600821 | 356 | Flat 6 Primrose Rise<br></br> 347 Lavender Road <br></br>Northampton <br></br> NN17 8YG| 
| 4543059999999982 | 110 | 76 Roseby Avenue<br></br> Manchester <br></br>M63X 7TH| 
| 4543059999999990 | 689 | 23 Rogerham Mansions<br></br>4578 Ermine Street<br></br> Borehamwood <br></br> WD54 8TH| 

#### Visa Debit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 4539791001730106 | 289 | Unit 5 Pickwick Walk<br></br>120 Uxbridge Road Hatch End<br></br>Middlesex<br></br>HA6 7HJ| 
| 4462000000000003 | 672 | Mews 57<br></br>Ladybird Drive<br></br>Denmark<br></br> 65890| 

#### Visa Electron 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 4917480000000008 | 009 | 5-6 Ross Avenue<br></br>Birmingham<br></br>B67 8UJ| 

#### Mastercard Credit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 5301250070000191 | 419 | 25 The Larches Narborough<br></br>Leicester<br></br>LE10 2RT| 
| 5413339000001000 | 304 | Pear Tree Cottage<br></br>The Green<br></br>Milton Keynes<br></br>MK11 7UY| 
| 5434849999999951 | 470 | 34a Rubbery Close<br></br>Cloisters Run<br></br>Rugby<br></br>CV21 8JT| 
| 5434849999999993 | 557 | 4-7 The Hay Market<br></br>Grantham<br></br>NG32 4HG| 

#### Mastercard Debit 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 5573 4712 3456 7898 | 159 | Merevale Avenue<br></br>Leicester<br></br>LE10 2BU| 

#### UK Maestro 

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 6759 0150 5012 3445 002 | 309 | The Parkway<br></br>5258 Larches Approach Hull<br></br>North Humberside<br></br>HU10 5OP| 
| 6759 0168 0000 0120 097 | 701 | The Manor<br></br>Wolvey Road<br></br>Middlesex<br></br>TW7 9FF| 

#### JCB

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 3540599999991047 | 209 | 2 Middle Wallop Merideth-in-the-Wolds<br></br>Lincolnshire<br></br>LN2 8HG| 


#### American Express

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 374245455400001 | 4887 | The Hunts Way<br></br>Southampton<br></br>SO18 1GW| 

#### Diners Club

| Card Number| CVV | Address | 
| ----------- | ----------- | ----------- |
| 36432685260294 | 111 | N/A | 

Diners Club do not support the Address Verification Service (AVS). For testing purposes, we advise that a separate Merchant Account is used with AVS is turned off.

## Request Checking Only

Sometimes, you may wish to submit a request to the Gateway in order for it to be ‘validated only’ and not processed by the simulator or sent to the Acquirer. In these cases, the following flag can be used that will stop the processing after the integrity verification has been performed:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| checkOnly | No | Check the request for syntax and field value errors only. Do not attempt to submit the transaction for honouring by the Merchant’s financial institution.|

If the request is OK, then a responseCode is returned as 0 (Success); otherwise, the code that would have prevented the request from completing is returned.

Note: in these cases, the request is not stored by the Gateway and is not available within the Merchant Management System (MMS).

