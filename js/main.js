
const defaultData=6;
// load api data 
const loadData=(defaultData)=>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res=> res.json())
    .then(data=> showLimitedData(data,defaultData))
    .catch(err=> console.log(err))
}


loadData(defaultData);