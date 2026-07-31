// =================================================================
// C++ OOP Class Hierarchy Ported to ES6 JavaScript Classes
// =================================================================

class MenuItem {
  constructor(itemId, name, price) {
    if (this.constructor === MenuItem) {
      throw new Error("Cannot instantiate abstract class MenuItem");
    }
    this.itemId = itemId;
    this.name = name;
    this.price = price;
  }
  getId() { return this.itemId; }
  getName() { return this.name; }
  getPrice() { return this.price; }
}

// Food Subclass
class Food extends MenuItem {
  constructor(itemId, name, price, category) {
    super(itemId, name, price);
    this.category = category;
  }
  getCategory() { return this.category; }
}

// Drink Subclass
class Drink extends MenuItem {
  constructor(itemId, name, price) {
    super(itemId, name, price);
  }
}

// Factory Pattern
class MenuItemFactory {
  static createItem(type, itemId, name, price, category = "") {
    if (type === "Food") {
      return new Food(itemId, name, price, category);
    } else if (type === "Drink") {
      return new Drink(itemId, name, price);
    }
    return null;
  }
}

// Stock Class
class Stock {
  constructor(itemId, quantity) {
    this.itemId = itemId;
    this.totalQuantity = quantity;
    this.remainingQuantity = quantity;
  }
  getItemId() { return this.itemId; }
  getRemaining() { return this.remainingQuantity; }
  getSold() { return this.totalQuantity - this.remainingQuantity; }
  getTotal() { return this.totalQuantity; }

  reduceStock(qty = 1) {
    if (this.remainingQuantity >= qty) {
      this.remainingQuantity -= qty;
      return true;
    }
    return false;
  }

  addStock(qty) {
    this.totalQuantity += qty;
    this.remainingQuantity += qty;
  }
}

// Person Abstract Base Class
class Person {
  constructor(name, id) {
    if (this.constructor === Person) {
      throw new Error("Cannot instantiate abstract class Person");
    }
    this.name = name;
    this.id = id;
  }
  applydiscount(subtotal) { throw new Error("Virtual function applydiscount must be overridden"); }
  getrole() { throw new Error("Virtual function getrole must be overridden"); }
}

// Student Subclass
class Student extends Person {
  constructor(name, id) {
    super(name, id);
  }
  applydiscount(subtotal) {
    return subtotal; // No discount
  }
  getrole() {
    return "Student";
  }
}

// Employee Subclass
class Employee extends Person {
  constructor(name, id) {
    super(name, id);
  }
  applydiscount(subtotal) {
    return subtotal - subtotal * 0.05; // 5% discount
  }
  getrole() {
    return "Employee";
  }
}

// Menu Class aggregating items and stock
class Menu {
  constructor() {
    this.items = [];
    this.stocks = [];
  }

  addItem(item, quantity = 0) {
    if (item !== null) {
      this.items.push(item);
      this.stocks.push(new Stock(item.getId(), quantity));
    }
  }

  getStock(itemId) {
    for (let i = 0; i < this.stocks.length; i++) {
      if (this.stocks[i].getItemId() === itemId) return this.stocks[i];
    }
    return null;
  }

  selectItem(itemId) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].getId() === itemId) return this.items[i];
    }
    return null;
  }
}

// =================================================================
// Application Setup & Data Initialisation
// =================================================================

const menu = new Menu();

// Initialize items exactly as in C++ main()
menu.addItem(MenuItemFactory.createItem("Food", "F01", "Chicken Biryani", 250, "Meal"), 10);
menu.addItem(MenuItemFactory.createItem("Food", "F02", "Chicken Karahi", 400, "Meal"), 5);
menu.addItem(MenuItemFactory.createItem("Food", "F05", "Zinger Burger", 350, "Fast Food"), 10);
menu.addItem(MenuItemFactory.createItem("Food", "F06", "Chicken Burger", 250, "Fast Food"), 12);
menu.addItem(MenuItemFactory.createItem("Food", "F07", "Beef Burger", 320, "Fast Food"), 8);
menu.addItem(MenuItemFactory.createItem("Food", "F08", "French Fries", 150, "Snack"), 20);
menu.addItem(MenuItemFactory.createItem("Food", "F09", "Chicken Sandwich", 180, "Snack"), 15);
menu.addItem(MenuItemFactory.createItem("Food", "F10", "Club Sandwich", 280, "Snack"), 10);
menu.addItem(MenuItemFactory.createItem("Food", "F11", "Chicken Roll", 170, "Snack"), 18);
menu.addItem(MenuItemFactory.createItem("Food", "F12", "Vegetable Pizza Slice", 200, "Fast Food"), 10);
menu.addItem(MenuItemFactory.createItem("Food", "F13", "Chicken Pizza Slice", 250, "Fast Food"), 10);
menu.addItem(MenuItemFactory.createItem("Food", "F14", "Samosa", 50, "Snack"), 40);
menu.addItem(MenuItemFactory.createItem("Food", "F15", "Chicken Patties", 90, "Snack"), 30);
menu.addItem(MenuItemFactory.createItem("Food", "F16", "Shawarma", 220, "Fast Food"), 12);
menu.addItem(MenuItemFactory.createItem("Food", "F17", "Chicken Nuggets", 240, "Snack"), 15);
menu.addItem(MenuItemFactory.createItem("Food", "F18", "Paratha Roll", 180, "Snack"), 15);

