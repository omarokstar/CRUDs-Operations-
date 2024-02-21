let price=document.getElementById("price");
let title=document.getElementById("title");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let category=document.getElementById("category");
let total=document.getElementById("total");
let count=document.getElementById("count");
let submit=document.getElementById("submit");
let search=document.getElementById("search");
console.log(price,title,taxes,ads,discount,category,submit)
let mood='create';
let tmp;
let searchMood='title';



function getTotal(){
if(price.value!=" "){
    let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background='#000';
}
else{
    total.innerHTML= ' ' ;
    total.style.background='#dd2525';
}
}

function clearData(){
title:title.value=' '
price:price.value=''
taxes:taxes.value=''
ads:ads.value=''
discount:discount.value=''
total:total.innerHTML=''
count:count.value=''
category:category.value=''
}
function updateData(i){
title.value=datapro[i].title;
price.value=datapro[i].price;
ads.value=datapro[i].ads;
taxes.value=datapro[i].taxes;
discount.value=datapro[i].discount;
category.value=datapro[i].category;
count.style.display='none';
submit.innerHTML='update';
getTotal();
mood='update';
tmp=i;
scroll({
    top:0,
    behavior:'smooth',

})
total.style.background='#dd2525';



}
function showData(){
    let table="";
for(let i=0;i<datapro.length;i++){
  table+=` <tr>
  <td>${i+1}</td>
  <td>${datapro[i].title}</td>
  <td>${datapro[i].price}</td>
  <td>${datapro[i].ads}</td>
  <td>${datapro[i].taxes}</td>
  <td>${datapro[i].discount}</td>
  <td>${datapro[i].total}</td>
  <td>${datapro[i].category}</td>
  <td><button id="update" onclick="updateData(${i})"> update</button></td>
  <td><button id="delete" onclick="deleteData( ${i})"> delete</button></td>

  </tr>
  `;
}


    document.getElementById('tbody').innerHTML=table;
    let btnDelete=document.getElementById('deleteAll')
    if(datapro.length >0 ){
        btnDelete.innerHTML=`
       <button onclick="deleteAll()"> deleteAll(${datapro.length}) </button>
`

    }
    else{
        btnDelete.innerHTML=' '

    }

}

function deleteAll(){
 datapro.splice(0);
    localStorage.clear();
    showData();

}
let datapro;
if(localStorage.product !=null)
{
   datapro= JSON.parse(localStorage.product) 
}
else{
     datapro=[];
}
showData();



function deleteData(i){
  datapro.splice(i,1);
  localStorage.product=JSON.stringify(datapro)
  showData();

}
submit.onclick =function (){
let newpro= {
title:title.value.toLowerCase(),
price:price.value,
taxes:taxes.value,
ads:ads.value,
discount:discount.value,
total:total.innerHTML,
count:count.value,
category:category.value.toLowerCase(),

}
if(title.value!=' '&& price.value!=''&&category.value!=' '&& newpro.count<100){
if(mood==='create'){
if(newpro.count >1){

    for(let i=0;i<newpro.count;i++){
        datapro.push(newpro)
    }

}

else{
    datapro.push(newpro)
}
}
else{

    datapro[ tmp ]=newpro;
    submit.innerHTML='create';
    mood='create'
    count.style.display='block';
}

    localStorage.setItem('product', JSON.stringify(datapro))
    console.log(newpro);
    total.style.background='#dd2525';


 clearData();
showData();
}
}
function getSearchMood(id){
if(id=='searchbyTitle'){
    searchMood='title';
}
else{
    searchMood='category';
   

}
search.placeholder='search by'+ searchMood;

search.focus()
search.value=' ';
showData();

}
function searchData(value){
    let table='';
    console.log(value);
    if(searchMood=="title"){
        for(let i=0;i< datapro.length;i++){
         if(datapro[i].title.includes(value.toLowerCase()) ){
           table= ` <tr>
  <td>${i}</td>
  <td>${datapro[i].title}</td>
  <td>${datapro[i].price}</td>
  <td>${datapro[i].ads}</td>
  <td>${datapro[i].taxes}</td>
  <td>${datapro[i].discount}</td>
  <td>${datapro[i].total}</td>
  <td>${datapro[i].category}</td>
  <td><button id="update" onclick="updateData(${i})"> update</button></td>
  <td><button id="delete" onclick="deleteData( ${i})"> delete</button></td>

  </tr>
  `;



        
         }





        }

    }
    else{
        for(let i=0;i< datapro.length;i++){
if(datapro[i].category.includes(value.toLowerCase())){
            table= ` <tr>
   <td>${i}</td>
   <td>${datapro[i].title}</td>
   <td>${datapro[i].price}</td>
   <td>${datapro[i].ads}</td>
   <td>${datapro[i].taxes}</td>
   <td>${datapro[i].discount}</td>
   <td>${datapro[i].total}</td>
   <td>${datapro[i].category}</td>
   <td><button id="update" onclick="updateData(${i})"> update</button></td>
   <td><button id="delete" onclick="deleteData( ${i})"> delete</button></td>
 
   </tr>
   `;


        }
 
 
 
         
          }
 
 
 
 
 
         }
 

         document.getElementById('tbody').innerHTML=table;

   

}

