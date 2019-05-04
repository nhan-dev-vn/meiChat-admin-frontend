angular.module('meiChat').controller('home', home)

function home(apiService, $location) {
    let self = this;
    this.dependences = [
        '<!--Jquery--> <script src="http://45.76.186.146:3000/js/jquery.min.js"></script>',
        '<!--Bootstrap css--> <link rel="stylesheet" href="http://45.76.186.146:3000/css/bootstrap.min.css">',
        '<!--Bootstrap js--> <script src="http://45.76.186.146:3000/js/bootstrap.min.js"></script>',
        '<!--Socketio--> <script src="http://45.76.186.146:3000/js/socket.io.js"></script>',
        '<!--Angularjs--> <script src="http://45.76.186.146:3000/js/angular.min.js"></script>',
        '<!--Angular-route--> <script src="http://45.76.186.146:3000/js/angular-route.min.js"></script>',
        '<!--Ng-file-upload--> <script src="http://45.76.186.146:3000/js/ng-file-upload.min.js"></script>',
        '<!--Ng-sanitize--> <script src="http://45.76.186.146:3000/js/angular-sanitize.min.js"></script>'
    ]
    // this.jqueryUiCss = '<!--JqueryUi css--> <link rel="stylesheet" href="http://45.76.186.146:3000/css/jquery-ui.css">'
    // this.jqueryUiJs = '<!--JqueryUi js--> <script src="http://45.76.186.146:3000/js/jquery-ui.css"></script>'
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
            if(!$.isEmptyObject(res)) {
                self.code = '<script src="'+ res +'"></script>'
                self.angularModule = '<div ng-app="meiChatCustomer"><mei-chat-customer></mei-chat-customer></div>'
            }
        })
    }
}