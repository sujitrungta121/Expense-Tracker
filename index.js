const balance = document.getElementById("balance");
const money_plus=document.getElementById("money-plus");
const money_minus=document.getElementById("money-minus");
const list=document.getElementById("list");
const form=document.getElementById("form");
const text=document.getElementById("text");
const amount=document.getElementById("amount");

const LocalStorageTransaction=JSON.parse(localStorage.getItem("transactions"));

let transactions=localStorage.getItem("transactions")!==null?LocalStorageTransaction:[];//=>The dummy transaction values are access in a variable named Transaction


function addTransaction(e){
e.preventDefault();
if(text.value.trim()==="" || amount.value.trim()==="")
alert("please Enter Text and Amount");
const transaction={
    id:generateId(),
    text:text.value,
    amount:+amount.value,
}
transactions.push(transaction);
addTransactionDom(transaction);

updateValues(); 
updateLocalStorage();
text.value="";  
amount.value="";
}
//Generate id

function generateId(){
    return Math.floor(Math.random()*10000000);
}

//Add Transactions


function addTransactionDom(transaction){
    const sign=transaction.amount<0?"-":"+";
    const item=document.createElement("li");

    item.classList.add(
        transaction.amount<0? "minus":"plus"
    );
item.innerHTML=`
${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
<button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
`;

list.appendChild(item);

}

//remove Transaction
function removeTransaction(id){
    transactions=transactions.filter(transaction=>transaction.id!==id);
   updateLocalStorage();
    init();
}

function updateValues(){
    const amount=transactions.map(transaction=>transaction.amount);
    const total=amount.reduce((acc,item)=>(acc+=item),0).toFixed(2);
    const income=amount.filter(item=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
    const expense=(
        amount.filter(item=>item<0).reduce((acc,item)=>(acc+=item),0)*-1
    ).toFixed(2); 
   balance.innerText=`$${total}`;
   money_plus.innerText=`$${income}`;
   money_minus.innerText=`$${expense}`;
}
function init(){
    list.innerHTML="";
    transactions.forEach(addTransactionDom);
    updateValues();
}

init();

form.addEventListener("submit",addTransaction);
    

// update local Storage

function updateLocalStorage(){
    localStorage.setItem(
        "transactions",JSON.stringify(transactions)
    );
}
