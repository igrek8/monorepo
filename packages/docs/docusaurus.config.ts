import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { DocusaurusPluginTypeDocApiOptions } from 'docusaurus-plugin-typedoc-api/lib/types';
import path from 'path';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Monorepo',
  favicon: 'img/favicon.png',
  url: 'https://igrek8.github.io',
  baseUrl: '/monorepo/',
  organizationName: 'igrek8',
  projectName: 'monorepo',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/igrek8/monorepo/tree/main/packages/docs',
          sidebarCollapsed: false,
          sidebarCollapsible: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Monorepo',
      items: [
        {
          type: 'html',
          position: 'right',
          value:
            '<a target="_blank" rel="noopener noreferrer" href="https://codecov.io/gh/igrek8/monorepo" style="display: block; margin-top: 9px;"><img src="https://codecov.io/gh/igrek8/monorepo/graph/badge.svg?token=ZCGA9347TH"/></a>',
        },
        {
          href: 'https://github.com/igrek8/monorepo',
          label: 'GitHub',
          position: 'right',
        },
        {
          to: 'api',
          label: 'API',
          position: 'left',
        },
      ],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: false,
      },
    },
    prism: {
      theme: prismThemes.vsLight,
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'theme-code-block-error-line',
          line: 'throw-error-next-line',
        },
      ],
    },
    colorMode: {
      disableSwitch: true,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      'docusaurus-plugin-typedoc-api',
      {
        projectRoot: path.join(__dirname, '..', '..'),
        packages: ['packages/box'],
        readmes: false,
        changelogs: false,
        typedocOptions: {
          excludeProtected: true,
          excludeInternal: true,
          excludePrivate: true,
          hideGenerator: true,
        },
      } satisfies Partial<DocusaurusPluginTypeDocApiOptions>,
    ],
  ],
};

export default config;
