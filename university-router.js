import { Router } from 'express';
import { universityRepository as repository } from './university-repository.js';

export let router = Router();

router.put('/university', async (req, res) => {
    let univeristy = repository.createEntity();

    univeristy.name = req.body.name ?? null;
    univeristy.type = req.body.type ?? null;
    univeristy.city = req.body.city ?? null;
    univeristy.score = 0;

    let id = await repository.save(univeristy);
  
    res.send({ id });
});

router.get('/university/:id', async (req, res) => {
    let song = await repository.fetch(req.params.id);

    res.send(song);
});

router.post('/university/:id', async (req, res) => {
    let university = await repository.fetch(req.params.id);
  
    university.name = req.body.name;
    university.type = req.body.type ?? song.type;
    university.city = req.body.city ?? song.city;
    university.score = university.score ?? 0;
  
    let id = await repository.save(song);
  
    res.send({ id });
  });