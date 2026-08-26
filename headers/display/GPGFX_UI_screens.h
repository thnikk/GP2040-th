#ifndef _GPGFX_UI_SCREENS_H_
#define _GPGFX_UI_SCREENS_H_

enum DisplayMode {
    BUTTONS,
    SPLASH,
    DISPLAY_SAVER,
    MAIN_MENU,
    RESTART,
    REMAP
};

inline bool isMenuScreen(DisplayMode mode) {
    return mode == DisplayMode::MAIN_MENU || mode == DisplayMode::REMAP;
}

#include "ui/screens/ButtonLayoutScreen.h"
#include "ui/screens/DisplaySaverScreen.h"
#include "ui/screens/MainMenuScreen.h"
#include "ui/screens/RemapScreen.h"
#include "ui/screens/RestartScreen.h"
#include "ui/screens/SplashScreen.h"

#endif