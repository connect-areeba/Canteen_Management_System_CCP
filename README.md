# 🍽️ Canteen Management System (C++ OOP)

### 🌐 [Interactive Web Simulator (Click to View Live Project)](https://hasanshahir.github.io/Canteen_Management_System_CCP/)

A console-based **Canteen Management System** developed in **C++** using Object-Oriented Programming (OOP) concepts. The system allows users to browse the menu, place orders, manage stock, generate bills, and apply discounts based on customer type.

---

## 📌 Features

- 📋 Display food and drink menu
- 🛒 Place customer orders
- 📦 Real-time stock management
- 💰 Automatic bill generation
- 🎓 Student & Employee support
- 🏷 Employee discount (5%)
- 🔄 Restock menu items
- ⚠ Exception handling for invalid IDs
- 🏭 Factory Design Pattern for creating menu items

---

## 🛠️ OOP Concepts Used

- Classes & Objects
- Inheritance
- Polymorphism
- Abstract Classes
- Virtual Functions
- Function Overriding
- Encapsulation
- Dynamic Binding
- Exception Handling
- Dynamic Memory Management
- Factory Design Pattern

---

## 📂 Class Structure

```
MenuItem (Abstract)
├── Food
└── Drink

Person (Abstract)
├── Student
└── Employee

Menu
Stock
MenuItemFactory
```

---

## 📖 Program Workflow

1. Display available menu items.
2. Customer enters their name and ID.
3. System identifies whether the customer is a Student or Employee.
4. Customer selects items using Item IDs.
5. Stock is updated automatically.
6. Bill is generated.
7. Employee receives a 5% discount.
8. Admin can view stock reports or restock items.

---

## 📋 Main Menu

```
1. Show Menu
2. Place Order
3. Stock Report
4. Restock Item
5. Exit
```

---

## 💻 Technologies Used

- C++
- Standard Template Library (STL)
- Object-Oriented Programming
- Console Application

---

## 🚀 How to Run

1. Clone this repository

```bash
git clone https://github.com/your-username/Canteen-Management-System.git
```

2. Compile

```bash
g++ main.cpp -o canteen
```

3. Run

```bash
./canteen
```

---

## 📁 Project Highlights

- Uses **abstract base classes** (`MenuItem`, `Person`)
- Demonstrates **runtime polymorphism** through virtual functions
- Implements the **Factory Design Pattern**
- Manages inventory using STL `vector`
- Supports dynamic menu creation
- Includes exception handling for invalid customer IDs

---

## 📸 Sample Output

```
========= MAIN MENU =========
1. Show Menu
2. Place Order
3. Stock Report
4. Restock Item
5. Exit
==============================
```

---

## 👥 Team Members

| Name | Roll Number |
|------|-------------|
| Areeba | CT-25070 |
| Bushra Abid | CT-25057 |
| Hasan Shahir | CT-25095 |
| Eshba | CT-25052 |
| Hassaan Hammed | CT-25097 |

---

**Department:** BCIT (Computer & Information Technology)  
**University:** NED University of Engineering & Technology

---

## 📜 License

This project is developed for educational and learning purposes.
