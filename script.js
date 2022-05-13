// 1. xml http request

function getUsers(page) {
    let request = new XMLHttpRequest();
    request.addEventListener('load', render);
    request.addEventListener('error', errorRender);

    request.open('GET', 'https://reqres.in/api/users?page=' + page);

    request.send();
}

let currentPage = 1;
let totalPagesApi;

function render() {
    // console.log(this);
    let response = this.responseText;
    // console.log(response);
    let responseData = JSON.parse(response);

    var fragment = document.createDocumentFragment();


    // let ul = document.createElement('ul');
    
    responseData.data.forEach(item => {
        let li = document.createElement('li');

        let pEmail = document.createElement('p');
            pEmail.textContent = item.email;
            pEmail.classList.add('email-block');

        let imgUser = document.createElement('img');
            imgUser.src = item.avatar;
            imgUser.classList.add('image-block');

            li.appendChild(imgUser);
            li.appendChild(pEmail);
            li.classList.add('li-item');

            fragment.appendChild(li);
    });

    document.getElementById('ul-list').innerHTML = ' ';
    document.getElementById('ul-list').appendChild(fragment);

    totalPagesApi = responseData.total_pages;

    }

function errorRender() {
    let p = document.createElement('p');
        p.textContent = 'Server Error';

    document.querySelector('#api-user-email').appendChild(p)

}
// getUsers();

document.getElementById('loadprev').addEventListener('click', function() {
    // console.log('pirvelshi='+currentPage);
    if (currentPage == 1) {
        // console.log('shevida');
        return;
    }
    currentPage -= 1;
    getUsers(currentPage);
})

document.getElementById('loadnext').addEventListener('click', function() {
    // console.log('meore='+totalPagesApi);
    if (currentPage == totalPagesApi) {
        return;
    }
    currentPage += 1;
    getUsers(currentPage);
})

getUsers(currentPage);
