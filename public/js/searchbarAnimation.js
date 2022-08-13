const icon = document.querySelector('.search-icon');
const searchoverlay = document.querySelector('.overlay-search');
const searchBar = document.querySelector('.form-control');
const searchBox = document.querySelector('.search-box');
const closeBtn = document.querySelector('.close-search');

icon.addEventListener('click', () => {
    searchoverlay.classList.toggle('active');
    document.body.classList.toggle('stop-scrolling');
    icon.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
    searchoverlay.classList.toggle('active');
    document.body.classList.toggle('stop-scrolling');
});


searchBar.onkeyup = async(e) => {
    let inputValue = e.target.value;

    if (inputValue.length >= 3) {
        console.log(inputValue);
        response = await fetch('/search', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: inputValue
            }),
        });
        response = await response.json();
        searchBox.innerHTML = "";
        response.forEach((wine) => {
            let s = `<a href='/wine/${wine.nombre_vino}' class="wine-search">
                <div class="search-img-container">
                <img src="/img/product/vinos/${wine.url_imagen}" class="search-img" alt="">
                </div>
                <div class="wine-search-info">
                    <h3 class= "search-name">${wine.nombre_vino}</h3>
                    <h4 class= "search-winery">${wine.nombre_bodega}</h4>
                </div>
                <div class="wine-search-info hide-small">
                    <h3 class= "search-name">${wine.tipo}</h3>
                    <h4 class= "search-winery"></h4>
                </div>
            </a>`
            searchBox.innerHTML += s;
        })


    } else {

        searchBox.innerHTML = ''

    }


}