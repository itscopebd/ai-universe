
const defaultData=6;
// load data from api  
const loadData=()=>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res=> res.json())
    .then(data=> showLimitedData(data))
    .catch(err=> console.log(err))
}

// show default  data in UI
const showLimitedData=(data)=>{
    // data=data.data.tools.slice(0,defaultData);

    const loadData= document.getElementById("loadCard");
    data.data.tools.forEach(element => {
        const {features,image,name,published_in,description}=element;

        // // features value iteration 
        // let count=0;
        // let featuresValue;
        // for (let value of features) {
        //     count = count++;
        //     featuresValue += value;
            
        // }
       
       const div = document.createElement("div");
       div.classList.add("col-12","col-md-6","col-lg-4");
       div.innerHTML=`
       <div class="card my-3">
         <img src="${image ? image:" No Image"}" class="card-img-top" alt="..." style="height:200px">
         <div class="card-body">
           <h5 class="card-title">Features</h5>
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
             <button class="btn btn-primary">
               <i class="fa-solid fa-arrow-right"></i>
             </button>
           </div>
         </div>
       </div>
       `;
       loadData.appendChild(div)
    });
}




loadData();