<script lang="ts">
    import { page } from "$app/stores";
    import { fetchUsers, updateUser, deleteUser } from "$lib/api";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    // user.id を number 型に変更
    let user = { id: 0, name: "" };

    // ユーザー情報をロードする関数
    async function loadUser() {
        const userId = Number($page.params.id); // params.id を number 型に変換
        const users = await fetchUsers();
        user = users.find((u: { id: number; name: string }) => u.id === userId) || { id: 0, name: "ユーザーが見つかりません" };
    }

    // ユーザー情報を更新する関数
    async function handleUpdate() {
        if (user.name.trim() === "") {
            alert("名前を入力してください。");
            return;
        }
        await updateUser(String(user.id), user.name); // user.id を string 型に変換
        alert("ユーザー情報を更新しました！");
    }

    // ユーザーを削除する関数
    async function handleDelete() {
        if (confirm("本当に削除しますか？")) {
            await deleteUser(String(user.id)); // user.id を string 型に変換
            alert("ユーザーを削除しました！");
            goto("/");
        }
    }

    // コンポーネントがマウントされたときにユーザー情報をロード
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


  