angular.module('meiChat').controller('message', message)

function message(apiService, $timeout, config, $location) {
    var self = this
    var socket = io(config.baseUrl, {transports: ['websocket']})
    // this.user = apiService.user
    // var token = apiService.token
    this.user = JSON.parse(window.localStorage.user)
    var token = window.localStorage.token
    var typing = false
    socket.emit('join_room', this.user.owner)

    apiService.getListConversation(token, {
        username: self.user.username,
        owner: self.user.owner
    }, (res) => {
        self.listConver = res.list
        self.curConver = self.listConver[0]
        if(self.curConver) self.listConver[0].selected = 'active_chat'
        self.new = res.numNewMess
        self.listConver.forEach(conver => {
            socket.emit('join_room', conver.id)
        })
        msg_history_scroll(500)
    })
    this.selectConver = (idx) => {
        seenMessage(idx)
        self.listConver.forEach((conver, i) => {
            if (conver.selected == 'active_chat') self.listConver[i].selected = ''
        })
        self.listConver[idx].selected = 'active_chat'
        self.curConver = self.listConver[idx]
        msg_history_scroll(500)
    }
    $('.write_msg').keypress((e) => {
        if (e.which == 13) {
            apiService.sendMessage(token, {
                content: $('.write_msg').val(),
                type: 'text',
                idUser: self.user.id,
                username: self.user.username,
                idConversation: self.curConver.id,
                nameConversation: self.curConver.name,
                sendAt: new Date()
            }, (res) => {
                e.preventDefault()
                $('.write_msg').val('')
            })
        }
    })
    this.seenMessage = () => {
        typing = true
        self.listConver.forEach((conver, i) => {
            if (conver.id == self.curConver.id) seenMessage(i)
        })
    }
    this.sendImgFile = (files) => {
        files.forEach((file, i) => {
            let type = file.type.substring(0, 5)
            let time = new Date()
            apiService.upload(token, {
                type: type == 'image' ? 'img' : 'file',
                content: file.name,
                username: self.user.username,
                idUser: self.user.id,
                nameConversation: self.curConver.name,
                idConversation: self.curConver.id,
                path: config.baseUrl + '/' + self.curConver.name + '/' + time.getTime() + '_' + file.name,
                paththumb: type != 'image' ? '' : (config.baseUrl + '/' + self.curConver.name + '/' + time.getTime() + '_' + file.name),
                sendAt: time
            }, file, (res) => { })
        })
    }
    this.logout = () => {
        $location.path('/login')
    }
    this.addAdmin = () => {
        apiService.register({
            username: self.username,
            password: self.password,
            owner: self.user.username,
            role: 2
        }, (res) => {
            if (res) toastr.success('Thêm tài khoản quản trị viên thành công!')
        })
    }
    function seenMessage(idx) {
        if (self.listConver[idx].newMess) {
            apiService.seenMessage(token, {
                username: self.user.username,
                nameConversation: self.listConver[idx].name
            }, (res) => {
                if (res) {
                    self.listConver[idx].newMess = false
                    self.new--
                }
            })
        }
    }
    socket.on('new_room', (data)=>{
        socket.emit('join_room', data)
    })
    socket.on('sendMessage', (data) => {
        self.listConver.forEach((conver, i) => {
            if (conver.id == data.idConversation) {
                self.listConver[i].Messages.push(data)
                $timeout(() => {
                    msg_history_scroll(0)
                })
                if (data.idUser == self.user.id || (data.idConversation == self.curConver.id && $('.write_msg').is(':focus'))) {
                    seenMessage(i)
                } else {
                    self.new++
                    self.listConver[i].newMess = true
                }
            }
        })
    })
    function msg_history_scroll(timeout) {
        $timeout(() => {
            $('.msg_history').scrollTop($('.msg_history')[0].scrollHeight);
        }, timeout)
    }
}
