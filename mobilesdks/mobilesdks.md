---
sidebar_position: 1
id: mobilesdks
---

# Mobile SDKs

The Handpoint Android and iOS SDKs provide you with all the tools required to embed payments in your mobile application. The SDKs allow merchants to accept secure payments in a native iOS or Android application. Our SDKs also allow customers to save cards in the mobile app for future payments (using tokenisation to be kept of PCI scope), creating a seamless payment journey. 


### Android

The [Android SDK](https://github.com/handpoint/online-payments-SDK-Android) is an SDK written in Java, showing how the online payment gateway can be integrated within Android applications.

The project requires a device using Android 5 or above to work properly, you will also need Android Studio 2.1+ to build the code. 

There is only one dependency that may be required to be included for this SDK and that is the "**payment**" dependency but this may be already included. If this is the case, you may need to just synchronize the Gradle Build first.


### iOS
The [iOS SDK](https://github.com/handpoint/online-payments-SDK-iOS) is an SDK written in Swift, showing how the online payment gateway can be integrated within iOS applications. 

CryptoSwift must be included as a Framework dependency. We have provided CryptoSwift v0.7.2 as part of our SDK but as a good practice we encourage you to rebuild CryptoSwift and our iOS SDK before use.



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

