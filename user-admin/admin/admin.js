async function fetchData() {
    let res =await fetch("http://localhost:3000/students");
    try {
        if(!res.ok)
            throw new Error("Not able to fetch the data")
        let data = await res.json();
        showData(data);
    } catch(error) {
        console.log(error);      
    }
}

function showData(data) {
    let con = document.getElementById("main");
    data.forEach(student => {
        let item = document.createElement("div");
        item.id = "item"
        item.innerHTML = `
        <div>
            <p><strong>Id : </strong>${student.id}</p>
            <p><strong>Name : </strong>${student.name}</p>
            <button id='delete${student.id}'>Delete</button>
            <button id='edit${student.id}'>Edit</button>
        </div>
        `
        con.appendChild(item)
    })
        con.appendChild(item);
        data.forEach(student => {
            let deletBtn = document.getElementById(`delete${student.id}`);
            let editBtn = document.getElementById(`edit${student.id}`)
            deletBtn.onclick = () => {
                deleteData(student.id);
            }
            editBtn.onclick = () => {
                editData(student.id);
            }
        })
}

async function deleteData(id) {
    let res = await fetch(`http://localhost:3000/students/${id}`,{
        "method":"DELETE"
    })
    try {
        if(!res.ok) throw new Error("Data Not Deleted");
        alert("Data Deleted From JSON");
    } catch (error) {
        console.log(error);        
    }
}

async function editData(id) {
    let stdId = document.getElementById("id");
    let stdName = document.getElementById("name");
    let stdImage = document.getElementById("image")
    let res = await fetch(`http://localhost:3000/students/${id}`);
    try {
        if(!res.ok) throw new Error("Data not accessible to edit");
        let data =await res.json();
        stdId.value = data.id;
        stdName.value = data.name;
        stdImage.value = data.image;
    } catch (error) {
        console.log(error);        
    }
}

async function saveData() {
    let stdId = document.getElementById("id").value;
    let stdName = document.getElementById("name").value;
    let stdImg = document.getElementById("image").value;

    let obj = {
        "name":stdName,
        "image":stdImg
    }
    let stdMethod = stdId?"PATCH":"POST";
    const URL = stdId?`http://localhost:3000/students/${stdId}`:"http://localhost:3000/students";
    let res = await fetch(URL, {
        "method":stdMethod,
        "headers": {
            "Content-Type":"application/json"
        },
        "body":JSON.stringify(obj)
    });
    try {
        if(!res.ok) throw new Error("Data Not Sent");
        alert("Data Updated Successfully!")
    } catch(error) {
        console.log(error);        
    }
}
addEventListener("DOMContentLoaded", fetchData)