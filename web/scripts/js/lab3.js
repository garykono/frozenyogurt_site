function performProblemFour() {
    var paras = document.getElementsByTagName("p");
    for (i = 0; i < paras.length; i++) {
        paras[i].style.backgroundColor = "black";
        paras[i].style.color = "yellow";
    }
}

function performProblemFive() {
    var para = document.getElementById("p5");
    for(i = 2; i <= 10; i++) {
        //Add image
        var image = document.createElement("img");
        image.src="images/cards/" + i + "S.jpg";
        image.alt=i + " of spades card";
        image.style.width="50px";
        para.appendChild(image);
    }
}