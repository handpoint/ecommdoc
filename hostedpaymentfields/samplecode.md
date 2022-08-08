---
sidebar_position: 2

---

# Sample Code & Examples

## Sample Code - Hosted Payment Fields


| Cardholder Name | Card Number | Expiry Date | CVV/CVC2 | 
| ----------- | ----------- | ----------- | ----------- |
|Any cardholder name (ex: John Doe) | 5573 4712 3456 7898 | Any date in the future (12/2031) | 159 |


<iframe width="100%" height="600" src="//jsfiddle.net/Handpoint/3h98fekp/embedded/html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## Hosted Payment Fields Library

A simple client-side script is available to support the displaying of Hosted Payment Fields in your payment form.

The library is available as a JavaScript script and is based around two classes: the `Form` and `Field` classes. The script is compatible with most modern web browsers.

The script can be loaded directly from our Gateway server as follows:

```javascript
<script src="https://commerce-api.handpoint.com/sdk/web/v1/js/hostedfields.min.js"></script>
```

The script requires the jQuery API, which must be loaded prior to the script.

Hosted Payment Fields are a set of prebuilt JavaScript UI components that can be used by your website’s HTML payment form to collect sensitive payment details without those details touching your server. They provide you with the PCI benefits of using a Hosted Payment Page, while allowing you the ability to design and implement your own payment forms.

There are 6 predefined Hosted Payment Fields available as follows:
- cardNumber – collects the card number.
- cardCVV – collects the card cvv.
- cardExpiryDate – collects the card expiry month and year.
- cardStartDate – collects the card start/issue month and year.
- cardIssueNumber – collects the card issue number.
- cardDetails – collects the card number, expiry date and cvv in a single field.

The ``cardNumber`` field is designed to collect a card number, including an icon used to display the card type. The field will only accept digits and spaces and validate that any entered value is a correctly formatted card number and insert spaces at the correct positions for the card type as the number is typed.

The `cardCVV` field is designed to collect a card CVV. The field will only accept digits and will validate that any entered value is a correctly formatted CVV, taking into account the card type as determined by an associated `cardNumber` field.

The `cardExpiryDate` and `cardStartDate` fields are designed to collect a card expiry date and card issue date respectively. The fields can render as a pair of select controls containing the months and a suitable range of years; or as an input control that will only allow digits to be entered and automatically formatted as a month / year entry. The field will validate that any entered value is a valid month and year combination.

The `cardIssueNumber` field is designed to collect a card issue number. The field will only accept digits and will validate that any entered value is a correctly formatted issue number.

The `cardDetails` field is designed to collect all of the essential card details. It combines the `cardNumber`, `cardExpiryDate` and `cardCVV` fields into a single line compound field design to allow easy entry of the card details and to complement the look of your checkout.

These hosted fields can be used on your payment form alongside any standard HTML form fields, for example, any collecting the Cardholder’s billing or delivery addresses and any other order information you require.

The field type is either: passed as the value of the `type` option the `Field` construction, provided by the HTML element’s meta data; or provided via the HTML element’s type attribute (prefixed with the ‘hostedfield:’ name space).

The following example shows all three approaches to specifying the field type:

```xml
1. `<input type="hostedfield:cardNumber" name="card-number">`
2. `<div class="hostedfield" data-hostedfield-type="cardExpiryDate"></div> `
3. `<input data-hostedfield='{"type":"cardCVV"}'>`
```

### Library Namespace

To avoid polluting the global namespace, the library extends the global `window` object with a `hostedFields` object containing the following properties:
- `forms` – array containing all the instantiated Form objects.
- `classes` – array containing all the instantiable classes.
    - `form` – `Form` class prototype.

### Form Construction 

The construction method can be used to prepare a HTML FORM for use with Hosted Payment Field components. The method signature is as follows:

`Form(element, options)`

The `element` parameter should be the DOM node of an existing FORM tag.

The `options` parameter should be object containing one of more of the following optional properties:
- `autoSetup` – boolean indicating whether setup should be handled automatically.
- `autoSubmit` – boolean indicating whether submission should be handled automatically.
- `merchantID` – string containing the merchantID the payment request is for.
- `stylesheet` – string containing DOM selector for any stylesheets to be used.
- `tokenise` – string/array/object specifying fields whose values should be tokenised.
- `fields` – object containing field configuration by field type.
- `locale` – string containing the desired locale.
- `classes` – object containing names of extra CSS classes to use.
- `submitOnEnter` – boolean indicating whether the enter key should cause the form to submit.
- `nativeEvents` – boolean indicating that native browser events should be fired.

Any `options` parameter will be merged with those provided via meta data supplied, using data-hostedfield and/or `data-hostedfield-<option>` attributes; or via existing attributes or properties of the `element`.

The `autoSetup` option can be used to disable the automatic creation of `Field` objects for the FORM child controls by calling the` autoSetup()` method during the `Form` construction. If automatic setup is disabled, then you must manually instantiate `Field` objects and attach them to the `Form` as required, using the `addField()`method. This option or manually calling the `autoSetup()` method minimises the amount of JavaScript you have to write. Automatic operation is good if you don’t need to customise the operation or can’t customise it by reacting to the `Form` or `Field` events. The option defaults to true and cannot be changed once the `Form` has been created.

The `autoSubmit` option can be used to disable the automatic handling of the FORM submission via the `autoSubmit()` method. If automatic submission is disabled, then you must manually retrieve the sensitive payment details by calling `getPaymentDetails()` and include them in the form submission data. This option or manually calling the `autoSubmit()` method minimises the amount of JavaScript you have to write. Automatic operation is good if you don’t need to customise the operation or can’t customise it by reacting to the `Form` or `Field` events. The option defaults to true and cannot be changed once the `Form` has been created.

The `merchantID` option can be used to specify the `merchantID` with which the final `paymentToken` will be used. The option defaults to the value of any child INPUT node whose name is ‘merchantID’ and can be changed at runtime by calling the `setMerchantID()` method or by altering the options using the jQuery `hostedForm()` plugin method.

The `stylesheet` option can be used to specify a DOM selector used to locate stylesheets that should be parsed for styles related to the Hosted Payment Fields. The option defaults to the DOM selector string `‘link.hostedfield[rel=stylesheet], style.hostedfield` and can be changed at runtime by calling the `setStylesheet()` method; or by altering the options using the jQuery `hostedForm()` plugin method.

The `tokenise` option can be used to specify addition FORM controls whose values, as returned by the jQuery.val() method, should be included in the final `paymentToken`.
The option’s value must be either:
- A string containing a DOM selector used to select one or more controls.
- An array containing values used to jQuery.filter() down to one or more controls.
- An object whose properties are the name of fields to tokenise and whose values are objects containing a selector property used to select a control.

For the first two, the tokenised field’s name will be taken from the controls `data-hostedfield-tokenise` attribute or name attribute. For the third, the name is property name in the tokenise object. If the field’s name is of the format `paymentToken[<name>]`, then only the `<name>`part is used. The option defaults to the DOM selector string `INPUT.hostedfield-tokenise:not(:disabled)`, `INPUT[data-hostedfield-tokenise]:not(:disabled)`, `INPUT[name^="paymentToken["]:not(:disabled)` and cannot be changed once the `Form` has been created.

The `fields` options can be used to specify default options for the different types of Hosted Payment Fields. The option’s value should be an object whose properties are the fields type or the wildcard type ‘any’ and whose values are objects whose properties are the default options for fields of that type. The values can also contain a selector property containing a DOM `selector` that is used during the automatic setup stage to select a FORM’s child element to add as a `Field` of the specified type automatically. The option has no default value and cannot be changed once the `Form` has been created.

The `locale` option can be used to specify the language that should be used by the Hosted Payment Fields attached to this `Form`. The option defaults to the value provided by any lang attribute on the `element` or closest ancestor and cannot be changed once the Form has been created.

The `classes` options can be used to specify additional CSS class names to add in addition to the default classes. The value is an object whose properties are the default class name and whose values are a string containing the additional class name(s) to use. The option has no default and cannot be changed once the `Form` has been created.

The `submitOnEnter` option can be used to specify if pressing the enter key when typing a Field value should cause the `Form` to submit. The option defaults to false and cannot be changed once the `Form` has been created.

The `nativeEvents` option can be used to specify that any associated native event should be fired when a ‘hostedField:’ prefixed `Field` event is fired. For example, when enabled if the ‘hostedfield:mouseover’ event is fired, then the native ‘mouseover’ event is also fired. The option defaults to false and cannot be changed once the Form has been created.

If not explicitly constructed, a `Form` object will be automatically instantiated and attached to the FORM DOM node as soon as any `Field` object is instantiated on a child DOM node.

Example Form construction is as follows:

```javascript
 var form = new window.hostedFields.classes.Form(document.forms[0],{
    // Auto setup the form creating all hosted fields (default)
    autoSetup: true,

    // Auto validate, tokenise and submit the form (default)
    autoSubmit: true,

    // Additional fields to tokenise
    tokenise: '.add-to-token',

    // Stylesheet selection
    stylesheets: '#hostedfield-stylesheet',

    // Optional field configuration (by type)
    fields: {
        any: {
            nativeEvents: true
        },
        cardNumber: {
            selector: $('#form2-card-number'),
            stylesheet: $('style.hostedform, style.hostedform-card-number')
        }
    },

    // Additional CSS classes
    classes: {
        invalid: 'error'
    }
 }); 
```
Or using meta data on the HTML FORM element:

