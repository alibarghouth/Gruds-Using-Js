//search
let title =document.querySelector("#title");
let price =document.querySelector("#price");
let taxes =document.querySelector("#taxes");
let ads =document.querySelector("#ads");
let discount =document.querySelector("#discount");
let total =document.querySelector("#total");
let count =document.querySelector("#count");
let category =document.querySelector("#category");
let submit =document.querySelector("#submit");
let deleteAll=document.querySelector("#deleteall");
let mode = 'create';
let temp;
let allPro;
//get total
function getTotal(){
    if(price.value!=""){
        total.innerHTML=+price.value + +taxes.value + +ads.value - +discount.value;
        total.style.background = "green";
    }else{
        total.innerHTML="";
        total.style.background = "red";
    };
};
// ضاف اللوكل ستوريج لى الاري
if(localStorage.product !=null){
    allPro=JSON.parse(localStorage.product);
}else{
    allPro=[];
};
//save localstorage

submit.onclick = function(){
    let newPro = {
        title: title.value,
        price:price.value,
        ads:ads.value,
        category:category.value,
        taxes:taxes.value,
        count:count.value,
        discount:discount.value,
        total:total.innerHTML,
    };
    //count
    if(title.value!='' && price.value!=''&& category.value!='' && count.value<=100){
    if(mode==='create'){
    if(newPro.count>1){
        for(let j=0 ; j<newPro.count;j++){
            allPro.push(newPro);
        }
    }else{
        allPro.push(newPro);
    }}else{
        allPro[temp]=newPro;
        mode='create';
        count.style.display='block';
        submit.innerHTML='Create';
    }
    clearData();
}
    localStorage.setItem( 'product', JSON.stringify(allPro));
    show();
};
//clear inputs
function clearData(){
      title.value='';
      price.value='';
      taxes.value='';
      ads.value='';
      discount.value='';
      total.innerHTML='';
      count.value='';
      category.value='';
};
//read product
function show(){
    // عشان يرجع التوتال لونها الطبعي بعد الانشاء او التعديل 
    getTotal();
    let table='';
    for(let i=0 ;i<allPro.length;i++){
        table+=`
        <tr>
        <td>${i+1}</td>
        <td>${allPro[i].title}</td>
        <td>${allPro[i].price}</td>
        <td>${allPro[i].taxes}</td>
        <td>${allPro[i].discount}</td>
        <td>${allPro[i].total}</td>
        <td>${allPro[i].category}</td>
        <td><button onclick="updateData(${i})"  id="update">Update</button></td>
        <td><button onclick="deleteOne(${i})" id="delete"> Delete</button></td>
       </tr>
        `
    };
    document.querySelector("#tbody").innerHTML=table;
    if(allPro.length>0){
       deleteAll.innerHTML = `
       <button onclick="clearAll()">DeleteAll</button>
       `
    }else{
        deleteAll.innerHTML='';
    }
};
show();

//delete
function deleteOne(i){
    // حذف من الاري
    allPro.splice(i,1);
    // ضاف ااري الجددة لى اللوكل سوريج
    localStorage.product=JSON.stringify(allPro);
    show();
}


function clearAll(){
    localStorage.clear();
    allPro.splice(0);
    show();
};

//update
function updateData(i){
    title.value=allPro[i].title;
    price.value=allPro[i].price;
    taxes.value=allPro[i].taxes;
    ads.value=allPro[i].ads;
    discount.value=allPro[i].discount;
    category.value=allPro[i].category;
    count.style.display="none";
    submit.innerHTML ="Update";
    mode='update';
    temp=i;
    // عشان اشغل التوتال اول ما كبس علي الابديت
    getTotal();
    scroll({
        top:0,
        behavior:"smooth",
    });
};

// clean data
let searchMood="title";
function sheachMood(id){
    let search =document.querySelector("#search");
    if(id=='shearchByTitle'){
        searchMood='title';
        search.placeholder='Search By Title';
    }else{
        searchMood='category';
        search.placeholder='Search By Category';
    }
    search.focus();
};
function searchBy(value){
    let table='';
    if(searchMood=='title'){
        for(let i=0;i<allPro.length;i++){
           if(allPro[i].title.includes(value)){
            table+=`
            <tr>
            <td>${i+1}</td>
            <td>${allPro[i].title}</td>
            <td>${allPro[i].price}</td>
            <td>${allPro[i].taxes}</td>
            <td>${allPro[i].discount}</td>
            <td>${allPro[i].total}</td>
            <td>${allPro[i].category}</td>
            <td><button onclick="updateData(${i})"  id="update">Update</button></td>
            <td><button onclick="deleteOne(${i})" id="delete"> Delete</button></td>
           </tr>
            `
           }
        };
    }else{
        for(let i=0;i<allPro.length;i++){
            if(allPro[i].category.includes(value)){
             table+=`
             <tr>
             <td>${i+1}</td>
             <td>${allPro[i].title}</td>
             <td>${allPro[i].price}</td>
             <td>${allPro[i].taxes}</td>
             <td>${allPro[i].discount}</td>
             <td>${allPro[i].total}</td>
             <td>${allPro[i].category}</td>
             <td><button onclick="updateData(${i})"  id="update">Update</button></td>
             <td><button onclick="deleteOne(${i})" id="delete"> Delete</button></td>
            </tr>
             `
            }
         };
    }
    document.querySelector("#tbody").innerHTML=table;
};