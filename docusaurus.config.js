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
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
        id: 'restapi',
        path: 'restapi',
        routeBasePath:'restapi',
        sidebarPath: require.resolve('./sidebars.js'),
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
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'gettingstarted',
          //   position: 'left',
          //   label: 'Guide',
          // },
          // {
          //   type: 'doc',
          //   docId: 'restapiintroduction',
          //   position: 'left',
          //   docsPluginId: 'restapi',
          //   label: 'REST API',
          // },
          // {
          //   type: 'docsVersionDropdown',
          //   docsPluginId: 'restapi',
          //   position: 'left',
          // },
          
          // {
          //   to: '/blog', label: 'Blog', position: 'left'},
          // {
          //   href: 'https://github.com/handpoint',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Handpoint Card Present',
                href: 'https://handpoint.github.io/doc/',
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
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
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