```html
<form data-hostedfields='{"autoSetup":true,"autoSubmit":true,"tokenise":".add-totoken","stylesheets":"#hostedfieldstylesheet","fields":{"any":{"nativeEvents":true},"cardNumber":{"selector":"#form2-cardnumber","stylesheet":"style.hostedform, style.hostedform-cardnumber"}},"classes":{"invalid":"error"}}' method="post" novalidate="novalidate" lang="en">
<script>
var form = new window.hostedFields.classes.Form{document.forms[0]);
 </script> 
```

### Form Methods 

The follow methods are made available by the Form class:

`void autoSetup()`

Automatically setup the form by scanning the Form element for child nodes to control as Hosted
Payment Fields. Child nodes are selected if they:
- have a type attribute with a hostedfield:`<type>` value (INPUT nodes only).
- have a data attribute with a hostedfield.`<type>` property.
- match a DOM selector provided by the fields.`<type>`.selector option.
If multiple selection criteria are present, then they must all specify the same Field type or an
exception is thrown.

This method is called during the `Form` construction unless the `autoSetup` option is false.

`void autoSubmit()`

Automatically handles any attempted FORM submission by checking the FORM’s controls are valid by calling the `validate()` method; and then requesting the `paymentToken` using the `getPaymentDetails()` method; and finally adding the token to the forms fields using the `addPaymentToken()` method. Failure to validate or request the payment token will cause the form submission to be stopped.

You can affect the automatic submission stages by listening for events and preventing their
default actions. 

This method is attached to the FORM submit event during the Form construction unless the `autoSubmit` option is false, or the `autoSubmit` option is null and the `autoSetup` option is false.

If automatic submission is disabled, then you must react to the FORM’s submit event and then
request the `paymentToken` using the `getPaymentDetails()` method and ensure that the token is sent as part of the form’s data.

`boolean addField(Field f)`

Add a hosted `Field` to the `Form`.

Returns true if successful, false otherwise.

`boolean delField(Field f)`

Remove a hosted `Field` from the `Form`.

Returns true if successful, false otherwise.

`promise validate(boolean submitting)`

Validate all `Field` values on the `Form`, either during submission or not.

Returns a promise that will be resolved when the validation is complete.

`object[] getInvalidElements()`

Get details about all invalid FORM controls (not just invalid hosted `Field` elements).

Returns an array of objects containing the following properties:
- element – DOM element.
- message – DOM elements validationMessage property or ‘Invalid value’.
- label – associated LABEL text.
- field – Field instance (if DOM element is a hosted Field).

`object getValidationErrors()`

Get the validation errors for all invalid FORM controls (not just invalid hosted `Field` elements).

Returns an object whose properties are the associated labels, names or id of the invalid FORM
controls and whose values are the error message for that control.

`promise getPaymentDetails(object tokenData, boolean validate)`

Gets the payment details, generating a `paymentToken` containing the hosted Field values; any
values specified by the `tokenise` option; and any passed `tokenData`. The Form will be
validated first if required.

Returns a promise that will be resolved when the payment details have been obtained, passing
the details as an object containing the following properties:
- success – boolean true if successful, false otherwise.
- message – string containing message to display if not successful.
- errors – object containing details about invalid payment data.
- invalid – object as returned by getValidationErrors() method.
- paymentToken – string containing generated paymentToken.

`void addPaymentToken(string token)`

Add the payment token as the value of a Form child INPUT whose `name` is ‘paymentToken’,
creating the control if needed. Any created control will be given a type of ‘hidden’.

`void setMerchantID(string merchantID)`

Set the `merchantID` used by the payment form.

`void setStylesheet(string selector)`

Set the DOM selector used to select the stylesheet(s) used by the `Form`.

`object defaultFieldOptions(string type)`

Get any default field options specified via the `fields` option, resulting from the merger of its
optional any and `<type>`properties.

Returns an object whose properties are the default options.

`void forceSubmit()`

Forcefully submit the FORM `element` as if a child submit button had been clicked.

`void reset()`

Reset all the `Form`, setting all `Field` values back to their initial values.

`void destroy()`

Destroys the `Form`, reverting its `element` back to its original state.

### Form Events 

The following events may be fired by the `Form` object and you can use these to hook into and
modify the object’s behaviour:

| Event Name | Description |
| ----------- | ----------- | 
| create | Fired when a Form has been created. | 
| destroy |Fired when a Form has been destroyed.| 
| presubmit | Fired by the autoSubmit() method prior to handling the submission. You can prevent the handling of the submission and handle it yourself by calling the Events preventDefault() method. | 
| valid | Fired by the autoSubmit() method if the FORM contains valid data prior to requesting the payment details. You can prevent the continued handling of the submission and handle it yourself by calling the Events preventDefault() method or by invalidating the FORM. | 
| submit-invalid  | Fired by the autoSubmit() method if the FORM contains invalid data prior to displaying the validity using the DOM reportValidity() method. You can prevent the reportValidity() call and display the validity yourself by calling the Events preventDefault() method.| 
| submit | Fired by the autoSubmit() method prior to submitting the FORM. You can prevent the FORM from submitting by calling the Events preventDefault() method. | 
| error |Fired by the autoSubmit() method if an exception is caught prior to displaying the error, using the JavaScript alert() function. You can prevent the alert() call and display the error yourself by calling the Events preventDefault() method.| 

Event names are prefixed with the ‘hostedform:’ namespace not shown in the table.

The `presubmit`, `valid`, `submit-invalid`, `submit` and `error` events fired by the `autoSubmit()`
method the payload is an object with the following properties:
- success – boolean false.
- message – error message if error otherwise null.
- invalid – result of getValidationErrors() method if Form invalid.
- submitting – boolean true.

### Field Construction 

The construction method can be used to prepare a HTML INPUT control as a Hosted Payment Field or to create a new field in HTML DIV container. The method signature is as follows:

`Field(element, options)`

The `element` parameter should be the DOM node of an existing INPUT or DIV tag.

The `options` parameter should be object containing one of more of the following optional properties:
- `type` – string containing the desired field type.
- `value` – string containing the initial value.
- `placeholder` – string containing any placeholder text.
- `style` – string containing any inline CSS styles.
- `stylesheet` – string containing DOM selector for any stylesheets to be used.
- `disabled` – boolean indicating if initially disabled.
- `required` – boolean indicating if the value is required.
- `readOnly` – boolean indicating if initially read only.
- `validity` – boolean or string indicating the initial validity.
- `locale` – string containing the desired locale.
- `classes` – object containing names of extra CSS classes to use.
- `submitOnEnter` – boolean indicating if the enter key should cause the form to submit.
- `nativeEvents` – boolean indicating that native browser events should be fired.
- `validationMessages` – object containing alternative validation messages.
    - `required` – string containing validation message to use when a value is required.
    - `invalid` – string containing validation message to use when a value is invalid.
- `format` – string containing select option format for date fields.
- `minYear` – integer containing minimum year (relative to current year) for date fields.
- `maxYear` – integer containing maximum year (relative to current year) for date fields.

Any `options` parameter will be merged with those provided via meta data supplied using `datahostedfield` and/or `data-hostedfield-<option>` attributes, or via existing attributes or properties of the `element` or provided via the `getDefaultOptions()` method of the parent `Form`.

The `type` option can be used to specify the type of Hosted Payment Field required. It defaults to
the value provided by any type attribute on the `element` (prefixed with the ‘hostedfield:’
namespace). The option cannot be changed once the `Field` has been created. Valid types are
`cardDetails`, `cardNumber`, `cardCVV`, `cardExpiryDate`, `cardStartDate`, `cardIssueNumber`.

The `value` option can be used to specify any initial value that should be used by the `Field`. It
defaults to the value provided by any value attribute or property on the `element`. Obviously, due
to the purpose of the Hosted Payment Fields, any initial value is not wise for card number and
CVV fields. The option can be changed at runtime by calling the `setValue()` method.

The `placeholder` option can be used to specify any initial text that should be used as a placeholder by the `Field`. It defaults to the value provided by any placeholder attribute or property on the `element`. When used with the `CardDetails` type `Field` the placeholder contains three parts separated by a pipe character, the first part contains the `cardNumber` placeholder, the second part contains the `cardExpiry` placeholder, and the third part contains the `cardCVV` placeholder. The option can be changed at runtime by calling the `setPlaceholder()` method or by altering the options using the jQuery hostedForm() plugin method.

The `style` option can be used to specify any initial inline CSS style that should be used by the
`Field`. It defaults to the value provided by any style attribute or property on the `element`. The
option can be changed at runtime by calling the `setStyle()` method or by altering the options
using the jQuery `hostedForm()` plugin method.

