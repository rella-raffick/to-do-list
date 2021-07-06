const express = require("express");
const bodyParser = require("body-parser");

const application = express();

application.set('view engine', 'ejs');

application.use(bodyParser.urlencoded({extended:true}));

application.use(express.static("public"));

let items = [];

application.get("/",function(_request,_response){
    let date = new Date();
    let content ={
        weekday : "long",
        day : "numeric",
        month : "long",
        year : "numeric"
    };

    let day = date.toLocaleDateString('en-US',content);

    _response.render("index", { result: day, newListItems: items });
});

application.post("/", function (_request, _response){
    let item = _request.body.newItem;
    items.push(item);
    _response.redirect("/");
});

application.listen(process.env.PORT || 3000);
