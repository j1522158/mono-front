let users = [
    { id: "1", name: "Sample" }
];

export async function GET({ url }) {
    const userId = url.searchParams.get("userId");
    const userName = url.searchParams.get("userName");

    let filteredUsers = users;
    if (userId) filteredUsers = filteredUsers.filter(u => u.id.includes(userId));
    if (userName) filteredUsers = filteredUsers.filter(u => u.name.includes(userName));

    return new Response(JSON.stringify(filteredUsers), {
        headers: { "Content-Type": "application/json" }
    });
}

export async function PUT({ request }) {
    const { id, name } = await request.json();
    users = users.map(u => (u.id === id ? { ...u, name } : u));
    return new Response(JSON.stringify({ message: "更新完了" }), {
        headers: { "Content-Type": "application/json" }
    });
}

export async function DELETE({ url }) {
    const id = url.searchParams.get("id");
    users = users.filter(u => u.id !== id);
    return new Response(JSON.stringify({ message: "削除完了" }), {
        headers: { "Content-Type": "application/json" }
    });
}
