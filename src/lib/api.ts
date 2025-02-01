export async function fetchUsers() {
    const response = await fetch("http://localhost:3000/Users");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
}

export async function updateUser(id: string, name: string) {
    const response = await fetch("/Users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name })
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
}

export async function deleteUser(id: string) {
    const response = await fetch(`/Users?id=${id}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
}
