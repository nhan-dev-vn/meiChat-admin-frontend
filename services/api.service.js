const REGISTER = '/register'
const LOGIN = '/login'
const ADD_ADMIN = '/admin/new'
const GET_LIST_CONVERSATION = '/conversation/list'
const GET_CONVERSATION = '/conversation'
const POST_MESSAGE = '/message/new'
const SEEN_MESSAGE = '/message/seen'
const UPLOAD = '/upload'
angular.module('meiChat').service('apiService', apiService)

function apiService(config, $http, Upload) {
    let self = this;
    this.URL = config.baseUrl
    function doPost(URL, data, cb) {
        $http({
            method: 'POST',
            url: self.URL+URL,
            data: data
        }).then(function successCallback(response) {
            if (response.data.code != 200) {
                toastr.error(response.data.content)
                cb();
            } else {
                cb(response.data.content)
            }
        }, function errorCallback(response) {
            console.error(response)
            cb();
        });
    }
    function doPostToken(URL, token, data, cb) {
        $http({
            method: 'POST',
            url: self.URL+URL,
            headers: {
                'Authorization': token
            },
            data: data
        }).then(function successCallback(response) {
            if (response.data.code != 200) {
                toastr.error(response.data.content)
                cb();
            } else {
                cb(response.data.content)
            }
        }, function errorCallback(response) {
            console.error(response)
            cb();
        });
    }

    this.register = (data, cb) => {
        doPost(REGISTER, data, cb)
    }
    this.login = (data, cb) => {
        doPost(LOGIN, data, cb)
    }
    this.addAdmin = (data, cb) => {
        doPost(ADD_ADMIN, data, cb)
    }
    this.getListConversation = function(token, data, cb) {
        doPostToken(GET_LIST_CONVERSATION, token, data, cb)
    }
    this.getConversation = function(token, data, cb) {
        doPostToken(GET_CONVERSATION, token, data, cb);
    }
    this.sendMessage = function(token, data, cb) {
        doPostToken(POST_MESSAGE, token, data, cb);
    }
    this.seenMessage = function(token, data, cb) {
        doPostToken(SEEN_MESSAGE, token, data, cb);
    }
    this.upload = (token, data, file, cb) => {
        Upload.upload({
            url: self.URL+UPLOAD,
            headers: {
                'Authorization': token
            },
            file: file,
            fields: data
        }).then(
            (response) => {
                if (response.data.code != 200) {
                    cb();
                } else {
                    cb(response.data.content);
                }
            },
            (error) => {
                if(error.config.file.size>50*1024*1024) 
                    toastr.error(file.name + ' is greater than 50MB');
                cb();
            });
    }
    return this;
}