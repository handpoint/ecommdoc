---
sidebar_position: 1
id: mobilesdks
---

# Mobile SDKs

The Handpoint Android and iOS SDKs provide you with all the tools required to embed online payments in your mobile application.

Handpoint SDKs allow merchants to accept secure payments in a native mobile app. Our SDKs allow customers to save cards in the mobile app and store the tokenised cards for future payments, creating a seamless payment journey. Integrate secure in-app payments with our Android or iOS SDKs below.


### Android
The [Android SDK repository](https://github.com/handpoint/online-payments-SDK-Android) contains a working sample SDK written in Java to show how the Online Payment Gateway can be integrated within Android applications which can help you understand how the SDK is best used. 

This example will help you understand the global flow when creating payment using the Android SDK.

The project requires a minimum operating system of 4.0.4 to function and to build the project, you require Android Studio 2.1+ 
There is only one dependency that may be required to be included for this SDK and that is the "**payment**" dependency but this may be already included. If this is the case, you may need to just synchronize the Gradle Build first.


### iOS
The [iOS SDK repository](https://github.com/handpoint/online-payments-SDK-iOS) contains a working sample SDK written in Swift to show how the Online Payment Gateway can be integrated within iOS applications. 

CryptoSwift must be included as a Framework dependency. We have provided CryptoSwift v0.7.2 as part of our SDK however as part of good practice we encourage you to rebuild CryptoSwift and our iOS SDK before use.



### Code Examples
<div  style={{
        textAlign: 'center'
      }}>
<div class="container">
<div class="row">
    <div class="col col--6">
        <div class="card-demo">
     <div class="card shadow--md"  style={{ height: '180px' }}>
     <div class="card__header">
      <h3>Android SDK</h3>
     </div>
     <div class="card__body">
      <img style={{ height: '50px'}}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1022px-Android_robot.svg.png?20180121030125"
        alt="Image alt text"
        title="Android SDK" />
     </div>
     <div class="card__footer">
      <a href="https://github.com/handpoint/online-payments-SDK-Android">Github Page</a>
     </div>
     </div>
     </div>
    </div>
    <div class="col col--6">
        <div class="card-demo" >
     <div class="card shadow--md" style={{ height: '180px' }}>
     <div class="card__header">
      <h3>iOS SDK</h3>
     </div>
     <div class="card__body">
      <img style={{ height: '50px'}}
        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c516.png"
        alt="Image alt text"
        title="iOS SDK" />
     </div>
     <div class="card__footer">
      <a href="https://github.com/handpoint/online-payments-SDK-iOS">Github Page</a>
     </div>
     </div>
     </div>
    </div>
    
  </div>
  
</div>
</div>

