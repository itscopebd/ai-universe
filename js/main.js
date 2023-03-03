
const defaultData=6;
// load data from api  
const loadData=(defaultData)=>{

    // loading spinner start 
    loadingSpinner(true);

    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res=> res.json())
    .then(data=> showLimitedData(data.data.tools,defaultData))
    .catch(err=> console.log(err))
}

// show default  data in UI
const showLimitedData=(data,defaultData)=>{
    console.log(data)
    // Data slice and data length less than six or gather than six, show or hide see more button 
    const seeMoreBtn=document.getElementById("see__more_btn");
    if (defaultData && data.length > 6) {
        data=data.slice(0,defaultData);
        seeMoreBtn.classList.remove("d-none")
    }else{
      seeMoreBtn.classList.add("d-none")
    }

    const loadData= document.getElementById("loadCard");
    loadData.innerHTML="";
    data.forEach(element => {
        const {features,image,name,published_in,description}=element;

        // features value iteration 
      const featureData=features.map(data=> `<li>  ${data} </li>`);
console.log(featureData)
       const div = document.createElement("div");
       div.classList.add("col-12","col-md-6","col-lg-4");
       div.innerHTML=`
       <div class="card my-3">
         <img src="${image ? image:" No Image"}" class="card-img-top" alt="..." style="height:200px">
         <div class="card-body">
           <h5 class="card-title">Features</h5>
           <ol>${featureData.join(" ")}</ol>
           <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
         </div>
         <div class="card-footer d-flex justify-content-between align-items-center">
           <div>
             <h5 class="card-title">${name ? name :"No Name"}</h5>
             
             <h6>
               <i class="fa-regular fa-calendar-days"></i> ${published_in ? published_in :"No Date"}
             </h6>
           </div>
           <div>
             <button class="btn btn-primary" onclick="singleDataFetch('${element.id}')" data-bs-toggle="modal" data-bs-target="#detailsModal">
               <i class="fa-solid fa-arrow-right"></i>
             </button>
           </div>
         </div>
       </div>
       `;
       loadData.appendChild(div)
      
      
    });

   

    // loading spinner stop 
    loadingSpinner(false)
}

// loading spinner 
const loadingSpinner=(isLoading)=>{
   const loading__spinner= document.getElementById("loading__spinner");
   if (isLoading) {
    loading__spinner.classList.remove("d-none")
   }else{
    loading__spinner.classList.add("d-none")
   }

}

// all data show button click 
const allDataShow=()=>{
  loadData();
}


// single data fetch  
const singleDataFetch= async id=>{
 const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;

// error handle 
try{
 const res= await fetch(url);
 const data= await res.json();
 showSingleData(data)
} catch(error){
console.log(error)
}

}
//  single data  and modal show
const showSingleData=data=>{
const load_modal= document.getElementById("load_modal");
load_modal.innerHTML=`

<div class="modal-content">
<div class="d-flex justify-content-end">
    <button type="button" class="btn-close"
        data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
    ...
</div>

</div>
`;
}

loadData(defaultData)