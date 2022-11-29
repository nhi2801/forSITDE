
const theory = document.querySelector(".ta-content");

const data = {
    "heading" : "MỘT SỐ KIẾN THỨC CƠ BẢN VỀ HTML",
    "desc" : "Đối với những bạn mới đặt chân vào con đường \"lập trình web\" thì HTML sẽ là ngôn ngữ đầu tiên mà các bạn cần phải học, và đây cũng chính là bài đầu tiên trong loạt tài liệu học HTML. Cùng tìm hiểu một cách tổng quan về ngôn ngữ này nhé.",
    "imageURL" : "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220714111443/HTML-Introduction.jpg",
    "item" : [
        {
            "header" : "1. HTML là gì?",
            "text" : "- HTML là chữ viết tắt của cụm từ HyperText Markup Language (ngôn ngữ đánh dấu siêu văn bản) <br>- HTML dùng để tạo ra các trang web, những nội dung mà chúng ta nhìn thấy trên trang web (chẳng hạn như: văn bản, hình ảnh, âm thanh, video, . . . .) chính là những thứ được xây dựng dựa trên các thẻ HTML. <br>- Ví dụ: Trước tiên các bạn truy cập trang http://webcoban.vn/file/danh-sach-hoc-bong.html. Sau đó, bấm tổ hợp phím Ctrl + U hoặc nhấp chuột phải vào trang rồi chọn xem nguồn trang thì các bạn sẽ thấy mã nguồn như bên dưới.<br>",
            "headerItem" :[]
        },
        {
            "header" : "2. Tìm hiểu khái niệm thẻ trong HTML",
            "text" : "- Thẻ (tag) là một từ khóa được đặt bên trong cặp dấu ngoặc nhọn. <br>- Mỗi thẻ sẽ có một chức năng riêng, ví dụ: <br>Thẻ p dùng để tạo một đoạn văn bản.<br> Thẻ a dùng để tạo một cái liên kết.<br>Thẻ img dùng để chèn một tấm hình vào trang web. . . . . - Thông thường thì thẻ được chia ra làm hai loại chính, đó là: thẻ kép & thẻ đơn <br>",
            "headerItem" :[
                {
                    "title" : "2.1. Thẻ kép",
                    "body" : "- Thẻ kép là loại thẻ mà khi chúng ta muốn sử dụng nó để tạo một nội dung gì đó cho trang web thì chúng ta cần phải dùng đến cả thẻ mở lẫn thẻ đóng (thẻ đóng có cách viết tương tự như thẻ mở, chỉ khác ở chỗ là phía trước tên của thẻ đóng thì có thêm một dấu gạch chéo) <br>- Thẻ kép là loại thẻ mà khi chúng ta muốn sử dụng nó để tạo một nội dung gì đó cho trang web thì chúng ta cần phải dùng đến cả thẻ mở lẫn thẻ đóng (thẻ đóng có cách viết tương tự như thẻ mở, chỉ khác ở chỗ là phía trước tên của thẻ đóng thì có thêm một dấu gạch chéo) <br>"
                },
                {
                    "title" : "2.2. Thẻ đơn",
                    "body" : " - Thẻ đơn là loại thẻ mà khi chúng ta muốn sử dụng nó để tạo một nội dung gì đó cho trang web thì chúng ta chỉ cần dùng mỗi thẻ mở, hay nói cách khác là không có thẻ đóng."
                },
                {
                    "title" : "2.3. Thẻ lồng nhau",
                    "body" : " - Thẻ lồng nhau thực chất chỉ là một trong những kỹ thuật cơ bản khi viết mã HTML, các thẻ được lồng vào nhau đểxây dựng nên những nội dung đa dạng hơn. <br>- Lưu ý: Trong ngôn ngữ HTML, khi chúng ta viết mã sai quy tắc thì trên màn hình không hiện lên bất kỳ một thông báo lỗi nào, chỉ là các nội dung sẽ không được hiển thị chính xác như mong đợi."
                }
            ]
        },
        {
            "header" : "3. Tìm hiểu khái niệm tập tin HTML",
            "text" : "- Tập tin HTML là một loại tập tin văn bản mà bên trong nó có chứa các thẻ HTML, một tập tin HTML phải có phần đuôi là .html hoặc .htm <br>- Lưu ý: Một tập tin HTML cũng có thể được gọi là: <br>+ Một tài liệu HTML. <br>+ Một trang HTML. <br>+ Một trang web.",
            "headerItem" :[]
        }
    ]
}


let id = window.location.search.split('=').pop();
console.log(id);

async function renderTheory(data){
    const theories = await db.collection("theoryList").get().then((querySnapshot) => {
        const list = [[], []];
        querySnapshot.forEach((doc) => {
            if (doc.id === id) {
                list[0].push(doc.id)
                list[1].push(doc.data());
            }
        })
        console.log(list);
        return list;
    });

    if (theories[0].length !== 0) {
        data = theories[1][0];
    }

    //render heading và desc
    theory.innerHTML = `<div class="ta-content">
                <div class="img-tip">
                    <img src=${data.imageURL}>
                </div>
                <h3 class="ta-content-heading"> 
                    ${data.theoryTitle.toUpperCase()}
                </h3>
                <div class="standfirst">
                    ${data.desc}
                </div>
                <div class="l-section-h i-cf">
                    <div class="ttr_start">
                    
                    </div>
        </nav>`;

    //render các mục lớn 1. , 2.
    const block = document.querySelector(".ttr_start")

    data.item.forEach(element => {
        block.innerHTML += `
            <div class="ttr_start-heading">
                ${element.header}
            </div>
        
            <div class="ttr_start-body">
                ${element.text} 
            </div>
        `;


    });

    //render các mục nhỏ 1.1, 1.2,...

    const blockItem = document.querySelectorAll(".ttr_start-body");
   
    for(let i =0; i< blockItem.length; i++){
        if(data.item[i].headerItem.length >=1){
            data.item[i].headerItem.forEach(element =>{
                blockItem[i].innerHTML += `
                    <div class="ttr_start-heading-item">
                        ${element.title}
                    </div>
                    ${element.body}

                `;
            })
        }
    }
}

renderTheory(data);
