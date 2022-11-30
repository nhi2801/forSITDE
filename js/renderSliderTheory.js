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
        test[doc.id] = doc.data();
    });
  });
  console.log(test);
}

async function name() {
  await getQuizzes();
  const theories = await db.collection("theoryList").get().then((querySnapshot) => {
    const list = [[], []];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
        list[0].push(doc.id)
        list[1].push(doc.data());
    });
    return list;
  });

  await fetch("https://apiquizizz.herokuapp.com/quizzes")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(theories);
    data = theories[1];
    const firstSlider = document.querySelectorAll(".container-box")[0];
    const secondSlider = document.querySelectorAll(".container-box")[1];

    // Phan loai slider
    data.forEach((element) => {
      if (element.category == "all") {
        basicArray.push(element);
      } 
      if (element.category == "hot") {
        otherArray.push(element);
      // if (data[element][0].infor.$category == "basic") {
      //   basicArray.push(element);
      // } else if (data[element][0].infor.$category == "other") {
      //   otherArray.push(element);
      }
    });

    renderSlideByCategory(basicArray, firstSlider);
    renderSlideByCategory(otherArray, secondSlider);

    const box = document.querySelectorAll(".box");
    let content = document.querySelectorAll(".content");
    console.log(content);
    let cardImage = document.querySelectorAll(".card-image");
    console.log(cardImage);
    content.forEach((element, index) => {
      // Render ten cau hoi tu data
      console.log(data[`${Object.keys(data)[index]}`]);
      element.innerText = data[index].theoryTitle; 
      // element.innerText = data[`${Object.keys(data)[index]}`][0].infor.$questionTitle;

      // Render so luong cau hoi
      // element.nextElementSibling.innerText =
      //   data[`${Object.keys(data)[index]}`].questions.length + " câu hỏi";

      // Render link hinh anh
      cardImage[index].src = data[index].imageURL;
      // cardImage[index].src = data[`${Object.keys(data)[index]}`][0].infor.$image;

      const listName = theories[0];
      box[index].dataset.id = listName[index];
    });

    box.forEach((element) => {
      element.addEventListener("click", () => {
        localStorage.setItem("id", JSON.stringify(element.dataset.id));
        // location.href = './quizPage.html';
        location.href = `./theory.html?id=${element.dataset.id}`;

        // location.search = '$id=24';
      });
    });
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
    console.log("loi");
  });

}

name();
