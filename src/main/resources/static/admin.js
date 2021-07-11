$(document).ready(function () {

    $('.table .eBtn').on('click', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');

            $.get(href, function (user, status) {
                $('.myForm #id').val(user.id);
                $('.myForm #username').val(user.username);
                $('.myForm #surname').val(user.surname);
                $('.myForm #email').val(user.email);
                $('.myForm #password').val('');
            });
            $('.myForm #exampleModal').modal();
    });

    $('.table .delBtn').on('click', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');

        $.get(href, function (user, status) {
            $('.myFormDelete #idDelete').val(user.id);
            $('.myFormDelete #usernameDelete').val(user.username);
            $('.myFormDelete #surnameDelete').val(user.surname);
            $('.myFormDelete #emailDelete').val(user.email);
        });
        $('.myFormDelete #exampleModalDelete').modal();
    });
});