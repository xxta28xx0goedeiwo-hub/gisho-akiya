document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('demolitionForm');
  if (!form) return;

  const TOTAL_STEPS = 14;
  let current = 1;

  const steps = form.querySelectorAll('.wizard-step');
  const progressFill = document.getElementById('wizardProgressFill');
  const stepNumEl = document.getElementById('wizardStepNum');
  const wizardBox = document.querySelector('.wizard-box');

  function showStep(n) {
    steps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === n));
    if (progressFill) progressFill.style.width = (n / TOTAL_STEPS * 100) + '%';
    if (stepNumEl) stepNumEl.textContent = n;
    current = n;
    if (wizardBox) {
      const rect = wizardBox.getBoundingClientRect();
      if (rect.top < 0) wizardBox.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }

  function goNext() {
    if (current < TOTAL_STEPS) showStep(current + 1);
  }
  function goPrev() {
    if (current > 1) showStep(current - 1);
  }

  // Choice buttons: click -> fill hidden field, mark selected, advance
  form.querySelectorAll('.wizard-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const stepEl = btn.closest('.wizard-step');
      const fieldName = stepEl.dataset.field;
      const value = btn.dataset.value;

      if (fieldName) {
        const hidden = form.querySelector(`input[type="hidden"][data-field="${fieldName}"]`);
        if (hidden) hidden.value = value;
      }

      stepEl.querySelectorAll('.wizard-choice').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      // Step 8 (requester type) has special handling: 法人 reveals a company name field
      if (stepEl.dataset.step === '8') {
        const companyWrap = stepEl.querySelector('.wizard-company-input');
        if (value === '法人') {
          companyWrap.style.display = 'block';
          return; // wait for "次へ進む" button
        } else {
          companyWrap.style.display = 'none';
          goNext();
        }
        return;
      }

      goNext();
    });
  });

  // "次へ進む" button after entering company name (step 8, 法人 case)
  const companyNextBtn = form.querySelector('[data-action="company-next"]');
  if (companyNextBtn) {
    companyNextBtn.addEventListener('click', () => {
      const companyInput = form.querySelector('#wizardCompanyName');
      const hidden = form.querySelector('input[type="hidden"][data-field="companyName"]');
      if (hidden) hidden.value = companyInput.value;
      goNext();
    });
  }

  // Back links
  form.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', goPrev);
  });
});
