import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Supabase keys
const supabaseUrl = "https://htsegsgdffdvpgwroiti.supabase.co";
const supabaseAnonKey = "sb_publishable_iP7VYAIrC6UiJvlfyilQqw_3x3-Hip9";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { storage: localStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
});

// DOM elements
const signinForm = document.getElementById("signin-form");
const registerForm = document.getElementById("register-form");
const toggleToRegister = document.getElementById("toggle-to-register");
const toggleToLogin = document.getElementById("toggle-to-login");
const googleBtn = document.getElementById("google-btn");
const githubBtn = document.getElementById("github-btn");
const signoutBtn = document.getElementById("signout-btn");
const userEmailEl = document.getElementById("user-email");

// ✅ If URL hash requests register view, open it on load
document.addEventListener("DOMContentLoaded", () => {
  if (location.hash === "#register") {
    const signin = document.getElementById("signin");
    const register = document.getElementById("register");
    if (signin && register) {
      signin.classList.remove("active");
      register.classList.add("active");
    }
  }
});

// ✅ Toggle between login/register
if (toggleToRegister) {
  toggleToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("signin").classList.remove("active");
    document.getElementById("register").classList.add("active");
  });
}
if (toggleToLogin) {
  toggleToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("register").classList.remove("active");
    document.getElementById("signin").classList.add("active");
  });
}

// ✅ Sign in
if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;
    const rememberMe = document.getElementById("remember").checked; // <-- NEW

    // Save pending email to localStorage
    localStorage.setItem("pendingEmail", email);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return alert(error.message);
    location.href = "index.html";
  });
}

// ✅ Register
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirm = document.getElementById("register-confirm").value;
    if (password !== confirm) return alert("Passwords do not match!");

    // Save pending email to localStorage
    localStorage.setItem("pendingEmail", email);

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { emailRedirectTo: `${window.location.origin}/index.html` }
    });
    if (error) return alert(error.message);
    alert("Check your email to confirm your account!");
    location.href = "login.html";
  });
}

// ✅ OAuth Google
if (googleBtn) {
  googleBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    // For OAuth, we'll save a placeholder email since we don't have the actual email yet
    localStorage.setItem("pendingEmail", "oauth-user@example.com");
    await supabase.auth.signInWithOAuth({ 
      provider: "google",
      options: { redirectTo: `${window.location.origin}/index.html` }
    });
  });
}

// ✅ OAuth GitHub
if (githubBtn) {
  githubBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    // For OAuth, we'll save a placeholder email since we don't have the actual email yet
    localStorage.setItem("pendingEmail", "oauth-user@example.com");
    await supabase.auth.signInWithOAuth({ 
      provider: "github",
      options: { redirectTo: `${window.location.origin}/index.html` }
    });
  });
}

// ✅ Sign out
if (signoutBtn) {
  signoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    location.href = "index.html";
  });
}

// ✅ Session check (protect home.html)
(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (userEmailEl && (!session || !session.user)) {
    location.href = "index.html"; // redirect if not logged in
  }
  if (userEmailEl && session?.user) {
    userEmailEl.textContent = session.user.email;
  }
})();
