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
// DOM Element Selections
// =================================================================

// Screens
const screenLogin = document.getElementById("screen-login");
const screenOrdering = document.getElementById("screen-ordering");
const screenBill = document.getElementById("screen-bill");

// Login form
const inputName = document.getElementById("input-name");
const inputId = document.getElementById("input-id");
const btnLoginSubmit = document.getElementById("btn-login-submit");

// HUD and inputs
const hudName = document.getElementById("hud-name");
const hudRole = document.getElementById("hud-role");
const hudId = document.getElementById("hud-id");
const btnExitOrdering = document.getElementById("btn-exit-ordering");
const terminalItemInput = document.getElementById("terminal-item-input");
const btnAddItem = document.getElementById("btn-add-item-id");

// Cart
const cartTableBody = document.getElementById("cart-table-body");
const cartEmptyMsg = document.getElementById("cart-empty-msg");
const labelSubtotal = document.getElementById("label-subtotal");
const btnSubmitOrder = document.getElementById("btn-submit-order");

// Bill receipt
const billDate = document.getElementById("bill-date");
const billCustName = document.getElementById("bill-cust-name");
const billCustRole = document.getElementById("bill-cust-role");
const billCustId = document.getElementById("bill-cust-id");
const billItemsBody = document.getElementById("bill-items-body");
const billSubtotal = document.getElementById("bill-subtotal");
const billDiscount = document.getElementById("bill-discount");
const billDiscountRow = document.getElementById("bill-discount-row");
const billTotal = document.getElementById("bill-total");
const btnRestartTerminal = document.getElementById("btn-restart-terminal");

// Menu rendering grid & tabs
const menuItemsGrid = document.getElementById("menu-items-grid");
const menuTabBtns = document.querySelectorAll(".menu-tab-btn");

// Stock dashboard & Restocking
const stockListGrid = document.getElementById("stock-list-grid");
const restockIdSelect = document.getElementById("restock-id-select");
const restockQtyInput = document.getElementById("restock-qty-input");
const btnSubmitRestock = document.getElementById("btn-submit-restock");

// Modal Exceptions overlay
const exceptionModal = document.getElementById("exception-modal");
const modalExceptionMsg = document.getElementById("modal-exception-msg");
const btnCloseModal = document.getElementById("btn-close-modal");

// C++ Source Code inspector trigger
const codeInspectorTrigger = document.getElementById("code-inspector-trigger");
const codeInspectorSection = document.querySelector(".code-inspector-section");
const codeNavBtns = document.querySelectorAll(".code-nav-btn");
const cppCodeDisplay = document.getElementById("cpp-code-display");

// =================================================================
// C++ Original Code Strings (Packaged)
// =================================================================

