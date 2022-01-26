<template>
  <Breadcrumbs :pages="pages" />

  <div class="bg-white shadow overflow-hidden sm:rounded-lg m-8">
    <form @submit.prevent="store">
        <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 flex justify-between">
            <span> Role Name </span>
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Save 
            </button>
        </h3>
        </div>
        <div class="border-t border-gray-200">
          <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Name
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input type="text" required v-model="name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </dd>
              </div>
          </dl>
        </div>
         <!-- <div class="border-t border-gray-200">
          <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Abilities 
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <fieldset class="space-y-5">
                      <div class="relative flex items-start" v-for="ability in abilities" :key="ability.id">
                        <div class="flex items-center h-5">
                          <input type="checkbox" v-model="selectedAbilities"  :value="ability.name" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                        </div>
                        <div class="ml-3 text-sm">
                          <label class="font-medium text-gray-700 capitalize">{{ability.name}}</label>
                        </div>
                      </div>
                    </fieldset>
                  </dd>
              </div>
          </dl>
        </div> -->
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";
import authHeader from "@/services/auth-header";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

const pages = [
  {
    name: "List of Roles",
    href: "/roles",
    current: false,
  },
  { name: "Create New Role", href: "#", current: true },
];

export default {
  components: {
        Breadcrumbs,
    },
    setup() {
        return {
            pages,
        };
    },
    created() {
        axios
            .get(process.env.VUE_APP_API_URL+`/role-permission/get-permissions`,
            { headers: authHeader() })
            .then((response) => { 
              this.abilities = response.data.data;

              this.abilities.forEach(ability => {
                this.selectedAbilities.push( ability.name );
              });

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
            name: null,
            showRoles: false,
            selectedRole: null,
            abilities: [],
            selectedAbilities: []
            
        };
    },
    methods: {
        async store(){
            var data = {
                name: this.name,
                abilities: this.selectedAbilities
            };

            axios.post(process.env.VUE_APP_API_URL+`/user-role/create-role`,
              data,
              { headers: authHeader() })
            .then((response) => {
                this.current_user = response.data.data;
                Swal.fire({
                  title: "Congratulations",
                  icon: "success",
                  text: "You have successfully created new user role.",
                  showDenyButton: true,
                  allowOutsideClick: false,
                  confirmButtonText: `Create again`,
                  denyButtonText: `Go to Roles`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "/roles/create";
                  } else if (result.isDenied) {
                    window.location.href = "/roles";
                  }
                });
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