The `stylesheet` option can be used to specify a DOM selector used to locate stylesheets that should be parsed for styles related to this `Field`. Refer to section on styling fields. The option can be changed at runtime by calling the `setStylesheet()` method or by altering the options using the jQuery `hostedForm()` plugin method.

The `disabled` option can be used to specify if the `Field` should be initially disabled. It defaults to
the value provided by any disabled attribute or property on the `element`. The option can be
changed at runtime by calling the `setDisabled()` method or by altering the options using the
jQuery `hostedForm()` plugin method.

The `required` option can be used to specify if the `Field` value is required. It defaults to the value
provided by any required attribute or property on the `element`. The option can be changed at
runtime by calling the `setRequired()` method or by altering the options using the jQuery
`hostedForm()` plugin method.

The `readOnly` option can be used to specify if the `Field` should be initially read-only. It defaults to
the value provided by any readOnly attribute or property on the `element`. The option can be
changed at runtime by calling the `setReadOnly()` method or by altering the options using the
jQuery `hostedForm()` plugin method.

The `validity` option can be used to specify if the `Field` should be initially marked as invalid. It
defaults to the value provided by any validity property on the `element`. The option can be
changed at runtime by calling the `setValidity()` method or by altering the options using the
jQuery `hostedForm()` plugin method.

The `locale` option can be used to specify the language that should be used by the Field. It
defaults to the value provided by any lang attribute or property on the `element` or closest
ancestor. The option cannot be changed once the `Field` has been created.

The `classes` options can be used to specify additional CSS class names to add in addition to the
default classes. The value is an object whose properties are the default class name and whose values are a string containing the additional class name(s) to use. This option will be merged with any classes option provided to the Form constructor. The option cannot be changed once the Form has been created.

The `submitOnEnter` option can be used to specify if pressing the enter key when typing the
`Field` value should cause the Form to submit. The option defaults to false and cannot be changed
once the Field has been created.

The `nativeEvents` option can be used to specify that any associated native event should be fired
when a ‘hostedfield:’ prefixed event is fired For example, when enabled if the ‘hostedfield:mouseover’ event is fired then the native ‘mouseover’ event is also fired. The option defaults to false and cannot be changed once the `Field` has been created.

The `validationMessages` option can be used to specify alternative validation messages that
should be displayed when a value is required or invalid. The option defaults to suitable messages
depending on the locale and cannot be changed once the `Field` has been created.

The `dropdown` option can be used to specify that a `cardStartDate` or `cardExpiryDate` `Field`
should be displayed as a pair of select controls to select the month and year, otherwise the month
and year are entered via a formatted input box instead. The option defaults to false and cannot be
changed once the `Field` has been created.

The `format` option can be used in conjunction with the `dropdown` option to specify the format used
to display the month and year in the dropdowns. The month and year parts of the format are
separated by a pipe character. The option defaults to ‘N – M | Y’ (eg ‘01 – January | 2020’) and
cannot be changed once the `Field` has been created.

The following formatting characters are understood:
- n – month number (no zero prefixing).
- N – month number (zero prefixed to two digits when required).
- m – short month name (eg Jan, Feb, Mar)
- M – long month name (eg January, February, March)
- y – two digit year number.
- Y – four digit year number.

The `minYear` and `maxYear` options can be used in conjunction with the `dropdown` option to specify
the minimum and maximum years that are included in the year dropdown. The option defaults to
minus 20 to zero for a `cardStartDate` `Field` or zero to plus 20 for a `cardExpiryDate` Field and
cannot be changed once the `Field` has been created.

Example Field construction is as follows:

```javascript
 var field = new window.hostedFields.classes.Field(document.forms[0].elements[0], {
    // Field type
    type: 'cardNumber',

    // Stylesheet selection
    stylesheets: '#hostedfield-stylesheet',

    // Additional CSS classes
    classes: {
        invalid: 'error'
    }
 }); 
```

Or using meta data on the HTML INPUT element:

```html
<input type="hostedfield:cardNumber" data-hostedfields='{"stylesheet":"style.hostedform, style.hostedform-cardnumber"}},"classes":{"invalid":"error"}}'>
<script>
var field = new window.hostedFields.classes.Field(document.forms[0].elements[0]);
</script> 
```

### Field Methods 

The following methods are made available by the `Field` class:

`promise validate()`

Validate the `Field` value. This will normally be called automatically when the `Field` loses focus or the form is submitted, or when an invalid value is modified.

Returns a `promise` that will be resolved when the validation is complete.

`boolean isEmpty()`

Check if the `Field` has a value.

Returns true if the field has a value, false otherwise.

`boolean isComplete()`

Check if the `Field` has a complete, but not necessarily valid, value. This is mainly used by compound fields such as `cardDetails`, `cardExpiryDate`, `cardStartDate`, which contain multiple input controls and are deemed complete when all their required input controls have values.

Returns true if the value is complete, false otherwise.

`void setStyle() / string getStyle()`

Set or gets the field’s inline CSS style data.

Returns void when setting, or a CSS style string when getting.

`void setStylesheet(string selector) / string getStylesheet()`

Sets or gets the DOM selector used to select the stylesheet(s) used by the `Field`. When setting, the stylesheets are parsed and applied to the `Field`.

Returns void when setting, or a DOM selector string when getting.

`void setPlaceholder(string text) / string getPlaceholder()`

Sets or gets the placeholder text to be shown when the `Field` has no value.

When used with the `CardDetails` type `Field` the placeholder contains three parts separated by a pipe character, the first part contains the `cardNumber` placeholder, the second part contains the `cardExpiry` placeholder, and the third part contains the `cardCVV` placeholder.

Returns void when setting, or a text string when getting.

`void setDisabled(boolean disabled) / string getDisabled()`

Sets or gets the disabled state of the `Field`. When disabled, the field will be greyed out and not be focusable and thus will not react to any input events.

A disabled `Field` will have the ‘hf-disabled’ class added otherwise the ‘hf-enabled’ class is added.

Returns void when setting, or a boolean representing the state when getting.

`void setRequired(boolean required) / string getRequired()`

