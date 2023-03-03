
const defaultData=6;
// load data from api  
const loadData=(defaultData)=>{

    // loading spinner start 
    loadingSpinner(true);
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res=> res.json())
    .then(data=> showLimitedData(data,defaultData))
    .catch(err=> console.log(err))
}

// show default  data in UI
const showLimitedData=(data,defaultData)=>{
    data=data.data.tools;
    // Data slice and data length less than six or gather than six, show or hide see more button 
    const seeMoreBtn=document.getElementById("see__more_btn");
    if (defaultData && data.length > 6) {
        data=data.slice(0,defaultData);
        seeMoreBtn.classList.remove("d-none")
    }else{
      seeMoreBtn.classList.add("d-none")
    }
console.log(data)
    const loadData= document.getElementById("loadCard");
    loadData.innerHTML="";
    data.forEach(element => {
        const {features,image,name,published_in}=element;

        // features value iteration 
      const featureData=features.map(data=> `<li>  ${data} </li>`);

       const div = document.createElement("div");
       div.classList.add("col-12","col-md-6","col-lg-4");
       div.innerHTML=`
       <div class="card my-3">
         <img src="${image ? image:" No Image"}" class="card-img-top" alt="..." style="height:200px">
         <div class="card-body">
           <h5 class="card-title">Features</h5>
           <ol>${featureData.join(" ")}</ol>
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

 console.log(url)

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
// destructuring 
const {image_link,description,features,integrations,pricing,accuracy,input_output_examples}=data.data;


// input_output_examples check and create message 
const exmapleMessage=[];
if(input_output_examples===null){
  const message=`
        <h5>Can you give any example?</h5>
       <p>No! Not Yet! Take a break!!!</p>
  `;
exmapleMessage.push(message)
}
else{
  const message=`
  <h5>Hi, how are you doing today?</h5>
 <p>I'm doing well, thank you for asking. How can I assist you today?</p>
`;
exmapleMessage.push(message) 
}
console.log(pricing)
// pricing data iteration 
pricingData=[];
if (pricing !== null ) {
  for (const key in pricing) {
    // if (pricing[key].price==='0') {
      
      
    // }
    const card= `<div class="bg-white p-3 rounded">
    <p class="text-success">${pricing[key].price==='0' ||pricing[key].price==='No cost' ? "Free Of Cost":pricing[key].price } <br>${pricing[key].plan} </p>
  
  </div>`;
  pricingData.push(card);
    
  }
}
 console.log(pricingData)

// features data iteration 
featureData=[];
for (const key in features) {
  const li= `<li>${features[key].feature_name}</li>`;
  featureData.push(li);
  
}

console.log(input_output_examples)
// integrations data iteration 
let integrationsData;
if (integrations !== null) {
  integrationsData=integrations.map(value=>{
    return `<li>${value}</li>`
    })
}

load_modal.innerHTML="";
load_modal.innerHTML=`

<div class="modal-content">
<div class="d-flex justify-content-end">
    <button type="button" class="btn-close"
        data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
    <div class="row gap-2 justify-content-center">
    <div class="col-11 col-lg-6 py-3 order-1 order-md-1 order-lg-0 border border-1 border-danger custom__bg">
    
    <div class="card-title">
    <b>${description}</b>
    </div>

    <div class="d-flex justify-content-between gap-2 text-center flex-wrap ">
    ${ pricing === null ? "<p class='nullpricing'>Free of Cost</p>" : pricingData.join(" ")}
</div>


  <div class="d-flex justify-content-between">
            <div>
                <h4>Feature</h4>
                <ul>${featureData.join(" ")}</ul>
            </div>
            <div>
             <h4>Integrations</h4>
             <ul>${integrations === null ? "No Data Found":integrationsData.join(" ")}</ul>
            </div>
        </div>

    </div>
    <div class="col-11 col-lg-5 py-3 order-0 order-lg-1 order-md-0 border border-1 border-danger position-relative">
    <img src="${image_link[0]}" style="width:100%">
    <span class="badge ${accuracy.score === null ? "d-none":"d-block"}"  id="badge">
    ${accuracy.score * 100}% Accuracy
       </span>

<div class=" text-center mt-5">
${exmapleMessage}

</div>



    </div>

    </div>
</div>

</div>
`;
}


const sortDataLoad=()=>{
  loadingSpinner(true)
  fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then(res=> res.json())
  .then(data=> sortByDate(data))
  .catch(err=> console.log(err))
}

const sortByDate=(data)=>{
data.data.tools.sort((x, y) => {
  x = new Date(x.published_in),
   y = new Date(y.published_in);
 return x - y;
});

const seeMoreBtn=document.getElementById("see__more_btn");
if (seeMoreBtn.classList[1]==="d-none") {
  showLimitedData(data)
}
else{
  showLimitedData(data,defaultData)
}


}


loadData(defaultData)