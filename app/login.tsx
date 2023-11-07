import { View, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { makeStyles, useTheme } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import StyledText, { ContinueWithText } from '@/components/Styled/StyledText';
import { FormInput } from '@/components/Styled/StyledInput';
import StyledButton, { GoogleButton } from '@/components/Styled/StyledButton';
import { KeyboardView } from '@/components/Styled/StyledView';
import StyledPressable from '@/components/Styled/StyledPressable';
import { ArrowRightIcon } from '@/components/Icon';

const Login = () => {
  const styles = useStyles();
  const router = useRouter();

  return (
    <KeyboardView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image source={require('../assets/images/new/adaptive-icon.png')} style={styles.icon} />
      </View>
      <View style={styles.heading}>
        <StyledText type='Heading_3' color='orange'>
          Vietnamese Cuisine
        </StyledText>
      </View>
      <View style={styles.form}>
        <FormInput type='normal' placeholder='Email' />
        <FormInput type='password' placeholder='Password' />
      </View>
      <View style={styles.subField}>
        <StyledPressable onPress={() => router.push('/(sidebar)/(tabs)/')}>
          <StyledText type='SubInputField' color='orange'>
            Back to home
          </StyledText>
        </StyledPressable>
        <StyledPressable onPress={() => {}}>
          <StyledText type='SubInputField' color='orange'>
            Forgot password?
          </StyledText>
        </StyledPressable>
      </View>
      <View style={styles.button}>
        <StyledButton title='Sign In' icon={<ArrowRightIcon />} iconPosition='right' />
        <ContinueWithText />
        <GoogleButton />
      </View>
      <View style={styles.footer}>
        <StyledText type='SubInputField' color='blackGrey'>
          Don't have an account?
        </StyledText>
        <StyledPressable onPress={() => router.push('/register')}>
          <StyledText style={styles.redirectText}>SIGN UP</StyledText>
        </StyledPressable>
      </View>
    </KeyboardView>
  );
};

export default Login;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    marginHorizontal: STYLES.MARGIN.MARGIN_16,
    marginTop: StatusBar.currentHeight || 0,
  },
  icon: {
    width: 200,
    height: 200,
  },
  heading: {
    marginVertical: STYLES.MARGIN.MARGIN_8,
    alignItems: 'center',
  },
  form: {},
  subField: {
    marginTop: STYLES.MARGIN.MARGIN_4,
    marginBottom: STYLES.MARGIN.MARGIN_16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: STYLES.ICON_SIZE.ICON_SIZE_24,
    color: theme.colors.white,
  },
  continueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: STYLES.GAP.GAP_8,
  },
  button: {
    alignItems: 'center',
    gap: STYLES.GAP.GAP_8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: STYLES.MARGIN.MARGIN_32,
  },
  redirectText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: STYLES.FONT_SIZE.FONT_SIZE_16,
    color: theme.colors.orange,
  },
}));
