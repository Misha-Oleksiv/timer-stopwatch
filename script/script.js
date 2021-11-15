		// Getting current time anfd date

		const selector = selector => document.querySelector(selector);


		//Function to get current Date
		function currentT() {
			setInterval(() => {
				let currentD = new Date();
				let day = currentD.getDate();
				let month = (currentD.getMonth() + 1);
				let year = currentD.getFullYear();
				let currentSeconds = currentD.getSeconds();
				let currentMinutes = currentD.getMinutes();
				let currentHour = currentD.getHours();

				// Getting current time
				// if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;
				// if (currentMinutes < 10) currentMinutes = '0' + currentMinutes;
				// if (currentHour < 10) currentHour = '0' + currentHour;
				// selector('.time').innerHTML = `${currentHour}:${currentMinutes}:${currentSeconds}`;
				selector('.time').innerHTML = `${currentHour < 10?'0': ''}${currentHour}.${currentMinutes < 10 ? '0' : ''}${currentMinutes}.${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;


				// Gettingcurrent date
				selector('.date').innerHTML = `${day < 10?'0': ''}${day}.${month < 10 ? '0' : ''}${month}.${year < 10 ? '0' : ''}${year}`;
			})
		}
		currentT();


		// Stopwatch start
		let hours = 0;
		let minutes = 0;
		let seconds = 0;
		let milliseconds = 0;
		let loopsContainer = selector('.loops');
		selector('#stopwatch-loop').disabled = true;
		let stopwatchInterval;

		
		//Function to Start Stopwatch
		function startWatch() {
			milliseconds += 10;
		if (milliseconds == 1000) {
			milliseconds = 0;
			seconds++;
			if (seconds == 60) {
				seconds = 0;
				minutes++;
				if (minutes == 60) {
					minutes = 0;
					hours++;
				}
			}
		}
	
		let h = hours < 10 ? "0" + hours : hours;
		let m = minutes < 10 ? "0" + minutes : minutes;
		let s = seconds < 10 ? "0" + seconds : seconds;
		let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
		selector('.display').innerHTML = `${h}:${m}:${s}:${ms}`;
	}

		//Button to Start stopwatch
		selector('#stopwatch-start').addEventListener('click', function () {
			stopwatchInterval = setInterval(startWatch, 10);
			selector('#stopwatch-start').disabled = true;
			selector('#stopwatch-stop').disabled = false;
			selector('#stopwatch-loop').disabled = false;
		})

		//Button to Stop stopwatch
		selector('#stopwatch-stop').addEventListener('click', function () {
			clearInterval(stopwatchInterval);
			selector('#stopwatch-start').disabled = false;
			selector('#stopwatch-stop').disabled = true;
			selector('#stopwatch-loop').disabled = true;
		})

		//Button to Reset stopwatch
		selector('#stopwatch-reset').addEventListener('click', function () {
			clearInterval(stopwatchInterval);
			milliseconds = 0;
			seconds = 0;
			minutes = 0;
			hours = 0;
			selector('.display').innerHTML = '00:00:00:000';
			selector('#stopwatch-start').disabled = false;
			selector('#stopwatch-stop').disabled = false;
			selector('#stopwatch-loop').disabled = true;
			loopsContainer.innerHTML = '';
		})

		//Button to make laps in stopwatch
		selector('#stopwatch-loop').addEventListener('click', function () {
			let li = document.createElement('li');
			li.innerHTML = `${hours<10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds}`;
			loopsContainer.append(li);
		})
		// Stopwatch end


		//Timer set up
		let plusBtn = selector('#timer-btn-plus');
		let minusBtn = selector('#timer-btn-minus');
		let counter = selector('.timer-minutes');
		let count = selector('.timer-minutes').innerHTML;

		//Button to decrease Timer minutes
		minusBtn.addEventListener('click', ()=>{
			if(count === 0){
				count = 0;
			}
		else{
			count--;		
		}
			counter.innerHTML= `${count<10 ? '0' : ''}${count}`;
		})

		//Button to increase Timer minutes
		plusBtn.addEventListener('click', ()=>{
			if(count === 60){
				count = 60;
			}
		else{
			count++;		
		}
		counter.innerHTML= `${count<10 ? '0' : ''}${count}`;
		})


		// Timer start
		let timerMinutes = selector('.count-minutes').innerHTML;
		let timerSeconds = selector('.count-seconds').innerHTML;
		let timer = selector('.count-time');
		timer.innerHTML = `${timerMinutes < 10 ? '0' : ''}${timerMinutes}:${timerSeconds < 10 ? '0' : ''}${timerSeconds}`;
		let check = true;
		let timerInterval;


		//Button to Start timer
		selector('#timer-start').addEventListener('click', function () {
			timerInterval = setInterval(startTimer, 1000);
			if(check){
				timerMinutes = selector('.timer-minutes').innerHTML;
				timerSeconds = '00';
			}
			selector('#timer-start').disabled = true;
			selector('#timer-stop').disabled = false;
		})

		//Button to Stop timer
		selector('#timer-stop').addEventListener('click', function () {
			clearInterval(timerInterval);
			check = false;
			selector('#timer-start').disabled = false;
			selector('#timer-stop').disabled = true;
		})

		//Button to Reset timer
		selector('#timer-reset').addEventListener('click', function () {
			clearInterval(timerInterval);
			
			selector('#timer-start').disabled = false;
			selector('#timer-stop').disabled = false;
			check = true;
			timer.innerHTML = 0 + '0' + ':' + '0' + 0;
		})

		//function to activate timer
		function startTimer() {
			timerSeconds--
			if (timerSeconds < 0) {
				timerSeconds = 59;
				timerMinutes--;
			}
			if (timerSeconds < 0 && timerMinutes <= 0) {
				timerMinutes = 0;
				timerSeconds = 0;
			}
			if (timerMinutes === 0 && timerSeconds === 0) {
				timerMinutes = 0;
				timerSeconds = 0;
				clearInterval(timerInterval)
			}
			timer.innerHTML = `${timerMinutes < 10 ? '0' : ''}${timerMinutes}:${timerSeconds < 10 ? '0' : ''}${timerSeconds}`;
		}
