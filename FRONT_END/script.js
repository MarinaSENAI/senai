const cadastros = []


const btn_tela_cadastrar = document.getElementById("btn_tela_cadastrar")
const btn_tela_atualizar = document.getElementById("btn_tela_atualizar")
const btn_tela_listar = document.getElementById("btn_tela_listar")

const btn_cadastro = document.getElementById("btn_cadastro")
const btn_atualizar_dados = document.getElementById("btn_atualizar_dados")
const btn_limpar = document.getElementById("btn_limpar")





let input_nome = document.getElementById("titulo")
let input_tipo = document.getElementById("tipo")
let input_situacao = document.getElementById("situacao")
let input_data_inicial = document.getElementById("data_comeco")
let input_data_final = document.getElementById("data_termino")
let input_end_img = document.getElementById("end_img")
let input_tempo_exib = document.getElementById("tempo")



btn_cadastro.addEventListener("click", async () => {

    let dados = await fetch("http://localhost:3003/api/midia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({nome: input_nome,  
        tipo: input_tipo,status: input_situacao,
        data_inicial: input_data_inicial,data_final: input_data_final,end_img: input_end_img,
        tempo_exib: input_tempo_exib,}),
    })
    if(dados.ok) {
    btn_tela_listar.click()
}})

btn_limpar.addEventListener("click", async ()=> {
    
    input_nome.value = ""
    input_tipo.value = "Foto"
    input_situacao.value = "Ativo"
    input_data_inicial.value = ""
    input_data_final.value = ""
    input_end_img.value = ""
    input_tempo_exib.value = ""
})

btn_tela_listar.addEventListener("click", async ()=> {
    let resposta = await fetch("http://localhost:3003/midia")
    if (resposta.ok) {
        let listagem = ""
        let cadastro = await resposta.json()
        for(const f of cadastro) {
            let Status = ""
            if (f.status == "A") {
                Status = "ATIVADO"
            } else {
                Status = "DESATIVADO"               
            }
            listagem +=
                `<tr>
                            <th scope="row"></th>
                                <td>${f.nome}</td>
                                <td>${f.tempo}</td>
                                <td>${f.status}</td>
                                <td><button id="bt_edit"><i class="bi bi-pencil" onclick="edt(${f.id})"></i></button>
                                <button id="bt_edit"><i class ="bi bi-trash"onclick="excluir(${f.id})"></i></button>
                                </td>
                </tr>`
        }
        let j = document.getElementById("listar_adicionar")
        j.innerHTML = listagem;

    }
})


async function edt(id) {
    let resultado = await fetch(`htttp://localhost:3003/midia/${id}`);
    console.log(resultado)
    if (resultado.ok) {
        let dados = await resultado.json()
        btn_tela_atualizar.click()
        document.getElementById("end_img_editado").value = dados.end_img
        document.getElementById("titulo_editado").value = dados.nome
        document.getElementById("situacao_editado").value = dados.situacao
        document.getElementById("status_editado").value = dados.tipo
        document.getElementById("data_começo_editado").value = dados.data_inicial
        document.getElementById("data_final_editado").value = dados.data_final
        document.getElementById("tempo_editado").value = dados.tempo_exib
        document.getElementById("id_editado").value = dados.id

    }
}
btn_atualizar_dados.addEventListener("click", async () => {
    const end_img_atualizado = document.getElementById("end_img_editado").value
    const nome_atualizado = document.getElementById("titulo_editado").value
    const situacao_atualizado = document.getElementById("situacao_editado").value
    const status_atualizado = document.getElementById("status_editado").value
    const data_inico_atualizado = document.getElementById("data_começo_editado").value
    const data_final_atualizado = document.getElementById("data_final_editado").value
    const tempo_atualizado = document.getElementById("tempo_editado").value
    const id_atualizado = document.getElementById("id_editado").value

    let dados = await fetch(`http://localhost:3003/midia`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id_atualizado, nome: nome_atualizado, tipo: status_atualizado, status: situacao_atualizado, data_inicio: data_inico_atualizado, data_fim: data_final_atualizado, url: end_img_atualizado, tempo: tempo_atualizado }),
    });

    if (dados.ok) {
        btn_tela_listar.click()
    }
})


async function excluir(id) {
    const resultado = window.confirm("Excluir esta imagem ?");
    if (resultado) {
        let dados = await fetch(`http://localhost:3003/midia/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/jsson",
            },
        });

        if (dados.ok) {
            btn_tela_listar.click()
        }
    }
}