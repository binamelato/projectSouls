document.addEventListener('DOMContentLoaded', () => {	
	const exitButton = document.querySelector('.formExit').addEventListener('click', closeWindow);
	const maxButton = document.querySelector('.formMax').addEventListener('click', maxWindow);
	const minButton = document.querySelector('.formMin').addEventListener('click', minWindow);
	const viewMonitor = document.querySelector('#viewMonitor');
	const titlePlace = document.querySelector('#titlace');	
	const nameProg = "Project Souls";
	const dialog_en_v0 = "Press Any Button";
	const dialog_ru_v0 = "Нажмите любую клавишу чтобы продолжить";
	const corp_data = "PROJECT SOULS™ &©2024 CO TECORP Inc. /©2024 TE Entertainment Inc.";
	const versionAppNow = "1.00.3";
	
	let activeRegion = "RU";	
	let statusLoading = 0;
	let attentionMessageHead = "ПРЕДУПРЕЖДЕНИЕ О ВОЗМОЖНОМ ВРЕДЕ ЗДОРОВЬЯ";
	let attentionMessage = "Вся представленная здесь хуета, является хуетой больного воображения ее автора. Вы можете не соглашаться и всячески отрицать ее существование, но она есть и этого не изменить. Во время взаимодействия с данным продуктом возможны эпилептические припадки, связанные с повышенной чувствительностью к свету. Люди, не испытывавшиеранее подобных приступов и не страдающие эпилепсией, могут не знать о своей болезни, которая может спровоцировать эпилептические припадки, связанные с повышенной чувствительностью к свету. Симптомы этих приступов могут быть различными. К ним относятся: головокружение, искажение визуального восприятия, судороги лицевых мышц, нервный тик, подергивание либо дрожание рук или ног, потеря ориентации, спутанность либо кратковременное помутнение сознания. Припадки также могут сопровождаться потерей сознания или конвульсиями, в результате которых можно упасть или удариться о находящиеся рядом предметы и получить травму. Если вы обнаружили у себя любой из этих симптомов, немедленно прекратите работу и пойдите сделайте кружечшу санного горячего кофе. А затем на чиле попробуйте влится в катку по новой. В случае повторного ухудшения состояния стоит обязательно обратится к специалистам.";
	let ofnline_status = "НЕ В СЕТИ";
	
	let ico_dir = "library/ico/";
	let sounds_dir = "library/sounds/";
	let backImage = "bg.png";
	let logoImage = "nameLogo.png";	
	let startBan1 = "bnm.png";
	let startBan2 = "fsb.png";
	let startBan3 = "js.png";
	let atentionStart_ico = "att3.png";
	let mainBack_theme = "malen_theme.mp3";
	let beginPlay_theme = "game_start.mp3";
	let runMainMenu_theme = "chn.mp3";
	let gifLoad = "ani.gif";
	
	
	/*
	exitButton.addEventListener('click', () => {
		window.close();
	});	
	*/
	function closeWindow(){
		window.electronAPI.closeWindow();
	}
	function minWindow(){
		console.log("типа свернул");
		window.electronAPI.minimizeWindow();
	}
	function maxWindow(){
		//const window = getWindow();
		//window.isMaximized() ? window.unmaximize() : window.maximize();
		
		window.electronAPI.maximizeWindow();
	}
	function loadForm(){//создание формы
		titlePlace.innerText = nameProg;
	}
	function screenSavers(){//Логотипы
		const theOneFunc = delay => {
		//console.log(delay);
			switch(delay){
				case 3:				
					viewMonitor.insertAdjacentHTML("beforeend", "<div id='attantionMesForm' class='flx'><div style='font-family:SF-Pro;color:rgb(185, 185, 185);width:650px;font-size:1.3rem;text-align: center;opacity:1;margin:18% auto 20px;'><div class=''><img src='"+ico_dir+atentionStart_ico+"' style='width:45px;'></div><div style='font-size:1.6rem;margin: 0px 0px 50px;'>"+attentionMessageHead+"</div><div id='' class='' style='font-size: 0.9rem;'>"+attentionMessage+"</div></div></div>");
					break;
				case 13:
					viewMonitor.innerHTML = "";
					viewMonitor.style.backgroundImage = "";
					viewMonitor.style.backgroundImage = "url("+ico_dir+startBan1+")";
					viewMonitor.style.backgroundSize = "cover";//contain
					break;
				case 17:
					viewMonitor.style.backgroundImage = "";
					viewMonitor.style.backgroundImage = "url("+ico_dir+startBan2+")";
					viewMonitor.style.backgroundSize = "cover";
					break;
				case 21:
					viewMonitor.style.backgroundImage = "";
					viewMonitor.style.backgroundImage = "url("+ico_dir+startBan3+")";
					viewMonitor.style.backgroundSize = "cover";
					break;
				case 25:
					clearTimeout();
					startPlatform();
					break;
			}
		  
		};
		setTimeout(theOneFunc, 3 * 1000, 3);
		setTimeout(theOneFunc, 13 * 1000, 13);
		setTimeout(theOneFunc, 17 * 1000, 17);
		setTimeout(theOneFunc, 21 * 1000, 21);
		setTimeout(theOneFunc, 25 * 1000, 25);
	}
	function startPlatform(){//старт основного окна		
		viewMonitor.style.backgroundImage = "";
		viewMonitor.style.backgroundImage = "url("+ico_dir+backImage+")";
		viewMonitor.style.backgroundSize = "cover";
		viewMonitor.innerHTML = "";
		viewMonitor.insertAdjacentHTML("beforeend", "<div style='display:flex;flex-direction:column;justify-content:space-between;height:100%;font-family:masonchronicles;'><div id='nameTextBig'></div><div id='first_text'></div><div id='corpTextSml'></div><div style='color:rgb(209 209 209);display:flex;align-items:flex-end;flex-direction:column;font-size:0.89rem;width:95%;margin:20px auto 10px;'><div id='statWeb'></div><div id='verAppt'>Версия приложения "+versionAppNow+"</div></div></div>");
		
		//задаем главное название
		let bigTextName = document.querySelector('#nameTextBig');
		bigTextName.innerText = nameProg;
		//задаем название корпорации
		let corpTextSml = document.querySelector('#corpTextSml');
		corpTextSml.innerText = corp_data;
		//задаем название корпорации
		let statWebChar = document.querySelector('#statWeb');
		statWebChar.innerText = ofnline_status;
		
		//задаем нулевую фразу
		let zeroFraze = document.querySelector('#first_text');
		if(activeRegion == "EN"){
			zeroFraze.innerText = dialog_en_v0;
		}else{
			zeroFraze.innerText = dialog_ru_v0;
		}		
		
		//запуск фоновой музыки
		var audio = new Audio(sounds_dir+mainBack_theme);
		audio.volume = 0.7;
		audio.play();
		
		
		animationForText();
		viewMonitor.focus();
		
		//играем трек 5минут, затем секунд 30 тишина
	}
	function animationForText(){
		let textPlace = document.querySelector('#first_text');
		var blink_speed = 2000; // Интервал мигания в миллисекундах (1000 = 1 секунда)
		
		let globTimer = setInterval(function () {
			// Проверяем текущую непрозрачность и переключаем её
			if(textPlace.style.opacity === '0') {
				textPlace.style.opacity = '1';
			}else{
				textPlace.style.opacity = '0';
			}
		}, blink_speed);
		
		// Отслеживание нажатий мыши
		document.addEventListener('click', function(){
			if(statusLoading == 0){
				LoadMainMenu(globTimer);
			}
		});

		// Отслеживание нажатий клавиш
		document.addEventListener('keydown', function(){
			if(statusLoading == 0){
				LoadMainMenu(globTimer);
			}
		});
	}
	function LoadMainMenu(l){	
		statusLoading++;
		clearInterval(l);
		let corpTextSml = document.querySelector('#corpTextSml');
		corpTextSml.style.margin = "";
		corpTextSml.style.margin = "3% auto 0px";
		let zeroFraze = document.querySelector('#first_text');
		zeroFraze.innerHTML = "";
		zeroFraze.style.opacity = 1;
		zeroFraze.style.margin = "";
		zeroFraze.style.margin = "100px auto 20px";
		zeroFraze.insertAdjacentHTML("beforeend", "<div id='m1' class='menuPunkt menuAct'>Новые данные</div><div id='m2' class='menuPunkt'>Загрузить игру</div><div id='m3' class='menuPunkt'>Настройки</div><div id='m4' class='menuPunkt'>Выход</div>");
		
		
		document.onkeydown = function(e){
			switch (e.code){
				case 'ArrowUp':
					driveMenu(e.code);
					break;
				case 'ArrowDown':
					driveMenu(e.code);
					break;
				case 'KeyW':
					driveMenu(e.code);
					break;
				case 'KeyS':
					driveMenu(e.code);
					break;
				case 'Enter':
					menuReaction(e.code);
					break;
			}
		};
		
		startGame = document.querySelector('#m1');
		startGame.addEventListener('click', () => {
			if(startGame.classList.contains('menuAct')){
				var audios = new Audio(sounds_dir+beginPlay_theme);		
				audios.volume = 0.7;
				audios.play();
				//audio.play();//неизвестное аудио ошибка
				beginPlay();
			}
		});
		
		rexitGame = document.querySelector('#m4');
		rexitGame.addEventListener('click', () => {			
			if(rexitGame.classList.contains('menuAct')){
				console.log("Closed Application");
				window.close();
			}
		});

		let elemMenuDriver = document.querySelectorAll('.menuPunkt'); // Наш элемент
		Array.from(elemMenuDriver, el => el.addEventListener('mouseenter', e => {driveMenuCur(e);}));
				
	}
	function menuReaction(l){
		let activeMenu = document.querySelector('.menuAct');
		let actMenId = activeMenu.id;
		switch(actMenId){
			case "m1":
				var audios = new Audio(sounds_dir+beginPlay_theme);		
				audios.volume = 0.7;
				//audios.play();
				//audio.play();//неизвестное аудио ошибка
				console.log("Start game");
				beginPlay();
				break;
			case "m2":
				console.log("Loading game");
				break;
			case "m3":
				console.log("Settings game");
				break;
			case "m4":				
				window.close();
				break;
		}
		
	}
	function driveMenuCur(l){
		let activeMenu = document.querySelector('.menuAct');
		var audios = new Audio(sounds_dir+runMainMenu_theme);
		audios.volume = 0.7;
		activeMenu.classList.toggle('menuAct');
		l.target.classList.toggle('menuAct');
		audios.play();
	}
	function driveMenu(l){
		massTabs = document.querySelectorAll(".menuPunkt").length;
		let activeMenu = document.querySelector('.menuAct');
		let actMenId = activeMenu.id.substring(1);
		var audios = new Audio(sounds_dir+runMainMenu_theme);
		audios.volume = 0.7;		
		if(l == 'ArrowUp' || l == 'KeyW'){
			let moveAct = Number(actMenId) - 1;
			if(moveAct>=1){
				activeMenu.classList.toggle('menuAct');
				let newActElem = document.querySelector('#m'+moveAct);
				newActElem.classList.toggle('menuAct');
				audios.play();
			}
		}else{
			let moveAct = Number(actMenId) + 1;
			if(moveAct<=massTabs){
				activeMenu.classList.toggle('menuAct');
				let newActElem = document.querySelector('#m'+moveAct);
				newActElem.classList.toggle('menuAct');
				audios.play();
			}
		}
	}
	function beginPlay(){
		viewMonitor.style.backgroundImage = "";
		viewMonitor.style.backgroundSize = "";
		viewMonitor.style.backgroundColor = "#181a1d";
		viewMonitor.innerHTML = "";
		viewMonitor.insertAdjacentHTML("beforeend", "<div style='display:flex;align-items:center;flex-direction:row-reverse;position:absolute;right:40px;bottom:40px;'><div style='color:#fff;margin:30px;font-weight:600;'></div><div style='width:140px;height:140px;'><img src='"+ico_dir+gifLoad+"' style='width:100%;height:100%;'></div></div>");
	}
	
	loadForm();
	screenSavers();
});

/*
ОСТАЛОСЬ СДЕЛАТЬ:

- Плавное появление текста(?)
- При нажатии на любой пункт меню, тут же выключить фоновое аудио
- зациклить воспроизведение аудио в фоне, чтобы оно играло, затем 20секунд тишины и по новой


*/
