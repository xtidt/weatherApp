require(['global'], function() {
    //参数
    var city = $.GetQueryString('city')||'xiamen';
    $.ajax({
//        url:'./weather/info',
        url:'./index.php',
        data:{
            city:city
        },
        type:'get',
        success:function(data){
            var returnJSON = data;
            if(typeof(data) == 'string'){
                returnJSON = JSON.parse(data);
            }
            drawData(returnJSON);
        },
        error:function(xhr){

        }
    });

    function drawData(data){
        var returnJson = data["HeWeather data service 3.0"][0];
        //当日天气
        var currentData = returnJson.daily_forecast[0];
        $('.imgRow').data('weather',currentData.cond.txt_d).text(currentData.cond.txt_d);
        $('#temp').text(currentData.tmp.max+'~'+currentData.tmp.min);
        $('#name').text(currentData.cond.txt_d);
        $('#wind').text(currentData.wind.dir);
        $('#air').text(returnJson.aqi.city.aqi);
        $('#today').text(day(currentData.date));
        $('#toDate').text(weekStr(currentData.date));

        drawOthers(returnJson.daily_forecast).done(function(){
            changeImg();
        });
    }

    //其他天气绘制
    function drawOthers(items){
        var Defer = new $.Deferred();
        var htmlStr = '';
        $.each(items, function(index, item){
            if(index > 0 && index < 5){
                htmlStr += '<div class="col2">';
                htmlStr += '<ol class="row0">'+ day(item.date) +'</ol>';
                htmlStr += '<ol class="row1">'+ weekStr(item.date) +'</ol>';
                htmlStr += '<ol class="row2" data-weather="'+item.cond.txt_d+'">'+item.cond.txt_d+'</ol>';
                htmlStr += '<ol class="row3"><span class="temp2">'+item.tmp.max+'~'+item.tmp.min+'</span>℃</ol>';
                htmlStr += '<ol class="row4">'+item.cond.txt_d+'</ol>';
                htmlStr += '<ol class="row5">'+item.wind.dir+'</ol>';
                htmlStr += '</div>';
            }
        });

        $('#contentList').html(htmlStr);
        Defer.resolve();
        return Defer.promise();
    }

    //星期几
    function weekStr(str){
        var dayIndex = new Date(str).getDay();
        switch(dayIndex){
            case 0:
                return '星期日';
                break;
            case 1:
                return '星期一';
                break;
            case 2:
                return '星期二';
                break;
            case 3:
                return '星期三';
                break;
            case 4:
                return '星期四';
                break;
            case 5:
                return '星期五';
                break;
            case 6:
                return '星期六';
                break;
            default:
                break;
        }
    }

    function day(str){
        var _arr = str.split('-');
        return _arr[1]+'/'+_arr[2];
    }

    //替换贴图
    function changeImg(){
        var arrs = ['.imgRow', '.col2 .row2'];
        var map = [
            { id:'sunny',       txt:'晴',            src:'./img/weather/sunny.png' },
            { id:'cloud',       txt:'多云',          src:'./img/weather/cloud.png' },
            { id:'cloud',       txt:'阴',            src:'./img/weather/cloud.png' },
            { id:'frog',        txt:'雾',            src:'./img/weather/frog.png' },
            { id:'rain',        txt:'雨',            src:'./img/weather/rain.png' },
            { id:'snow',        txt:'雪',            src:'./img/weather/snow.png' },
            { id:'snow2rain',   txt:'雨夹雪',         src:'./img/weather/snow2rain.png' },
            { id:'suntocloud',  txt:'多云转晴',       src:'./img/weather/suntocloud.png' },
            { id:'wind',        txt:'风',            src:'./img/weather/wind.png' }
        ];

        function filter(txt){
            var _tmp = null;
            $.each(map, function(index, item){
                if(map[index].txt == txt){
                    _tmp = map[index].src
                }else{}

            });
            //默认天气
            if(!_tmp)_tmp = map[0].src;
            return _tmp
        }


        $.each(arrs, function(index, item){
            $.each($(item), function(i, obj){
                var txt = $(obj).text();
                var imgUrl = filter(txt);
                console.log(imgUrl);
                $(item).eq(i).html('<img src="'+ imgUrl +'">');
            });
        });
    }
});