const cppSnippets = {
  menuitem: `// =================================================================
// MenuItem hierarchy — taken from stock.cpp, UNCHANGED
// =================================================================
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
    virtual void display() = 0;
    virtual ~MenuItem() {}
};

// Food
class Food : public MenuItem {
private:
    string category;
public:
    Food(string itemId, string name, double price, string category): MenuItem(itemId, name, price) {
        this->category = category;
    }
    void display() override {
        cout << "[Food] " << itemId << " - " << name << " | Category: " << category << " | Price: " << price << endl;
    }
};

// Drink
class Drink : public MenuItem {
public:
    Drink(string itemId, string name, double price)
        : MenuItem(itemId, name, price) {}
    void display() override {
        cout << "[Drink] " << itemId << " - " << name << " | Price: " << price << endl;
    }
};`,

  stock: `// =================================================================
// Stock — taken from stock.cpp, UNCHANGED
// =================================================================
class Stock {
private:
    string itemId;
    int totalQuantity;      // initially the quantity which was added
    int remainingQuantity;  // remaining quantity
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

    void display() {
        cout << "ID: " << itemId
             << " | Remaining: " << remainingQuantity
             << " | Sold: " << getSold()
             << " | Total: " << totalQuantity << endl;
    }
};`,

  person: `// =================================================================
// person hierarchy — taken from ccp_summer.cpp, COMPLETELY UNCHANGED
// =================================================================
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
};

class Student : public Person {
public:
    Student(string n, string i) : Person(n, i) {}

    double applydiscount(double subtotal) override {
        return subtotal;      // no discount
    }

    string getrole() override {
        return "Student";
    }
};

class Employee : public Person {
public:
    Employee(string n, string i) : Person(n, i) {}

    double applydiscount(double subtotal) override {
        return subtotal - subtotal * 0.05;   // 5% discount
    }

    string getrole() override {
        return "Employee";
    }
};`,

  ordering: `// =================================================================
// printBillAndOrder & placeOrder C++ implementation
// =================================================================
void printBillAndOrder(Menu &menu, Person &customer, const string &custName) {
    cout << "Welcome " << custName << " (" << customer.getrole() << ")" << endl;

    vector<MenuItem*> order;
    string choice;
    cout << "\\nEnter Item ID to order (type 'done' to finish): ";
    while (cin >> choice && choice != "done") {
        MenuItem* selected = menu.selectItem(choice);
        Stock* stock = menu.getStock(choice);

        if (selected && stock) {
            if (stock->reduceStock(1)) {
                order.push_back(selected);
                cout << "Added: " << selected->getName() << endl;
            } else {
                cout << "Sorry, " << selected->getName() << " is out of stock!" << endl;
            }
        } else {
            cout << "Item not found!" << endl;
        }
        cout << "Enter Item ID (or 'done'): ";
    }

    double subtotal = 0;
    cout << "\\n----- Your Order -----" << endl;
    for (int i = 0; i < (int)order.size(); i++) {
        order[i]->display();
        subtotal += order[i]->getPrice();
    }

    double finalTotal = customer.applydiscount(subtotal);

    cout << "\\n----- Bill -----" << endl;
    cout << "Customer : " << custName << endl;
    cout << "Role     : " << customer.getrole() << endl;
    cout << "Subtotal : " << subtotal << endl;
    cout << "Total    : " << finalTotal << endl;
}

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
}`,

  full: `// =================================================================
// CAMPUS CANTEEN MANAGEMENT SYSTEM - COMPLETE C++ CODE
// =================================================================
#include <iostream>
#include <string>
#include <vector>
#include <stdexcept>
#include <limits>
using namespace std;

// (Includes MenuItem class, Food & Drink derived classes, 
// MenuItemFactory creator, Stock tracking, Person abstract structure,
// Student/Employee polymorphism, Menu system, and PlaceOrder exception handling)
// ... [Inspect specific class modules in navigation panel tabs for modular views] ...`
};

// =================================================================
// UI Update & Render Functions
// =================================================================

// 1. Populate/Filter Canteen Menu Grid
function renderMenu(categoryFilter = "all") {
  menuItemsGrid.innerHTML = "";
  
  menu.items.forEach(item => {
    const stock = menu.getStock(item.getId());
    const remaining = stock ? stock.getRemaining() : 0;
    const isFood = item instanceof Food;
    
    // Category mapping
    let categoryKey = "drink";
    let categoryDisplay = "Drink";
    if (isFood) {
      categoryDisplay = item.getCategory();
      categoryKey = categoryDisplay.toLowerCase().replace(" ", "");
    }
    
    // Apply filters
    if (categoryFilter !== "all") {
      if (categoryFilter === "food" && !isFood) return;
      if (categoryFilter === "drink" && isFood) return;
      if (categoryFilter !== "food" && categoryFilter !== "drink") {
        if (categoryKey !== categoryFilter) return;
      }
    }
    
    const card = document.createElement("div");
    card.className = `menu-card ${remaining === 0 ? 'out-of-stock' : ''}`;
    
    // Check low stock triggers
    let stockClass = "";
    let stockText = `${remaining} remaining`;
    if (remaining === 0) {
      stockClass = "empty";
      stockText = "Out of stock";
    } else if (remaining <= 3) {
      stockClass = "low";
      stockText = `${remaining} left (Low)`;
    }

    card.innerHTML = `
      <div class="menu-card-left">
        <span class="item-id-badge">${item.getId()}</span>
        <div class="item-info">
          <span class="item-name">${item.getName()}</span>
          <span class="item-subtext">
            <span class="item-cat">${categoryDisplay}</span>
            <span class="item-stock-qty ${stockClass}">${stockText}</span>
          </span>
        </div>
      </div>
      <div class="menu-card-right">
        <span class="item-price">${item.getPrice()} PKR</span>
        <button class="btn-add-item" data-id="${item.getId()}" ${remaining === 0 ? 'disabled' : ''}>+</button>
      </div>
    `;
    
    menuItemsGrid.appendChild(card);
  });

  // Bind click listeners to newly created plus buttons
  document.querySelectorAll(".btn-add-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const itemId = e.target.getAttribute("data-id");
      addItemToCart(itemId);
    });
  });
}

