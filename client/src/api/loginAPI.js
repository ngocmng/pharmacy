import axios from 'axios'

async function loginApi (username, password) {
    const response = await fetch('http://localhost:3000/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password }),
          });
        //console.log("response header: "+ response.headers.get("content-type"));
        const data = await response.json();
    return data;
}

export default loginApi;