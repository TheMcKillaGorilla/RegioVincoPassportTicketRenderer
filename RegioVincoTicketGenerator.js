const svgns = "http://www.w3.org/2000/svg";
function generateSVG(div) {
    let svg = document.createElementNS(svgns, 'svg');
}
function generateDateString(dateString) {
    let date = new Date(dateString);
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    dateString = "" + date.getDate();
    dateString += " " + months[date.getMonth()];
    let year = date.getFullYear();
    dateString += " " + year;
    return dateString;
}
function initSVGColor(svg, stroke, fill, strokeWidth) {
    svg.setAttributeNS(null, 'fill', fill)
    svg.setAttributeNS(null, 'stroke', stroke);
    svg.setAttributeNS(null, 'stroke-width', strokeWidth);
}
function generateBorder(svgPane, ticket, ticketDisplay) {   
    let paneWidth = svgPane.getBoundingClientRect().width; 
    let paneHeight = svgPane.getBoundingClientRect().height;
    let roundedRectangle = document.createElementNS(svgns, 'rect');
    let ticketWidth = ticketDisplay.dimensions.width;
    let ticketX = (paneWidth/2) - (ticketWidth/2);
    let ticketHeight = ticketDisplay.dimensions.height;
    let ticketY = (paneHeight/2) - (ticketHeight/2);
    roundedRectangle.setAttributeNS(null, 'x', ticketX);
    roundedRectangle.setAttributeNS(null, 'y', ticketY);
    roundedRectangle.setAttributeNS(null, 'width', ticketWidth);
    roundedRectangle.setAttributeNS(null, 'height', ticketHeight);
    roundedRectangle.setAttributeNS(null, 'rx', 15);
    initSVGColor(roundedRectangle, ticket.strokeColor, ticket.fillColor, ticket.borderThickness);
    svgPane.appendChild(roundedRectangle);
}
function generateRevioVincoStamp() {

}
function generateDestinationText(svgPane, ticket, ticketDisplay) {
    let destinationText = document.createElementNS(svgns, 'text');
    destinationText.textContent = "Destination: " + ticket.destination;
    destinationText.setAttributeNS(null, 'stroke', ticket.strokeColor);
    destinationText.setAttributeNS(null, 'fill', ticket.strokeColor);
    destinationText.setAttributeNS(null, 'style', 'font-size:' + ticketDisplay.destinationStyle.fontSize + 'pt');
    destinationText.setAttribute('x', ticketDisplay.destinationStyle.position.x);
    destinationText.setAttribute('y', ticketDisplay.destinationStyle.position.y);
    svgPane.appendChild(destinationText);
}
function generateTravelMode(svgPane, ticket, ticketDisplay) {
    let travelModePath = document.createElementNS(svgns, 'path');
    if (ticket.travelMode === "Air")
        travelModePath.setAttributeNS(null, 'd', "M20.56 3.91C21.15 4.5 21.15 5.45 20.56 6.03L16.67 9.92L18.79 19.11L17.38 20.53L13.5 13.1L9.6 17L9.96 19.47L8.89 20.53L7.13 17.35L3.94 15.58L5 14.5L7.5 14.87L11.37 11L3.94 7.09L5.36 5.68L14.55 7.8L18.44 3.91C19 3.33 20 3.33 20.56 3.91Z");
    else if (ticket.travelMode === "Rail")
        travelModePath.setAttributeNS(null, 'd', "M12,2C8,2 4,2.5 4,6V15.5A3.5,3.5 0 0,0 7.5,19L6,20.5V21H8.23L10.23,19H14L16,21H18V20.5L16.5,19A3.5,3.5 0 0,0 20,15.5V6C20,2.5 16.42,2 12,2M7.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,14A1.5,1.5 0 0,1 9,15.5A1.5,1.5 0 0,1 7.5,17M11,10H6V6H11V10M13,10V6H18V10H13M16.5,17A1.5,1.5 0 0,1 15,15.5A1.5,1.5 0 0,1 16.5,14A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 16.5,17Z");
    else
        travelModePath.setAttributeNS(null, 'd', "M6,6H18V9.96L12,8L6,9.96M3.94,19H4C5.6,19 7,18.12 8,17C9,18.12 10.4,19 12,19C13.6,19 15,18.12 16,17C17,18.12 18.4,19 20,19H20.05L21.95,12.31C22.03,12.06 22,11.78 21.89,11.54C21.76,11.3 21.55,11.12 21.29,11.04L20,10.62V6C20,4.89 19.1,4 18,4H15V1H9V4H6A2,2 0 0,0 4,6V10.62L2.71,11.04C2.45,11.12 2.24,11.3 2.11,11.54C2,11.78 1.97,12.06 2.05,12.31M20,21C18.61,21 17.22,20.53 16,19.67C13.56,21.38 10.44,21.38 8,19.67C6.78,20.53 5.39,21 4,21H2V23H4C5.37,23 6.74,22.65 8,22C10.5,23.3 13.5,23.3 16,22C17.26,22.65 18.62,23 20,23H22V21H20Z");
    
    travelModePath.setAttributeNS(null, 'stroke', ticket.strokeColor);
    travelModePath.setAttributeNS(null, 'fill', ticket.strokeColor);
    
    let s = " scale(" + ticketDisplay.travelModeStyle.scale + ") ";
    let r = " rotate(" + 0 + ") ";
    let t = " translate(" + ticketDisplay.travelModeStyle.position.x + "," + ticketDisplay.travelModeStyle.position.y + ") ";
    let combinedTransform = t + r + s;
    travelModePath.setAttributeNS(null, 'transform', combinedTransform);
    svgPane.appendChild(travelModePath);
}
function generateSeat(svgPane, ticket, ticketDisplay) {
    let seatPath = document.createElementNS(svgns, 'path');
    if (ticket.seat === "Regions")
        seatPath.setAttributeNS(null, 'd', "M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z");
    else if (ticket.seat === "Capitals")
        seatPath.setAttributeNS(null, 'd', "M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M10,10V17H13V10M4,10V17H7V10H4Z");
    else if (ticket.seat === "Leaders")
        seatPath.setAttributeNS(null, 'd', "M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z");
    else if (ticket.seat === "Flags")
        seatPath.setAttributeNS(null, 'd', "M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z");
    else
        seatPath.setAttributeNS(null, 'd', "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z");
    
    seatPath.setAttributeNS(null, 'stroke', ticket.strokeColor);
    seatPath.setAttributeNS(null, 'fill', ticket.strokeColor);
    
    let s = " scale(" + ticketDisplay.seatStyle.scale + ") ";
    let r = " rotate(" + 0 + ") ";
    let t = " translate(" + ticketDisplay.seatStyle.position.x + "," + ticketDisplay.seatStyle.position.y + ") ";
    let combinedTransform = t + r + s;
    seatPath.setAttributeNS(null, 'transform', combinedTransform);
    svgPane.appendChild(seatPath);
}
function generateDateText() {

}
function generateParentText() {

}
function generateResultsText() {
    // TIME
    // GRADE
}
function generateTitleIconText() {
    // "AMBASSADOR CLASS SEATING EARNED"
}
function generateTicket(svgPane, ticket, ticketDisplay) {
    generateBorder(svgPane, ticket, ticketDisplay);
    generateDestinationText(svgPane, ticket, ticketDisplay);
    generateTravelMode(svgPane, ticket, ticketDisplay);
    generateSeat(svgPane, ticket, ticketDisplay);
}