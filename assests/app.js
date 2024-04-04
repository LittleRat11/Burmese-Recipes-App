const gridEle = document.querySelector('.row');

let recipeId;
let list = "";
async function fetchData() {
    let result = await fetch("./BurmeseRecipes.json");
    let data = await result.json();
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
        // recipeId = data[i].Guid;
        // console.log(recipeId)
        list += `
      <div class="col-sm-3  recipe-item">
        <div class="card mb-3 border-rounded recipe-card" style="width: 100%; height:95%">
                <img class="card-img-top recipe-img" src="${data[i].image}" alt="Card image cap" style="width:100%; height:100%">
                <div class="card-body">
                    <h5 class="card-title fs-5 recipe-title">${data[i].Name}</h5>
                  <button class="btn float-end js-detail" onclick="detail(${data[i].Guid})"> More Info </button>
                </div>
        </div>
      </div>
              
        `;
    }
    gridEle.innerHTML = list;

    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const page = document.querySelector(".pageNum");
    const recipesItems = document.querySelector(".recipes").children;
    const maxItem = 8;
    let index = 1;
    let pagination = Math.ceil(recipesItems.length / maxItem);
    console.log(pagination)
    prev.addEventListener("click", () => {
        index--;
        check();
        showItems();
    })
    next.addEventListener("click", () => {
        index++;
        check();
        showItems();
    })

    function check() {
        if (index === pagination) {
            next.classList.add("disabled");

        } else {
            next.classList.remove("disabled")
        }
        if (index === 1) {
            prev.classList.add("disabled");

        } else {
            prev.classList.remove("disabled")
        }
    }



    function showItems() {
        for (let i = 0; i < recipesItems.length; i++) {

            recipesItems[i].classList.remove("show")
            recipesItems[i].classList.add("hide");
            if (i >= (index * maxItem) - maxItem && i < index * maxItem) {
                // *if i greater than equal to (index*maxItem)-maxItem
                // *means (1*6)-6=0 if index=2 then (2*6)-6=6
                recipesItems[i].classList.remove("hide");
                recipesItems[i].classList.add("show");
            }
            // } else {
            //     recipesItems[i].classList.add("hide");
            // }

            page.innerHTML = index;

        }
    }


    showItems();
    check();
}
fetchData();


const containerEle = document.querySelector(".container");


function detail(id) {
    fetch("BurmeseRecipes.json")
        .then((result) => result.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (id === data[i].Guid) {
                    containerEle.innerHTML = `
                    <div class="section-center">
                        <div class="image">
                            <img src="${data[i].image}" alt="" class="img-tabs">
                        </div>
                        <div class="tabs">
                            <div class="btn-container">
                                <button class="button live" data-id="step1">Step 1</button>
                                <button class="button" data-id="step2">Step 2</button>
                                <button class="button" data-id="step3">Step 3</button>
                            </div>
                            <div class="tabs-content">
                                <div class="content live" id="step1">
                                    <h3>Step 1</h3>
                                    <p class="recipe-name">
                                    ${data[i].Name}
                                    </p>
                                </div>
                                <div class="content" id="step2">
                                    <h3>Step 2</h3>
                                    <p class="recipe-ingredient">
                                    ${data[i].Ingredients}
                                    </p>
                                </div>
                                <div class="content" id="step3">
                                    <h3>Step 3</h3>
                                    <p class="recipe-instruction">
                                    ${data[i].CookingInstructions}
                                    </p>
                                    <a href="index.html"><button class="btn-back">Back</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    const tabs = document.querySelector(".tabs");
                    const btns = document.querySelectorAll(".button");
                    const articles = document.querySelectorAll(".content");
                    tabs.addEventListener("click", (event) => {
                        // console.log(event.target.dataset.id);
                        const id = event.target.dataset.id
                        if (id) {
                            btns.forEach((btn) => {
                                btn.classList.remove("live")
                            })
                            event.target.classList.add("live");
                            articles.forEach((article) => {
                                article.classList.remove("live");
                            });
                            const element = document.getElementById(id);
                            element.classList.add("live");
                        }
                    })
                }

            }
        })
}