import _ from "lodash";
import { v4 as uuid } from "uuid";

const bookmarksList = document.querySelector(".bookmarks");
const bookmarkName = document.querySelector("#bookmark-name");
const addBth = document.querySelector("#add-bookmark");

class Bookmark {
  constructor({ name, id }) {
    this.name = name;
    this.id = id;
  }
}

const bookmarks = [];

const bookmarksLocalStorage = JSON.parse(localStorage.getItem("bookmarks"));

if (bookmarksLocalStorage !== null) {
  if (bookmarksLocalStorage.length !== 0) {
    bookmarksLocalStorage.forEach((bookmark) => {
      const item = document.createElement("li");

      const posDiv = document.createElement("div");
      posDiv.classList.add("position-div");
      posDiv.style.position = "relative";

      const text = document.createElement("p");
      text.textContent = bookmark.name;

      const changeBtn = document.createElement("button");
      changeBtn.textContent = "Change";

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";

      const bookmarkData = new Bookmark({
        name: bookmark.name,
        id: bookmark.id,
      });

      bookmarks.push(bookmarkData);

      bookmarksList.prepend(item);

      item.append(posDiv);
      item.append(changeBtn);
      item.append(removeBtn);

      posDiv.append(text);

      const changeBookmark = () => {
        changeBtn.removeEventListener("click", changeBookmark);

        const input = document.createElement("input");
        input.value = text.textContent;
        input.style.position = "absolute";
        input.style.top = "0";
        input.style.left = "0";

        text.style.opacity = "0";

        const changeText = (e) => {
          input.remove();

          text.textContent = input.value;
          text.style.opacity = "1";

          let currIndex;

          bookmarks.forEach((bookmark, index) => {
            if (bookmark.id === bookmarkData.id) currIndex = index;
          });

          const currBookmark = new Bookmark({
            name: text.textContent,
            id: bookmarkData.id,
          });

          bookmarks[currIndex] = currBookmark;

          input.removeEventListener("blur", changeText);
          changeBtn.addEventListener("click", changeBookmark);

          localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        };

        input.addEventListener("blur", changeText);

        input.addEventListener("keydown", (e) => {
          if (e.code === "Enter") {
            changeText();
          }
        });

        posDiv.append(input);
      };

      const removeBookmark = () => {
        item.remove();
        _.remove(bookmarks, (bookmark) => bookmark.id === bookmarkData.id);

        changeBtn.removeEventListener("click", changeBookmark);
        removeBtn.removeEventListener("click", removeBookmark);

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      };

      changeBtn.addEventListener("click", changeBookmark);
      removeBtn.addEventListener("click", removeBookmark);
    });
  }
}

addBth.addEventListener("click", (e) => {
  if (bookmarkName.value !== "") {
    const item = document.createElement("li");

    const posDiv = document.createElement("div");
    posDiv.classList.add("position-div");
    posDiv.style.position = "relative";

    const text = document.createElement("p");
    text.textContent = bookmarkName.value;

    const changeBtn = document.createElement("button");
    changeBtn.textContent = "Change";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    bookmarkName.value = "";

    const bookmarkData = new Bookmark({
      name: text.textContent,
      id: uuid(),
    });

    bookmarks.push(bookmarkData);

    bookmarksList.prepend(item);

    item.append(posDiv);
    item.append(changeBtn);
    item.append(removeBtn);

    posDiv.append(text);

    const changeBookmark = () => {
      changeBtn.removeEventListener("click", changeBookmark);

      const input = document.createElement("input");
      input.value = text.textContent;
      input.style.position = "absolute";
      input.style.top = "0";
      input.style.left = "0";

      text.style.opacity = "0";

      const changeText = (e) => {
        input.remove();

        text.textContent = input.value;
        text.style.opacity = "1";

        let currIndex;

        bookmarks.forEach((bookmark, index) => {
          if (bookmark.id === bookmarkData.id) currIndex = index;
        });

        const currBookmark = new Bookmark({
          name: text.textContent,
          id: bookmarkData.id,
        });

        bookmarks[currIndex] = currBookmark;

        input.removeEventListener("blur", changeText);
        changeBtn.addEventListener("click", changeBookmark);

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      };

      input.addEventListener("blur", changeText);

      input.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
          changeText();
        }
      });

      posDiv.append(input);
    };

    const removeBookmark = () => {
      item.remove();
      _.remove(bookmarks, (bookmark) => bookmark.id === bookmarkData.id);

      changeBtn.removeEventListener("click", changeBookmark);
      removeBtn.removeEventListener("click", removeBookmark);

      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    };

    changeBtn.addEventListener("click", changeBookmark);
    removeBtn.addEventListener("click", removeBookmark);
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
});
