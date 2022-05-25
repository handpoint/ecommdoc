// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Handpoint eComm',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
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
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'paybutton',
        path: 'paybutton',
        routeBasePath:'paybutton',
        sidebarPath: require.resolve('./sidebars1.js'),
        includeCurrentVersion: true,
        // ... other options
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Handpoint eComm',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
          width: 170,
        },
        items: [
          {
            type: 'doc',
            docId: 'gettingstarted',
            position: 'left',
            label: 'Ecommerce Integrations',
          },
           {
            to:'/paybutton/paybutton',
            position: 'left',
            label: 'Pay Button',
            
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
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Card Present Docs',
                href: 'https://handpoint.github.io/doc/',
              },
              {
                label: 'Ecommerce Docs',
                href: '/',
              },
              {
                label: 'Legacy Docs',
                href: 'https://www.handpoint.com/docs/device/Basics/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Handpoint',
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
