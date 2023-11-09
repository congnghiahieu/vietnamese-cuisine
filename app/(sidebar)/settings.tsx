import { useRef, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useThemeMode, useTheme, makeStyles, ListItem } from '@rneui/themed';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import StyledSwitch from '@/components/Styled/StyledSwitch';
import StyledDivider from '@/components/Styled/StyledDivider';
import StyledText from '@/components/Styled/StyledText';
import StyledPressable from '@/components/Styled/StyledPressable';
import StyledHandle from '@/components/Styled/BottomSheet/StyledHandle';
import { DefaultBackdrop } from '@/components/Styled/BottomSheet/StyledBackdrop';
import StyledBackground from '@/components/Styled/BottomSheet/StyledBackground';
import { STYLES, LANGUAGE_LIST } from '@/lib/constants';
import { useSettingStates } from '@/states/setting';
import { DarkModeIcon, LanguageIcon, NotificationsIcon } from '@/components/Icon';

const Settings = () => {
  const styles = useStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [150], []);
  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.body}>
        <View style={styles.settingsContainer}>
          <LanguageSettingOption onLanguageTitlePress={openBottomSheet} />
          <StyledDivider />
          <ThemeSettingOption />
          <StyledDivider />
          <NotificationSettingOption />
        </View>
      </View>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleComponent={StyledHandle}
        backdropComponent={DefaultBackdrop}
        backgroundComponent={StyledBackground}>
        <LanguageSettingBottomSheet closeBottomSheet={closeBottomSheet} />
      </BottomSheet>
    </View>
  );
};

type LanguageSettingBottomSheetProps = {
  closeBottomSheet: () => void;
};

const LanguageSettingBottomSheet = ({ closeBottomSheet }: LanguageSettingBottomSheetProps) => {
  const styles = useStyles();
  const { setLanguage } = useSettingStates();

  return (
    <BottomSheetView>
      {LANGUAGE_LIST.map((lang, i, arr) => {
        return (
          <StyledPressable
            key={i}
            onPress={() => {
              setLanguage(lang);
              closeBottomSheet();
            }}
            style={{ padding: 0 }}>
            <ListItem
              bottomDivider={i !== arr.length - 1}
              containerStyle={styles.listItemContainer}>
              <ListItem.Content>
                <StyledText type='Heading_5' color='blackGrey'>
                  {lang}
                </StyledText>
              </ListItem.Content>
            </ListItem>
          </StyledPressable>
        );
      })}
    </BottomSheetView>
  );
};

type LanguageSettingOptionProps = {
  onLanguageTitlePress: () => void;
};

const LanguageSettingOption = ({ onLanguageTitlePress }: LanguageSettingOptionProps) => {
  const styles = useStyles();
  const { language } = useSettingStates();

  return (
    <View style={styles.optionContainer}>
      <View style={styles.labelContainer}>
        <LanguageIcon />
        <StyledText type='Heading_5' color='blackGrey'>
          Language
        </StyledText>
      </View>
      <StyledPressable onPress={onLanguageTitlePress}>
        <StyledText type='Placeholder' color='grey'>
          {language}
        </StyledText>
      </StyledPressable>
    </View>
  );
};

const ThemeSettingOption = () => {
  const styles = useStyles();
  const { setDarkMode } = useSettingStates();
  const { setMode, mode } = useThemeMode();
  const dT = mode === 'dark';

  return (
    <View style={styles.optionContainer}>
      <View style={styles.labelContainer}>
        <DarkModeIcon active={dT} />
        <StyledText type='Heading_5' color='blackGrey'>
          Dark mode
        </StyledText>
      </View>
      <StyledSwitch
        active={dT}
        onChange={isDarkMode => {
          setDarkMode(isDarkMode);
          setMode(isDarkMode ? 'dark' : 'light');
        }}
      />
    </View>
  );
};

const NotificationSettingOption = () => {
  const styles = useStyles();
  const { notifications, setNotifications } = useSettingStates();

  return (
    <View style={styles.optionContainer}>
      <View style={styles.labelContainer}>
        <NotificationsIcon active={notifications} />
        <StyledText type='Heading_5' color='blackGrey'>
          Notifications
        </StyledText>
      </View>
      <StyledSwitch active={notifications} onChange={active => setNotifications(active)} />
    </View>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';
  const backgroundColor = dT ? theme.colors.black : theme.colors.white;

  return {
    body: {
      flex: 1,
      paddingHorizontal: STYLES.PADDING.PADDING_16,
      marginTop: STYLES.MARGIN.MARGIN_16,
    },
    settingsContainer: {
      gap: STYLES.GAP.GAP_24,
      padding: STYLES.PADDING.PADDING_32,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_16 : STYLES.SHADOW.SHADOW_BLACK_4),
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    labelContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: STYLES.GAP.GAP_16,
    },
    sheetContainer: {
      flex: 1,
    },
    bottomSheetBg: {
      backgroundColor,
    },
    listItemContainer: {
      backgroundColor,
    },
  };
});

export default Settings;
