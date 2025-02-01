<script lang="ts">
    import { onMount } from "svelte";
    import { fetchUsers } from "$lib/api";

    interface User {
        id: string;
        name: string;
    }

    let allUsers: User[] = [];
    let filteredUsers: User[] = [];
    let paginatedUsers: User[] = [];

    let searchId = "";
    let searchName = "";
    let sortOrder = "asc";

    let currentPage = 1;
    const pageSize = 10;

    async function loadUsers() {
        try {
            allUsers = await fetchUsers();
            filterUsers();
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    function filterUsers() {
        filteredUsers = allUsers
            .filter(user => 
                (searchId === "" || user.id.includes(searchId)) &&
                (searchName === "" || user.name.toLowerCase().includes(searchName.toLowerCase()))
            )
            .sort((a, b) => {
                return sortOrder === "asc" 
                    ? a.id.localeCompare(b.id, undefined, { numeric: true })
                    : b.id.localeCompare(a.id, undefined, { numeric: true });
            });

        currentPage = 1;
        updatePagination();
    }

    function updatePagination() {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    }

    function nextPage() {
        if (currentPage * pageSize < filteredUsers.length) {
            currentPage++;
            updatePagination();
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    }

    onMount(loadUsers);
</script>

<h1>ユーザー一覧</h1>

<input type="text" bind:value={searchId} placeholder="ID検索">
<input type="text" bind:value={searchName} placeholder="名前検索">

<select bind:value={sortOrder}>
    <option value="asc">ID 昇順</option>
    <option value="desc">ID 降順</option>
</select>

<button on:click={filterUsers}>検索</button>

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>名前</th>
        </tr>
    </thead>
    <tbody>
        {#each paginatedUsers as user}
            <tr>
                <td>{user.id}</td>
                <td><a href={`/user/${user.id}`}>{user.name}</a></td>
            </tr>
        {/each}
    </tbody>
</table>

<div>
    <button on:click={prevPage} disabled={currentPage === 1}>前へ</button>
    <span>ページ {currentPage} / {Math.ceil(filteredUsers.length / pageSize)}</span>
    <button on:click={nextPage} disabled={currentPage * pageSize >= filteredUsers.length}>次へ</button>
</div>
