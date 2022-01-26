<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg m-8">
        <form @submit.prevent="update">
            <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 flex justify-between">
                <span> Account Information </span>
                <button v-show="!edit_mode" @click="edit_mode = true" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Edit Profile 
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
            <dl>
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
                    <div v-if="current_user == 'superadmin'">
                             <span v-show="!edit_mode">{{current_user.email}}</span> 
                            <input v-show="edit_mode" type="text" required v-model="current_user.email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div v-else>
                        <span>{{current_user.email}}</span> 
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
    },
    data() {
        return {
            current_user: null,
            edit_mode:false
        };
    },
    methods: {
        async getUsers() {
            var email = localStorage.getItem('user_email');
            var url = process.env.VUE_APP_API_URL + `/user-management/get-users`;

            await axios.get(url, { headers: authHeader() }).then((response) => {
                var users = response.data.data;
                users.map((user) => {
                    if (user.email == email) {
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
            };

            axios.put(process.env.VUE_APP_API_URL+`/user-management/update-user/`+ this.current_user.id,data,
                { headers: authHeader() })
            .then((response) => {
                this.current_user = response.data.data;
                Swal.fire({
                        title: 'Congratulations!',
                        text:  'You have successfully updated your profile',
                        icon:  'success'
                    }); 

                localStorage.setItem('user_email', this.current_user.email);
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
