const App = new Vue({
  el: "#app",
  data() {
    return {
      placeholder: "Введите название заметки",
      title: "Список заметок",
      inputValue: "",
      checkBox: false,
      notes: [],
    };
  },
  methods: {
    addNewNote() {
      if (this.inputValue.trim() != "") {
        if (this.inputValue.length > 50) {
          this.notes.unshift(this.inputValue.substr(0, 50) + "...");
          this.inputValue = "";
        } else {
          this.notes.unshift(this.inputValue);
          this.inputValue = "";
        }
      }
    },
    removeNote(idx) {
      this.notes.splice(idx, 1);
    },
    changeText(idx) {
      console.log("Редактирование");

      let arr = prompt(`Изменить ${this.notes[idx]}:`);
      console.log(arr);
      if (arr == null) {
        this.inputValue = "";
      } else {
        if (arr.trim() != "" || arr != null) {
          this.removeNote(idx);
          this.notes.splice(idx, 0, arr);
        }
      }
    },
    say(el) {
      console.log(el);
    },
  },
  computed: {
    filerList() {
      return this.notes.filter((i) => i.toLowerCase().includes(this.inputValue.toLowerCase()));
    },
  },
  mounted() {
    if (localStorage.inputValue) {
      this.inputValue = localStorage.inputValue;
    }
    if (localStorage.notes) {
      this.notes = localStorage.notes.split(",");
      // console.log("b");
    }
  },
  watch: {
    inputValue(value) {
      localStorage.inputValue = value;
    },
    notes(value) {
      localStorage.notes = value;
      // console.log(localStorage.notes);
    },
    checkBox(value) {
      console.log(value);
    },
  },
});
