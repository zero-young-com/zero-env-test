$(window).load(() => {
    $(document).on('click', '.buttonStart', () => {
        location.href = '/test';
    });
    const rand = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $.ajax({
        url: '//api.zero-young.com/test/getPeople',
        type: 'POST',
        success: res => {
            $('.buttonTexting').html(`${res.toLocaleString('ko-KR')}`);
        }
    });
    const donate = () => {
        $.ajax({
            url: '//api.zero-young.com/test/donate',
            type: 'POST',
            success: res => {
                getDonate();
            }
        });
    }
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
    const getDonate = () => {
        $.ajax({
            url: '//api.zero-young.com/test/getDonate',
            type: 'POST',
            success: res => {
                $('.sssss').html(`${res.toLocaleString('ko-KR')}원`);
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