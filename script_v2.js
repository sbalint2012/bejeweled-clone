let selected_gems = [];

let green_gem = []; //gem3
let red_gem = []; //gem4
let yellow_gem = []; //gem1
let blue_gem = []; //gem2
let score = 0;
let player = "Player";

$(function () {
    generate_gems();
    fill_array_zero();

    get_color("gem3", green_gem);
    get_color("gem4", red_gem);
    get_color("gem1", yellow_gem);
    get_color("gem2", blue_gem);

    var tbody = $('#scoreBoard tbody');
    var newRow = $('<tr>');
    newRow.append($('<td>').text(player)).css("color","red");
    newRow.append($('<td>').text(score));
    tbody.append(newRow);


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
       // console.log(selected_gems);
        if(selected_gems.length == 2) {
            move_gems(selected_gems);

            fill_array_zero();
            get_color("gem3", green_gem);
            get_color("gem4", red_gem);
            get_color("gem1", yellow_gem);
            get_color("gem2", blue_gem);

            if(selected_gems[0][0] === "gem3"){
                console.log("GREEN");
                horizontalCheckArray(green_gem);
                verticalCheckArray(green_gem);
                horizontalCheckArray(red_gem);
                verticalCheckArray(red_gem);
                horizontalCheckArray(yellow_gem);
                verticalCheckArray(yellow_gem);
                horizontalCheckArray(blue_gem);
                verticalCheckArray(blue_gem);
            }
            if(selected_gems[0][0] === "gem4"){
                console.log("RED");
                horizontalCheckArray(red_gem);
                verticalCheckArray(red_gem);
                horizontalCheckArray(green_gem);
                verticalCheckArray(green_gem);
                horizontalCheckArray(yellow_gem);
                verticalCheckArray(yellow_gem);
                horizontalCheckArray(blue_gem);
                verticalCheckArray(blue_gem);
            }
            if(selected_gems[0][0] === "gem1"){
                console.log("YELLOW");
                horizontalCheckArray(yellow_gem);
                verticalCheckArray(yellow_gem);
                horizontalCheckArray(red_gem);
                verticalCheckArray(red_gem);
                horizontalCheckArray(green_gem);
                verticalCheckArray(green_gem);
                horizontalCheckArray(blue_gem);
                verticalCheckArray(blue_gem);
            }
            if(selected_gems[0][0] === "gem2"){
                console.log("BLUE");
                horizontalCheckArray(blue_gem);
                verticalCheckArray(blue_gem);
                horizontalCheckArray(yellow_gem);
                verticalCheckArray(yellow_gem);
                horizontalCheckArray(red_gem);
                verticalCheckArray(red_gem);
                horizontalCheckArray(green_gem);
                verticalCheckArray(green_gem);
            }

            selected_gems = [];
            addNewGem();
            $('#score').text("Pontszám: "+score);
            console.log("Pontszám: "+score)
            var newPlayerScoreCell = $("#scoreBoard td:contains('" + player + "')").next();
            newPlayerScoreCell.text(score);
            sortByScore();
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

function fill_array_zero(){
    for (let i = 0; i < 10; i++) {
        green_gem[i] = [];
        red_gem[i] = [];
        yellow_gem[i] = [];
        blue_gem[i] = [];
        for (let j = 0; j < 10; j++) {
            green_gem[i][j] = 0;
            red_gem[i][j] = 0;
            yellow_gem[i][j] = 0;
            blue_gem[i][j] = 0;
        }
    }
}

function get_color(color, array){
    let i = 0, j = 0;
    $('#gameArea').children().each(function() {
        if ($(this).hasClass(color)) {
            array[i][j] = 1;
        }
        j++;
        if(j == 10){
            j = 0;
            i++;
        }
    });

    //console.log(color);
    //console.log(array);
}

function change_color(array) {
    $('#gameArea img').css('background-color', '#e3e3e3');
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] == 2) {
                //console.log("ződ");
                $('#gameArea img').eq(i * 10 + j).remove();//css('background-color','red');

            }
        }
    }
}

function horizontalCheckArray(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            // Check for horizontal sequence of three 1's
            if (j + 2 < arr[i].length && (arr[i][j] === 1 || arr[i][j] === 2) && (arr[i][j+1] === 1 || arr[i][j+1] === 2) && (arr[i][j+2] === 1 || arr[i][j+2] === 2)) {
                arr[i][j] = arr[i][j+1] = arr[i][j+2] = 2;
            }
        }
    }
    change_color(arr);
    //console.log(arr);

}

function verticalCheckArray(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            // Check for vertical sequence of three 1's
            if (i + 2 < arr.length && (arr[i][j] === 1 || arr[i][j] === 2) && (arr[i+1][j] === 1 || arr[i+1][j] === 2) && (arr[i+2][j] === 1 || arr[i+2][j] === 2)) {
                arr[i][j] = arr[i+1][j] = arr[i+2][j] = 2;
            }
        }
    }
    change_color(arr);
    //console.log(arr);
}

function addNewGem(){
    var imageCount = $('#gameArea img').length;
    console.log("Szám: "+imageCount);
    for (let i = 0; i < 100-imageCount; i++) {
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
        gem.appendTo('#gameArea');
    }
    score += (100-imageCount)*10;
    regenerateIndex();
}

function regenerateIndex() {
    let i = 1, j = 1;
    $('#gameArea').children().each(function() {
       let c = slice_class($(this).attr('class'));
       //console.log(c[0]);
       $(this).removeClass().addClass(c[0]).addClass('col_'+j).addClass('row_'+i);
       j++;
       if(j == 11){
           j = 1;
           i++;
       }
    });
}

function sortByScore() {
    var $table = $('table');
    var $tbody = $table.find('tbody');
    var $rows = $tbody.find('tr');

    // sort the rows by score
    $rows.sort(function(a, b) {
        var scoreA = parseInt($(a).find('td:nth-child(2)').text());
        var scoreB = parseInt($(b).find('td:nth-child(2)').text());
        return scoreB - scoreA;
    });

    // append the sorted rows to the table
    $tbody.empty();
    $rows.appendTo($tbody);
}