const search = document.querySelector(".search-results-list");
const totalTitle = document.querySelector(".title");
const valueSearch = JSON.parse(localStorage.getItem("search"));
const searchLength = valueSearch.length;

totalTitle.innerHTML = `Kết quả (${searchLength})`;

const renderSearch = (valueSearch) => {
  console.log(valueSearch);
  const htmlString = valueSearch
    .map((value) => {
      console.log(value);
      if (!value.quizId) {
        value.quizId = "Custom";
      };
      if (!value.imageURL) {
        value.imageURL = "https://truongcuaem.com/wp-content/uploads/2021/08/quiz-word-red-d-letters-to-illustrate-exam-evaluation-assessment-to-measure-your-knowledge-expertise-44060147.jpg";
      }
      return `
<li class="search-results-item" data-id="${value.quizId}">
  <div class="image"
    style="background-image:url(${value.imageURL});background-size: 70%;">
  </div>
  <div class="data">
    <div class="content-type-title"> ${value.questionTitle} </div>
    <div class="name">  </div>
    <div class="details">
      <div class="questions-length"> ${value.questions.length}Qs <i class="fas fa-list no-absolute"></i> 
      </div>
      <div class="played"><i class="fas fa-play no-absolute"></i>
      ${value.quizId} 
      </div>
    </div>
  </div>
</li>
`;
    })
    .join("");
  search.innerHTML = htmlString;
};
renderSearch(valueSearch);

/// click vào bộ câu hỏi từ trang tìm kiếm
const click = document.querySelectorAll(".search-results-item");
click.forEach((value) => {
  if (!value.dataset.id) {
    value.dataset.id = Custom;
  }
  value.addEventListener("click", () => {
    location.href = `./quizPage.html?id=${value.dataset.id}`;
  });
});
