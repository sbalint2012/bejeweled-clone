let selected_gems = [];

$(function () {
    generate_gems();
});

function generate_gems(){
    for(let i = 1; i < 11; i++){
        for(let j = 1; j < 11; j++){
            let gem = $('<img>');
            let color = Math.random();

            if(color < 0.25){
                gem.addClass('gem1').attr('src', 'gem1.png');
            } else if(color < 0.50){
                gem.addClass('gem2').attr('src', 'gem2.png');
            } else if(color < 0.75){
                gem.addClass('gem3').attr('src', 'gem3.png');
            } else{
                gem.addClass('gem4').attr('src', 'gem4.png');
            }

            gem.addClass('col_'+j);
            gem.addClass('row_'+i);
            gem.appendTo('#gameArea');
        }
    }
}

//Eger kattintas a kore, hatasara a sor oszlop azonosito atadasa
window.addEventListener('click', function(e) {
    let getClass = e.target.className;
    if (getClass !== '') {
        console.log(getClass);
        //TODO: max 2 kivalaszott es ugyanazt nem lehet ketszer
        selected_gems.push(slice_class(getClass));
        console.log(selected_gems);
        if(selected_gems.length == 2) {
            move_gems(selected_gems);
            selected_gems = [];
        }
    }
});

function slice_class(s){
    let splitted = s.split(" ");
    let res = [];
    res.push(splitted[0]);
    res.push(splitted[1]);
    res.push(splitted[2]);

    return res;
}

function move_gems(arr){
    let gem_1_class = "." + arr[0][0] + "." + arr[0][1] + "." + arr[0][2];
    let gem_2_class = "." + arr[1][0] + "." + arr[1][1] + "." + arr[1][2];

    //console.log(gem_1_class);
    if(check_step(arr)){
        $('#game_area').find(gem_1_class).each(function (){
            $(this).removeClass(arr[0][0]);
            $(this).attr('class', arr[1][0] + " " + $(this).attr('class'));
        });

        $('#game_area').find(gem_2_class).each(function (){
            $(this).removeClass(arr[1][0]);
            $(this).attr('class', arr[0][0] + " " + $(this).attr('class'));
        });
    }
    //console.log("Arr: "+arr);

}


//kivalasztott kovek megcserelese
function move_gems(arr){
    var gem_1_class = "." + arr[0][0] + "." + arr[0][1] + "." + arr[0][2];
    var gem_2_class = "." + arr[1][0] + "." + arr[1][1] + "." + arr[1][2];

    //console.log(gem_1_class);
    if(check_step(arr)){
        $('#gameArea').find(gem_1_class).each(function (){
            $(this).removeClass(arr[0][0]);
            $(this).attr('class', arr[1][0] + " " + $(this).attr('class')).attr('src',''+arr[1][0]+'.png');
        });

        $('#gameArea').find(gem_2_class).each(function (){
            $(this).removeClass(arr[1][0]);
            $(this).attr('class', arr[0][0] + " " + $(this).attr('class')).attr('src',''+arr[0][0]+'.png');
        });
    }
    //console.log("Arr: "+arr);

}

//lepes ellenorzes, csak vizszintes vagy fuggoleges
function check_step(arr){
    if(arr[0][1] == arr[1][1] || arr[0][2] == arr[1][2]){
        if(check_step_dist(arr)){
            return true;
        }
    }
    return false;
}

//lepes tavolsag ellenorzes
function check_step_dist(arr){
    var gem_1_col;
    var gem_1_row;
    var gem_2_col;
    var gem_2_row;

    gem_1_col = get_col_num(arr[0][1]);
    gem_2_col = get_col_num(arr[1][1]);
    gem_1_row = get_row_num(arr[0][2]);
    gem_2_row = get_row_num(arr[1][2]);

    var col_abs = Math.abs(gem_1_col - gem_2_col);
    var row_abs = Math.abs(gem_1_row - gem_2_row);

    //console.log("row: " + row_abs);
    //console.log("col: " + col_abs);
    //console.log("gem1: " + gem_1_col + ", " + gem_1_row);
    //console.log("gem2: " + gem_2_col + ", " + gem_2_row);

    if(col_abs == 0 && row_abs == 1){
        return true;
    } else if(col_abs == 1 && row_abs ==0){
        return true;
    }
    return false;
}

//oszlop szama
function get_col_num(s){
    var res;

    if(s.length == 5){
        res = s.slice(4,5);
    } else {
        res = s.slice(4,6);
    }

    return parseInt(res);
}

//sor szama
function get_row_num(s){
    var res;

    if(s.length == 5){
        res = s.slice(4,5);
    } else {
        res = s.slice(4,6);
    }

    return parseInt(res);
}