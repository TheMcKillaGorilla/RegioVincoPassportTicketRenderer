// HTML
// 1) PROVIDE A SCROLLABLE BOX INTO WHICH SVGs CAN BE APPENDED
// 2) PROVIDE CONTROLS FOR ENTERING:
// STAMP TYPE
// REGION NAME
// DATE
// COLOR
// ROTATION
// TRANSLATION
// 3) PROVIDE ADD VISA BUTTON TO TAKE INPUT FROM CONTROLS, MAKE A VISA, AND APPEND SVG

// SETUP THE CONTROLS WITH INITIAL VALUES
//let now = new Date().toDateInputValue();
//document.getElementById("dateDatePicker").value = now;


function addTicket() {
    // MAKE AN SVG DISPLAY PANE
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, 'width', '300');
    svg.setAttributeNS(null, 'height', '300');

    // AND PUT IT IN THE VISAS BOX    
    let visasBox = document.getElementById("visas-box");
    visasBox.appendChild(svg);
    visasBox.appendChild(document.createElement("br"));

    // GET ALL THE SETTINGS    
    let stampComboBox = document.getElementById("stamp-type");
    let stampType = stampComboBox.options[stampComboBox.selectedIndex].value;
    let regionName = document.getElementById("regionNameTextField").value;
    let nameFontSize = document.getElementById("nameFontSizeSlider").value;
    let nameY = document.getElementById("nameYSlider").value;
    let date = document.getElementById("dateDatePicker").value;
    let dateFontSize = document.getElementById("dateFontSizeSlider").value;
    let dateY = document.getElementById("dateYSlider").value;
    let color = document.getElementById("colorColorPicker").value;
    let borderThickness = document.getElementById("borderThicknessSlider").value;
    let translationX = document.getElementById("translationXSlider").value;
    let translationY = document.getElementById("translationYSlider").value;
    let rotation = document.getElementById("rotationSlider").value;

    // NOW GENERATE THE SVG
    generateStamp(svg, stampType, regionName, nameFontSize, nameY, date, dateFontSize, dateY, color, borderThickness, translationX, translationY, rotation);
}

function loadSpanText(spanId, text) {
    let span = document.getElementById(spanId);
    span.innerHTML = text;
}

function clearTickets() {
    let ticketsBox = document.getElementById("tickets-box");
    ticketsBox.innerHTML = "";
}

function updateTicket() {
    let destination = document.getElementById("destinationTextField").value;
    let carrier = document.getElementById("carrierTextField").value;
    let travelModeComboBox = document.getElementById("travel-mode-select");
    let travelMode = travelModeComboBox.options[travelModeComboBox.selectedIndex].value;
    let seatComboBox = document.getElementById("seat-select");
    let seat = seatComboBox.options[seatComboBox.selectedIndex].value;
    let departureDate = document.getElementById("departureDatePicker").value;
    let departureTime = document.getElementById("departureTimePicker").value;
    let duration = document.getElementById("durationTimePicker").value;
    let gradeComboBox = document.getElementById("grade-select");
    let grade = gradeComboBox.options[gradeComboBox.selectedIndex].value;
    let score = document.getElementById("scoreSlider").value;
    let strokeColor = document.getElementById("strokeColorPicker").value;
    let fillColor = document.getElementById("fillColorPicker").value;

    let ticketWidthSlider = document.getElementById("ticketWidthSlider");
    loadSpanText("ticket-width-span", ticketWidthSlider.value);
    let ticketHeightSlider = document.getElementById("ticketHeightSlider");
    loadSpanText("ticket-height-span", ticketHeightSlider.value);

    let displayPane = document.getElementById("ticket-display-pane");

    // FIRST CLEAR THE DISPLAY PANE
    displayPane.innerHTML = "";
    //displayPane.setAttribute("width", ticketWidthSlider.value);
    //displayPane.setAttribute("height", ticketHeightSlider.value);

    let ticketProperties = {
        destination: destination,
        carrier: carrier,
        travelMode: travelMode,
        seat: seat,
        departureDate: departureDate,
        departureTime: departureTime,
        duration: duration,
        grade: grade,
        score: score,
        strokeColor: strokeColor,
        fillColor: fillColor,
        borderThickness: 2
    }

    let ticketDisplayProperties = {
        dimensions: { width: 500, height: 200 },
        destinationStyle: { fontSize: 14, position: { x: 60, y: 90 } },
        carrierStyle: { fontSize: "14pt", position: { x: 200, y: 200 } },
        travelModeStyle: { scale: 2.0, position: { x: 50, y: 30 } },
        seatStyle: { scale: 2.0, position: { x: 500, y: 30 } },
        timeStyle: { fontSize: "14pt", position: { x: 100, y: 200 } },
        gradeStyle: { fontSize: "14pt", position: { x: 100, y: 200 } },
        percentageStyle: { fontSize: "14pt", position: { x: 100, y: 200 } },
        earnedTitle: { scale: 1.0, position: { x: 100, y: 200 } },
        stampStyle: { scale: 1.0, position: { x: 400, y: 400 } }
    };

    // NOW GENERATE THE SVG
    generateTicket(displayPane, ticketProperties, ticketDisplayProperties);
}

// SETUP WITH DEFAULT INITIAL VALUES
document.getElementById("departureDatePicker").defaultValue = "2022-03-18";
document.getElementById("departureTimePicker").defaultValue = "01:23";
document.getElementById("durationTimePicker").defaultValue = "04:59";
updateTicket();