#include <iostream>
#include <string>
#include <vector>
#include <stdexcept>
#include<limits>
using namespace std;

// =================================================================
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
};

// Factory
class MenuItemFactory {
public:
    static MenuItem* createItem(string type, string itemId, string name, double price, string category = "") {
        if (type == "Food") {
            return new Food(itemId, name, price, category);
        }
        else if (type == "Drink") {
            return new Drink(itemId, name, price);
        }
        return nullptr;
    }
};

// =================================================================
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
};

// =================================================================
// person hierarchy — taken from ccp_summer.cpp, COMPLETELY UNCHANGED
// (no added getters, no added destructor — see placeOrder() below for
// how name/discount/role get used without needing any of that)
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
};

// =================================================================
// Menu — taken from stock.cpp, UNCHANGED
// =================================================================
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
            if (stocks[i].getItemId() == itemId) return &stocks[i];
        }
        return nullptr;
    }

    MenuItem* selectItem(string itemId) {
        for (int i = 0; i < (int)items.size(); i++) {
            if (items[i]->getId() == itemId) return items[i];
        }
        return nullptr;
    }

    void displayAll() {
        cout << "\n----- Menu -----" << endl;
        for (int i = 0; i < (int)items.size(); i++) {
            items[i]->display();
        }
    }

    void displayStockReport() {
        cout << "\nFood Items Stock Status:" << endl;
        for (int i = 0; i < (int)items.size(); i++) {
            if (dynamic_cast<Food*>(items[i]) != nullptr) {
                if (stocks[i].getRemaining() > 0) {
                    cout << items[i]->getName() << ": " << stocks[i].getRemaining() << " remaining" << endl;
                }
                else {
                    cout << items[i]->getName() << ": Out of stock" << endl;
                }
            }
        }

        cout << "\nDrink Items Stock Status:" << endl;
        for (int i = 0; i < (int)items.size(); i++) {
            if (dynamic_cast<Drink*>(items[i]) != nullptr) {
                if (stocks[i].getRemaining() > 0) {
                    cout << items[i]->getName() << ": " << stocks[i].getRemaining() << " remaining" << endl;
                }
                else {
                    cout << items[i]->getName() << ": Out of stock" << endl;
                }
            }
        }
    }

    void restock(string itemId, int qty) {
        Stock* s = getStock(itemId);
        if (s) {
            s->addStock(qty);
            cout << "Stock updated!" << endl;
        } else {
            cout << "Item not found!" << endl;
        }
    }

    ~Menu() {
        for (int i = 0; i < (int)items.size(); i++) delete items[i];
    }
};

// =================================================================
// printBillAndOrder — NEW glue function. Doesn't belong to either
// original module; it's what connects the ordering loop (stock.cpp)
// to the discount calculation (ccp_summer.cpp) so that logic isn't
// duplicated once per branch (student vs employee) in placeOrder().
// Takes `person &customer` by reference — applydiscount()/getrole()
// still dispatch polymorphically through a reference, no pointer or
// destructor needed at all.
// =================================================================
void printBillAndOrder(Menu &menu, Person &customer, const string &custName) {
    cout << "Welcome " << custName << " (" << customer.getrole() << ")" << endl;

    // --- original ordering loop from stock.cpp, unchanged ---
    vector<MenuItem*> order;
    string choice;
    cout << "\nEnter Item ID to order (type 'done' to finish): ";
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
    cout << "\n----- Your Order -----" << endl;
    for (int i = 0; i < (int)order.size(); i++) {
        order[i]->display();
        subtotal += order[i]->getPrice();
    }

    double finalTotal = customer.applydiscount(subtotal);

    cout << "\n----- Bill -----" << endl;
    cout << "Customer : " << custName << endl;
    cout << "Role     : " << customer.getrole() << endl;
    cout << "Subtotal : " << subtotal << endl;
    cout << "Total    : " << finalTotal << endl;
}

// =================================================================
// placeOrder — the substring check + try/catch here is the SAME
// structure as ccp_summer.cpp's original main() (same variable names,
// same two catch blocks). Only difference: instead of just printing
// role + discounted total inline, it calls printBillAndOrder() so the
// customer can actually pick items off the (stock-aware) menu.
// =================================================================
void placeOrder(Menu &menu) {
    string name, id;

    cout << "\nEnter your name: ";
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
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
}

