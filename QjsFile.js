// $(".1").click(function(){
//   var arr1 = ["11","12","13","14","15","16","17",]
//   for (n1s of arr1){
//     if ($(n1s).css("background-color")=="rgb(48, 96, 240)"){
//       $(n1s).css("background-color","yellow");
//     }
//   }
//
// })

var table = $("table tr");
var texth3 = $("h3");
var player1 = prompt("Enter Name(Player1): ");
var player2 = prompt("Enter Name(Player2): ");


function WinHighlight(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find("span").css({"border-color":"red"});
}

function reportWin(lsW){
  for (l of lsW){
    WinHighlight(l[0],l[1]);
  }
  console.log(lsW);
}

function inserting(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find("span").css({"background-color":color,"border-color":"pink"});
}

function checkcolor(rowIndex,colIndex) {
  if (rowIndex<0 || colIndex<0){
      return undefined;
  }else{
      return table.eq(rowIndex).find('td').eq(colIndex).find("span").css("background-color");
  }
}

function insertplace(colIndex) {
  var testing = checkcolor(5,colIndex);
  for (var row=5;row>-1;row--){
    if (checkcolor(row,colIndex) === "rgb(187, 187, 187)"){
      return row;
      break;
    } else if (checkcolor(row,colIndex) == undefined) {
      return undefined;
    }
  }
}

if (texth3.text() === "Let's get start!"){
  texth3.text(player1+":it is your turn, please pick a column to drop your green chip.");
}

function SwitchBetween(){
  var t1=player1+":it is your turn, please pick a column to drop your green chip."
  var t2=player2+":it is your turn, please pick a column to drop your yellow chip."
  WhoWin();
  if (texth3.text() === t1){
    var currentColor= "green";
  }else if(texth3.text() === t2){
    var currentColor= "yellow";
  }

  if (texth3.text() === t1) {
    texth3.text(t2);
  }else {
    texth3.text(t1);
  }
  return currentColor;
}

function matchcolor(a,b,c,d){
  if (a==b && b==c && c==d && a!= "rgb(187, 187, 187)" && a!== undefined){
    return true;
  }
}

function verti4(){
  var isWin = 0;
  var clor;
  for(var vars=0;vars<7;vars++){
    for (var invar=0;invar<3;invar++){
      if (matchcolor(checkcolor(invar,vars),checkcolor(invar+1,vars),checkcolor(invar+2,vars),checkcolor(invar+3,vars))){
        var torp = [[invar,vars],[invar+1,vars],[invar+2,vars],[invar+3,vars]];
        reportWin(torp);
        return true;
      }
    }
  }
}

function hori4(){
  var isWin = 0;
  var clor;
  for(var invar=0;invar<6;invar++){
    for (var vars=0;vars<4;vars++){
      if (matchcolor(checkcolor(invar,vars),checkcolor(invar,vars+1),checkcolor(invar,vars+2),checkcolor(invar,vars+3))){
        var torp = [[invar,vars],[invar,vars+1],[invar,vars+2],[invar,vars+3]];
        reportWin(torp);
        return true;
      }
    }
  }
}

function diagan4() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (matchcolor(checkcolor(row,col), checkcolor(row+1,col+1) ,checkcolor(row+2,col+2), checkcolor(row+3,col+3))) {
        var torp = [[row,col],[row+1,col+1],[row+2,col+2],[row+3,col+3]];
        reportWin(torp);
        console.log('diag1');
        return true;
      }else if (matchcolor(checkcolor(row,col), checkcolor(row-1,col+1) ,checkcolor(row-2,col+2), checkcolor(row-3,col+3))) {
        var torp = [[row,col],[row-1,col+1],[row-2,col+2],[row-3,col+3]];
        reportWin(torp);
        console.log('diag2');
        return true;
      }else {
        continue;
      }
    }
  }
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
   }
   console.log("Waiting")
}

function WhoWin() {
  var chkWL = [hori4,verti4];
}

// $(".board span").on("click",function(){
//   var col = $(this).closest("td").index();
//   // var toinsert = insertplace(col);
//   inserting(insertplace(col),col,SwitchBetween());
//   if (hori4() || verti4() || diagan4()){
//     var cchek = SwitchBetween();
//     console.log(cchek);
//     if (cchek == "green"){
//       texth3.text(player2+" has won!");
//     }else if (cchek == "yellow"){
//       texth3.text(player1+" has won!");
//     }
//   }
//   if ($(".board span").css("background-color") != "rgb(187, 187, 187)"){
//     texth3.text("It's a draw!");
//   }
// });

$(".board span").click(function (e) {
    var $this = $(this);
    if ($this.hasClass('clicked')){
        $this.removeClass('clicked');
        // alert("Double click");
        var col = $this.closest("td").index();
          // var toinsert = insertplace(col);
        inserting(insertplace(col),col,SwitchBetween());
        if (hori4() || verti4() || diagan4()){
          var cchek = SwitchBetween();
          console.log(cchek);
          if (cchek == "green"){
            texth3.text(player2+" has won!");
          }else if (cchek == "yellow"){
            texth3.text(player1+" has won!");
          }
        }
        if ($(".board span").css("background-color") != "rgb(187, 187, 187)"){
          texth3.text("It's a draw!");
        }
    }else{
        $this.addClass('clicked');
        setTimeout(function() {
            if ($this.hasClass('clicked')){
                $this.removeClass('clicked');
                // alert("Just one click!");
                var col = $this.closest("td").index();
                  // var toinsert = insertplace(col);
                inserting(insertplace(col),col,SwitchBetween());
                if (hori4() || verti4() || diagan4()){
                  var cchek = SwitchBetween();
                  console.log(cchek);
                  if (cchek == "green"){
                    texth3.text(player2+" has won!");
                  }else if (cchek == "yellow"){
                    texth3.text(player1+" has won!");
                  }
                }
                if ($(".board span").css("background-color") != "rgb(187, 187, 187)"){
                  texth3.text("It's a draw!");
                }
            }
        }, 300);
    }
});
