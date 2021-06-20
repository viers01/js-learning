const express = require('express');
const fs = require('fs');
const myapp = express(); //настравием маршрутизацию

myapp.use(express.json()) //сообщаем прилоежнию что работаем с json
myapp.use('/', express.static('./public')); // запросы в корень нашего сайтa отдают содержимое public


//API каталога

myapp.get('/api/products', (req,res)=>{
    fs.readFile('./server/database/products.json', 'utf-8', (err,data)=>{
        if (err){
            res.send(JSON.stringify({result:0, text: err}))
        } else {
            res.send(data)
        }
    })
})

//api cart
myapp.get('/api/cart', (req, res) => {
    fs.readFile('./server/database/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send({result: 0, text: err});
        } else {
            res.send(data);
        }
    });
});


//API для добавления товара
myapp.post('/api/cart/', (req,res)=>{
    fs.readFile('./server/database/userCart.json', 'utf-8', ((err, data) =>{
        if (err){
            res.send({result: 0, text: err});
        } else {
            const cart = JSON.parse(data);
            //добавляем товар
            cart.contents.push(req.body)
            fs.writeFile('./server/database/userCart.json', JSON.stringify(cart), (err)=>{
                if (err){
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    }));
});

//API для удаления товара
myapp.delete('/api/cart/:id', (req, res) => {
    fs.readFile('./server/database/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            // парсим текущую корзину
            const cart = JSON.parse(data);
            // ищем товар по id
            const find = cart.contents.find(el => el.id_product === +req.params.id);
            // удаляем товар
            cart.contents.splice(cart.contents.indexOf(find), 1)
            // пишем обратно
            fs.writeFile('./server/database/userCart.json', JSON.stringify(cart), (err) => {
                if (err){
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    });
});

// Изменяем количество товара
myapp.put('/api/cart/:id', (req, res) => {
    fs.readFile('./server/database/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            // парсим текущую корзину
            const cart = JSON.parse(data);
            // ищем товар по id
            const find = cart.contents.find(el => el.id_product === +req.params.id);
            // изменяем количество
            find.quantity += req.body.quantity;
            // пишем обратно
            fs.writeFile('./server/database/userCart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    });
});


const port = 8888;
myapp.listen(port, () => {
    console.log(`Listening ${port} port`);
});
