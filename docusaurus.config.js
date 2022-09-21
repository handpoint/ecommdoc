// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Handpoint',
  url: 'https://developer-ecomm.handpoint.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'handpointecomm', // Usually your GitHub org/user name.
  projectName: 'handpointecomm.github.io', // Usually your repo name.
  deploymentBranch: 'main',
  themes:[ 
    ['@easyops-cn/docusaurus-search-local',
     {indexBlog:false, 
      indexPages:false,
      indexDocs:true,
      docsDir:['docs','directintegration','paybutton','shoppingcarts','hostedpaymentfields','batchintegration','mobilesdks'],
      docsRouteBasePath:['docs','directintegration','paybutton','shoppingcarts','hostedpaymentfields','batchintegration','mobilesdks']}]],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          //editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-RNDFP191TE',
          anonymizeIP: true,
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'directintegration',
        path: 'directintegration',
        routeBasePath: 'directintegration',
        sidebarPath: require.resolve('./sidebars5.js'),
        includeCurrentVersion: false,
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'paybutton',
        path: 'paybutton',
        routeBasePath: 'paybutton',
        sidebarPath: require.resolve('./sidebars1.js'),
        includeCurrentVersion: false,
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'shoppingcarts',
        path: 'shoppingcarts',
        routeBasePath: 'shoppingcarts',
        sidebarPath: require.resolve('./sidebars2.js'),
        includeCurrentVersion: false,
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'hostedpaymentfields',
        path: 'hostedpaymentfields',
        routeBasePath: 'hostedpaymentfields',
        sidebarPath: require.resolve('./sidebars6.js'),
        includeCurrentVersion: false,
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'batchintegration',
        path: 'batchintegration',
        routeBasePath: 'batchintegration',
        sidebarPath: require.resolve('./sidebars7.js'),
        includeCurrentVersion: false,
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'mobilesdks',
        path: 'mobilesdks',
        routeBasePath: 'mobilesdks',
        sidebarPath: require.resolve('./sidebars3.js'),
        includeCurrentVersion: false,
        // ... other options
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        style: 'dark',
        title: '',
        logo: {
          alt: 'My Site Logo',
          src: '/img/handpoint-logo-hvitt.svg',
          width: 75,
          href: 'https://developer.handpoint.com/',
        },
        items: [
          {
            className: 'navbar-statuspage-icon',
            href: 'https://status.handpoint.com',
            position: 'right',
            'aria-label': 'Status Page',
          },
          {
            to: 'cnpdocs',
            label: 'Getting Started',
          },
          {
            type: 'doc',
            docId: 'overview',
            position: 'left',
            label: 'Hosted Payment Page',
          },
          {
            type: 'doc',
            docId: 'overview',
            docsPluginId: 'hostedpaymentfields',
            position: 'left',
            label: 'Hosted Payment Fields',
          },
          {
            type: 'doc',
            docId: 'overview',
            docsPluginId: 'directintegration',
            position: 'left',
            label: 'Direct Integration',
          },
          {
            type: 'doc',
            docId: 'overview',
            docsPluginId: 'batchintegration',
            position: 'left',
            label: 'Batch Integration',
          },
          {
            type: 'doc',
            docId: 'basicpaybutton',
            docsPluginId: 'paybutton',
            position: 'left',
            label: 'Pay By Link',
          },
          {
            to: '/shoppingcarts/shoppingcarts',
            position: 'left',
            label: 'Shopping Carts',

          },
          {
            to: '/mobilesdks/mobilesdks',
            position: 'left',
            label: 'Mobile SDKs',

          },
          // {
          //   to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/handpoint',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'In-Person Payments Docs',
                href: 'https://developer.handpoint.com/cpdocs/index.html',
              },
              {
                label: 'Online Payments Docs',
                to: '/cnpdocs/index.html',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Handpoint Website',
                href: 'https://handpoint.com',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/handpoint',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/handpointltd?lang=en',
              },
            ],
          },
          {
            title: 'Get our Apps',
            items: [
              {
                label: 'Get it on Google Play',
                href: 'https://play.google.com/store/apps/details?id=com.handpoint.hipos&hl=en&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
              },

              {
                label: 'Download on the App Store',
                href: 'https://apps.apple.com/us/app/handpoint/id1450546788?itsct=apps_box_link&itscg=30200',
              },

            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'Handpoint Status Page',
                href: 'https://status.handpoint.com',
              },
              {
                label: 'FAQ',
                href: 'https://handpoint.atlassian.net/wiki/spaces/PD/overview?homepageId=5898250',
              },
              {
                label: 'Subscribe to the Handpoint Newsletter',
                href: 'https://handpoint.us6.list-manage.com/subscribe?u=4d9dff9e7edb7e57a67a7b252&id=0a2179241e',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/handpoint',
              },
            ],
          },
        ],
        logo: {
          alt: 'Handpoint Logo',
          src: 'https://handpoint.imgix.net/handpoint-logo-w.png?w=150',
          href: 'https://www.handpoint.com'
        },
        copyright: `Copyright © ${new Date().getFullYear()} Handpoint`,
      },
      prism: {
        additionalLanguages: ['php','groovy'],
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  
};

module.exports = config;
