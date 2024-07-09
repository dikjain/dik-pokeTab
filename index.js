let max_pokemon = 649;
let bbody = document.querySelector("#body")
let url = `https://pokeapi.co/api/v2/pokemon`
let limiturl = url + `?limit=${max_pokemon}`;
let sbtn = document.querySelector("#srchbtn")
let txts = document.querySelector(".txtsrch")
let cont = document.querySelector("#cont")
let bbtn = document.querySelector("#dtbtn")
let detpg = document.querySelector("#detpg")
let taip = document.querySelector("#type")
let typ2 = document.querySelector("#type2")
let w8 = document.querySelector("#w8")
let h8 = document.querySelector("#h8")
let mv = document.querySelector("#mv")
let frwd = document.querySelector("#frwd")
let bckrd = document.querySelector("#bckwrd")
let prg = document.querySelectorAll("#prog")
let stt = document.querySelectorAll(".stattit")
let stt1 = document.querySelector(".stt1")
let stt2 = document.querySelector(".stt2")
let stt3 = document.querySelector(".stt3")
let progbs1 = document.querySelector(".progbs1")
let progbs2 = document.querySelector(".progbs2")
let progbs3 = document.querySelector(".progbs3")


const typecol = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#539AE2',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040Af',
    ground: '#964B00',
    flying: '#A890Ff',
    psychic:'#F85888', 
    bug:'#A8B820', 
    rock:'#B8A038', 
    ghost:'#705898', 
    dragon:'#7038F8',  
    dark:'#705848',  
    steel:'#C0C0C0' ,  
    fairy:'#EE99AC'
  };

bbtn.addEventListener("click",()=>{
    detpg.style.display = "none";
    document.querySelectorAll(".nd").forEach((o)=>{o.style.display = "flex"})
})

let pokelist
fetch(limiturl).then((Response)=>Response.json()).then((data)=>generate(data))
id = 1;

let generate = (data)=>{
    pokelist = data.results
    pokelist.forEach(e => {
        createbox(e)
        new_url = url+"/"+id
        return pokelist

    });
}

let createbox=(e)=>{
    let new_div = document.createElement("div");
    let title = document.createElement("h1");
    let rank = document.createElement("h1");
    let imgg = document.createElement("img");
    imgg.setAttribute("src",`https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/${id}.svg`)
    new_div.setAttribute("id",`${id}`)
    new_div.setAttribute("value",`${id}`)
    new_div.setAttribute("class","dispbox")
    rank.setAttribute("class","rank")
    title.setAttribute("class","namepk")
    imgg.setAttribute("class","photos")
    title.textContent=`${e.name}`
    rank.textContent=`#${id}`
    bbody.appendChild(new_div);
    new_div.appendChild(imgg);
    new_div.appendChild(title);
    new_div.appendChild(rank);
    id++
}
let a=0
let c=0
sbtn.addEventListener("click",()=>{
    if (a==0){
        txts.style.transform = "translateX(-80px)"
        txts.style.display = "flex"
        setTimeout(()=>{
            txts.style.opacity = "1"
        },100);
        txts.addEventListener("keyup",()=>{
        
            let allbox = document.querySelectorAll(".namepk")
            let search = txts.value.toLowerCase()
            if(search ===""){
            allbox.forEach((i)=>{
                    i.parentNode.style.display = "flex"
            })
        }
            allbox.forEach((i)=>{
                if(!i.textContent.toLowerCase().startsWith(search)){
                    i.parentNode.style.display = "none"
                }else{
                    i.parentNode.style.display = "flex"
                }
            })

        })
        
        a=1
    }else{
        let allbox = document.querySelectorAll(".namepk")
        setTimeout(()=>{
            txts.style.display = "none"
            txts.style.transform = "translateX(400px)"
        },130);
        txts.style.opacity = "0";
        a=0;
        allbox.forEach((i)=>{
            i.parentNode.style.display = "flex"
        })
    }
})

setTimeout(() => {
    
    let bx = document.querySelectorAll(".dispbox");
    bx.forEach((b)=>{
        b.addEventListener("click",()=>{
            a=b.id
            c= b
            dispchange(a,c);
            detailspage(a);
        })
    })
},1000); // Adjust the delay as needed to ensure the boxes are created before logging


frwd.addEventListener("click",()=>{
    if(a<max_pokemon){
        dispchange(a = Number(a)+1,c)
        detailspage(a)
    }
})
bckrd.addEventListener("click",()=>{
    if(a>1){
        dispchange(a = Number(a)-1,c)
        detailspage(a)
    }
})


function dispchange(a,c){
    detpg.style.display = "flex";
    let srn = document.querySelector("#dtcode")
    let dtname = document.querySelector("#dtname")
    document.querySelectorAll(".nd").forEach((o)=>{o.style.display = "none"})
    let dm = document.querySelector("#detsimg");
    dm.setAttribute("src",`https://raw.githubusercontent.com/jnovack/pokemon-svg/3c3ea26da58331d7202e7cdb1aab9b8347d8587f/svg/${a}.svg`)
    det_url = `https://pokeapi.co/api/v2/pokemon/${a}`;
    srn.textContent = `#${a}`
    let dtsnam = c.parentElement.children[a-1].childNodes[1].textContent;
    dtname.textContent = `${dtsnam}`;
}

function detailspage(a){
    let dtname = document.querySelector("#dtname")
    data_url = `https://pokeapi.co/api/v2/pokemon/${a}`
    fetch(data_url).then((Response)=>Response.json()).then((dat)=>{
        console.log(dat)
        const themcol = typecol[dat.types[0].type.name]
        detpg.style.backgroundColor = themcol
        taip.style.backgroundColor = themcol
        prg.forEach((pg)=>{pg.style.backgroundColor = themcol})
        stt.forEach((st)=>{st.style.color = themcol})
        taip.textContent = dat.types[0].type.name
        if(!dat.types[1]){
            typ2.style.display="none"
            taip.style.transform = "translateX(0px)"
        }else{
            taip.style.transform = "translateX(-40px)"
            let themecol2 = typecol[dat.types[1].type.name]
            typ2.style.display="block"
            typ2.style.backgroundColor = themecol2;
            typ2.textContent = dat.types[1].type.name;
        }
        w8.innerHTML = `${dat.weight} Kg <h1 class=" opacity-60 font-medium relative spec3">weight</h1>`
        mv.innerHTML = `<h1>${dat.moves[0].move.name}</h1><h1>${dat.moves[1].move.name}</h1><h1>${dat.moves[2].move.name}</h1><h1 class=" opacity-60 font-medium relative spec3">Moves</h1>`
        h8.innerHTML = `${dat.height} m <h1 class=" opacity-60 font-medium relative spec3">height</h1>`
        stt1.textContent = dat.stats[0].base_stat
        stt2.textContent = dat.stats[1].base_stat
        stt3.textContent = dat.stats[2].base_stat
        progbs1.style.width = `${dat.stats[0].base_stat}%`
        progbs2.style.width = `${dat.stats[1].base_stat}%`
        progbs3.style.width = `${dat.stats[2].base_stat}%`
        dtname.addEventListener("mouseenter",()=>{
            dtname.style.color = themcol
            dtname.setAttribute("class","txtch text-white font-extrabold text-3xl")
        }) 
        dtname.addEventListener("mouseleave",()=>{
            dtname.style.color = "white"
            dtname.setAttribute("class","text-white font-extrabold text-3xl")
        }) 
        
    })
}