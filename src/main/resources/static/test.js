$(async function () {
    await getTableWithUsers();
    //getNewUserForm();
    await getDefaultModal();
    await addNewUser();
})

const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('admin/users'),
    findOneUser: async (id) => await fetch(`admin/users/${id}`),
    addNewUser: async (user) => await fetch('admin/users', {
        method: 'POST',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),
    updateUser: async (user, id) => await fetch(`admin/users/${id}`, {
        method: 'PUT',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),
    deleteUser: async (id) => await fetch(`admin/users/${id}`, {method: 'DELETE', headers: userFetchService.head})
}

async function getTableWithUsers() {
    let table = $('#allUsers tbody');
    table.empty();

    await userFetchService.findAllUsers()
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
                                <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-info eBtn" 
                                data-toggle="modal" data-target="#someDefaultModal">Edit</button>
                            </td>
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger delBtn" 
                                data-toggle="modal" data-target="#someDefaultModal">Delete</button>
                            </td>
                        </tr>
                )`;
                table.append(myTable);
            })
        })
    // обрабатываем нажатие на любую из кнопок edit или delete
    // достаем из нее данные и отдаем модалке, которую к тому же открываем
    $("#allUsers").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

// что то деалем при открытии модалки и при закрытии
// основываясь на ее дата атрибутах
async function getDefaultModal() {
    $('#someDefaultModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false
    }).on("show.bs.modal", (event) => {
        let thisModal = $(event.target);
        let userid = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');
        switch (action) {
            case 'edit':
                editUser(thisModal, userid);
                break;
            case 'delete':
                deleteUser(thisModal, userid);
                break;
        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}

// редактируем юзера из модалки редактирования, забираем данные, отправляем
async function editUser(modal, id) {
    let findUser = await userFetchService.findOneUser(id);
    let user = findUser.json();

    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-info" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(closeButton);
    modal.find('.modal-footer').append(editButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group" id="editUser">
                <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled>Id:<br>
                
                

                
                
                
                
                
                
                
                <input class="form-control" type="text" id="username" value="${user.username}">Username: <br>
                <input class="form-control" type="text" id="surname" value="${user.surname}">Surname:<br>
                <input class="form-control" type="text" id="email" value="${user.email}">Email:<br>
                <input class="form-control" type="password" id="password">Password:<br>
<!--   <input class="form-control" id="age" type="number" value="${user.role}">    -->
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        let id = modal.find("#id").val().trim();
        let username = modal.find("#username").val();
        let surname = modal.find("#surname").val();
        let email = modal.find("#email").val();
        let password = modal.find("#password").val();
        let data = {
            id: id,
            username: username,
            surname: surname,
            email: email,
            password: password
        }
        await userFetchService.updateUser(data, id);
        await getTableWithUsers();
        modal.modal('hide');
    })
}

// удаляем юзера из модалки удаления
async function deleteUser(modal, id) {
    await userFetchService.deleteUser(id);
    await getTableWithUsers();
    modal.find('.modal-title').html('');
    modal.find('.modal-body').html('User was deleted');
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(closeButton);
}

async function addNewUser() {
    $('#addNewUserButton').click(async () => {
        let addUserForm = $('#addUser')
        let username = addUserForm.find('#usernameNew').val();
        let surname = addUserForm.find('#surnameNew').val();
        let email = addUserForm.find('#emailNew').val();
        let password = addUserForm.find('#passwordNew').val();
        let chosenRoles = addUserForm.find('#chosenRoles').val();
        let data = {
            username: username,
            surname: surname,
            email: email,
            password: password,
            roles: getRole("#chosenRoles")
        }
        console.log(getRole("#chosenRoles"))

        function getRole(selectRoles) {
            let data = [];
            $(selectRoles).find("option:selected").each(function () {
                data.push({id: $(this).val(), role: $(this).attr("name"), authority: $(this).attr("name")})
            });
            return data;
        }
        console.log(chosenRoles)
        await userFetchService.addNewUser(data);
        await getTableWithUsers();
    })
}
