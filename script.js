let gem_count = 100;

//Kovek generalasa, sor, oszlop es szin osztaly hozzaadas
function generate_gems(){
    var row = 1;
    var column = 1;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var gem = $('<div></div>');
            var color = Math.random();

            if(color < 0.25){
                gem.addClass('gem_1');
            } else if(color < 0.50){
                gem.addClass('gem_2');
            } else if(color < 0.75){
                gem.addClass('gem_3');
            } else{
                gem.addClass('gem_4');
            }

            gem.addClass('column_'+column);
            gem.addClass('row_'+row);
            gem.appendTo('#game_area');

            column++;
        }
        column = 1;
        row++;
    }
}

var selected_gems = [];

//Eger kattintas a kore, hatasara a sor oszlop azonosito atadasa
window.addEventListener('click', function(e) {
        let getClass = e.target.className;
        if (getClass !== '') {
            //console.log(getClass);
            //TODO: max 2 kivalaszott es ugyanazt nem lehet ketszer
            selected_gems.push(get_row_col(getClass));
            console.log(selected_gems);
            if(selected_gems.length == 2){
                move_gems(selected_gems);
                selected_gems = [];
            }

        } else {
            //console.log("An element without class was clicked.");
        }
    }
);

function get_row_col(s){
    var splitted = s.split(" ");
    var res = [];
    res.push(splitted[0]);
    res.push(splitted[1]);
    res.push(splitted[2]);

    return res;
}

//kivalasztott kovek megcserelese
function move_gems(arr){
    var gem_1_class = "." + arr[0][0] + "." + arr[0][1] + "." + arr[0][2];
    var gem_2_class = "." + arr[1][0] + "." + arr[1][1] + "." + arr[1][2];

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

//lepes ellenorzes, csak vizszintes vagy fuggoleges
function check_step(arr){

    if(arr[0][1] == arr[1][1] || arr[0][2] == arr[1][2]){
        if(check_dist(arr)){
            check_col_same(arr);
            return true;
        }

    }
    return false;
}

//lepes tavolsag ellenorzes
function check_dist(arr){
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

    if(s.length == 8){
        res = s.slice(7,8);
    } else {
        res = s.slice(7,9);
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

//megnezi van-e legalabb 3 egyforma egymas mellett
function check_col_same(arr){


    return true;
   /* var new_color = arr[0][0];
    var dest_col = arr[1][1];
    var dest_row = arr[1][2];

    var col_array = [];
    var row_array = [];

    var col_array_split = [];
    var row_array_split = [];

    var possible_step = false;

    $('#game_area').find('.' + dest_col).each(function (){
        col_array.push($(this).attr('class'));
    });

    $('#game_area').find('.' + dest_row).each(function (){
        row_array.push($(this).attr('class'));
    });

    for(var i = 0; i < col_array.length; i++){
        col_array_split.push(get_row_col(col_array[i]));
        row_array_split.push(get_row_col(row_array[i]));
    }

    for (let i = 0; i < 10; i++) {
        //console.log(col_array_split[i][0]);
    }

    //console.log(row_array_split[0][0] === new_color);

    if(get_col_num(dest_col) < 3 ){
        if(col_array_split[get_col_num(dest_col)][0] === new_color && col_array_split[get_col_num(dest_col)+1][0] === new_color){
            possible_step = true;
            console.log("ALMA");
        }
    } else if(get_col_num(dest_col) > 8 ){
        if(col_array_split[get_col_num(dest_col)-3][0] === new_color && col_array_split[get_col_num(dest_col)-2][0] === new_color){
            possible_step = true;
        }
    } else if(get_col_num(dest_col) >= 3 && get_col_num(dest_col) <= 8 ){
        if(col_array_split[get_col_num(dest_col)][0] === new_color && col_array_split[get_col_num(dest_col)+1][0] === new_color && col_array_split[get_col_num(dest_col)-3][0] === new_color && col_array_split[get_col_num(dest_col)-2][0] === new_color){
            possible_step = true;
        }
    }
*/
    }

function check_row_same(arr){
    return true;
}


$(function () {
    generate_gems();
});