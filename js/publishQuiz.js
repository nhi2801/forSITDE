// Publish 
const questions = document.querySelector('.questions');
const quizName = document.querySelector('.quiz-name');
const publishBtn = document.querySelector('.header-tray-btn');
publishBtn.addEventListener('click', () => {
    // Ten cau hoi
    console.log(quizName.innerText);
    if (quizName.innerText == 'Question' || questions.innerHTML.replace(/\s/g, '') == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Thông báo',
            text: 'Bạn chưa tạo câu hỏi hoặc chưa đặt tên cho đề thi',
            footer: '<p>Tên bài thi không được để là Câu hỏi, phải có ảnh minh họa</p>'
        })
    } else {

        let questionTitle = document.querySelector('.name').innerText;
        let image = document.getElementById('add-image').dataset.image;
        let quizNumber = document.querySelectorAll('.question-header');
        const questionInput = document.querySelectorAll('.question-input');
        // let answers = questionInput.dataset.answers;
        // answers = answers.split(',');
        // let rightAnswer = questionInput.dataset.rightAnswer;
        // let quiz = questionInput.dataset.quiz;

        let storedArray = [];
        questionInput.forEach((element, index) => {
            storedArray.push({
                "questionTitle": questionTitle,
                "image": image,
                "quizNumber": quizNumber[index].firstElementChild.innerText,
                "answers": questionInput[index].dataset.answers.split(','),
                "rightAnswer": questionInput[index].dataset.rightAnswer,
                "quiz": questionInput[index].dataset.quiz
            })
        })
        console.log(storedArray);
        let id = "quiz" + Math.random().toString(16).slice(10);


        let user = localStorage.getItem('tempUserInfo');
        let docRefCreate = db.collection("userCreatedQuiz").doc(JSON.parse(user).email);

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        var userCreate = db.collection("userQuizInfo").doc(JSON.parse(user).email);

        // Atomically add a new region to the "regions" array field.
        userCreate.update({
            createdQuiz: firebase.firestore.FieldValue.arrayUnion(id)
        });

        // Them quiz vao Firebase
        swalWithBootstrapButtons.fire({
            title: 'Đã tạo bài thi thành công!',
            text: `Code của bài thi là: ${id}`,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Quay về trang chủ',
            reverseButtons: true,
            allowOutsideClick: false,
            allowEnterKey: false
        }).then((result) => {
            if (result.isConfirmed) {
                return docRefCreate.update({
                    [id]: storedArray
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                    })
                    .then(() => {
                        location.href = './main.html';
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            }
        })






    }
})