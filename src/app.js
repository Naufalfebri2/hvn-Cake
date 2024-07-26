document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Mix Fruits cake", img: "1.jpg", price: 75000 },
      { id: 2, name: "Brownies Boxes Besar", img: "2.jpg", price: 120000 },
      { id: 3, name: "Brownies Boxes Sedang", img: "3.jpg", price: 85000 },
      { id: 4, name: "Brownies Oreo", img: "4.jpg", price: 90000 },
      { id: 5, name: "Nastar", img: "5.jpg", price: 65000 },
      { id: 6, name: "Kue Salju", img: "6.jpg", price: 70000 },
      { id: 7, name: "Donat Strawberry Chess", img: "7.jpg", price: 20000 },
      { id: 8, name: "Donat Chocolate", img: "8.jpg", price: 20000 },
      { id: 9, name: "Donat Chocolate Mesis", img: "9.jpg", price: 20000 },
      { id: 10, name: "Donat Sugar Mesis", img: "10.jpg", price: 20000 },
      { id: 11, name: "Donat Strawberry Mesis", img: "11.jpg", price: 20000 },
      {
        id: 12,
        name: "Donat Chocolate Vla Mesis",
        img: "12.jpg",
        price: 20000,
      },
      { id: 13, name: "Donat Oreo Vla", img: "13.jpg", price: 20000 },
      { id: 14, name: "Donat Greentea Vla", img: "14.jpg", price: 20000 },
      { id: 15, name: "Donat Charcoal", img: "15.jpg", price: 20000 },
      { id: 16, name: "Donat Sugar", img: "16.jpg", price: 20000 },
      { id: 17, name: "Donat Chocolate Vla", img: "17.jpg", price: 20000 },
      { id: 18, name: "Donat Red Velvet", img: "18.jpg", price: 20000 },
      { id: 19, name: "Donat Peanut", img: "19.jpg", price: 20000 },
      { id: 20, name: "Donat Coffee", img: "20.jpg", price: 20000 },
      { id: 21, name: "Donat Chocolate Peanut", img: "21.jpg", price: 20000 },
      { id: 22, name: "Donat Almond", img: "22.jpg", price: 20000 },
      { id: 23, name: "Donat Chess", img: "23.jpg", price: 20000 },
      { id: 24, name: "Donat Vanilli Chocolate", img: "24.jpg", price: 20000 },
      { id: 25, name: "Donat White Chocolate", img: "25.jpg", price: 200000 },
      { id: 26, name: "Donat Boxes Kecil 1", img: "26.jpg", price: 90000 },
      { id: 27, name: "Donat Boxes Kecil 2", img: "27.jpg", price: 120000 },
      { id: 28, name: "Donat Sandwich Classic", img: "28.jpg", price: 30000 },
      { id: 29, name: "Donat Sandwich Spesial", img: "29.jpg", price: 40000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //   Jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // Jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // Jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }

  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// Kirim data ketika tombol chekcout di klik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);

  window.open(
    "https://wa.me/+6289518129197?text=" + encodeURIComponent(message)
  );
});

// Format pesan WhatsApp
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  Alamat: ${obj.address}
  No. Telepon: ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map(
  (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
)}
TOTAL: ${rupiah(obj.total)}

Terima Kasih Atas Pesanan Anda.`;
};

// Konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
