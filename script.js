let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let flagRemove = false;
let textAreaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-colors");
let modalPriorityColor = "lightlightPink";
let colors = ['lightPink' , 'lightGreen' , 'lightBlue' , 'black'];

let toolBoxColors = document.querySelectorAll(".color-box")

let lockClass = 'fa-lock';
let unlockClass =  "fa-lock-open";

let ticketsArr = [];

if (localStorage.getItem('tickets')) {
    ticketsArr = JSON.parse(localStorage.getItem('tickets'));

    ticketsArr.forEach(function(ticket){
        createTicket(ticket.taskDetails,ticket.priorityColor,ticket.id)
    })
}

let addFlag = false;

addBtn.addEventListener("click", function(){
    addFlag = !addFlag;
    if (addFlag === true) {
        modalCont.style.display = "flex";
    } else {
        modalCont.style.display = "none";
    }
})



allPriorityColors.forEach(function(priorityColor){
    priorityColor.addEventListener("click", function(){
        allPriorityColors.forEach(function(colorEle){
            colorEle.classList.remove("active");
        })
        modalPriorityColor = priorityColor.classList[0];
        priorityColor.classList.add("active");
    })
})


document.addEventListener("keydown",function(e){
    let key = e.key
    if (key == "Shift") {
        createTicket(textAreaCont.value, modalPriorityColor);        
    }
})


function createTicket(taskDetails,priorityColor,ticketId) {
    let id = ticketId || shortid();
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class","ticket-cont")
    ticketCont.innerHTML = ` <div class="ticket-color-cont ${priorityColor}"></div>
            <div class="ticket-id">${id}</div>
            <div class="ticket-task">${taskDetails}</div>
            <div class="ticket-lock">
                <i class="fa-solid fa-lock"></i>
            </div>`;
   mainCont.appendChild(ticketCont);
   handleLock(ticketCont, ticketId);
   handleRemove(ticketCont);
   handleColors(ticketCont);
   if (!ticketId) {
    ticketsArr.push({priorityColor,taskDetails,id:id})
    localStorage.setItem("tickets",JSON.stringify(ticketsArr))
   }
   console.log("ticketsArr-=", ticketsArr)
   modalCont.style.display = "none";
}

for (let index = 0; index < toolBoxColors.length; index++) {
    toolBoxColors[index].addEventListener("click", function(e) {
        let selectedFilter =  toolBoxColors[index].classList[0];
        // console.log("selectedFilter-=", selectedFilter) 
        let filteredTickets = ticketsArr.filter(function(ticket) {
            return selectedFilter == ticket.priorityColor       
        })      
        let allTickets = document.querySelectorAll(".ticket-cont")
        for (let i = 0; i < allTickets.length; i++) {
            allTickets[i].remove();
        }

        filteredTickets.forEach(function(ticket){
            createTicket(ticket.taskDetails,ticket.priorityColor,ticket.id)
        })
    })
    
}

function handleLock(ticket,id) {
    let ticketLock = ticket.querySelector(".ticket-lock");
    let ticketLockIcon = ticketLock.children[0];
    let lockFlag = false;

    let foundId = getId(id);

    ticketLockIcon.addEventListener("click", function(){
        let taskTextArea = document.querySelector(".ticket-task");
        lockFlag = !lockFlag;
        if (ticketLockIcon.classList.contains(lockClass)) {
            ticketLockIcon.classList.remove(lockClass);
            ticketLockIcon.classList.add(unlockClass);
            taskTextArea.setAttribute("contenteditable", "true");
        }else{
            ticketLockIcon.classList.remove(unlockClass);
            ticketLockIcon.classList.add(lockClass);
            ticketLock.setAttribute('contenteditable', 'false');
        }
        ticketsArr[foundId].taskDetails = textAreaCont.innerText;
        localStorage.setItem("tickets",JSON.stringify(ticketsArr))
    })
}

removeBtn.addEventListener("click", function() {
    flagRemove = !flagRemove;
    if (flagRemove) {
        alert("delete button activated");  
        removeBtn.style.color = ""     
        removeBtn.style.backgroundColor = "red";    
    } else {
        alert("alert deactivated");
        removeBtn.style.backgroundColor = "";
    }    
});


function handleRemove(ticket) {
    ticket.addEventListener("click",function(){
        if (!flagRemove) return;
        ticket.remove()
    })
}

function handleColors(ticket) {
    let ticketBand = ticket.querySelector(".ticket-color-cont");

    ticketBand.addEventListener("click", function(){
        let currentColor = ticketBand.classList[1];
        let currentColorIdx = colors.findIndex(function(color){return currentColor === color});

        currentColorIdx++;

        let newTicketColorIDx = currentColorIdx % colors.length;

        let newTicketColor = colors[newTicketColorIDx];

        ticketBand.classList.remove(currentColor);

        ticketBand.classList.add(newTicketColor)
    })

}

function getId(id) {
    let getItem = ticketsArr.findIndex(function(ticketObj){
        return ticketObj.ticketId == id;
    });

    return getItem;
}