menu.addItem(MenuItemFactory.createItem("Drink", "D01", "Cola", 80), 20);
menu.addItem(MenuItemFactory.createItem("Drink", "D02", "Mineral Water", 40), 15);
menu.addItem(MenuItemFactory.createItem("Drink", "D03", "7UP", 80), 20);
menu.addItem(MenuItemFactory.createItem("Drink", "D04", "Sprite", 80), 20);
menu.addItem(MenuItemFactory.createItem("Drink", "D05", "Fanta", 80), 20);
menu.addItem(MenuItemFactory.createItem("Drink", "D06", "Pepsi", 80), 20);
menu.addItem(MenuItemFactory.createItem("Drink", "D07", "Mountain Dew", 90), 15);
menu.addItem(MenuItemFactory.createItem("Drink", "D08", "Fresh Lime", 120), 10);
menu.addItem(MenuItemFactory.createItem("Drink", "D09", "Orange Juice", 150), 12);
menu.addItem(MenuItemFactory.createItem("Drink", "D10", "Mango Juice", 150), 12);
menu.addItem(MenuItemFactory.createItem("Drink", "D11", "Apple Juice", 160), 10);
menu.addItem(MenuItemFactory.createItem("Drink", "D12", "Tea", 70), 25);
menu.addItem(MenuItemFactory.createItem("Drink", "D13", "Coffee", 120), 20);
menu.addItem(MenuItemFactory.createItem("Drink", "D14", "Chocolate Milk", 180), 10);
menu.addItem(MenuItemFactory.createItem("Drink", "D15", "Lassi", 140), 12);

// Active Order state variables
let currentCustomer = null;
let currentCart = []; // contains MenuItem objects

// =================================================================
// DOM Element Selections (New UI Layout)
// =================================================================

// Navigation & Layout
const navItems = document.querySelectorAll(".nav-item");
const viewSections = document.querySelectorAll(".view-section");
const topbarTitle = document.getElementById("topbar-title");

// Dashboard View
const dashLowStock = document.getElementById("dash-low-stock-count");
const dashRevenue = document.getElementById("dash-revenue");
const btnDashShowMenu = document.querySelector(".card-show-menu");
const btnDashPlaceOrder = document.querySelector(".card-place-order");
const btnDashStock = document.querySelector(".card-stock");
const btnDashRestock = document.querySelector(".card-restock");

// Menu View
const menuListFood = document.getElementById("menu-list-food");
const menuListDrink = document.getElementById("menu-list-drink");
const countFood = document.getElementById("count-food");
const countDrink = document.getElementById("count-drink");
const btnMenuNewOrder = document.getElementById("btn-menu-new-order");

// Orders View
const step1Card = document.getElementById("step1-card");
const step2Card = document.getElementById("step2-card");
const step3Card = document.getElementById("step3-card");
const stepInd1 = document.getElementById("step-ind-1");
const stepInd2 = document.getElementById("step-ind-2");
const stepInd3 = document.getElementById("step-ind-3");

const orderCustName = document.getElementById("order-cust-name");
const orderCustId = document.getElementById("order-cust-id");
const btnContinueMenu = document.getElementById("btn-continue-menu");

const orderItemInput = document.getElementById("order-item-input");
const btnAddItemId = document.getElementById("btn-add-item-id");
const cartTableBody = document.getElementById("cart-table-body");
const labelSubtotal = document.getElementById("label-subtotal");
const btnContinueConfirm = document.getElementById("btn-continue-confirm");

const billCustName = document.getElementById("bill-cust-name");
const billCustRole = document.getElementById("bill-cust-role");
const billCustId = document.getElementById("bill-cust-id");
const billItemsBody = document.getElementById("bill-items-body");
const billSubtotal = document.getElementById("bill-subtotal");
const billDiscount = document.getElementById("bill-discount");
const billDiscountRow = document.getElementById("bill-discount-row");
const billTotal = document.getElementById("bill-total");
const btnFinishOrder = document.getElementById("btn-finish-order");

// Inventory View
const statLowStock = document.getElementById("stat-low-stock");
const statOutStock = document.getElementById("stat-out-stock");
const stockListFood = document.getElementById("stock-list-food");
const stockListDrink = document.getElementById("stock-list-drink");

// Restock View
const restockItemId = document.getElementById("restock-item-id");
const restockQty = document.getElementById("restock-qty");
const btnQtyMinus = document.getElementById("btn-qty-minus");
const btnQtyPlus = document.getElementById("btn-qty-plus");
const btnSubmitRestock = document.getElementById("btn-submit-restock");

// =================================================================
// UI Update & Navigation Functions
// =================================================================

function switchView(targetId) {
  if (!targetId) return;
  // Update nav active state
  navItems.forEach(nav => {
    if (nav.getAttribute("data-target") === targetId) {
      nav.classList.add("active");
    } else {
      nav.classList.remove("active");
    }
  });

  // Update views
  viewSections.forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(targetId).classList.add("active");

  // Update Topbar title
  if (targetId === "view-dashboard") topbarTitle.textContent = "Welcome, Admin";
  if (targetId === "view-orders") topbarTitle.textContent = "Place Order";
  if (targetId === "view-inventory") topbarTitle.textContent = "Stock Report";
  if (targetId === "view-menu") topbarTitle.textContent = "Digital Menu";
  if (targetId === "view-restock") topbarTitle.textContent = "Restock Item";
}

