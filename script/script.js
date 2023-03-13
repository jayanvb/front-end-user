window.onload = (Event) => {
    console.log(event);
    if (document.getElementById("mytodolist") != null) {
        getalldata();
    }
    var url = window.location.href;
    const urlobj = new URL(url);
    const searchParams = urlobj.searchParams;
    var message = searchParams.get('message');
    console.log(url);
    console.log(message);
    if (document.getElementById("message") != null) {
        document.getElementById("message").innerHTML = message;
    }
    if (document.getElementById("updatepage") != null) {
        var id = searchParams.get('id');
        getalldatabyid(id);
    }
}

var getalldata = async () => {
    console.log('getalldata');
    const mytodolist = await fetch('http://localhost:7777/getalldata');
    const finaltodolist = await mytodolist.json()
    console.log(finaltodolist);

    var mytablestring = '<tr>';
    mytablestring = mytablestring + '<td>username</td>';
    mytablestring = mytablestring + '<td>email</td>';
    mytablestring = mytablestring + '<td>password</td>';
    mytablestring = mytablestring + '<td>hobby</td>';
    mytablestring = mytablestring + '<td>gender</td>';
    mytablestring = mytablestring + '<td>joined</td>';
    mytablestring = mytablestring + '<td>action</td>';
    mytablestring = mytablestring + '</tr>';


    finaltodolist.forEach(element => {
        mytablestring = mytablestring + '<tr>';
        mytablestring = mytablestring + '<td>' + element.UserName + '</td>';
        mytablestring = mytablestring + '<td>' + element.Email + '</td>';
        mytablestring = mytablestring + '<td>' + element.Password + '</td>';
        mytablestring = mytablestring + '<td>' + element.Hobby + '</td>';
        mytablestring = mytablestring + '<td>' + element.Gender + '</td>';
        mytablestring = mytablestring + '<td>' + element.Joined + '</td>';
        mytablestring = mytablestring + '<td><a href = update.html?id=' + element.id + '> edit </a> | <a href = "javascript:void(0)" onclick = "deletedata(' + element.id + ');">delete</a> </td>';
        mytablestring = mytablestring + '</tr>';
        mytablestring = mytablestring + '</tr>';
    });
    document.getElementById("mytodolist").innerHTML = mytablestring;
}


var getalladddata = async () => {
    var username = document.forms[0].username.value;
    var email = document.forms[0].email.value;
    var password = document.forms[0].password.value;
    var hobby = document.forms[0].hobby.value;
    var gender = document.forms[0].gender.value;

    var joined = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (username === '') {
        alert('please enter the username');
        return false;
    }
    if (email === '') {
        alert('please enter the email');
        return false;
    }
    if (password === '') {
        alert('please enter the password');
        return false;
    }
    if (hobby === '') {
        alert('please enter the  hobby');
        return false;
    }
    
    if (gender === '') {
        alert('please select the gender');
        return false;
    }
    var userdata = {
        "username": username,
        "email": email,
        "password": password,
        "hobby": hobby,
        "joined" : joined,
        "gender": gender,
    }
    console.log(userdata);
    var addstatus = await fetch('http://localhost:7777/getalladddata', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata),
        cache: "no-cache"
    })
    window.location.href = "user.html?message=mydatabase add success";
    return false;
}
var getalldatabyid = async (id) => {
    console.log(id);
    const tododata = await fetch('http://localhost:7777/getalldatabyid' + '/' + id);
    const finaltododata = await tododata.json();
    console.log(finaltododata[0]);

    document.getElementById("id").value = finaltododata[0].id;
    document.getElementById("username").value = finaltododata[0].UserName;
    document.getElementById("email").value = finaltododata[0].Email;
    document.getElementById("password").value = finaltododata[0].Password;
    document.getElementById("hobby").value = finaltododata[0].Hobby;
    document.getElementById("gender").value = finaltododata[0].Gender;
}

var getallupdatedata = async () => {
    var id = document.forms[0].id.value;
    var username = document.forms[0].username.value;
    var email = document.forms[0].email.value;
    var password = document.forms[0].password.value;
    var hobby = document.forms[0].hobby.value;
    var gender = document.forms[0].gender.value;


    if (username === '') {
        alert('please enter the username');
        return false;
    }
    if (email === '') {
        alert('please enter the email');
        return false;
    }
    if (password === '') {
        alert('please enter the password');
        return false;
    }
    if (hobby === '') {
        alert('please enter the  hobby');
        return false;
    }
   
    if (gender === '') {
        alert('please select the gender');
        return false;
    }
    var tododata = {
        "id": id,
        "UserName": username,
        "Email": email,
        "Password": password,
        "Hobby": hobby,
        "Gender": gender,
    };


    console.log(tododata);


    var updatestatus = await fetch('http://localhost:7777/getallupdatedata', {
        method: 'PUT',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tododata),
        cache: "no-cache"
    })
    console.log(tododata);
    window.location.href = "user.html?message=mydatabase updated success";
    return false;
}


var deletedata = async (id) => {

    if (confirm("Are you sure want delete?") != true) {
        return false;
    }

    var deletedata = {
        "id": id
    };
    var deletestatus = await fetch('http://localhost:7777/getalldeletedata', {
        method: 'DELETE',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deletedata),
        cache: "no-cache"
    })
    console.log(id);
    console.log(deletestatus);
    window.location.href = "user.html?message=mydatabase delete success";
}