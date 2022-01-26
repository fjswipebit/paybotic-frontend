<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="/assets/PAYBOTIC.png" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create new user
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="submit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div class="mt-1">
              <input type="text" required="" v-model="name" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Role
            </label>
            <div class="mt-1">
              <div class="mt-1 relative">
                <button type="button" @click="showRoles = !showRoles" class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                  <span class="block truncate">
                    {{selectedRole.name}}
                  </span>
                  <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </button>

                <ul v-if="showRoles" @click="showRoles = !showRoles" class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                  <li v-for="role in roles" :key="role.id" @click="selectedRole = role" class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                    <span class="font-normal block truncate">
                      {{role.name}}
                    </span>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input type="email" autocomplete="email" required="" v-model="email" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
            
            <a href="/users" class="mt-2 opacity-70 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Go back to Users
            </a>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "../../services/auth-header";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      email: null,
      password: null,
      name: null,
      error: null,
      error_message: null,
      showRoles: false,
      selectedRole: null,
      roles: []
    };
  },
  created() {
    axios
        .get(process.env.VUE_APP_API_URL+`/user-role/get-roles`,
          { headers: authHeader() })
        .then((response) => { 
          this.roles = response.data.data;
          this.selectedRole = this.roles[0]
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
  methods: {
    async submit() {
      var data = {
        email: this.email,
        password: 'password',
        name: this.name,
        role: this.selectedRole.id,
      };
      console.log(data);
      axios
        .post(process.env.VUE_APP_API_URL+`/user-management/create-user`,
          data,
          { headers: authHeader() })
        .then((response) => { 
          console.log(response) 
          Swal.fire({
            title: 'Congratulations',
            icon: 'success',
            text: 'You have successfully created a new user.',
            showDenyButton: true,
            allowOutsideClick: false,
            confirmButtonText: `Create again`,
            denyButtonText: `Go to Users`,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/users/create'
            } else if (result.isDenied) {
              window.location.href = '/users'
            }
          })
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
  },
}
</script>

<style>

</style>