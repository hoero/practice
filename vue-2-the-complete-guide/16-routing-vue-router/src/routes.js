import Home from './components/Home';
import Header from './components/Header';

// Lazy loading
const User = resolve => {
    require.ensure(
        ['./components/user/User'],
        () => {
            resolve(require('./components/user/User'));
        },
        'user'
    );
};
const UserStart = resolve => {
    require.ensure(
        ['./components/user/UserStart'],
        () => {
            resolve(require('./components/user/UserStart'));
        },
        'user'
    );
};
const UserDetail = resolve => {
    require.ensure(
        ['./components/user/UserDetail'],
        () => {
            resolve(require('./components/user/UserDetail'));
        },
        'user'
    );
};
const UserEdit = resolve => {
    require.ensure(
        ['./components/user/UserEdit'],
        () => {
            resolve(require('./components/user/UserEdit'));
        },
        'user'
    );
};

export const routes = [
    {
        path: '',
        components: {
            default: Home,
            'header-top': Header
        }
    },
    {
        path: '/user',
        components: { default: User, 'header-bottom': Header },
        children: [
            { path: '', component: UserStart },
            {
                path: ':id',
                component: UserDetail,
                beforeEnter: (to, from, next) => {
                    console.log('Inside route setup');

                    next();
                }
            },
            { path: ':id/edit', component: UserEdit, name: 'editUser' }
        ]
    },
    { path: '/redirect', redirect: '/' },
    { path: '*', redirect: '/' }
];
