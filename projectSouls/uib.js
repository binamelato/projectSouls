document.addEventListener('DOMContentLoaded', () => {	
	let selectArrows = document.querySelectorAll('.arrow');//select all arrows in select module
	
	let tabviewHead = document.querySelector('.tabviewHead');//select all arrows in select module
	let tabmenuHeader = document.querySelectorAll('.headMenublock');//select all arrows in select module
	
	let inputData = document.querySelector('#dataNaklad');//select input for data	
	let rangeBars = document.querySelectorAll('.dsRange'); // Контейнеры
	let rangeBarControls = document.querySelectorAll('.dsRangeControl'); // Ползунки
	let rangeBarActiveLine = document.querySelector('.dsRangeLineRoadActive'); // Ползунки
	

	let draggableStatus = false; // Статус перетаскивания
	let currentControl = null; // Текущий ползунок
	let startX = 0; // Начальная позиция мыши
	let rangeBarRect = null; // Границы контейнера

	function arrowClick(e){//клик по стрелке влево или право		
		let leftArrowYes = e.classList.contains('arLeft');
		let placeForSearch = e.parentElement.querySelector('.selectData');
		let elemsForSearch = placeForSearch.querySelectorAll('.optionObject');
			
		for(let i=0; i < elemsForSearch.length; i++){
			let elemNow = elemsForSearch[i];
			let statusNow = elemNow.classList.contains('selectActive');
			if(statusNow){
				elemNow.classList.toggle('selectActive');
				if (leftArrowYes){
					// Клик влево
					if(i === 0){
						elemsForSearch[elemsForSearch.length - 1].classList.toggle('selectActive');
					}else{
						elemsForSearch[i - 1].classList.toggle('selectActive');
					}
				}else{
					// Клик вправо
					if(i === elemsForSearch.length - 1){
						elemsForSearch[0].classList.toggle('selectActive');
					}else{
						elemsForSearch[i + 1].classList.toggle('selectActive');
					}
				}
				
				break; // Прерываем цикл после переключения
			}
		 }
	}
	function inputDataNakl(e){		
		if(e.value != '' && e.value != null && e.value.length > 9){
			inputData.value = e.value.substring(0,10);
		}		
	}
	function headerMenuClick(e){
		document.querySelector(".activeTabhead").classList.toggle("activeTabhead");
		e.parentElement.classList.toggle("activeTabhead");
		const node = e.parentElement.parentNode;
		let tabMustViewPanel = [...node.children].indexOf(e.parentElement);//узнаем что за вкладка
		console.log(tabMustViewPanel);
		let tabviewForActiveOld = document.querySelector('.activeTab');
		let tabviewForVisible = document.querySelector('.tabview');
		let tabPanelNow = document.querySelector(".tabview .tabviewPlace:nth-child("+tabMustViewPanel+")");
		tabviewForActiveOld.classList.toggle("activeTab");
		tabPanelNow.classList.toggle("activeTab");
		
		console.log(tabPanelNow);
		//tabPanelNow.classList.toggle("activeTab");
	}
	
	Array.from(selectArrows, el => el.addEventListener('click', e => {arrowClick(e.target);}));
	Array.from(tabmenuHeader, el => el.addEventListener('click', e => {headerMenuClick(e.target);}));

	if(rangeBarControls.length != 0){
		rangeBarControls.forEach(control => {
			control.addEventListener('mousedown', e => {
				draggableStatus = true;
				currentControl = e.target;
				rangeBarRect = currentControl.parentElement.getBoundingClientRect(); //Границы контейнера
				startX = e.clientX - currentControl.offsetLeft; //Смещение мыши относительно ползунка
			});
		});
	}
	document.addEventListener('mouseup', () => {// Заканчиваем двигать ползунок
		draggableStatus = false;
		currentControl = null;
	});
	document.addEventListener('mousemove', e => {// Двигаем ползунок
		if(!draggableStatus || !currentControl) return;
		// Вычисляем новое положение
		let newLeft = e.clientX - startX;

		// Ограничиваем перемещение в пределах контейнера
		if(newLeft < 0){
			newLeft = 0;
		}else if(newLeft > rangeBarRect.width - currentControl.offsetWidth){
			newLeft = rangeBarRect.width - currentControl.offsetWidth;
		}
		console.log(newLeft);//размер самого контрола
		// Устанавливаем положение контрола
		currentControl.style.left = newLeft + 'px';

		// Перемещаем активную полосу за контролом
		rangeBarActiveLine.style.width = (newLeft - 4) + 'px';
		
		//нужно регулировать шаг, к примеру каждые 10px - это 1
		
	});
	
	if(inputData){
		inputData.addEventListener('input', e => {inputDataNakl(e.target);});
	}

});