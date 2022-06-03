export const login = (user) => {
return fetch(`http://localhost:4000/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
})
    .then((resp) => resp.json())
    .then((data) => {
    return data;
    })
    .catch((error) => {
    console.log(error);
    });
};