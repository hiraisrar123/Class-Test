// Supabase client
const supabaseUrl = "https://zmdhtjgucjllannxjnhv.supabase.co";
const supabaseKey = 'sb_publishable_fv6KS1qad9LXi0CIApEIEQ_EN22A_B7';
const client = supabase.createClient(supabaseUrl, supabaseKey);

// Signup
const registerForm = document.getElementById('registerForm');
const semail = document.getElementById('signupEmail');
const spassword = document.getElementById('signupPassword');

registerForm.addEventListener('submit', async function(e) {
  e.preventDefault(); // page reload rokta hai

  if (!semail.value || !spassword.value) {
    alert('Please fill all fields');
    return;
  }

  const { data, error } = await client.auth.signUp({
    email: semail.value,
    password: spassword.value,
    options: {
      data: { name: document.getElementById('username').value }
    }
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert('Signup successful! Check your email to confirm.');
  window.location.href = 'login.html'; // signup ke baad Start page open
});








        // login
        
        const loginForm = document.getElementById('loginForm');
        const lemail = document.getElementById('loginEmail');
        const lpassword = document.getElementById('loginPassword');
        
        async function login(e) {
          e.preventDefault();
        
          if (!lemail.value || !lpassword.value) {
            alert('Please fill all fields');
            return;
          }
        
          const { data, error } = await supabase.auth.signInWithPassword({
            email: lemail.value,
            password: lpassword.value
          });
        
          if (error) {
            console.log('Login Error:', error);
            alert(error.message);
            return;
          }
        
          console.log('Login Success:', data);
          location.href = 'start.html';
        }
        
        
        loginForm?.addEventListener('submit', login, location.href = 'start.html');
        
        
        
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











        
// _____________________________ Quiz ____________________________ //


 const questions = [
            {
                question: 'What is the largest animal in the world?',
                answer: [
                    {text: 'Shark', current: false},
                    {text: 'Blue Whale', current: true},
                    {text: 'Elephant', current: false},
                    {text: 'Giraffe', current: false},
                ]
            },
            {
                question: 'Which is the smallest country in the world?',
                answer: [
                    {text: 'Vatican City', current: true},
                    {text: 'Bhutan', current: false},
                    {text: 'Nepal', current: false},
                    {text: 'Sri Lanka', current: false},
                ]
            },
            {
                question: 'Which is the largest desert in the world?',
                answer: [
                    {text: 'Kalahari', current: false},
                    {text: 'Gobi', current: false},
                    {text: 'Sahara', current: false},
                    {text: 'Antarctica', current: true},
                ]
            },
            {
                question: 'Which is the smallest continent in the world?',
                answer: [
                    {text: 'Asia', current: false},
                    {text: 'Australia', current: true},
                    {text: 'Arctic', current: false},
                    {text: 'Africa', current: false},
                ]
            },
            // COVID related questions
            {
                question: 'Which virus causes COVID-19?',
                answer: [
                    {text: 'Influenza', current: false},
                    {text: 'SARS-CoV-2', current: true},
                    {text: 'HIV', current: false},
                    {text: 'Ebola', current: false},
                ]
            },
            {
                question: 'What is the recommended way to prevent COVID-19 spread?',
                answer: [
                    {text: 'Washing hands regularly', current: true},
                    {text: 'Avoid vaccines', current: false},
                    {text: 'Eating junk food', current: false},
                    {text: 'Sleeping less', current: false},
                ]
            }
        ];

        const questionElement = document.getElementById('question');
        const answerButtons = document.getElementById('answer-buttons');
        const nextButton = document.getElementById('next-btn');

        let currentQuestionIndex = 0;
        let score = 0;

        window.onload = startQuiz; // page load hote hi quiz start ho jaye

        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            if(currentQuestionIndex < questions.length){
                showQuestion();
            } else {
                showScore();
            }
        });

        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.style.display = 'none';
            showQuestion();
        }

        function showQuestion(){
            resetState();
            let currentQuestion = questions[currentQuestionIndex];
            questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

            currentQuestion.answer.forEach(answer => {
                const button = document.createElement('button');
                button.innerHTML = answer.text;
                button.classList.add('btn', 'btn-outline-primary', 'm-1');
                if(answer.current){
                    button.dataset.correct = answer.current;
                }
                button.addEventListener('click', selectAnswer);
                answerButtons.appendChild(button);
            });
        }

        function resetState() {
            nextButton.style.display = 'none';
            while(answerButtons.firstChild){
                answerButtons.removeChild(answerButtons.firstChild);
            }
        }

        function selectAnswer(e){
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === 'true';
            if(isCorrect) {
                selectedBtn.classList.add('btn-success');
                score++;
            } else {
                selectedBtn.classList.add('btn-danger');
            }

            Array.from(answerButtons.children).forEach(button => {
                if(button.dataset.correct === 'true'){
                    button.classList.add('btn-success');
                }
                button.disabled = true;
            });

            nextButton.style.display = 'block';
        }

        function showScore(){
            resetState();
            questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
            nextButton.innerHTML = 'Play Again';
            nextButton.style.display = 'block';
            nextButton.addEventListener('click', startQuiz);
        }




        