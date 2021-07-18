$(async function () {
    await getTableWithCurrentUser();
})

const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findCurrentUser: async () => await fetch(`/user/user`),
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
