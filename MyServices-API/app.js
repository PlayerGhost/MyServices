const express = require("express")
var firebase = require('firebase');
var bodyParser = require('body-parser');
const cors = require('cors');
const { Console } = require("console");

const app = express()

//app.use(express.json())
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())
    /*app.set('port', (process.env.PORT || 3000));
    app.use(express.static(__dirname + '/public'));
    var port = process.env.PORT || 8080;*/
app.listen(3000)

var config = {
    apiKey: "AIzaSyAA-f_IMVyfALkSKFEFwBw0wiKp3yw2g5k",
    authDomain: "my-services-4cab3.firebaseapp.com",
    databaseURL: "https://my-services-4cab3-default-rtdb.firebaseio.com",
    projectId: "my-services-4cab3",
    storageBucket: "my-services-4cab3.appspot.com",
    messagingSenderId: "618023420594",
    appId: "1:618023420594:web:7e605cca3ce048dd28bfab",
    measurementId: "G-EYMQFS8YZY"
};

firebase.initializeApp(config);

app.get('/', function(request, response) {
    response.send('Hello World!');
});

app.get("/users", (req, res) => {
    let userReference = firebase.database().ref("/users/")
    let data = []

    userReference.on("value",
        snapshot => {
            snapshot.forEach(childSnapshot => {
                let childData = childSnapshot.val()

                if (childData.habilidades == " ") {
                    childData.habilidades = []
                }

                data.push(childData)
            })

            userReference.off("value")

            return res.json(data)
        },
        function(errorObject) {
            return res.send("Error: " + errorObject.code)
        })
})

app.post("/users", (req, res) => {
    let userId = req.body.id

    let referencePath = '/users/' + userId + '/';
    let userReference = firebase.database().ref(referencePath)

    userReference.set({
        id: req.body.id,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        senha: req.body.senha,
        dia: req.body.dia,
        mes: req.body.mes,
        ano: req.body.ano,
        sexo: req.body.sexo,
        tipoConta: req.body.tipoConta,
        habilidades: req.body.habilidades,
        profilePicture: req.body.profilePicture
    }, error => {
        if (error) {
            return res.json("Erro: " + error);
        } else {
            return res.json("Operação concluida com sucesso!");
        }
    })
})

app.put("/users/:id", (req, res) => {
    let userId = req.params.id

    if (JSON.stringify(req.body.habilidades) == "[]") {
        req.body.habilidades = " "
    }

    let referencePath = '/users/' + userId + '/';
    let userReference = firebase.database().ref(referencePath)
    userReference.update({
        id: req.body.id,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        senha: req.body.senha,
        dia: req.body.dia,
        mes: req.body.mes,
        ano: req.body.ano,
        sexo: req.body.sexo,
        tipoConta: req.body.tipoConta,
        habilidades: req.body.habilidades,
        profilePicture: req.body.profilePicture
    }, error => {
        if (error) {
            return res.json("Erro: " + error);
        } else {
            return res.json("Operação concluida com sucesso!");
        }
    })
})

app.get("/publicPlaylists", (req, res) => {
    let userReference = firebase.database().ref("/publicPlaylists/")
    let data = []

    userReference.on("value",
        snapshot => {
            snapshot.forEach(childSnapshot => {
                let childData = childSnapshot.val()

                data.push(childData)
            })

            userReference.off("value")

            return res.json(data)
        },
        function(errorObject) {
            return res.send("Error: " + errorObject.code)
        })
})

app.get("/publicPlaylists/:id", (req, res) => {
    let userReference = firebase.database().ref('/publicPlaylists/' + req.params.id + '/')

    userReference.on("value",
        snapshot => {
            userReference.off("value")

            return res.json(snapshot.val())
        },
        function(errorObject) {
            return res.send("Error: " + errorObject.code)
        })
})

app.get("/musicas", (req, res) => {
    let userReference = firebase.database().ref("/musicas/")
    let data = []

    userReference.on("value",
        snapshot => {
            snapshot.forEach(childSnapshot => {
                let childData = childSnapshot.val()

                data.push(childData)
            })

            userReference.off("value")

            return res.json(data)
        },
        function(errorObject) {
            return res.send("Error: " + errorObject.code)
        })
})

app.get("/musicas/:id", (req, res) => {
    let userReference = firebase.database().ref('/musicas/' + req.params.id + '/')

    userReference.on("value",
        snapshot => {
            userReference.off("value")

            return res.json(snapshot.val())
        },
        function(errorObject) {
            return res.send("Error: " + errorObject.code)
        })
})