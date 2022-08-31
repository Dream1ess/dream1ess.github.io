diagram = {
    methods: {
        getCaptionList: () => document.querySelectorAll('li'),
        getCircleList: () => document.querySelectorAll('circle')
    }
};
(function (){
    Array.from(diagram.methods.getCaptionList()).forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            for(let item of diagram.methods.getCircleList()) {
                item.classList.add('hide');
            }
            diagram.methods.getCircleList()[index].classList.remove('hide');
        });
        item.addEventListener('mouseout', () => {
            for(let item of diagram.methods.getCircleList()) {
                item.classList.remove('hide');
            }
        });
    });
}());