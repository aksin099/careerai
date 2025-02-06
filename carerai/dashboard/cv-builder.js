document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('cvFile');
    const analyzeBtn = document.querySelector('.analyze-btn');
    let uploadedFile = null;

    // Drag & Drop funksionallığı
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        uploadArea.classList.add('drag-over');
    }

    function unhighlight() {
        uploadArea.classList.remove('drag-over');
    }

    // Fayl yükləmə
    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            uploadedFile = files[0];
            
            // Fayl tipini yoxlayırıq
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(uploadedFile.type)) {
                alert('Xahiş edirik yalnız PDF, DOC və ya DOCX faylları yükləyin.');
                return;
            }

            // Fayl ölçüsünü yoxlayırıq (5MB)
            if (uploadedFile.size > 5 * 1024 * 1024) {
                alert('Fayl ölçüsü 5MB-dan çox olmamalıdır.');
                return;
            }

            // Upload area-nı yeniləyirik
            const uploadContent = uploadArea.querySelector('.upload-content');
            uploadContent.innerHTML = `
                <i class="fas fa-file-alt"></i>
                <h3>${uploadedFile.name}</h3>
                <p>${formatFileSize(uploadedFile.size)}</p>
                <button class="upload-btn" onclick="document.getElementById('cvFile').click()">
                    Faylı Dəyiş
                </button>
            `;

            // Analiz düyməsini aktiv edirik
            analyzeBtn.disabled = false;
        }
    }

    // Fayl ölçüsünü format edirik
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // CV analizi
    analyzeBtn.addEventListener('click', function() {
        if (uploadedFile) {
            // Yükləmə animasiyası
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analiz edilir...';
            this.disabled = true;

            // Burada CV analizi API çağırışı ediləcək
            setTimeout(() => {
                // Test üçün timeout
                alert('CV analizi tamamlandı! Nəticələr hazırlanır...');
                this.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> CV-ni Analiz Et';
                this.disabled = false;
            }, 2000);
        }
    });

    // Template seçimi
    const templateButtons = document.querySelectorAll('.use-template-btn');
    templateButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const templateName = this.parentElement.querySelector('h3').textContent;
            // Burada template seçimi işləniləcək
            alert(`${templateName} şablonu seçildi. CV yaradılır...`);
        });
    });
}); 