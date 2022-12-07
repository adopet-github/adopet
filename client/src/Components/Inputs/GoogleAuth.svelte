<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import { getProfile, googleLogIn } from "../../Services/auth";
  import { userCredentials } from "../../Stores/userCredentials";

  const navigate = useNavigate();

  const handleCredentialResponse = async (response) => {
    const res = await googleLogIn(response.credential);
    if (res.data) {
      userCredentials.set(res.data);
      navigate('/onboarding');
    } else {
      localStorage.setItem('jwt', res.token);
      const profileRes = await getProfile();
      if (profileRes.status === 200) {
        userCredentials.set(profileRes.data);
      }
      navigate('/user/swipe');
    }
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
            { theme: "outline", size: "large" }
          );
          google.accounts.id.prompt();
    }}
  ></script>
</svelte:head>

<button id="google-auth" />
