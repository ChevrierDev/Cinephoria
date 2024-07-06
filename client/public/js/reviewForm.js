document.addEventListener('DOMContentLoaded', () => {
    const notationBtn = document.getElementById('notation-button');
    const notationMenu = document.getElementById('notation-menu');
    const scoreBtn = document.querySelectorAll('.valueBtn');
    const displayScore = document.getElementById('display-score');
    const finalScore = document.getElementById('final-score');
    const opensubmit = document.getElementById('submit-button');
    const submitMenu = document.getElementById('submit-form-menu');
    const submit = document.getElementById('submit-form');
    const closeSubmitForm = document.getElementById('close-submit-form');
    let score = null;
  
    scoreBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        score = btn.getAttribute('value');
        addScores(score);
        console.log(score);
        if (!notationMenu.classList.contains('hidden')) {
          notationMenu.classList.add('hidden');
        }
      });
    });
  
    function addScores(scores) {
      finalScore.value = scores; 
      displayScore.innerHTML = `${scores} sur 5`; 
    }
  
    const values = document.querySelectorAll('.valueBtn');
     
    values.forEach(value => {
      value.addEventListener('click', (e) => {
        e.preventDefault();
        values.forEach(v => v.classList.remove('bg-white'));
        value.classList.toggle('bg-white');
      });
    });
  
    notationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      notationMenu.classList.toggle('hidden');
      notationMenu.classList.toggle('flex');
    });
  
    opensubmit.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 310,
        behavior: 'smooth' 
      });
      submitMenu.classList.remove('hidden');
      submitMenu.classList.add('flex');
    });
  
    closeSubmitForm.addEventListener('click', (e) => {
      e.preventDefault();
      submitMenu.classList.add('hidden');
      submitMenu.classList.remove('flex');
    });
  });
  