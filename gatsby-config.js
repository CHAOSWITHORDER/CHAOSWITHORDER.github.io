module.exports = {
  siteMetadata: {
    siteTitle: `liuxingyuan Blog`,
    defaultTitle: `liuxingyuan Blog`,
    siteTitleShort: `liuxingyuan`,
    siteDescription: `这是liuxingyuan的博客，分享知识，见证你我的成长`,
    siteUrl: `https://liuxingyuan.xyz`,
    siteAuthor: `liuxingyuan`,
    siteImage: `/banner.png`,
    siteLanguage: `zh-Hans`,
    themeColor: `#42b983`,
    basePath: `/`,
    footer: `Theme by Rocketseat`,
  },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
        githubUrl: `https://github.com/rocketseat/gatsby-themes`,
        baseDir: `examples/gatsby-theme-docs`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Rocketseat Gatsby Themes`,
        short_name: `RS Gatsby Themes`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: ``,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://liuxingyuan.xyz`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
