// selecting html elements (implementing DOM concept)
let addTo = document.querySelector(".add-to");
let table = document.querySelector("table");
let input = document.querySelectorAll("input");
let totalRes = document.querySelector(".total-res");
let noEle = document.querySelector(".no-ele");
// creating an array to assemble all the products prices
let totalpr = [];
// making an event listener for the add to the cart button
addTo.addEventListener("click", async () => {
  // fetching the data from the json file and store it in an array
  let theJson = await fetch("../data.json");
  let data = await theJson.json();
  // making initial total price
  itemprice = 0;
  // getting values of the html inputs
  let barcode = document.getElementById("barcode").value;
  let quant = document.getElementById("quant").value;
  // checking if the two inputs are filled
  if (quant === "" || barcode === "") {
    input[0].style.cssText = "border-bottom: 1px solid red";
    input[1].style.cssText = "border-bottom: 1px solid red";
  } else {
    input[0].style.cssText = "border-bottom: 1px solid var(--native2-color)";
    input[1].style.cssText = "border-bottom: 1px solid var(--native2-color)";
    // looping over the json list to find the barcode value
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === barcode) {
        // multiply the item price in the json array by the quant input
        let itemprice = data[i].price * quant;
        // creating table row and cells and appending the data to them
        let tr = document.createElement("tr");
        let tdname = document.createElement("td");
        let tdquant = document.createElement("td");
        let tdprice = document.createElement("td");
        tdname.append(data[i].name);
        tdquant.append(quant);
        tdprice.append(itemprice);
        tr.append(tdname, tdquant, tdprice);
        table.append(tr);
        // adding the new itemprice to the totalpr array
        totalpr.push(itemprice);
      }
    }
    // getting the sum of the totalpr array and append it to html Element
    let sum = totalpr.reduce((partialSum, a) => partialSum + a, 0);
    console.log(sum);
    totalRes.innerHTML = `Total : ${sum}`;
  }
});