Sets or gets the required state of the `Field`. When required, the field will be invalid if it contains no value or a blank value.`

A required `Field` will have the ‘hf-required’ class added otherwise the ‘hf-optional’ class is added.

Returns void when setting, or a boolean representing the state when getting.

`void setReadOnly(boolean read_only) / string getRequired()`

Sets or gets the read-only state of the Field. When read-only, the field will be not be focusable and thus will not react to any input events.

A read-only `Field` will have the ‘hf-readonly’ class added otherwise the ‘hf-readwrite’ class is added.

Returns void when setting, or a boolean representing the state when getting.

`void setFocused(boolean focused)`

Moves the browser’s focus to the `Field`. When focused, the field will react input events.

A focused `Field` will have the ‘hf-focus’ class added otherwise the ‘hf-blur’ class is added.

Returns void when setting, or a boolean representing the state when getting.

`void setValidity(string validity) / string getValidity()`

Sets or gets the validity of the `Field`. When valid, the validity will be true or a blank string. When invalid, the validity will be an error message explaining the reason the value is invalid.

When used with the `CardDetails` type `Field` the error message contains three parts separated by a pipe character, the first part contains the `cardNumber` value, the second part contains the `cardExpiry` value, and the third part contains the `cardCVV` value.

A valid `Field` will have the ‘hf-valid’ and ‘hf-user-valid’ classes added otherwise the ‘hf-invalid’ and ‘hf-user-invalid’ classes are added.

Returns void when setting, or an error message string when getting.

`void setValue() / string getValue()`

Set or gets the `Field` value. Because Hosted Payment Fields are designed for the entry of sensitive payment details, then these methods are not normally used. There is no means to retrieve the actual sensitive data and so any returned value will be an empty string if the field has no value or a single asterisk if the field has a value.

When used with the `CardDetails` type `Field` the value contains three parts separated by a pipe character, the first part contains the `cardNumber` value, the second part contains the `cardExpiry` value, and the third part contains the `cardCVV` value.

Returns void when setting, or a mask string when getting.

`void getState()`

Get the current state of the Field as an object with the following boolean properties:
- isReady – the Field has been created, initialised and is ready for use.
- isValid – the value is valid (refer to the setValidity() method).
- isEmpty – the value is empty (refer to the isEmpty() method).
- isComplete – the value is complete (refer to the isComplete() method).
- isDisabled – the value is complete (refer to the setDisabled() method).
- isRequired – the value is complete (refer to the setRequired() method).
- isReadOnly – the value is complete (refer to the setReadOnly() method).

Returns an object containing the states.

`void reset()`

Reset Field value back to the initial value.

`void destroy()`

Destroys the `Form`, reverting its element back to its original state.

Note: A field’s options or properties cannot be changed while a field is initialising, that is between construction and firing of the ‘ready’ event. Attempts to change field options or properties before this will be ignored.

### Field Events 

The following events may be fired by the Field object, and you can use these to hook into and modify the object’s behaviour:

| Event Name | Description |
| ----------- | ----------- | 
| create | Fired when a Field has been created. | 
| destroy | Fired when a Field has been destroyed. | 
| ready | Fired when a Field style is has finished initialising and is ready.| 
| style |Fired when a Field style is changed. | 
| autofill | Fired when a Field has a value auto filled by the browser. | 
| autofillcancel | Fired when a Field has an auto filled value removed. | 
| valid | Fired when a Field is checked for validity and passes the check. | 
| invalid | Fired when a Field is checked for validity and fails the check.| 
| uservalid |Fired when the valid event is fired but only after user interaction has occurred, such as focusing a Field, leaving a Field or attempting to submit a Form. | 
| userinvalid |Fired when the invalid event is fired but only after user interaction has occurred, such as focusing a Field, leaving a Field or attempting to submit a Form. | 
| disabled | Fired when a Field changes to disabled. | 
| enabled | Fired when a Field changes from disabled. | 
| required | Fired when a Field changes to required. | 
| optional | Fired when a Field changes from required. | 
| readonly |Fired when a Field changes to read-only. | 
| readwrite |Fired when a Field changed from read-only.| 
| focus | Fired when a Field receives focus. | 
|blur | Fired when a Field loses focus. | 
|mouseenter| Fired when a pointing device is moved into the Field. | 
|mouseleave | Fired when a pointing device is moved out of the Field. | 
|mouseover| Fired when a pointing device is moved into the Field. | 
| mouseout| Fired when a pointing device is moved out of the Field. | 
| mousemove| Fired when a pointing device is moved over the Field.| 
|keydown |Fired when a key is pressed in the Field. | 
| keyup |Fired when a key is released in a Field. |
| keypress |Fired when a key except Shift, Fn, CapsLock is in a pressed position in a Field. |
| change | Fired when an alteration to the value of a Field is committed by the user.|
| input | Fired when the value of a Field is changed. |

Event names are prefixed with the ‘hostedfield:’ namespace not shown in the table.

### Field CSS Classes 

The following CSS class names will be added to a `Field` object depending on its state and you can use these to style the object as required:

| Event Name | Description |
| ----------- | ----------- | 
| hostedfield | Present on all Field elements. | 
| hf-autofill | Present when the value was auto filled by the browser. | 
| hf-invalid | Present when in the invalid state. | 
| hf-valid | Present when in the valid state. | 
| hf-user-invalid | Present when in the invalid state and user interaction has occurred, such as focusing a Field, leaving a Field or attempting to submit a Form. | 
| hf-user-valid | Present when in the valid state and user interaction has occurred, such as focusing a Field, leaving a Field or attempting to submit a Form. | 
| hf-disabled | Present when in the disabled state. | 
| hf-enabled | Present when not in the disabled state. | 
| hf-required | Present when in the required state. | 
| hf-optional | Present when not in the required state. | 
| hf-readonly | Present when in the read-only state. | 
| hf-readwrite | Present when not in the read-only state.| 
| hf-focus |  Present when in the focused state. | 
| hf-blur | Present when not in the focused state. | 
| hf-empty | Present when in the empty state. | 
| hf-complete | Present when in the complete state. | 
| hf-hover | Present when a pointing device is over the Field. | 
| hf-placeholder-shown |  Present when the placeholder text is displayed. | 

In addition to these class names, the `Field` will add any corresponding class names provided by the `classes` option provided when the `Field` is constructed.

For example, if the `Field` is constructed with a classes option as follows `‘{disabled: ‘text-blur text-grey’, enabled: ‘text-normal’}’`, then the ‘text-blur’ and ‘text-grey’ class names will be present whenever the ‘hf-disabled’ class is present and the ‘text-normal’ class name will be present whenever the ‘hf-enabled’ class name is present.

### Field Styling

The Hosted Payment Fields are styled using CSS as normal.

However, styles have to be transferred from your website to the controls served from our website, therefore styles must be isolated and easily identifiable. To aid with identification, all styles intended for a `Field` must contain the ‘hostedfield’ class name in their selector or ‘-hostedfield’ extension on any id in the selector.

As a website may contain lots of stylesheets, a `Field` cannot be expected to parse every stylesheet present on the page and therefore it only parses those selected using the stylesheets construction option or using the `setStylesheet()` method. By default, this is any stylesheet referenced via a `<link>` tag or `<style>` tag with the ‘hostedfield’ class name: ie any HTML node that matches the following DOM selector `‘link.hostedfield[rel=stylesheet], style.hostedfield'`.

CSS styles using the Field state classes, pseudo classes and pseudo elements are supported as follows:

- :focus
- .hf-focus
- :hover
- .hf-hover
- :enabled
- .hf-enabled
- :disabled
- .hf-disabled
- :valid
- .hf-valid
- :invalid
- .hf-invalid
- :user-valid
- .hf-user-valid
- :user-invalid
- .hf-user-invalid
- :required
- .hf-required
- :optional
- .hf-optional
- :empty
- .hf-empty
- :complete
- .hf-complete
- :autofill
- .hf-autofill
- :placeholder-shown
- .hf-placeholder-shown
- :readonly
- .hf-readonly
- :readwrite
- .hf-readwrite
- :-webkit-auto-fill
- .hf-icon
- ::placeholder
- ::-moz-placeholder
- ::-webkit-input-placeholder
- ::-ms-input-placeholder

The styles can contain any valid CSS rules and will be used to style both the public elements and internal private elements. For security only, styles that relate to the textual representation of the Field are passed to the internal private elements. This includes styles such as colours, font weights and text decorations. At present, it is not possible to specify custom fonts as they would require the font files to be available on our servers.

The following styles can be used to style the Field internal private elements:

- caret-color
- color
- cursor
- direction
- fill
- filter
- font
- font-family
- font-feature-settings
- font-kerning
- font-language-override
- font-size
- font-size-adjust
- font-smooth
- font-stretch
- font-style
- font-synthesis
- font-variant
- font-variant-alternates
- font-variant-caps
- font-variant-east-asian
- font-variant-ligatures
- font-variant-numeric
- font-variant-position
- font-weight
- letter-spacing
- line-height
- stroke
- text-align
- text-decoration
- text-decoration-color
- text-decoration-line
- text-decoration-style
- text-emphasis
- text-emphasis-color
- text-emphasis-position
- text-emphasis-style
- text-indent
- text-rendering
- text-shadow
- text-transform
- text-underline-position
- -moz-osx-font-smoothing
- -webkit-font-smoothing
- -webkit-text-fill-color

The ‘.hf-icon’ class name can be used to target the icon sub element in a `cardDetails` `Field`.

Individual controls can be targeted by using DOM ids, which will have a ‘-hostedfield’ extension added to the DOM id of the original `element`.

It is advisable to keep CSS selectors and rules as simple as possible to avoid styling errors caused by a failure to parse and filter the rules.

The following list are the best web safe fonts for use with any ‘font’ or ‘font-family’ style as these fonts should be available on most web browsers:

- Arial (sans-serif)
- Verdana (sans-serif)
- Helvetica (sans-serif)
- Tahoma (sans-serif)
- Trebuchet MS (sans-serif)
- Times New Roman (serif)
- Georgia (serif)
- Garamond (serif)
- Courier New (monospace)
- Brush Script MT (cursive)

#### Example stylesheet :  

```javascript
 <style class="hostedfield">
 	/*
 		* Style hosted field internals
 		* - only accept font, foreground and background styling
 	*/

 	/* Copy of Bootstrap styles */
 	.hostedfield:disabled {
		 cursor: not-allowed;
		 background-color: #eee;
		 opacity: 1;
 	}

 	/* Change text to red when invalid */
 	.form-control:invalid,
	.hostedfield:invalid {
		 border-color: #a94442 !important;
		 color: #a94442 !important;
 	}

	 /* Change text to light grey when readonly */
	 .form-control:readonly,
	 .hostedfield:readonly {
 		color: lightgrey !important;
 	}

 	/* Emulate webkit auto fill style */
	 .form-control.hf-autofill,
	 .hostedfield.hf-autofill {
		 background-color: rgb(250, 255, 189) !important;
		 background-image: none !important;
		 color: rgb(0, 0, 0) !important;
 	}

 	/* Add pink placeholder */
 	.form-control::placeholder,
 	.hostedfield::placeholder {
 		color: pink;
 	}

 	/* Show hovering over the control */
 	.form-control.hf-hover,
 	.hostedfield.hf-hover {
 		font-style: italic;
 	}

 	/* Style by id (hosted field will have '-hostedfield' appended to the id) */
 	#form1-card-details.hostedfield, #form1-card-details-hostedfield {
 		color: blue;
	 }

 </style>
```
### jQuery plugin 

The script will extend the jQuery object with its own plugin methods to allow easy access to Form
and Field objects attached to an element as follows:

```php
$(element).hostedForm(options);
$(element).hostedForm(‘instance’);
$(element).hostedForm(‘options’, options);
$(element).hostedForm(method, parameters);
$(element).hostedForm(‘destroy’);
$(element).hostedField(options);
$(element).hostedField(‘instance’);
$(element).hostedField(‘options’, options);
$(element).hostedField(method, parameters);
$(element).hostedField(‘destroy’);
```
The script will also add a ‘:hostedfield’ pseudo selector allowing Field elements to be selected
using the following example notation:

```php
$(‘INPUT:hostedfield’)
```
## Example HTTP Request 

### Transaction Request HTTP Headers 

The following HTTP headers are sent for transaction request:

| HTTP Header | Mandatory | Description |
| ----------- | ----------- | ----------- | 
| content-type | Y | Content type of the request. This must be ‘application/x-www-formurlencoded’, A charset parameter is optional and any non UTF-8 request will be converted to UTF-8. | 

### Transaction Response HTTP Headers 

The following HTTP headers are received for a transaction response:

| HTTP Header | Description |
| ----------- | ----------- | 
| Status | HTTP status header. Possible value are:<br></br>200 – Transaction request processed<br></br>500 – Internal Server Error<br></br>503 – Service Temporarily Unavailable | 
| content-type | Content type of the response. This will be ‘text/html’| 

### Submission Example
The following shows an example of a transaction request:

```http
POST /direct/ HTTP/1.1
Host: gateway.example.com
Accept: */*
Content-Length: 397
Content-Type: application/x-www-form-urlencoded

merchantID=100001&action=SALE&type=1&currencyCode=826&countryCode=826&amount=680&transactionUnique=5de65b552499
e&orderRef=Test+Transaction&cardNumber=4929+4212+3460+0821&cardCVV=356&cardExpiryDate=1219&threeDSRequired=N&av
scv2CheckRequired=N&duplicateDelay=0&signature=06b01e06c8fc761943d676d5f3aa2e9264758fed72e7bcb058a2a35cf23e8e45
403099537bb0363054d6bc8ea951ce1ad86e582dbf0b435855b9c97507fcf844 
```

The following shows an example of a transaction response:

```http
HTTP/1.1 200 OK
Date: Tue, 01 Jan 2019 09:30:45 GMT
Server: Apache/2.4.23 (Win64) OpenSSL/1.0.2k-fips PHP/5.4.12
Vary: Host
X-Powered-By: PHP/5.4.12
Content-Length: 2449
Content-Type: text/html

merchantID=100001&threeDSEnabled=Y&avscv2CheckEnabled=Y&riskCheckEnabled=N&caEnabled=Y&rtsEnabled=Y&cftEnabled=Y&threeDSCheckPref=not+known%2Cnot+checked%2Cauthenticated%2Cattempted+authentication&cv2CheckPref=matched&addressCheckPref=not+known%2Cnot+checked%2Cmatched%2Cpartially+matched&postcodeCheckPref=not+known%2Cnot+checked%2Cmatched%2Cpartially+matched&cardCVVMandatory=Y&riskCheckPref=not+known%3Dfinished%2Cnot+checked%3Ddecline2%2Capprove%3Dcontinue%2Cdecline%3Ddecline1%2Creview%3Ddecline2%2Cescalate%3Dfinished&notifyEmail=an.operator%40merchant.com&customerReceiptsRequired=Y&merchantCategoryCode=6013&surchargeEnabled=Y&surchargeRequired=N&surchargeRules%5B0%5D%5BcardType%5D=CC&surchargeRules%5B0%5D%5Bsurcharge%5D=10.1235&surchargeRules%5B1%5D%5BcardType%5D=CC&surchargeRules%5B1%5D%5Bcurrency%5D=GBP&surchargeRules%5B1%5D%5Bsurcharge%5D=2.5000&surchargeRules%5B2%5D%5BcardType%5D=VC&surchargeRules%5B2%5D%5Bsurcharge%5D=3.5000&surchargeRules%5B3%5D%5BcardType%5D=VC&surchargeRules%5B3%5D%5Bcurrency%5D=GBP&surchargeRules%5B3%5D%5Bsurcharge%5D=4.5000&surchargeRules%5B4%5D%5BcardType%5D=DD&surchargeRules%5B4%5D%5Bsurcharge%5D=5.5000&action=SALE&type=1¤cyCode=826&countryCode=826&amount=680&transactionUnique=5de65b552499e&orderRef=Test+Transaction&cardExpiryDate=1219&threeDSRequired=N&avscv2CheckRequired=N&duplicateDelay=0&requestID=5de65b562496f&responseCode=0&responseMessage=AUTHCODE%3A347414&state=captured&requestMerchantID=100001&processMerchantID=100001&paymentMethod=card&cardType=Visa+Credit&cardTypeCode=VC&cardScheme=Visa+&cardSchemeCode=VC&cardIssuer=BARCLAYS+BANK+PLC&cardIssuerCountry=United+Kingdom&cardIssuerCountryCode=GBR&cardFlags=8323072&cardNumberMask=492942%2A%2A%2A%2A%2A%2A0821&cardNumberValid=Y&xref=19120312NG55CM51QH35JRL&cardExpiryMonth=12&cardExpiryYear=19&authorisationCode=347414&transactionID=10018201&responseStatus=0×tamp=2019-12-03+12%3A55%3A52&amountApproved=680&amountReceived=680&amountRetained=680&avscv2ResponseCode=244100&avscv2ResponseMessage=SECURITY+CODE+MATCH+ONLY&avscv2AuthEntity=merchant+host&cv2Check=matched&addressCheck=not+matched&postcodeCheck=not+matched&notifyEmailResponseCode=0&notifyEmailResponseMessage=Email+successfully+queued&vcsResponseCode=0&vcsResponseMessage=Success+-+no+velocity+check+rules+applied&currencyExponent=2&signature=e5c65e5d0340e0ec0de8782affcb6caba2e4d202a6873a1677ddbf6415cb1dd52cc597e43c758b233afd121367d300a57d0faade7abf6b4b88a1a1b974e55d33 
```

## Gateway Integration Library 

A simple server-side integration library is available to simplify the preparation and transmission of Hosted and Direct Integration requests.

