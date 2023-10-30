import { useRef, useMemo } from 'react';
import { Pressable, View, TouchableOpacity } from 'react-native';
import { useThemeMode, useTheme, makeStyles, ListItem } from '@rneui/themed';
import { Entypo, Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import StyledSwitch from '@/components/Styled/StyledSwitch';
import StyledDivider from '@/components/Styled/StyledDivider';
import StyledText from '@/components/Styled/StyledText';
import StyledHandle from '@/components/Styled/BottomSheet/StyledHandle';
import StyledBackdrop from '@/components/Styled/BottomSheet/StyledBackdrop';
import StyledBackground from '@/components/Styled/BottomSheet/StyledBackground';
import { STYLES } from '@/lib/constants';

const Settings = () => {
  const styles = useStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%'], []);
  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  const languages = useMemo(() => ['English', 'Vietnamese'], []);
  const BottomSheetBody = () => (
    <BottomSheetView>
      {languages.map((lang, i, arr) => {
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            key={i}
            onPress={() => {
              closeBottomSheet();
            }}>
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
          </TouchableOpacity>
        );
      })}
    </BottomSheetView>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.body}>
        <View style={styles.settingsContainer}>
          <LanguageSettingsOption onLanguageTitlePress={openBottomSheet} />
          <StyledDivider />
          <ThemeSettingsOption />
        </View>
      </View>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleComponent={StyledHandle}
        backdropComponent={StyledBackdrop}
        backgroundComponent={StyledBackground}>
        <BottomSheetBody />
      </BottomSheet>
    </View>
  );
};

type LanguageSettingsOptionProps = {
  onLanguageTitlePress: () => void;
};

const LanguageSettingsOption = (props: LanguageSettingsOptionProps) => {
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
      <Pressable
        onPress={props.onLanguageTitlePress}
        style={{ padding: STYLES.PADDING.PADDING_16 }}>
        <StyledText type='Placeholder' color='grey'>
          English
        </StyledText>
      </Pressable>
    </View>
  );
};

const ThemeSettingsOption = () => {
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
      alignItems: 'center',
      gap: STYLES.GAP.GAP_24,
      paddingHorizontal: STYLES.PADDING.PADDING_32,
      paddingVertical: STYLES.PADDING.PADDING_32,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_15 : STYLES.SHADOW.SHADOW_BLACK_15),
    },
    labelContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: STYLES.GAP.GAP_16,
    },
    optionContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: STYLES.GAP.GAP_64,
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
