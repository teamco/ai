const { ERRORS } = require('./error.routes');

const wrappers = ['@/wrappers/auth.admin'];

/**
 * @export
 * @return {{}}
 * @constructor
 */
const ADMIN_ROUTES = (adminPath = '/ex') => {
  const adminErrors = ERRORS(adminPath, '');

  return {
    exact: false,
    path: adminPath,
    component: '@/layouts/app',
    breadcrumb: 'route.admin',
    routes: [
      {
        exact: true,
        path: `${adminPath}/ai`,
        component: '@/pages/ai',
        breadcrumb: 'route.ai',
        wrappers
      },
      ...adminErrors
    ]
  };
};

module.exports = { ADMIN_ROUTES };
