import http from 'k6/http';
import { check } from 'k6';
/**
 * randomItem is a utility function from k6-utils library that:
 * - Takes an array as input
 * - Returns a random element from that array
 * - Useful for creating data variety in tests without hardcoding values
 * - Helps simulate real user behavior by introducing randomness
 */
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
    let res = http.get('http://localhost:8000/public/crocodiles/');

    console.log(res.json());

    const crocodiles = res.json() as { id: number }[];
    const crocodileIds = crocodiles.map(item => item.id)
    
    /**
     * Using randomItem to select a random crocodile ID from the array
     * This simulates a user selecting a random item from a list
     * instead of always testing with the same ID
     */
    const crocodileId = randomItem(crocodileIds);

    res = http.get(`http://localhost:8000/public/crocodiles/${crocodileId}`);

    check(res, {
        'status was 200': (r) => r.status == 200,
        'crocodile has correct id': (r) => (r.json() as { id: number }).id == crocodileId
    });
}
