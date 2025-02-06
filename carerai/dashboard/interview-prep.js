document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('interviewForm');
    const steps = form.querySelectorAll('.form-step');
    const dots = document.querySelectorAll('.step-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentStep = 0;

    // Addım göstəricilərini yeniləmə
    function updateStepIndicators() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentStep);
        });
    }

    // Düymələri yeniləmə
    function updateButtons() {
        prevBtn.disabled = currentStep === 0;
        if (currentStep === steps.length - 1) {
            nextBtn.innerHTML = 'Təsdiqlə <i class="fas fa-check"></i>';
        } else {
            nextBtn.innerHTML = 'İrəli <i class="fas fa-arrow-right"></i>';
        }
    }

    // Addımları göstərmə
    function showStep(step) {
        steps.forEach((s, index) => {
            s.classList.toggle('active', index === step);
        });
    }

    // İrəli düyməsi
    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
            updateStepIndicators();
            updateButtons();
        } else {
            // Form təsdiqləndi
            submitForm();
        }
    });

    // Geri düyməsi
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            updateStepIndicators();
            updateButtons();
        }
    });

    // Formu təsdiqləmə
    function submitForm() {
        // Form məlumatlarını yığırıq
        const formData = {
            interviewType: form.querySelector('input[name="interviewType"]:checked')?.value,
            field: form.querySelector('#field').value,
            requirements: form.querySelector('#requirements').value,
            company: form.querySelector('#company').value,
            additional: form.querySelector('#additional').value
        };

        // Məlumatları yoxlayırıq
        if (!formData.interviewType || !formData.field || !formData.requirements || !formData.company) {
            alert('Xahiş edirik bütün məcburi xanaları doldurun!');
            return;
        }

        // Məlumatları emal edirik (burada API çağırışı və ya başqa əməliyyat əlavə edilə bilər)
        console.log('Form məlumatları:', formData);
        
        // Müvəffəqiyyət mesajı
        alert('Məlumatlarınız qəbul edildi! Müsahibə simulyasiyası hazırlanır...');
        
        // İstəsəniz istifadəçini başqa səhifəyə yönləndirə bilərsiniz
        // window.location.href = 'interview-simulation.html';
    }

    // Animasiyalı keçidlər üçün
    steps.forEach(step => {
        step.addEventListener('transitionend', function() {
            if (!this.classList.contains('active')) {
                this.style.display = 'none';
            }
        });
    });
}); 