// 2. Populate Stock Report Dashboard
function renderStockDashboard() {
  stockListGrid.innerHTML = "";
  
  menu.items.forEach(item => {
    const stock = menu.getStock(item.getId());
    if (!stock) return;
    
    const remaining = stock.getRemaining();
    const sold = stock.getSold();
    const total = stock.getTotal();
    const pct = Math.max(0, Math.min(100, (remaining / total) * 100));
    
    // Progress meter colors
    let meterColor = "var(--accent-blue)";
    if (remaining === 0) meterColor = "var(--accent-red)";
    else if (remaining <= 3) meterColor = "var(--accent-amber)";

    const card = document.createElement("div");
    card.className = "stock-card";
    card.innerHTML = `
      <div class="stock-card-header">
        <span class="stock-card-name" title="${item.getName()}">${item.getName()}</span>
        <span class="stock-card-id">${item.getId()}</span>
      </div>
      <div class="stock-meter-bg">
        <div class="stock-meter-fill" style="width: ${pct}%; background-color: ${meterColor};"></div>
      </div>
      <div class="stock-card-counts">
        <span>Sold: <strong>${sold}</strong></span>
        <span>Left: <strong>${remaining}/${total}</strong></span>
      </div>
    `;
    stockListGrid.appendChild(card);
  });
  
  // Also synchronize restock dropdown selection list
  const currentVal = restockIdSelect.value;
  restockIdSelect.innerHTML = "";
  menu.items.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.getId();
    opt.textContent = `${item.getId()} - ${item.getName()}`;
    restockIdSelect.appendChild(opt);
  });
  if (currentVal) restockIdSelect.value = currentVal;
}

// =================================================================
// Core Terminal Simulator Logic (Simulates C++ Exception / Login)
// =================================================================

// Handle Authenticate Submit
btnLoginSubmit.addEventListener("click", () => {
  const name = inputName.value.trim();
  const idInput = inputId.value.trim().toLowerCase();
  
  if (!name) {
    showExceptionModal("Error: Name input field cannot be empty during authentication.");
    return;
  }
  
  // Mimic C++ placeOrder exception handling block
  try {
    if (idInput.substring(0, 3) === "std") {
      currentCustomer = new Student(name, idInput);
      loginSuccess();
    } else if (idInput.substring(0, 3) === "emp") {
      currentCustomer = new Employee(name, idInput);
      loginSuccess();
    } else {
      // Throw standard runtime error
      throw new Error("Invalid ID. Customer credentials must start with 'std' (Student) or 'emp' (Employee).");
    }
  } catch (err) {
    showExceptionModal(`std::runtime_error thrown!\\n\\n${err.message}`);
  }
});

// Authenticated session setup
function loginSuccess() {
  hudName.textContent = currentCustomer.name;
  hudRole.textContent = currentCustomer.getrole();
  hudId.textContent = currentCustomer.id.toUpperCase();
  
  // Style badges
  hudRole.className = `badge ${currentCustomer.getrole().toLowerCase()}`;
  
  // Transition screens
  screenLogin.classList.remove("active");
  screenOrdering.classList.add("active");
  
  currentCart = [];
  updateCartUI();
}

