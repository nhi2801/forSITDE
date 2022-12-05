let contentSearch = [];
const filterValue = {
  1: null,
  2: 'basic',
  3: 'other',
}
const filterSelectBox = document.getElementById("inputGroupSelect01");
const searchBar = document.getElementById("search-bar");
const currentItem = document.getElementsByClassName("search-results-item");
const totalTitle = document.querySelector(".title");

filterSelectBox.addEventListener("change", (e) => {
  e.preventDefault();
  let number = 0
  let filtersearch = []
  if (filterSelectBox) {
    filtersearch = contentSearch.filter((value) => {
      return value.category === filterValue[filterSelectBox.value];
    });
  };
  filtersearch = filtersearch.map((item) => item.quizId);
  for (let i = 0; i < currentItem.length; i++) {
    currentItem[i].style.display = 'block';
    
    if (filterSelectBox.value != 1 && !filtersearch.includes(currentItem[i].getAttribute('data-id'))) {
      currentItem[i].style.display = 'none';
      number++
    }
  } 
  const displayNumber = number === 0 ? currentItem.length : number
  totalTitle.innerHTML = `Kết quả (${displayNumber})`;
  // window.location.href = `./search.html?filter=${searchBar.value}`;
});
const btnsearchMobile = document.querySelector(".btn-search-mobile");
var docRef = db.collection("userCreatedQuiz").doc("SF");

db.collection("userCreatedQuiz").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let quizzes = Object.keys(doc.data());
    let quizset = doc.data();
    quizzes.forEach((quiz) => {
      if (!(quiz === "email" || quiz === "displayName" || quiz === "profilePic")) {
        quizset[quiz][0].search = quiz;
        console.log(quizset[quiz]);
        // contentSearch.push(quizset[quiz]);
        console.log(quizset[quiz][0]);
        // customQuizzes.push
      }
    });
  });
});

const test = {};

async function getQuizzes() {
  await db.collection("quizList").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          test[doc.id] = doc.data();
      });
  });
  console.log(test);
  return test;
}

fetch("https://jsonplaceholder.typicode.com/posts")
  .then(async (response) => {
    await getQuizzes();
    console.log(test);
    return response.json();
  })
  .then((data) => {
    data = test;
    Object.keys(data).forEach((element) => {
      // console.log(data[element]);
      contentSearch.push(data[element]);
    });
    console.log(contentSearch);
  });
const searchMobile = document.getElementById("search-mobile");
const btnSearch = document.querySelector(".btn-search");
if (searchMobile && btnSearch) {
  btnSearch.addEventListener("click", () => {
    btnSearch.classList.toggle("fa-times");
    searchMobile.classList.toggle("active");
  });
}