import { useRef, useMemo, useState } from 'react';
import { Pressable, View, TouchableOpacity } from 'react-native';
import { useThemeMode, useTheme, makeStyles, ListItem } from '@rneui/themed';
import { Entypo, Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import StyledSwitch from '@/components/Styled/StyledSwitch';
import StyledDivider from '@/components/Styled/StyledDivider';
import StyledText from '@/components/Styled/StyledText';
import StyledPressable from '@/components/Styled/StyledPressable';
import StyledHandle from '@/components/Styled/BottomSheet/StyledHandle';
import { DefaultBackdrop } from '@/components/Styled/BottomSheet/StyledBackdrop';
import StyledBackground from '@/components/Styled/BottomSheet/StyledBackground';
import { STYLES } from '@/lib/constants';

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

  const languages = useMemo(() => ['English', 'Vietnamese'], []);
  return (
    <BottomSheetView>
      {languages.map((lang, i, arr) => {
        return (
          <StyledPressable
            key={i}
            onPress={() => {
              closeBottomSheet();
            }}
            style={{ padding: 0 }}>
            <ListItem
              bottomDivider={i !== arr.length - 1}
              containerStyle={styles.listItemContainer}>
              <ListItem.Content>
                <ListItem.Title>
                  <StyledText type='Heading_5' color='blackGrey'>
                    {lang}
                  </StyledText>
                </ListItem.Title>
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
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.optionContainer}>
      <View style={styles.labelContainer}>
        <Entypo name='language' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={theme.colors.orange} />
        <StyledText type='Heading_5' color='blackGrey'>
          Language
        </StyledText>
      </View>
      <StyledPressable onPress={onLanguageTitlePress}>
        <StyledText type='Placeholder' color='grey'>
          English
        </StyledText>
      </StyledPressable>
    </View>
  );
};

const ThemeSettingOption = () => {
  const { theme } = useTheme();
  const { setMode } = useThemeMode();
  const dT = theme.mode === 'dark';
  const styles = useStyles();

  const icon = dT ? (
    <Ionicons
      name='ios-cloudy-night-outline'
      size={STYLES.ICON_SIZE.ICON_SIZE_24}
      color={theme.colors.orange}
    />
  ) : (
    <Ionicons
      name='sunny-outline'
      size={STYLES.ICON_SIZE.ICON_SIZE_24}
      color={theme.colors.orange}
    />
  );

  return (
    <View style={styles.optionContainer}>
      <View style={styles.labelContainer}>
        {icon}
        <StyledText type='Heading_5' color='blackGrey'>
          Dark mode
        </StyledText>
      </View>
      <StyledSwitch active={dT} onChange={isDarkMode => setMode(isDarkMode ? 'dark' : 'light')} />
    </View>
  );
};

const NotificationSettingOption = () => {
  const { theme } = useTheme();
  const styles = useStyles();
  const [noti, setNoti] = useState(false);

  const icon = noti ? (
    <Ionicons
      name='notifications'
      size={STYLES.ICON_SIZE.ICON_SIZE_24}
      color={theme.colors.orange}
    />
  ) : (
    <Ionicons
      name='notifications-off'
      size={STYLES.ICON_SIZE.ICON_SIZE_24}
      color={theme.colors.orange}
    />
  );

  return (
    <View style={styles.optionContainer}>
      <View style={styles.labelContainer}>
        {icon}
        <StyledText type='Heading_5' color='blackGrey'>
          Notifications
        </StyledText>
      </View>
      <StyledSwitch active={noti} onChange={value => setNoti(value)} />
    </View>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';
  const backgroundColor = dT ? theme.colors.black : theme.colors.white;

  return {
    body: {
      flex: 1,
      marginHorizontal: STYLES.MARGIN.MARGIN_16,
      marginTop: STYLES.MARGIN.MARGIN_16,
    },
    settingsContainer: {
      gap: STYLES.GAP.GAP_24,
      padding: STYLES.PADDING.PADDING_32,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_15 : STYLES.SHADOW.SHADOW_BLACK_15),
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
