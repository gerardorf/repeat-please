//ASSETS PATHS
STAGE_0_ASSETS = GAME_PATH + 'Stage0/assets/';

//ELEMENTS
//BACKGROUND
BACKGROUND_NAME = 'background';
BACKGROUND_PATH = STAGE_0_ASSETS + BACKGROUND_ASSETS + 'classroom.png';

FADER_NAME = 'fader';
FADER_PATH = STAGE_0_ASSETS + BACKGROUND_ASSETS + 'transparent_layer.png';

//DIALOG BUBBLE
DIALOG_NAME = 'dialog';
DIALOG_PATH = STAGE_0_ASSETS + DIALOGS_ASSETS + 'dialog_bubble.png';
DIALOG_X = 320;
DIALOG_Y = 40;
DIALOG_WIDTH = 570;

//TEACHER
TEACHER_NAME = 'teacher';
TEACHER_PATH = STAGE_0_ASSETS + CHARS_ASSETS + 'hello.png';

//START BUTTON
START_BUTTON_SPRITESHEET = 'buttons';
START_BUTTON_NAME = 'start';
START_BUTTON_ATLAS = STAGE_0_ASSETS + BUTTONS + 'buttons.png';
START_BUTTON_WIDTH = 224;
START_BUTTON_HEIGHT = 50;
START_BUTTON_NORMAL = 2;
START_BUTTON_HOVER = 1;
START_BUTTON_CLICK = 1;
START_BUTTON_OFFSET = 440;
START_BUTTON_FONT = NOKIA_BLACK_NAME;
START_BUTTON_FONT_SIZE = 20;
START_BUTTON_CONTENT = '> Vamos allá!!';
START_BUTTON_X = (DIALOG_X + DIALOG_WIDTH) / 2;
START_BUTTON_Y = DIALOG_Y + START_BUTTON_OFFSET;

//DIALOG CONTENT
DIALOG_TEXT_OFFSET = 30;
DIALOG_TEXT_X = DIALOG_X + DIALOG_TEXT_OFFSET;
DIALOG_TEXT_Y = DIALOG_Y + DIALOG_TEXT_OFFSET;
DIALOG_TEXT_FONT = NOKIA_BLACK_NAME;
DIALOG_TEXT_FONT_SIZE = 30;
DIALOG_TEXT_CONTENT = "Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit. " +
			"\n\nPraesent efficitur ante sit amet \nmattis auctor. Fusce vehicula eu \ndolor ac posuere. Etiam dapibus \nsapien nibh, at pellentesque lectus \nmalesuada sed. " +
			"\n\nVivamus ultricies sapien nec \npulvinar ultricies. Maecenas id\nauctor est. Aliquam ut fermentum \neros, in dapibus elit.";

