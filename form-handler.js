// Script formulaire contact ELYTAYMASS
// Version ultra-simple qui fonctionne partout

window.addEventListener('load', function() {
    console.log('Script chargé');
    
    const form = document.getElementById('contact-form-elytaymass');
    
    if (!form) {
        console.error('Formulaire non trouvé');
        return;
    }
    
    console.log('Formulaire trouvé', form);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Formulaire soumis');
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;
        
        // Créer l'objet de données
        const data = {
            nom: form.querySelector('[name="nom"]').value,
            telephone: form.querySelector('[name="telephone"]').value,
            email: form.querySelector('[name="email"]').value,
            besoin: form.querySelector('[name="besoin"]').value,
            message: form.querySelector('[name="message"]').value,
            date: new Date().toISOString()
        };
        
        console.log('Données à envoyer:', data);
        
        // Envoyer vers Make
        fetch('https://hook.eu1.make.com/gj4blg8oqrpx8rqbu39v93dku0qlvs0j', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            console.log('Réponse reçue:', response);
            if (response.ok) {
                btn.textContent = '✓ Message envoyé !';
                btn.style.background = '#10b981';
                form.reset();
                
                setTimeout(function() {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            } else {
                throw new Error('Erreur serveur');
            }
        })
        .catch(function(error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'envoi. Contactez-moi par téléphone : 07 70 02 98 25');
            btn.textContent = originalText;
            btn.disabled = false;
        });
    });
});
