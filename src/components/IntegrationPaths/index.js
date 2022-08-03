import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


export default function IntegrationPaths() {
  return (
    <div className="handpointGradient">
       <div
        style={{
          textAlign: 'center',
          display: 'block',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          width: '100%'
        }}>
       <div class='container'>
      <div class="row">
      <div class="col col--12">
        <br></br>
        <h1>Integration Paths</h1>
        </div>
        </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {FeatureListCol4.map((props, idx) => (
            <FeatureCol4 key={idx} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureListCol4 = [
  {
    title: 'Hosted Payment Page',
    Svg: require('@site/static/img/iframe.svg').default,
    description: (
      <>
       The hosted payment page integration is the <b>quickest</b> integration path, it is designed to be shown in a lightbox over your website but can also be embedded in an iFrame.
       You can use this method if you do not want to collect and store cardholder data and be <b>kept OUT of PCI scope</b>. <br></br><br></br> By using the hosted payment page integration, you are <b>kept out of the EMV 3D-Secure flow</b> which allows
       you to keep the integration very simple without any added complexity.
      </>
    ),
  },
  {
    title: 'Hosted Payment Fields',
    Svg: require('@site/static/img/form.svg').default,
    description: (
      <>
       The hosted payment fields can be styled to match your website and fit seamlessly into your payment page. You can use this method if you do not want to collect and store cardholder data and be kept <b>OUT of PCI scope</b>.
      <br></br><br></br>By using the hosted payment fields integration you are <b>involved in the EMV 3D-Secure flow</b>, adding a layer of complexity to the integration but giving you more control over the checkout process. 
      </>
    ),
  },
  {
    title: 'Direct Integration',
    Svg: require('@site/static/img/api.svg').default,
    description: (
      <>
       With the direct integration, your merchant’s website captures the card details and forwards these to the secure Handpoint gateway. 
       The direct integration is more complex than the hosted integration methods and puts your software <b>IN PCI scope</b>.
       <br></br><br></br>By using the direct integration you are <b>involved in the EMV 3D-Secure flow</b>, adding a layer of complexity to the integration but giving you more control over the checkout process. 
      </>
    ),
  },
  {
    title: 'Pay By Link',
    Svg: require('@site/static/img/link.svg').default,
    description: (
      <>
      The Handpoint pay by link solution allows a merchant to create a simple HTML link that can be integrated into a webpage or e-mail. When clicked, the user is taken to the hosted
      payment form with pre-populated product information such as the amount, product description and order reference. We offer the pay by link solution as a QR Code, a simple link
      or a button. 
      </>
    ),
  },
  {
    title: 'Shopping Carts',
    Svg: require('@site/static/img/shopping-cart.svg').default,
    description: (
      <>
       Handpoint integrates directly with all major shopping carts providers. From WooCommerce to Magento and Zencart, Handpoint offers modules plugging directly into each and every webstore
       provider. This is the right solution if you want to provide online payments to merchants already using a shopping cart solution. 
      </>
    ),
  },
  {
    title: 'Mobile SDKs',
    Svg: require('@site/static/img/smartphone.svg').default,
    description: (
      <>
        Handpoint SDKs allow merchants to accept secure payments in a native mobile application. Our SDKs allow customers to save cards in the mobile app and store the tokenised cards for future
         payments, creating a seamless payment journey. Integrate secure in-app payments with Handpoint's Android or iOS SDKs. 
      </>
    ),
  },
];

function FeatureCol4({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}


