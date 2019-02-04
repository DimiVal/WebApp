document.getElementById("showTable");
document.getElementById("myBtn").addEventListener("click", createTable);

function createTable() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            showUserTable(myJson)
        })
}

function showUserTable(myUsers) {
    const col = [];
    for (let i = 0; i < myUsers.length; i++) {
        for (const key in myUsers[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    const table = document.createElement("table");
    const tr = table.insertRow(-1);

    for (let i = 0; i < col.length; i++) {
        const th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (let i = 0; i < myUsers.length; i++) {
        const tr = table.insertRow(-1);

        tr.addEventListener('click', () => {           
            createAlbumTable(tr.firstChild.innerHTML, 'secondTable')
        })

        for (let j = 0; j < col.length; j++) {
            const tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myUsers[i][col[j]];
        }
    }

    const divContainer = document.getElementById("showTable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("showTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        //Search by colomn index (1)
        td = tr[i].getElementsByTagName("td")[1];

        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function createAlbumTable(userId, selectorId) {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (myAlbums) {
            showAlbumTable(myAlbums, 'custom-table')
        })
}

function showAlbumTable(albumsData, selector) {
    const divContainer = document.getElementById(selector);
    divContainer.innerHTML = "";
    divContainer.appendChild(tableGenerator(albumsData));
}

function tableGenerator(tableData) {

    const col = [];
    for (let i = 0; i < tableData.length; i++) {
        for (const key in tableData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    const table = document.createElement("table");
    const tr = table.insertRow(-1);

    for (let i = 0; i < col.length; i++) {
        const th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (let i = 0; i < tableData.length; i++) {
        const tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            const tabCell = tr.insertCell(-1);
            tabCell.innerHTML = tableData[i][col[j]];
        }
    }

    return table
}
// https://jsonplaceholder.typicode.com/albums?userId=1