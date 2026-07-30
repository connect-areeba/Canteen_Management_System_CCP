#include <iostream>
#include <string>
#include <vector>
using namespace std;

// ===================================
// MenuItem hierarchy — UNCHANGED
// ===================================

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

//  Food
class Food : public MenuItem {
private:
    string category;
public:
    Food(string itemId, string name, double price, string category): MenuItem(itemId, name, price) {
        this->category = category;
    }
    void display() override {
        cout<<"[Food] "<<itemId<<" - "<< name<<" | Category: "<< category<<" | Price: "<<price<<endl;
    }
};

// Drink 
class Drink : public MenuItem {
public:
    Drink(string itemId, string name, double price)
        : MenuItem(itemId, name, price) {}
    void display() override {
        cout<<"[Drink] "<<itemId <<" - "<<name<< " | Price: " << price << endl;
    }
};

// Factory Design Pattern
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
