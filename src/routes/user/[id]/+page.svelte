<script lang="ts">
    import { page } from "$app/stores";
    import { fetchUsers, updateUser, deleteUser } from "$lib/api";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let user = { id: "", name: "" };

    async function loadUser() {
        const userId = $page.params.id;
        const users = await fetchUsers();
        user = users.find((u: { id: string; name: string }) => u.id === userId) || { id: "", name: "ユーザーが見つかりません" };
    }

    async function handleUpdate() {
        if (user.name.trim() === "") {
            alert("名前を入力してください。");
            return;
        }
        await updateUser(user.id, user.name);
        alert("ユーザー情報を更新しました！");
    }

    async function handleDelete() {
        if (confirm("本当に削除しますか？")) {
            await deleteUser(user.id);
            alert("ユーザーを削除しました！");
            goto("/");
        }
    }

    onMount(loadUser);
</script>

<h1>ユーザー詳細</h1>

<div style="font-size: 24px; margin-top: 20px;">
    <p><strong>ID:</strong> {user.id}</p>
    <p><strong>名前:</strong> <input type="text" bind:value={user.name}></p>
</div>

<button on:click={handleUpdate}>更新</button>
<button on:click={handleDelete} style="background-color: red; color: white;">削除</button>
<button on:click={() => goto("/")}>戻る</button>


  