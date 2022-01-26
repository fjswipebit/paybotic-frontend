<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg m-8">
        <form @submit.prevent="update">
            <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 flex justify-between">
                <span> Edit Ability </span>
                <button v-show="!edit_mode" @click="edit_mode = true" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Edit 
                </button>
                <div class="flex" v-show="edit_mode">
                    <button type="button" @click="edit_mode = false" class="mx-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Cancel 
                    </button>
                    <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Save 
                    </button>
                </div>
               
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Personal and Account details
            </p>
            </div>
            <div class="border-t border-gray-200">
            <dl class="h-96">
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Full name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span v-show="!edit_mode">{{current_user.name}}</span> 
                        <input v-show="edit_mode" type="text" required v-model="current_user.name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </dd>
                </div>
                <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Email address
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span v-show="!edit_mode">{{current_user.email}}</span> 
                        <input v-show="edit_mode" type="text" required v-model="current_user.email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </dd>
                </div>
                <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Role
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span v-show="!edit_mode">{{current_user.role}}</span> 
                        <div v-show="edit_mode" class="mt-1 relative">
                            <button type="button" @click="showRoles = !showRoles" class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                                <span class="block truncate">
                                    {{current_user.role}}
                                </span>
                                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </button>

                            <ul v-if="showRoles" @click="showRoles = !showRoles" class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                                <li v-for="role in roles" :key="role.id" @click="selectedRole = role, current_user.role = role.name" class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                                    <span class="font-normal block truncate">
                                    {{role.name}}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </dd>
                </div>
            </dl>
            </div>
        </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";
import authHeader from "@/services/auth-header";
export default {
    created() {
        this.getUsers();

        axios
            .get(process.env.VUE_APP_API_URL+`/user-role/get-roles`,
            { headers: authHeader() })
            .then((response) => { 
            this.roles = response.data.data;
            }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.response.data.errors[0].message ?? error.response.data.errors)
                Swal.fire({
                    title: 'Oops! Something went wrong.',
                    text:   error.response.data.errors[0].message ?? '',
                    icon: 'error'
                }); 
            } else if (error.request) {
                console.log(error.request);
                Swal.fire({
                    title: 'Oops! Something went wrong.',
                    text:   error.request,
                    icon: 'error'
                }); 

            } else {
                console.log('Error', error.message);
                Swal.fire({
                    title: 'Oops! Something went wrong.',
                    text:   error.message,
                    icon: 'error'
                });       
            }
        });
  },
    data() {
        return {
            current_user: null,
            edit_mode:false,
            showRoles: false,
            selectedRole: null,
            roles: []
        };
    },
    methods: {
        async getUsers() {
            var id = this.$route.params.id;
            var url = process.env.VUE_APP_API_URL + `/user-management/get-users`;

            await axios.get(url, { headers: authHeader() }).then((response) => {
                var users = response.data.data;
                users.map((user) => {
                    if (user.id == id) {
                        this.current_user = user;
                    return user;
                    }
                });
            });
        },
        async update(){
            var data = {
                name: this.current_user.name,
                email: this.current_user.email,
                role: this.selectedRole.id,
            };

            axios.put(process.env.VUE_APP_API_URL+`/user-management/update-user/`+ this.current_user.id,data,
                { headers: authHeader() })
            .then((response) => {
                this.current_user = response.data.data;
                Swal.fire({
                        title: 'Congratulations!',
                        text:  'You have successfully updated the user profile',
                        icon:  'success'
                    }); 

                this.edit_mode = false
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.data.errors);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    Swal.fire({
                        title: 'Oops! Something went wrong.',
                        text:   error.response.data.message,
                        icon: 'error'
                    }); 
                } else if (error.request) {
                    console.log(error.request);
                     Swal.fire({
                        title: 'Oops! Something went wrong.',
                        text:   error.request,
                        icon: 'error'
                    }); 
                } else {
                    console.log('Error', error);
                    Swal.fire({
                        title: 'Oops! Something went wrong.',
                        text:   error,
                        icon: 'error'
                    }); 
                }

            });
        }
  },
}
</script>
