import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


export default function IntegrationPaths() {
  return (
    <section>
      <div className="container">
        <div className="row">
          {FeatureListCol6.map((props, idx) => (
            <FeatureCol6 key={idx} {...props} />
          ))}
        </div>
        <div className="row">
          {FeatureListCol4.map((props, idx) => (
            <FeatureCol4 key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureListCol6 = [
  {
    title: 'Hosted Integration',
    Svg: require('@site/static/img/iframe.svg').default,
    description: (
      <>
       The hosted integration method makes it easy to add secure payment processing to your online business, using the Handpoint hosted payment page or Handpoint payment fields.
       You can use this method if you do not want to collect and store cardholder data and be kept <b>OUT of PCI scope</b>. The standard hosted payment page is designed to be shown
       in a lightbox over your website. The hosted payment fields can be styled to match your website and fit seamlessly into your payment page. 
      </>
    ),
  },
  {
    title: 'Direct Integration',
    Svg: require('@site/static/img/api.svg').default,
    description: (
      <>
       With direct integration, your merchant’s website (complete with secure certificate) captures the user’s personal and credit card details and then forwards these behind the scenes
       to the secure Handpoint gateway. Direct integration is more complex than the hosted integration method and puts your software <b>IN PCI scope</b> as you will be handling card data.
       The benefit of this integration method is that the entire shopping process can occur within your merchants’ websites.
      </>
    ),
  },
];

const FeatureListCol4 = [
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
       Handpoint integrates directly with all major shopping carts. From WooCommerce to Magento and Zencart, Handpoint offers modules plugging directly into your webstore. 
      </>
    ),
  },
  {
    title: 'Mobile SDKs',
    Svg: require('@site/static/img/smartphone.svg').default,
    description: (
      <>
        Handpoint SDKs allow merchants to accept secure payments in a native mobile app. Our SDKs allow customers to save cards in the mobile app and store the tokenised cards for future
         payments, creating a seamless payment journey. Integrate secure in-app payments with Handpoint's Android or iOS SDKs. 
      </>
    ),
  },
];


function FeatureCol6({Svg, title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function FeatureCol4({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}


