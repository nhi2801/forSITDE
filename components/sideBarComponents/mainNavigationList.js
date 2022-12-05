class NavigationList {
    $container;
    $mainNavigationList;
    $explore;
    $myQuizzes;
    $profile;
    $classes;
    $divider;
    $theory;
    $about;

    constructor() {
        this.$container = document.createElement('div');
        this.$container.classList.add('main-navigation-list-wrapper');

        this.$mainNavigationList = document.createElement('ul');
        this.$mainNavigationList.classList.add('main-navigation-list');

        this.$explore = document.createElement('li');
        this.$explore.id = 'explore';
        this.$explore.innerHTML = `<i aria-hidden="true" class="fas fa-map-marked-alt"></i><span
        role="link" tabindex="0">Khám phá</span>`;
        this.$explore.addEventListener('click', () => { location.href = './main.html' })

        this.$myQuizzes = document.createElement('li');
        this.$myQuizzes.id = 'my-quizzes';
        this.$myQuizzes.innerHTML = `<i class="fas fa-book-reader"></i><span role="link" tabindex="0">Bộ sưu tập</span>`;
        this.$myQuizzes.addEventListener('click', () => { location.href = './myCollections.html' })

        this.$profile = document.createElement('li');
        this.$profile.id = 'profile';
        this.$profile.innerHTML = `<i class="fas fa-user"></i><span role="link"
        tabindex="0">Thông tin cá nhân</span>`;

        this.$classes = document.createElement('li');
        this.$classes.id = 'leaderboard';
        this.$classes.innerHTML = `<i class="fas fa-university"></i><span role="link"
        tabindex="0">Bảng xếp hạng</span>`;
        this.$classes.addEventListener('click', () => { location.href = './leaderboard.html?id=quiz1' })

        this.$divider = document.createElement('li');
        this.$divider.classList.add('divider');

        this.$theory = document.createElement('li');
        this.$theory.id = 'theory';
        this.$theory.innerHTML = `<i class="fas fa-person-booth"></i><span role="link" tabindex="0"
        aria-hidden="false">Tài liệu</span>`;
        this.$theory.addEventListener('click', () => { location.href = './listTheory.html?id=quiz1' })

        this.$about = document.createElement('li');
        this.$about.id = 'about';
        this.$about.innerHTML = `<i class="fas fa-bookmark"></i><span role="link" tabindex="0"
        aria-hidden="false">Giới thiệu</span>`;
        this.$about.addEventListener('click', () => { location.href = './about.html?id=html' })
    }

    render() {
        this.$mainNavigationList.appendChild(this.$explore);
        this.$mainNavigationList.appendChild(this.$myQuizzes);
        this.$mainNavigationList.appendChild(this.$profile);
        this.$mainNavigationList.appendChild(this.$classes);
        this.$mainNavigationList.appendChild(this.$divider);
        this.$mainNavigationList.appendChild(this.$theory);
        this.$mainNavigationList.appendChild(this.$about);

        this.$container.appendChild(this.$mainNavigationList);
        return this.$container;
    }
}

export { NavigationList };