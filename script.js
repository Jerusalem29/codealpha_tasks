function calculateAge() {
  // Get input values
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);

  
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    document.getElementById("age").innerHTML = "Please enter valid numbers!";
    return;
  }

  if (month < 1 || month > 12) {
    document.getElementById("age").innerHTML = "Month must be between 1-12!";
    return;
  }

  const daysInMonth = new Date(year, month, 0).getDate();

 
  if (day < 1 || day > daysInMonth) {
    document.getElementById("age").innerHTML = `Invalid day! Month ${month} has ${daysInMonth} days`;
    return;
  }


  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentDay = currentDate.getDate();

  
  let ageYears = currentYear - year;
  let ageMonths = currentMonth - month;
  let ageDays = currentDay - day;

  
  if (ageDays < 0) {
    ageMonths--;
   
    const daysInLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
    ageDays += daysInLastMonth;
  }

  
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  
  document.getElementById("age").innerHTML = 
    `Your age: ${ageYears} years, ${ageMonths} months, ${ageDays} days`;

  
  const zodiacSign = getZodiacSign(month, day);
  document.getElementById("age").innerHTML += `<br>♉ Zodiac: ${zodiacSign}`;


  const nextBirthdayDays = getNextBirthday(month, day);
  document.getElementById("age").innerHTML += `<br>🎂 Next birthday in: ${nextBirthdayDays} days`;


  const birthDate = new Date(year, month - 1, day);
  const secondsLived = Math.floor((currentDate - birthDate) / 1000);
  document.getElementById("age").innerHTML += `<br>⏳ You've lived ${secondsLived.toLocaleString()} seconds`;

  
  const lifeProgress = (ageYears / 80) * 100;
  if (document.getElementById("life-progress")) {
    document.getElementById("life-progress").style.width = `${lifeProgress}%`;
    document.getElementById("life-progress").textContent = `${Math.round(lifeProgress)}%`;
  }


  const futureAge = getFutureAge(birthDate, 2050);
  document.getElementById("age").innerHTML += `<br>🔮 In 2050, you'll be ${futureAge} years old`;
}


function getZodiacSign(month, day) {
  const signs = [
    ["Capricorn", 19], ["Aquarius", 18], ["Pisces", 20], ["Aries", 19],
    ["Taurus", 20], ["Gemini", 20], ["Cancer", 22], ["Leo", 22],
    ["Virgo", 22], ["Libra", 22], ["Scorpio", 21], ["Sagittarius", 21]
  ];
  return day <= signs[month - 1][1] ? signs[month - 1][0] : signs[month % 12][0];
}


function getNextBirthday(month, day) {
  const today = new Date();
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);
  
  
  if (today > nextBirthday) {
    nextBirthday = new Date(today.getFullYear() + 1, month - 1, day);
  }
  
 
  const diffTime = nextBirthday - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}


function getFutureAge(birthDate, futureYear) {
  return futureYear - birthDate.getFullYear();
}