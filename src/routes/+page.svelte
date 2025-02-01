<script lang="ts">
    import { onMount } from "svelte";
    import { fetchUsers } from "$lib/api";

    interface User {
        id: string;
        name: string;
    }

    let allUsers: User[] = []; // APIから取得した全ユーザー
    let filteredUsers: User[] = []; // 絞り込み後の表示用データ
    let paginatedUsers: User[] = []; // 現在のページに表示するデータ

    let searchId = "";
    let searchName = "";
    let sortOrder = "asc"; // ソート順 ("asc" = 昇順, "desc" = 降順)

    let currentPage = 1;
    const pageSize = 10; // 1ページあたりの件数

    async function loadUsers() {
        try {
            allUsers = await fetchUsers(); // API から全ユーザーを取得
            filterUsers(); // 初期表示時に検索・ソート・ページネーション適用
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

        currentPage = 1; // 検索時にページをリセット
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

<!-- 検索入力欄 -->
<input type="text" bind:value={searchId} placeholder="ID検索">
<input type="text" bind:value={searchName} placeholder="名前検索">

<!-- ソート選択 -->
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
                <td>{user.name}</td>
            </tr>
        {/each}
    </tbody>
</table>

<!-- ページネーション -->
<div>
    <button on:click={prevPage} disabled={currentPage === 1}>前へ</button>
    <span>ページ {currentPage} / {Math.ceil(filteredUsers.length / pageSize)}</span>
    <button on:click={nextPage} disabled={currentPage * pageSize >= filteredUsers.length}>次へ</button>
</div>
