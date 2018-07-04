
/*
Default theme form material ui

*/
import * as _colors from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';

import {
    createMuiTheme
} from '@material-ui/core/styles';


// tabela de cores em http://www.material-ui.com/#/customization/colors

/*
datePicker: {
color: palette.primary1Color,
textColor: palette.alternateTextColor,
calendarTextColor: palette.textColor,
selectColor: palette.primary2Color,
selectTextColor: palette.alternateTextColor,
calendarYearBackgroundColor: _colors.white
}
*/

const appPrimaryColor = '#3a6f65';
const appSecondaryColor = '#b7be00';
const appWarmGray = '#BEB8B2';
const appWarmDarkGray = '#AEA79F';
const appWarmLightGray = '#DEDBD8';
const grayDisabledColor = 'rgb(174, 167, 159)';

const theme = createMuiTheme({
    palette: {
        primary1Color: appPrimaryColor,
        primary2Color: fade(appSecondaryColor, 0.07),
        primary3Color: appWarmGray,
        accent1Color: appSecondaryColor,
        accent2Color: appWarmLightGray,
        accent3Color: appWarmDarkGray,
        textColor: _colors.darkBlack,
        alternateTextColor: _colors.white,
        canvasColor: _colors.white,
        borderColor: appWarmLightGray,
        disabledColor: fade(_colors.darkBlack, 0.3),
        pickerHeaderColor: appSecondaryColor,
        clockCircleColor: fade(_colors.darkBlack, 0.07),
        shadowColor: _colors.fullBlack
    },
    dialog: {
        // className: 'teste'
    },
    textField: {
        disabledTextColor: _colors.fullBlack
    }
});

export {
    theme,
    appPrimaryColor,
    appSecondaryColor,
    appWarmGray,
    appWarmDarkGray,
    appWarmLightGray,
    grayDisabledColor
};
