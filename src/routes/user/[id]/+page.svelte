<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
  
    let id = "";
    let name = "";
  
    export async function fetchUsers() {
    const response = await fetch("http://localhost:3000/Users");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
}

  
    async function saveUser() {
      await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      alert("更新しました！");
    }
  
    async function deleteUser() {
      if (confirm("本当に削除しますか？")) {
        await fetch(`/api/users/${id}`, { method: "DELETE" });
        alert("削除しました！");
        goto("/");
      }
    }
  
    onMount(fetchUsers);
  </script>
  
  <h1>ユーザー詳細</h1>
  <label for="user-id">ID: {id}</label>
  <label for="user-name">名前：</label>
  <input id="user-name" type="text" bind:value={name} placeholder="名前">
  <button on:click={saveUser}>更新</button>
  <button on:click={deleteUser}>削除</button>
  <button on:click={() => goto("/")}>戻る</button>
  