// Bind Navigation
navItems.forEach(nav => {
  nav.addEventListener("click", () => switchView(nav.getAttribute("data-target")));
});
[btnDashShowMenu, btnDashPlaceOrder, btnDashStock, btnDashRestock].forEach(btn => {
  if (btn) btn.addEventListener("click", () => switchView(btn.getAttribute("data-target")));
});
btnMenuNewOrder.addEventListener("click", () => switchView("view-orders"));

// Update DateTime
setInterval(() => {
  const dt = document.getElementById("current-datetime");
  if (dt) dt.textContent = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}, 60000);

// =================================================================
// Render Menu & Inventory
// =================================================================

function renderMenu() {
  menuListFood.innerHTML = "";
  menuListDrink.innerHTML = "";
  let fCount = 0, dCount = 0;

  menu.items.forEach(item => {
    const isFood = item instanceof Food;
    const cat = isFood ? item.getCategory() : "Cold Beverage";
    
    const card = document.createElement("div");
    card.className = "menu-list-card";
    card.innerHTML = `
      <div class="menu-list-card-left">
        <span class="item-id">#${item.getId()}</span>
        <div class="item-details">
          <h4>${item.getName()}</h4>
          <div class="item-tags">
            <span class="item-tag">${cat}</span>
          </div>
        </div>
      </div>
      <div class="menu-list-card-right">
        <span class="item-price">${item.getPrice()} PKR</span>
        <button class="edit-btn">✎</button>
      </div>
    `;

    if (isFood) {
      menuListFood.appendChild(card);
      fCount++;
    } else {
      menuListDrink.appendChild(card);
      dCount++;
    }
  });

  countFood.textContent = `${fCount} Items`;
  countDrink.textContent = `${dCount} Items`;
}

function renderInventory() {
  stockListFood.innerHTML = "";
  stockListDrink.innerHTML = "";
  
  let lowCount = 0;
  let outCount = 0;

  menu.items.forEach(item => {
    const stock = menu.getStock(item.getId());
    if (!stock) return;
    
    const remaining = stock.getRemaining();
    const isFood = item instanceof Food;
    const cat = isFood ? item.getCategory() : "Cold Beverage";
    
    let pillClass = "";
    let pillText = `${remaining} remaining`;
    
    if (remaining === 0) {
      pillClass = "empty";
      pillText = "Out of stock";
      outCount++;
    } else if (remaining <= 5) {
      pillClass = "low";
      lowCount++;
    }

    const card = document.createElement("div");
    card.className = "stock-card";
    card.innerHTML = `
      <div class="stock-img-mock">${isFood ? '🍔' : '🥤'}</div>
      <div class="stock-details">
        <h4>${item.getName()}</h4>
        <p>${cat}</p>
      </div>
      <span class="stock-pill ${pillClass}">${pillText}</span>
    `;

    if (isFood) {
      stockListFood.appendChild(card);
    } else {
      stockListDrink.appendChild(card);
    }
  });

  statLowStock.textContent = `${lowCount} Items`;
  statOutStock.textContent = `${outCount} Items`;
  dashLowStock.textContent = `${lowCount} items low in stock`;
}

// =================================================================
// Ordering Stepper Logic (Port of C++ PlaceOrder)
// =================================================================

function resetStepper() {
  currentCustomer = null;
  currentCart = [];
  
  orderCustName.value = "";
  orderCustId.value = "";
  orderItemInput.value = "";
  
  step1Card.style.display = "block";
  step2Card.style.display = "none";
  step3Card.style.display = "none";
  
  stepInd1.classList.add("active");
  stepInd2.classList.remove("active");
  stepInd3.classList.remove("active");
}

// Step 1 -> Step 2
btnContinueMenu.addEventListener("click", () => {
  const name = orderCustName.value.trim();
  const idInput = orderCustId.value.trim().toLowerCase();
  
  if (!name || !idInput) {
    alert("Please enter both Name and ID.");
    return;
  }
  
  try {
    if (idInput.substring(0, 3) === "std") {
      currentCustomer = new Student(name, idInput);
    } else if (idInput.substring(0, 3) === "emp") {
      currentCustomer = new Employee(name, idInput);
    } else {
      throw new Error("Invalid ID. Customer credentials must start with 'std' (Student) or 'emp' (Employee).");
    }
    
    // Proceed to Step 2
    step1Card.style.display = "none";
    step2Card.style.display = "block";
    stepInd1.classList.remove("active");
    stepInd2.classList.add("active");
    updateCartUI();
    
  } catch (err) {
    alert(err.message);
  }
});

// Step 2 Add item to cart
btnAddItemId.addEventListener("click", () => {
  const itemId = orderItemInput.value.trim().toUpperCase();
  orderItemInput.value = "";
  
  if (!itemId) return;
  
  const selected = menu.selectItem(itemId);
  const stock = menu.getStock(itemId);
  
  if (selected && stock) {
    if (stock.getRemaining() > 0) {
      currentCart.push(selected);
      updateCartUI();
    } else {
      alert(`Out of stock! ${selected.getName()} is currently out of stock.`);
    }
  } else {
    alert(`Item not found! ItemID '${itemId}' does not exist.`);
  }
});

orderItemInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") btnAddItemId.click();
});

function removeItemFromCart(index) {
  currentCart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  cartTableBody.innerHTML = "";
  let subtotal = 0;
  
  currentCart.forEach((item, index) => {
    subtotal += item.getPrice();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="color:var(--text-muted);">#${item.getId()}</td>
      <td>${item.getName()}</td>
      <td style="color:var(--accent-primary);">${item.getPrice()} PKR</td>
      <td><button class="btn-remove-cart" data-index="${index}">×</button></td>
    `;
    cartTableBody.appendChild(row);
  });
  
  labelSubtotal.textContent = `${subtotal} PKR`;
  
  document.querySelectorAll(".btn-remove-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.target.getAttribute("data-index"));
      removeItemFromCart(idx);
    });
  });
}

// Step 2 -> Step 3
btnContinueConfirm.addEventListener("click", () => {
  if (currentCart.length === 0) {
    alert("Your cart is empty. Please add items before reviewing.");
    return;
  }
  
  // Verify stock availability
  const insufficientItems = [];
  currentCart.forEach(item => {
    const stock = menu.getStock(item.getId());
    if (stock.getRemaining() <= 0) {
      insufficientItems.push(item.getName());
    }
  });
  
  if (insufficientItems.length > 0) {
    alert(`Checkout Aborted! The following items are out of stock: ${insufficientItems.join(", ")}`);
    return;
  }
  
  // Proceed to Step 3
  step2Card.style.display = "none";
  step3Card.style.display = "block";
  stepInd2.classList.remove("active");
  stepInd3.classList.add("active");
  
  // Generate Bill
  billCustName.textContent = currentCustomer.name;
  billCustRole.textContent = currentCustomer.getrole();
  billCustId.textContent = currentCustomer.id.toUpperCase();
  
  billItemsBody.innerHTML = "";
  let subtotal = 0;
  
  currentCart.forEach(item => {
    subtotal += item.getPrice();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.getName()} <small style="color:var(--text-muted)">#${item.getId()}</small></td>
      <td class="text-right">${item.getPrice()} PKR</td>
    `;
    billItemsBody.appendChild(row);
  });
  
  const finalTotal = currentCustomer.applydiscount(subtotal);
  const discountAmt = subtotal - finalTotal;
  
  billSubtotal.textContent = `${subtotal} PKR`;
  if (discountAmt > 0) {
    billDiscountRow.style.display = "flex";
    billDiscount.textContent = `-${discountAmt} PKR`;
  } else {
    billDiscountRow.style.display = "none";
  }
  billTotal.textContent = `${finalTotal} PKR`;
});

// Step 3 Finish
btnFinishOrder.addEventListener("click", () => {
  // Decrement stocks for real
  currentCart.forEach(item => {
    const stock = menu.getStock(item.getId());
    stock.reduceStock(1);
  });
  
  // Update Revenue
  let currentRev = parseFloat(dashRevenue.textContent.replace(' PKR', '').replace(',', ''));
  let orderTotal = currentCustomer.applydiscount(currentCart.reduce((sum, item) => sum + item.getPrice(), 0));
  dashRevenue.textContent = `${(currentRev + orderTotal).toLocaleString('en-US', {minimumFractionDigits: 2})} PKR`;
  
  // Render updates
  renderInventory();
  
  // Reset for next order
  resetStepper();
  switchView("view-dashboard");
});


// =================================================================
// Restock View Logic
// =================================================================

btnQtyMinus.addEventListener("click", () => {
  let val = parseInt(restockQty.value);
  if (val > 1) restockQty.value = val - 1;
});
btnQtyPlus.addEventListener("click", () => {
  let val = parseInt(restockQty.value);
  restockQty.value = val + 1;
});

btnSubmitRestock.addEventListener("click", () => {
  const itemId = restockItemId.value.trim().toUpperCase();
  const qty = parseInt(restockQty.value);
  
  if (!itemId) {
    alert("Please enter a valid Item ID.");
    return;
  }
  
  const stock = menu.getStock(itemId);
  if (stock) {
    stock.addStock(qty);
    renderInventory();
    restockItemId.value = "";
    restockQty.value = 1;
    
    // Switch back to inventory
    switchView("view-inventory");
  } else {
    alert("Item ID not found.");
  }
});

// =================================================================
// C++ Console Simulator Logic
// =================================================================

const btnCompileCpp = document.getElementById("btn-compile-cpp");
const consoleOutput = document.getElementById("console-output");
const consoleInputRow = document.getElementById("console-input-row");
const consoleInput = document.getElementById("console-input");

let consoleState = "IDLE"; // IDLE, MAIN_MENU, ORDER_NAME, ORDER_ID, ORDER_ITEMS, RESTOCK_ID, RESTOCK_QTY
let consoleCart = [];
let consoleCustomer = null;
let consoleCustName = "";
let tempRestockId = "";

