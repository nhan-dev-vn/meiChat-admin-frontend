angular.module('meiChat').controller('home', home)

function home(apiService, $location) {
    let self = this;
    self.login = ()=> {
        $location.path('/login')
    }
    self.register = ()=> {
        apiService.register({
            username: self.username,
            password: self.password,
            role: 1,
            owner: self.username
        }, (res)=> {
            console.log(res)
            toastr.success('Đăng ký thành công!')
        })
    }
}