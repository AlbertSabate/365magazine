/* eslint-disable import/prefer-default-export */
const path = require('path');

exports.onCreatePage = async ({ page, actions: { createPage } }) => {
  if (page.path.match(/^\/post/)) {
    const slug = page.path.replace('/post', '');
    createPage({
      path: '/post',
      matchPath: '/post/*',
      component: path.resolve('src/pages/index.tsx'),
      context: { slug },
    });
  }
};
