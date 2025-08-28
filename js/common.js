document.addEventListener("DOMContentLoaded", function () {
    const depth1 = document.querySelector(".depth1");
    const depth1Items = document.querySelectorAll(".depth1 > li");
    const menuIcon = document.querySelector(".icon li:last-child");

    // 화면 폭 기준 판단
    function isMobile() {
        return window.innerWidth <= 1024; // 1024px 이하 모바일
    }

    // 1차 메뉴 클릭 처리
    depth1Items.forEach((item, index) => {
        const link = item.querySelector("a");

        link.addEventListener("click", function (e) {
            e.preventDefault();

            if (isMobile()) {
                // 모바일: 2차 메뉴 토글
                const depth2 = item.querySelector(".depth2");
                if (depth2) {
                    depth2.style.display = depth2.style.display === "flex" ? "none" : "flex";
                    item.classList.toggle("open");
                }
            } else {
                // PC: 1차 메뉴 열기/닫기
                if (item.classList.contains("open")) {
                    item.classList.remove("open");
                } else {
                    depth1Items.forEach(i => i.classList.remove("open"));
                    item.classList.add("open");
                }
            }

            // active_bg 클래스 처리
            depth1Items.forEach(i => i.classList.remove("active_bg", "active-0", "active-1", "active-2"));
            item.classList.add("active_bg");
            item.classList.add(`active-${index}`);
        });
    });

    // 햄버거 메뉴 클릭 (모바일)
    if (menuIcon) {
        menuIcon.addEventListener("click", function (e) {
            e.preventDefault();
            depth1.classList.add("open");
        });
    }

    // x 버튼 클릭 (모바일)
    const closeBtn = depth1.querySelector("::before");
    // ::before는 CSS 가상요소라 JS로 직접 선택 불가 → 대신 depth1 클릭 이벤트로 처리
    depth1.addEventListener("click", function (e) {
        if (e.target === depth1 && isMobile()) {
            depth1.classList.remove("open");
            // 2차 메뉴 초기화
            depth1Items.forEach(item => {
                const depth2 = item.querySelector(".depth2");
                if (depth2) depth2.style.display = "none";
                item.classList.remove("open");
            });
        }
    });

    // 화면 리사이즈 시 초기화
    window.addEventListener("resize", function () {
        depth1Items.forEach(item => {
            const depth2 = item.querySelector(".depth2");
            if (depth2) depth2.style.display = "none";
            item.classList.remove("open");
        });
        depth1.classList.remove("open");
    });
});
