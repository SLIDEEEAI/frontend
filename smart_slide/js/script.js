$(document).ready(function () {

    $('#topScroll').click(function () { 
        $('html').animate({scrollTop: 0}, 500);
		return false;
    });


    // печатающийся текст в главном блоке

    const text = [
        'Создайте презентацию с помощью \n',
        'искусственного интеллекта за одну минуту...\n'
      ];
      
    let line = 0;
    let count = 0;
    let result = '';
    const textField = $('.type-text-animation');
    textField.text('');

    function typeLine() {
        let interval = setTimeout(
        () => {
            result += text[line][count]
            textField.html(result)
    
        count++;
        if (count >= text[line].length) {
            count = 0;
            line++;
            if (line == text.length) {
            clearTimeout(interval);
                textField.html(result)
            return true;
            }
        }
        typeLine();
        }, getRandomInt(getRandomInt(250*2.5)))
    }

    if (textField.length) {
        setTimeout(() => {
            typeLine();
        }, 2000);
    }
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


    //наведение на блоке в секции2
    $('.info-blocks-wrap div').mouseover(function () {
            $(this).parent().find('div').removeClass('active');
            $(this).addClass('active');
        }
    );
    
    function conditionInterval(container, element, condition, interval) {
        let length = $(`${container} ${element}`).length;
        
        let index = 0;

        setInterval(() => {
            $(`${container} ${element}`).eq(index).removeClass(condition);
            if (index+1 != length) 
                index++;
            else 
                index = 0;
            $(`${container} ${element}`).eq(index).addClass(condition);
        }, interval);
    }

    // барабан "преимущества"
    conditionInterval('.advantages-wrap', '.advantage-block', 'active', 3000);
});