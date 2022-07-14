---
sidebar_position: 13
---

# Recurring Transaction Agreements

## Background

A Recurring Transaction Agreement (RTA) is used to request that the Gateway should perform repeat payments on your behalf, using pre-agreed amounts and schedules.

An RTA can be configured easily and quickly, using the Merchant Management System (MMS). An RTA can also be set up while performing the initial transaction request, by including the integration [RTA request fields](#rtaRequestFields). The RTA is only set up in the transaction results in a successful payment authorisation.
The initial transaction should be either SALE or VERIFY transaction and the `rtAgreementType` field should be provided to indicate whether the transactions are part of a recurring or instalment.

Merchants who use this system to implement billing or subscription type payments must use recurring or instalment type Continuous Authority (CA) transactions to comply with Card Payment Scheme practices. Your Acquirer may refuse to accept the recurring transactions if they are not subject to an agreement between yourself and your Customer.

The maximum period between recurring transactions is 13 months, however individual Acquirers may impose a shorter period.

Refer to the [Credentials on File](credentialsonfile) section for more information on the different types of repeat or recurring transactions.

## Scheduling

There are two different types of scheduling available when requesting the Gateway to take recurring transactions automatically on the Merchant’s behalf. In addition, a start date can be provided to allow for a recurring subscription with an initial free trial period.

### Fixed Scheduling 

Fixed scheduling causes the subsequent transaction to be taken at fixed intervals of time and for fixed amounts. A different initial date and amount or final date and amount can be provided for use when the agreed payment term or amount doesn’t exactly divide by the fixed time intervals.

Fixed scheduling is specified by providing an `rtScheduleType` field with a value of ‘fixed’ and providing the `rtCycleDuration`, `rtCycleAmount` and `rtCycleCount` fields to define the interval at which transactions should be taken and the number of transactions to take.

An `rtCycleCount` field value of 0 can be provided to indicate that transactions should be taken ad-infinitum until the RTA is stopped.

### Variable Scheduling {#variableScheduling}

Variable scheduling causes the subsequent transaction to be taken on prespecified dates and for prespecified amounts.

Variable scheduling is specified by providing an `rtScheduleType` field with a value of ‘variable’ and providing the `rtSchedule` field with a value containing an array of one or more schedule records.

Each schedule record must contain the following fields:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| date | <span class="badge badge--primary">Yes</span> | Date on which to take a payment.|
| amount | <span class="badge badge--primary">Yes</span> | Amount to take on the provided date.|

The schedule records should be passed in a sequential array of records, either as nested records or serialised records as described in the [format guide](overview#fieldFormats). The record field names are case sensitive.

## Request Fields {#rtaRequestFields}

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| rtName | No| Free format short name for the agreement.|
| rtDescription | No| Free format longer description for the agreement.|
| rtPolicyRef | No| Merchant Policy Reference Number (MPRN).|
| rtAgreementType | No| Recurring transaction agreement type. Indicates the type of Continuous Payment Authority or Repeat Billing agreement made with the Cardholder.<br></br><br></br> Possible values are:<br></br> recurring – recurring type CPA agreed.<br></br> instalment – instalment type CPA agreed.|
| rtMerchantID | No| Merchant Account ID to use for the recurring transactions (defaults to merchantID).|
| rtStartDate | No| Start date of agreement (defaults to date received).|
| rtScheduleType | No| Schedule type. <br></br><br></br>Possible values are: <br></br>fixed – fixed interval schedule (default). <br></br>variable – variable interval schedule.|
| rtSchedule | <span class="badge badge--primary">Yes</span>| Nested array or serialised string containing payment schedule information as per the [variable scheduling](#variableScheduling) section.<br></br><br></br>For use with variable schedules only.|
| rtInitialDate | No| Date of initial payment (defaults to `rtStartDate`).<br></br><br></br>For use with fixed schedules only.|
| rtInitialAmount | No| Amount of initial payment (defaults to `rtCycleAmount`).<br></br><br></br>For use with fixed schedules only.|
| rtFinalDate | No| Date of final payment.<br></br><br></br>For use with fixed schedules only.|
| rtFinalAmount | No| Amount of final payment (defaults to `rtCycleAmount`).<br></br><br></br>For use with fixed schedules only.|
| rtCycleAmount | No| Amount per cycle (defaults to `amount`).<br></br><br></br>For use with fixed schedules only.|
| rtCycleDuration | <span class="badge badge--primary">Yes</span>| Length of each cycle in `rtCycleDurationUnit` units.<br></br><br></br>For use with fixed schedules only.|
| rtCycleDurationUnit | <span class="badge badge--primary">Yes</span>| Cycle duration unit. One of: day, week, month or year.<br></br><br></br>For use with fixed schedules only.|
| rtCycleCount | <span class="badge badge--primary">Yes</span>| Number of cycles to repeat (zero to repeat forever).<br></br><br></br>For use with fixed schedules only.|
| rtMerchantData | No| Free format Merchant data field.|
| rtCloneFields | No| Fields to clone from one recurring transaction to the next. Refer to [Transaction Cloning](annexes#transactionCloning)|

## Response Fields

| Name      | Returned | Description |
| ----------- | ----------- | ----------- |
| rtID | Always| Recurring Transaction Agreement ID.|
| rtResponseCode | Always| Result of setting up RT Agreement.Refer to [Response Codes](annexes#responseCodes) for details. |
| rtResponseMessage | Always| Description of above response code.|


