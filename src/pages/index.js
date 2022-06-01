import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import IntegrationPaths from '@site/src/components/IntegrationPaths';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        {/* <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div> */}
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      {/* <HomepageHeader /> */}
      <Header></Header>
      <main>
        <IntegrationPaths />
        <Integrations></Integrations>
        {/* <Restapi></Restapi> */}
        <Paybutton></Paybutton>
      </main>
    </Layout>
  );




  function Header() {
    return (
      <div
        style={{
          backgroundColor: ' #34495e',
          textAlign: 'center',
          display: 'block',
          height: '250px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          width: '100%'
        }}>
        <img src="/img/handpoint-logo-hvitt.svg" alt="Logo" width="260px" />
        <br></br>
        <h2 style={{
          color: 'white'
        }} >Integrate online payments into your software</h2>
      </div>
    );
  }



  function Integrations() {
    return (
      <div
        style={{
          backgroundColor: ' #e9ecef',
          textAlign: 'center',
          display: 'block',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          width: '100%'
        }}>
        {/* <img src="/img/handpoint-logo-hvitt.svg" alt="Logo" width="260px" /> */}
        <br></br>
        <h2 style={{

        }} >Ecommerce Integrations</h2>
        <p style={{

        }} >This guide provides the information required to integrate with our Gateway and gives a very basic example of code for doing so.
          It is expected that you have some experience in server- side scripting with languages such as PHP or ASP.</p>


        <div class="row">
        </div>

        <div class="card__footer">
          <div class="row">
            <div class="col col--6">
              <div class="card-demo" style={{ fontSize: '14px' }}>
                <div class="card shadow--md ">
                  <div class="card__header">
                    <b><p>Hosted Integration</p></b>
                  </div>
                  <div class="card__body" align="center">
                    <p>The <strong>Hosted Integration</strong> method makes it easy to add secure payment processing to your e-commerce business, using our Hosted Payment Pages.
                      You can use this method if you do not want to collect and store Cardholder data. The Hosted Integration method works by redirecting the Customer
                      to our Hosted Payment Page, which will collect the customer’s payment details and process the payment before redirecting the Customer
                      back to a page on your website, letting you know the payment outcome. This allows you the quickest path to integrating with the Gateway.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col col--6"><div class="card-demo" style={{ fontSize: '14px' }}>
              <div class="card shadow--md ">
                <div class="card__header" >
                  <b><p>Direct Integration</p></b>
                </div>
                <div class="card__body" align="center">
                  <p>The <strong>Direct Integration</strong> works by allowing you to keep the Customer on your system throughout the checkout process, collecting the Customer’s payment details on
                    your own secure server before sending the collected data to our Gateway for processing. This allows you to provide a smoother, more complete checkout process to the Customer.
                    In addition to basic sales processing, the Direct Integration can be used to perform other actions such as refunds and cancellations, which can provide a more advanced integration with our Gateway.</p>
                </div>
              </div>
            </div>
            </div>
          </div>
          <br></br>
          <a class="button button--primary" href="/docs/integrationguide.pdf" download="IntegrationGuideHandpoint">Get the latest Gateway Integration Guide!</a>

        </div>

      </div>

    );
  }


  function Restapi() {
    return (
      <div
        style={{
          backgroundColor: ' #34495e',
          textAlign: 'center',
          display: 'block',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          width: '100%'
        }}>
        {/* <img src="/img/handpoint-logo-hvitt.svg" alt="Logo" width="260px" /> */}
        <br></br>
        <h2 style={{
          color: 'white'
        }} >REST API</h2>
        <p style={{
          color: 'white'
        }} >This guide provides the information required to integrate with our Gateway and gives a very basic example of code for doing so.
          It is expected that you have some experience in server- side scripting with languages such as PHP or ASP.</p>

        <p style={{
          color: 'white'
        }} >Download our Postman collection and start testing our REST API now!</p>

        <div>
          <a class="button button--primary" href="/docs/integrationguide.pdf" download="RestApiIntegrationHandpoint" >Get the latest REST API Integration Guide!</a>
          <div class="space"></div>
          <a class="button button--primary" href="/docs/eCommerceRESTAPIHandpoint.json" download="eCommerceRESTAPIHandpoint.json" >Download Postman Collection!</a>

        </div>



        {/* <div class="card__footer">
            <a class="button button--primary" margin="5px" href="/docs/integrationguide.pdf" download="RestApiIntegrationHandpoint" >Get the latest REST API Integration Guide!</a>
           <a class="button button--primary" margin="5px" href="/docs/integrationguide.pdf" download="RestApiIntegrationHandpoint" >API Integration Guide!</a>
         </div> */}

      </div>

    );
  }


  function Paybutton() {
    return (
      <div
        style={{

          textAlign: 'center',
          display: 'block',
          height: '250px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          width: '100%'
        }}>
        {/* <img src="/img/handpoint-logo-hvitt.svg" alt="Logo" width="260px" /> */}
        <br></br>
        <h2 style={{

        }} >Pay Button</h2>
        <p style={{

        }} >The Pay Button allows a Merchant to create a simple HTML link that can be integrated into a webpage or e-mail.
          When clicked, the user is taken to the hosted payment form with pre-populated product information such as the amount,
          product description and order reference.
        </p>
        <div class="card__footer">
          <a class="button button--primary" href="/docs/PayButtonHandpoint.pdf" download="PayButtonHandpoint">Get the latest Pay Button Guide!</a>
        </div>
      </div>

    );
  }

}
