async function img() {
    resp = await fetch(`http://localhost:3003/midia`)
    if (resp.ok){
        let dados = await resp.json()
        let html = ""
        for (let index = 0; index < dados.length; index++) {
            const ver = dados[index];
            html += `<div class = "carousel-item"`
            
        }
    }
}
async function editar() {
    resposta = await fetch(`http://localhost:3003/midia`);
    if (resposta.ok) {
        let dados = await resposta.json()
        console.log(dados)
 
        let html = ""
 
        for (let i = 0; i < dados.length; i++) {
            const dado = dados[i]
 
            let temp = dado.tempo
            tempo_rotacao = temp * 1000
            if (dado.status == "a" || dado.status == "2") {
                if (i <= 0) {
                    html +=
                        `<div class="carousel-item active" data-bs-interval="${tempo_rotacao}">
                    <img src ="${dado.url}" max width="100%" height: auto; class="d-block w-100">
                </div>`
                } else {
                    html +=
                        `<div class="carousel-item" data-bs-interval="${tempo_rotacao}">
                    <img src ="${dado.url}" max width="100%" height: auto; class="d-block w-100">
                </div>`
                }
            } else {
                console.log("Inativo")
            }
        }
        document.getElementById("id").innerHTML += html
    }
}