const express = require(`express`)
const cors = require(`cors`)
const path = require(`path`)
const bodyParser = require(`body-parser`)
const mysql = require(`mysql2/promise`)

const app = express()
app.use(cors())
//app.use(express())
//const poexpress = 3000
app.use(bodyParser.json())

const port = 3003



app.listen(port, () => {
    console.log(`Rodando em http://localhost:${port}`)
})

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'midia_indoor',
    waitForConnections: true,
    connectionLimit: 3,
    queueLimit: 0
})

app.post('/midia', async (req, res) => {
    try {
        console.log(req.body)
        const {nome, tipo, situacao, data_inicial, data_final, end_img, tempo_exib} = req.body
        const conexao = await pool.getConnection()
        const sql = `INSERT INTO midia (nome, tipo, status, data_inicio, data_fim, url, tempo) VALUE ("${nome}", "${tipo}", "${situacao}", "${data_inicial}", "${data_final}", "${end_img}", "${tempo_exib}")`
        
        
        const [linhas] = await conexao.execute(sql)
        

        conexao.release()
        res.json(linhas)
    
    
    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: "Deu algum erro na conexão" })
    }
})

app.get('/midia', async (req, res) => {
    try {
        const conexao = await pool.getConnection()
        const sql = `SELECT * FROM midia`
        const [linhas] = await conexao.execute(sql)

        conexao.release()
        res.json(linhas)

    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: "Deu algum erro na conexão" })
    }
})
app.delete('/midia/:id', async (req, res) =>{
    try {
        const conexao = await pool.getConnection()
        const id_passado = req.params.id
        const sql = `DELETE FROM midia WHERE ID =${id_passado}`
        console.log(`DELETE FROM midia WHERE ID =${id_passado}`)
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json(linhas)

    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: "Deu algum erro na conexão" })
    }
})



app.put("/midia", async (req, res) => {
    try {
        const {nome, tipo, situacao, data_inicial, data_final, end_img, tempo_exib} = req.body
        const conexao = await pool.getConnection()
        const sql = `UPDATE midia SET nome = "${nome}", tipo = "${tipo}", situacao = "${situacao}", data_inicial = "${data_inicial}, data_final = "${data_final}, end_img = "${end_img}, tempo_exib = "${tempo_exib}"`
        const [linhas] = await conexao.execute(sql)

        conexao.release()
        res.json({msg: "Registro gravado"})

    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: "Deu algum erro na conexão" })
    }

})

app.get(`/midia/:id`, async(req, res) => {
    try {
        const conexao = await pool.getConnection()
        const sql = `SELECT * FROM midia WHERE id = ${id}`
        const [linhas] = await conexao.execute(sql)

        conexao.release()
        res.json(linhas[0])

    } catch (error) {
        console.log(`O Erro que ocorreu foi :${error}`)
        res.status(500).json({ error: "Deu algum erro na conexão" })
    }
})
app.use("/sabao", express.static(path.join(__dirname, "midias")))