The library is available in many popular programming languages and is based around a single class: the Gateway class. Below is the PHP version of the library but checkout the [Handpoint Github](https://github.com/handpoint) website to download libraries in C#, Java, Perl, Python, NodeJs, Ruby and Swift. 

### Library Namespace 
To avoid polluting the global namespace, the library uses the ‘P3/SDK’ namespace where supported by the language.

### Gateway Configuration 

Before you can use the Gateway class, you will need to configure the following properties to match your integration parameters: 

| Name | Type | Description |
| ----------- | ----------- | -----------  |
| hostedURL |string |Absolute URL provided for the Hosted Integration. |
|directURL | string| Absolute URL provided for the Direct Integration.|
| merchantID| string|Your unique Merchant ID to be passed in the `merchantID` integration field. |
| merchantPwd|string |Any password configured on your Merchant Account |
|merchantSecret| string|Any secret configured on your Merchant Account |
| proxyUrl |string |Absolute URL to any proxy required for connections |
| debug |boolean | True to enable debugging output |

### Gateway Methods

The following methods are made available by the `Gateway` class:

#### `string hostedRequest(mixed[] request, string[] options)`

Return an HTML fragment that can be included in your webpage to render a `<form>` which will send the provided request data to the Gateway’s Hosted Integration when submitted.

The request parameter should be an associative array containing the request fields required to be sent. The request fields are not validated.

The following class properties are used unless alternative values are provided in the `request` array: `directUrl`, `merchantID`, `merchantPwd`, `merchantSecret`.

The `options` parameter is an optional associative array containing options that can be used to modify the returned HTML fragment as follows:
- formAttrs – string containing additional attributes to include in the form tag.
- submitAttrs – string containing additional attributes to include in the submit button tag.
- submitImage – string containing the URL to use as the submit button.
- submitHtml – string containing HTML to use as the label on the submit `<button>`.
- submitText – string containing text to use as the label on the submit `<input>`.

The `submitImage`, `submitHtml` and `submitText` options are mutually exclusive and will be checked for in that order. If none is provided, then a `submitText` value of ‘Pay Now' is assumed.

If a `merchantSecret` is provided, then the method will add the correct signature field to the request.

An exception is thrown if the HTML fragment cannot be composed.

The `verifyResponse()` method can be used to validate and decode any response POSTed back to your website.

Returns a string containing the HTML fragment if successful; throws an exception otherwise.

#### `mixed[] directRequest(mixed[] request, string[] options)`

Return the response received when sending the provided request to the Gateway’s Direct Integration.

The `request` parameter should be an associative array containing the request fields required to be sent. The request fields are not validated.

The following class properties are used unless alternative values are provided in the request array: `directUrl`, `merchantID`, `merchantPwd`, `merchantSecret`.

The `options` parameter is not used and reserved for future use.

If a `merchantSecret` is provided, then the method will add the correct signature field to the request and check the `signature` field on the response.

An exception is thrown if the request cannot be sent; or the response cannot be received; or if the response’s signature is incorrect.

Returns an associative array containing the received response fields; otherwise, throws an exception.

#### `void prepareRequest(mixed[] &request, string[] &options, string &secret, string &direct_url, string &hosted_url)`

Prepare a request for sending to the Gateway’s Direct Integration.

The `request` parameter should be a reference to an associative array containing the request fields required to be sent. The request fields are not validated.

The `merchantSecret`, `directUrl` and `hostedUrl` configuration properties will be returned in the `secret`, `direct_url` and `hosted_url` method parameters. These properties can be overridden by providing them in the request, in which case they will be extracted and removed from the request.

The `merchantID` and `merchantPwd` configuration properties will be added to the request.

A few known Gateway response fields will be removed from the request, if present, to avoid confusion, notably the `responseCode`, `responseMessage`, `responseStatus`, `state` fields.

An exception will be thrown if the request does not contain an action element or a merchantID element (and none could be inserted).

#### `void verifyResponse(mixed[] &response, string secret)`

Verify a response received from the Gateway’s Hosted or Direct Integration.

The `response` parameter should be a reference to an associative array containing the response received from the Gateway, either from the Direct Integration or as POSTed from the Hosted Integration.

The `secret` parameter should be any Merchant secret to use when checking the response’s `signature` element. If not provided, then the value of the `merchantSecret` property is used.

Any `signature` element is removed from the response.

An exception is thrown if the response is not valid, does not contain a `responseCode` element or its `signature` is incorrect.


#### `string sign(mixed[] request, string secret, mixed partial = false)`

Return the signature for the provided request data.

The `request` parameter should be a reference to an associative array containing the request fields required to be sent. The request fields are not validated.

The `secret` parameter should be the Merchant secret to use when signing the request.

The `partial` parameter should be either the boolean `false` or comma separated string; or an array of strings containing the names of the request elements to sign.

Returns a string containing the correct signature for the request.

### Gateway Library (PHP)

The gateway.php file contains the main body of the SDK.


```php

<?php

/**
 * Class to communicate with Payment Gateway
 */

namespace P3\SDK;

use \RuntimeException;
use \InvalidArgumentException;

class Gateway {

	/**
	 * @var string	Gateway Hosted API Endpoint
	 */
	static public $hostedUrl = 'https://commerce-api.handpoint.com/hosted/';

	/**
	 * @var string	Gateway Direct API Endpoint
	 */
	static public $directUrl = 'https://commerce-api.handpoint.com/direct/';

	/**
	 * @var string	Merchant Account Id or Alias
	 */
	static public $merchantID = '100001';

	/**
	 * @var string	Password for above Merchant Account
	 */
	static public $merchantPwd = null;

	/**
	 * @var string	Secret for above Merchant Account
	 */
	static public $merchantSecret = 'Circle4Take40Idea';

	/**
	 * @var string	Proxy URL if required (eg. 'https://www.proxy.com:3128')
	 */
	static public $proxyUrl = null;

	/**
	 * @var boolean	Enable debugging
	 */
	static public $debug = true;

	/**
	 * Useful response codes
	 */
	const RC_SUCCESS						= 0;	// Transaction successful
	const RC_DO_NOT_HONOR					= 5;	// Transaction declined
	const RC_NO_REASON_TO_DECLINE			= 85;	// Verification successful

	const RC_3DS_AUTHENTICATION_REQUIRED	= 0x1010A;

	/**
	 * Send request to Gateway using HTTP Direct API.
	 *
	 * The method will send a request to the Gateway using the HTTP Direct API.
	 *
	 * The request will use the following Gateway properties unless alternative
	 * values are provided in the request;
	 *   + 'directUrl'		- Gateway Direct API Endpoint
	 *   + 'merchantID'		- Merchant Account Id or Alias
	 *   + 'merchantPwd'	- Merchant Account Password (or null)
	 *   + 'merchantSecret'	- Merchant Account Secret (or null)
	 *
	 * The method will {@link sign() sign} the request and also {@link
	 * verifySignature() check the signature} on any response.
	 *
	 * The method will throw an exception if it is unable to send the request
	 * or receive the response.
	 *
	 * The method does not attempt to validate any request fields.
	 *
	 * The method will attempt to send the request using the PHP cURL extension
	 * or failing that the  PHP http stream wrappers. If neither are available
	 * then an exception will be thrown.
	 *
	 * @param	array	$request	request data
	 * @param	array	$options	options (or null)
	 * @return	array				request response
	 *
	 * @throws	InvalidArgumentException	invalid request data
	 * @throws	RuntimeException			communications failure
	 */
	static public function directRequest(array $request, array $options = null) {

		static::debug(__METHOD__ . '() - args=', func_get_args());

		static::prepareRequest($request, $options, $secret, $direct_url, $hosted_url);

		// Sign the request
		if ($secret) {
			$request['signature'] = static::sign($request, $secret);
		}

		if (function_exists('curl_init')) {
			$opts = array(
				CURLOPT_POST			=> true,
				CURLOPT_POSTFIELDS		=> http_build_query($request, '', '&'),
				CURLOPT_HEADER			=> false,
				CURLOPT_FAILONERROR		=> true,
				CURLOPT_FOLLOWLOCATION	=> true,
				CURLOPT_RETURNTRANSFER	=> true,
				CURLOPT_USERAGENT		=> $_SERVER['HTTP_USER_AGENT'],
				CURLOPT_PROXY			=> static::$proxyUrl,
			);

			$ch = curl_init($direct_url);

			if (($ch = curl_init($direct_url)) === false) {
				throw new RuntimeException('Failed to initialise communications with Payment Gateway');
			}

			if (curl_setopt_array($ch, $opts) === false || ($data = curl_exec($ch)) === false) {
				$err = curl_error($ch);
				curl_close($ch);
				throw new RuntimeException('Failed to communicate with Payment Gateway: ' . $err);
			}

		} else if (ini_get('allow_url_fopen')) {

			$opts = array(
				'http' => array(
					'method'		=> 'POST',
					'user_agent'	=> $_SERVER['HTTP_USER_AGENT'],
					'proxy'			=> static::$proxyUrl,
					'header'		=> 'Content-Type: application/x-www-form-urlencoded',
					'content'		=> http_build_query($request, '', '&'),
					'timeout'		=> 5,
				)
			);

			$context = stream_context_create($opts);

			if (($data = file_get_contents($direct_url, false, $context)) === false) {
				throw new RuntimeException('Failed to send request to Payment Gateway');
			}

		} else {
			throw new RuntimeException('No means of communicate with Payment Gateway, please enable CURL or HTTP Stream Wrappers');
		}

		if (!$data) {
			throw new RuntimeException('No response from Payment Gateway');
		}

		$response = null;
		parse_str($data, $response);

		static::verifyResponse($response, $secret);

		static::debug(__METHOD__ . '() - ret=', $response);

		return $response;
	}

	/**
	 * Send request to Gateway using HTTP Hosted API.
	 *
	 * The method will send a request to the Gateway using the HTTP Hosted API.
	 *
	 * The request will use the following Gateway properties unless alternative
	 * values are provided in the request;
	 *   + 'hostedUrl'		- Gateway Hosted API Endpoint
	 *   + 'merchantID'		- Merchant Account Id or Alias
	 *   + 'merchantPwd'	- Merchant Account Password (or null)
	 *   + 'merchantSecret'	- Merchant Account Secret (or null)
	 *
	 * The method accepts the following options;
	 *   + 'formAttrs'		- HTML form attributes string
	 *   + 'formHtml'		- HTML to show inside the form
	 *   + 'submitAttrs'	- HTML submit button attributes string
	 *   + 'submitImage'	- URL of image to use as the Submit button
	 *   + 'submitHtml'		- HTML to show on the Submit button
	 *   + 'submitText'		- Text to show on the Submit button
	 *
	 * 'submitImage', 'submitHtml' and 'submitText' are mutually exclusive
	 * options and will be checked for in that order. If none are provided
	 * the submitText='Pay Now' is assumed.
	 *
	 * The method will {@link sign() sign} the request, to allow for submit
	 * button images etc. partial signing will be used.
	 *
	 * The method returns the HTML fragment that needs including in order to
	 * send the request.
	 *
	 * The method will throw an exception if it is unable to send the request.
	 *
	 * The method does not attempt to validate any request fields.
	 *
	 * If the request doesn't contain a 'redirectURL' element then one will be
	 * added which redirects the response to the current script.
	 *
	 * Any response can be {@link verifyResponse() verified} using the following
	 * PHP code;
	 * <code>
	 * try {
	 *     \P3\SDK\Gateway::verifyResponse($_POST);
	 * } catch(\Exception $e) {
	 *     die($e->getMessage());
	 * }
	 * </code>
	 *
	 * @param	array	$request	request data
	 * @param	array	$options	options (or null)
	 * @return	string				request HTML form.
	 *
	 * @throws	InvalidArgumentException	invalid request data
	 */
	static public function hostedRequest(array $request, array $options = null) {

		static::debug(__METHOD__ . '() - args=', func_get_args());

		static::prepareRequest($request, $options, $secret, $direct_url, $hosted_url);

		if (!isset($request['redirectURL'])) {
			$request['redirectURL'] = ($_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
		}

		if ($secret) {
			$request['signature'] = static::sign($request, $secret, true);
		}

		$ret = '<form method="post" ' .
			(isset($options['formAttrs']) ? $options['formAttrs'] : '') .
			' action="' . htmlentities($hosted_url, ENT_COMPAT, 'UTF-8') . "\">\n";

		foreach ($request as $name => $value) {
			$ret .= static::fieldToHtml($name, $value);
		}

		if (isset($options['formHtml'])) {
			$ret .= $options['formHtml'];
		}

		if (isset($options['submitImage'])) {
			$ret .= '<input ' .
					(isset($options['submitAttrs']) ? $options['submitAttrs'] : '') .
					' type="image" src="' . htmlentities($options['submitImage'], ENT_COMPAT, 'UTF-8') . "\">\n";
		} else if (isset($options['submitHtml'])) {
			$ret .= '<button type="submit" ' .
					(isset($options['submitAttrs']) ? $options['submitAttrs'] : '') .
					">{$options['submitHtml']}</button>\n";
		} else {
			$ret .= '<input ' .
					(isset($options['submitAttrs']) ? $options['submitAttrs'] : '') .
					' type="submit" value="' . (isset($options['submitText']) ? htmlentities($options['submitText'], ENT_COMPAT, 'UTF-8') : 'Pay Now') . "\">\n";
		}

		$ret .= "</form>\n";

		static::debug(__METHOD__ . '() - ret=', $ret);

		return $ret;
	}

	/**
	 * Prepare a request for sending to the Gateway.
	 *
	 * The method will extract the following configuration properties from the
	 * request if they are present;
	 *   + 'merchantSecret'	- Merchant Account Secret (or null)
	 *   + 'directUrl'		- Gateway Direct API Endpoint
	 *   + 'hostedUrl'		- Gateway Hosted API Endpoint
	 *
	 * The method will insert the following configuration properties into the
	 * request if they are not already present;
	 *   + 'merchantID'		- Merchant Account Id or Alias
	 *   + 'merchantPwd'	- Merchant Account Password (or null)
	 *
	 * The method will throw an exception if the request doesn't contain an
	 * 'action' element or a 'merchantID' element (and none could be inserted).
	 *
	 * The method does not attempt to validate any request fields.
	 *
	 * @param	array	$request	request data (input & return)
	 * @param	array	$options	options (or null)
	 * @param	string	$secret		any extracted 'merchantSecret' (return)
	 * @param	string	$direct_url	any extracted 'directUrl' (return)
	 * @param	string	$hosted_url	any extracted 'hostedUrl' (return)
	 * @return	void
	 *
	 * @throws	InvalidArgumentException	invalid request data
	 */
	static public function prepareRequest(array &$request, array $options = null, &$secret, &$direct_url, &$hosted_url) {

		if (!$request) {
			throw new InvalidArgumentException('Request must be provided.');
		}

		if (!isset($request['action'])) {
			throw new InvalidArgumentException('Request must contain an \'action\'.');
		}

		// Insert 'merchantID' if doesn't exist and default is available
		if (!isset($request['merchantID']) && static::$merchantID) {
			$request['merchantID'] = static::$merchantID;
		}

		// Insert 'merchantPwd' if doesn't exist and default is available
		if (!isset($request['merchantPwd']) && static::$merchantPwd) {
			$request['merchantPwd'] = static::$merchantPwd;
		}

		// A 'merchantID' must be set
		if (empty($request['merchantID'])) {
			throw new InvalidArgumentException('Merchant ID or Alias must be provided.');
		}

		if (array_key_exists('merchantSecret', $request)) {
			$secret = $request['merchantSecret'];
			unset($request['merchantSecret']);
		} else {
			$secret = static::$merchantSecret;
		}

		if (array_key_exists('hostedUrl', $request)) {
			$hosted_url = $request['hostedUrl'];
			unset($request['hostedUrl']);
		} else {
			$hosted_url = static::$hostedUrl;
		}

		if (array_key_exists('directUrl', $request)) {
			$direct_url = $request['directUrl'];
			unset($request['directUrl']);
		} else {
			$direct_url = static::$directUrl;
		}

		// Remove items we don't want to send in the request
		// (they may be there if a previous response is sent)
		$request = array_diff_key($request, array(
			'responseCode'=> null,
			'responseMessage' => null,
			'responseStatus' => null,
			'state' => null,
			'signature' => null,
			'merchantAlias' => null,
			'merchantID2' => null,
		));
	}

	/**
	 * Verify the any response.
	 * 
	 * This method will verify that the response is present, contains a response
	 * code and is correctly signed.
	 *
	 * If the response is invalid then an exception will be thrown.
	 *
	 * Any signature is removed from the passed response.
	 *
	 * @param	array	$data		reference to the response to verify
	 * @param	string	$secret		secret to use in signing
	 * @return	boolean				true if signature verifies
	 */
	static public function verifyResponse(array &$response, $secret = null) {

		if (!$response || !isset($response['responseCode'])) {
			throw new RuntimeException('Invalid response from Payment Gateway');
		}

		if (!$secret) {
			$secret = static::$merchantSecret;
		}

		$fields = null;
		$signature = null;
		if (isset($response['signature'])) {
			$signature = $response['signature'];
			unset($response['signature']);
			if ($secret && $signature && strpos($signature, '|') !== false) {
				list($signature, $fields) = explode('|', $signature);
			}
		}

		// We display three suitable different exception messages to help show
		// secret mismatches between ourselves and the Gateway without giving
		// too much away if the messages are displayed to the Cardholder.
		if (!$secret && $signature) {
			// Signature present when not expected (Gateway has a secret but we don't)
			throw new RuntimeException('Incorrectly signed response from Payment Gateway (1)');
		} else if ($secret && !$signature) {
			// Signature missing when one expected (We have a secret but the Gateway doesn't)
			throw new RuntimeException('Incorrectly signed response from Payment Gateway (2)');
		} else if ($secret && static::sign($response, $secret, $fields) !== $signature) {
			// Signature mismatch
			throw new RuntimeException('Incorrectly signed response from Payment Gateway');
		}

		settype($response['responseCode'], 'integer');

		return true;
	}

	/**
	 * Sign the given array of data.
	 * 
	 * This method will return the correct signature for the data array.
	 *
	 * If the secret is not provided then any {@link static::$merchantSecret
	 * default secret} is used.
	 *
	 * The partial parameter is used to indicate that the signature should
	 * be marked as 'partial' and can take three possible value types as
	 * follows;
	 *   + boolean	- sign with all $data fields
	 *   + string	- comma separated list of $data field names to sign
	 *   + array	- array of $data field names to sign
	 *
	 * @param	array	$data		data to sign
	 * @param	string	$secret		secret to use in signing
	 * @param	mixed	$partial	partial signing
	 * @return	string				signature
	 */
	static public function sign(array $data, $secret, $partial = false) {

		// Support signing only a subset of the data fields
		if ($partial) {
			if (is_string($partial)) {
				$partial = explode(',', $partial);
			}
			if (is_array($partial)) {
				$data = array_intersect_key($data, array_flip($partial));
			}
			$partial = join(',', array_keys($data));
		}

		// Sort the data in ascending ascii key order
		ksort($data);

		// Convert to a URL encoded string
		$ret = http_build_query($data, '', '&');

		// Normalise all line endings (CRNL|NLCR|NL|CR) to just NL (%0A)
		$ret = preg_replace('/%0D%0A|%0A%0D|%0D/i', '%0A', $ret);

		// Hash the string and secret together
		$ret = hash('SHA512', $ret . $secret);

		// Mark as partially signed if required
		if ($partial) {
			$ret . '|' . $partial;
		}

		return $ret;
	}

	/**
	 * Collect browser device information.
	 *
	 * The method will return a self submitting HTML form designed to provided
	 * the browser device details in the following integration fields;
	 *   + 'deviceChannel'			- Fixed value 'browser',
	 *   + 'deviceIdentity'			- Browser's UserAgent string
	 *   + 'deviceTimeZone'			- Browser's timezone
	 *   + 'deviceCapabilities'		- Browser's capabilities
	 *   + 'deviceScreenResolution'	- Browser's screen resolution (widthxheightxcolour-depth)
	 *   + 'deviceAcceptContent'	- Browser's accepted content types
	 *   + 'deviceAcceptEncoding'	- Browser's accepted encoding methods
	 *   + 'deviceAcceptLanguage'	- Browser's accepted languages
	 *   + 'deviceAcceptCharset'	- Browser's accepted character sets
	 *
	 * The above fields will be submitted as child elements of a 'browserInfo'
	 * parent field.
	 *
	 * The method accepts the following options;
	 *   + 'formAttrs'		- HTML form attributes string
	 *   + 'formData'		- associative array of additional post data
	 *
	 *
	 * The method returns the HTML fragment that needs including in order to
	 * render the HTML form.
	 *
	 * The browser must suport JavaScript in order to obtain the details and
	 * submit the form.
	 *
	 * @param	array	$options	options (or null)
	 * @return	string				request HTML form.
	 *
	 * @throws	InvalidArgumentException	invalid request data
	 */
	static public function collectBrowserInfo(array $options = null) {

		static::debug(__METHOD__ . '() - args=', func_get_args());

		$form_attrs = 'id="collectBrowserInfo" method="post" action="?"';

		if (isset($options['formAttrs'])) {
			$form_attrs .= $options['formAttrs'];
		}

		$device_data = array(
			'deviceChannel'				=> 'browser',
			'deviceIdentity'			=> (isset($_SERVER['HTTP_USER_AGENT']) ? htmlentities($_SERVER['HTTP_USER_AGENT']) : null),
			'deviceTimeZone'			=> '0',
			'deviceCapabilities'		=> '',
			'deviceScreenResolution'	=> '1x1x1',
			'deviceAcceptContent'		=> (isset($_SERVER['HTTP_ACCEPT']) ? htmlentities($_SERVER['HTTP_ACCEPT']) : null),
			'deviceAcceptEncoding'		=> (isset($_SERVER['HTTP_ACCEPT_ENCODING']) ? htmlentities($_SERVER['HTTP_ACCEPT_ENCODING']) : null),
			'deviceAcceptLanguage'		=> (isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? htmlentities($_SERVER['HTTP_ACCEPT_LANGUAGE']) : null),
			'deviceAcceptCharset'		=> (isset($_SERVER['HTTP_ACCEPT_CHARSET']) ? htmlentities($_SERVER['HTTP_ACCEPT_CHARSET']) : null),
		);

		$form_fields = static::fieldToHtml('browserInfo', $device_data);

		if (isset($options['formData'])) {
			foreach ((array)$options['formData'] as $name => $value) {
				$form_fields .= static::fieldToHtml($name, $value);
			}
		}

		$ret = <<<EOS
			<form {$form_attrs}>
				{$form_fields}
			</form>
			<script>
				var screen_depths = [1, 4, 8, 15, 16, 24, 32, 48];
				var screen_width = (window && window.screen ? window.screen.width : '0');
				var screen_height = (window && window.screen ? window.screen.height : '0');
				var screen_depth = (window && window.screen && window.screen.colorDepth && screen_depths.indexOf(window.screen.colorDepth) >= 0 ? window.screen.colorDepth : '0');
				var identity = (window && window.navigator ? window.navigator.userAgent : '');
				var language = (window && window.navigator ? (window.navigator.language ? window.navigator.language : window.navigator.browserLanguage) : '');
				var timezone = (new Date()).getTimezoneOffset();
				var java = (window && window.navigator ? navigator.javaEnabled() : false);
				var fields = document.forms.collectBrowserInfo.elements;
				fields['browserInfo[deviceIdentity]'].value = identity;
				fields['browserInfo[deviceTimeZone]'].value = timezone;
				fields['browserInfo[deviceCapabilities]'].value = 'javascript' + (java ? ',java' : '');
				fields['browserInfo[deviceAcceptLanguage]'].value = language;
				fields['browserInfo[deviceScreenResolution]'].value = screen_width + 'x' + screen_height + 'x' + screen_depth;
				window.setTimeout('document.forms.collectBrowserInfo.submit()', 0);
			</script>
EOS;

		static::debug(__METHOD__ . '() - ret=', $ret);

		return $ret;
	}

	/**
	 * Return the field name and value as HTML input tags.
	 *
	 * The method will return a string containing one or more HTML <input
	 * type="hidden"> tags which can be used to store the name and value.
	 *
	 * @param	string		$name		field name
	 * @param	mixed		$value		field value
	 * @return	string					HTML containing <INPUT> tags
	 */
	static public function fieldToHtml($name, $value) {
		$ret = '';
		if (is_array($value)) {
			foreach ($value as $n => $v) {
				$ret .= static::fieldToHtml($name . '[' . $n . ']', $v);
			}
		} else {
			// Convert all applicable characters or none printable characters to HTML entities
			$value = preg_replace_callback('/[\x00-\x1f]/', function($matches) { return '&#' . ord($matches[0]) . ';'; }, htmlentities($value, ENT_COMPAT, 'UTF-8', true));
			$ret = "<input type=\"hidden\" name=\"{$name}\" value=\"{$value}\" />\n";
		}

		return $ret;
	}

	/**
	 * Display debug message into PHP error log.
	 *
	 * The method will write the arguments into the PHP error log if
	 * the {@link $debug} property is true. Any none string arguments
	 * will be {@link \var_export() formatted}.
	 *
	 * @param	mixed		...			value to debug
	 * @return	void
	 */
	static public function debug() {
		if (static::$debug) {
			$msg = '';
			foreach (func_get_args() as $arg) {
				$msg .= (is_string($arg) ? $arg : var_export($arg, true)) . ' ';
			}
			error_log($msg);
		}
	}

}

?>
```

## Testing 

You will be provided with unique test Merchant Account IDs during the onboarding process. Refer to the [authentication](overview#authentication) section for the list of required parameters. Test Merchant Accounts are connected to a Simulator and not to an actual Acquirer. The Simulator will emulate the function of an Acquirer and provide simulated responses and authorisation codes.

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

**Unless stated otherwise an expiry date sometime in the near future should be used.**

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

### 3D Secure Testing 

Your test accounts are connected to our 3-D Secure Product Integration Testing (PIT) system rather than to the production 3-D Secure servers. You can use any of the test cards provided above with this PIT system, and the authentication status returned by the Directory Server (for frictionless flow simulation) can be selected using the value of the card expiry month as follows:

| Card Expiry Month| Auth Status | Simulation (Frictionless) | 
| ----------- | ----------- | ----------- |
| 01 - January | Y | Fully authenticated | 
| 02 - February | N | Not authenticated 
|03 - March|U|Unknown authentication status | 
|04 - April|A|Attempted authentication| 
|05 - May|D|Decoupled authentication | 
|06 - June|R|Transaction rejected (do not attempt to send for authorisation) | 
|07 – July|E|Unknown error performing 3-D Secure checks | 
|08 - August|E| Error due to timeout communicating with the Directory Server| 
|09 – September|E|Error due to corrupt response from the Directory Server.| 
|10 – October|I|Information only| 
|11 – November|U|Unknown authentication due to Cardholder not enrolled (error 13)| 
|12 - December|C|Frictionless not possible, challenge Cardholder| 

An expiry month of 12 will simulate the non frictionless flow and desired authentication status (threeDSAuthenticated) can be selected on the challenge dialog shown by the PIT Access Control Server.

When using an expiry month from the above table please use a suitable expiry year to ensure the date is sometime in the near future.

### Paypal Sandbox Accounts 

Please contact customer support to have your own PayPal test Merchant account created that connects to your own PayPal sandbox account, thus enabling you to view the transactions as they are sent to PayPal.

### Amazon Pay Sandbox Accounts 

Please contact customer support to have your own Amazon Pay test Merchant account created that connects to your own Amazon Pay sandbox account, thus enabling you to view the transactions as they are sent to Amazon Pay.

### Request Checking Only

Sometimes, you may wish to submit a request to the Gateway in order for it to be ‘validated only’ and not processed by the simulator or sent to the Acquirer. In these cases, the following flag can be used that will stop the processing after the integrity verification has been performed:

| Name      | Mandatory | Description |
| ----------- | ----------- | ----------- |
| checkOnly | No | Check the request for syntax and field value errors only. Do not attempt to submit the transaction for honouring by the Merchant’s financial institution.|

If the request is OK, then a responseCode is returned as 0 (Success); otherwise, the code that would have prevented the request from completing is returned.

Note: in these cases, the request is not stored by the Gateway and is not available within the Merchant Management System (MMS).

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

#### Step 1 - Sort transaction values by their field name

Transaction fields must be in ascending field name order according to their numeric ASCII value.

```php
ksort($tran);
array ( 'action' => 'SALE', 'amount' => '2691', 'cardExpiryDate' => '1213', 'cardNumber' => '4929 4212 3460 0821', 'countryCode' => '826', 'currencyCode' => '826', 'merchantID' => '100001', 'orderRef' => 'Signature Test', 'transactionUnique' => '55f025addd3c2', 'type' => '1' )
```

#### Step 2 - Create url encoded string from sorted fields

Use RFC 1738 and the application/x-www-form-urlencoded media type, which implies that spaces are encoded as plus (+) signs.

```php
$str = http_build_query($tran, '', '&');

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1
```

#### Step 3 - Normalise all line endings in the url encoded string

Convert all CR NL, NL CR, CR character sequences to a single NL character.

```php
$str = str_replace(array('%0D%0A', '%0A%0D', '%0D'), '%0A', $str);

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1
```
#### Step 4 - Append your signature key to the normalised string

The signature key is appended to the normalised string with no separator characters.

```php
$str .= 'DontTellAnyone'

action=SALE&amount=2691&cardExpiryDate=1213&cardNumber=4929+4212+3460+0821&countryCode=826&currencyCode=826&merchantID=100001&orderRef=Signature+Test&transactionUnique=55f025addd3c2&type=1DontTellAnyone
```

#### Step 5 - Hash the string using the SHA-512 algorithm

The normalised string is hashed to a more compact value using the secure SHA-512 hashing algorithm.

```php
$signature = hash('SHA512', $str);

da0acd2c404945365d0e7ae74ad32d57c561e9b942f6bdb7e3dda49a08fcddf74fe6af6b23b8481b8dc8895c12fc21c72c69d60f137fdf574720363e33d94097
```

#### Step 6 - Add the signature to the transaction form or post data

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

