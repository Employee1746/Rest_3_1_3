$(document).ready(function (){
    $('.table .eBtn').on('click', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $.get(href,function (user){
            console.log("Тут в объекте: " + JSON.stringify(user))
            $('.myForm #id').val('user.id');
            $('.myForm #username').val(user.username);
            $('.myForm #surname').val(user.surname);
            $('.myForm #email').val(user.email);
            $('.myForm #password').val(user.password);
            // $('#updatedRoles').val(user.role);
        });
        $('.myForm #exampleModal').modal();
    });
});
