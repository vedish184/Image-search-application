const accessKey="YIkwjsJ9IFZS2c3XMpiHmAIxL_11FmyvBSCZhG4LfSs"

const formEl=document.querySelector("form") 
const inputEl=document.getElementById("search-input")
const searchResults=document.querySelector(".search-results")
const showMore=document.getElementById("show-more-button")

let inputData=""
let page=1;

async function searchImages(){
    inputData=inputEl.value;
    // here we create dynamic url/variable
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response=await fetch(url);
    //converting data into json format
    const data=await response.json();

    const results=data.results;
    if(page===1){
        searchResults.innerHTML="";
    }

    // we need to show data one by one

    results.map((result)=>{
        // here we make those new container where all data will store in the same format 
        const imageWrapper=document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image=document.createElement("img");
        image.src=result.urls.small;
        image.alt=result.alt_description;

        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });
    page++;

    if(page>1){
        showMore.style.display="block";
    }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImages();
})
showMore.addEventListener("click",()=>{
    searchImages();
})