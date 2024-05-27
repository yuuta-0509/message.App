const scores = [17, 95, 67, 77, 89]; 
const passingScore = 60; 
let totalScore = 0; 
let passCount = 0; 

for (let i = 0; i < scores.length; i++) {
    totalScore += scores[i]; 
    if (scores[i] >= passingScore) {
        passCount++; 
    }
}

const average = totalScore / scores.length; 

output.innerText = 
'<p>合格者数は: ' + passCount + '人です</p>' +
'<p>平均点は: ' + average + '点でした</p>';