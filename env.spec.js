require("dotenv").config({
    path: "./.env.userCreds"
});

let user = process.env.username;
let pass = process.env.password;

console.log(user);
console.log(pass);