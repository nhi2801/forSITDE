import { ViewItem } from "../components/savedItem.js";

let resultList = document.querySelector('.search-results-list');
let userObject = JSON.parse(localStorage.getItem('tempUserInfo'));
console.log(userObject.email);

var docRef = db.collection("userQuizInfo").doc(userObject.email);

function renderList(category) {
    docRef.get()
        .then((doc) => {
            if (doc.exists) {
                let savedQuizArray = doc.data()[category];
                console.log(savedQuizArray);
                resultList.innerHTML = '';
                savedQuizArray.forEach(element => {
                    const viewItem = new ViewItem();
                    resultList.appendChild(viewItem.render());
                })

                if (savedQuizArray.length === 0) {
                    resultList.innerText = 'Đã có lỗi truy xuất. Có thể bạn chưa tạo Bộ sưu tập';
                    // Count 
                    document.querySelector('.count').innerText = 0;

                } else {
                    renderSavedQuiz(savedQuizArray)

                }


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            resultList.innerText = 'Đã có lỗi truy xuất. Có thể bạn chưa tạo Bộ sưu tập';
            // Count 
            document.querySelector('.count').innerText = 0;
        });
}


function renderSavedQuiz(idArray) {

    let APIArray = ['html', 'css', 'java', 'javascript', 'python', 'sql', 'javascriptnc', 'C', 'code', 'networkingbasic'];
    let resultItems = document.querySelectorAll('.search-results-item');

    idArray.forEach(async (element, index) => {
        if (element.length < 8) {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    return response.json();
                })
                .then(async (data) => {
                    let test = {};
                    await db.collection("quizList").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            test[doc.id] = doc.data();
                        });
                    });
                    console.log(test);
                    data = test;

                    // Count 
                    document.querySelector('.count').innerText = resultItems.length;

                    // Render image 
                    resultItems[index].firstElementChild.style.backgroundImage = `url('${data[element].imageURL}')`;
                    // Render ten quiz 
                    resultItems[index].querySelector('.content-type-title').innerText = data[element].questionTitle;
                    // Render so cau hoi 
                    resultItems[index].querySelector('.questions-length').innerHTML += data[element].questions.length + ' questions';
                    // Render email 
                    resultItems[index].querySelector('.username').innerText = userObject.email;
                    // Render profile pic 
                    resultItems[index].querySelector('.user-img').style.backgroundImage = `url(${userObject.photoURL})`;

                })
        } else {
            console.log(element);
            console.log(userObject.email);
            let dataExist = {};
            var docRefQuiz = db.collection("userCreatedQuiz").doc(userObject.email);
            let docQuizzes = await db.collection("userCreatedQuiz").get().then((doc) => {
                doc.forEach((a) => {
                    if (a.data()[element]) {
                        dataExist = a.data();
                    }
                })
            })

            docRefQuiz.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    console.log(dataExist);
                    let data = dataExist;

                    // Count 
                    document.querySelector('.count').innerText = resultItems.length;

                    // Render image 
                    resultItems[index].firstElementChild.style.backgroundImage = `url('${data[element][0].imageURL}')`;
                    // Render ten quiz 
                    resultItems[index].querySelector('.content-type-title').innerText = data[element][0].questionTitle + `(code: ${element})`;
                    // Render so cau hoi 
                    resultItems[index].querySelector('.questions-length').innerHTML += data[element].length + ' questions';
                    // Render email 
                    resultItems[index].querySelector('.username').innerText = userObject.email;
                    // Render profile pic 
                    resultItems[index].querySelector('.user-img').style.backgroundImage = `url(${userObject.photoURL})`;
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    })


}

export { renderList };
