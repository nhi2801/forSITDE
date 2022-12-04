let contentSearch = [];
const searchBar = document.getElementById("search");
searchBar.addEventListener("submit", (e) => {
  e.preventDefault();
  const valuesearch = document
    .querySelector('input[name="search"]')
    .value.toLowerCase();

  const filtersearch = contentSearch.filter((value) => {
    console.log(value);
    return value.questionTitle.toLowerCase().includes(valuesearch);
  });
  console.log(filtersearch);

  localStorage.setItem("search", JSON.stringify(filtersearch));
  window.location.href = `./search.html?search=${valuesearch}`;
});
const btnsearchMobile = document.querySelector(".btn-search-mobile");
if (btnsearchMobile) {
  btnsearchMobile.addEventListener("click", () => {
    const valuesearch = document
      .querySelector('input[name="search-mobile"]')
      .value.toLowerCase();
    const filtersearch = contentSearch.filter((value) => {
      console.log(value);
      return value[0].questionTitle.toLowerCase().includes(valuesearch);
    });
    localStorage.setItem("search", JSON.stringify(filtersearch));
    window.location.href = `./search.html?search=${valuesearch}`;
  });
} else {
}

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