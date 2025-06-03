document.addEventListener("DOMContentLoaded", () => {
  // スムーズスクロールの実装
  document.querySelectorAll("nav ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // デフォルトのアンカーリンク動作を無効化

      const targetId = this.getAttribute("href"); // リンクのhref属性を取得
      const targetElement = document.querySelector(targetId); // ターゲット要素を取得

      if (targetElement) {
        // ヘッダーの高さ分を考慮してスクロール位置を調整
        const headerOffset = document.querySelector("header").offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth", // スムーズにスクロール
        });
      }
    });
  });

  // 「もっと詳しく」ボタンのクリックイベント
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const headerOffset = document.querySelector("header").offsetHeight;
        const elementPosition = aboutSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  // 例: スクロールに応じたアニメーション（オプション）
  // この例では、各セクションがビューポートに入ったらフェードインする簡単なアニメーションです。
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null, // ビューポートをルートとする
    rootMargin: "0px",
    threshold: 0.1, // セクションの10%が見えたら発火
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target); // 一度アニメーションしたら監視を停止
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    // 初期状態を非表示・下にずらしておく
    if (section.id !== "home") {
      // ホームセクションは最初から表示されているため除外
      section.style.opacity = 0;
      section.style.transform = "translateY(20px)";
      section.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
      sectionObserver.observe(section);
    }
  });

  // フォーム送信の処理（実際にはサーバーサイドでの処理が必要です）
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // フォームのデフォルト送信を防止

      // ここにフォームデータを処理するロジックを記述します。
      // 例: alertで送信されたことを通知
      alert("お問い合わせありがとうございます！");

      // フォームをリセット
      this.reset();
    });
  }
});
