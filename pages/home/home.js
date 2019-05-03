angular.module('meiChat').controller('home', home)

function home(apiService, $location) {
    let self = this;
    let jquery = '<!--Jquery--> <script src="http://45.76.186.146:3000/js/jquery.min.js"></script>'
    let bootstrapcss = '\n<!--Bootstrap css--> <link rel="stylesheet" href="http://45.76.186.146:3000/css/bootstrap.min.css">'
    let bootstrapjs = '\n<!--Bootstrap js--> <script src="http://45.76.186.146:3000/js/bootstrap.min.js"></script>'
    let socketio = '\n<!--Socketio--> <script src="http://45.76.186.146:3000/js/socket.io.js"></script>'
    let angularjs = '\n<!--Angularjs--> <script src="http://45.76.186.146:3000/js/angular.min.js"></script>'
    let angularRoute = '\n<!--Angular-route--> <script src="http://45.76.186.146:3000/js/angular-route.min.js"></script>'
    let ngFileUpload = '\n<!--Ng-file-upload--> <script src="http://45.76.186.146:3000/js/ng-file-upload.min.js"></script>'
    self.dependences = jquery + bootstrapcss + bootstrapjs + socketio + angularjs + angularRoute + ngFileUpload
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
            let code = '<script src="'+ res +'"></script>'
            let angularModule = '\n<mei-chat-customer></mei-chat-customer>'
            self.code = code + angularModule
        })
    }
}