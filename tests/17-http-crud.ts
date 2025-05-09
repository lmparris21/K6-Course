/*
Prerequisites:
1. Docker Desktop must be installed on your system
2. Open terminal and navigate to the test-api-docker-image folder
3. Start the test API by running: docker-compose up -d
   The API will be available at http://localhost:8000/
4. To stop the API when done, run: docker compose down

This test demonstrates a complete CRUD (Create, Read, Update, Patch, Delete) workflow using HTTP requests:
1. Register a new user
2. Authenticate and get an access token
3. Create a new crocodile
4. Read the crocodile data
5. Update the crocodile with PUT
6. Partially update the crocodile with PATCH
7. Delete the crocodile
8. Verify deletion with a 404 status

The test uses authentication tokens and properly formats JSON requests with appropriate headers.
*/
import http from 'k6/http';
import { check } from 'k6';

/* The default function is the entry point for the k6 test. */
export default function () {

    /* Create unique credentials for this test run */
    const credentials = {
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now()
    };

    /* Set common headers for JSON requests */
    const headers = {   
        'Content-Type': 'application/json'
    };
    
    /* STEP 1: Register a new user */
    let res = http.post('http://localhost:8000/user/register/', 
        JSON.stringify(credentials), 
        { headers }
    );
    console.log(res.json());

    check(res, { 'status was 201': (r) => r.status == 201 });

    /* STEP 2: Authenticate and get access token */
    res = http.post('http://localhost:8000/auth/token/login/', 
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        { headers }
    );
    
    /* Parse response to get access token */
    const responseBody = res.json() as { access: string; refresh: string };

    console.log('Access Token:', responseBody.access);

    check(res, { 'status was 200': (r) => r.status == 200 });

    /* STEP 3: Create a new crocodile with unique name */
    const crocodile = {
        name: 'Croc_' + Date.now(),
        sex: 'M',
        date_of_birth: '2004-01-01'
    };

    res = http.post('http://localhost:8000/my/crocodiles/', 
        JSON.stringify(crocodile),
        { headers: {
            Authorization: `Bearer ${responseBody.access}`,
            ...headers
        }
    });
    console.log(res.json());
    
    check(res, { 'status was 201': (r) => r.status == 201 });

    /* Get the ID of the newly created crocodile */
    const newCrocodile = res.json() as { id: number };
    const crocodileId = newCrocodile.id;

    /* STEP 4: Get the crocodile by ID to verify creation */
    res = http.get(`http://localhost:8000/my/crocodiles/${crocodileId}/`, {
        headers: {
            Authorization: `Bearer ${responseBody.access}`
        }
    });
    console.log(res.json());
    
    check(res, 
        { 'status was 200': (r) => r.status == 200,
          'crocodile name is correct': (r) => {
            const json = r.json() as { name: string };
            return json && json.name === crocodile.name;  
          }
    });

    /* STEP 5: Update the crocodile using PUT */
    const updatedCrocodile = {
        name: 'Updated Croc_' + Date.now(),
        sex: 'M',
        date_of_birth: '2004-01-01'
    };

    res = http.put(`http://localhost:8000/my/crocodiles/${crocodileId}/`, 
        JSON.stringify(updatedCrocodile),
        { headers: {
            Authorization: `Bearer ${responseBody.access}`,
            ...headers
        }
    });
    console.log(res.json());

    check(res, 
        { 'status was 200': (r) => r.status == 200,
          'updated crocodile name is correct': (r) => {
            const json = r.json() as { name: string };
            return json && json.name === updatedCrocodile.name;
        }
    }); 
    
    /* STEP 6: Partially update the crocodile using PATCH */
    const patchedCrocodile = {
        name: 'Patched Croc_' + Date.now()
    };

    res = http.patch(`http://localhost:8000/my/crocodiles/${crocodileId}/`, 
        JSON.stringify(patchedCrocodile),
        { headers: {
            Authorization: `Bearer ${responseBody.access}`,
            ...headers  
        }
    });
    console.log(res.json());

    check(res, 
        { 'status was 200': (r) => r.status == 200,
          'patched crocodile name is correct': (r) => {
            const json = r.json() as { name: string };
            return json && json.name === patchedCrocodile.name;
        }
    });

    /* STEP 7: Delete the crocodile */
    res = http.del(`http://localhost:8000/my/crocodiles/${crocodileId}/`, null,
        {
            headers: {
                Authorization: `Bearer ${responseBody.access}`
            }
        }
    );
    
    check(res, { 'status was 204': (r) => r.status == 204 });

    /* STEP 8: Verify the crocodile was deleted by checking for 404 response */
    res = http.get(`http://localhost:8000/my/crocodiles/${crocodileId}/`, {
        headers: {
            Authorization: `Bearer ${responseBody.access}`
        }
    });

    check(res, { 'status was 404': (r) => r.status == 404 });

}

/*
---
To run this test with HTTP debugging enabled:

1. Show full HTTP debug output (headers, bodies, etc):
   k6 run --http-debug="full" 17-http-post.ts

2. Show basic HTTP debug output (headers only):
   k6 run --http-debug 17-http-post.ts

This test demonstrates a complete REST API workflow with authentication.
*/