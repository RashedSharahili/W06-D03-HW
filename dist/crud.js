"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let resData = [];
let users = [
    { "id": 1, "first_name": "rashed", "last_name": "sharahili" },
    { "id": 2, "first_name": "ahmed", "last_name": "alahmed" }
];
app.get('/', (req, res) => {
    // axios.get("https://63e226a5ad0093bf29c8eb0d.mockapi.io/lab").then(res => {
    //     resData.push(res.data)
    // })
    fetch('https://63e226a5ad0093bf29c8eb0d.mockapi.io/lab')
        .then((response) => response.json())
        .then((data) => resData.push(data));
    res.status(200).json(resData);
});
const Auth = (req, res, next) => {
    let token = "GFHGYJFDGH";
    if (req.query.token == token) {
        next();
    }
    else {
        res.status(403).json({ "message": "Invalid token, your are not authorized!" });
    }
};
app.get('/users', Auth, (req, res) => {
    res.status(200).json(users);
});
app.get('/user/:id', (req, res) => {
    let get_user = users.findIndex((obj => obj.id == parseInt(req.params.id)));
    res.status(200).json(users[get_user]);
});
app.post('/user', (req, res) => {
    let user = {
        "id": users[users.length - 1].id + 1,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };
    users.push(user);
    res.status(200).json(users);
});
app.put('/user/:id', (req, res) => {
    let update_user = users.findIndex((obj => obj.id == parseInt(req.params.id)));
    // console.log(users[update_user]);
    if (users[update_user] == undefined) {
        res.status(404).json({ "message": "This id is not found" });
    }
    else {
        users[update_user].first_name = req.body.first_name;
        users[update_user].last_name = req.body.last_name;
        res.status(200).json(users);
    }
});
app.delete('/user/:id', (req, res) => {
    let delete_user = users.findIndex((obj => obj.id == parseInt(req.params.id)));
    console.log(delete_user);
    if (users[delete_user] == undefined) {
        res.status(404).json({ "message": "This id is not found" });
    }
    else {
        users.splice(delete_user, 1);
        res.status(200).json(users);
    }
});
app.listen(3002, () => { console.log("express Started!"); });
