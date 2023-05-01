import redis from 'redis';
import express, { json } from 'express';


let app = express();
app.use(json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Origib, Accept, Content-Type');
    next();
})

async function uniInit() {
    try {
        const client = redis.createClient({url: 'redis://91.228.198.165:6379'});
        await client.connect();

        const uczelnie = [
            {
                "name": "Politechnika Poznanska",
                "type": "uczelnia",
                "miasto": "Poznań"
            },
            {
                "name": "UAM",
                "type": "uczelnia",
                "miasto": "Poznań"
            },
            {
                "name": "CDV",
                "type": "uczelnia",
                "miasto": "Poznań"
            },
            {
                "name": "Politechnika Gdańska",
                "type": "uczelnia",
                "miasto": "Gdansk"
            }
        ]

        uczelnie.forEach(function(uczelnia) {
            client.HSETNX(uczelnia.name, "name", uczelnia.name);
            client.HSETNX(uczelnia.name, "type", uczelnia.type);
            client.HSETNX(uczelnia.name, "city", uczelnia.miasto);
            client.HINCRBY(uczelnia.name, "score", 0);
        });

        client.save();

        await client.quit();
    } catch (e) {
        console.error(e);
    }    
}
uniInit();

app.put('/university/:name', async function(req, res) {
    const client = redis.createClient({url: 'redis://91.228.198.165:6379'});
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();

    let city = null;
    let type = null;
    const uczelnia = req.params.name;

    if(req.body.city) {
        city = req.body.city;
        client.hSet(uczelnia, 'city', city);
    }
    if(req.body.type) {
        type = req.body.type;
        client.hSet(uczelnia, 'type', type);
    }

    client.save();
    await client.quit();
    res.send('OK');
});

app.put('/university/:name/score', async function(req, res) {
    const client = redis.createClient({url: 'redis://91.228.198.165:6379'});
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    const uczelnia = req.params.name;
    client.hIncrBy(uczelnia, 'score', 1);
    client.save();
    await client.quit();
    res.send('OK');
});

app.listen(8080);