// Reset Terminal back to login
function resetTerminal() {
  currentCustomer = null;
  currentCart = [];
  inputName.value = "";
  inputId.value = "";
  terminalItemInput.value = "";
  
  screenOrdering.classList.remove("active");
  screenBill.classList.remove("active");
  screenLogin.classList.add("active");
}

btnExitOrdering.addEventListener("click", () => {
  resetTerminal();
});

// Add Item by ID (Text input)
btnAddItem.addEventListener("click", () => {
  const itemId = terminalItemInput.value.trim().toUpperCase();
  terminalItemInput.value = "";
  
  if (itemId) {
    addItemToCart(itemId);
  }
});

terminalItemInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btnAddItem.click();
  }
});

// Cart handling logic
function addItemToCart(itemId) {
  if (!currentCustomer) {
    showExceptionModal("Authentication Error: You must login to order items.");
    return;
  }
  
  const selected = menu.selectItem(itemId);
  const stock = menu.getStock(itemId);
  
  if (selected && stock) {
    if (stock.getRemaining() > 0) {
      currentCart.push(selected);
      updateCartUI();
    } else {
      showExceptionModal(`Out of stock!\\n\\nSorry, ${selected.getName()} is currently out of stock.`);
    }
  } else {
    showExceptionModal(`Item not found!\\n\\nItemID '${itemId}' does not exist in our canteen menu list.`);
  }
}

function removeItemFromCart(index) {
  currentCart.splice(index, 1);
  updateCartUI();
}

// Update Cart presentation
function updateCartUI() {
  cartTableBody.innerHTML = "";
  
  if (currentCart.length === 0) {
    cartEmptyMsg.style.display = "block";
    labelSubtotal.textContent = "0.00 PKR";
    btnSubmitOrder.disabled = true;
    btnSubmitOrder.classList.add("disabled");
    return;
  }
  
  cartEmptyMsg.style.display = "none";
  btnSubmitOrder.disabled = false;
  btnSubmitOrder.classList.remove("disabled");
  
  let subtotal = 0;
  
  currentCart.forEach((item, index) => {
    subtotal += item.getPrice();
    const row = document.createElement("tr");
    const isFood = item instanceof Food;
    const cat = isFood ? item.getCategory() : "Drink";
    
    row.innerHTML = `
      <td><strong>${item.getId()}</strong></td>
      <td>${item.getName()}</td>
      <td><span class="badge ${isFood ? 'meal' : 'drink'}" style="background: rgba(255,255,255,0.05); color: var(--text-secondary);">${cat}</span></td>
      <td>${item.getPrice()} PKR</td>
      <td><button class="btn-remove-cart" data-index="${index}">×</button></td>
    `;
    cartTableBody.appendChild(row);
  });
  
  labelSubtotal.textContent = `${subtotal.toFixed(2)} PKR`;
  
  // Bind remove buttons
  document.querySelectorAll(".btn-remove-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.target.getAttribute("data-index"));
      removeItemFromCart(idx);
    });
  });
}

