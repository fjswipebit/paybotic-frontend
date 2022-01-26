import axios from 'axios';
import Swal from 'sweetalert2'

const API_URL = process.env.VUE_APP_API_URL;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/auth/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.data.access_token) {
          localStorage.setItem('token', response.data.data.access_token);
          localStorage.setItem('user_email', user.email);
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          localStorage.setItem('user_role', response.data.data.user.role);
        }
        return response.data;
      })
      .catch(function (error) {
        if (error.response) {
          let listOfObjects = Object.keys(error.response.data.errors).map(
            (key) => {
              return error.response.data.errors[key];
            }
          );
          Swal.fire({
            title: "Oops! Something went wrong.",
            text: listOfObjects[0],
            icon: "error",
          });
          return error.response.data;
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error);
        }
      });  }

  logout() {
    localStorage.clear();
  }

  register(user) {
    return axios.post(API_URL + '/user-management/create-user', {
      name: user.name,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
