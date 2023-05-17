"use strict";

//mainをJSのみでつくる。
class Panel {
  constructor() {
    const section = document.createElement("section");
    section.classList.add("panel");

    this.img = document.createElement("img");
    this.img.src = this.getRandomImage();
    this.stop = document.createElement("div");
    this.stop.textContent = "こいつ";
    this.stop.classList.add("stop", "inactive");
    
    //クリックで音を再生
    this.stop.addEventListener("click", () => {
      const sound = document.getElementById("sound1");
      sound.currentTime = 0;
      sound.play();

      if (this.stop.classList.contains("inactive")) {
        return;
      }
      this.stop.classList.add("inactive");

      clearTimeout(this.timeoutId);

      panelsLeft--;

      if (panelsLeft === 0) {
        checkResult();
        spin.classList.remove("inactive");
        panelsLeft = 3;
      }
    });

    section.appendChild(this.img);
    section.appendChild(this.stop);

    const main = document.querySelector("main");
    main.appendChild(section);
  }

  //配列にソースと得点を格納。画像はランダム表示にする。
  getRandomImage() {
    const images = [
      { src: "./Anonymous_1.jpeg", score: 10 },
      { src: "./Anonymous_2.jpeg", score: 20 },
      { src: "./Anonymous_3.jpeg", score: 30 },
      { src: "./icon_B_0022.png", score: 100 },
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    this.score = randomImage.score;
    return randomImage.src;
  }

  spin() {
    this.img.src = this.getRandomImage();
    this.timeoutId = setTimeout(() => {
      this.spin();
    }, 100);
  }

  //揃った条件を記載。条件がうまくかけなかったので、ドットインストールのものを転用。
  matched(p1, p2) {
    return (
      this.img.src === p1.img.src &&
      this.img.src === p2.img.src
    );
  }

  activate() {
    this.stop.classList.remove("inactive");
  }
}

//3つ同じ画像がそろったら、それぞれのソースの得点を表示。得点のエフェクトとファンファーレを鳴らす。
function checkResult() {
    let result = 0;
    if (panels[0].matched(panels[1], panels[2])) {
      panels[0].stop.classList.add("matched");
      increaseScore(panels[0].score);
      playSound();
      return panels[0].score; 
    }
    if (panels[1].matched(panels[0], panels[2])) {
      panels[1].stop.classList.add("matched");
      increaseScore(panels[1].score);
      playSound();
      return panels[1].score; 
    }
    if (panels[2].matched(panels[0], panels[1])) {
      panels[2].stop.classList.add("matched");
      increaseScore(panels[2].score);
      playSound();
      return panels[2].score; 
    }

    if (result > 0) {
    increaseScore(result);
    playSound();
    animateResult(result);
  }

  return result;
  }

  //得点の追加処理。
function increaseScore(score) {
  const scoreElement = document.getElementById("point");
  const currentScore = parseInt(scoreElement.textContent);
  const newScore = currentScore + score;
  scoreElement.textContent = newScore.toLocaleString();

  // 得点のアニメーションを表示
  animateScore(score);
}

//音楽を鳴らす関数
function playSound() {
    const sound = document.getElementById("sound2");
    sound.currentTime = 0;
    sound.play();
}

//アニメーションを表示する関する
function animateScore(score) {
    const scoreAnimationElement = document.getElementById("score-animation");
    scoreAnimationElement.textContent = "+" + score.toLocaleString();
    scoreAnimationElement.classList.add("score-animation");
  
    // アニメーションが完了したら要素を削除
    setTimeout(() => {
      scoreAnimationElement.textContent = "";
      scoreAnimationElement.classList.remove("score-animation");
    }, 5000); 
  }

let panelsLeft = 3;
const panels = [new Panel(), new Panel(), new Panel()];

const spin = document.getElementById("spin");
spin.addEventListener("click", () => {
  if (spin.classList.contains("inactive")) {
    return;
  }
  spin.classList.add("inactive");

  panels.forEach((panel) => {
    panel.activate();
    panel.spin();
  });ï
});
