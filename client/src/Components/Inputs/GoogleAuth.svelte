<script lang="ts">
    import { googleLogIn } from "../../Services/auth";

  const handleCredentialResponse = async (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const res = await googleLogIn(response.credential);
    console.log(res);
  };
</script>

<!-- svelte-ignore missing-declaration -->
<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async defer 
    on:load={() => {
      google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("google-auth"),
            { theme: "outline", size: "large" }  // customization attributes
          );
          google.accounts.id.prompt();
    }}
  ></script>
</svelte:head>

<button id="google-auth" />