function printConsole(text, className = "") {
  const line = document.createElement("div");
  line.className = `console-line ${className}`;
  line.textContent = text;
  consoleOutput.appendChild(line);
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

btnCompileCpp.addEventListener("click", () => {
  consoleOutput.innerHTML = "";
  printConsole("C:\\Users\\Student\\CanteenMS> g++ -std=c++11 -o canteen.exe \"FINAL CAMPUS CANTEEN MS (1).cpp\"", "text-muted");
  
  btnCompileCpp.disabled = true;
  btnCompileCpp.textContent = "⚡ Compiling...";

  setTimeout(() => {
    printConsole("[SUCCESS] Compilation completed successfully!");
    printConsole("Starting canteen.exe...", "text-success");
    printConsole("---------------------------------------------------------", "text-muted");
    
    btnCompileCpp.disabled = false;
    btnCompileCpp.textContent = "⚡ Re-compile & Run";
    consoleInputRow.style.display = "flex";
    consoleInput.focus();
    
    startConsoleApp();
  }, 1000);
});

function startConsoleApp() {
  consoleState = "MAIN_MENU";
  printMainMenu();
}

function printMainMenu() {
  printConsole("\n========= MAIN MENU =========");
  printConsole("1. Show Menu");
  printConsole("2. Place Order");
  printConsole("3. Stock Report");
  printConsole("4. Restock Item");
  printConsole("5. Exit");
  printConsole("==============================");
  printConsole("Enter your choice: ");
}

consoleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const val = consoleInput.value.trim();
    consoleInput.value = "";
    if (consoleState !== "IDLE") {
      printConsole("> " + val, "text-warning");
      handleConsoleInput(val);
    }
  }
});

function handleConsoleInput(input) {
  switch (consoleState) {
    case "MAIN_MENU": {
      if (input === "1") {
        printConsole("\n----- Menu -----");
        menu.items.forEach(item => {
          const type = item instanceof Food ? "[Food]" : "[Drink]";
          const catStr = item instanceof Food ? ` | Category: ${item.getCategory()}` : "";
          printConsole(`${type} ${item.getId()} - ${item.getName()}${catStr} | Price: ${item.getPrice()}`);
        });
        printMainMenu();
      } else if (input === "2") {
        printConsole("\n----- Menu -----");
        menu.items.forEach(item => {
          const type = item instanceof Food ? "[Food]" : "[Drink]";
          const catStr = item instanceof Food ? ` | Category: ${item.getCategory()}` : "";
          printConsole(`${type} ${item.getId()} - ${item.getName()}${catStr} | Price: ${item.getPrice()}`);
        });
        printConsole("\nEnter your name: ");
        consoleState = "ORDER_NAME";
      } else if (input === "3") {
        printConsole("\nFood Items Stock Status:");
        menu.items.forEach(item => {
          if (item instanceof Food) {
            const stock = menu.getStock(item.getId());
            if (stock.getRemaining() > 0) {
              printConsole(`${item.getName()}: ${stock.getRemaining()} remaining`);
            } else {
              printConsole(`${item.getName()}: Out of stock`, "text-danger");
            }
          }
        });
        printConsole("\nDrink Items Stock Status:");
        menu.items.forEach(item => {
          if (item instanceof Drink) {
            const stock = menu.getStock(item.getId());
            if (stock.getRemaining() > 0) {
              printConsole(`${item.getName()}: ${stock.getRemaining()} remaining`);
            } else {
              printConsole(`${item.getName()}: Out of stock`, "text-danger");
            }
          }
        });
        printMainMenu();
      } else if (input === "4") {
        printConsole("Enter Item ID to restock: ");
        consoleState = "RESTOCK_ID";
      } else if (input === "5") {
        printConsole("Exiting... Thank you!");
        consoleInputRow.style.display = "none";
        consoleState = "IDLE";
      } else {
        printConsole("Invalid choice, try again!");
        printMainMenu();
      }
      break;
    }

    case "ORDER_NAME": {
      consoleCustName = input;
      printConsole("Enter your ID: ");
      consoleState = "ORDER_ID";
      break;
    }

    case "ORDER_ID": {
      const idInput = input.toLowerCase();
      try {
        if (idInput.substring(0, 3) === "std") {
          consoleCustomer = new Student(consoleCustName, idInput);
        } else if (idInput.substring(0, 3) === "emp") {
          consoleCustomer = new Employee(consoleCustName, idInput);
        } else {
          throw new Error("Invalid ID");
        }
        
        printConsole(`Welcome ${consoleCustName} (${consoleCustomer.getrole()})`);
        printConsole("\nEnter Item ID to order (type 'done' to finish): ");
        consoleCart = [];
        consoleState = "ORDER_ITEMS";
      } catch (err) {
        printConsole("Error: " + err.message, "text-danger");
        consoleState = "MAIN_MENU";
        printMainMenu();
      }
      break;
    }

    case "ORDER_ITEMS": {
      if (input.toLowerCase() === "done") {
        let subtotal = 0;
        printConsole("\n----- Your Order -----");
        consoleCart.forEach(item => {
          const type = item instanceof Food ? "[Food]" : "[Drink]";
          printConsole(`${type} ${item.getId()} - ${item.getName()} | Price: ${item.getPrice()}`);
          subtotal += item.getPrice();
        });
        
        const finalTotal = consoleCustomer.applydiscount(subtotal);
        
        printConsole("\n----- Bill -----");
        printConsole("Customer : " + consoleCustName);
        printConsole("Role     : " + consoleCustomer.getrole());
        printConsole("Subtotal : " + subtotal.toFixed(2));
        printConsole("Total    : " + finalTotal.toFixed(2));
        
        renderInventory();
        
        consoleState = "MAIN_MENU";
        printMainMenu();
      } else {
        const selected = menu.selectItem(input.toUpperCase());
        const stock = menu.getStock(input.toUpperCase());
        if (selected && stock) {
          if (stock.getRemaining() > 0) {
            stock.reduceStock(1);
            consoleCart.push(selected);
            printConsole(`Added: ${selected.getName()}`);
          } else {
            printConsole(`Sorry, ${selected.getName()} is out of stock!`, "text-danger");
          }
        } else {
          printConsole("Item not found!", "text-danger");
        }
        printConsole("Enter Item ID (or 'done'): ");
      }
      break;
    }

    case "RESTOCK_ID": {
      tempRestockId = input.toUpperCase();
      const stockItem = menu.getStock(tempRestockId);
      if (stockItem) {
        printConsole("Enter quantity to add: ");
        consoleState = "RESTOCK_QTY";
      } else {
        printConsole("Item not found!", "text-danger");
        consoleState = "MAIN_MENU";
        printMainMenu();
      }
      break;
    }

    case "RESTOCK_QTY": {
      const qty = parseInt(input);
      if (!isNaN(qty) && qty > 0) {
        const restockTarget = menu.getStock(tempRestockId);
        if (restockTarget) {
          restockTarget.addStock(qty);
          printConsole("Stock updated!");
          renderInventory();
        }
      } else {
        printConsole("Invalid quantity!", "text-danger");
      }
      consoleState = "MAIN_MENU";
      printMainMenu();
      break;
    }
  }
}

