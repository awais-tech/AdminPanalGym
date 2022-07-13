import GenericServices from './GenericServices';
import jwt_decode from 'jwt-decode';
class UserServices extends GenericServices {
  login = (email, password) =>
    new Promise((resolve, reject) => {
      this.post('users/login', { email, password })
        .then((res) => {
          localStorage.setItem('Token', res.token);
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
    Register = (
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNo,
      role = "user",
      status = 0
    ) =>
      new Promise((resolve, reject) => {
        this.post("users/register", {
          password,
          email,
          firstName,
          lastName,
          confirmPassword,
          phoneNo,
          role,
          status,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
  logout = () => {
    localStorage.setItem('Token', '');
  };
  isloggedIn = () => {
    console.log(localStorage.getItem('Token') ? true : false);
    return localStorage.getItem('Token') ? true : false;
  };
  getUser = () => {
    return this.get('users/onlyuser');
  };
  getbussnessUser = () => {
    return this.get('Bussness');
  };
  getbussness = () => {
    return this.get('users/Bussness');
  };
  

  updateuser = (id, status) => {
    return this.put('users/user/' + id, { status });
  };
  deleteuser = (id) => {
    return this.delete('users/user/' + id);
  };
  getloggedInUser = () => {
    var token = localStorage.getItem('Token');
    if (token) {
      var decoded = jwt_decode(token);
      return decoded;
    }

    return token;
  };
  // getAdmin = () =>
  //   this.isloggedIn()
  //     ? this.getloggedInUser().role == "user"
  //       ? false
  //       : true
  //     : false;
}
let UerServices = new UserServices();
export default UerServices;
