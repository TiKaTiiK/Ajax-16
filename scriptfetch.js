// 2.fetch

let currentPage = 1;
let totalPagesApi;

function GetUsers(page) {
    fetch('https://reqres.in/api/users?page=' + page, {
        method: 'GET'
    })
    .then(function(response) {
        if (response.status !== 200) {
            throw response.status;
        }
        return response.json();
    })
    .then(function(responseData) {
        var fragment = document.createDocumentFragment();

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

    })
    .catch(function(error) {
        if (error == 404) {
            let p = document.createElement('p');
            p.textContent = 'Server Error';
            
            document.getElementById('api-user-email').appendChild(p);
        } else {
            console.log('Page is not Found');
        }
       
    })
}

document.getElementById('loadprev').addEventListener('click', function() {
    if (currentPage == 1) {
        return;
    }
    currentPage -= 1;
    GetUsers(currentPage);
})

document.getElementById('loadnext').addEventListener('click', function() {
    if (currentPage == totalPagesApi) {
        return;
    }
    currentPage += 1;
    GetUsers(currentPage);
})



GetUsers(currentPage);

