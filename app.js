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
        <span class="item-price">$${(item.getPrice()).toFixed(2)}</span>
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
      <td style="color:var(--accent-primary);">$${(item.getPrice()).toFixed(2)}</td>
      <td><button class="btn-remove-cart" data-index="${index}">×</button></td>
    `;
    cartTableBody.appendChild(row);
  });
  
  labelSubtotal.textContent = `$${(subtotal).toFixed(2)}`;
  
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
      <td class="text-right">$${(item.getPrice()).toFixed(2)}</td>
    `;
    billItemsBody.appendChild(row);
  });
  
  const finalTotal = currentCustomer.applydiscount(subtotal);
  const discountAmt = subtotal - finalTotal;
  
  billSubtotal.textContent = `$${(subtotal).toFixed(2)}`;
  if (discountAmt > 0) {
    billDiscountRow.style.display = "flex";
    billDiscount.textContent = `-$${(discountAmt).toFixed(2)}`;
  } else {
    billDiscountRow.style.display = "none";
  }
  billTotal.textContent = `$${(finalTotal).toFixed(2)}`;
});

// Step 3 Finish
btnFinishOrder.addEventListener("click", () => {
  // Decrement stocks for real
  currentCart.forEach(item => {
    const stock = menu.getStock(item.getId());
    stock.reduceStock(1);
  });
  
  // Update Revenue
  let currentRev = parseFloat(dashRevenue.textContent.replace('$', '').replace(',', ''));
  let orderTotal = currentCustomer.applydiscount(currentCart.reduce((sum, item) => sum + item.getPrice(), 0));
  dashRevenue.textContent = `$${(currentRev + orderTotal).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  
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
    case "MAIN_MENU":
      if (input === "1") {
        printConsole("\n----- Menu -----");
        menu.items.forEach(item => {
          const type = item instanceof Food ? "[Food]" : "[Drink]";
          const catStr = item instanceof Food ? ` | Category: ${item.getCategory()}` : "";
          printConsole(`${type} ${item.getId()} - ${item.getName()}${catStr} | Price: ${item.getPrice()}`);
        });
        printMainMenu();
      } else if (input === "2") {
        // Show menu first
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

    case "ORDER_NAME":
      consoleCustName = input;
      printConsole("Enter your ID: ");
      consoleState = "ORDER_ID";
      break;

    case "ORDER_ID":
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

    case "ORDER_ITEMS":
      if (input.toLowerCase() === "done") {
        // Print bill
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
        
        // Actually reduce stock for real
        consoleCart.forEach(item => {
          const stock = menu.getStock(item.getId());
          stock.reduceStock(1);
        });
        renderInventory(); // Update global visual inventory too
        
        consoleState = "MAIN_MENU";
        printMainMenu();
      } else {
        const selected = menu.selectItem(input.toUpperCase());
        const stock = menu.getStock(input.toUpperCase());
        if (selected && stock) {
          if (stock.getRemaining() > 0) {
            // Deduct stock temporarily in our console session
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

    case "RESTOCK_ID":
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

    case "RESTOCK_QTY":
      const qty = parseInt(input);
      if (!isNaN(qty) && qty > 0) {
        menu.restock(tempRestockId, qty);
        printConsole("Stock updated!");
        renderInventory(); // Sync changes with central dashboard
      } else {
        printConsole("Invalid quantity!", "text-danger");
      }
      consoleState = "MAIN_MENU";
      printMainMenu();
      break;
  }
}

// Intercept switchview to auto-focus console input
const originalSwitchView = switchView;
switchView = function(targetId) {
  originalSwitchView(targetId);
  if (targetId === "view-cpp-console" && consoleState !== "IDLE") {
    setTimeout(() => consoleInput.focus(), 50);
  }
};

// Initialize App
renderMenu();
renderInventory();
switchView("view-dashboard");
