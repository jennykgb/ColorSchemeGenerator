let colorArray = []

document.getElementById("getColor").addEventListener("click", function(){
    let seedColor = document.getElementById("seed-color").value.slice(1)
    let mode = document.getElementById("modes").value
    console.log(seedColor, mode)

    scheme(seedColor, mode)
   
})


const scheme = (seedColor, mode) =>{
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}`)
    .then(response => response.json())
    .then(data => {
        let colorArray = []
        for (color in data.colors){
            colorArray.push(data.colors[color].hex.value)
        }
        colorrender(colorArray)
    })
}

const initialRender = () => {
    let initialSeed = Math.floor(Math.random()*16777215).toString(16)
    let randmodes = ["monochrome", "monochrome-light", "monochrome-dark", "analogic", "complement", "analogic-complement", "triad", "quad"]
    let initialMode = randmodes[Math.floor(Math.random() * randmodes.length)]
    scheme(initialSeed, initialMode)
}


let colorrender = colorArr  => {
    let colorHtml = ``
    
    for( i in colorArr){
        colorHtml += `
        <div class="colorCard">
            <div data-value="${colorArr[i]}" id="colorSwatch${i}" class="colorSwatch"></div>
            <h1 data-value="${colorArr[i]}">${colorArr[i]}</h1>
        </div>`
        
    }
    document.getElementById("colors").innerHTML = colorHtml
    for(i in colorArr){
        document.getElementById(`colorSwatch${i}`).style.background = colorArr[i]
    }
}

document.getElementById("colors").addEventListener("click",function(e){
    let copyText = e.target.getAttribute("data-value")
    navigator.clipboard.writeText(copyText)
    document.getElementById("copy").style.display = "block"

    setTimeout(function(){
        document.getElementById("copy").style.display = "none"
    },2000)
})

initialRender()
