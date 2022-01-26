import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'

import Merchants from '../views/Merchants.vue'
import MerchantList from '../views/merchant/Index.vue'
import ShowMerchant from '../views/merchant/Show.vue'
import EditMerchant from '../views/merchant/Edit.vue'

import CashAdvances from '../views/CashAdvances.vue'
import CashAdvanceList from '../views/cash-advance/Index.vue'
import ShowCashAdvance from '../views/cash-advance/Show.vue'

import Users from '../views/Users.vue'
import CreateUser from '../views/user/Create.vue'
import UserList from '../views/user/Index.vue'
import EditUser from '../views/user/Edit.vue'

import Profile from '../views/auth/Profile.vue'
import ChangePassword from '../views/auth/ChangePassword.vue'

import Roles from '../views/Users.vue'
import RoleList from '../views/role/Index.vue'
import EditRole from '../views/role/Edit.vue'
import CreateRole from '../views/role/Create.vue'

// import AbilityList from '../views/ability/Index.vue'
// import EditAbility from '../views/ability/Edit.vue'
// import CreateAbility from '../views/ability/Create.vue'

import MCAList from '../views/cash-advance-applications/Index.vue'
import CreateMCA from '../views/cash-advance-applications/Create.vue'
import EditMCA from '../views/cash-advance-applications/Edit.vue'

import Payments from '../views/Payments.vue'
import Login from '../views/auth/Login.vue'

import Swal from "sweetalert2";

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/login',
        meta: {
            layout: 'blank'
        },
        name: 'Login',
        component: Login
    },
    {
        path: '/merchants',
        name: 'Merchants',
        component: Merchants,
        children: [{
                name: 'List of Merchants',
                path: '',
                component: MerchantList
            },
            {
                name: 'View Merchant Information',
                path: ':id/show',
                component: ShowMerchant
            },
            {
                name: 'Edit Merchant Information',
                path: ':id/edit',
                component: EditMerchant
            }
        ]
    },
    {
        path: '/cash-advance-applications',
        name: 'Cash Advance Applications',
        component: CashAdvances,
        children: [
            {
                name: 'List of Cash Advance Applications',
                path: '',
                component: MCAList
            },
            {
                name: 'Create Cash Advance Application',
                path: 'create',
                component: CreateMCA
            },
            {
                name: 'Edit Cash Advance Application',
                path: ':id/edit',
                component: EditMCA
            },
            {
                name: 'View Cash Advance Application',
                path: ':id/show',
                component: ShowCashAdvance
            },
        ],
    },
    {
        path: '/cash-advances',
        name: 'Cash Advances',
        component: CashAdvances,
        children: [{
                name: 'List of Cash Advances',
                path: '',
                component: CashAdvanceList
            },
            {
                name: 'View Cash Advance Information',
                path: ':id/show',
                component: ShowCashAdvance
            }
        ]

    },
    {
        path: '/payments',
        name: 'Payments',
        component: Payments
    },
    {
        path: '/users',
        name: 'Users',
        component: Users,
        children: [
            {
                name: 'List of Users',
                path: '',
                component: UserList
            },
            {
                name: 'Create New User',
                path: 'create',
                meta: {
                    layout: 'blank'
                },
                component: CreateUser
            },
            {
                name: 'Edit User Information',
                path: ':id/edit',
                component: EditUser
            }
        ]
    },
    {
        path: '/roles',
        name: 'Roles',
        component: Roles,
        children: [
            {
                name: 'List of Roles',
                path: '',
                component: RoleList
            },
            {
                name: 'Create New Role',
                path: 'create',
                component: CreateRole
            },
            {
                name: 'Edit Role ',
                path: ':id/edit',
                component: EditRole
            }
        ]
    },
    // {
    //     path: '/abilities',
    //     name: 'Abilities',
    //     component: Roles,
    //     children: [
    //         {
    //             name: 'List of Abilities',
    //             path: '',
    //             component: AbilityList
    //         },
    //         {
    //             name: 'Create New Ability',
    //             path: 'create',
    //             component: CreateAbility
    //         },
    //         {
    //             name: 'Edit Ability ',
    //             path: ':id/edit',
    //             component: EditAbility
    //         }
    //     ]
    // },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/change-password',
        name: 'Change Password',
        component: ChangePassword
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
  
    if (authRequired && !loggedIn) {
        next('/login');
    }else{
        if (!authRequired && loggedIn) {
            next('/');
        }else {
            next();
        }
    }

    if(authRequired){
        var t;
        window.onload = resetTimer;
        window.onmousemove = resetTimer;
        window.onmousedown = resetTimer; 
        window.ontouchstart = resetTimer;
        window.onclick = resetTimer;     
        window.onkeydown = resetTimer;   
        window.addEventListener('scroll', resetTimer, true); 
    }

    function yourFunction() {
        localStorage.clear();

        Swal.fire({
            title: "Your session has expired",
            text: 'You are automatically logged out. Please sign in again.',
            icon: "warning",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/login";
            }
          });
    }

    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(yourFunction, 60000*30);  // time is in milliseconds = 30mins
    }
  });

export default router