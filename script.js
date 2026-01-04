// Supabase client
const supabaseUrl = "https://zmdhtjgucjllannxjnhv.supabase.co";
const supabaseKey = 'sb_publishable_fv6KS1qad9LXi0CIApEIEQ_EN22A_B7';
const client = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  if (!registerForm) return; // agar form nahi hai to exit

  registerForm.addEventListener('submit', async function(e) {
      e.preventDefault(); // error nahi aayega

      const semail = document.getElementById('signupEmail').value;
      const spassword = document.getElementById('signupPassword').value;
      const username = document.getElementById('username').value;

      if (!semail || !spassword || !username) {
          alert('Please fill all fields');
          return;
      }

      const { error } = await client.auth.signUp({
          email: semail,
          password: spassword,
          options: { data: { name: username } }
      });

      if (error) {
          alert(error.message);
          return;
      }

      alert('Signup successful! Check your email.');
      window.location.href = 'login.html';
  });
});

























        // login
        
        const loginForm = document.getElementById('loginForm');
        const lemail = document.getElementById('loginEmail');
        const lpassword = document.getElementById('loginPassword');
        
        loginForm?.addEventListener('submit', async function (e) {
          e.preventDefault();
        
          if (!lemail.value || !lpassword.value) {
            alert('Please fill all fields');
            return;
          }
        
          const { data, error } = await client.auth.signInWithPassword({
            email: lemail.value,
            password: lpassword.value
          });
        
          if (error) {
            alert(error.message);
            return;
          }
        
          alert('Login successful');
          window.location.href = 'create.html';
        });
        
        
        
        
        // ___________________________________________ LOGOUT 
        let logoutBtn = document.getElementById('logout');
        
        
        async function logout () {
          const { error } = await supabase.auth.signOut();
          if(!error){
           alert('Logout successful');
          location.href = 'index.html';
          } else {
            console.error('Logout error:', error.message);
          }
        }
        
        
        logoutBtn?.addEventListener('click', logout);
