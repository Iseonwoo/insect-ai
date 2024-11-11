let model;

async function loadModel() {
    model = await tf.loadLayersModel('model.json');
    document.getElementById("predictionResult").textContent = "Model loaded successfully!";
}

loadModel();

function loadImage(event) {
    const image = document.getElementById('selectedImage');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = () => {
        predictImage(image);
    };
}

async function predictImage(image) {
    const img = tf.browser.fromPixels(image).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
    const predictions = await model.predict(img).data();
    const maxIndex = predictions.indexOf(Math.max(...predictions));
    const labels = ["배추흰나비", "담배거세미", "민달팽이", "파리", "지렁이", "이리응애", "사마귀", "바구미", "메뚜기", "무당벌레", "거미늑대", "꿀벌"]; // 여기에 실제 곤충 레이블 추가
    document.getElementById("predictionResult").textContent = `Prediction: ${labels[maxIndex]}`;
}