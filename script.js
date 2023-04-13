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

    console.log(gem_1_class);
    $('#game_area').find(gem_1_class).each(function (){
            $(this).removeClass(arr[0][0]);
        $(this).attr('class', arr[1][0] + " " + $(this).attr('class'));
        });
    $('#game_area').find(gem_2_class).each(function (){
        $(this).removeClass(arr[1][0]);
        $(this).attr('class', arr[0][0] + " " + $(this).attr('class'));
    });
}

function check_gem(){

}

$(function () {
    generate_gems();
});