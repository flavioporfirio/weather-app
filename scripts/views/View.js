export default class View {
  _parentElement;
  _errorMessage = "Couldn't find that city";
  _data;
  _date = new Date();

  render(data) {
    this._data = data;
    const markup = this._createMarkup();
    console.log(this._data);

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  handleSearchBtn(){
    document
    .querySelector(".btn-search")
    .addEventListener("click", function () {
      handler();
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _createMarkup() {}
}