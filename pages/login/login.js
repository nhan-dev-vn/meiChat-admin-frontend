angular.module('meiChat').controller('login', login)

function login(apiService, $location) {
    var self = this
    
    this.login = ()=> {
        apiService.login({
            username: self.username,
            password: self.password
        }, (res)=> {
            if(res) {
                apiService.user = res.user
                window.localStorage.user = JSON.stringify(res.user)
                $location.path('/message')
            }
            else toastr.error('Thông tin đăng nhập sai!')
        })
        
    }
}