// Submit Checkout
btnSubmitOrder.addEventListener("click", () => {
  if (currentCart.length === 0) return;
  
  // Verify stock availability one more time and decrement (simulating C++ reduceStock(1))
  const insufficientItems = [];
  currentCart.forEach(item => {
    const stock = menu.getStock(item.getId());
    if (stock.getRemaining() <= 0) {
      insufficientItems.push(item.getName());
    }
  });
  
  if (insufficientItems.length > 0) {
    showExceptionModal(`Checkout Aborted!\\n\\nThe following items went out of stock during processing: ${insufficientItems.join(", ")}`);
    return;
  }
  
  // Decrement stocks
  currentCart.forEach(item => {
    const stock = menu.getStock(item.getId());
    stock.reduceStock(1);
  });
  
  // Generate Bill Receipt
  const dateStr = new Date().toLocaleString();
  billDate.textContent = dateStr;
  billCustName.textContent = currentCustomer.name;
  billCustRole.textContent = currentCustomer.getrole();
  billCustId.textContent = currentCustomer.id.toUpperCase();
  
  billItemsBody.innerHTML = "";
  let subtotal = 0;
  
  currentCart.forEach(item => {
    subtotal += item.getPrice();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.getName()} [${item.getId()}]</td>
      <td class="text-right">${item.getPrice()}</td>
    `;
    billItemsBody.appendChild(row);
  });
  
  const finalTotal = currentCustomer.applydiscount(subtotal);
  const discountAmt = subtotal - finalTotal;
  
  billSubtotal.textContent = `${subtotal.toFixed(2)} PKR`;
  if (discountAmt > 0) {
    billDiscountRow.style.display = "flex";
    billDiscount.textContent = `-${discountAmt.toFixed(2)} PKR`;
  } else {
    billDiscountRow.style.display = "none";
  }
  billTotal.textContent = `${finalTotal.toFixed(2)} PKR`;
  
  // Render updates
  renderMenu();
  renderStockDashboard();
  
  // Switch screen
  screenOrdering.classList.remove("active");
  screenBill.classList.add("active");
});

btnRestartTerminal.addEventListener("click", () => {
  resetTerminal();
});

// =================================================================
// Restocking Console Operations
// =================================================================
btnSubmitRestock.addEventListener("click", () => {
  const itemId = restockIdSelect.value;
  const qty = parseInt(restockQtyInput.value);
  
  if (itemId && qty > 0) {
    const stock = menu.getStock(itemId);
    if (stock) {
      stock.addStock(qty);
      renderMenu();
      renderStockDashboard();
      
      // Visual pulse response for feedback
      restockQtyInput.value = 10;
      
      // Temporary success animation
      const btnText = btnSubmitRestock.textContent;
      btnSubmitRestock.textContent = "Stocks Added!";
      btnSubmitRestock.style.backgroundColor = "var(--accent-green)";
      setTimeout(() => {
        btnSubmitRestock.textContent = btnText;
        btnSubmitRestock.style.backgroundColor = "";
      }, 1500);
    }
  }
});

// =================================================================
// Modal Dialog for throwing virtual C++ Exceptions
// =================================================================
function showExceptionModal(msg) {
  modalExceptionMsg.innerHTML = msg.replace(/\\n/g, "<br>");
  exceptionModal.classList.add("active");
}

btnCloseModal.addEventListener("click", () => {
  exceptionModal.classList.remove("active");
});

// Click outside modal dismiss
exceptionModal.addEventListener("click", (e) => {
  if (e.target === exceptionModal) {
    exceptionModal.classList.remove("active");
  }
});

// =================================================================
// OOP Tabs and Interactive Panels
// =================================================================
const oopTabBtns = document.querySelectorAll(".oop-tab-btn");
const oopTabContents = document.querySelectorAll(".oop-tab-content");

oopTabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-tab");
    
    oopTabBtns.forEach(b => b.classList.remove("active"));
    oopTabContents.forEach(c => c.classList.remove("active"));
    
    btn.classList.add("active");
    document.getElementById(`oop-${target}`).classList.add("active");
  });
});

// Category Tab Filters inside Menu Explorer
menuTabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    menuTabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const cat = btn.getAttribute("data-category");
    renderMenu(cat);
  });
});

// =================================================================
// Code Inspector Collapsible & Code Switcher
// =================================================================
codeInspectorTrigger.addEventListener("click", () => {
  codeInspectorSection.classList.toggle("collapsed");
});

codeNavBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    codeNavBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const file = btn.getAttribute("data-file");
    cppCodeDisplay.textContent = cppSnippets[file] || "// File not found";
  });
});

// =================================================================
// Window Load Initialization
// =================================================================
window.addEventListener("DOMContentLoaded", () => {
  // Populate menu and stock lists
  renderMenu();
  renderStockDashboard();
  
  // Set default code display
  cppCodeDisplay.textContent = cppSnippets.full;
});
