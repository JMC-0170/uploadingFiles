


var uploadField = document.getElementById("fileUpload");

uploadField.onchange = function() {
    if(this.files[0].size > 1000000){
       alert("File is too big!");
       this.value = "";
    };
};
