<script lang="ts">
    import { onMount } from "svelte";
    import { fetchUsers } from "$lib/api";

    interface User {
        id: string;
        name: string;
    }

    let allUsers: User[] = []; // APIから取得した全ユーザー
    let filteredUsers: User[] = []; // 絞り込み後の表示用データ
    let searchId = "";
    let searchName = "";

    async function loadUsers() {
        try {
            allUsers = await fetchUsers(); // API から全ユーザーを取得
            filteredUsers = [...allUsers]; // 初期表示は全データ
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    function filterUsers() {
        filteredUsers = allUsers.filter(user => 
            (searchId === "" || user.id.includes(searchId)) &&
            (searchName === "" || user.name.toLowerCase().includes(searchName.toLowerCase()))
        );
    }

    onMount(loadUsers);
</script>

<h1>ユーザー一覧</h1>

<!-- 検索入力欄 -->
<input type="text" bind:value={searchId} placeholder="ID検索">
<input type="text" bind:value={searchName} placeholder="名前検索">
<button on:click={filterUsers}>検索</button>

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>名前</th>
        </tr>
    </thead>
    <tbody>
        {#each filteredUsers as user}
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
            </tr>
        {/each}
    </tbody>
</table>

