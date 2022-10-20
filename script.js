page = {};
page.main = {
    data: {
        btnContrast: document.getElementById('contrast')
    },
    handlers: {
        changeContrast: () => {
            if(page.main.data.btnContrast.classList.contains('active')) {
                page.main.data.btnContrast.classList.remove('active');
                for(let item of page.main.methods.getContrastElement()) {
                    item.classList.remove('active');
                }
            } else {
                page.main.data.btnContrast.classList.add('active');
                for(let item of page.main.methods.getContrastElement()) {
                    item.classList.add('active');
                }
            }
        }
    },
    methods: {
        getContrastElement: () => document.querySelectorAll('.contrast'),
        getSkills: () => document.querySelectorAll('.resume-skill'),
        setPercent: array => {
            for(let item of array) {
                const percentBlock = item.querySelector('.resume-skill__percent'),
                    levelBlock = item.querySelector('.resume-skill__level span');
                let percent = '0';
                if(percentBlock) {
                    percent = percentBlock.innerText;
                }
                levelBlock.style.width = percent;
            }
        }
    }
};
(function (){
    page.main.methods.setPercent(page.main.methods.getSkills());
    page.main.data.btnContrast.addEventListener('click', page.main.handlers.changeContrast);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        // регистрация сработала
        console.log('Registration succeeded. Scope is ' + reg.scope);
      }).catch((error) => {
        // регистрация прошла неудачно
        console.log('Registration failed with ' + error);
      });
    }

}());