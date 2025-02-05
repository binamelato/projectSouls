const { app, BrowserWindow, ipcMain, screen, Tray, Menu} = require('electron');
const path = require('path');
let mainWindow;
let popupWindow;

function createMainWindow(){
	// Получаем текущий экран и его размер
    const primaryDisplay = screen.getPrimaryDisplay();
    const {width, height} = primaryDisplay.workAreaSize; // Размер рабочей области (без панели задач)
    // Вычисляем 80% от ширины и высоты экрана
    const windowWidth = Math.floor(width * 0.8);
    const windowHeight = Math.floor(height * 0.9);
	let tray = null;
	
    mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
		transparent: true,
        width: windowWidth,
        height: windowHeight,
		icon: path.join(__dirname, 'ico/logo.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            //sandbox: true,
			//nodeIntegration: false,
            contextIsolation: true,           
            enableRemoteModule: false,
        }
    });

    mainWindow.loadFile('index.html');
    ipcMain.on('window-close', () => {
        mainWindow.close();
    });
	 ipcMain.on('window-minimize', () => {
        mainWindow.minimize();
    });
    ipcMain.on('window-maximize', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });
	//for tray icon + menu
	mainWindow.on('minimize', (event) => {
        event.preventDefault();
        mainWindow.hide();
        createTray();
    });
	
	mainWindow.webContents.openDevTools();//запуск средств разработчика
}

function createTray(){
    tray = new Tray(path.join(__dirname, 'library/ico/logo.png')); // Укажите путь к вашей иконке

    const contextMenu = Menu.buildFromTemplate([
        {label: 'Показать', click: () => {
			mainWindow.show();
			if(tray){
				tray.destroy();
				tray = null; // Обнулите tray после уничтожения
			}
		}},
        {label: 'Выход', click: () => app.quit() }
    ]);

    tray.setToolTip('Vape Solus');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
		if(mainWindow.isVisible()){
            mainWindow.hide();
        }else{
            mainWindow.show();
            if(tray){
				tray.destroy();
				tray = null; // Обнулите tray после уничтожения
            }
        }
    });
}

// Функция для создания popup окна с заданными размерами
function createPopupWindow(width, height){
    popupWindow = new BrowserWindow({
		titleBarStyle: 'hidden',
		transparent: true,
        width: width,
        height: height,
        parent: mainWindow,
        modal: true,
        resizable: false,
		icon: path.join(__dirname, 'ico/logo.ico'),
        webPreferences: {
            //sandbox: true,
            contextIsolation: true,
            nodeIntegration: false,
            //enableRemoteModule: false,
        }
    });

    popupWindow.loadFile('popup.html'); // Загрузим HTML для popup окна
    popupWindow.on('closed', () => {
        popupWindow = null;
    });	
	
	popupWindow.webContents.openDevTools();
}

// Запуск основного окна
app.whenReady().then(createMainWindow);

// Слушаем события от рендер-процесса (вызов из index.html)
ipcMain.handle('open-popup', (event, width, height) => {
    createPopupWindow(width, height);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
//for Mac Os
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
