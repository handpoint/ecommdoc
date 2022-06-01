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
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={` Online Docs`}
      description="documentation for online payments">
      <Header />
      <main>
        <SectionHeader />
        <IntegrationPaths />
        <GatewayIntegrationGuide />
        <PayByLink />
        <SampleCode/>
        <MobileSdks/> 
        <ShoppingCarts/>
        <TechnicalIntegrationLifecycle/>
        <TermsAndConditions/>
      </main>
    </Layout>
  );




  function Header() {
    return (
      <div
        style={{
          backgroundColor: ' #25365D',
          textAlign: 'center',
          display: 'block',
          height: '250px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          width: '100%'
        }}>
        <a href="/"><img src="/img/handpoint-logo-hvitt.svg" alt="Logo" width="260px"/></a>
        <br></br>
        <h2 style={{
          color: 'white'
        }} >Integrate online payments into your software</h2>
      </div>
    );
  }

  function SectionHeader() {
    return (
        <div style={{
          textAlign: 'center',
          display: 'block',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          width: '100%'
        }}>
        <br></br>
        <h1 >Integration Paths</h1>
      </div>
    );
  }

  function GatewayIntegrationGuide() {
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
     <div class='container'>
      <div class="row">
      <div class="col col--12">
        <br></br>
        <h2 style={{

        }} >Direct & Hosted Integration Documentation</h2>
        <p style={{

        }} >This guide provides the information required to integrate with our Gateway and gives basic examples of code for doing so.
          It is expected that you have some experience in server-side scripting with languages such as PHP or ASP.</p>

        <div>
          <a class="button button--primary" href="/docs/GatewayIntegrationGuide-V3.0.pdf" download="IntegrationGuideHandpoint">Download the latest Gateway Integration Guide</a>
        </div>
        </div>
        </div>
        </div>
      </div>

    );
  }


  function PayByLink() {
    return (
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
        <h2 style={{

        }} >Pay By Link Documentation</h2>
        <p style={{

        }} >
        The Pay By Link integration allows you to have full control over what information is passed to the Handpoint gateway via the Pay Button functionality.
        It uses the full list of hosted integration fields outlined in the above Gateway Integration Guide.
        </p>
        <div class="card__footer">
          <a class="button button--primary" href="/docs/PayButtonHandpoint.pdf" download="PayButtonHandpoint">Download the latest Pay Button Integration Guide</a>
        </div>
      </div>
      </div>
      </div> 
      </div>

    );
  }

  function MobileSdks() {
    return (
      <div style={{
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
        <h2 style={{

        }} >Mobile SDKs</h2>
        <p style={{

        }} >The Handpoint Android and iOS SDKs provide you with all the tools required to embed online payments in your mobile application.</p>

       <div class="container">
        <div class="row">
          <div class="col col--6">
            <div class="card-demo">
              <div class="card" style={{ height: '180px',backgroundColor: ' #e9ecef'}}>
                <div class="card__header">
                  <h3>Android</h3>
                </div>
                <div class="card__body">
                  <img
                    src="https://cardstream.com/wp-content/uploads/2019/01/android_ico-1.png"
                    alt="Image alt text"
                    title="Android" />
                </div>
                <div class="card__footer">
                  <a href="https://github.com/handpoint/online-payments-SDK-Android" target='_blank'>Github Page</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col col--6">
            <div class="card-demo" >
            <div class="card" style={{ height: '180px', backgroundColor: ' #e9ecef'}}>
                <div class="card__header">
                  <h3>iOS</h3>
                </div>
                <div class="card__body">
                  <img
                    src="https://cardstream.com/wp-content/uploads/2019/01/apple_ico-1.png"
                    alt="Image alt text"
                    title="iOS" />
                </div>
                <div class="card__footer">
                  <a href="https://github.com/handpoint/online-payments-SDK-iOS" target='_blank'>Github Page</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>

    );
  }


  function ShoppingCarts() {
    return (
      <div  style={{
        backgroundColor: ' #e9ecef',
        textAlign: 'center',
        display: 'block',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        width: '100%'
      }}>
      <div class="container">
      <div class="row">
      <div class="col col--12">
        <br></br>
        <h2>Shopping Carts</h2>
        <p>eCommerce Modules, Handpoint integrates directly with all major shopping carts.</p>

      <div class="container">
        <div class="row">
          <div class="col col--3">
              <div class="card-demo">
               <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>WooCommerce</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://woocommerce.com" target='_blank'>
                      <img style={{ height: '50px'}}
                      src="https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce.svg"
                      alt="Image alt text"
                      title="WooCommerce" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-WooCommerce" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>WooCommerce Subscriptions</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://woocommerce.com/products/woocommerce-subscriptions/" target='_blank'>
                      <img style={{ height: '25px' }}
                      src="https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce.svg"
                      alt="Image alt text"
                      title="WooCommerce" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-WooCommerce" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>ZenCart</h3>
                    </div>
                    <div class="card__body">
                      <a href="https://www.zen-cart.com/" target='_blank'>
                      <img style={{height: '50px'}}
                      src="https://www.zen-cart.com/images/styles/zencart/style/zen-cart-logo.png"
                      alt="Image alt text"
                      title="ZenCart" 
                      />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-ZenCart" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px' }}>
                    <div class="card__header">
                      <h3>CubeCart</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://www.cubecart.com/" target='_blank'>
                      <img style={{height: '50px'}}
                      src="https://s3.ap-southeast-1.amazonaws.com/easyparcel-static/Public/source/general/img/integrations/2018-06/cubecart.png"
                      alt="Image alt text"
                      title="CubeCart" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-CubeCart" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
        </div>
        <br/>

        <div class="row">
          <div class="col col--3">
              <div class="card-demo">
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>opencart</h3>
                    </div>
                    <div class="card__body">
                        <a href="http://www.opencart.com/" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://www.opencart.com/application/view/image/icon/opencart-logo.png"
                      alt="Image alt text"
                      title="opencart" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-OpenCart" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>Magento</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://business.adobe.com/products/magento/magento-commerce.html" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magento_Logo.svg/640px-Magento_Logo.svg.png"
                      alt="Image alt text"
                      title="Magento" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-Magento" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px' }}>
                    <div class="card__header">
                      <h3>PrestaShop</h3>
                    </div>
                    <div class="card__body">
                    <a href="http://www.prestashop.com/" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://www.prestashop.com/sites/all/themes/prestashop/images/logos/logo-fo-prestashop-colors.svg"
                      alt="Image alt text"
                      title="PrestaShop" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-PrestaShop" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>CS Cart</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://www.cs-cart.com" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://paylike.es/img/cscart.png"
                      alt="Image alt text"
                      title="CS Cart" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-CS-Cart" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
        </div>
        <br/>

        <div class="row">
          <div class="col col--3">
              <div class="card-demo">
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>XCart</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://www.x-cart.com" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Xc-color.svg/1200px-Xc-color.svg.png"
                      alt="Image alt text"
                      title="XCart" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-X-Cart" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px' }}>
                    <div class="card__header">
                      <h3>Oscommerce</h3>
                    </div>           
                    <div class="card__body">
                    <a href="https://www.oscommerce.com" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://www.oscommerce.com/images/oscommerce_black.png"
                      alt="Image alt text"
                      title="Oscommerce" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>Übercart</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://www.drupal.org/project/ubercart" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://www.drupal.org/files/styles/grid-3-2x/public/project-images/logo_6.png?itok=ZMFI2Wc3"
                      alt="Image alt text"
                      title="Übercart" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-Ubercart" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>Drupal</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://drupalcommerce.org/" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://drupalcommerce.org/sites/default/files/dclogo_stacked_2c_on_white.png"
                      alt="Image alt text"
                      title="Drupal" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
        </div>
        <br/>

        <div class="row">
          <div class="col col--3">
              <div class="card-demo">
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>HikaShop</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://www.hikashop.com/" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://www.hikashop.com/images/branding/hikashop_logo1.png"
                      alt="Image alt text"
                      title="HikaShop" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>carthrob</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://www.cartthrob.com/" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://image4.owler.com/logo/cartthrob_owler_20160302_231245_original.png"
                      alt="Image alt text"
                      title="carthrob" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-CartThrob" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                      <h3>shopware</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://www.shopware.com/en/" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://assets.shopware.com/media/logos/shopware_logo_blue.svg"
                      alt="Image alt text"
                      title="shopware" />
                      </a>
                    </div>
                    <div class="card__footer">
                      <a href="https://github.com/handpoint/online-payments-Shopware" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          </div>
        </div>

        <br></br>
        <p style={{

        }} >The following modules are not developed directly by Handpoint. For support, please contact the module developers directly.</p>

      <div class="container">
        <div class="row">
            <div class="col col--3">
              <div class="card-demo">
              <div class="card" style={{ height: '180px' }}>
                    <div class="card__header">
                        <h3>ekm</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px'}}
                        src="https://www.ekm.com/images/images-new/logo/ekm-logo-blue.svg"
                        alt="Image alt text"
                        title="ekm" />
                    </div>
                    <div class="card__footer">
                        <a href="https://www.ekm.com" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px' }}>
                    <div class="card__header">
                        <h3>Clickartpro</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px' }}
                        src="https://www.clickcartpro.co.uk/skins/gbw_custom/media/logo.gif"
                        alt="Image alt text"
                        title="Clickartpro" />
                    </div>
                    <div class="card__footer">
                        <a href="http://www.clickcartpro.co.uk" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>nopCommerce</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://www.nopcommerce.com/Themes/OfficialSite/Content/images/logo.svg"
                        alt="Image alt text"
                        title="nopCommerce" />
                    </div>
                    <div class="card__footer">
                        <a href="https://www.nopcommerce.com/en" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>admitOne</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://www.admit-one.eu/images/admit-one_logo_red_rgb.svg"
                        alt="Image alt text"
                        title="admitOne" />
                    </div>
                    <div class="card__footer">
                        <a href="https://www.admit-one.eu" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <br/>
        <div class="row">
            <div class="col col--3">
              <div class="card-demo">
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>Spreedly</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px'}}
                        src="https://support.pingidentity.com/servlet/servlet.FileDownload?file=00P1W00001Jyz4rUAB"
                        alt="Image alt text"
                        title="Spreedly" />
                    </div>
                    <div class="card__footer">
                        <a href="https://www.spreedly.com/" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>Foxy.io</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px' }}
                        src="https://www.foxy.io/user/themes/default/assets/foxy_logo_preview.png"
                        alt="Image alt text"
                        title="Foxy.io" />
                    </div>
                    <div class="card__footer">
                        <a href="https://foxy.io/" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card"  style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>eautomate</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://www.eautomate.com/Media/Images/Platforms%20and%20Services/automate-head.png"
                        alt="Image alt text"
                        title="eautomate" />
                    </div>
                    <div class="card__footer">
                        <a href="https://www.eautomate.com/platform" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px' }}>
                    <div class="card__header">
                        <h3>TAPN.TO</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://www.tapnto.co.uk/bl-themes/tapnto/img/TNTlogo_Purple_Black.svg"
                        alt="Image alt text"
                        title="TAPN.TO" />
                    </div>
                    <div class="card__footer">
                        <a href="https://www.tapnto.co.uk" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>

    );
  }

  function SampleCode() {
    return (
      <div style={{
        backgroundColor: ' #e9ecef',
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
        <h2>Sample Code</h2>
        <p>Integration guides are great, but there’s nothing like a bit of sample code to make the whole process easier! Download your code below:</p>

        <div class="container">
        <div class="row">
            <div class="col col--3">
              <div class="card-demo">
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>PHP</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px'}}
                        src="https://www.php.net/images/logos/new-php-logo.svg"
                        alt="Image alt text"
                        title="PHP" />
                    </div>
                    <div class="card__footer">
                        <a href="https://github.com/handpoint/online-payments-SDK-PHP" target='_blank'>Sample Code</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>C#</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px' }}
                        src="https://docs.microsoft.com/cs-cz/windows/images/csharp-logo.png"
                        alt="Image alt text"
                        title="C#" />
                    </div>
                    <div class="card__footer">
                        <a href="https://github.com/handpoint/online-payments-SDK-CSharp" target='_blank'>Sample Code</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>Java</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://seeklogo.com/images/J/java-logo-41D4155FC3-seeklogo.com.png"
                        alt="Image alt text"
                        title="Java" />
                    </div>
                    <div class="card__footer">
                        <a href="https://github.com/handpoint/online-payments-SDK-Android" target='_blank'>Sample Code</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>Perl</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://svgarchive.com/wp-content/uploads/perl-programming-language.svg"
                        alt="Image alt text"
                        title="Perl" />
                    </div>
                    <div class="card__footer">
                        <a href="https://github.com/handpoint" target='_blank'>Sample Code</a>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <br/>
        <div class="row">
            <div class="col col--3">
              <div class="card-demo">
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>Python</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px'}}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1024px-Python-logo-notext.svg.png"
                        alt="Image alt text"
                        title="Python" />
                    </div>
                    <div class="card__footer">
                        <a href="https://github.com/handpoint" target='_blank'>Sample Code</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>NodeJS</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px'}}
                        src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg"
                        alt="Image alt text"
                        title="NodeJS" />
                    </div>
                    <div class="card__footer">
                        <a href="https://github.com/handpoint/online-payments-SDK-NodeJS" target='_blank'>Sample Code</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>Ruby</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/198px-Ruby_logo.svg.png?20101129171534"
                        alt="Image alt text"
                        title="Ruby" />
                    </div>
                    <div class="card__footer">
                        <a href="https://github.com/handpoint/online-payments-SDK-Ruby" target='_blank'>Sample Code</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px'}}>
                    <div class="card__header">
                        <h3>Swift</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Swift_logo.svg/191px-Swift_logo.svg.png?20210606004230"
                        alt="Image alt text"
                        title="Swift" />
                    </div>
                    <div class="card__footer">
                        <a href="https://github.com/handpoint/online-payments-SDK-iOS" target='_blank'>Sample Code</a>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

    );
  }

  function TechnicalIntegrationLifecycle() {
  return (
<div style={{
      textAlign: 'center',
      display: 'block',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      width: '100%'
    }}>
  <div class="container">
    <div class="row">
      <div class="col col--12" >
        <div>
          <h2>Technical Integration Lifecycle</h2>
          <p>Please contact <a target="_blank" href="mailto:sales@handpoint.com">sales@handpoint.com</a> to kickstart an integration process.
            Once the integration starts you will get a dedicated slack channel with the Handpoint developers to address any issues that might arise.
            Once the integration is ready, the Handpoint team will certify the solution by running a set of standard tests to make sure the integration is robust and ready for Go Live.
            The Handpoint team will then closely follow the first pilot merchants to make sure the solution is ready to scale.</p>
          <div align="center">
            <img style={{ width:'65%', height:'auto'}} src="/img/ecomm-technical-integration-lifecycle.png" alt="Technical integration lifecycle"></img>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

  function TermsAndConditions() {
    return (
    <div  style={{ padding: '20px',
    backgroundColor: ' #e9ecef',}}>
      <div class="container">
      <div class="row">
        <div class="col col--12" >
          <div>
            <h2>Terms & Conditions</h2>
            <p>By using this documentation you agree to be bound by the following:
              <br></br>
              <br></br>
              All information on this website including all documentation, code examples, pictures, drawings, graphs and any other information whatsoever
              (jointly "the API Documentation“) was created by and is the intellectual property of Handpoint and as such subject to copyright.
              The intented purpose of the API Documentation is to enable third party software companies to embed acceptance of card payments
              with Handpoint into their applications and no warranties, neither expressed nor implied, are provided regarding the accuracy of
              the documentation or the API service itself.
              <br></br>
              <br></br>
              If you work for a 3rd party software company and have a need for embedded payments you are only allowed to use the information for
              the intended purpose i.e. to embed Handpoint payment acceptance into your application. Specifically, you are not allowed to make copies of the API
              Documentation and present as your own as that is a breach of copyright. You are also not allowed to wrap your own API around the Handpoint API and present
              as your own unless you have a written agreement with Handpoint to do so.
              <br></br>
              <br></br>
              Handpoint reserves the right to change these terms and conditions at any time without warning.</p>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  </div>

    );
  }

}
