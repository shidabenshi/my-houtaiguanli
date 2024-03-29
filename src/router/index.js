import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/products',
    component: Layout,
    redirect: '/products/table',
    //正常登陆到layout页面，但现在是登陆
    //meta: { title: '商品管理', icon: 'dashboard' },
    meta: { title: '商品管理', icon: 'dashboard' }, //路由元信息
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/products/productList'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'editorProduct',
        name: 'Tree',
        component: () => import('@/views/products/editorProduct.vue'),
        meta: { title: '商品编辑', icon: 'tree' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/table',
    name: 'Example',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'userinfo',
        name: 'Table',
        component: () => import('@/views/user/userinfo'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'editorUser',
        name: 'Tree',
        component: () => import('@/views/user/editorUser'),
        meta: { title: '用户编辑', icon: 'tree' }
      }
    ]
  },
  {
    path: '/commodities',
    component: Layout,
    redirect: '/commodities/index',
    name: 'Form',
    meta: { title: '商品分类管理', icon: 'form' },
    children: [
      {
        path: 'comlist',
        name: 'Form',
        component: () => import('@/views/commodities/comList'),
        meta: { title: '商品分类列表', icon: 'form' }
      },
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/commodities/index'),
        meta: { title: '商品分类编辑', icon: 'form' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '订单管理',
      icon: 'nested'
    },
    children: [
      {
<<<<<<< HEAD
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '订单管理' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '获取订单详情' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/components/menu1-2/xiugai'),
            name: 'Menu1-2',
            meta: { title: '查看订单是否支付' }
          },
          {
            path: 'menu1-2/xingqin',
            component: () => import('@/components/menu1-2/xiqngqin'),
            name: 'Menu1-2-xiangqin',
            meta: { title: '查看订单详情分类' }

          }
          //  {
          //    path: 'menu1-2',
          //    component: () => import('@/views/nested/menu1/menu1-2'),
          //  name: 'Menu1-2',
          //    meta: { title: 'Menu1-2' },
          //    children: [
          //      {
          //        path: 'menu1-2-1',
          //        component: () =>
          //          import('@/views/nested/menu1/menu1-2/menu1-2-1'),
          //        name: 'Menu1-2-1',
          //        meta: { title: 'Menu1-2-1' }
          //      },
          //      {
          //        path: 'menu1-2-2',
          //        component: () =>
          //          import('@/views/nested/menu1/menu1-2/menu1-2-2'),
          //        name: 'Menu1-2-2',
          //        meta: { title: 'Menu1-2-2' }
          //      }
          //    ]
          //  },
          //  {
          //    path: 'menu1-3',
          //    component: () => import('@/views/nested/menu1/menu1-3'),
          //    name: 'Menu1-3',
          //    meta: { title: 'Menu1-3' }
          //  }
        ]
=======
        path: 'menu1-1',
        component: () => import('@/views/nested/menu1/menu1-1'),
        name: 'Menu1-1',
        meta: { title: '获取订单详情' }
      },
      {
        path: 'menu1-2',
        component: () => import('@/views/nested/menu1/menu1-2'),
        name: 'Menu1-2',
        meta: { title: '查看订单是否支付' }
      },
      {
        path: 'menu1-2/xingqin',
        component: () => import('@/views/nested/menu1/menu1-2/xiqngqin'),
        name: 'Menu1-2-xiangqin',
        meta: { title: '查看订单详情分类' }
>>>>>>> 70ce45254c57466a0123b9f317a8e8cef4d24534
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
