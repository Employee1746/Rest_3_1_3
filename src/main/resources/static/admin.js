$(async function () {
    await getTableWithUsers();
    await getDefaultModal();
    await addNewUser();
    await getTableWithCurrentUser();
})

const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('admin/users'),
    findOneUser: async (id) => await fetch(`admin/users/${id}`),
    findCurrentUser: async () => await fetch(`admin/user`),
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

async function getTableWithCurrentUser() {
    let findCurrentUser = await userFetchService.findCurrentUser();

    let currentUserTable = $('#currentUserTable tbody');
    currentUserTable.empty();

    let currentUser = findCurrentUser.json();
    currentUser.then(user => {
        let userTable = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.surname}</td>
                            <td>${user.email}</td>
                            <td>${user.userRolesString}</td>           
                        </tr>
                )`;
        currentUserTable.append(userTable);

        let userInfo = document.getElementById('topBar');
        userInfo.innerHTML = `${user.username} with roles: ${user.userRolesString}`;


    })

}

// редактируем юзера из модалки редактирования, забираем данные, отправляем
async function editUser(modal, id) {
    let findUser = await userFetchService.findOneUser(id);
    let user = findUser.json();

    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-primary mr-2" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`

    modal.find('.modal-footer').append(closeButton);
    modal.find('.modal-footer').append(editButton);
    user.then(user => {
        let bodyForm = `
            <div class="row justify-content-center">
                <div class="col-6 text-center">
                    <form class="form-group" id="editUser">            
                        <label class="col-form-label" for="id"><strong>Id:</strong></label>
                            <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled>
                        <label class="col-form-label" for="username"><strong>Username:</strong></label>
                            <input class="form-control" type="text" id="username" value="${user.username}">
                        <label class="col-form-label text-center" for="surname"><strong>Surname:</strong></label>
                            <input class="form-control" type="text" id="surname" value="${user.surname}">
                        <label class="col-form-label text-center" for="email"><strong>Email:</strong></label>
                            <input class="form-control" type="text" id="email" value="${user.email}">
                        <label class="col-form-label text-center" for="password"><strong>Password:</strong></label>
                            <input class="form-control" type="password" id="password">
                        <label class="col-form-label text-center"><strong>Role:</strong></label>
                            <select multiple size="2" name="updatedRoles" class="form-control" id="updatedRoles">
                                <option name="ROLE_USER" value="1">USER</option>
                                <option name="ROLE_ADMIN" value="2">ADMIN</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
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
            password: password,
            roles: getRole("#updatedRoles")
        }
        await userFetchService.updateUser(data, id);
        await getTableWithUsers();
        modal.modal('hide');
    })
}

// удаляем юзера из модалки удаления
async function deleteUser(modal, id) {

    modal.find('.modal-title').html('Delete user');

    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    let deleteButton = `<button  class="btn btn-danger mr-2" id="deleteButton">Delete</button>`;

    modal.find('.modal-footer').append(closeButton);
    modal.find('.modal-footer').append(deleteButton);

    let findUser = await userFetchService.findOneUser(id);
    let user = findUser.json();
    user.then(user => {
        let bodyForm = `
            <div class="row justify-content-center">
                <div class="col-6 text-center">
                    <form class="form-group" id="editUser">            
                        <label class="col-form-label" for="id"><strong>Id:</strong></label>
                            <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled>
                        <label class="col-form-label" for="username"><strong>Username:</strong></label>
                            <input class="form-control" type="text" id="username" value="${user.username}" disabled>
                        <label class="col-form-label text-center" for="surname"><strong>Surname:</strong></label>
                            <input class="form-control" type="text" id="surname" value="${user.surname}" disabled>
                        <label class="col-form-label text-center" for="email"><strong>Email:</strong></label>
                            <input class="form-control" type="text" id="email" value="${user.email}" disabled>
                        <label class="col-form-label text-center" for="password"><strong>Password:</strong></label>
                            <input class="form-control" type="password" id="password" disabled>
                        <label class="col-form-label text-center"><strong>Role:</strong></label>
                            <select multiple size="2" name="updatedRoles" class="form-control" id="updatedRoles" disabled>
                                <option name="ROLE_USER" value="1">USER</option>
                                <option name="ROLE_ADMIN" value="2">ADMIN</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        `;
        modal.find('.modal-body').append(bodyForm);
    })
    $("#deleteButton").on('click', async () => {
        await userFetchService.deleteUser(id);
        await getTableWithUsers();
        modal.modal('hide');
    })
}

async function addNewUser() {
    $('#addNewUserButton').click(async () => {
        let addUserForm = $('#addUser')
        let username = addUserForm.find('#usernameNew').val();
        let surname = addUserForm.find('#surnameNew').val();
        let email = addUserForm.find('#emailNew').val();
        let password = addUserForm.find('#passwordNew').val();
        let data = {
            username: username,
            surname: surname,
            email: email,
            password: password,
            roles: getRole("#chosenRoles")
        }
        await userFetchService.addNewUser(data);
        await getTableWithUsers();
    })
}

function getRole(selectRoles) {
    let data = [];
    $(selectRoles).find("option:selected").each(function () {
        data.push({id: $(this).val(), role: $(this).attr("name"), authority: $(this).attr("name")})
    });
    return data;
}