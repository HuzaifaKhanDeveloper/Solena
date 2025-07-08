const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the source-map-loader rule and modify it
      const sourceMapLoaderRule = webpackConfig.module.rules.find(
        rule => rule.enforce === 'pre' && rule.use && rule.use.includes('source-map-loader')
      );

      if (sourceMapLoaderRule) {
        // Add exclusions for problematic packages
        sourceMapLoaderRule.exclude = [
          /node_modules\/@reown\/appkit/,
          /node_modules\/@reown\/appkit-ui/,
          /node_modules\/@reown\/appkit-utils/,
          /node_modules\/@reown\/appkit-wallet/,
          /node_modules\/superstruct/,
          /node_modules\/@solana\/wallet-adapter/,
          /node_modules\/@solana\/web3\.js/,
          /node_modules\/@project-serum/,
          /node_modules\/bn\.js/,
          /node_modules\/buffer/,
        ];
      } else {
        // If source-map-loader rule doesn't exist, add it with exclusions
        webpackConfig.module.rules.push({
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: [
            /node_modules\/@reown\/appkit/,
            /node_modules\/@reown\/appkit-ui/,
            /node_modules\/@reown\/appkit-utils/,
            /node_modules\/@reown\/appkit-wallet/,
            /node_modules\/superstruct/,
            /node_modules\/@solana\/wallet-adapter/,
            /node_modules\/@solana\/web3\.js/,
            /node_modules\/@project-serum/,
            /node_modules\/bn\.js/,
            /node_modules\/buffer/,
          ],
        });
      }

      // Suppress specific warnings
      webpackConfig.ignoreWarnings = [
        /Failed to parse source map/,
        /source-map-loader/,
      ];

      return webpackConfig;
    },
  },
};