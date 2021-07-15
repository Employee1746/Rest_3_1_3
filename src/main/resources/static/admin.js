// $(document).ready(function () {
//
//     $('.table .eBtn').on('click', function (event) {
//         event.preventDefault();
//         var href = $(this).attr('href');
//
//         $.get(href, function (user, status) {
//             $('.myForm #id').val(user.id);
//             $('.myForm #username').val(user.username);
//             $('.myForm #surname').val(user.surname);
//             $('.myForm #email').val(user.email);
//             $('.myForm #password').val('');
//         });
//         $('.myForm #exampleModal').modal();
//     });
//
//     $('.table .delBtn').on('click', function (event) {
//         event.preventDefault();
//         var href = $(this).attr('href');
//
//         $.get(href, function (user, status) {
//             $('.myFormDelete #idDelete').val(user.id);
//             $('.myFormDelete #usernameDelete').val(user.username);
//             $('.myFormDelete #surnameDelete').val(user.surname);
//             $('.myFormDelete #emailDelete').val(user.email);
//         });
//         $('.myFormDelete #exampleModalDelete').modal();
//     });
// });
$(document).ready(function () {
    // createTable();
    // editUser();
    // addUser()
})


$(async function () {
    await getAllUsers();
    await getCurrentUser();
    await getSelectValue();
    await addNewUser()()
})

const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    // bodyAdd : async function(user) {return {'method': 'POST', 'headers': this.head, 'body': user}},
    // findAllUsers: async () => await fetch('api/users'),
    findOneUser: async (id) => await fetch(`admin/users/${id}`),
    addNewUser: async (user) => await fetch('admin/users', {method: 'POST', headers: userFetchService.head, body: JSON.stringify(user)}),
    // updateUser: async (user, id) => await fetch(`api/users/${id}`, {method: 'PUT', headers: userFetchService.head, body: JSON.stringify(user)}),
    // deleteUser: async (id) => await fetch(`api/users/${id}`, {method: 'DELETE', headers: userFetchService.head})
}

async function getAllUsers() {
    let table = $('#allUsers tbody');
    table.empty();

    await fetch('admin/users')
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let myTable = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.surname}</td>
                            <td>${user.email}</td>
                            <td>${user.userRolesString}</td>        
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-info eBtn" data-toggle="modal" data-target="#exampleModal">Edit</button>
                            </td>
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger delBtn" 
                                data-toggle="modal" data-target="#myFormDelete">Delete</button>
                            </td>
                        </tr>
                )`;
                table.append(myTable);
            })
        })
}

async function getCurrentUser() {

    let table = $('#currentUser tbody');
    table.empty();

    await fetch('admin/user')
        .then(res => res.json())
        .then(user => {
            let userTable = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.surname}</td>
                            <td>${user.email}</td>
                            <td>${user.userRolesString}</td>
                        </tr>
                )`;
            table.append(userTable);
        })
}


async function getSelectValue() {
    let rolesFoSelect = $('#chosenRoles option');
    rolesFoSelect.empty();

    await fetch('admin/roles')
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                // let mySel = `(${role.name}
                let option = new Option(role.name);
                rolesFoSelect.append(option)
            })
        })
}
//ДОБАВЛЕНИЕ ЮЗЕРА
// function addUser() {
//     $("#addNewUserButton").submit(async function (event) {
//         event.preventDefault()
//         //
//         let user = {
//             username: $("#usernameNew").val(),
//             surname: $("#surnameNew").val(),
//             email: $("#emailNew").val(),
//             password: $("#passwordNew").val()
//             //
//         }
//
//         await fetch('/admin/users',
//             {
//                 method: 'POST',
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify(user)
//             })
//         //     .then(result => console.log(result))
//         // window.location.href = "/admin"
//     })
// }

async function addNewUser() {
    $('#addNewUserButton').click(async () =>  {
        let addUserForm = $('#addUser')
        let username = addUserForm.find('#usernameNew').val().trim();
        let surname = addUserForm.find('#surnameNew').val().trim();
        let email = addUserForm.find('#emailNew').val().trim();
        let password = addUserForm.find('#passwordNew').val().trim();
        let data = {
            username: username,
            surname: surname,
            email: email,
            password: password
        }
        const response = await userFetchService.addNewUser(data);
        if (response.ok) {
            addUserForm.find('#usernameNew').val('');
            addUserForm.find('#surnameNew').val('');
            addUserForm.find('#emailNew').val('');
            addUserForm.find('#passwordNew').val('');
            await getAllUsers();
        // } else {
        //     let body = await response.json();
        //     let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
        //                     ${body.info}
        //                     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        //                         <span aria-hidden="true">&times;</span>
        //                     </button>
        //                 </div>`;
        //     addUserForm.prepend(alert)
        }
    })
}



//rolesFoSelect.append

// chosenRoles

// <body>
//
// <select id="list" style="padding: 10px;" onChange="getSelectValue();">
//     <option value="js">JavaScript</option>
//     <option value="php">PHP</option>
//     <option value="c#">Csharp</option>
//     <option value="java">Java</option>
//     <option value="node">Node.js</option>
// </select>
//
// <script>
//     function getSelectValue()
//     {
//         var selectedValue = document.getElementById("list").value;
//         alert(selectedValue);
//     }
//     getSelectValue();
// </script>
// </body>
//                            // <td>
//                             //     <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-info eBtn"
//                             //     data-toggle="modal" data-target="#exampleModal">Edit</button>
//                             // </td>
//                             // <td>
//                             //     <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger delBtn"
//                             //     data-toggle="modal" data-target="#exampleModal">Delete</button>
//                             // </td>


// /        .then(user => {
//             $(`#topBar`).append(`<li><a><b>${user.username}</b> with roles ${user.userRolesString}</a></li>`);
//         })