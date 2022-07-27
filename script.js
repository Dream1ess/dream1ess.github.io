const getSkills = () => document.querySelectorAll('.resume-skill');
const setPercent = array => {
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

setPercent(getSkills());