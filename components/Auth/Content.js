class Content {
  $container;
  $title;
  $btnLogout;
  constructor() {
    this.$container = document.createElement("div");
    this.$title = document.createElement("h1");
    this.$title.innerHTML = "Đã vào";
    this.$title.classList.add("abc");
    this.$btnLogout = document.createElement("button");
    this.$btnLogout.addEventListener("click", this.handleLogout);
    this.$btnLogout.classList.add("btn");
    this.$btnLogout.innerHTML = "Đăng xuất";
  }

  handleLogout = () => {
    firebase.auth().signOut();
  };
  render() {
    this.$container.appendChild(this.$title);
    this.$container.appendChild(this.$btnLogout);
    return this.$container;
  }
}
export { Content };
