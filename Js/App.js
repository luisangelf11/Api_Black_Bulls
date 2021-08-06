const d = document,
      $select = d.getElementById("select-bb"),
      $profile = d.querySelector(".profile"),
      $picture = d.getElementById("member"),
      $name = d.getElementById("name"),
      blackBulls = [];

    async function getBlackBulls(){
        try{
            let res = await fetch("http://localhost:3000/Black-bulls"),
            json = await res.json();
            if(!res.ok) throw {status: res.status, statusText: res.statusText};
            json.forEach(element => {
                blackBulls.push({"id": element.id, "Value": element.name});
            });
            blackBulls.forEach(element =>{
                const $option = d.createElement("option");
                $option.value = element.id;
                $option.textContent = `${element.Value}`;
                $select.appendChild($option);
            });
            console.log(blackBulls);
        }
        catch(err){
            let message = err.statusText || "Ocurrio un error inesperado";
            let $error = d.createElement("h2");
            $error.innerHTML = `Error ${err.status}: ${message}`;
            $error.classList.add("alert");
            $profile.insertAdjacentElement("beforeend", $error);
        }
    }

    d.addEventListener("DOMContentLoaded", getBlackBulls);

    d.addEventListener("change", async (e)=>{
        if(e.target === $select){
            if(e.target.value !== "0"){
                //alert("WIII");
                try{
                    let res = await fetch(`http://localhost:3000/Black-bulls/${e.target.value}`),
                    json = await res.json();
                    if(!res.ok) throw {status: res.status, statusText: res.statusText};
                    $picture.setAttribute("src", json.photo);
                    $name.textContent = json.name;
                }
                catch(err){
                    let message = err.statusText || "Ocurrio un error inesperado";
                    let $error = d.createElement("h2");
                    $error.classList.add("alert");
                    $error.innerHTML = `Error ${err.status}: ${message}`;
                    $profile.insertAdjacentElement("beforeend", $error);
                }
            }else{
                $picture.setAttribute("src", "Img/none.png");
                $name.textContent = "Nombre del miembro";
            }
        }
    });