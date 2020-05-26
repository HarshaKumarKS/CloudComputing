$(document).ready( function() { 
	
	//For carousal implementation
	$('.carousal-wrp').slick({
		  dots: true,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 1,
		  adaptiveHeight: false,
		  prevArrow: $('.prev'),
		  nextArrow: $('.next')
		});
	
	//on report click function
	$(".generate-report").click(function() {
		

		var name = $("#yourName").val();
		var email = $("#email-id").val();
		var gender = $("input[name='sex']:checked").val();
		var  age = $("#age").val();
		var  heightcal = parseFloat($("#height-cal").val());
		heightcal =  heightcal/100;
		var  weightcal = parseFloat($("#weight-cal").val());
		var bmi = (weightcal )/ (heightcal*heightcal);
		bmi =bmi.toFixed(2);
		var  cholestrol = $("#chole-cal").val();
		var  sysBP = $("#sysBp-cal").val();
		var  diaBP = $("#diaBp-cal").val();
		var  heartrate = $("#heart-cal").val();
		var  glucose = $("#gluc-cal").val();
		var smoke = $("#cig-cal").val();
		var bpmeds = $("input[name='bpmed']:checked"). val();
		var hyptension = $("input[name='hypeten']:checked"). val();
		var diabetese = $("input[name='diab']:checked"). val();
		var stroke  = $("input[name='stroke']:checked"). val();
		
	  
		
		//check if all the field are entered
		if(name && email && gender && age &&  bmi &&  cholestrol &&  sysBP && bpmeds &&  diaBP && heartrate && glucose && smoke &&  hyptension  &&  diabetese && stroke) {
			
			var pre_response  =  $.ajax({
				type : 'GET',
				url : "http://3.91.184.64/predict",
				data : "Sex_male="+gender+"&age="+age+"&cigsPerDay="+smoke+"&BPMeds="+bpmeds+"&prevalentStroke="+stroke+"&prevalentHyp="+hyptension+"&diabetes="+diabetese+"&totChol="+cholestrol+"&sysBP="+sysBP+"&diaBP="+diaBP+"&BMI="+bmi+"&heartRate="+heartrate+"&glucose="+glucose,
				async: false
			}).responseText;

			


			var myResult = String(parseInt(pre_response[0]));
			$('#output').text("Please wait while we generate the report.."+ myResult);

		var genSex;

		
        if(gender == 1) {
			genSex = "Male";
		} else {
			genSex = "Female";
		}



		var jsonData = { "EmailID" : email,
            "Name": name,
            "Sex" : genSex,
            "Age" : age,
            "BMI" : bmi,
            "BpMed" : bpmeds,
            "Cholestrol" : cholestrol,
            "DiaBP" : diaBP,
            "Diabetese" : diabetese,
            "Glucose" : glucose,
            "Heartrate" :  heartrate,
            "Hypertension" :  hyptension,
            "Smoke" :  smoke,
            "Stroke" :  stroke,
            "SysBP" : sysBP,
			"TenCHD" : myResult
		}

			

		$.ajax({
			crossDomain : true,
			url : 'https://4j7xgvwau8.execute-api.us-east-1.amazonaws.com/Dev/posttablecontents', 
			type : "POST",
			data :  JSON.stringify(jsonData),
			contentType: 'application/json; charset=utf-8',
			dataType : 'json',
			 success: function( data, textStatus, jQxhr ){
                    $('#response-pre').text( data );
                },
			 error: function( jqXhr, textStatus, errorThrown ){
                    $('#response-pre').html( errorThrown );
                }

		});	

		$(".reportBy").text(name);
		$("#Sex-td").html('').append(genSex);
			$("#Age-td").html('').append(age);
			$("#Smoke-td").html('').append(smoke);
			$("#BMI-td").html('').append(bmi);
			$("#Cholestrol-td").html('').append(cholestrol + "mg/DL");
			$("#Heartrate-td").html('').append(heartrate + " bpm");
			$("#Glucose-td").html('').append(glucose + "mg/DL");
			$("#SysBP-td").html('').append(sysBP + " mm Hg");
			$("#DiaBP-td").html('').append(diaBP + " mm Hg");
			
			

			if(cholestrol > 239) {
				$("#Cholestrol-tdr").html('').append("High");
		} else if  (cholestrol > 200 && cholestrol < 239){
			$("#Cholestrol-tdr").html('').append("Medium");
		} else {
			$("#Cholestrol-tdr").html('').append("Low");
		}

		if(heartrate > 120) {
				$("#Heartrate-tdr").html('').append("High");
		} else if  (heartrate > 100 && heartrate <120){
			$("#Heartrate-tdr").html('').append("Medium");
		} else {
			$("#Heartrate-tdr").html('').append("Low");
		}

		if(bmi > 30) {
				$("#BMI-tdr").html('').append("High");
		} else if  (bmi > 25 && bmi < 30){
			$("#BMI-tdr").html('').append("Medium");
		} else {
			$("#BMI-tdr").html('').append("Low");
		}

		if(sysBP > 140) {
				$("#SysBP-tdr").html('').append("High");
		} else if  (sysBP > 130 && sysBP < 140){
			$("#SysBP-tdr").html('').append("Medium");
		} else {
			$("#SysBP-tdr").html('').append("Low");
		}

		if(glucose > 130) {
				$("#Glucose-tdr").html('').append("High");
		} else {
			$("#Glucose-tdr").html('').append("Low");
		}

		if(diaBP > 90) {
				$("#DiaBP-tdr").html('').append("High");
		} else if  (diaBP > 80 && diaBP < 80){
			$("#DiaBP-tdr").html('').append("Medium");
		} else {
			$("#DiaBP-tdr").html('').append("Low");
		}

		if(age > 60) {
				$("#Age-tdr").html('').append("High");
		} else if  (age > 40 &&age <60){
			$("#Age-tdr").html('').append("Medium");
		} else {
			$("#Age-tdr").html('').append("Low");
		}

		if(smoke > 5) {
				$("#Smoke-tdr").html('').append("High");
		} else if  (smoke > 0 && smoke < 5){
			$("#Smoke-tdr").html('').append("Medium");
		} else {
			$("#Smoke-tdr").html('').append("Low");
		}

			if(bpmeds == 1) {
				$("#BpMed-td").html('').append("Yes");
				$("#BpMed-tdr").html('').append("Medium");
		} else {
			$("#BpMed-td").html('').append("No");
			$("#BpMed-tdr").html('').append("Low");
		} 

		if(hyptension == 1) {
				$("#Hypertension-td").html('').append("Yes");
				$("#Hypertension-tdr").html('').append("Medium");
		} else {
			$("#Hypertension-td").html('').append("No");
			$("#Hypertension-tdr").html('').append("Low");
		} 

		if(diabetese == 1) {
				$("#Diabetese-td").html('').append("Yes");
				$("#Diabetese-tdr").html('').append("Medium");
		} else {
			$("#Diabetese-td").html('').append("No");
			$("#Diabetese-tdr").html('').append("Low");
		} 

		if(stroke == 1) {
				$("#Stroke-td").html('').append("Yes");
				$("#Stroke-tdr").html('').append("Medium");
		} else {
			$("#Stroke-td").html('').append("No");
			$("#Stroke-tdr").html('').append("Low");
		} 
		
		if(myResult == 1) {
			$("#TenCHD-td").html('').append("Result ->");
			$("#TenCHD-tdr").html('').append("High");
			$(".giveItStrait").text("High");
		} else {
			$("#TenCHD-td").html('').append("Result ->");
			$("#TenCHD-tdr").html('').append("Low");
			$(".giveItStrait").text("Low");
		}

		
			


		$(".survey-container").hide();
		$(".report-container").show();	

			
		}
		else {
			$(".warning-msg").show();
		}			

		
            // "Age-td" : age,
            // "BMI-td" : bmi,
            // "BpMed-td" : bpmeds,
            // "Cholestrol-td" : cholestrol,
            // "DiaBP-td" : diaBP,
            // "Diabetese-td" : diabetese,
            // "Glucose-td" : glucose,
            // "Heartrate-td" :  heartrate,
            // "Hypertension-td" :  hyptension,
            // "Smoke-td" :  smoke,
            // "Stroke-td" :  stroke,
            // "SysBP-td" : sysBP,
			// "TenCHD-td" : myResult

			
			
			
		
	});
		    

	
/* 	$('#sub-mail').click(function() {
		var nameB = $("#yourName").val();
		var emailB= $("#email-id").val();

		if (nameB && emailB) {
			$(".email-name").hide();	
			$(".survey-container").show();	
		} else {
			$("#email-empty").show();	
		}

		$.ajax({
			crossDomain : true,
			url : 'https://4j7xgvwau8.execute-api.us-east-1.amazonaws.com/Dev/posttablecontents', 
			type : "POST",
			data :  JSON.stringify(jsonData),
			contentType: 'application/json; charset=utf-8',
			dataType : 'json',
			 success: function( data, textStatus, jQxhr ){
                    $('#response-pre').text( data );
                },
			 error: function( jqXhr, textStatus, errorThrown ){
                    $('#response-pre').html( errorThrown );
                }

		});
		
	}); */





	
});