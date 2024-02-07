const newTaskName = 'My-To-Do-List'

function validateIfExistsNewTask()
{
    let values     = JSON.parse(localStorage.getItem('newTaskName') || "[]");
    let inputValue = document.getElementById('inputNewTask').value
    let exists     = values.find(x => x.name == inputValue);
    return !exists ? false : true // Se não existe -> falso, senão -> true 
}

function newTask(){
    let input = document.getElementById('inputNewTask')

    if(!input.value)
    {
        input.style.border = '1px solid red'
        alert("Por favor, digite um item")
    } 
    else if (validateIfExistsNewTask())
    {   
        alert('Essa task já existe')
    }
    else
    {
        let values = JSON.parse(localStorage.getItem('newTaskName') || "[]");
        values.push({   
            name: input.value
        })
        localStorage.setItem('newTaskName',JSON.stringify(values))
        showValues() 
    }
    input.value = ''
}

function showValues(){
    let values = JSON.parse(localStorage.getItem('newTaskName') || "[]");
    let list = document.getElementById('to-do');
    list.innerHTML = ''
    for (let i=0; i<values.length; i++){
        list.innerHTML += `<li>${values[i]['name']} <button id="btnOk" onclick="removeItem('${values[i]['name']}')"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
      </svg> </button> </li>`
    }
}

function removeItem(data){
    let values = JSON.parse(localStorage.getItem('newTaskName') || "[]");
    let index = values.findIndex(x => x.name == data);
    values.splice(index,1);
    localStorage.setItem('newTaskName',JSON.stringify(values))
    showValues()
}

showValues()