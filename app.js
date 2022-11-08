import { v4 as uuidv4 } from "https://jspm.dev/uuid";
const App = new Vue({
  el: "#app",
  data() {
    return {
      placeholder: "Введите название заметки",
      title: "Список заметок",
      inputValue: "",
      checkBox: false,
      userName: "",
      notes: [
        // {
        //   id: 1,
        //   title: "Сходить в кино",
        // },
        // {
        //   id: 2,
        //   title: "Покушать",
        // },
      ],
      editText: "",
      noteState: Vue.ref("all"),
    };
  },
  methods: {
    addNewNote() {
      if (this.inputValue.trim() != "") {
        if (this.inputValue.length > 50) {
          this.notes.unshift({
            id: uuidv4(),
            title: this.inputValue.substr(0, 50) + "...",
          });
          this.inputValue = "";
        } else {
          this.notes.unshift({
            id: uuidv4(),
            title: this.inputValue,
          });
          this.inputValue = "";
        }
      }
    },
    removeNote(idx) {
      this.notes.splice(idx, 1);
    },
    changeText(idx) {
      console.log("Редактирование");
      console.log(this.notes[idx].id);
      let arr = prompt(`Изменить ${this.notes[idx].title}:`);
      if (arr == null || arr.trim() == "") {
        this.inputValue = "";
      } else {
        if (arr.trim() != "" || arr != null) {
          let oldNote = this.notes[idx];
          oldNote.title = arr;
          this.removeNote(idx);
          this.notes.splice(idx, 0, oldNote);
        }
      }
    },
    say() {
      console.log("Change");
    },
  },
  computed: {
    filerList() {
      return this.notes.filter((i) => i.title.toLowerCase().includes(this.inputValue.toLowerCase()));
    },
  },
  mounted() {
    if (localStorage.inputValue) {
      this.inputValue = localStorage.inputValue;
    }
    if (localStorage.notes) {
      this.notes = JSON.parse(localStorage.notes);
      // console.log("b");
    }
    if (localStorage.userName) {
      this.userName = localStorage.userName;
    }
  },
  watch: {
    inputValue(value) {
      localStorage.inputValue = value;
    },
    notes: {
      handler(value) {
        localStorage.notes = JSON.stringify(value);
      },
      deep: true,
    },
    userName(value) {
      localStorage.userName = value;
    },
    checkBox(value) {
      // console.log(value);
    },
  },
});
