angular.module('meiChat').component('viewImg', {
    templateUrl: '../meiChat-admin-frontend/components/view_img/view_img.html',
    controller: 'viewImg',
    controllerAs: 'vm',
    bindings: {
        src: '=',
        open: '='
    }
})

function viewImg() {
    let self = this
}