// Intercept switchview to auto-focus console input
const originalSwitchView = switchView;
switchView = function(targetId) {
  if (!targetId) return;
  originalSwitchView(targetId);
  if (targetId === "view-cpp-console" && consoleState !== "IDLE") {
    setTimeout(() => consoleInput.focus(), 50);
  }
  if (targetId === "view-code-editor") topbarTitle.textContent = "Code Inspector";
};

// =================================================================
// Code Inspector - Source Code Store
// =================================================================

const cppModules = {
  menuitem: {
    file: "MenuItem.h",
    code: `// Abstract Base Class — MenuItem
class MenuItem {
protected:
    string itemId;
    string name;
    double price;
public:
    MenuItem(string itemId, string name, double price) {
        this->itemId = itemId;
        this->name = name;
        this->price = price;
    }
    string getId() { return itemId; }
    string getName() { return name; }
    double getPrice() { return price; }
    virtual void display() = 0;   // Pure virtual
    virtual ~MenuItem() {}
};`
  },
  food: {
    file: "Food.h",
    code: `// Food — inherits from MenuItem
class Food : public MenuItem {
private:
    string category;
public:
    Food(string itemId, string name, double price, string category)
        : MenuItem(itemId, name, price) {
        this->category = category;
    }
    void display() override {
        cout << "[Food] " << itemId << " - " << name
             << " | Category: " << category
             << " | Price: " << price << endl;
    }
};`
  },
  drink: {
    file: "Drink.h",
    code: `// Drink — inherits from MenuItem
class Drink : public MenuItem {
public:
    Drink(string itemId, string name, double price)
        : MenuItem(itemId, name, price) {}
    void display() override {
        cout << "[Drink] " << itemId << " - " << name
             << " | Price: " << price << endl;
    }
};`
  },
  stock: {
    file: "Stock.h",
    code: `// Stock — tracks item inventory
class Stock {
private:
    string itemId;
    int totalQuantity;
    int remainingQuantity;
public:
    Stock(string itemId, int quantity) {
        this->itemId = itemId;
        this->totalQuantity = quantity;
        this->remainingQuantity = quantity;
    }

    string getItemId() { return itemId; }
    int getRemaining() { return remainingQuantity; }
    int getSold() { return totalQuantity - remainingQuantity; }
    int getTotal() { return totalQuantity; }

    bool reduceStock(int qty = 1) {
        if (remainingQuantity >= qty) {
            remainingQuantity -= qty;
            return true;
        }
        return false;
    }

    void addStock(int qty) {
        totalQuantity += qty;
        remainingQuantity += qty;
    }
};`
  },
  person: {
    file: "Person.h",
    code: `// Abstract Base Class — Person
class Person {
protected:
    string name;
    string id;
public:
    Person(string n, string i) {
        name = n;
        id = i;
    }
    virtual double applydiscount(double subtotal) = 0;
    virtual string getrole() = 0;
};`
  },
  student: {
    file: "Student.h",
    code: `// Student — inherits from Person
class Student : public Person {
public:
    Student(string n, string i) : Person(n, i) {}

    double applydiscount(double subtotal) override {
        return subtotal;   // No discount for students
    }

    string getrole() override {
        return "Student";
    }
};`
  },
  employee: {
    file: "Employee.h",
    code: `// Employee — inherits from Person (5% discount)
class Employee : public Person {
public:
    Employee(string n, string i) : Person(n, i) {}

    double applydiscount(double subtotal) override {
        return subtotal - subtotal * 0.05;  // 5% discount
    }

    string getrole() override {
        return "Employee";
    }
};`
  },
  menu: {
    file: "Menu.h",
    code: `// Menu — aggregates MenuItem* and Stock
class Menu {
private:
    vector<MenuItem*> items;
    vector<Stock> stocks;
public:
    void addItem(MenuItem* item, int quantity = 0) {
        if (item != nullptr) {
            items.push_back(item);
            stocks.push_back(Stock(item->getId(), quantity));
        }
    }

    Stock* getStock(string itemId) {
        for (int i = 0; i < (int)stocks.size(); i++) {
            if (stocks[i].getItemId() == itemId)
                return &stocks[i];
        }
        return nullptr;
    }

    MenuItem* selectItem(string itemId) {
        for (int i = 0; i < (int)items.size(); i++) {
            if (items[i]->getId() == itemId)
                return items[i];
        }
        return nullptr;
    }

    void displayAll() {
        cout << "\\n----- Menu -----" << endl;
        for (int i = 0; i < (int)items.size(); i++)
            items[i]->display();
    }

    ~Menu() {
        for (int i = 0; i < (int)items.size(); i++)
            delete items[i];
    }
};`
  },
  factory: {
    file: "MenuItemFactory.h",
    code: `// Factory Pattern — creates MenuItem objects
class MenuItemFactory {
public:
    static MenuItem* createItem(
        string type,
        string itemId,
        string name,
        double price,
        string category = ""
    ) {
        if (type == "Food") {
            return new Food(itemId, name, price, category);
        }
        else if (type == "Drink") {
            return new Drink(itemId, name, price);
        }
        return nullptr;
    }
};`
  },
  ordering: {
    file: "Ordering.cpp",
    code: `// placeOrder — uses try/catch exception handling
void placeOrder(Menu &menu) {
    string name, id;
    cout << "\\nEnter your name: ";
    cin.ignore(numeric_limits<streamsize>::max(), '\\n');
    getline(cin, name);
    cout << "Enter your ID: ";
    cin >> id;

    try {
        if (id.substr(0, 3) == "std") {
            Student s(name, id);
            printBillAndOrder(menu, s, name);
        }
        else if (id.substr(0, 3) == "emp") {
            Employee e(name, id);
            printBillAndOrder(menu, e, name);
        }
        else {
            throw runtime_error("Invalid ID");
        }
    }
    catch (const runtime_error &e) {
        cout << "Error: " << e.what() << endl;
    }
    catch (const exception &e) {
        cout << "Error: " << e.what() << endl;
    }
}`
  },
  main: {
    file: "main.cpp",
    code: `int main() {
    Menu menu;

    // Add Food Items
    menu.addItem(MenuItemFactory::createItem("Food", "F01",
        "Chicken Biryani", 250, "Meal"), 10);
    menu.addItem(MenuItemFactory::createItem("Food", "F05",
        "Zinger Burger", 350, "Fast Food"), 10);
    // ... (16 food items total)

    // Add Drink Items
    menu.addItem(MenuItemFactory::createItem("Drink", "D01",
        "Cola", 80), 20);
    // ... (15 drink items total)

    int option;
    do {
        cout << "\\n========= MAIN MENU =========" << endl;
        cout << "1. Show Menu" << endl;
        cout << "2. Place Order" << endl;
        cout << "3. Stock Report" << endl;
        cout << "4. Restock Item" << endl;
        cout << "5. Exit" << endl;
        cout << "Enter your choice: ";
        cin >> option;

        switch (option) {
            case 1: menu.displayAll(); break;
            case 2: menu.displayAll();
                    placeOrder(menu); break;
            case 3: menu.displayStockReport(); break;
            case 4: {
                string id; int qty;
                cout << "Enter Item ID to restock: ";
                cin >> id;
                cout << "Enter quantity to add: ";
                cin >> qty;
                menu.restock(id, qty);
                break;
            }
            case 5: cout << "Exiting..." << endl; break;
            default: cout << "Invalid choice!" << endl;
        }
    } while (option != 5);

    return 0;
}`
  }
};

