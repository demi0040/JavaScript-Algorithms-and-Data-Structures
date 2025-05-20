let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cashInput = document.getElementById("cash");
const changeDueDisplay = document.getElementById("change-due");
const purchaseButton = document.getElementById("purchase-btn");
const priceDisplay = document.getElementById("price-display");
const cidDisplay = document.getElementById("cid-display");

// Currency unit values in cents, from highest to lowest
const Roster = [
  { name: "ONE HUNDRED", val: 10000 },
  { name: "TWENTY", val: 2000 },
  { name: "TEN", val: 1000 },
  { name: "FIVE", val: 500 },
  { name: "ONE", val: 100 },
  { name: "QUARTER", val: 25 },
  { name: "DIME", val: 10 },
  { name: "NICKEL", val: 5 },
  { name: "PENNY", val: 1 },
];

// Function to update displays for price and CID
function updateDisplays() {
  priceDisplay.textContent = `$${price.toFixed(2)}`;
  cidDisplay.textContent = JSON.stringify(cid);
}

// Initial display update
updateDisplays();

purchaseButton.addEventListener("click", () => {
  // Update displays in case price/cid were changed by tests
  updateDisplays();

  const cash = parseFloat(cashInput.value);

  changeDueDisplay.innerHTML = ""; // Clear previous message

  if (isNaN(cash)) {
    changeDueDisplay.textContent = "Please enter a valid amount for cash.";
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDueDisplay.textContent =
      "No change due - customer paid with exact cash";
    return;
  }

  let changeDueInCents = Math.round((cash - price) * 100);

  let totalCIDInCents = cid.reduce(
    (sum, [, amount]) => sum + Math.round(amount * 100),
    0,
  );

  if (totalCIDInCents < changeDueInCents) {
    changeDueDisplay.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Attempt to make change
  let changeToGiveArr = [];
  let remainingChangeDueInCents = changeDueInCents;

  // Create a map of current cash in drawer (cid) in cents for easy lookup
  let cidMapInCents = new Map();
  cid.forEach(([name, amount]) => {
    cidMapInCents.set(name, Math.round(amount * 100));
  });

  for (const { name: unitName, val: unitValueInCents } of Roster) {
    let amountInDrawerForUnitCents = cidMapInCents.get(unitName) || 0;
    let amountReturnedForUnitCents = 0;

    while (
      remainingChangeDueInCents >= unitValueInCents &&
      amountInDrawerForUnitCents > 0
    ) {
      remainingChangeDueInCents -= unitValueInCents;
      // Deduct from the local copy of amount in drawer for this unit
      amountInDrawerForUnitCents -= unitValueInCents;
      amountReturnedForUnitCents += unitValueInCents;
    }

    if (amountReturnedForUnitCents > 0) {
      changeToGiveArr.push([unitName, amountReturnedForUnitCents / 100]);
    }
  }

  if (remainingChangeDueInCents > 0) {
    changeDueDisplay.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let changeOutputString = changeToGiveArr
    .map((item) => `${item[0]}: $${item[1].toFixed(2)}`)
    .join(" ");

  if (totalCIDInCents === changeDueInCents) {
    changeDueDisplay.textContent = `Status: CLOSED ${changeOutputString}`;
  } else {
    changeDueDisplay.textContent = `Status: OPEN ${changeOutputString}`;
  }
});
