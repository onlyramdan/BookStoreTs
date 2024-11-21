"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var scanner = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var books = [
    { id: 1, name: "Java", price: 15000 },
    { id: 2, name: "Kotlin", price: 13000 },
    { id: 3, name: "Golang", price: 12000 },
    { id: 4, name: "Python", price: 14000 }
];
var cart = [];
function showMenu() {
    console.log("===========================");
    console.log('Menu:');
    console.log("===========================");
    console.log('1. List Book');
    console.log('2. Keranjang');
    console.log('3. Exit');
    scanner.question('Pilih menu : ', function (choice) {
        if (choice === '1') {
            listBooks();
        }
        else if (choice === '2') {
            showCart();
        }
        else if (choice === '3') {
            exitProgram();
        }
        else {
            console.log('Input tidak valid.');
            showMenu();
        }
    });
}
function listBooks() {
    console.log("===========================");
    console.log('Daftar Buku:');
    console.log("===========================");
    books.forEach(function (book) {
        console.log("".concat(book.id, ". ").concat(book.name, "  Rp. ").concat(book.price));
    });
    scanner.question('Pilih buku : ', function (bookId) {
        var book = books.find(function (b) { return b.id === parseInt(bookId); });
        if (book) {
            scanner.question('Input qty: ', function (qty) {
                var quantity = parseInt(qty);
                if (quantity > 0) {
                    var cartItem = cart.find(function (b) { return b.id === book.id; });
                    if (cartItem) {
                        cartItem.quantity += quantity;
                        cart.splice(cart.indexOf(cartItem), 1);
                        cart.push(cartItem);
                    }
                    else {
                        cart.push({ id: book.id, name: book.name, price: book.price, quantity: quantity });
                    }
                    console.log('Apakah ingin menambahkan buku lain? (y/n)');
                    scanner.question('input : ', function (choice) {
                        if (choice === 'y') {
                            listBooks();
                        }
                        else if (choice === 'n') {
                            showMenu();
                        }
                        else {
                            console.log('Input tidak valid.');
                            showMenu();
                        }
                    });
                }
                else {
                    console.log('Jumlah buku tidak valid.');
                    listBooks();
                }
            });
        }
        else {
            console.log('Buku tidak ditemukan.');
            listBooks();
        }
    });
}
function showCart() {
    console.log("===========================");
    console.log('Keranjang');
    console.log("===========================");
    var totalPrice = 0;
    if (cart.length === 0) {
        console.log('Keranjang kosong.');
    }
    else {
        console.log('------------------------------------------------------------------------');
        cart.forEach(function (book, i) {
            console.log("".concat(i + 1, ". ").concat(book.name, " | qty = ").concat(book.quantity, ", | Harga = Rp. ").concat(book.price * book.quantity));
            totalPrice += book.price * book.quantity;
        });
        console.log('\nTotal Harga = Rp. ' + totalPrice);
        console.log('------------------------------------------------------------------------');
    }
    console.log('\n1. Beli Sekarang');
    console.log('2. Tambah Item');
    console.log('3. Edit Item');
    console.log('4. Hapus Item');
    console.log('5. Kosongkan Keranjang');
    console.log('0. Kembali ke halaman utama');
    scanner.question('input: ', function (choice) {
        if (choice == '1') {
            if (cart.length == 0) {
                console.log('keranjang and kosong');
                showCart();
            }
            console.log('Berhasil Checkout Total price = Rp. ' + totalPrice);
            cart = [];
            showMenu();
        }
        else if (choice == '2') {
            listBooks();
        }
        else if (choice == '3') {
            editQuantity();
        }
        else if (choice == '4') {
            deleteItem();
        }
        else if (choice == '5') {
            cart = [];
            showCart();
        }
        else if (choice == '0') {
            showMenu();
        }
        else {
            console.log('Input tidak valid.');
            showCart();
        }
    });
}
function deleteItem() {
    console.log("===========================");
    console.log('Delete Item');
    console.log("===========================");
    if (cart.length === 0) {
        console.log('Keranjang kosong.');
        showCart();
    }
    else {
        console.log('------------------------------------------------------------------------');
        cart.forEach(function (book, i) {
            console.log("".concat(i + 1, ". ").concat(book.name, " | qty = ").concat(book.quantity, ", | Harga = Rp. ").concat(book.price * book.quantity));
        });
        console.log('------------------------------------------------------------------------');
    }
    scanner.question('Pilih Item yang ingin dihapus:', function (itemNumber) {
        if (!isNaN(parseInt(itemNumber)) && parseInt(itemNumber) > 0) {
            var itemIndex = parseInt(itemNumber) - 1;
            if (itemIndex >= 0 && itemIndex < cart.length) {
                cart.splice(itemIndex, 1);
                console.log('Item deleted.');
                showCart();
            }
            else {
                console.log('Invalid item number.');
                deleteItem();
            }
        }
        else {
            console.log('Input tidak valid.');
            deleteItem();
        }
    });
}
function editQuantity() {
    console.log("===========================");
    console.log('Edit Quantity');
    console.log("===========================");
    if (cart.length === 0) {
        console.log('Keranjang kosong.');
        showCart();
    }
    else {
        console.log('------------------------------------------------------------------------');
        cart.forEach(function (book, i) {
            console.log("".concat(i + 1, ". ").concat(book.name, " | qty = ").concat(book.quantity, ", | Harga = Rp. ").concat(book.price * book.quantity));
        });
        console.log('------------------------------------------------------------------------');
    }
    scanner.question('Pilih item yang ingin diedit: ', function (itemNumber) {
        if (!isNaN(parseInt(itemNumber)) && parseInt(itemNumber) > 0) {
            var itemIndex_1 = parseInt(itemNumber) - 1;
            if (itemIndex_1 >= 0 && itemIndex_1 < cart.length) {
                scanner.question('Input quantity: ', function (newQuantity) {
                    var quantity = parseInt(newQuantity);
                    if (quantity > 0) {
                        cart[itemIndex_1].quantity = quantity;
                        console.log('Quantity updated.');
                        showCart();
                    }
                    else {
                        console.log('Invalid quantity.');
                        editQuantity();
                    }
                });
            }
            else {
                console.log('Invalid Item number.');
                editQuantity();
            }
        }
        else {
            console.log('Input tidak valid.');
            editQuantity();
        }
    });
}
function exitProgram() {
    console.log('Terima Kasih Telah Berkunjung di Book Store !');
    scanner.close();
}
showMenu();