// =================================================================
// Syntax Highlighting Engine (Token-based, no double-matching)
// =================================================================

const CPP_KEYWORDS = new Set([
  'class','public','private','protected','virtual','override','static',
  'return','if','else','for','while','do','switch','case','break','default',
  'try','catch','throw','new','delete','const','nullptr','using','namespace',
  'void','int','double','string','bool','true','false','this','endl','cout','cin',
  'template','typename','struct','enum','typedef','auto','inline','explicit',
  'operator','sizeof','dynamic_cast','static_cast','reinterpret_cast','const_cast',
  'volatile','mutable','register','extern','signed','unsigned','char','float',
  'long','short','wchar_t','include','ifdef','ifndef','define','endif','pragma'
]);

const CPP_TYPES = new Set([
  'MenuItem','Food','Drink','Stock','Person','Student','Employee',
  'Menu','MenuItemFactory','vector','runtime_error','exception',
  'streamsize','ostream','istream','ofstream','ifstream','size_t'
]);

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightLine(line) {
  let result = '';
  let i = 0;
  
  while (i < line.length) {
    // 1) Comment: // to end of line
    if (line[i] === '/' && line[i+1] === '/') {
      result += '<span class="cm">' + escapeHtml(line.substring(i)) + '</span>';
      return result; // rest of line is comment
    }
    
    // 2) Preprocessor: #include, #define etc
    if (line[i] === '#' && result.trim() === '') {
      result += '<span class="pre">' + escapeHtml(line.substring(i)) + '</span>';
      return result;
    }
    
    // 3) String literal
    if (line[i] === '"') {
      let j = i + 1;
      while (j < line.length && !(line[j] === '"' && line[j-1] !== '\\')) j++;
      j++; // include closing quote
      result += '<span class="str">' + escapeHtml(line.substring(i, j)) + '</span>';
      i = j;
      continue;
    }
    
    // 4) Char literal
    if (line[i] === "'") {
      let j = i + 1;
      while (j < line.length && !(line[j] === "'" && line[j-1] !== '\\')) j++;
      j++;
      result += '<span class="str">' + escapeHtml(line.substring(i, j)) + '</span>';
      i = j;
      continue;
    }
    
    // 5) Numbers
    if (/[0-9]/.test(line[i]) && (i === 0 || /[^a-zA-Z_]/.test(line[i-1]))) {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      result += '<span class="num">' + line.substring(i, j) + '</span>';
      i = j;
      continue;
    }
    
    // 6) Identifiers (words) — check for keywords, types, or plain
    if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++;
      const word = line.substring(i, j);
      
      if (CPP_KEYWORDS.has(word)) {
        result += '<span class="kw">' + word + '</span>';
      } else if (CPP_TYPES.has(word)) {
        result += '<span class="cls">' + word + '</span>';
      } else {
        // Check if it's a function call (followed by '(')
        let k = j;
        while (k < line.length && line[k] === ' ') k++;
        if (line[k] === '(') {
          result += '<span class="fn">' + escapeHtml(word) + '</span>';
        } else {
          result += escapeHtml(word);
        }
      }
      i = j;
      continue;
    }
    
    // 7) Operators: << >> -> :: = 0
    if (line[i] === '<' && line[i+1] === '<') {
      result += '<span class="op">&lt;&lt;</span>';
      i += 2;
      continue;
    }
    if (line[i] === '>' && line[i+1] === '>') {
      result += '<span class="op">&gt;&gt;</span>';
      i += 2;
      continue;
    }
    if (line[i] === '-' && line[i+1] === '>') {
      result += '<span class="op">-&gt;</span>';
      i += 2;
      continue;
    }
    if (line[i] === ':' && line[i+1] === ':') {
      result += '<span class="op">::</span>';
      i += 2;
      continue;
    }
    
    // 8) Everything else — escape and pass through
    result += escapeHtml(line[i]);
    i++;
  }
  
  return result;
}

