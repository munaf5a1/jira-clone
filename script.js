let addBtn = document.querySelector(".add-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");

let addFlag = false;

addBtn.addEventListener("click", function(){
    addFlag = !addFlag;

    if (addFlag===true) {

        modalCont.style.display = "flex";
    } else {
        modalCont.style.display = "none";
    }
})

document.addEventListener("keydown",function(e){
    let key = e.key
    if (key == "Shift") {
        createTicket();        
    }
})


function createTicket() {
    let ticketCont = document.createElement("div");

    ticketCont.setAttribute("class","ticket-cont")

    ticketCont.innerHTML = ` <div class="ticket-color"></div>
            <div class="ticket-id">1234</div>
            <div class="ticket-task">Todo!</div>
            <div class="ticket-lock">
                <i class="fa-solid fa-lock"></i>
            </div>`;

   mainCont.appendChild(ticketCont)
   modalCont.style.display = "none";

}