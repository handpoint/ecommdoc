import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Ecommerce Integration',
    Svg: require('@site/static/img/integration.svg').default,
    description: (
      <>
        This guide provides the information required to integrate with our Gateway 
        and gives a very basic example of code for doing so. It is expected that you have 
        some experience in server- side scripting with languages such as PHP or ASP.
      </>
    ),
  },
  {
    title: 'REST API',
    Svg: require('@site/static/img/cloud.svg').default,
    description: (
      <>
        The Gateway’s REST Integration provides a method for application developers to access the Gateway’s 
        data in order to build their own applications. Third-party applications would require in 
        depth programming knowledge and must be PCI compliant.
      </>
    ),
  },
  {
    title: 'Pay Button',
    Svg: require('@site/static/img/paylink.svg').default,
    description: (
      <>
        The Pay Button allows a Merchant to create a simple HTML link that can be integrated into a webpage or e-mail. 
        When clicked, the user is taken to the hosted payment form with pre-populated product information such as the amount, 
        product description and order reference.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
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

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
