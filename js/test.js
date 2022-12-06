import { Placeholder } from "../components/placeholder.js";
import { QuestionCard } from "../components/question-card.js";
import { checkLogin } from "./checkUserLogin.js";
import { checkSavedQuiz, getInfoSavedQuiz } from "./checkUserSavedQuiz.js";
import { checkLikedQuiz } from "./likeAndShare.js";
import { calculateScore } from "./result.js";
import { showResults } from "./showResults.js";
import { renderSuggestion } from "./suggestion.js";

let questionList = document.getElementById('question-list');
let quizNameText = document.querySelector('.quiz-name-text');
let questionCount = document.getElementById('question-count');
let quizData = [];
let test = {};

function renderQuiz(quizId, promise) {
    console.log(window.location);
    return promise()
        .then(async (data) => {
            console.log(data);
            await getQuizzes();
            // if (Object.keys(data).includes('quiz1')) {

                // luu data vao 1 array 
                quizData = data;

            // } else {
            //     quizData = {};
            //     data.forEach((doc) => {
            //         // doc.data() is never undefined for query doc snapshots
            //         if(doc.data()[quizId]) {
            //             console.log(doc.data().email);
            //             quizData[quizId] = doc.data()[quizId];
            //             quizData[quizId].questions = doc.data()[quizId];
            //             quizData[quizId].image = doc.data()[quizId][0].imageURL;
            //             quizData[quizId].questionTitle = doc.data()[quizId][0].questionTitle
            //             quizData.displayName = doc.data().email;
            // //         };
            //     });
            //     console.log(quizData);
            //     console.log(quizData[quizId].questions);
            //     document.querySelector('.username-text').innerText = quizData.displayName;
            // }

            // Ten quiz va so luong cau hoi 
            quizNameText.innerText = quizData[quizId].questionTitle;
            questionCount.innerText = quizData[quizId].questions.length;
            document.querySelector('.quiz-image-inner').firstElementChild.src = quizData[quizId].imageURL;

            // Tao so cau hoi 
            for (let i = 0; i < quizData[quizId].questions.length; i++) {
                const question = new QuestionCard();
                questionList.appendChild(question.render());
            }
        })
        .then(() => {
            // Set placeholder (loading) 
            let queryText = document.querySelectorAll('.query-text');
            queryText.forEach(element => {
                const placeholder = new Placeholder();
                element.appendChild(placeholder.render());
            })
        })
        .then(() => {
            // Render cau hoi 
            let queryText = document.querySelectorAll('.query-text');
            queryText.forEach((element, index) => {
                element.innerHTML = quizData[quizId].questions[index].quiz;
            })

            let questionNum = document.querySelectorAll('.question-num');
            questionNum.forEach((element, index) => {
                element.innerHTML += quizData[quizId].questions[index].quizNumber;
            })

            // Render 4 dap an 
            let questionOptions = document.querySelectorAll('.question-options');
            questionOptions.forEach((element, index) => {
                // element : container boc 4 dap an 

                element.childNodes.forEach((answer, answerIndex) => {

                    // answer : div boc dap an A, B, C hoac D 
                    answer.firstChild.setAttribute("name", quizData[quizId].questions[index].quizNumber);

                    // Tinh diem dung sai 
                    answer.firstChild.addEventListener('click', () => {
                        if (answer.lastChild.innerText[0] == quizData[quizId].questions[index].rightAnswer) {
                            element.dataset.point = 1;
                        } else {
                            element.dataset.point = 0;
                        }
                    })

                    answer.lastChild.innerHTML = quizData[quizId].questions[index].answers[answerIndex];

                })
            })

        })
        .then(() => {
            Swal.fire({
                title: 'Thông báo!',
                text: "Khi bấm bắt đầu, sẽ tính thời gian làm bài thi. Nếu chưa đăng nhập sẽ không xem được bài thi",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Bắt đầu',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.isConfirmed) {
                    checkLogin();
                    calculateScore();
                    showResults();
                    renderSuggestion();
                    checkLikedQuiz();
                    getInfoSavedQuiz();
                }
            })

        })
        .catch(error => {
            console.log(error);
        })
}

// let id = localStorage.getItem("id");
// if (id) {
//     // let idLink = window.location.search.split("=").pop();
//     renderQuiz(JSON.parse(id));
//     // renderQuiz(idLink)
// } else {
//     renderQuiz('css');
//     // window.location.search += '&param=42';
//     console.log(window.location.search)

// }
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

let id = window.location.search.split('=').pop();
let APIArray = ['quiz1', 'quiz2', 'quiz3', 'quiz4', 'quiz5', 'quiz6', 'quiz7', 'quiz8', 'quiz9', 'quiz_10', 'html', 'css', 'java', 'javascript', 'python', 'sql', 'javascriptnc', 'C', 'code', 'networkingbasic'];
function promiseFetchAPI() {
    // return fetch('https://apiquizizz.herokuapp.com/quizzes')
    //     .then(response => {
    //         return response.json();
    //     })
    return getQuizzes()

}

let docRef = db.collection("userCreatedQuiz");
async function promiseGetFirebaseData() {
    let docRef = await db.collection("userCreatedQuiz");
    console.log(JSON.parse(localStorage.getItem('tempUserInfo')).email);
    // await docRef.get().then(data => {
    //     data.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.data());
    //     });
    // })
    return docRef.get();
}


// if (APIArray.includes(id)) {
    console.log('g');
    renderQuiz(id, promiseFetchAPI);
// } else {
//     console.log('g');
//     renderQuiz(id, promiseGetFirebaseData);
// }



docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

export { quizData, renderQuiz };
