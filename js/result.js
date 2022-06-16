$(window).load(() => {
    $('.ress').on('click', () => {
        location.href = '/';
    })
    const level = location.href.split('=')[1];
    if(isNaN(level)){
        location.replace('/');
    }
    $('#meta_title').attr('content', `Lv.${level} - 환경 레벨 테스트`);
    $.ajax({
        url: 'level.json',
        type: 'POST',
        success: res => {
            res = res[level - 1];
            $('.levelLV').html(`LV.${level}`);
            $('.waef').html(`${res.commant}`);
            $('.levelName').html(`${res.title}`);
            $('.Im').html(`${res.title}인 나는...`);
            console.log(res);
            for(let i = 0; i < res.explanation.length; i++){
                $('.lts').append(`        <div class="levelcont">
                <div class="appleCont">${res.explanation[i]}</div>
            </div>`);
            }
            $('.t1').html(res.activity[0]);
            $('.t2').html(res.activity[1]);

            $('body').css('display', 'block');
            $('.levelImg').css('background', `url("/img/lv${level}.jpg")`);
            $('.levelImg').css('background-size', 'cover');
            $('.levelImg').css('background-position', 'center');
        }
    });

    const getDonate = () => {
        $.ajax({
            url: '//api.zero-young.com/test/getDonate',
            type: 'POST',
            success: res => {
                $('.ssss').html(`${res.toLocaleString('ko-KR')}원`);
            }
        });
    }
    getDonate();
    const getParticipate = () => {
        $.ajax({
            url: '//api.zero-young.com/test/getParticipate',
            type: 'POST',
            success: res => {
                $('.tpd').html(`${res.toLocaleString('ko-KR')}명의 분들이 함께 지키고 있어요`);
            }
        })
    }
    getParticipate();


    const donate = () => {
        $.ajax({
            url: '//api.zero-young.com/test/donate',
            type: 'POST',
            success: res => {
                getDonate();
            }
        });
    }
    const participate = (data) => {
        $.ajax({
            url: '//api.zero-young.com/test/participate',
            type: 'POST',
            data: {
                data: data.replace(/ /g,"")
            },
            success: res => {
                if(res.success){
                    Swal.fire({
                        icon: 'success',
                        title: '지구 방위대 등록 완료!',
                        text: '앱 출시 시 연락 드릴게요!'
                    });
                    getParticipate();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '흐음...?',
                        text: res.message
                    });
                }
            }
        });
    }


    $(document).on('click', '.instaNick', () => {
        let tempInput = document.createElement("input")
        tempInput.value = "@zero_0fficia1";
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        Swal.fire({
            icon: 'success',
            title: '복사되었습니다!',
            text: '인스타그램에서 @zero_0fficia1를 태그 해 주세요!',
            timer: 5000,
            timerProgressBar: true
        });
    })
    $(document).on('click', '.aboutZero', () => {
        window.open('https://zero-young.com/');
    })
    let timeout;
    $('body').scroll(() => {
        const scroll = $('body').scrollTop() + $(window).height();
        const height = $(document).height();
        const percnt = Number(scroll) / Number(height);
        if(percnt > 0.75){
            $('.stopvkrhl').css('opacity', '0');
            $('.vkrhl').css('cursor', 'default');
            timeout = setTimeout(() => {
                $('.stopvkrhl').css('display', 'none');
            }, 300);
        } 
        else{
            try{
                clearTimeout(timeout);
            } catch{}
            $('.stopvkrhl').css('display', 'flex');
            $('.stopvkrhl').css('opacity', '1');
            $('.vkrhl').css('cursor', 'pointer');
        }
    });
    $(document).on('click', '.vkrhl', () => {
        $('body').scrollTop(5000);
    })
    $(document).on('click', '.twitter', () => {
        window.open(`https://twitter.com/intent/tweet?url=${location.href}`);
        donate();
    })
    $(document).on('click', '.facebook', () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?&u=${location.href}`);
        donate();
    })
    $(document).on('click', '.link', () => {
        const scroll = $('body').scrollTop();
        let tempInput = document.createElement("input")
        tempInput.value = location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        Swal.fire({
            icon: 'success',
            title: 'URL이 복사되었습니다!',
            text: '붙여넣기하여 링크 공유하세요!',
            timer: 5000,
            timerProgressBar: true
        });
        donate();
    })
    let isOK = false;
    $(document).on('propertychange change keyup paste input', '.contact', () => {
        const data = $('.contact').val();
        if(data == ''){
            $('.saveearth').css('background', '#bdbdbd');
            $('.saveearth').css('cursor', 'no-drop');
            isOK = false;
        }
        else{
            $('.saveearth').css('background', '#00AC46');
            $('.saveearth').css('cursor', 'pointer');
            isOK = true;
        }
    })
    $(document).on('click', '.saveearth', () => {
        if(!isOK) return;
        participate($('.contact').val());
    })
    $(document).on('keyup', '.contact', (e) => {
        if(e.key === 'Enter' || e.keyCode === 13) {
            if(!isOK) return;
            participate($('.contact').val());
        }
    })
});