var isDown = false;
var selected = null;
var x = 0;
var y = 0;
var list1 = document.getElementsByClassName("list")[0];
var list2 = document.getElementsByClassName("list")[1];
var list3 = document.getElementsByClassName("list")[2];


load();

function showPrompt()
{
    var prompt = document.querySelector("#prompt");
    prompt.style.display = "flex";
    document.querySelector("#prompt>[name=title]").focus();
}
function hidePrompt()
{
    var prompt = document.querySelector("#prompt");
    prompt.style.display = "none";
}

function ok()
{
    var input = document.querySelector("#prompt>[name=title]");
    var textarea = document.querySelector("#prompt>[name=description]");

    var card = createCard(input.value, textarea.value);
    input.value = "";
    textarea.value = "";

    list1.append(card);

    hidePrompt();
}

function createCard(title, description)
{
    var template = document.querySelector("#card-template");

    var fragment = template.content.cloneNode(true);
    fragment.querySelector("h3").innerText = title;
    fragment.querySelector("p").innerText = description;


    var card = fragment.firstElementChild;
    card.addEventListener("mousedown", e=>{
        let rect = e.target.getBoundingClientRect();
        selected = card;
        x = e.clientX;
        y = e.clientY;
        selected.style.cursor = "grabbing";
    })
    
    return card;
}

function save()
{
    var todoCards = list1.querySelectorAll(".card");
    var inprogressCards = list2.querySelectorAll(".card");
    var doneCards = list3.querySelectorAll(".card");

    var data = {todo:[], inprogress:[], done:[]};

    for(let card of todoCards)
    {
        let title = card.querySelector(".title").innerText;
        let description = card.querySelector(".description").innerText;
        data.todo.push({title,description});
    }

    for(let card of inprogressCards)
    {
        let title = card.querySelector(".title").innerText;
        let description = card.querySelector(".description").innerText;
        data.inprogress.push({title,description});
    }

    for(let card of doneCards)
    {
        let title = card.querySelector(".title").innerText;
        let description = card.querySelector(".description").innerText;
        data.done.push({title,description});
    }

    localStorage.setItem("data",JSON.stringify(data));

}

function load()
{
    var data = JSON.parse(localStorage.getItem("data"));

    if(!data) return;

    list1.innerHTML = "";
    list2.innerHTML = "";
    list3.innerHTML = "";

    for(let todoItem of data.todo)
    {
        let card = createCard(todoItem.title, todoItem.description);
        list1.append(card);   
    }

    for(let inprogressItem of data.inprogress)
    {
        let card = createCard(inprogressItem.title,inprogressItem.description);
        list2.append(card); 
    }

    for(let doneItem of data.done)
    {
        let card = createCard(doneItem.title, doneItem.description);
        card.style.color = "grey";
        list3.append(card); 
    }

}


addEventListener("mousedown", e=>{
    isDown = true;
});
addEventListener("mouseup", e=>{
    if(selected)
    {
        selected.parentNode.removeChild(selected);
        let x1 = list2.getBoundingClientRect().x;
        let x2 = list3.getBoundingClientRect().x;

        
        if(e.clientX > x2)
        {
            list3.append(selected);
            selected.style.color = "grey";
        }
        else if(e.clientX > x1)
        {
            list2.append(selected);
            selected.style.color = "";
        }
        else
        {
            list1.append(selected);
            selected.style.color = "";
        }
        selected.style.transform = "";
        selected.style.cursor = "";
        isDown = false;
        selected = null;

        save();
    }
    
});

addEventListener("mousemove", e=>{
    
    if(isDown && selected)
    {
        selected.style.transform = `translate(${e.clientX - x}px, ${e.clientY - y}px)`;        
    }


});