function highlightCpp(code) {
  const lines = code.split('\n');
  return lines.map((line, i) => {
    const highlighted = highlightLine(line);
    return `<div class="code-line" style="animation-delay:${i * 20}ms"><span class="line-gutter">${i + 1}</span><span class="line-content">${highlighted}</span></div>`;
  }).join('');
}

// =================================================================
// Code Tab Switching
// =================================================================

const codeTabs = document.querySelectorAll('.code-tab');
const codeDisplay = document.getElementById('code-display');
const editorFilename = document.getElementById('editor-filename');
const codeLineCount = document.getElementById('code-line-count');

function loadCodeModule(moduleName) {
  const mod = cppModules[moduleName];
  if (!mod) return;
  
  editorFilename.textContent = mod.file;
  const lineCount = mod.code.split('\n').length;
  codeLineCount.textContent = `Lines: ${lineCount}`;
  codeDisplay.innerHTML = highlightCpp(mod.code);
}

codeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    codeTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loadCodeModule(tab.getAttribute('data-module'));
  });
});

// Load default module
loadCodeModule('menuitem');

// OOP Concept cards — click to highlight related diagram nodes
document.querySelectorAll('.oop-card').forEach(card => {
  card.addEventListener('click', () => {
    const concept = card.getAttribute('data-concept');
    // Flash related nodes
    const nodeMap = {
      inheritance: ['node-food','node-drink','node-student','node-employee'],
      polymorphism: ['node-menuitem','node-person'],
      encapsulation: ['node-stock','node-menu'],
      abstraction: ['node-menuitem','node-person'],
      factory: ['node-factory'],
      exception: []
    };
    const related = nodeMap[concept] || [];
    
    // Scroll to diagram
    document.querySelector('.class-diagram-section').scrollIntoView({ behavior: 'smooth' });
    
    // Flash animation
    document.querySelectorAll('.class-node').forEach(n => n.style.borderColor = '');
    related.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.style.borderColor = 'var(--accent-primary)';
        el.style.boxShadow = '0 0 20px rgba(245,158,11,0.3)';
        setTimeout(() => {
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }, 2000);
      }
    });

    // Also switch to related code tab
    const codeMap = {
      inheritance: 'food',
      polymorphism: 'menuitem',
      encapsulation: 'stock',
      abstraction: 'person',
      factory: 'factory',
      exception: 'ordering'
    };
    if (codeMap[concept]) {
      codeTabs.forEach(t => t.classList.remove('active'));
      const targetTab = document.querySelector(`.code-tab[data-module="${codeMap[concept]}"]`);
      if (targetTab) targetTab.classList.add('active');
      loadCodeModule(codeMap[concept]);
    }
  });
});

// Initialize App
renderMenu();
renderInventory();
switchView("view-dashboard");

