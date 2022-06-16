$(window).load(() => {
    let data = Object(), select = 0, count = 0, answer = Array();
    $.ajax({
        url: 'suggest',
        type: 'POST',
        async: false,
        success: res => {
            data = res;
        }
    });
    console.log(data);
    const resetColor = () => {
        $('.answer1').css('color', '#000');
        $('.answer1').css('background', '#fff');
        $('.answer2').css('color', '#000');
        $('.answer2').css('background', '#fff');
    }
    const setElements = (i) => {
        resetColor();
        $('body').scrollTop(0);
        if(i == 0) {
            $('.pre').css('display', 'none');
        }
        else{
            $('.pre').css('display', 'block');
        }
        let pct = (i + 1) / data.length;
        pct = pct > 1 ? 1 : pct;
        $('.progressBar').css('width', `${pct * 100}%`);
        $('.question').html(data[i].question);
        $('.answer1').html(data[i].answer[0]);
        $('.answer2').html(data[i].answer[1]);
        $('.number').html(`Q${String(i + 1)}`);
        $('.img').css('background', `url('img/${data[i].url}')`);
        $('.img').css('background-size', `cover`);
        $('.img').css('background-position', `center`);
        $('.nows').html(`${i + 1}/${data.length}`);
    }
    
    $(document).on('click', '.answer1', () => {
        resetColor();
        $('.answer1').css('color', '#fff');
        $('.answer1').css('background', '#00AC46');
        $('.buttonStart').css('background', '#00AC46');
        $('.buttonStart').css('cursor', 'pointer');
        select = 1;
        next();
    });
    $(document).on('click', '.answer2', () => {
        resetColor();
        $('.answer2').css('color', '#fff');
        $('.answer2').css('background', '#00AC46');
        $('.buttonStart').css('background', '#00AC46');
        $('.buttonStart').css('cursor', 'pointer');
        select = 2;
        next();
    });
    const next = () => {
        setTimeout(() => {
            resetColor();
            setTimeout(() => {
                nexts();
            }, 300);
        }, 300);
    }
    const nexts = () => {
        if(select) {
            if(answer.length != count - 1){
                answer.push(select - 1);
                count = count + 1;
            }
            if(count == data.length){
                $.ajax({
                    url: '//api.zero-young.com/test/people',
                    type: 'POST',
                    async: false
                });
                $.ajax({
                    url: '//api.zero-young.com/test/insertResult',
                    type: 'POST',
                    async: false,
                    data: {
                        data: JSON.stringify(answer)
                    }
                });
                let count = 0;
                for(let i = 0; i < answer.length - 1; i++){
                    if(answer[i] == 1) count++;
                }
                count++;
                location.href = `/result?level=${count > 6 ? 6 : count}`;
            }
            setElements(count);
            select = 0;
        }
    }
    const pre = () => {
        console.log(answer.length);
        if(answer.length != 0){
            answer.pop();
            count = count - 1;
            setElements(count);
        }
        else{
            location.replace('/');
        }
    }
    $(document).on('click', '.pre', () => {
        pre();
    });
    setElements(count);
})