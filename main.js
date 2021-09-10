var isDown = false;
var selected = null;
var x = 0;
var y = 0;
var list1 = document.getElementsByClassName("list")[0];
var list2 = document.getElementsByClassName("list")[1];
var list3 = document.getElementsByClassName("list")[2];

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

function createCard()
{
    var input = document.querySelector("#prompt>[name=title]");
    var textarea = document.querySelector("#prompt>[name=description]");

    var template = document.querySelector("#card-template");

    var fragment = template.content.cloneNode(true);
    fragment.querySelector("h3").innerText = input.value;
    fragment.querySelector("p").innerText = textarea.value;
    input.value = "";
    textarea.value = "";

    var card = fragment.firstElementChild;
    card.addEventListener("mousedown", e=>{
        let rect = e.target.getBoundingClientRect();
        selected = card;
        x = e.clientX;
        y = e.clientY;
        selected.style.cursor = "grabbing";
    })
    

    document.querySelector(".list").append(card);


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
    }
    
});

addEventListener("mousemove", e=>{
    
    if(isDown && selected)
    {
        selected.style.transform = `translate(${e.clientX - x}px, ${e.clientY - y}px)`;        
    }


});

