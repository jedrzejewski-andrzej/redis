import { Entity, Schema, Client } from 'redis-om';

class University extends Entity {}

let schema = new Schema(University, {
    name: { type: 'string' },
    type: { type: 'string' },
    city: { type: 'string' },
    score: { type: 'number' },
})

const client = await new Client().open('redis://91.228.198.165:6379');

export const universityRepository = client.fetchRepository(schema);
await universityRepository.createIndex();