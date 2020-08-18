var dropdown=$("#select-breed");

$.ajax({
    url:'https://dog.ceo/api/breeds/list/all',
    method:'GET',
    success:function(data){
        let droplist=data.message;
        for(let item in droplist){
            console.log(item);
            dropdown.append('<option value="'+ item +'">' + item +'</option>');
        }
    },
    error:function(){
        console.log("error");
    }
});


dropdown.change(function(){
    var breed = dropdown.val();
    var full = "https://dog.ceo/api/breed/" + breed + "/list";
    console.log(full);
    $("#dog-sub-breeds").remove();
    $.ajax({
        url:full,
        method:'GET',
        success:function(data){
             if(data.message.length!=0){
                 dropdown.after('<select id="dog-sub-breeds"></select>');
                 var subDropdown = $("#dog-sub-breeds");
                 for(var i=0;i<data.message.length;i++){ 
                    var sub = data.message[i];
                     subDropdown.append('<option value="' + sub + '">' + sub + '</option>');
                                     
                 }
             }
        },
       error:function(){
        colsole.log("error in sub-breed");
       }
        
    });
    
});


function getImage(e){
    
    
    let breed = dropdown.val();
    let subBreed = $("#dog-sub-breeds").val();

    let fullUrl = "https://dog.ceo/api/breed/" + breed;
    if(subBreed !== undefined) {
        fullUrl += "/" + subBreed
    }    
    fullUrl += "/images";

     $("#image-breed img").remove();
    $.ajax({
        url:fullUrl,
        method:'GET',
        success:function(data){
         
           let imagesUrl = data.message;

        for (let imageUrl of imagesUrl) {
            $("#image-breed").append('<img src="' + imageUrl + '" alt="' + breed + '">');
             
         }
        },
        error:function(){
        console.log("error in image");
    }
    });
}




$(document).ready(function(){
    $('#button-get').click(getImage)
});

