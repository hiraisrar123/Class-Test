// Supabase client
const supabaseUrl = "https://zmdhtjgucjllannxjnhv.supabase.co";
const supabaseKey = 'sb_publishable_fv6KS1qad9LXi0CIApEIEQ_EN22A_B7';
const client = supabase.createClient(supabaseUrl, supabaseKey);

const registerForm = document.getElementById('registerForm');
const semail = document.getElementById('signupEmail');
const spassword = document.getElementById('signupPassword');
const username = document.getElementById('username');

registerForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  if (!semail.value || !spassword.value || !username.value) {
    alert('Please fill all fields');
    return;
  }

  const { error } = await client.auth.signUp({
    email: semail.value,
    password: spassword.value,
    options: {
      data: { name: username.value }
    }
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert('Signup successful! Check your email.');
  window.location.href = 'login.html';
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
          window.location.href = '../index.html'; // ✅ CORRECT PATH
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
