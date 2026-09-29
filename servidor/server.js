const express = require("express");
const pedidos = require("../dados.json");

const mostrarPedido = (req, res) => {
    res.send(pedidos)
}
const mostrarId = (req, res) => {
    const id = req.params.id

    pedidos.forEach((item) => {
        if (item.id == id){
            res.send(item)
        }
    });
    res.status(404).send("item não existe")
}
const novoPedido = (req, res) => {
    if (req.body) {
        res.send("Pedido recebido");
        pedidos.push(req.body)
    } else {
        res.send("Erro ao receber pedido")
    }
}

const excluirPedido = (req, res) => {
    const id = req.params.id;

    pedidos.forEach((pedido, indice) => {
        if(pedido.id == id){
            pedidos.splice(indice, 1);
        }
    });

    
    res.send("Pedido Excluido com sucesso!")
};

const alterarPedido = (req, res) => {
    const id = req.params.id;
    const dados = req.body;

    pedidos.forEach((pedido) => {
        if(pedido.id == id) {
            pedido.id = dados.id;
            pedido.item = dados.item;
            pedido.local = dados.local;
            pedido.valor = dados.valor
        }
    });
    res.send("Pedido atulizado com sucesso");
};

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const porta = 3000;

//ROTAS
app.get("/", mostrarPedido);
app.get("/:id", mostrarId);
app.post("/", novoPedido);
app.delete("/:id", excluirPedido);
app.put("/:id", alterarPedido);

app.listen(porta, () => {
    console.log(`Servidor: http://localhost:${porta}`);
});