const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_ASC_BY_COST = "Menos$";
const ORDER_DESC_BY_COST = "Mas$";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

let catID = localStorage.getItem('catID');
const cards =  document.querySelector('#cards');
const categoria = document.querySelector('#lead');
const filtroPorNombre = document.getElementById('sortByName');
const botonFiltroNombre = document.getElementById('sortByNameBtn');

  
 


                                            
                        function filtrar(nombre){
                          let filtrados = [];

                          for(let i=0;i<currentProductsArray.length; i++){
                            let valor = currentProductsArray[i].name.toLowerCase();               // Paso los nombres de los productos a minuscula
                            if(valor.includes(nombre.toLowerCase()) == true){                // Si el producto matchea con lo que me pasan por nombre (filtroPorNombre.value)
                              filtrados.push(currentProductsArray[i]);                       //        Metemos el producto dentro del array filtrados 
                            }
                          }
                          return filtrados;                                  
                        }
                           
                       
                              
                        function setCatID(id) {
                          localStorage.setItem("catID", id);
                          window.location = "products.html"
                      }
                              
                      function sortAndShowProducts(sortCriteria, productsArray){
                        currentSortCriteria = sortCriteria;
                    
                        if(productsArray != undefined){
                          currentProductsArray = productsArray;
                        }
                    
                        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
                    
                        //Muestro las categorías ordenadas
                        showProductsList(currentProductsArray);
                    }           
                              
                    document.addEventListener("DOMContentLoaded", function(e){
                      getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function(resultObj){
                          if (resultObj.status === "ok"){
                            currentProductsArray = resultObj.data.products
                              showProductsList(currentProductsArray)
                              //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
                          }
                      });
                          
                        document.getElementById("sortAsc").addEventListener("click", function(){
                          sortAndShowProducts(ORDER_ASC_BY_NAME);
                      });
                  
                      document.getElementById("sortDesc").addEventListener("click", function(){
                      
                        sortAndShowProducts(ORDER_DESC_BY_NAME);
                      });
                      document.getElementById("filtroRel").addEventListener("click", function(){
                        console.log("a");  
                        sortAndShowProducts(ORDER_BY_PROD_COUNT);

                      });
                
                      document.getElementById('filtroAsc').addEventListener('click', function(){
                         sortAndShowProducts(ORDER_ASC_BY_COST);
                      });
                      document.getElementById("filtroDesc").addEventListener('click', function(){
                         sortAndShowProducts(ORDER_DESC_BY_COST);
                      });

                      
                  
                    
                   document.getElementById("limpiarFiltro").addEventListener("click", function(){
                    document.getElementById("precioMin").value = "";
                    document.getElementById("precioMax").value = "";
                    document.getElementById("sortByName").value = "";
                    minCount = undefined;
                    maxCount = undefined;
                   
                  
                    showProductsList(currentProductsArray);
                  });
                      
                  });      
                  document.getElementById("btnFiltro").addEventListener("click", function(){
                    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
                    //de productos por categoría.
                    minCount = document.getElementById("precioMin").value;
                    maxCount = document.getElementById("precioMax").value;
            
                    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                        minCount = parseInt(minCount);
                    }
                    else{
                        minCount = undefined;
                    }
            
                    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                        maxCount = parseInt(maxCount);
                    }
                    else{
                        maxCount = undefined;
                    }
            
                    showProductsList(currentProductsArray);
                });
   
                              
                              
                  function sortProducts(criteria, array){
                    console.log(criteria);
                    let result = [];
                    if (criteria === ORDER_ASC_BY_NAME){
                          result = array.sort(function(a, b) {
                            if ( a.name < b.name ){ return -1; }
                            if ( a.name > b.name ){ return 1; }
                            return 0;
                        });
                    }else if (criteria === ORDER_DESC_BY_NAME){
                          result = array.sort(function(a, b) {
                            if ( a.name > b.name ){ return -1; }
                            if ( a.name < b.name ){ return 1; }
                            return 0;
                        });
                    }else if (criteria === ORDER_BY_PROD_COUNT){
                         
                        result = array.sort(function(a, b) {
                          let aCount = parseInt(a.soldCount);
                          let bCount = parseInt(b.soldCount);
              
                          if ( aCount > bCount ){ return -1; }
                          if ( aCount < bCount ){ return 1; }
                          return 0;
                      });
              
                    }else if(criteria === ORDER_ASC_BY_COST){
                      result = array.sort(function (a,b) {
                        let aCount = parseInt(a.cost);
                        let bCount = parseInt(b.cost);
            
                        if ( aCount < bCount ){ return -1; }
                        if ( aCount > bCount ){ return 1; }
                        return 0;
                      });
                    }else if (criteria === ORDER_DESC_BY_COST){
                        result = array.sort(function (a,b){
                          let aCount = parseInt(a.cost);
                          let bCount = parseInt(b.cost);
              
                          if ( aCount > bCount ){ return -1; }
                          if ( aCount < bCount ){ return 1; }
                          return 0;
                        });
                      }return result;
                }
                function showProductsList(productos){

                  let htmlContentToAppend = "";
                  for(let i = 0; i < productos.length; i++){
                      let category = productos[i];
              
                      if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
                          ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){
              
                          htmlContentToAppend += `<div class="card " style="width: 17rem;">
                          <img id="imagen" src="${category.image}"class="card-img-top" alt="Card image cap">
                          <div class="card-body">
                          <h5 class="card-title">${category.name} - ${category.cost}</h5>
                           <p class="card-text">${category.description}</p>
                          <p class="card-text"><small>${category.soldCount} vendidos</small></p>
                          </div></div>`
                      }
              
                      cards.innerHTML = htmlContentToAppend;
                  }
              }     
                    
                              
       
      
              fetch(PRODUCTS_URL + catID + EXT_TYPE)


    .then((resp) => resp.json())
    .then((data) => {
    
      let productos = data.products;
        let i = 0;
     
        for(let product of productos){
            i++;
             cards.innerHTML +=`<div class="card " style="width: 17rem;">
               <img id="imagen" src="${product.image}"class="card-img-top" alt="Card image cap">
               <div class="card-body">
               <h5 class="card-title">${product.name} - ${product.cost}</h5>
                <p class="card-text">${product.description}</p>
               <p class="card-text"><small>${product.soldCount} unidades disponibles</small></p>
               </div></div>`
          }
  
        categoria.innerHTML = `<p class"categoriaLead">Verás aquí todos los productos de la categoría <strong>${data.catName}</strong></p>`
    
     
        botonFiltroNombre.addEventListener('click', function(){
          showProductsList(filtrar(filtroPorNombre.value));
        
          
        })

  
    });             //FETCH END
                              
                              
                              
                              
       
                                // MOSTRAR PERFIL // BOTON INICIO DE
                                sesionOn();
                                function showUser(){
                                document.getElementById('showUser').innerHTML = `<div class="dropdown"><a class="nav-link usuario">${localStorage.getItem('user') || sessionStorage.getItem('user')}</a>
                                                                                 <div class="dropdown-content">
                                                                                <a class="nav-link" onclick="cerrarSesion()">Cerrar Sesion</a>
                                                                                 </div>
                                                                                 </div> `;
                                                                                }
                                function sesionOn(){
                                  if(localStorage.getItem('user') || sessionStorage.getItem('user'))
                                      showUser();
                                  else{
                                      document.getElementById('showUser').innerHTML = 
                                      `<button type="button" class="button-15" id="indexBtn" role="button">Iniciar Sesion</button>`
                                      document.querySelector('#indexBtn').addEventListener('click', function(){
                                          window.location.href = './login.html';
                                      })
                              }}
                              function cerrarSesion(){
                                localStorage.setItem('user', "") || sessionStorage.setItem('user', "");
                                location.reload();
                              };                          
                              
    