int main() {
    Menu menu;
    menu.addItem(MenuItemFactory::createItem("Food", "F01", "Chicken Biryani", 250, "Meal"), 10);
    menu.addItem(MenuItemFactory::createItem("Food", "F02", "Chicken Karahi", 400, "Meal"), 5);
    menu.addItem(MenuItemFactory::createItem("Food", "F05", "Zinger Burger", 350, "Fast Food"), 10);
    menu.addItem(MenuItemFactory::createItem("Food", "F06", "Chicken Burger", 250, "Fast Food"), 12);
    menu.addItem(MenuItemFactory::createItem("Food", "F07", "Beef Burger", 320, "Fast Food"), 8);
    menu.addItem(MenuItemFactory::createItem("Food", "F08", "French Fries", 150, "Snack"), 20);
    menu.addItem(MenuItemFactory::createItem("Food", "F09", "Chicken Sandwich", 180, "Snack"), 15);
    menu.addItem(MenuItemFactory::createItem("Food", "F10", "Club Sandwich", 280, "Snack"), 10);
    menu.addItem(MenuItemFactory::createItem("Food", "F11", "Chicken Roll", 170, "Snack"), 18);
    menu.addItem(MenuItemFactory::createItem("Food", "F12", "Vegetable Pizza Slice", 200, "Fast Food"), 10);
    menu.addItem(MenuItemFactory::createItem("Food", "F13", "Chicken Pizza Slice", 250, "Fast Food"), 10);
    menu.addItem(MenuItemFactory::createItem("Food", "F14", "Samosa", 50, "Snack"), 40);
    menu.addItem(MenuItemFactory::createItem("Food", "F15", "Chicken Patties", 90, "Snack"), 30);
    menu.addItem(MenuItemFactory::createItem("Food", "F16", "Shawarma", 220, "Fast Food"), 12);
    menu.addItem(MenuItemFactory::createItem("Food", "F17", "Chicken Nuggets", 240, "Snack"), 15);
    menu.addItem(MenuItemFactory::createItem("Food", "F18", "Paratha Roll", 180, "Snack"), 15);
    
    menu.addItem(MenuItemFactory::createItem("Drink", "D01", "Cola", 80), 20);
    menu.addItem(MenuItemFactory::createItem("Drink", "D02", "Mineral Water", 40), 15);
    menu.addItem(MenuItemFactory::createItem("Drink", "D03", "7UP", 80), 20);
    menu.addItem(MenuItemFactory::createItem("Drink", "D04", "Sprite", 80), 20);
    menu.addItem(MenuItemFactory::createItem("Drink", "D05", "Fanta", 80), 20);
    menu.addItem(MenuItemFactory::createItem("Drink", "D06", "Pepsi", 80), 20);
    menu.addItem(MenuItemFactory::createItem("Drink", "D07", "Mountain Dew", 90), 15);
    menu.addItem(MenuItemFactory::createItem("Drink", "D08", "Fresh Lime", 120), 10);
    menu.addItem(MenuItemFactory::createItem("Drink", "D09", "Orange Juice", 150), 12);
    menu.addItem(MenuItemFactory::createItem("Drink", "D10", "Mango Juice", 150), 12);
    menu.addItem(MenuItemFactory::createItem("Drink", "D11", "Apple Juice", 160), 10);
    menu.addItem(MenuItemFactory::createItem("Drink", "D12", "Tea", 70), 25);
    menu.addItem(MenuItemFactory::createItem("Drink", "D13", "Coffee", 120), 20);
    menu.addItem(MenuItemFactory::createItem("Drink", "D14", "Chocolate Milk", 180), 10);
    menu.addItem(MenuItemFactory::createItem("Drink", "D15", "Lassi", 140), 12);

    int option;
    do {
        cout << "\n========= MAIN MENU =========" << endl;
        cout << "1. Show Menu" << endl;
        cout << "2. Place Order" << endl;
        cout << "3. Stock Report" << endl;
        cout << "4. Restock Item" << endl;
        cout << "5. Exit" << endl;
        cout << "==============================" << endl;
        cout << "Enter your choice: ";
        cin >> option;

        switch (option) {
            case 1:
                menu.displayAll();
                break;
            case 2:
                menu.displayAll();
                placeOrder(menu);
                break;
            case 3:
                menu.displayStockReport();
                break;
            case 4: {
                string id;
                int qty;
                cout << "Enter Item ID to restock: ";
                cin >> id;
                cout << "Enter quantity to add: ";
                cin >> qty;
                menu.restock(id, qty);
                break;
            }
            case 5:
                cout << "Exiting... Thank you!" << endl;
                break;
            default:
                cout << "Invalid choice, try again!" << endl;
        }
    } while (option != 5);

    return 0;
}
