
				
	$.get("https://ipinfo.io", function(data) {
		
        console.log(data);
            $("#gfg").html(data.ip+" "+data.city);
        },'json')