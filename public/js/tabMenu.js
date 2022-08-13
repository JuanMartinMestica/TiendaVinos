const targets = document.querySelectorAll('[data-target]');
const content = document.querySelectorAll('[data-content]');

targets.forEach(target => {

    target.addEventListener('click', () => {

        console.log('object');

        targets.forEach(t => t.classList.remove('selected'));

        target.classList.add('selected');
        content.forEach((contentDiv) => contentDiv.classList.remove('active'));

        const targetSelected = document.querySelector(target.dataset.target);
        targetSelected.classList.add('active');


    });

});