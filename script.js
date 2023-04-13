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

    if(check_step(arr) && check_dist(arr)){
        $('#game_area').find(gem_1_class).each(function (){
            $(this).removeClass(arr[0][0]);
            $(this).attr('class', arr[1][0] + " " + $(this).attr('class'));
        });

        $('#game_area').find(gem_2_class).each(function (){
            $(this).removeClass(arr[1][0]);
            $(this).attr('class', arr[0][0] + " " + $(this).attr('class'));
        });
    }
    check_dist(arr);

}

//lepes ellenorzes, csak vizszintes vagy fuggoleges
function check_step(arr){
    if(arr[0][1] == arr[1][1] || arr[0][2] == arr[1][2]){
        return true;
    }
    return false;
}
//lepes tavolsag ellenorzes
function check_dist(arr){
    var gem_1_col;
    var gem_1_row;
    var gem_2_col;
    var gem_2_row;

    if(arr[0][1].length == 8){
        gem_1_col = arr[0][1].slice(7,8);
    } else {
        gem_1_col = arr[0][1].slice(7,9);
    }
    if(arr[1][1].length == 8){
        gem_2_col = arr[1][1].slice(7,8);
    } else {
        gem_2_col = arr[1][1].slice(7,9);
    }

    if(arr[0][2].length == 5){
        gem_1_row = arr[0][2].slice(4,5);
    } else {
        gem_1_row = arr[0][2].slice(4,6);
    }
    if(arr[1][2].length == 5){
        gem_2_row = arr[1][2].slice(4,5);
    } else {
        gem_2_row = arr[1][2].slice(4,6);
    }

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

$(function () {
    generate_gems();
});