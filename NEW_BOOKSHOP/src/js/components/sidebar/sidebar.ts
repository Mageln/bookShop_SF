
// import BookLoader from "../../api/api";
// import Cart from "../../models/cart";
// import { bookListRender } from "../../utils";

// class Sidebar {
//   private links: NodeListOf<HTMLElement>;
//   private activeCategory: string;



  

//   constructor() {
   
//     this.links = document.querySelectorAll(".sidebar__link");
//     this.activeCategory = "Architecture"; // Инициализация активной категории

//     // Назначаем обработчики событий для ссылок
//     this.links.forEach((link) => {
//       link.addEventListener("click", () => {
//         this.activateCategory(link);
//       });
//     });
//   }

//   private activateCategory(link: HTMLElement) {
//     // Удаляем класс активной категории с предыдущей ссылки
//     document.querySelector(".sidebar__link__active")?.classList.remove("sidebar__link__active");
//     // Добавляем класс активной категории к выбранной ссылке
//     link.classList.add("sidebar__link__active");
//     // Обновляем активную категорию
//     this.activeCategory = link.innerText;
//     // Вызываем метод для обновления списка книг по выбранной категории
//     this.getBooks();
//   }

//   private async getBooks() {
    
//     const bookList = document.getElementById("bookList");
//     if(bookList) {
//       try {
//         const bookLoader = new BookLoader(this.activeCategory, 0,10);
//         const books = await bookLoader.getBooks();
//       } catch(error){
//         console.error("Error loading books", error)
//       }
//     } 
//   }
// }

// // Создание экземпляра класса Sidebar
// const sidebar = new Sidebar();
// export default Sidebar;
import BookLoader from "../../api/api"; 
import { bookListRender } from "../../utils"; 
import Cart from "../../models/cart"; 

class Sidebar {
  // Класс боковой панели
  links: Array<string> = [
    "Architecture",
    "Art & Fashion",
    "Biography",
    "Business",
    "Crafts & Hobbies",
    "Drama",
    "Fiction",
    "Food & Drink",
    "Health & Wellbeing",
    "History & Politics",
    "Humor",
    "Poetry",
    "Psychology",
    "Science",
    "Technology",
    "Travel & Maps"
  ];

  active: number = 0;
  loader: BookLoader;
  bookList: HTMLElement;
  cart: Cart;

  constructor(loader: BookLoader, bookList: HTMLElement, cart: Cart) {
    this.loader = loader;
    this.bookList = bookList;
    this.cart = cart;
  }

  public render(): void {
    // Отрисовка боковой панели
    const element: HTMLElement = <HTMLElement>(
      document.getElementById("sidebar")
    );
    element.innerHTML = "";
    const loadMoreBtn: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("loadMoreBtn")
    );
    for (let i = 0; i < this.links.length; i++) {
      const li: HTMLElement = document.createElement("li");
      li.classList.add("sidebar__link");
      li.innerText = this.links[i];
      if (i === this.active) {
        li.classList.add("sidebar__link__active");
        element.dataset.category = this.links[i];
      } else {
        this.bookList.innerHTML = '';
        li.addEventListener("click", (e) => {
          this.loader.setParams(this.links[i], 0, 6);
          this.loader.getBooks().then((data) => {
            bookListRender(data, this.bookList, this.cart);
            loadMoreBtn.dataset.startIndex = "6";
          });
          this.active = i;
          this.render();
        });
      }
      element.appendChild(li);
    }
  }
}

export default Sidebar;
