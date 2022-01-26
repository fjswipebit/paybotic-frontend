<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg m-8">
        <form @submit.prevent="update">
            <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 flex justify-between">
                <span> Change Password </span>
                <div class="flex">
                    <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Save 
                    </button>
                </div>
               
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Fill up the form only if you want to change your password
            </p>
            </div>
            <div class="border-t border-gray-200">
                <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Enter your old password
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input type="password" required v-model="current_password" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </dd>
                    </div>
                    <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Enter your new password
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input type="password" required v-model="password" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Confirm your new password
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input type="password" required v-model="confirm_password" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
    data() {
        return {
            current_password: null,
            password: null,
            confirm_password: null,
        };
    },
    methods: {
        async update(){
            var data = {
                current_password: this.current_password,
                password: this.password,
                confirm_password: this.confirm_password,
            };

            axios.post(process.env.VUE_APP_API_URL+`/user-management/change-password`,data,
                { headers: authHeader() })
            .then((response) => {
                console.log(response);
                Swal.fire({
                        title: 'Congratulations!',
                        text:  'You have successfully changed your password',
                        icon:  'success'
                    });
                window.location.reload(); 
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.data.errors);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                   let listOfObjects = Object.keys(error.response.data.errors).map((key) => {
                        return error.response.data.errors[key]
                    })
                    console.log('haha',listOfObjects)
                    Swal.fire({
                        title: 'Oops! Something went wrong.',
                        text:   listOfObjects[0] ?? '',
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
