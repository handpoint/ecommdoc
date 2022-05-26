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
    title: 'Direct Integration',
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

const FeatureListCol4 = [
  {
    title: 'Pay By Link',
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
    title: 'Shopping Carts',
    Svg: require('@site/static/img/paylink.svg').default,
    description: (
      <>
        The Pay Button allows a Merchant to create a simple HTML link that can be integrated into a webpage or e-mail. 
        When clicked, the user is taken to the hosted payment form with pre-populated product information such as the amount, 
        product description and order reference.
      </>
    ),
  },
  {
    title: 'Mobile SDKs',
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


