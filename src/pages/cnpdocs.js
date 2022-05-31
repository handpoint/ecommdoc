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
      title={`Getting Started`}
      description="Description will go into a meta tag in <head />">
      <Header />
      <main>
        <SectionHeader />
        <IntegrationPaths />
        <GatewayIntegrationGuide />
        <PayByLink />
        <MobileSdks/> 
        <ShoppingCarts/>
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
        <a href="/doc"><img src="img/handpoint-logo-hvitt.svg" alt="Logo" width="260px"/></a>
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
        <br></br>
        <h2 style={{

        }} >Direct & Hosted Integration Documentation</h2>
        <p style={{

        }} >This guide provides the information required to integrate with our Gateway and gives a very basic example of code for doing so.
          It is expected that you have some experience in server- side scripting with languages such as PHP or ASP.</p>

        <div>
          <a class="button button--primary" href="docs/GatewayIntegrationGuide-V3.0.pdf" download="IntegrationGuideHandpoint">Download the latest Gateway Integration Guide</a>
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
        <br></br>
        <h2 style={{

        }} >Pay By Link</h2>
        <p style={{

        }} >
        The Pay By Link advanced integration allows you to have full control over what information is passed to the Handpoint gateway via the Pay Button and use the full list of hosted integration
        fields outlined in the above Gateway Integration Guide.
        </p>
        <div class="card__footer">
          <a class="button button--primary" href="docs/PayButtonHandpoint.pdf" download="PayButtonHandpoint">Download the latest Pay Button Guide</a>
        </div>
      </div>

    );
  }

  function MobileSdks() {
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
        <br></br>
        <h2 style={{

        }} >Mobile SDKs</h2>
        <p style={{

        }} >The Handpoint Android and iOS SDKs provide you with all the tools required to embed online payments in your mobile application.</p>

       <div class="container">
        <div class="row">
          <div class="col col--6">
            <div class="card-demo">
              <div class="card" style={{ height: '180px',}}>
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
                  <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col col--6">
            <div class="card-demo" >
            <div class="card" style={{ height: '180px'}}>
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
                  <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
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
        <br></br>
        <h2 style={{

        }} >Shopping Carts</h2>
        <p style={{

        }} >eCommerce Modules, Handpoint integrates directly with all major shopping carts.</p>

      <div class="container">
        <div class="row">
          <div class="col col--3">
              <div class="card-demo">
               <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
                    <div class="card__header">
                      <h3>CubeCart</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://www.cubecart.com/" target='_blank'>
                      <img style={{height: '50px'}}
                      src="https://www.cubecart.com/img/logo.cc.jpg"
                      alt="Image alt text"
                      title="CubeCart" />
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
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
                    <div class="card__header">
                      <h3>CS Cart</h3>
                    </div>
                    <div class="card__body">
                    <a href="https://www.cs-cart.com" target='_blank'>
                      <img style={{ height: '50px' }}
                      src="https://www.cs-cart.com/blog/wp-content/uploads/for_blog_logo.png"
                      alt="Image alt text"
                      title="Logo Title Text 1" />
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
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
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
                      <a href="https://github.com/handpoint" target='_blank'>Github Page</a>
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
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
                    <div class="card__header">
                        <h3>ekm</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px'}}
                        src="https://www.ekm.com/images/images-new/logo/ekm-logo-blue.svg"
                        alt="Image alt text"
                        title="Logo Title Text 1" />
                    </div>
                    <div class="card__footer">
                        <a href="https://www.ekm.com" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
                    <div class="card__header">
                        <h3>Clickartpro</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px' }}
                        src="https://www.clickcartpro.co.uk/skins/gbw_custom/media/logo.gif"
                        alt="Image alt text"
                        title="Logo Title Text 1" />
                    </div>
                    <div class="card__footer">
                        <a href="http://www.clickcartpro.co.uk" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
                    <div class="card__header">
                        <h3>nopCommerce</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://www.nopcommerce.com/Themes/OfficialSite/Content/images/logo.svg"
                        alt="Image alt text"
                        title="Logo Title Text 1" />
                    </div>
                    <div class="card__footer">
                        <a href="https://www.nopcommerce.com/en" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
                    <div class="card__header">
                        <h3>admitOne</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://www.admit-one.eu/images/admit-one_logo_red_rgb.svg"
                        alt="Image alt text"
                        title="Logo Title Text 1" />
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
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
                    <div class="card__header">
                        <h3>Spreedly</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px'}}
                        src="https://support.pingidentity.com/servlet/servlet.FileDownload?file=00P1W00001Jyz4rUAB"
                        alt="Image alt text"
                        title="Logo Title Text 1" />
                    </div>
                    <div class="card__footer">
                        <a href="https://www.spreedly.com/" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
                    <div class="card__header">
                        <h3>Foxy.io</h3>
                    </div>
                    <div class="card__body">
                        <img style={{ height: '50px' }}
                        src="https://www.foxy.io/user/themes/default/assets/foxy_logo_preview.png"
                        alt="Image alt text"
                        title="Logo Title Text 1" />
                    </div>
                    <div class="card__footer">
                        <a href="https://foxy.io/" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
                    <div class="card__header">
                        <h3>eautomate</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://www.eautomate.com/Media/Images/Platforms%20and%20Services/automate-head.png"
                        alt="Image alt text"
                        title="Logo Title Text 1" />
                    </div>
                    <div class="card__footer">
                        <a href="https://www.eautomate.com/platform" target='_blank'>Website</a>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col--3">
              <div class="card-demo" >
              <div class="card" style={{ height: '180px', backgroundColor: '#e9ecef' }}>
                    <div class="card__header">
                        <h3>TAPN.TO</h3>
                    </div>
                    <div class="card__body">
                        <img style={{height: '50px'}}
                        src="https://www.tapnto.co.uk/bl-themes/tapnto/img/TNTlogo_Purple_Black.svg"
                        alt="Image alt text"
                        title="Logo Title Text 1" />
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

    );
  }

}
