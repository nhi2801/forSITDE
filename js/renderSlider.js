import { SliderCard } from "../components/sliderCard.js";

// Render theo tung` slider
function renderSlideByCategory(myArray, slider) {
  myArray.forEach(() => {
    const cardItem = new SliderCard();
    slider.appendChild(cardItem.render());
  });
}
let basicArray = [];
let otherArray = [];
let test = {};

async function getQuizzes() {
  await db.collection("quizList").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().questions) {
        test[doc.id] = doc.data();
      };
    });
  });
  console.log(test);
}

async function name() {
  await getQuizzes();
  await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data = test;
      console.log(data);

      const firstSlider = document.querySelectorAll(".container-box")[0];
      const secondSlider = document.querySelectorAll(".container-box")[1];

      // Phan loai slider
      const basicList = {};
      const otherList = {};
      Object.keys(data).forEach((element) => {
        if (data[element].category == "basic") {
          basicArray.push(element);
          basicList[element] = data[element];
        } else if (data[element].category == "other") {
          otherArray.push(element);
          otherList[element] = data[element];
          // if (data[element][0].infor.$category == "basic") {
          //   basicArray.push(element);
          // } else if (data[element][0].infor.$category == "other") {
          //   otherArray.push(element);
        }
      });
      console.log(otherList);

      renderSlideByCategory(basicArray, firstSlider);
      renderSlideByCategory(otherArray, secondSlider);

      const box = document.querySelectorAll(".box");
      const contentText = document.querySelectorAll(".content-text");
      contentText.forEach((e, i) => {
        let content = e.querySelectorAll(".content");
        console.log(content.length);
        let cardImage = e.querySelectorAll(".card-image");
        console.log(cardImage);

        let box = e.querySelectorAll(".box");

        console.log(i);
        let dataL;
        if (i === 0) {
          dataL = basicList;
        } else {
          dataL = otherList;
        }
        console.log(dataL);
        content.forEach((element, index) => {
          // Render ten cau hoi tu data
          console.log(dataL[`${Object.keys(dataL)[index]}`]);
          element.innerText = dataL[`${Object.keys(dataL)[index]}`].questionTitle;
          // element.innerText = data[`${Object.keys(data)[index]}`][0].infor.$questionTitle;

          // Render so luong cau hoi
          element.nextElementSibling.innerText =
          dataL[`${Object.keys(dataL)[index]}`].questions.length + " câu hỏi";

          // Render link hinh anh
          cardImage[index].src = dataL[`${Object.keys(dataL)[index]}`].imageURL;
          // cardImage[index].src = data[`${Object.keys(data)[index]}`][0].infor.$image;

          box[index].dataset.id = Object.keys(dataL)[index];
        });

        box.forEach((element) => {
          element.addEventListener("click", () => {
            localStorage.setItem("id", JSON.stringify(element.dataset.id));
            // location.href = './quizPage.html';
            location.href = `./quizPage.html?id=${element.dataset.id}`;

            // location.search = '$id=24';
          });
        });
      })

    })

    .then(() => {
      $(".multiple-items").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    })
    .catch((error) => {
      console.log(error);
    });

}

name();
