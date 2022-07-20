---
sidebar_position: 30
---

# Annexes 

## Response Codes {#responseCodes}

The Gateway will always issue a numeric `responseCode` to report the status of the transaction. These codes should be used rather than the `responseMessage` field to determine the outcome
of a transaction. Response codes are grouped; however, the groupings are for informational purposes only and not all codes in a group are used and some codes may exist for completeness or future use. A zero `responseCode` always indicates a successful outcome.

### Authorisation Response Codes 

The Gateway uses a set of standard response codes to indicate the status of an authorisation request to the Acquirer. These response codes are based on the 2-character ISO 8583 response
codes. The full set of ISO 8583 codes used are given in the table below, however not all are applicable to transactions currently supported by the Gateway and therefore not used and documented for reference purposes only.

Some ISO-8583 codes are not numeric and therefore to ensure all Gateway response codes are numeric these codes are mapped to an equivalent numeric code greater than 99. This equivalent
numeric code is shown in the table below along with the original 2 letter code in brackets.

Not all ISO-8583 codes are applicable to the types of transactions currently available via the Gateway and therefore unapplicable codes, although documented, may not currently be returned.

If the authorising Acquirer does not return a suitable ISO 8583 code, then the Gateway will attempt to map the Acquirers response to a suitable code.

The original Acquirer authorisation response code and response message will always be returned in the `acquirerResponseCode` and `acquirerResponseMessage` fields. 
The original Acquirer authorisation response code may not be numeric and information on these codes will need to be requested from the Acquirer.

#### Acquirer Authorisation Response codes: 0 - 9999

