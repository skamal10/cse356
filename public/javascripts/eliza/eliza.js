 var sub= function(){

 var human={};
  var  formData = $("#form").serializeArray();
        human['human']=formData[0].value;  
	$("#response_box").append('<p><font color="GREEN"><b>YOU:</font>\t</b>'+human['human']+'</p>');  
 
    $.ajax({
        type: 'POST',
        url: '/eliza/DOCTOR',
        data: human,
        success: function(data){
        var response = JSON.parse(data);
		$("#form")[0].reset();
                $("#response_box").append('<p><font color="blue"><b>ELIZA:</font>\t</b>'+response["eliza"]+'</p>');
		$('#response_box').scrollTop($('#response_box')[0].scrollHeight); 
        },
        });
                return false;
   }


var subName= function() 
{
var name= $('#formName').serialize();
 $.ajax({
	type: 'POST',
	data: name,
	success: function(data){
	 $('#post_data').append(
		$('<p/>').text(data)
		);
	hide_form();
	$('#eliza_input').show();
	}
});
return false;
}

var hide_form=function(){

$("#name_box").hide();

}
