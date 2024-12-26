import _ from "lodash";
import { v4 as uuid } from "uuid";

const nameInput = document.querySelector("#name");
const surnameInput = document.querySelector("#surname");
const phoneNumberInput = document.querySelector("#phone-number");
const emailInput = document.querySelector("#email");
const btnAdd = document.querySelector("#add-contact");
const contactsList = document.querySelector(".contacts");

class Contact {
  constructor({ name, surname, phoneNumber, email, id }) {
    this.name = name;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.id = id;
  }
}

const contacts = [];

const contactsLocalStorage = JSON.parse(localStorage.getItem("contacts"));

if (contactsLocalStorage !== null) {
  if (contactsLocalStorage.length !== 0) {
    contactsLocalStorage.forEach((contact) => {
      const item = document.createElement("li");

      const nameBox = document.createElement("div");
      nameBox.style.display = "flex";
      nameBox.style.gap = "10px";

      const name = document.createElement("p");
      name.textContent = contact.name;
      name.setAttribute("contenteditable", "");

      const surname = document.createElement("p");
      surname.textContent = contact.surname;
      surname.setAttribute("contenteditable", "");

      const phoneNumber = document.createElement("p");
      phoneNumber.textContent = contact.phoneNumber;
      phoneNumber.setAttribute("contenteditable", "");

      const email = document.createElement("p");
      email.textContent = contact.email;
      email.setAttribute("contenteditable", "");

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";

      const contactData = new Contact({
        name: contact.name,
        surname: contact.surname,
        phoneNumber: contact.phoneNumber,
        email: contact.email,
        id: contact.id,
      });

      contacts.push(contactData);

      contactsList.prepend(item);

      item.append(nameBox, phoneNumber, email, removeBtn);
      nameBox.append(name, surname);

      const changeElements = () => {
        name.addEventListener("blur", (e) => {
          let currIndex;
  
          contacts.forEach((contact, index) => {
            if (contact.id === contactData.id) currIndex = index;
          });
  
          contactData.name = e.target.textContent;
  
          contacts[currIndex] = contactData;
  
          localStorage.setItem("contacts", JSON.stringify(contacts));
        });
  
        surname.addEventListener("blur", (e) => {
          let currIndex;
  
          contacts.forEach((contact, index) => {
            if (contact.id === contactData.id) currIndex = index;
          });
  
          contactData.surname = e.target.textContent;
  
          contacts[currIndex] = contactData;
  
          localStorage.setItem("contacts", JSON.stringify(contacts));
        });
  
        phoneNumber.addEventListener("blur", (e) => {
          let currIndex;
  
          contacts.forEach((contact, index) => {
            if (contact.id === contactData.id) currIndex = index;
          });
  
          contactData.phoneNumber = e.target.textContent;
  
          contacts[currIndex] = contactData;
  
          localStorage.setItem("contacts", JSON.stringify(contacts));
        });
  
        email.addEventListener("blur", (e) => {
          let currIndex;
  
          contacts.forEach((contact, index) => {
            if (contact.id === contactData.id) currIndex = index;
          });
  
          contactData.email = e.target.textContent;
  
          contacts[currIndex] = contactData;
  
          localStorage.setItem("contacts", JSON.stringify(contacts));
        });
      };
  
      changeElements();

      const removeContact = () => {
        item.remove();
        _.remove(contacts, (contact) => contact.id === contactData.id);

        removeBtn.removeEventListener("click", removeContact);

        localStorage.setItem("contacts", JSON.stringify(contacts));
      };

      removeBtn.addEventListener("click", removeContact);
    });
  }
}

btnAdd.addEventListener("click", (e) => {
  if (nameInput.value !== "" && phoneNumberInput.value !== "") {
    e.preventDefault();

    const item = document.createElement("li");

    const nameBox = document.createElement("div");
    nameBox.style.display = "flex";
    nameBox.style.gap = "10px";

    const name = document.createElement("p");
    name.textContent = nameInput.value;
    name.setAttribute("contenteditable", "");

    const surname = document.createElement("p");
    surname.textContent = surnameInput.value;
    surname.setAttribute("contenteditable", "");

    const phoneNumber = document.createElement("p");
    phoneNumber.textContent = phoneNumberInput.value;
    phoneNumber.setAttribute("contenteditable", "");

    const email = document.createElement("p");
    email.textContent = emailInput.value;
    email.setAttribute("contenteditable", "");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    const contactData = new Contact({
      name: name.textContent,
      surname: surname.textContent,
      phoneNumber: phoneNumber.textContent,
      email: email.textContent,
      id: uuid(),
    });

    contacts.push(contactData);

    contactsList.prepend(item);

    item.append(nameBox, phoneNumber, email, removeBtn);
    nameBox.append(name, surname);

    const changeElements = () => {
      name.addEventListener("blur", (e) => {
        let currIndex;

        contacts.forEach((contact, index) => {
          if (contact.id === contactData.id) currIndex = index;
        });

        contactData.name = e.target.textContent;

        contacts[currIndex] = contactData;

        localStorage.setItem("contacts", JSON.stringify(contacts));
      });

      surname.addEventListener("blur", (e) => {
        let currIndex;

        contacts.forEach((contact, index) => {
          if (contact.id === contactData.id) currIndex = index;
        });

        contactData.surname = e.target.textContent;

        contacts[currIndex] = contactData;

        localStorage.setItem("contacts", JSON.stringify(contacts));
      });

      phoneNumber.addEventListener("blur", (e) => {
        let currIndex;

        contacts.forEach((contact, index) => {
          if (contact.id === contactData.id) currIndex = index;
        });

        contactData.phoneNumber = e.target.textContent;

        contacts[currIndex] = contactData;

        localStorage.setItem("contacts", JSON.stringify(contacts));
      });

      email.addEventListener("blur", (e) => {
        let currIndex;

        contacts.forEach((contact, index) => {
          if (contact.id === contactData.id) currIndex = index;
        });

        contactData.email = e.target.textContent;

        contacts[currIndex] = contactData;

        localStorage.setItem("contacts", JSON.stringify(contacts));
      });
    };

    changeElements();

    const removeContact = () => {
      item.remove();
      _.remove(contacts, (contact) => contact.id === contactData.id);

      removeBtn.removeEventListener("click", removeContact);

      localStorage.setItem("contacts", JSON.stringify(contacts));
    };

    removeBtn.addEventListener("click", removeContact);

    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
});