| Code      | Description |
| ----------- | ----------- | 
|0|Successful approval/completion|
|1|Refer to card issuer|
|2|Refer to card issuer, special condition|
|3|Invalid merchant or service provider|
|4|Pickup card|
|5|Do not honor|
|6|Error|
|7|Pickup card, special condition (other than lost/stolen card)|
|8|Honor with identification|
|9|Request in progress|
|10|Approval for partial amount|
|11|Approved VIP|
|12|Invalid transaction|
|13|Invalid amount (currency conversion field overflow), or amount|
|14|Invalid card number/account number|
|15|No such issuer|
|16|Approved, Update Track 3|
|17|Customer cancellation|
|18|Customer dispute|
|19|Re-enter transaction|
|20|Invalid response/Acquirer error|
|21|No action taken (unable to back out prior transaction)|
|22|Suspected malfunction|
|23|Unacceptable transaction|
|24|File update impossible|
|25|Reference number cannot be found. Unable to locate record in fi|
|fr|om the inquiry|
|26|Duplicate reference number|
|27|Error in reference number|
|28|File is temporarily unavailable for update|
|29|File action failed/Contact acquirer|
|30|Format error|
|31|Bank not supported by Switch/Unknown acquirer account code|
|32|Complete partially|
|33|Pickup card (expired)|
|34|Pickup card (suspected fraud)|
|35|Pickup card (acceptor contact acquirer)|
|36|Pickup card (restricted card)|
|37|Pickup card (acceptor call acquirer security)|
|38|Pickup card (PIN tries exceeded)|
|39|No credit account|
|40|Function not supported|
|41|Pickup card (lost card)|
|42|No universal account|
|43|Pickup card (stolen card)|
|44|No investment account|
|45|Account closed|
|46|Identification required|
|47|Identification cross-check required|
|48|No from account|
|49|No to account|
|50|No account|
|51|Insufficient funds|
|52|No checking account|
|53|No savings account|
|54|Expired card|
|55|Incorrect PIN|
|56|Unknown card|
|57|Transaction not permitted to cardholder|
|58|Transaction not allowed at terminal|
|59|Suspected fraud|
|60|Contact acquirer|
|61|Exceeds withdrawal amount limit|
|62|Restricted card (for example, in Country Exclusion table)|
|63|Security violation|
|64|Amount higher than previous transaction|
|65|SCA Required (previously, Exceeds withdrawal limit)|
|66|Contact acquirer|
|67|Hard capture - ATM|
|68|Time out|
|69|Advice received too late|
|70|Contact card issuer|
|71|Message flow error|
|72|Authorization centre not available for 60 seconds.|
|73|Authorization centre not available for 300 seconds.|
|74|PIN entry necessary|
|75|Allowable number of PIN tries exceeded|
|76|Unable to locate previous message (no match on Retrieval Refere|
|77|Previous message located for a repeat or reversal, but repeat o|
|or|iginal message|
|78|Blocked, first used. The transaction is from a new cardholder,|
|79|Already reversed|
|80|Visa transactions: credit issuer unavailable. Private label and|
|81|PIN cryptographic error found (error found by VIC security modu|
|82|Negative CAM, dCVV, iCVV, or CVV results|
|83|STIP cannot approve|
|84|Pre-auth time too great|
|85|No reason to decline a request for account number verification,|
|ve|rification, or a credit voucher or merchandise return|
|86|Unable to verify PIN|
|87|Purchase amount only, no cash back allowed|
|88|Unable to authorise|
|89|Ineligible to receive|
|90|Cut-off in progress|
|91|Issuer unavailable or switch inoperative (STIP not applicable o|
|92|Destination cannot be found for routing|
|93|Transaction cannot be completed, violation of law|
|94|Duplicate transaction|
|95|Reconcile error|
|96|System malfunction|
|97|Security Breach|
|98|Date and time not plausible|
|99|Error in PAC encryption detected|
|497 (B1)| Surcharge amount not permitted on Visa cards (U.S. acquir|
|498 (B2)| Surcharge not supported|
|928 (N0)| Unable to authorise|
|931 (N3) |Cash service not available|
|932 (N4)| Cashback request exceeds issuer limit|
|933 (N5) |Resubmitted transaction over max days limit|
|934 (N7) |Decline for CVV2 failure|
|935 (N8)| Transaction amount greater than pre-authorised approved a|
|1002 (P2)| Invalid biller information|
|1005 (P5)| PIN Change/Unblock request declined|
|1006 (P6)| Unsafe PIN|
|1037 (Q1) |Card Authentication failed|
|1072 (R0)| Stop Payment Order|
|1073 (R1)| Revocation of Authorization Order|
|1074 (R3) |Revocation of All Authorizations Order|
|1144 (T0)| Approval, keep first check|
|1145 (T1)| Check OK, no conversion|
|1146 (T2) |Invalid RTTN|
|1147 (T3)| Amount greater than limit|
|1148 (T4) |Unpaid items, failed NEG|
|1149 (T5)| Duplicate check number|
|1150 (T6)| MICR error|
|1151 (T7)| Too many checks|
|1298 (XA) |Forward to issuer|
|1301 (XD) |Forward to issuer|
|1363 (Z3)| Unable to go online|

### Gateway Response Codes 

The Gateway uses a set of enhanced response codes to indicate if there is an issue with the transaction which prevented any authorisation response being received from the Acquirer. These
response codes start at 65536.

The responses are grouped into categories and the codes in the ‘missing’ and ‘invalid’ field categories are designed so that that invalid field code is exactly 256 greater than the
corresponding missing field code. For example, the code of a missing action field is 66055 and the corresponding code for an invalid action field is 66311 (66055 + 256).

#### General Error Codes

| Code      | Description |
| ----------- | ----------- | 
|65536|Transaction in progress. Contact customer support if this error occurs.|
|65537|A general error has occurred.|
|65538|Reserved for future use. Contact customer support if this error occurs.|
|65539|Invalid Credentials: merchantID is unknown or the signature doesn’t match.|
|65540|Permission denied: caused by sending a request from an unauthorised IP address.|
|65541|Action not allowed: action is not supported by the Acquirer or allowed for the transaction.|
|65542|Request Mismatch: fields sent while completing a request do not match initially requested values. Usually due to sending different card details to those used to authorise the transaction when completing a 3-D Secure transaction or performing a REFUND_SALE transaction.|
|65543|Request Ambiguous: request could be misinterpreted due to inclusion of mutually exclusive fields.|
|65544|Request Malformed: could not parse the request data.|
|65545|Suspended Merchant account.|
|65546|Currency not supported by Merchant.|
|65547|Request Ambiguous, both taxValue and discountValue provided when should be one only.|
|65548|Database error.|
|65549|Payment processor communications error.|
|65550|Payment processor error.|
|65551|Internal Gateway communications error.|
|65552|Internal Gateway error.|
|65553|Encryption error.|
|65554|Duplicate request.|
|65555|Settlement error.|
|65556|AVS/CV2 Checks are not supported for this card (or Acquirer).|
|65557|IP Blocked: Request is from a banned IP address.|
|65558|Primary IP blocked: Request is not from one of the primary IP addresses configured for this Merchant Account.|
|65559|Secondary IP blocked: Request is not from one of the secondary IP addresses configured for this Merchant Account.|
|65560|Reserved for future use. Contact customer support if this error occurs.|
|65561|Unsupported Card Type: Request is for a card type that is not supported on this Merchant Account.|
|65562|Unsupported Authorisation: External authorisation code authorisationCode has been supplied and this is not supported for the transaction or by the Acquirer.|
|65563|Request not supported: The Gateway or Acquirer does not support the request.|
|65564|Request expired: The request cannot be completed as the information is too old.|
|65565|Request retry: The request can be retried later.|
|65566|Test Card Used: A test card was used on a live Merchant Account.|
|65567|Unsupported card issuing country: Request is for a card issuing country that is not supported on this Merchant Account.|
|65568|Masterpass processing error.|
|65569|Masterpass not supported.|
|65570|Masterpass checkout failure.|
|65571|Masterpass checkout success.|
|65572|Masterpass checkout is required.|
|65573|Amounts error. Provided transaction amounts to not tally.|
|65574|Reserved for future use. Contact customer support if this error occurs.|
|65575|No data was found that match the selection criteria.|
|65576|Request cancelled.|

#### 3-D Secure Error Codes

| Code      | Description |
| ----------- | ----------- | 
|65792|3-D Secure processing in progress.|
|65793|3-D Secure processing error.|
|65794|3-D Secure processing is required. 3-D Secure ACS challenge must be displayed.|
|65795|3-D Secure processing is not required.|
|65796|3-D Secure processing is unavailable. Merchant account or Acquirer doesn’t support 3-D Secure.|
|65797|Error occurred during 3-D Secure enrolment check|
|65798|Reserved for future use.|
|65799|Reserved for future use.|
|65800|Error occurred during 3-D Secure authentication check|
|65801|Reserved for future use.|
|65802|3-D Secure authentication is required.|
|65803|3-D Secure authentication results do not meet the Merchant’s preferences.|
|65804|3-D Secure authentication was successful.|

#### Remote Checkout Processing Error Codes

| Code      | Description |
| ----------- | ----------- | 
|65824|Remote checkout processing in progress.|
|65825|Remote checkout processing error.|
|65826|Remote checkout processing is required. Remote checkout must be displayed.|
|65827|Remote checkout processing is not required.|
|65828|Remote checkout processing is not supported.|
|65829|Remote checkout was successful.|
|65830|Remote checkout failed.|

#### Risk Check Processing Error Codes

| Code      | Description |
| ----------- | ----------- | 
|65856|Risk check processing in progress.|
|65857|Risk check processing error.|
|65858|Risk check processing required.|
|65859|Risk check processing is not required.|
|65860|Risk check processing is not supported.|
|65861|Risk check processor communication error.|
|65862|Risk check results do not meet the Merchant’s preferences.|

#### Missing Request Field Error Codes

| Code      | Description |
| ----------- | ----------- | 
|66048|Missing request. No data posted to integration URL.|
|66049|Missing merchantID field.|
|66050|Missing merchantPwd field.|
|66051|Reserved for internal use. Contact customer support if this error occurs.|
|66052|Reserved for internal use. Contact customer support if this error occurs.|
|66053|Reserved for internal use. Contact customer support if this error occurs.|
|66054|Reserved for internal use. Contact customer support if this error occurs.|
|66055|Missing action field.|
|66056|Missing amount field.|
|66057|Missing currencyCode field.|
|66058|Missing cardNumber field.|
|66059|Missing cardExpiryMonth field.|
|66060|Missing cardExpiryYear field.|
|66061|Missing cardStartMonth field. (Legacy field)|
|66062|Missing cardStartYear field. (Legacy field)|
|66063|Missing cardIssueNumber field. (Legacy field)|
|66064|Missing cardCVV field.|
|66065|Missing customerName field.|
|66066|Missing customerAddress field.|
|66067|Missing customerPostcode field.|
|66068|Missing customerEmail field.|
|66069|Missing customerPhone field.|
|66070|Missing countryCode field.|
|66071|Missing transactionUnique field.|
|66072|Missing orderRef field.|
|66073|Missing remoteAddress field.|
|66074|Missing redirectURL field.|
|66075|Missing callbackURL field.|
|66076|Missing merchantData field.|
|66077|Reserved for internal use. Contact customer support if this error occurs.|
|66078|Missing duplicateDelay field.|
|66079|Missing itemQuantity field.|
|66080|Missing itemDescription field|
|66081|Missing itemAmount field.|
|66082|Missing taxAmount field.|
|66083|Missing discountAmount field.|
|66084|Missing discountReason field.|
|66085|Missing xref field.|
|66086|Missing type field.|
|66087|Missing signature field (field is required if message signing is enabled).|
|66088|Missing authorisationCode field.|
|66089|Missing transactionID field.|
|66090|Missing threeDSRequired field.|
|66091|Missing threeDSMD field.|
|66092|Missing threeDSPaRes field.|
|66093|Missing threeDSECI field.|
|66094|Missing threeDSCAVV field.|
|66095|Missing threeDSXID field.|
|66096|Missing threeDSEnrolled field.|
|66097|Missing threeDSAuthenticated field.|
|66098|Missing threeDSCheckPref field.|
|66099|Missing cv2CheckPref field.|
|66100|Missing addressCheckPref field.|
|66101|Missing postcodeCheckPref field.|
|66102|Missing captureDelay field.|
|66103|Missing orderDate field.|
|66104|Missing grossAmount field.|
|66105|Missing netAmount field.|
|66106|Missing taxRate field.|
|66107|Missing taxReason field.|
|66108|Missing surchargeRules field.|
|66109|Reserved for internal use. Contact customer support if this error occurs.|
|66110|Missing statementNarrative1 field.|
|66111|Missing statementNarrative2 field.|
|66112|Missing merchantName field.|
|66113|Missing merchantCompany field.|
|66114|Missing merchantAddress field.|
|66115|Missing merchantTown field.|
|66116|Missing merchantPostcode field.|
|66117|Missing merchantCountryCode field.|
|66118|Missing merchantPhone field.|
|66119|Missing merchantMobile field.|
|66120|Missing merchantEmail field.|
|66121|Missing merchantWebsite field.|
|66122|Missing merchantOrderRef field.|
|66123|Missing merchantCustomerRef field.|
|66124|Reserved for future use. Contact customer support if this error occurs.|
|66125|Missing merchantType field.|
|66126|Reserved for future use. Contact customer support if this error occurs.|
|66127|Missing merchantCategoryCode field.|
|66128|Missing supplierName field.|
|66129|Missing supplierCompany field.|
|66130|Missing supplierAddress field.|
|66131|Missing supplierTown field.|
|66132|Missing supplierPostcode field.|
|66133|Missing supplierCountryCode field.|
|66134|Missing supplierPhone field.|
|66135|Missing supplierMobile field.|
|66136|Missing supplierEmail field.|
|66137|Missing supplierCounty field.|
|66138|Missing customerCompany field.|
|66139|Missing customerTown field.|
|66140|Missing customerCountryCode field.|
|66141|Missing customerMobile field.|
|66142|Missing customerCounty field.|
|66143|Missing merchantCounty field.|
|66144|Missing customerOrderRef field.|
|66145|Missing customerMerchantRef field.|
|66146|Missing customerVatNumber field.|
|66147|Missing customerDateOfBirth field.|
|66148|Missing deliveryName field.|
|66149|Missing deliveryCompany field.|
|66150|Missing deliveryAddress field.|
|66151|Missing deliveryTown field.|
|66152|Missing deliveryPostcode field.|
|66153|Missing deliveryCountryCode field.|
|66154|Missing deliveryPhone field.|
|66155|Missing deliveryMobile field.|
|66156|Missing deliveryEmail field.|
|66157|Reserved for future use. Contact customer support if this error occurs.|
|66158|Missing deliveryCounty field.|
|66159|Missing deliveryFax field.|
|66160|Missing cardExpiryDate field.|
|66161|Missing cardStartDate field. (Legacy field)|
|66162|Reserved for future use. Contact customer support if this error occurs.|
|66163|Reserved for future use. Contact customer support if this error occurs.|
|66164|Missing items field.|
|66165|Missing itemGrossAmount field.|
|66166|Missing itemNetAmount field.|
|66167|Missing itemProductCode field.|
|66168|Missing itemCommodityCode field.|
|66169|Missing itemUnitOfMeasure field.|
|66170|Missing itemUnitAmount field.|
|66171|Missing itemDiscountAmount field.|
|66172|Missing itemDiscountReason field.|
|66173|Missing itemTaxRate field.|
|66174|Missing itemTaxAmount field.|
|66175|Missing itemTaxReason field.|
|66176|Missing shippingTrackingRef field.|
|66177|Missing shippingMethod field.|
|66178|Missing shippingAmount field.|
|66179|Missing shippingNetAmount field.|
|66180|Missing shippingGrossAmount field.|
|66181|Missing shippingTaxRate field.|
|66182|Missing shippingTaxAmount field.|
|66183|Missing shippingTaxReason field.|
|66184|Missing shippingDiscountAmount field.|
|66185|Missing shippingDiscoutReason field.|
|66186|Reserved for future use. Contact customer support if this error occurs.|
|66187|Reserved for future use. Contact customer support if this error occurs.|
|66188|Reserved for future use. Contact customer support if this error occurs.|
|66189|Reserved for future use. Contact customer support if this error occurs.|
|66190|Reserved for future use. Contact customer support if this error occurs.|
|66191|Reserved for future use. Contact customer support if this error occurs|
|66192|Missing walletID field.|
|66193|Missing walletName field.|
|66194|Missing walletDesc field.|
|66195|Missing walletData field.|
|66196|Missing cardID field.|
|66197|Missing cardName field.|
|66198|Missing cardDesc field.|
|66199|Missing cardData field.|
|66200|Missing customerAddressID field.|
|66201|Missing customerAddressName field.|
|66202|Missing customerAddressDesc field.|
|66203|Missing customerAddressData field.|
|66204|Missing deliveryAddressID field.|
|66205|Missing deliveryAddressName field.|
|66206|Missing deliveryAddressDesc field.|
|66207|Missing deliveryAddressData field.|
|66208|Missing walletOwnerRef field.|
|66209|Missing cardToken field.|
|66210|Missing masterPassData field.|
|66211|Reserved for future use. Contact customer support if this error occurs.|
|66212|Missing masterPassCheckoutOptions field.|
|66213|Missing masterPassCallbackURL field.|
|66214|Missing masterPassCheckoutURL field.|
|66215|Missing masterPassToken field.|
|66216|Missing masterPassVerifier field.|
|66217|Missing masterPassResourceURL field.|
|66218|Missing masterPassStatus field.|
|66219|Missing masterPassWalletID field.|
|66220|Missing handlingAmount field.|
|66221|Missing insuranceAmount field.|
|66222|Missing paymentMethod field.|
|66223|Missing paymentToken field.|
|66256|Missing receiverName field.|
|66257|Missing receiverCompany field.|
|66258|Missing receiverAddress field.|
|66259|Missing receiverTown field.|
|66260|Missing receiverPostCode field.|
|66261|Missing receiverCountryCode field.|
|66262|Missing receiverPhone field.|
|66263|Missing receiverMobile field.|
|66264|Missing receiverEmail field.|
|66265|Missing receiverDateOfBirth field.|
|66266|Missing receiverAccountNo field.|
|66267|Missing receiverCounty field.|
|66268|Missing receiverFax field.|
|66269|Missing customerFax field.|
|66270|Missing rtScheduleType field.|
|66271|Missing rtSchedule field.|
|66272|Missing rtID field.|
|66273|Missing rtName field.|
|66274|Missing rtDescription field.|
|66275|Missing rtPolicyRef field.|
|66276|Missing rtMerchantID field.|
|66277|Missing rtStartDate field.|
|66278|Missing rtInitialDate field.|
|66279|Missing rtInitialAmount field.|
|66280|Missing rtFinalDate field.|
|66281|Missing rtFinalAmount field.|
|66282|Missing rtCycleAmount field.|
|66283|Missing rtCycleDuration field.|
|66284|Missing rtCycleDurationUnit field.|
|66285|Missing rtCycleCount field.|
|66286|Missing rtMerchantData field.|
|66287|Missing rtCloneFields field.|
|66288|Missing checkoutRef field.|
|66289|Missing checkoutRedirectURL field.|
|66290|Missing checkoutOptions field.|
|66291|Missing checkoutRequest field.|
|66292|Missing checkoutResponse field.|
|66293|Missing rtAgreementType field.|
|66294|Missing rtSequenceNumber field.|
|66295|Missing rtSequenceCount field.|
|66296|Missing itemProductURL field.|
|66297|Missing itemImageURL field.|
|66298|Missing itemSize field.|
|66299|Missing itemWeight field.|
|66300|Missing riskCheckPref field.|
|66301|Missing riskCheckOptions field.|
|66302|Missing cloneFields field.|
|66303|Missing customField field.|
|66560|Missing dccRef field.|
|66561|Missing dccProvider field.|
|66562|Missing dccRate field.|
|66563|Missing dccMargin field.|
|66564|Missing dccCommission field.|
|66565|Missing dccSource field.|
|66566|Missing dccCreated field.|
|66567|Missing dccExpires field.|
|66568|Missing dccCurrencyCode field.|
|66569|Missing dccAmount field.|
|66570|Missing dccAccepted field.|
|66592|Missing threeDSRef field.|
|66593|Missing threeDSVersion field.|
|66594|Missing threeDSRedirectURL field.|
|66595|Missing threeDSOptions field.|
|66596|Missing threeDSDetails field.|
|66597|Missing threeDSURL field.|
|66598|Missing threeDSRequest field.|
|66599|Missing threeDSResponse field.|
|66600|Missing threeDSPolicy field.|
|66608|Missing scaExemption field.|
|66628|Missing riskCheckPref field.|
|66656|Missing deviceType field.|
|66657|Missing deviceChannel field.|
|66658|Missing deviceIdentity field.|
|66659|Missing deviceTimeZone field.|
|66660|Missing deviceCapabilities field.|
|66661|Missing deviceAcceptContent field.|
|66662|Missing deviceAcceptCharset field.|
|66663|Missing deviceAcceptEncoding field.|
|66664|Missing deviceAcceptLanguage field.|
|66665|Missing deviceScreenResolution field.|
|66666|Missing deviceOperatingSystem field.|
|66688|Missing initiator field.|
|66689|Missing acquirerOptions field.|

#### Invalid Request Field Error Codes

| Code      | Description |
| ----------- | ----------- | 
|66304|Invalid request. No data posted to integration URL.|
|66305|Invalid merchantID field.|
|66306|Invalid merchantPwd field.|
|66307|Reserved for internal use. Contact customer support if this error occurs.|
|66308|Reserved for internal use. Contact customer support if this error occurs.|
|66309|Reserved for internal use. Contact customer support if this error occurs.|
|66310|Reserved for internal use. Contact customer support if this error occurs.|
|66311|Invalid action field.|
|66312|Invalid amount field.|
|66313|Invalid currencyCode field.|
|66314|Invalid cardNumber field.|
|66315|Invalid cardExpiryMonth field.|
|66316|Invalid cardExpiryYear field.|
|66317|Invalid cardStartMonth field. (Legacy field)|
|66318|Invalid cardStartYear field. (Legacy field)|
|66319|Invalid cardIssueNumber field. (Legacy field)|
|66320|Invalid cardCVV field.|
|66321|Invalid customerName field.|
|66322|Invalid customerAddress field.|
|66323|Invalid customerPostcode field.|
|66324|Invalid customerEmail field.|
|66325|Invalid customerPhone field.|
|66326|Invalid countyCode field.|
|66327|Invalid transactionUnique field.|
|66328|Invalid orderRef field.|
|66329|Invalid remoteAddress field.|
|66330|Invalid redirectURL field.|
|66331|Invalid callbackURL field.|
|66332|Invalid merchantData field.|
|66333|Reserved for internal use. Contact customer support if this error occurs.|
|66334|Invalid duplicateDelay field.|
|66335|Invalid itemQuantity field.|
|66336|Invalid itemDescription field|
|66336|Invalid itemAmount field.|
|66338|Invalid taxAmount field.|
|66339|Invalid discountAmount field.|
|66340|Invalid discountReason field.|
|66341|Invalid xref field.|
|66342|Invalid type field.|
|66343|Invalid signature field (field is required if message signing is enabled).|
|66344|Invalid authorisationCode field.|
|66345|Invalid transactionID field.|
|66346|Invalid threeDSRequired field.|
|66347|Invalid threeDSMD field.|
|66348|Invalid threeDSPaRes field.|
|66349|Invalid threeDSECI field.|
|66350|Invalid threeDSCAVV field.|
|66351|Invalid threeDSXID field.|
|66352|Invalid threeDSEnrolled field.|
|66353|Invalid threeDSAuthenticated field.|
|66354|Invalid threeDSCheckPref field.|
|66355|Invalid cv2CheckPref field.|
|66356|Invalid addressCheckPref field.|
|66357|Invalid postcodeCheckPref field.|
|66358|Invalid captureDelay field.|
|66359|Invalid orderDate field.|
|66360|Invalid grossAmount field.|
|66361|Invalid netAmount field.|
|66362|Invalid taxRate field.|
|66363|Invalid taxReason field.|
|66364|Invalid surchargeRules field.|
|66365|Reserved for internal use. Contact customer support if this error occurs.|
|66366|Invalid statementNarrative1 field.|
|66367|Invalid statementNarrative2 field.|
|66368|Invalid merchantName field.|
|66369|Invalid merchantCompany field.|
|66370|Invalid merchantAddress field.|
|66371|Invalid merchantTown field.|
|66372|Invalid merchantPostcode field.|
|66373|Invalid merchantCountryCode field.|
|66374|Invalid merchantPhone field.|
|66375|Invalid merchantMobile field.|
|66376|Invalid merchantEmail field.|
|66377|Invalid merchantWebsite field.|
|66378|Invalid merchantOrderRef field.|
|66379|Invalid merchantCustomerRef field.|
|66380|Reserved for internal use. Contact customer support if this error occurs.|
|66381|Invalid merchantType field.|
|66382|Reserved for internal use. Contact customer support if this error occurs|
|66383|Invalid merchantCategoryCode field.|
|66384|Invalid supplierName field.|
|66385|Invalid supplierCompany field.|
|66386|Invalid supplierAddress field.|
|66387|Invalid supplierTown field.|
|66388|Invalid supplierPostcode field.|
|66389|Invalid supplierCountryCode field.|
|66390|Invalid supplierPhone field.|
|66391|Invalid supplierMobile field.|
|66392|Invalid supplierEmail field.|
|66393|Invalid supplierCounty field.|
|66394|Invalid customerCompany field.|
|66395|Invalid customerTown field.|
|66396|Invalid customerCountryCode field.|
|66397|Invalid customerMobile field.|
|66398|Invalid customerCounty field.|
|66399|Invalid merchantCounty field.|
|66400|Invalid customerOrderRef field.|
|66401|Invalid customerMerchantRef field.|
|66402|Invalid customerVatNumber field.|
|66403|Invalid customerDateOfBirth field.|
|66404|Invalid deliveryName field.|
|66405|Invalid deliveryCompany field.|
|66406|Invalid deliveryAddress field.|
|66407|Invalid deliveryTown field.|
|66408|Invalid deliveryPostcode field.|
|66409|Invalid deliveryCountryCode field.|
|66410|Invalid deliveryPhone field.|
|66411|Invalid deliveryMobile field.|
|66412|Invalid deliveryEmail field.|
|66413|Reserved for future use. Contact customer support if this error occurs|
|66414|Invalid deliveryCounty field.|
|66415|Invalid deliveryFax field.|
|66416|Invalid cardExpiryDate field.|
|66417|Invalid cardStartDate field. (Legacy field)|
|66418|Invalid line items count, either too few or too many for processor.|
|66419|Invalid line items sequence, either not sequential or not 0 to 99.|
|66420|Invalid items field.|
|66421|Invalid itemGrossAmount field.|
|66422|Invalid itemNetAmount field.|
|66423|Invalid itemProductCode field.|
|66424|Invalid itemCommodityCode field.|
|66425|Invalid itemUnitOfMeasure field.|
|66426|Invalid itemUnitAmount field.|
|66427|Invalid itemDiscountAmount field.|
|66428|Invalid itemDiscountReason field.|
|66429|Invalid itemTaxRate field.|
|66430|Invalid itemTaxAmount field.|
|66431|Invalid itemTaxReason field.|
|66432|Invalid shippingTrackingRef field.|
|66433|Invalid shippingMethod field.|
|66434|Invalid shippingAmount field.|
|66435|Invalid shippingNetAmount field.|
|66436|Invalid shippingGrossAmount field.|
|66437|Invalid shippingTaxRate field.|
|66438|Invalid shippingTaxAmount field.|
|66439|Invalid shippingTaxReason field.|
|66440|Invalid shippingDiscountAmount field.|
|66441|Invalid shippingDiscoutReason field.|
|66442|Reserved for future use. Contact customer support if this error occurs.|
|66443|Reserved for future use. Contact customer support if this error occurs.|
|66444|Reserved for future use. Contact customer support if this error occurs.|
|66445|Reserved for future use. Contact customer support if this error occurs.|
|66446|Reserved for future use. Contact customer support if this error occurs.|
|66447|Reserved for future use. Contact customer support if this error occurs|
|66448|Invalid walletID field.|
|66449|Invalid walletName field.|
|66450|Invalid walletDesc field.|
|66451|Invalid walletData field.|
|66452|Invalid cardID field.|
|66453|Invalid cardName field.|
|66454|Invalid cardDesc field.|
|66455|Invalid cardData field.|
|66456|Invalid customerAddressID field.|
|66457|Invalid customerAddressName field.|
|66458|Invalid customerAddressDesc field.|
|66459|Invalid customerAddressData field.|
|66460|Invalid deliveryAddressID field.|
|66461|Invalid deliveryAddressName field.|
|66462|Invalid deliveryAddressDesc field.|
|66463|Invalid deliveryAddressData field.|
|66464|Invalid walletOwnerRef field.|
|66465|Invalid cardToken field.|
|66466|Invalid masterPassData field.|
|66467|Reserved for future use. Contact customer support if this error occurs.|
|66468|Invalid masterPassCheckoutOptions field.|
|66469|Invalid masterPassCallbackURL field.|
|66470|Invalid masterPassCheckoutURL field.|
|66471|Invalid masterPassToken field.|
|66472|Invalid masterPassVerifier field.|
|66473|Invalid masterPassResourceURL field.|
|66474|Invalid masterPassStatus field.|
|66475|Invalid masterPassWalletID field.|
|66476|Invalid handlingAmount field.|
|66477|Invalid insuranceAmount field.|
|66478|Invalid paymentMethod field.|
|66479|Invalid paymentToken field.|
|66512|Invalid receiverName field.|
|66513|Invalid receiverCompany field.|
|66514|Invalid receiverAddress field.|
|66515|Invalid receiverTown field.|
|66516|Invalid receiverPostCode field.|
|66517|Invalid receiverCountryCode field.|
|66518|Invalid receiverPhone field.|
|66519|Invalid receiverMobile field.|
|66520|Invalid receiverEmail field.|
|66521|Invalid receiverDateOfBirth field.|
|66522|Invalid receiverAccountNo field.|
|66523|Invalid receiverCounty field.|
|66524|Invalid receiverFax field.|
|66525|Invalid customerFax field.|
|66526|Invalid rtScheduleType field.|
|66527|Invalid rtSchedule field.|
|66528|Invalid rtID field.|
|66529|Invalid rtName field.|
|66530|Invalid rtDescription field.|
|66531|Invalid rtPolicyRef field.|
|66532|Invalid rtMerchantID field.|
|66533|Invalid rtStartDate field.|
|66534|Invalid rtInitialDate field.|
|66535|Invalid rtInitialAmount field.|
|66536|Invalid rtFinalDate field.|
|66537|Invalid rtFinalAmount field.|
|66538|Invalid rtCycleAmount field.|
|66539|Invalid rtCycleDuration field.|
|66540|Invalid rtCycleDurationUnit field.|
|66541|Invalid rtCycleCount field.|
|66542|Invalid rtMerchantData field.|
|66543|Invalid rtCloneFields field.|
|66544|Invalid checkoutRef field.|
|66545|Invalid checkoutRedirectURL field.|
|66546|Invalid checkoutOptions field.|
|66547|Invalid checkoutRequest field.|
|66548|Invalid checkoutResponse field.|
|66549|Invalid rtAgreementType field.|
|66550|Invalid rtSequenceNumber field.|
|66551|Invalid rtSequenceCount field.|
|66552|Invalid itemProductURL field.|
|66553|Invalid itemImageURL field.|
|66554|Invalid itemSize field.|
|66555|Invalid itemWeight field.|
|66556|Invalid riskCheckPref field.|
|66557|Invalid riskCheckOptions field.|
|66558|Invalid cloneFields field.|
|66559|Invalid customField field.|
|66816|Invalid dccRef field.|
|66817|Invalid dccProvider field.|
|66818|Invalid dccRate field.|
|66819|Invalid dccMargin field.|
|66820|Invalid dccCommission field.|
|66821|Invalid dccSource field.|
|66822|Invalid dccCreated field.|
|66823|Invalid dccExpires field.|
|66824|Invalid dccCurrencyCode field.|
|66825|Invalid dccAmount field.|
|66826|Invalid dccAccepted field.|
|66848|Invalid threeDSRef field.|
|66849|Invalid threeDSVersion field.|
|66850|Invalid threeDSRedirectURL field.|
|66851|Invalid threeDSOptions field.|
|66852|Invalid threeDSDetails field.|
|66853|Invalid threeDSURL field.|
|66854|Invalid threeDSRequest field.|
|66855|Invalid threeDSResponse field.|
|66856|Invalid threeDSPolicy field.|
|66864|Invalid scaExemption field.|
|66880|Invalid riskCheckPref field.|
|66912|Invalid deviceType field.|
|66913|Invalid deviceChannel field.|
|66914|Invalid deviceIdentity field.|
|66915|Invalid deviceTimeZone field.|
|66916|Invalid deviceCapabilities field.|
|66917|Invalid deviceAcceptContent field.|
|66918|Invalid deviceAcceptCharset field.|
|66919|Invalid deviceAcceptEncoding field.|
|66920|Invalid deviceAcceptLanguage field.|
|66921|Invalid deviceScreenResolution field.|
|66922|Invalid deviceOperatingSystem field.|
|66944|Invalid initiator field.|
|66945|Invalid acquirerOptions field.|

### AVS/CV2 Check Response Codes 

The AVS/CV2 Check Response Message field `avscv2ResponseMessage` is sent back in the raw form that is received from the Acquiring bank and can contain the following values:

| Response      | Description |
| ----------- | ----------- | 
| ALL MATCH | AVS and CV2 match| 
| SECURITY CODE MATCH ONLY |CV2 match only | 
| ADDRESS MATCH ONLY | AVS match only | 
| NO DATA MATCHES | No matches for AVS and CV2 | 
| DATA NOT CHECKED | Supplied data not checked | 
| SECURITY CHECKS NOT SUPPORTED | Card scheme does not support checks | 

The AVS/CV2 Response Code `avscv2ResponseCode` is made up of six characters and is sent back in the raw form that is received from the Acquiring bank. The first 4 characters can be
decoded as below, the remaining 2 characters are currently reserved for future use:

| Position 1 Value      | Description |
| ----------- | ----------- | 
| 0 | No Additional information available.| 
| 1 | CV2 not checked| 
| 2 | CV2 matched.| 
| 4 | CV2 not matched| 
| 8 | Reserved| 

| Position 2 Value      | Description |
| ----------- | ----------- | 
| 0 | No Additional information available.| 
| 1 | Postcode not checked| 
| 2 | Postcode matched.| 
| 4 | Postcode not matched| 
| 8 | Postcode partially matched| 

| Position 3 Value      | Description |
| ----------- | ----------- | 
| 0 | No Additional Information| 
| 1 | Address numeric not checked| 
| 2 | Address numeric matched| 
| 4 | Address numeric not matched| 
| 8 | Address numeric partially matched| 

| Position 4 Value      | Description |
| ----------- | ----------- | 
| 0 | Authorising entity not known| 
| 1 | Authorising entity – merchant host| 
| 2 | Authorising entity – acquirer host| 
| 4 | Authorising entity – card scheme | 
| 8 | Authorising entity – issuer | 

## 3-D Secure Authentication Data {#3dSecureAuthenticationData}

The 3-D Secure system uses various data fields to report the authentication status of the Cardholder. Each 3-D Secure version may use slightly different terminology for the fields and have slightly different values but for ease of use the Gateway uses the terminology and values as described in this appendix.

The field’s values would normally be populated by the Gateway’s 3DS Server component (The 3DS Server is the Gateway/Merchant component that provides the interface with the 3DS Directory Server), however you may choose to use your own 3DS Server component and provide the values.

### 3D Secure enrolment status

The `threeDSEnrolled` field indicates if the card is enrolled in the 3-D Secure program.

The value is determined if the card number is within one of the enrolled ranges downloaded daily from the Directory Server using a Preparation Request/Response (PReq/PRes) message.

The field can contain one of the following values:

**Y – Enrolled**. The card is enrolled in the 3-D Secure program and the payer is eligible for authentication
processing.

**N - Not Enrolled**. The checked card is eligible for the 3-D Secure (it is within the card association’s range of accepted cards) but the card issuing bank does not participate in the 3-D Secure program. If the Cardholder later disputes the purchase, the issuer may not submit a chargeback to you.

**U - Unable To Verify Enrolment**. The card associations were unable to verify whether the Cardholder is registered. As the card is ineligible for 3-D Secure, you can choose to accept the card nonetheless and precede the purchase as non-authenticated and submits authorisation with ECI 07.

**E - Error Verifying Enrolment**. The Gateway encountered an error. This card is flagged as 3-D Secure ineligible. The card can be accepted for payment at your discretion.

### 3DS Authentication status

The `threeDSAuthenticated` field indicates if the cardholder has been authenticated by the 3-D Secure program.

The value is provided by the Directory Server either on requesting authentication in the Authentication Response (ARes) message, in the case of a frictionless flow, or after a Cardholder
challenge in the Result Request (RReq) message, in the case of a challenge flow.

The field can contain one of the following values:

**Y - Authentication Successful**. The Issuer has authenticated the Cardholder by verifying the identity information or password. A CAVV and an ECI of 5 is returned. The card is accepted for payment and authentication data passed to authorisation processing.

**A - Attempted Authentication**. A proof of authentication attempt was generated. The Cardholder is not participating, but the attempt to authenticate was recorded. The card can be accepted for payment at your discretion and authentication data passed to authorisation processing.

**N - Not Authenticated**. The Cardholder did not complete authentication and the card should not be accepted for payment.

**R – Rejected By Issuer**. The Issuer rejected the transaction and must not be accepted for payment.

**D – Decoupled Challenge Required**. Decoupled authentication confirmed.

**I – Information Only**. 3DS Requestor challenge preference acknowledged.

**U - Unable To Authenticate**. The authentication was not completed due to technical or another problem. A transmission error prevented authentication from completing. The card can be accepted for payment at your discretion, but no authentication data will be passed on to authorisation processing.

**E - Error Checking Authentication**. The Gateway encountered an error. The card can be accepted for payment at your discretion, but no authentication data will be passed on to authorisation processing.


## Signature Calculation {#signatureCalculation} 

It is highly recommended that transactions are protected using message signing. The signing process offers a quick and simple way to ensure that the message came from an authorised source and has not been tampered with during transmission.

Signing, however, must be completed on your servers and never left for the Customer’s browser to complete in JavaScript, as this would mean revealing your secret signature code to anyone who viewed the JavaScript code in the browser.

Signatures are especially important when a transaction is sent from a browser’s payment form via the use of hidden form fields because the Customer can easily use tools built into their browser to modify these hidden fields and change items such as the amount they should be charged.

Care must be taken to ensure that fields are sorted before signing into ascending field name order according to their numeric ASCII value. Some languages natural sort routines do NOT use ASCII order by default and so need to be adjusted or alternative methods used.

Also, when signing requests with fields formatted as per the [format guide](overview#fieldFormats), only the root integration field is included in any sorting as the sub-fields are part of the value and should not have their order changed. The sub-fields must then be sent in the same order as they were hashed if added as hidden fields in HTML forms etc.
The section below gives a step-by-step example of how to sign a transaction, complete with coding examples using the PHP language.

### Example Signature Key 

```php
$key = 'DontTellAnyone'
```

### Example Transaction 

```php
$tran = array ( 
    'merchantID' => '100001',  //merchantID will be provided by the Handpoint support team
    'action' => 'SALE', //action could be SALE, VERIFY or PREAUTH 
    'type' => '1', //1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA)
    'currencyCode' => '826', //ISO 3-letter currency code. 826 -> GBP
    'countryCode' => '826', //ISO 3-letter country code. 826 -> United Kingdom
    'amount' => '2691', //Either major currency units includes a single decimal point such as ’10.99'. 
                      //Minor currency units contains no decimal points such as ‘1099
    'transactionUnique' => '55f025addd3c2', //Unique identifier for this transaction. This is an added security feature to combat transaction spoofing
    'orderRef' => 'Signature Test',  //Free format text field to store order details, reference numbers, etc. for the Merchant’s records.
    'cardNumber' => '4929 4212 3460 0821', //Card Number
    'cardExpiryDate' => '1213', ) //Card expiry date
```
:::tip
The transaction used for signature calculation must not include any 'signature' field as this will be added after signing when its value is known.
:::

### Step 1 - Sort transaction values by their field name

Transaction fields must be in ascending field name order according to their numeric ASCII value.

```php
ksort($tran);
array ( 'action' => 'SALE', 'amount' => '2691', 'cardExpiryDate' => '1213', 'cardNumber' => '4929 4212 3460 0821', 'countryCode' => '826', 'currencyCode' => '826', 'merchantID' => '100001', 'orderRef' => 'Signature Test', 'transactionUnique' => '55f025addd3c2', 'type' => '1' )
```

### Step 2 - Create url encoded string from sorted fields

Use RFC 1738 and the application/x-www-form-urlencoded media type, which implies that spaces are encoded as plus (+) signs.

```php
$str = http_build_query($tran, '', '&');

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1
```

### Step 3 - Normalise all line endings in the url encoded string

Convert all CR NL, NL CR, CR character sequences to a single NL character.

```php
$str = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $str);

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1
```
### Step 4 - Append your signature key to the normalised string

The signature key is appended to the normalised string with no separator characters.

```php
$str .= 'DontTellAnyone'

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1DontTellAnyone
```

### Step 5 - Hash the string using the SHA-512 algorithm

The normalised string is hashed to a more compact value using the secure SHA-512 hashing algorithm.

```php
$signature = hash('SHA512', $str);

da0acd2c404945365d0e7ae74ad32d57c561e9b942f6bdb7e3dda49a08fcddf74fe6af6b23b8481b8dc8895c12fc21c72c69d60f137fdf574720363e33d94097
```

### Step 6 - Add the signature to the transaction form or post data

The signature should be sent as part of the transaction in a field called 'signature'.

```php
<input type="hidden" name="signature" value="<?=$signature?>">
or
$tran['signature'] = $signature;
```


### Sample Code PHP

Example of calculating the signature in PHP:

```php

<?PHP 

//Merchant signature key
$key = 'm3rch4nts1gn4tur3k3y';


//Request Information
$tran = array (
'merchantID' => '100001',  //merchantID will be provided by the Handpoint support team
    'action' => 'SALE', //action could be SALE, VERIFY or PREAUTH 
    'type' => '1', //1 –> E-commerce (ECOM), 2 –> Mail Order/Telephone Order (MOTO), 9 –> Continuous Authority (CA)
    'currencyCode' => '826', //ISO 3-letter currency code. 826 -> GBP
    'countryCode' => '826', //ISO 3-letter country code. 826 -> United Kingdom
    'amount' => '2691', //Either major currency units includes a single decimal point such as ’10.99'. 
                      //Minor currency units contains no decimal points such as ‘1099
    'transactionUnique' => '55f025addd3c2', //Unique identifier for this transaction. This is an added security feature to combat transaction spoofing
    'orderRef' => 'Signature Test',  //Free format text field to store order details, reference numbers, etc. for the Merchant’s records.
    'cardNumber' => '4929 4212 3460 0821', //Card Number
    'cardExpiryDate' => '1213',
);
 

 ksort($tran);

 $str = http_build_query($tran, '', '&');

 $str = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $str);

 $str .= '3obzOxdqw6e1u';

 $signature = hash('SHA512', $str);

 //Prints the signature
 printf("Signature %s", $signature);
 ?>

 ```

## Capture Delay {#captureDelay}

### Overview

Capture Delay enables you to specify a delay between the authorisation of a payment and its capture. This allows you time to verify the order and choose whether to fulfil it or cancel it. This can be very helpful in preventing chargebacks due to fraud.

When NOT using capture delay, payments are authorised and captured immediately - funds are automatically debited from the Customer’s credit or debit card at that time.

When using capture delay, the payment is authorised only at the time of payment - funds are reserved against the credit or debit card and will not be debited until the payment is captured. 

The Customer experience with capture delay is the same as when capture delay is not used. The Customer will not know whether you are using capture delay or not.

If you choose to use capture delay, you can use the captureDelay request field to specify the number of days for which capture is delayed, within a range of 0 to 30 days. Alternatively, you can use the value -1 or ‘never’ to specify that the Gateway should never automatically capture in which case you must manually capture.

The Gateway will automatically capture the transaction after any delay specified unless you manually cancel or capture the transaction, using either the Direct Integration or via the Merchant Management System (MMS).

Note that some cards require capture within 4 to 5 days - if payment is not automatically captured within that period, the transaction will expire, and the reserved funds will be released to the Customer.

### Why Use Capture Delay?

Capture delay allows you to accept online orders normally but allows you to cancel any transactions that you cannot or will not fulfil, thereby reducing the risks of chargeback. If you receive an order that appears to be fraudulent or that you cannot or do not wish to fulfil, you can simply cancel the transaction.

Note: Cancelling a transaction may not always reverse the authorisation and release the funds back to the Customer. This is dependent on the Acquirer and in these cases the authorisation will never be settled and will be left to expire releasing any reserved funds. The time taken for this varies between cards.

Some Acquirers do not support delayed capture, in which case the Hosted Integration will return a responseCode of 66358 (INVALID CAPTURE DELAY).

## Transaction Types 

The Gateway supports card not present (CNP) types of transactions, made where the Cardholder does not or cannot physically present the card for your visual examination at the time that an order is placed and payment effected.
The type of transaction required is specified using the `type` request field when performing a new payment transaction.

### E-Commerce (ECOM) {#ecommerce}

E-commerce transactions are supported by the Gateway by using a transaction `type` of `1`. They are designed for you to accept payments via a website, such as a shopping cart payment. E-commerce transactions MUST use advance fraud detection, such as 3-D Secure V2.

### Mail Order/Telephone Order (MOTO){#moto}

Mail Order/Telephone Order transactions are supported by the Gateway by using a transaction `type` of `2`. They are designed for you to build your own virtual terminal system to enter remote order details. MOTO transactions cannot use 3-D Secure as the cardholder is not able to perform the challenge.

Your Acquirer may need to enable MOTO capabilities on your main acquiring account, or they provide a separate acquiring account which will be available through its own Gateway Merchant Account.

### Continuous Authority (CA) {#continuousAuthority}

Continuous Authority transactions are supported by the Gateway by using a transaction `type` of `9`. They are designed for you to make subscription transactions. 

The following transaction types are considered as Continuous Authority (CA) Payments :
- Instalment Payments: A transaction in a series of transactions that use a stored credential and that represent Consumer agreement for the merchant to initiate one or more future transactions over a period for a single purchase of goods or services. An example of such a transaction is a higher purchase repayment.

- Recurring Payments: A transaction in a series of transactions that use a stored credential and that are processed at fixed, regular intervals (not to exceed one year between transactions), representing Consumer agreement for the merchant to initiate future transactions for the purchase of goods or services provided at regular intervals. An example of such a transaction is a gym membership subscription.

Your Acquirer may need to enable Continuous Authority capabilities on your main acquiring account, or they provide a separate acquiring account which will be available through its own Gateway Merchant Account.

The Gateway offers a mean of automating the taking of regular CA transactions using [Recurring Transaction Agreements (RTA)](recurringtransactionagreements).

## Transaction Cloning {#transactionCloning}

## Payment Tokenisation {#paymentTokenisation}

## AVS / CV2 Check Response Codes {#AvsResponseCodes}

## Transaction States {#transactionStates}

## Card Identification {#cardIdentification}

## Device Information Fields {#deviceInformationFields}

## SCA Using 3-D Secure {#scaUsing3dSecure}

## Exemptions to Strong Customer Authentication {#scaExemptions}



## Merchant Request Fields {#merchantRequestFields}

## Merchant Account Mapping {#merchantAccountMapping}

## Card Identification {#cardIdentification}

## Authorise, Capture and Settlement {#authoriseCaptureSettlement}